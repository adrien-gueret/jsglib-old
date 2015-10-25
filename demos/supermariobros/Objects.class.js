(function (Game) {
    'use strict';
    Game.addClass({
        name: 'Coins',
        eventCreate: function () {
			this.checkCollisions(false)
				.vspeed(-0.5)
				.sprite('objects', 16, 16, 1)
				.sprite()
					.imagespeed(0.2)
					.usedTiles([11, 12, 13, 14, 15, 16, 17]);
					
			Game.playSound('coin');
        },
		eventAnimationEnd: function () {
			this.destroy();
		}
    })
	.addClass({
        name: 'Champi',
		parent: 'GravityElement',
		reverse: function () {
			this.hspeed(this.hspeed() * -1);
			return this;
		},
        eventCreate: function () {
			this.callParent('eventCreate', [], 'GravityElement');
			
			this.hspeed(1)
				.sprite('objects', 16, 16, 1)
				.sprite()
					.usedTiles([18]);
			
			this.layer_name = 'tiles';
			this.gravity_value = 0.4;
        },
		eventTileCollision: function (tile) {
			if (tile.type == JSGlib.TILES_TYPES.WALL) {
				this.reverse();
            }
		},
		eventCollision: function (other) {
			if (other.instanceOf('Brick') && other.vspeed() < 0 && other.y() > this.y()) {
				this.vspeed(-4);
			}
		},
		eventOutsideView: function () {
			var view = this.getGame().getCurrentRoom().view(),
				thisX = this.x(),
				viewX = view.x();
			
			if (
				(thisX < viewX || this.y() > view.y() + view.height()) ||
				(thisX >= viewX + view.width() * 1.5 && this.hspeed() > 0)
			)
			{
				this.destroy(true);
			}
		},
		eventDestroy: function () {
			Game.playSound('powerup');
		}
    })
	.addClass({
        name: 'Fleur',
		parent: 'GravityElement',
        eventCreate: function () {
			this.callParent('eventCreate', [], 'GravityElement');
			
			this.sprite('objects', 16, 16, 1)
				.sprite()
					.imagespeed(0.8)
					.usedTiles([19, 20, 21, 22]);
			
			this.layer_name = 'tiles';
        },
		eventDestroy: function () {
			Game.playSound('powerup');
		}
    })
	.addClass({
        name: 'Fireball',
        eventCreate: function () {			
			this.sprite('small_objects', 8, 8, 1)
				.sprite()
					.imagespeed(0.4)
					.usedTiles([1, 2, 3, 4]);
			
			this.gravity(0.3);
			
			Game.playSound('fireball');
        },
		eventDestroy: function () {
			Game.instanceCreate(this.x(), this.y(), 'FireballEnd');
		},
		eventTileCollision: function (tile) {
			if (tile.type == JSGlib.TILES_TYPES.WALL) {
				if (tile.position.y() >= this.y() + this.height()) {
					this.vspeed(-3);
				} else {
					this.destroy();
				}
            }
		},
		eventCollision: function (other) {
			if (other.instanceOf('Ennemy')) {
				other.hspeed(Math.abs(other.hspeed()) * (this.hspeed() > 0 ? 1 : -1)).hit();
				this.destroy();
			} else if (other.solid()) {
				if (other.y() >= this.y() + this.height()) {
					this.vspeed(-3);
				} else {
					this.destroy();
				}
			}
		},
		eventOutsideView: function () {
			this.destroy(true);
		}
    })
	.addClass({
        name: 'FireballEnd',
        eventCreate: function () {
			this.checkCollisions(false)
				.sprite('objects', 16, 16, 1)
				.sprite()
					.imagespeed(0.3)
					.usedTiles([23, 24, 25, 26]);
					
			Game.playSound('fireball_end');
        },
		eventAnimationEnd: function () {
			this.destroy();
		}
    });
})(myGame);