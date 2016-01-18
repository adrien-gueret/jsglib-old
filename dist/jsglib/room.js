function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/events_handler", "jsglib/http"], function (exports, _events_handler, _http) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _events_handler2 = _interopRequireDefault(_events_handler);

	var _http2 = _interopRequireDefault(_http);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = (function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	})();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Room = (function (_EventsHandler) {
		_inherits(Room, _EventsHandler);

		function Room() {
			var width = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var height = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			_classCallCheck(this, Room);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Room).call(this));

			_this.width = width;
			_this.height = height;
			_this.definition = null;
			return _this;
		}

		_createClass(Room, [{
			key: "initRoom",
			value: function initRoom(game) {
				var _this2 = this;

				if (!this.definition) {
					return this;
				}

				if (this.definition.layers) {
					this.width = 0;
					this.height = 0;

					var _loop = function _loop(layer_name) {
						var definition = _this2.definition.layers[layer_name];
						var layer = game.getLayerFromName(layer_name);
						layer.tiles_sprite = null;
						layer.tiles = [];

						if (definition.tiles) {
							(function () {
								var SpriteClass = game.getClass(definition.sprite_class);
								layer.tiles_sprite = new SpriteClass();
								definition.tiles.forEach(function (row, row_index) {
									layer.tiles[row_index] = layer.tiles[row_index] || [];
									row.forEach(function (tile_number, column_index) {
										layer.tiles[row_index][column_index] = SpriteClass.getTile(tile_number);
									});
								});
								var tiles_size = layer.tiles_sprite.getTilesSize();
								_this2.width = Math.max(_this2.width, layer.tiles[0].length * tiles_size.width);
								_this2.height = Math.max(_this2.height, layer.tiles.length * tiles_size.height);
							})();
						}
					};

					for (var layer_name in this.definition.layers) {
						_loop(layer_name);
					}
				} else {
					this.width = this.definition.width;
					this.height = this.definition.height;
				}

				return this;
			}
		}, {
			key: "useDefinition",
			value: function useDefinition(data) {
				var _this3 = this;

				var promise = function promise(resolve) {
					if (typeof data === 'string') {
						_http2.default.get(data, {
							data_type: _http2.default.DATA_TYPES.JSON
						}).then(function (data) {
							_this3.definition = data;
							resolve();
						});
					} else {
						_this3.definition = data;
						resolve();
					}
				};

				return new Promise(promise);
			}
		}]);

		return Room;
	})(_events_handler2.default);

	exports.default = Room;
});
//# sourceMappingURL=room.js.map