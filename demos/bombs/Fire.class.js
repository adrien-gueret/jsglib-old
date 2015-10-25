(function (myGame) {
    'use strict';
	myGame.addClass({
        name: 'Fire',
        eventCreate: function () {
			var sprite =new JSGlib.Sprite(myGame.getImage('small_fire')),
				room = myGame.getCurrentRoom(),
				x = JSGlib.random(-4, room.getWidth() - 4),
				y = JSGlib.random(-4, room.getHeight() - 4);
			
			switch (JSGlib.random(1, 4)) {
				case 1:
					x = -4;
				break;
				
				case 2:
					x = room.getWidth() - 4;
				break;
				
				case 3:
					y = -4;
				break;
				
				case 4:
					y = room.getHeight() - 4;
				break;
			}
			
            this.x(x).y(y).sprite(sprite);
        },
		eventCollision: function (other) {
			if (other.instanceOf('Bomb')) {
				myGame.instanceDestroy(other);
			}
		},
		eventMoveOutsideRoom: function () {
			myGame.instanceDestroy(this);
		}
    });

	myGame.addClass({
		name: 'BigFire',
		parent: 'Fire',
		eventCreate: function() {
			var sprite = new JSGlib.Sprite(myGame.getImage('big_fire')),
				destPoint = new JSGlib.Point(this.position());
			
			sprite.makeTiles(25, 22)
				  .usedTiles([1, 2]);
			
			destPoint.add(0, sprite.getTilesHeight());
			
			this.sprite(sprite)
				.moveToPoint(destPoint, 2, this.generateAnotherFireBall);
		},
		generateAnotherFireBall: function() {
			if (myGame.instanceNumber('BigFire') < 5) {
				var fireBall = myGame.instanceCreate(this.startPosition(), 'BigFire');
				
				fireBall.bowser = this.bowser;
			} else {
				this.bowser.sprite().usedTiles([1]);
			}
		}
	});
})(myGame);