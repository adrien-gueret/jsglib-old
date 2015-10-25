(function (Game) {
    'use strict';
    Game.addClass({
        name: 'Koopa',
		parent: 'Ennemy',
		die: function () {
			this.hspeed(0)
				.setAlarm('WakeUp', Game.fps() * 2.5)
				.state(JSGlib.STATE.DEATH)
				.alwaysActive(false);
		},
		marioHasJumpedOnIt: function (mario) {
			Game.playSound('sprotch');
			var isDeath = this.isStateDEATH();
							  
			mario.rebound(this.y());
			
			if (isDeath) {
				if (this.hspeed() !== 0) {
					this.die();
				} else {
					this.cancelAlarm('WakeUp')
						.goAttack(mario);
				}
			} else {
				this.die();
			}
		},
		marioHasFacedWithIt: function (mario) {
			var isDeath = this.isStateDEATH(),
				isMoving = this.hspeed() !== 0;
						
			if (!isDeath || isDeath && isMoving) {
				mario.hurt();
			} else if (isDeath && !isMoving) {
				this.goAttack(mario);
				Game.playSound('sprotch');
			}
		},
		goAttack: function (mario) {
			if (mario.getCenter().x() < this.getCenter().x()) {
				this.hspeed(4.1)
					.state(JSGlib.STATE.DEATH_RIGHT)
					.x(mario.x() + mario.width())
					.sprite()
						.imagespeed(0.3);
			} else {
				this.hspeed(-4.1)
					.state(JSGlib.STATE.DEATH_LEFT)
					.x(mario.x() - this.width())
					.sprite()
						.imagespeed(0.3);
			}
			this.alwaysActive(true);
		},
		eventAlarmWakeUp: function () {
			this.state(JSGlib.STATE.DEATH_UP)
				.sprite()
					.imagespeed(0.05);
		},
        eventCreate: function () {
            this.callParent('eventCreate', [], 'Ennemy');
			
			this.maskColorForSolidCollisions(new JSGlib.Color('#ff0000'))
				.sprite('koopa', 16, 24, 0, 'koopa_mask')
				.sprite()
					.imagespeed(0.1);
        },
		eventStep: function () {			
			this.callParent('eventStep', [], 'GravityElement');
			
			switch(this.state()) {
				case JSGlib.STATE.MOVE_LEFT:
					this.sprite().usedTiles([1, 2]);
				break;
				
				case JSGlib.STATE.MOVE_RIGHT:
					this.sprite().usedTiles([8, 9]);
				break;
				
				case JSGlib.STATE.DEATH:
					this.sprite().usedTiles([4]);
				break;
				
				case JSGlib.STATE.DEATH_UP:
					this.sprite().usedTiles([3, 4, 3, 4, 3, 4]);
				break;
				
				case JSGlib.STATE.DEATH_RIGHT:
					this.sprite().usedTiles([4, 5, 6, 7]);
				break;
				
				case JSGlib.STATE.DEATH_LEFT:
					this.sprite().usedTiles([7, 6, 5, 4]);
				break;
			}
		},
		eventAnimationEnd: function () {
			if (this.state() == JSGlib.STATE.DEATH_UP) {
				var mario = this.getGame().getInstancesByType('Mario')[0];
				
				if (!mario || mario.getCenter().x() < this.getCenter().x()) {
					this.hspeed(-0.5)
						.state(JSGlib.STATE.MOVE_LEFT);
				} else {
					this.hspeed(0.5)
						.state(JSGlib.STATE.MOVE_RIGHT);
				}
			}
		}
    });
})(myGame);