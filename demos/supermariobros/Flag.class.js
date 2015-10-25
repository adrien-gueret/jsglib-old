(function (Game) {
    'use strict';
    Game.addClass({
        name: 'Flag',
        eventCreate: function () {
            this.x(this.x() - 7);
			
			this.sprite('objects', 16, 16, 1)
				.sprite()
					.imagespeed(0.2)
					.usedTiles([8, 9, 10]);
								
			this.mario = Game.getInstancesByType('Mario')[0];
        },
		eventStep: function () {
			if (!this.mario.flagFinished && this.mario.x() + this.mario.width() >= this.x()) {
				this.mario.x(this.x() - this.mario.width());
				
				if (!this.mario.touchFlag && this.mario.y() >= this.y()) {
					this.mario.hspeed(0)
								.vspeed(1)
								.gravity(0)
								.touchFlag = true;
								
					Game.stopAllSounds().playSound('flag');
				
					this.vspeed(1);
				}
			}
		},
		eventTileCollision: function (tile) {
			if (tile.type == JSGlib.TILES_TYPES.WALL) {
				this.vspeed(0);
				this.mario.hspeed(1);
				this.mario
					 .state(JSGlib.STATE.MOVE_RIGHT)
					 .flagFinished = true;
					 
				Game.playSound('levelEnd', false, function () {
					this.restartRoom();
				});
            }
		}
    });
})(myGame);