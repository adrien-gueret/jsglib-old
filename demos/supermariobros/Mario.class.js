(function (Game) {
    'use strict';
	
	var	_MARIO_STATES	=	{
				MINI	:	10,
				BIG	:	20,
				FIRE	:	30
			},
			_is_hurt	=	false;
    
	Game.addClass(GravityElement)
		.addClass(Platformer)
		.addClass({
			name: 'Mario',
			parent: 'Platformer',
			canInteract: function () {
				return this.state() != JSGlib.STATE.DEATH && !this.touchFlag;
			},
			hurt: function () {
				if (!_is_hurt) {
					if (this.status == _MARIO_STATES.MINI) {
						this.die(true);
					} else  {
						_is_hurt	=	true;
						this.y(this.y() + 14).status = _MARIO_STATES.MINI;
						this.setAlarm('EnableHurt', 50);
						Game.playSound('powerdown');
					}
				}
			},
			die: function (jump) {
				this.state(JSGlib.STATE.DEATH)
					.hspeed(0)
					.checkCollisions(false)
					.getGame()
						.stopAllSounds()
						.playSound('die', false, function () {
							this.restartRoom();
						})
						.getCurrentRoom()
							.viewLinkedElement(null);
						
				if (jump) {
					this.vspeed(-7)
						.gravity(0.2);
				}
			},
			rebound: function (newY) {
				this.vspeed(-4)
					.y(newY - this.height())
					.hasPerformedRebound = true;
			},
			eventCreate: function () {				
				_is_hurt	=	false;
				
				this.status	=	_MARIO_STATES.MINI;
				
				this.sprite_mini_mario = new JSGlib.Sprite(Game.getImage('small_mario'))
															.makeTiles(16, 16, 1, 'small_mario_mask');														
				this.sprite_mario = new JSGlib.Sprite(Game.getImage('mario'))
															.makeTiles(16, 30, 1, 'mario_mask');
				this.sprite_mario_fire = new JSGlib.Sprite(Game.getImage('mario_fire'))
															.makeTiles(16, 30, 1, 'mario_mask');

				this.callParent('eventCreate', []);
				this.keys_jump.push(JSGlib.KEY.Q);
				this.layer_name = 'tiles';
				this.maskColorForSolidCollisions(new JSGlib.Color('#ff0000'))
					.sprite(this.sprite_mini_mario)
					.hasPerformedRebound = false;
				
				this.sprite().imagespeed(0.2);
				
				this.touchFlag = false;
				this.flagFinished = false;
				this.fadeOut = false;
			},
			eventStartStep: function () {
				if (this.canInteract()) {
					this.hasPerformedRebound = false;
					
					this.callParent('eventStartStep');
					
					var room = this.getGame().getCurrentRoom();
					
					if (this.hspeed() < 0) {
						room.viewLinkedElement(null);
					} else if (this.getCenter().x() >= room.view().getCenter().x()) {
						room.viewLinkedElement(this);
					}
					
					this.x(Math.max(this.x(), room.view().x()));
				} else if (this.fadeOut) {
					var newOpacity = this.opacity() - 2;
					
					if (newOpacity >= 0) {
						this.opacity(newOpacity);
					} else {
						this.fadeOut = false;
					}
				}
			},
			eventStep: function () {			
				if (this.canInteract()) {
					this.callParent('eventStep');
				}
				
				switch (this.status) {
					case _MARIO_STATES.MINI:
						this.sprite(this.sprite_mini_mario);
					break;
					
					case _MARIO_STATES.BIG:
						this.sprite(this.sprite_mario);
					break;
					
					case _MARIO_STATES.FIRE:
						this.sprite(this.sprite_mario_fire);
					break;
				}
				
				if (this.touchFlag && !this.flagFinished) {
					this.sprite().usedTiles([16, 17]);
					return;
				}
				
				if (this.canInteract()) {
					this.opacity(_is_hurt ? 70 : 100);
				}
				
				switch(this.state()) {
					case JSGlib.STATE.MOVE_UP_RIGHT:
						this.sprite().usedTiles([4]);
					break;
					
					case JSGlib.STATE.MOVE_UP_LEFT:
						this.sprite().usedTiles([8]);
					break;
					
					case JSGlib.STATE.STAND_RIGHT:
						this.sprite().usedTiles([1]);
					break;
					
					case JSGlib.STATE.STAND_LEFT:
						this.sprite().usedTiles([5]);
					break;
					
					case JSGlib.STATE.MOVE_RIGHT:
						this.sprite().usedTiles([1,2,3,2]);
					break;
					
					case JSGlib.STATE.MOVE_LEFT:
						this.sprite().usedTiles([5,6,7,6]);
					break;
					
					case JSGlib.STATE.STAND_DOWN_LEFT:
						this.sprite().usedTiles([9]);
					break;
					
					case JSGlib.STATE.STAND_DOWN_RIGHT:
						this.sprite().usedTiles([10]);
					break;
					
					case JSGlib.STATE.ATTACK_LEFT:
						this.sprite().usedTiles([13]);
					break;
					
					case JSGlib.STATE.ATTACK_RIGHT:
						this.sprite().usedTiles([12]);
					break;
					
					case JSGlib.STATE.SLIP_LEFT:
						this.sprite().usedTiles([14]);
					break;
					
					case JSGlib.STATE.SLIP_RIGHT:
						this.sprite().usedTiles([15]);
					break;
					
					case JSGlib.STATE.DEATH:
						this.sprite().usedTiles([11]);
					break;
				}
			},
			eventEndStep: function () {
				if (this.canInteract()) {
					this.callParent('eventEndStep');
				}
			},
			eventMoveOutsideRoom: function () {
				if (this.canInteract() && this.y() > 0) {
					this.die();
				}
			},
			eventKeyDown: function (key) {
				if (this.canInteract()) {
					var returnValue = this.callParent('eventKeyDown', [key], 'Platformer');
					
					this.allowChangeState = true;
					
					switch (key) {						
						case JSGlib.KEY.SPACE:
						case JSGlib.KEY.W:
							
							this.max_hspeed	=	4;
							this.sprite().imagespeed(0.4);
							
							if (this.status == _MARIO_STATES.FIRE && Game.instanceNumber('Fireball') < 3) {
								
								var isLeft	=	this.isStateLEFT(),
									fireball	=	Game.instanceCreate(this.x() + (isLeft ? 0 : this.width()), this.y() + 4, 'Fireball');
								
								fireball.hspeed(isLeft ? -4 : 4);
								
								if (this.isLanding()) {
									this.state(JSGlib.STATE['ATTACK_' + (this.isStateLEFT() ? 'LEFT' : 'RIGHT')]);
									this.allowChangeState = false;
									this.setAlarm('AttackEnd', this.hspeed() == 0 ? 20 : 5);
								}
							}
						return false;
					}
					return returnValue;
				} else {
					return false;
				}
			},
			eventKeyUp: function (key) {
				if (!this.canInteract()) {
					return false;
				}
				var returnValue = this.callParent('eventKeyUp', [key], 'Platformer');
				
				if (key == JSGlib.KEY.SPACE || key == JSGlib.KEY.W) {
					this.max_hspeed	=	3;
					this.sprite().imagespeed(0.2);
					return false;
				}
				
				return returnValue;
			},
			eventCollision: function (other) {
				if (this.canInteract()) {
					this.callParent('eventCollision', [other], 'Platformer');
					
					if (other.instanceOf('Champi')) {
						other.destroy();
						
						if (this.status == _MARIO_STATES.MINI) {
							this.status = _MARIO_STATES.BIG;
							this.y(this.y() - 14);
						}
					} else if (other.instanceOf('Fleur')) {
						other.destroy();
						
						if (this.status == _MARIO_STATES.MINI) {
							this.y(this.y() - 14);
						}
						this.status = _MARIO_STATES.FIRE;
					}
				}
			},
			eventTileCollision: function (tile) {
				if (this.canInteract()) {
					this.callParent('eventTileCollision', [tile], 'Platformer');
				} else if (tile.type == JSGlib.TILES_TYPES.DOOR && this.x() >= tile.position.x()) {
					this.hspeed(0);
					this.fadeOut = true;
				}
			},
			eventAlarmEnableHurt: function () {
				_is_hurt	=	false;
			},
			eventAlarmAttackEnd: function () {
				this.allowChangeState = true;
			},
			eventPlatformerJump: function () {
				this.getGame().playSound('jump');
			},
			'static': {
				getStates: function () {
					return	_MARIO_STATES;
				}
			}
		});
})(myGame);