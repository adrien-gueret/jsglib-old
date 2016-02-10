function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/element", "jsglib/utils", "./head", "./sprites"], function (exports, _element, _utils, _head, _sprites) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _element2 = _interopRequireDefault(_element);

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

    var GameControllor = (function (_Element) {
        _inherits(GameControllor, _Element);

        function GameControllor(game_timer, room_size) {
            _classCallCheck(this, GameControllor);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameControllor).call(this));

            _this.game_timer = game_timer;
            _this.room_size = room_size;
            _this.points = 0;
            _this.total_heads = 5;
            _this.time_counter = 30;

            _this.setSpriteClass(_sprites.BigHeadsSprite, _sprites.CHARACTERS_NUMBERS.NONE);

            return _this;
        }

        _createClass(GameControllor, [{
            key: "start",
            value: function start() {
                this.updateTimer();
                this.changeCharacter();
                this.launchTimer(this.game_timer);
            }
        }, {
            key: "launchTimer",
            value: function launchTimer(timer) {
                var _this2 = this;

                timer.setTimeout(function () {
                    _this2.time_counter--;

                    _this2.updateTimer();

                    if (_this2.time_counter) {
                        _this2.launchTimer(timer);
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
                var new_tile_number = this.current_tile.tile_number;

                while (new_tile_number === this.current_tile.tile_number) {
                    new_tile_number = _utils2.default.random(1, 4);
                }

                this.current_tile.setTileNumber(new_tile_number);
                var backgroundPosition = "-" + this.current_tile.sheet_position.x + "px " + this.current_tile.sheet_position.y + "px";
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
                    return number !== _this3.current_tile.tile_number;
                });
                var numbers = [this.current_tile.tile_number];

                for (var total = 0, max = this.total_heads - 1; total < max; total++) {
                    numbers.push(characters[_utils2.default.random(0, 2)]);
                }

                _utils2.default.shuffleArray(numbers).forEach(function (number) {
                    var head = new _head2.default(_this3.room_size, number);
                    head.on('click', function (e) {
                        if (_this3.checkIsWanted(head)) {
                            e.stopPropagation();
                            _this3.total_heads += 5;

                            _this3.trigger('next_level', {
                                points: ++_this3.points
                            });

                            _this3.changeCharacter();
                        }
                    });
                });
            }
        }, {
            key: "checkIsWanted",
            value: function checkIsWanted(element) {
                return this.current_tile.tile_number === element.current_tile.tile_number;
            }
        }]);

        return GameControllor;
    })(_element2.default);

    exports.default = GameControllor;
});
//# sourceMappingURL=controllor.js.map