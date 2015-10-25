(function (Game) {
    'use strict';
    
	Game.addClass({
        name: 'Rock',
		eventCreate: function() {
			this
				.solid(true)
				.sprite('objects', 16, 16, 1)
				.sprite()
					.usedTiles([3]);
		}
    });
})(myGame);