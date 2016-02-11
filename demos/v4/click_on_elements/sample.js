define(["jsglib/game", "jsglib/room", "jsglib/layer", "./wanted_game", "./sprites"], function (_game, _room, _layer, _wanted_game, _sprites) {
    "use strict";

    var _game2 = _interopRequireDefault(_game);

    var _room2 = _interopRequireDefault(_room);

    var _layer2 = _interopRequireDefault(_layer);

    var _wanted_game2 = _interopRequireDefault(_wanted_game);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var game_container = document.getElementById('myGame');
    var big_head_container = document.getElementById('big_head');
    var timer_container = document.getElementById('timer');
    var points_container = document.getElementById('points');
    var my_game = new _wanted_game2.default(game_container);
    var level = new _room2.default(256, 192);
    Promise.all([_sprites.SmallHeadsSprite.loadImage('./small_heads.png'), _sprites.BigHeadsSprite.loadImage('./big_heads.png')]).then(function () {
        _sprites.SmallHeadsSprite.init();

        _sprites.BigHeadsSprite.init();

        my_game.on('win_round', function (e) {
            points_container.innerHTML = e.detail.points;

            _layer2.default.MAIN_LAYER.elements.forEach(function (element) {
                return element.destroy();
            });
        }).on('change_character', function (e) {
            big_head_container.style.backgroundPosition = e.detail.backgroundPosition;
        }).on('update_timer', function (e) {
            timer_container.innerHTML = e.detail.timer;
        }).on('stop_timer', function () {
            _layer2.default.MAIN_LAYER.elements.filter(function (element) {
                return !my_game.checkIsWanted(element);
            }).forEach(function (element) {
                return element.destroy();
            });

            my_game.stop();
        });
        my_game.goToRoom(level).start();
        game_container.style.display = 'block';
    });
});
//# sourceMappingURL=sample.js.map