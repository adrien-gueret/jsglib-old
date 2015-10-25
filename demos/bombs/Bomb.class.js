(function (myGame) {
    'use strict';
	myGame.addClass({
        name: 'Bomb',
        eventCreate: function () {
			var sprite = new JSGlib.Sprite(myGame.getImage('bomb'));

            sprite.makeTiles(16, 25)
				  .usedTiles([1, 2]);

            this.sprite(sprite);
        },
		eventStep: function () {
			var mouse = myGame.getMouse(),
				x = mouse.x(),
				y = mouse.y();
			
			if (x > 0 && y > 0) {	
				this.x(Math.max(20,Math.min(236 - this.width(), x - this.width()/2)))
					.y(Math.max(200,Math.min(358 - this.height(), y - this.height()/2)));
			}
		},
		eventDestroy: function () {
			myGame.instanceCreate(this.position().substract(7.5, 7.5), 'Explosion');
		}
    });

	myGame.addClass({
		name: 'Explosion',
		eventCreate: function() {
			var sprite = new JSGlib.Sprite(myGame.getImage('explode'));
			
			sprite.makeTiles(30, 30, 1)
				  .usedTiles([1,2,3,4,5,6])
				  .imagespeed(0.3);
			
			this.sprite(sprite)
				.checkCollisions(false);
		},
		eventAnimationEnd: function()
		{	
			myGame.instanceDestroy(this)
				  .restartRoom();
		}
	});
})(myGame);