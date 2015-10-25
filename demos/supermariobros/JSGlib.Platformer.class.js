/*!
 * Platformer class for JSGlib, JavaScript Library
 * http://jsglib.no-ip.org/
 *
 * Copyright 2013, Adrien Guéret
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * Date: 14/04/2013
 *
 * Allow instance to be playable as an platform-hero
 *
 * == Inheritance ==
 * 	 -> GravityElement
 * 
 * == Properties ==
 *   -> max_jump_y
 *	 -> max_hspeed
 *   -> init_jump_speed
 *   -> hspeed_acc
 *   -> vspeed_acc
 *   -> gravity_value_when_jumping
 *   -> keys_jump
 *   -> keys_left
 *   -> keys_right
 *   -> allowChangeState
 *
 * == Events used ==
 *   -> eventCreate
 *   -> evenStartStep
 *   -> eventStep
 *   -> eventEndStep
 *   -> eventKeyDown
 *   -> eventKeyUp
 *   -> eventCollision
 *   -> eventTileCollision
 *
 * == Custom events provided ==
 *   -> eventPlatformerJump
 */
 
 (function () {
	'use strict';
	
	var _landing = function (elem) {
			if (elem.allowChangeState && !elem.isStateSLIP() && !elem.isStateDOWN()) {
				var isKeyPressed = false;
				if (elem.isStateLEFT()) {
					_performActionIfKeyPressed(elem, 'right', function() {
						this.state(JSGlib.STATE.MOVE_RIGHT);
						isKeyPressed = true;
					});
					
					if (!isKeyPressed) {
						elem.state(elem.hspeed() < 0 ? JSGlib.STATE.MOVE_LEFT : JSGlib.STATE.STAND_LEFT);
					}
				} else {
					_performActionIfKeyPressed(elem, 'left', function() {
						this.state(JSGlib.STATE.MOVE_LEFT);
						isKeyPressed = true;
					});
					
					if (!isKeyPressed) {
						elem.state(elem.hspeed() > 0 ? JSGlib.STATE.MOVE_RIGHT : JSGlib.STATE.STAND_RIGHT);
					}
				}
			}
		},
		_collisionAgainstSolid = function (elem, solidPosition) {
			var	mask = elem.getMask(),
				vspeed = elem.vspeed(),
				hspeed = elem.hspeed(),
				prevX = parseInt(elem.prevX(), 10) + mask.x(),
				prevY = parseInt(elem.prevY(), 10) + mask.y(),
				otherX = solidPosition.x(),
				otherY = solidPosition.y(),
				tileSize = elem.getGame().getTilesSize();
			
			if (vspeed > 0 && prevY + mask.height() <= otherY) {
				_landing(elem);
			} else if (vspeed < 0 && prevY + 1 >= otherY + tileSize && (
					hspeed === 0 ||
					(hspeed > 0 && prevX + mask.width() > otherX) ||
					(hspeed < 0 && prevX < otherX + tileSize)
				)) {
				elem.vspeed(0);
			}
		},
		_performActionIfKeyPressed = function (elem, key, callback) {
			
			JSGlib.forEach(elem['keys_' + key], function () {
			
				if (JSGlib.isKeyPressed(this)) {
					callback.call(elem, this);
					return JSGlib.KEYWORDS.BREAK;
				}
			});
		},
		_uniformGivenKey = function (elem, givenKey) {
			var key = false;
			JSGlib.forEach(elem.keys_right, function () {
				if (this == givenKey) {
					key = JSGlib.KEY.RIGHT;
					return JSGlib.KEYWORDS.BREAK;
				}
			});
			
			if (!key) {
				JSGlib.forEach(elem.keys_left, function () {
					if (this == givenKey) {
						key = JSGlib.KEY.LEFT;
						return JSGlib.KEYWORDS.BREAK;
					}
				});
			}
			
			if (!key) {
				JSGlib.forEach(elem.keys_jump, function () {
					if (this == givenKey) {
						key = JSGlib.KEY.UP;
						return JSGlib.KEYWORDS.BREAK;
					}
				});
			}
			
			if (!key) {
				JSGlib.forEach(elem.keys_down, function () {
					if (this == givenKey) {
						key = JSGlib.KEY.DOWN;
						return JSGlib.KEYWORDS.BREAK;
					}
				});
			}
			
			return key;
		};
	
	window.Platformer = {
		name: 'Platformer',
		parent: 'GravityElement',
		'abstract': true,
		eventCreate: function() {
			this.callParent('eventCreate', [], 'GravityElement');
			
			this.max_jump_y = 64;
			this.max_hspeed = 3;
			this.init_jump_speed = 6;
			this.hspeed_acc = 0.1;
			this.vspeed_acc = 0.2;
			this.gravity_value_when_jumping = 0.4;
			this.keys_jump = [JSGlib.KEY.UP];
			this.keys_left = [JSGlib.KEY.LEFT];
			this.keys_right = [JSGlib.KEY.RIGHT];
			this.keys_down = [JSGlib.KEY.DOWN];
			this._y_init_jump = 0;
			this.allowChangeState = true;
						
			this.alwaysActive(true);
		},
		eventStartStep: function () {
			var vspeed = this.vspeed(),
				hspeed = this.hspeed(),
				signDelta = 1,
				isKeyPressed = false,
				isSlip = this.isStateSLIP(),
				isLeft = this.isStateLEFT();
						
			if (Math.abs(hspeed) < 0.1) {
				hspeed = 0;
				this.hspeed(0);
			}
			
			//Manage jump pressure			
			if (vspeed < 0) {
				_performActionIfKeyPressed(this, 'jump', function () {
					if (this.y() > this._y_init_jump - this.max_jump_y) {
						signDelta = -1;
					} else {
						this._y_init_jump = this.getGame().getCurrentRoom().getHeight();
					}
				});
				
				this.vspeed(vspeed + this.vspeed_acc * signDelta);
			}
			
			//Manage hspeed acceleration
			_performActionIfKeyPressed(this, 'left', function () {
				if (hspeed > -this.max_hspeed) {
					this.hspeed(hspeed - this.hspeed_acc * 2);
				}
				isKeyPressed = true;
			});
			
			if (!isKeyPressed) {
				if (hspeed < 0) {
					this.hspeed(hspeed + this.hspeed_acc);
				}
				
				_performActionIfKeyPressed(this, 'right', function () {
					if (hspeed < this.max_hspeed) {
						this.hspeed(hspeed + this.hspeed_acc * 2);
					}
					isKeyPressed = true;
				});
				
				if (!isKeyPressed && hspeed > 0 ) {
					this.hspeed(hspeed - this.hspeed_acc * 2);
				}
			}
			
			if (isSlip) {
				if (hspeed < 0 && isLeft) {
					this.state(JSGlib.STATE.MOVE_LEFT);
				} else if (hspeed > 0 && !isLeft) {
					this.state(JSGlib.STATE.MOVE_RIGHT);
				} else if (hspeed === 0) {
					this.state(JSGlib.STATE['STAND_' + (isLeft ? 'LEFT' : 'RIGHT')]);
				}
			}
		},
		eventStep: function () {
			this.callParent('eventStep', [], 'GravityElement');
			
			var hspeed = this.hspeed();
			
			if (Math.abs(hspeed) > this.max_hspeed) {
				this.hspeed(this.max_hspeed * (hspeed < 0 ? -1 : 1));
			}
		},
		eventEndStep: function() {
			if (this.vspeed() < 0) {
                this.gravity(this.gravity_value_when_jumping);
            } else if (this.isLanding()) {
				_landing(this.gravity(0).vspeed(0));
            } else {
                this.gravity(this.gravity_value);
            }
		},
		eventKeyDown: function (key) {
            var hspeed = 0;

			switch (_uniformGivenKey(this, key)) {
				case JSGlib.KEY.LEFT:
					hspeed = this.hspeed();
					if (hspeed === 0) {
						this.hspeed(-this.hspeed_acc);
						
						if (this.vspeed() === 0) {
							this.state(JSGlib.STATE.MOVE_LEFT);
						}
					} else if (hspeed > 0 ) {
						this.hspeed(hspeed - this.hspeed_acc);
						
						if (this.isLanding()) {
							this.state(JSGlib.STATE.SLIP_LEFT);
						}
						
						_performActionIfKeyPressed(this, 'right', function (realKey) {
							JSGlib.forceKeyUp(realKey);
						});
					}
					return false;
				case JSGlib.KEY.RIGHT:
					hspeed = this.hspeed();
					if (hspeed === 0) {
						this.hspeed(this.hspeed_acc);
						
						if (this.vspeed() === 0) {
							this.state(JSGlib.STATE.MOVE_RIGHT);
						}
					} else if (hspeed < 0 ) {
						this.hspeed(hspeed + this.hspeed_acc);
						
						if (this.isLanding()) {
							this.state(JSGlib.STATE.SLIP_RIGHT);
						}
							
						_performActionIfKeyPressed(this, 'left', function (realKey) {
							JSGlib.forceKeyUp(realKey);
						});
					}
					return false;
				case JSGlib.KEY.UP:
					if (this.isLanding()) {
						this.vspeed(-this.init_jump_speed)
							._y_init_jump = this.y();

						if (this.isStateLEFT()) {
							this.state(JSGlib.STATE.MOVE_UP_LEFT);
						} else {
							this.state(JSGlib.STATE.MOVE_UP_RIGHT);
						}
						this.eventPlatformerJump();
					}
					return false;
				case JSGlib.KEY.DOWN :
						if (this.isLanding()) {
							this.state(JSGlib.STATE['STAND_DOWN_' + (this.isStateLEFT() ? 'LEFT' : 'RIGHT')]);
							if (this.hspeed() > 0) {
								_performActionIfKeyPressed(this, 'right', function (realKey) {
									JSGlib.forceKeyUp(realKey);
								});
							} else {
								_performActionIfKeyPressed(this, 'left', function (realKey) {
									JSGlib.forceKeyUp(realKey);
								});
							}
						}
					return false;
            }
        },
		eventKeyUp: function (key) {
            switch (_uniformGivenKey(this, key)) {
				case JSGlib.KEY.LEFT:
					if (this.isStateSLIP() && this.hspeed() > 0) {
						this.hspeed(0)
							.state(JSGlib.STATE.STAND_LEFT);
					}
					break;
				case JSGlib.KEY.RIGHT:
					if (this.isStateSLIP() && this.hspeed() < 0) {
						this.hspeed(0)
							.state(JSGlib.STATE.STAND_RIGHT);
					}
					break;
					
				case JSGlib.KEY.DOWN:
					if (this.isStateDOWN()) {
						this.state(JSGlib.STATE['STAND_' + (this.isStateLEFT() ? 'LEFT' : 'RIGHT')]);
					}
					break;
            }
        },
		eventCollision: function (other) {
			if (other.solid()) {
				_collisionAgainstSolid(this, other.position());
            }
        },
		eventTileCollision: function (tile) {
			if (tile.type == JSGlib.TILES_TYPES.WALL) {
				_collisionAgainstSolid(this, tile.position);
            }
        },
		//Custom events
		eventPlatformerJump: function () {}
	};
 })();