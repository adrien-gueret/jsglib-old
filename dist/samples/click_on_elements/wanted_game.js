function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/core/game", "jsglib/core/utils", "./head", "./sprites"], function (exports, _game, _utils, _head, _sprites) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _game2 = _interopRequireDefault(_game);

    var _utils2 = _interopRequireDefault(_utils);

    var _head2 = _interopRequireDefault(_head);

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

    var WantedGame = (function (_Game) {
        _inherits(WantedGame, _Game);

        function WantedGame(game_container) {
            _classCallCheck(this, WantedGame);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WantedGame).call(this, game_container));

            _this.points = 0;
            _this.total_heads = 5;
            _this.time_counter = 30;

            _this.on('start', function () {
                _this.wanted_tile = _sprites.BigHeadsSprite.getTile(_sprites.CHARACTERS_NUMBERS.NONE);

                _this.updateTimer();

                _this.changeCharacter();

                _this.launchTimer();
            });

            return _this;
        }

        _createClass(WantedGame, [{
            key: "launchTimer",
            value: function launchTimer() {
                var _this2 = this;

                this.timer.setTimeout(function () {
                    _this2.time_counter--;

                    _this2.updateTimer();

                    if (_this2.time_counter) {
                        _this2.launchTimer(_this2.timer);
                    } else {
                        _this2.trigger('stop_timer');
                    }
                }, 1000);
            }
        }, {
            key: "updateTimer",
            value: function updateTimer() {
                var timer = this.time_counter >= 10 ? this.time_counter : '0' + this.time_counter;
                this.trigger('update_timer', {
                    timer: timer
                });
            }
        }, {
            key: "changeCharacter",
            value: function changeCharacter() {
                var new_tile_number = this.wanted_tile.tile_number;

                while (new_tile_number === this.wanted_tile.tile_number) {
                    new_tile_number = _utils2.default.random(1, 4);
                }

                this.wanted_tile.setTileNumber(new_tile_number);
                var backgroundPosition = "-" + this.wanted_tile.sheet_position.x + "px " + this.wanted_tile.sheet_position.y + "px";
                this.trigger('change_character', {
                    backgroundPosition: backgroundPosition
                });
                this.generateHeads();
            }
        }, {
            key: "generateHeads",
            value: function generateHeads() {
                var _this3 = this;

                var characters = [_sprites.CHARACTERS_NUMBERS.LUIGI, _sprites.CHARACTERS_NUMBERS.MARIO, _sprites.CHARACTERS_NUMBERS.YOSHI, _sprites.CHARACTERS_NUMBERS.WARIO].filter(function (number) {
                    return number !== _this3.wanted_tile.tile_number;
                });
                var numbers = [this.wanted_tile.tile_number];

                for (var total = 0, max = this.total_heads - 1; total < max; total++) {
                    numbers.push(characters[_utils2.default.random(0, 2)]);
                }

                _utils2.default.shuffleArray(numbers).forEach(function (number) {
                    var head = new _head2.default(_this3.current_room.getSize(), number);

                    if (_this3.checkIsWanted(head)) {
                        head.on('click', function (e) {
                            e.stopPropagation();
                            _this3.total_heads += 5;

                            _this3.trigger('win_round', {
                                points: ++_this3.points
                            });

                            _this3.changeCharacter();
                        });
                    }
                });
            }
        }, {
            key: "checkIsWanted",
            value: function checkIsWanted(element) {
                return this.wanted_tile.tile_number === element.current_tile.tile_number;
            }
        }]);

        return WantedGame;
    })(_game2.default);

    exports.default = WantedGame;
});
//# sourceMappingURL=wanted_game.js.map