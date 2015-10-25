(function (Game) {
    'use strict';
	
	var _brick_has_jumped = false;
	
    Game.addClass({
        name: 'Brick',
        eventCreate: function () {
            var sprite = new JSGlib.Sprite(Game.getImage('objects'));
			
			sprite.makeTiles(16, 16, 1)
				  .usedTiles([3]);
			
			this.sprite(sprite)
				.solid(true)
				.canBeHit = true;
        },
		eventCollision: function (other) {
			if ( !_brick_has_jumped && this.vspeed() === 0 &&
				other.instanceOf('Mario') &&
				other.state() != JSGlib.STATE.DEATH &&
				other.prevY() >= this.y() + this.height() ) {
				Game.playSound('bump');
				
				if (this.canBeHit) {
					_brick_has_jumped = true;
					this.setPath([new JSGlib.Point(this.x(), this.y() - 8), this.startPosition()], 3, function () {
						this.position(this.startPosition())
							.vspeed(0)
							.hitCallback(other);
					});
				}
			}
		},
		eventOutsideView: function () {
			if (this.x() < Game.getCurrentRoom().view().x()) {
				this.destroy();
			}
		},
		hitCallback: function (mario) {
			if (mario.status > Game.callStatic('Mario', 'getStates').MINI) {
				var	x	=	this.x(),
						y	=	this.y(),
						w	=	this.width(),
						h	=	this.height();
				
				Game.playSound('brick');
				
				Game.instanceCreate(x, y, 'BrokenBrick')
							.hspeed(-0.7).vspeed(-4);
							
				Game.instanceCreate(x, y + h, 'BrokenBrick')
							.hspeed(-0.7).vspeed(-4);
							
				Game.instanceCreate(x + w, y, 'BrokenBrick')
							.hspeed(0.7).vspeed(-4);
							
				Game.instanceCreate(x + w, y + h, 'BrokenBrick')
							.hspeed(0.7).vspeed(-4);
				
				this.destroy();
			}
		},
		'static': {
			resetBrickHasJumped: function () {
				_brick_has_jumped = false;
			}
		}
    }).addClass({
        name: 'BrickSurprise',
		parent: 'Brick',
        eventCreate: function () {
            this.callParent('eventCreate', [], 'Brick');
			this.sprite()
					.usedTiles([4, 5, 6, 5]);
        },
		hitCallback: function (mario) {
			this.sprite()
					.usedTiles([7]);
			this.canBeHit = false;
			this.createObject(mario);
		}
    }).addClass({
        name: 'BrickSurpriseCoin',
		parent: 'BrickSurprise',
        createObject: function () {
            Game.instanceCreate(this.x(), this.y() - this.height(), 'Coins');
        }
    }).addClass({
        name: 'BrickSurprisePowerUp',
		parent: 'BrickSurprise',
        createObject: function (mario) {
			Game.playSound('item');
			Game.instanceCreate(this.x(), this.y() - this.height(), mario.status > Game.callStatic('Mario', 'getStates').MINI ? 'Fleur' : 'Champi');
        }
    })
	.addClass({
        name: 'BrokenBrick',
        eventCreate: function () {			
			var sprite = new JSGlib.Sprite(Game.getImage('small_objects'));
			
			sprite.makeTiles(8, 8, 1)
				  .usedTiles([5, 6, 7, 8])
				  .imagespeed(0.8);
			
			this.sprite(sprite)
				.checkCollisions(false)
				.stopOnSolids(false)
				.gravity(0.3);
        },
		eventOutsideView: function () {
			this.destroy();
		}
    });
})(myGame);