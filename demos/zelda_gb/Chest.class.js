(function (Game) {
    'use strict';
    
	Game.addClass({
        name: 'Chest',
		eventCreate: function() {
			this
				.solid(true)
				.sprite('objects', 16, 16, 1)
				.sprite()
					.usedTiles([1]);
		}
    });
})(myGame);