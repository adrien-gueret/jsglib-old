(function(JSGlib, document) {
    "use strict";

	class MainTilesSprite extends JSGlib.Sprite {
		static initTiles() {
			this.makeTiles(32, 32)
				.defineTilesAnimations({
					tiles: [6, 14],
					time: 500
				})
				.defineTilesTypes({
					type: JSGlib.Sprite.TILES_TYPES.WALL,
					tiles: [1, 2, 3, 7, 8, 9, 11, 15, 16, 17, 18, 19, 23]
				});
			return this;
		}
	}

	class TilesPlainSprite extends MainTilesSprite {}
	class TilesSnowSprite extends MainTilesSprite {}

	var my_game = new JSGlib.Game(document.getElementById('myGame'));
	my_game.registerClass(TilesPlainSprite);
	my_game.registerClass(TilesSnowSprite);

	var level1 = new JSGlib.Room();

	Promise.all([
		TilesPlainSprite.loadImage('./tiles_plain.png'),
		TilesSnowSprite.loadImage('./tiles_snow.png')
	])
	.then(() => {
		TilesPlainSprite.initTiles();
		TilesSnowSprite.initTiles();
		return level1.useDefinition('./level1.json');
	})
	.then(() => {
		my_game
			.goToRoom(level1)
			.start();

		my_game.container.onclick = () => {
			let used_sprite = JSGlib.Layer.TILES_LAYER.tiles_sprite;
			let new_sprite_class = used_sprite instanceof TilesPlainSprite ? TilesSnowSprite : TilesPlainSprite;
			JSGlib.Layer.TILES_LAYER.tiles_sprite = new new_sprite_class();

			JSGlib.Layer.TILES_LAYER.tiles.forEach(row => {
				row.forEach(tile => {
					if (!tile.sprite_class) {
						return;
					}

					tile.sprite_class = new_sprite_class;
				});
			});

			JSGlib.Layer.TILES_LAYER.draw(my_game.timer, true);
		};
	});

})(JSGlib, document);