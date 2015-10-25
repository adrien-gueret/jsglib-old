(function (Game) {
    'use strict';
	
	Game.addClass({
        name: 'DeathBoos',
        eventCreate: function () {
            
			this.checkCollisions(false).sprite('death_boo', 30, 32, 1);
			this.sprite()
				.imagespeed(0.3);
						
			this.x(this.x() - this.width() / 2).y(this.y() - this.height() / 2);
        },
		eventAnimationEnd: function () {
			this.destroy();
		}
    })
})(myGame);