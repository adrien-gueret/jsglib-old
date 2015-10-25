(function (myGame) {
    'use strict';
	myGame.addClass({
        name: 'Controlor',
        eventCreate: function () {
			myGame.instanceCreate(55, 6, 'Bowser')
			this.bomb = myGame.instanceCreate(127, 288, 'Bomb');
			this.drawText = new JSGlib.Drawing.Text(this.formatTime(0))
												.color('#fff')
												.borderColor('#000')
												.opacity(90)
												.borderSize(2);											
			this.textPosition = new JSGlib.Point(10, 10);
			
			this.time = 0;
			this.gameStep = 1;
			
			this.checkCollisions(false)
				.setAlarm('Time', 0)
				.setAlarm('Fire', 0);
        },
		eventStep: function () {
			myGame.drawObject(this.drawText.text(this.formatTime(this.time)), 'textLayer', this.textPosition, true);
		},
		eventAlarmTime: function () {
			this.time++;
			
			if(this.time % 10 == 0)
			{
				this.gameStep++;
			}
			
			this.setAlarm('Time', myGame.fps());
		},
		eventAlarmFire: function () {
			var fire = null,
				center = this.bomb.getCenter();
						
			for(var i=0; i < this.gameStep; i++)
			{
				fire = myGame.instanceCreate(0, 0, 'Fire');
				fire.moveToPoint(center, JSGlib.random(1, Math.min(5, this.gameStep)));
			}
			
			this.setAlarm('Fire', myGame.fps() * 2);
		},
		formatTime: function(time) {
			var s = (time % 60);
			s = s < 10 ? '0' + s : s;
			
			var m = parseInt(time / 60);
			m = m < 10 ? '0' + m : m;
			return m + '"' + s + '\'';
		}
    });
})(myGame);