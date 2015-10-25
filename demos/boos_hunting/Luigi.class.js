(function (Game) {
    'use strict';
	
	Game.addClass({
        name: 'Luigi',
        eventCreate: function () {
            		
			this
				.hspeed(3)
				.sprite('luigi', 75, 67, 1)
				.x(-this.width() - 800)
				.y(Game.getCurrentRoom().getHeight() - this.height())
				.checkCollisions(false)
				.sprite()
					.usedTiles([1, 2, 3, 4, 3, 2])
					.imagespeed(0.2);
					
			this.light	=	new JSGlib.Drawing.Shape([
				new JSGlib.Point(74, 41),
				new JSGlib.Point(800, -140),
				new JSGlib.Point(800, 50),
				new JSGlib.Point(74, 51),
			]);
        },
		eventStep: function () {
			if (this.x() >= Game.getCurrentRoom().getWidth()) {
				this.destroy();
			}
			
			var	point	=	new JSGlib.Point(this.position());
			
			if (this.sprite().getCurrentTileNumber() == 4) {
				point.substract(0, 2);
			}
			
			Game.eraseObject(this.light, 'light_layer', point);
		},
		eventGameEnd: function () {
			this.destroy(true);
		},
    });
})(myGame);