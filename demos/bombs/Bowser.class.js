(function (myGame) {
    'use strict';
	myGame.addClass({
        name: 'Bowser',
        eventCreate: function() {
			var sprite = new JSGlib.Sprite(myGame.getImage('bowser'));
			
			sprite.makeTiles(152, 117)
				  .usedTiles([1]);

			this.destX = 0;
			
			this.sprite(sprite)
			    .setAlarm('Move', myGame.fps() * 5);		
		},
		eventAlarmMove: function() {
			this.destX = JSGlib.random(0, myGame.getCurrentRoom().getWidth() - this.width());
						
			var destPoint = new JSGlib.Point(this.destX, this.y());
			
			this.moveToPoint(destPoint, 1, this.stopMove);
		},
		eventAlarmFire: function() {
			if (JSGlib.random(1, 3) > 1) {
				this.sprite().usedTiles([2]);
				var fireBall = myGame.instanceCreate(new JSGlib.Point(this.position()).add(62, 52), 'BigFire');
				
				fireBall.bowser = this;
			}
			this.setAlarm('Move', myGame.fps() * 4);
		},
		stopMove: function() {
			this.destX = 0;
			this.hspeed(0)
				.setAlarm('Fire', myGame.fps() * 2);
		}
    });
})(myGame);