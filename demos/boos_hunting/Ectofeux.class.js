(function (Game) {
    'use strict';
	
	Game.addClass({
        name: 'Ectofeux',
        eventCreate: function () {
            this.checkCollisions(false).sprite('ectofeux', 25, 37, 1).goToNewPoint();
			this.light	=	new JSGlib.Drawing.Circle();
			this.tiles	=	[1, 2, 3]	;	
        },
		eventDestroy: function () {
			Game.playSound('boo_wrong');
			if (Game.instanceNumber('Ectofeux') == 1) {
				Game.callStatic('Boos', 'makeDark');
			}
		},
		eventGameEnd: function () {
			this.destroy(true);
		},
		eventStep: function (step) {
			var	tiles				=	this.tiles.slice(0);
	
			if (this.isStateLEFT()) {
				tiles	=	tiles.map(function (i) {
					return i + 3;
				});
			}
				
			this.sprite().usedTiles(tiles);
			
			switch (this.sprite().getCurrentTileNumber()) {
				case 1:
				case 4:
					this.light.radius(40);
				break;
				
				case 2:
				case 5:
					this.light.radius(39);
				break;
				
				default : this.light.radius(38);
			}
			
			Game.eraseObject(this.light, 'light_layer', this.getCenter());
		},
		eventAlarmWaitForNewPoint: function () {
			this.goToNewPoint();
		},
		goToNewPoint: function () {
			var	room	=	Game.getCurrentRoom();
			
			this.moveToPoint(
				new JSGlib.Point(
					JSGlib.random(0, room.getWidth() - this.width()),
					JSGlib.random(0, room.getHeight() - this.height())
				),
				1,
				function () {
					this.hspeed(0).vspeed(0);
					this.setAlarm('WaitForNewPoint', JSGlib.random(10, 200));
				}
			);
			
			this.state(JSGlib.STATE['MOVE_' + (this.hspeed() < 0 ? 'LEFT' : 'RIGHT')]);
			
			return this;
		}
    })
})(myGame);