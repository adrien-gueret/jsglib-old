(function (Game) {
    'use strict';
    Game.addClass({
        name: 'Goomba',
		parent: 'Ennemy',
		marioHasJumpedOnIt: function (mario) {
			if (this.state() != JSGlib.STATE.DEATH) {
				Game.playSound('sprotch');
				this.state(JSGlib.STATE.DEATH)
					.hspeed(0)
					.setAlarm('Destroy', Game.fps() / 2);
					
				mario.rebound(this.y());
			}
		},
		marioHasFacedWithIt: function (mario) {
			if (this.state() != JSGlib.STATE.DEATH) {
				mario.hurt()
			}
		},
		eventAlarmDestroy: function () {
			this.destroy();
		},
        eventCreate: function () {
            this.callParent('eventCreate', [], 'Ennemy');
			
			this.sprite('goomba', 16, 16, 2)
				.sprite()
					.imagespeed(0.1);
        },
		eventStep: function () {			
			this.callParent('eventStep', [], 'GravityElement');
			
			switch(this.state()) {
				case JSGlib.STATE.MOVE_LEFT:
				case JSGlib.STATE.MOVE_RIGHT:
					this.sprite().usedTiles([2, 3]);
				break;
				
				case JSGlib.STATE.DEATH:
					this.sprite().usedTiles([1]);
				break;
			}
		}
    });
})(myGame);