(function (Game) {
    'use strict';
    
	var	_hasToDrawSplash				=	false,
			_onLadder							=	false,
			_onTop									=	false,
			_INIT_SPEED						=	1,
			_LADDER_SPEED_DELTA	=	2.5,
			_link										=	null;
	
	Game.addClass({
        name: 'Link',
		canInteract: function() {
			return !Game.callStatic('ViewControlor', 'isMoved')
				&& !Game.callStatic('Message', 'isShow')
				&& !this.isStateDEATH()
				&& !this.isStateSLIP();
		},
		checkForPushing: function() {
			this.isPushing	=
										(this.isStateDOWN() || this.isStateUP()) && this.prevY() == this.y() ||
										(this.isStateRIGHT() || this.isStateLEFT()) && this.prevX() == this.x();
			return this;
		},
        eventCreate: function () {
			Game.instanceCreate(0, 0, 'ViewControlor');
			var	navi	=	Game.instanceCreate(this.x(), this.y(), 'Fairy', 'top');
			navi.setIsNavi().fellow	=	this;
			
			this.spriteSplash	=	new JSGlib.Sprite(Game.getImage('splash'))
												.makeTiles(14, 5, 1)
												.imagespeed(0.1)
												.usedTiles([1, 2, 3, 4]);
			this.drawingSplash	=	new JSGlib.Drawing.Sprite(this.spriteSplash);
			
			this.newViewStartPosition	=	new JSGlib.Point(this.position());
			this.newViewStartState		=	JSGlib.STATE.STAND_DOWN;
			this.isPushing					=	false;
			this.INIT_SPEED				= _INIT_SPEED;
															
			this
				.sprite('link', 16, 16, 1, 'link_mask')
				.maskColorForSolidCollisions('#ff0000')
				.state(JSGlib.STATE.STAND_DOWN);
				
			this.sprite().imagespeed(0.1);
			_link	=	this;
        },
		eventStartStep: function(step) {
			var	belowTileType	=	Game.getTileType(this.x() + this.width() / 2, this.y() + this.height() - 1, 'background_tiles'),
					vspeed				=	this.vspeed();
			
			_hasToDrawSplash	=	belowTileType == JSGlib.TILES_TYPES.NO_DEEP_WATER;
			_onLadder				=	belowTileType == JSGlib.TILES_TYPES.LADDER;
		
			if(_onLadder && vspeed != 0) {
				if(this.INIT_SPEED > _INIT_SPEED / _LADDER_SPEED_DELTA) {
					this.hspeed(this.hspeed() / _LADDER_SPEED_DELTA).vspeed(this.vspeed() / _LADDER_SPEED_DELTA);
				}
				this.INIT_SPEED	=	_INIT_SPEED / _LADDER_SPEED_DELTA;
				
				if(vspeed > 0) {
					_onTop	=	false;
					Game.orderLayers(['background_tiles', 'main', 'player', 'bridges_tiles', 'bridges', 'top_tiles', 'top']);
				} else {
					_onTop	=	true;
					Game.orderLayers(['background_tiles', 'main', 'bridges_tiles', 'bridges', 'player', 'top_tiles', 'top']);
				}
			} else {
				if(this.INIT_SPEED < _INIT_SPEED) {
					this.hspeed(this.hspeed() * _LADDER_SPEED_DELTA).vspeed(this.vspeed() * _LADDER_SPEED_DELTA);
				}
				this.INIT_SPEED	=	_INIT_SPEED;
			}
			
			if(this.isPushing) {
				if(this.isStateDOWN()) {
					this.sprite().usedTiles([12, 13]);
				} else if(this.isStateLEFT()) {
					this.sprite().usedTiles([14, 15]);
				}  else if(this.isStateUP()) {
					this.sprite().usedTiles([16, 17]);
				}  else if(this.isStateRIGHT()) {
					this.sprite().usedTiles([18, 19]);
				}
				this.isPushing	=	false;
				return;
			}
			
			var	tiles	=	this.sprite().usedTiles();
			
			switch(this.state()) {
				case JSGlib.STATE.STAND_DOWN:
					tiles	=	[1];
				break;
				
				case JSGlib.STATE.MOVE_DOWN:
					tiles	=	[1, 2];
				break;
				
				case JSGlib.STATE.STAND_LEFT:
					tiles	=	[3];
				break;
				
				case JSGlib.STATE.MOVE_LEFT:
					tiles	=	[3, 4];
				break;
				
				case JSGlib.STATE.STAND_UP:
					tiles	=	[5];
				break;
				
				case JSGlib.STATE.MOVE_UP:
					tiles	=	[5, 6];
				break;
				
				case JSGlib.STATE.STAND_RIGHT:
					tiles	=	[7];
				break;
				
				case JSGlib.STATE.MOVE_RIGHT:
					tiles	=	[7, 8];
				break;
				
				case JSGlib.STATE.DEATH_DOWN:
					tiles	=	[9, 10, 11];
				break;
				
				case JSGlib.STATE.DEATH:
					tiles	=	[1, 3, 5, 7, 1, 3, 5, 7, 1, 3, 5, 7, 20, 20, 20, 20, 20];
				break;
			}
						
			this.sprite().usedTiles(tiles);
		},
		eventStep: function() {
			if(!this.canInteract()) {
				return false;
			}
			
			var	view				=	Game.getCurrentRoom().view(),
					viewDirection	=	null,
					viewX			=	view.x(),
					viewY			=	view.y(),
					x					=	this.x(),
					y					=	this.y(),
					hspeed			=	this.hspeed(),
					vspeed			=	this.vspeed();
			
			if(hspeed < 0 && x + 4 < viewX) {
				viewDirection	=	JSGlib.STATE.MOVE_LEFT;
			} else if(hspeed > 0 && x + this.width() - 4 > viewX + view.width()) {
				viewDirection	=	JSGlib.STATE.MOVE_RIGHT;
			} else if(vspeed < 0 && y + 4 < viewY) {
				viewDirection	=	JSGlib.STATE.MOVE_UP;
			} else if(vspeed > 0 && y + this.height() - 4 > viewY + view.height()) {
				viewDirection	=	JSGlib.STATE.MOVE_DOWN;
			} 
			
			if(viewDirection) {
				this.hspeed(0).vspeed(0);
				Game.callStatic('ViewControlor', 'moveView', [viewDirection]);
			}
		},
		eventEndStep: function() {
			//Draw objects
			if(_hasToDrawSplash) {
				this.spriteSplash.animate();
				Game.drawObject(this.drawingSplash, 'player', new JSGlib.Point(this.x() + 1, this.y() + this.height() - 1), true);
			}
		},
		eventKeyDown: function(key) {
			if(this.canInteract()) {
				switch(key) {
					case JSGlib.KEY.RIGHT:
						JSGlib.forceKeyUp(JSGlib.KEY.LEFT);
						this.hspeed(this.INIT_SPEED);
						if(!this.isPushing) {
							this.state(JSGlib.STATE.MOVE_RIGHT);
						}
					return false;
					
					case JSGlib.KEY.LEFT:
						JSGlib.forceKeyUp(JSGlib.KEY.RIGHT);
						this.hspeed(-this.INIT_SPEED);
						if(!this.isPushing) {
							this.state(JSGlib.STATE.MOVE_LEFT);
						}
					return false;
					
					case JSGlib.KEY.UP:
						JSGlib.forceKeyUp(JSGlib.KEY.DOWN);
						this.vspeed(-this.INIT_SPEED);
						if(!this.isPushing) {
							this.state(JSGlib.STATE.MOVE_UP);
						}
					return false;
					
					case JSGlib.KEY.DOWN:
						JSGlib.forceKeyUp(JSGlib.KEY.UP);
						this.vspeed(this.INIT_SPEED);
						if(!this.isPushing) {
							this.state(JSGlib.STATE.MOVE_DOWN);
						}
					return false;
				}
			}
		},
		eventKeyUp: function(key) {
			if (this.canInteract()) {
				
				var	hspeed	=	this.hspeed(),
						vspeed	=	this.vspeed();
				
				switch (key) {
					case JSGlib.KEY.DOWN:
					case JSGlib.KEY.UP:				
						
						if(hspeed > 0) {
							this
								.state(JSGlib.STATE.MOVE_RIGHT)
								.vspeed(0);
						}
						else if(hspeed < 0) {
							this
								.state(JSGlib.STATE.MOVE_LEFT)
								.vspeed(0);
						} else {
						
							if(JSGlib.isKeyPressed(JSGlib.KEY.UP)) {
								this
									.vspeed(-this.INIT_SPEED)
									.state(JSGlib.STATE.MOVE_UP);
							} else if(JSGlib.isKeyPressed(JSGlib.KEY.DOWN)) {
								this
									.vspeed(this.INIT_SPEED)
									.state(JSGlib.STATE.MOVE_DOWN);
							} else {
								this
									.state(vspeed < 0 ? JSGlib.STATE.STAND_UP : JSGlib.STATE.STAND_DOWN)
									.vspeed(0);
							}
						}
					break;
					
					case JSGlib.KEY.RIGHT:
					case JSGlib.KEY.LEFT:			
						
						if(vspeed > 0) {
							this
								.state(JSGlib.STATE.MOVE_DOWN)
								.hspeed(0);
						} else if(vspeed < 0) {
							this
								.state(JSGlib.STATE.MOVE_UP)
								.hspeed(0);
						}
						else {
							
							if(JSGlib.isKeyPressed(JSGlib.KEY.LEFT)) {
								this
									.hspeed(-this.INIT_SPEED)
									.state(JSGlib.STATE.MOVE_LEFT);
							} else if(JSGlib.isKeyPressed(JSGlib.KEY.RIGHT)) {
								this
									.hspeed(this.INIT_SPEED)
									.state(JSGlib.STATE.MOVE_RIGHT);
							} else {
								this
									.state(hspeed < 0 ? JSGlib.STATE.STAND_LEFT : JSGlib.STATE.STAND_RIGHT)
									.hspeed(0);
							}
						}
					break;
				}
			}
		},
		eventCollision: function(other) {
			if(other.solid()) {
				this.checkForPushing();
			}
		},
		eventTileCollision: function(tile) {
				if(this.canInteract()) {				
					var	tileSize	=	Game.getTilesSize(),
							tileX		=	tile.position.x(),
							tileY		=	tile.position.y(),
							linkX		=	this.x(),
							linkY		=	this.y(),
							mask	=	this.getMask(),
							width		=	mask.width(),
							height	=	mask.height(),
							maskX	=	mask.x(),
							maskY	=	mask.y(),
							x			=	linkX + maskX,
							y			=	linkY + maskY,
							prevX	=	Math.floor(this.prevX() + maskX),
							prevY	=	Math.floor(this.prevY() + maskY),
							hspeed	=	this.hspeed(),
							vspeed	=	this.vspeed();
					
					switch(tile.type) {
						
						case JSGlib.TILES_TYPES.WALL:							
							this.checkForPushing();
						break;
						
						case JSGlib.TILES_TYPES.HOLE:
							this
								.state(JSGlib.STATE.SLIP_DOWN)
								.stopOnSolids(false)
								.moveToPoint(
									new JSGlib.Point(tileX, tileY),
									0.5,
									function () {
										Game.playSound('link_fall');
										this
											.hspeed(0).vspeed(0).state(JSGlib.STATE.DEATH_DOWN)
											.stopOnSolids(true)
											.spriteModified(true)
											.sprite()
												.imageindex(0);
									}
								);
						break;
						
						case JSGlib.TILES_TYPES.LADDER:
						case JSGlib.TILES_TYPES.BRIDGE_V:
							if(_onTop) {
								this.x(tileX);
							}
						break;
						
						case JSGlib.TILES_TYPES.BRIDGE_H:
							if(_onTop) {
								this.y(tileY - tileSize / 2);
							}
						break;
						
						case JSGlib.TILES_TYPES.TOP_AREA:
							if(_onTop) {
								switch(tile['number']) {
									case 43: //BOTTOM LEFT
										Game.callStatic('Utils', 'checkWalkToLeftOnTop', [this, tileX]);
										Game.callStatic('Utils', 'checkWalkToDownOnTop', [this, tileY]);
									break;
									
									case 45: //BOTTOM RIGHT
										Game.callStatic('Utils', 'checkWalkToRightOnTop', [this, tileX]);
										Game.callStatic('Utils', 'checkWalkToDownOnTop', [this, tileY]);
									break;
									
									case 52: //TOP LEFT
										Game.callStatic('Utils', 'checkWalkToLeftOnTop', [this, tileX]);
										Game.callStatic('Utils', 'checkWalkToUpOnTop', [this, tileY]);
									break;
									
									case 53: //TOP
										Game.callStatic('Utils', 'checkWalkToUpOnTop', [this, tileY]);
									break;
									
									case 54: //TOP RIGHT
										Game.callStatic('Utils', 'checkWalkToRightOnTop', [this, tileX]);
										Game.callStatic('Utils', 'checkWalkToUpOnTop', [this, tileY]);
									break;
									
									case 62: //DOWN
										Game.callStatic('Utils', 'checkWalkToDownOnTop', [this, tileY]);
									break;
								}
							} else {
					
								if(
									hspeed != 0
									&& (
										vspeed == 0 
										|| (
											vspeed > 0 && prevY + height != tileY
											||
											vspeed < 0 && tileY + tileSize != prevY
										)
									)
									&& (
										prevX + width == tileX || tileX + tileSize == prevX
									)
								) {
									this.x(this.prevX()).checkForPushing();
								}

								if(
									vspeed != 0
									&& (
										hspeed == 0 
										|| (
											hspeed > 0 && prevX + width != tileX
											||
											hspeed < 0 && tileX + tileSize != prevX
										)
									)
									&& (
										prevY + height == tileY || tileY + tileSize == prevY
									)
								) {
									this.y(this.prevY()).checkForPushing();
								}
							}
						break;
					}
				}
		},
		eventAnimationEnd: function() {
			switch(this.state()) {
				case JSGlib.STATE.DEATH_DOWN:
					this
						.prevPosition(this.newViewStartPosition)
						.position(this.newViewStartPosition)
						.state(this.newViewStartState);
						
					Game.callStatic('Data', 'looseLife', 1);
				break;
				
				case JSGlib.STATE.DEATH:
					Game.restartRoom();
					Game.callStatic('Data', 'setLife', 12);
				break;
			}
		},
		eventViewMovedStart: function(direction, speed) {
			speed	/=	16;
			switch(direction) {
				case JSGlib.STATE.MOVE_LEFT:
					this.hspeed(-speed);
				break;
				
				case JSGlib.STATE.MOVE_RIGHT:
					this.hspeed(speed);
				break;
				
				case JSGlib.STATE.MOVE_UP:
					this.vspeed(-speed);
				break;
				
				case JSGlib.STATE.MOVE_DOWN:
					this.vspeed(speed);
				break;
			}
		},
		eventViewMovedEnd: function(direction) {
			var	link				=	this.hspeed(0).vspeed(0),
					keyPressed	=	false;
			link.newViewStartPosition	=	new JSGlib.Point(link.position());
			link.newViewStartState		=	direction - 10; //-10 in order to have a STAND state instead of a MOVE one
			
			JSGlib.forEach([JSGlib.KEY.LEFT, JSGlib.KEY.RIGHT, JSGlib.KEY.UP, JSGlib.KEY.DOWN], function () {
				if(JSGlib.isKeyPressed(this)) {
					link.eventKeyDown(this);
					keyPressed	=	true;
				}
			});
			
			if(!keyPressed) {
				link.state(link.newViewStartState);
			}
		},
		'static': {
			getLink	:	function() {
				return _link;
			},
			dead		:	function () {
				if(_link) {
					_link.state(JSGlib.STATE.DEATH).sprite().imagespeed(0.15);
				}
			},
			isOnTop	:	function () {
				return _onTop;
			}
		}
    });
})(myGame);