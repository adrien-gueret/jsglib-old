(function (Game) {
    'use strict';
    
	Game.addClass({
        name: 'Grass',
		eventCreate: function() {
			this
				.solid(true)
				.sprite('objects', 16, 16, 1)
				.sprite()
					.usedTiles([4]);
		}
    });
})(myGame);