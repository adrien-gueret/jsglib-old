'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (JSGlib, document) {
	"use strict";

	var MainTilesSprite = (function (_JSGlib$Sprite) {
		_inherits(MainTilesSprite, _JSGlib$Sprite);

		function MainTilesSprite() {
			_classCallCheck(this, MainTilesSprite);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(MainTilesSprite).apply(this, arguments));
		}

		_createClass(MainTilesSprite, null, [{
			key: 'initTiles',
			value: function initTiles() {
				this.makeTiles(32, 32).defineTilesAnimations({
					tiles: [6, 14],
					time: 500
				}).defineTilesTypes({
					type: JSGlib.Sprite.TILES_TYPES.WALL,
					tiles: [1, 2, 3, 7, 8, 9, 11, 15, 16, 17, 18, 19, 23]
				});
				return this;
			}
		}]);

		return MainTilesSprite;
	})(JSGlib.Sprite);

	var TilesPlainSprite = (function (_MainTilesSprite) {
		_inherits(TilesPlainSprite, _MainTilesSprite);

		function TilesPlainSprite() {
			_classCallCheck(this, TilesPlainSprite);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(TilesPlainSprite).apply(this, arguments));
		}

		return TilesPlainSprite;
	})(MainTilesSprite);

	var TilesSnowSprite = (function (_MainTilesSprite2) {
		_inherits(TilesSnowSprite, _MainTilesSprite2);

		function TilesSnowSprite() {
			_classCallCheck(this, TilesSnowSprite);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(TilesSnowSprite).apply(this, arguments));
		}

		return TilesSnowSprite;
	})(MainTilesSprite);

	var my_game = new JSGlib.Game(document.getElementById('myGame'));
	my_game.registerClass(TilesPlainSprite);
	my_game.registerClass(TilesSnowSprite);

	var level1 = new JSGlib.Room();

	Promise.all([TilesPlainSprite.loadImage('./tiles_plain.png'), TilesSnowSprite.loadImage('./tiles_snow.png')]).then(function () {
		TilesPlainSprite.initTiles();
		TilesSnowSprite.initTiles();
		return level1.useDefinition('./level1.json');
	}).then(function () {
		my_game.goToRoom(level1).start();

		my_game.container.onclick = function () {
			var used_sprite = JSGlib.Layer.TILES_LAYER.tiles_sprite;
			var new_sprite_class = used_sprite instanceof TilesPlainSprite ? TilesSnowSprite : TilesPlainSprite;
			JSGlib.Layer.TILES_LAYER.tiles_sprite = new new_sprite_class();

			JSGlib.Layer.TILES_LAYER.tiles.forEach(function (row) {
				row.forEach(function (tile) {
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
//# sourceMappingURL=sample.js.map