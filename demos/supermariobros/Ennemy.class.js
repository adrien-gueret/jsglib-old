(function (Game) {
    'use strict';
    Game.addClass({
        name: 'Ennemy',
		parent: 'GravityElement',
		'abstract': true,
		marioHasJumpedOnIt: function () {
			throw new Error('Method "marioHasJumpedOnIt" is abstract and must be implemented.');
		},
		marioHasFacedWithIt: function () {
			throw new Error('Method "marioHasFacedWithIt" is abstract and must be implemented.');
		},
		hit: function () {
			this.checkCollisions(false)
				.vspeed(-3)
				.gravity(0.2)
				.state(JSGlib.STATE.DEATH)
				.fallDead = true;
		},
		reverse: function () {
			this.hspeed(this.hspeed() * -1);
			return this;
		},
        eventCreate: function () {
            this.callParent('eventCreate', [], 'GravityElement');
			
			this.layer_name = 'tiles';
			
			this.hspeed(-0.5)
				.fallDead = false;
        },
		eventStartStep: function () {
			var hspeed = this.hspeed();
			
			if (!this.isStateDEATH()) {
				this.state(hspeed < 0 ? JSGlib.STATE.MOVE_LEFT : JSGlib.STATE.MOVE_RIGHT);
			} else if (this.instanceOf('Koopa')) {
				this.state(hspeed < 0
							? JSGlib.STATE.DEATH_LEFT
							: (
								hspeed > 0
								? JSGlib.STATE.DEATH_RIGHT
								: this.state()
							)
				);
			}
		},
		eventCollision: function (other) {
			if (other.instanceOf('Ennemy')) {
				var state = this.state();
				
				if (!other.isStateDEATH() && (state == JSGlib.STATE.DEATH_LEFT || state == JSGlib.STATE.DEATH_RIGHT)) {
					Game.playSound('sprotch');
					other.hit();
				} else {
					var hspeed = this.hspeed();
					
					if (hspeed > 0) {
						this.x(other.x() - this.width());
					} else if (hspeed < 0) {
						this.x(other.x() + other.width());
					}
					
					this.reverse();
				}
            } else if (other.instanceOf('Mario') && other.canInteract()) {
				var marioHeight = other.height(),
					thisY = this.y(),
					thisMask = this.sprite().getCurrentMasks();
				
				if (thisMask.length > 0) {
					thisMask = thisMask[0];				
					thisY += thisMask.rectangle.y();
				}
				
				if ((other.vspeed() > 0 || other.hasPerformedRebound) && other.prevY() + marioHeight <= thisY) {
					this.marioHasJumpedOnIt(other);
				} else {
					this.marioHasFacedWithIt(other);
				}
			} else if (other.instanceOf('Brick') && other.vspeed() < 0 && other.y() > this.y()) {
				this.hit();
			}
		},
		eventEndStep: function () {
			if (!this.fallDead) {
				this.callParent('eventEndStep', [], 'GravityElement');
			}
		},
		eventTileCollision: function (tile) {
			if (tile.type == JSGlib.TILES_TYPES.WALL) {
				this.reverse();
				if (this.isStateDEATH()) {
					Game.playSound('bump');
				}
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
				this.destroy();
			}
		}
    });
})(myGame);