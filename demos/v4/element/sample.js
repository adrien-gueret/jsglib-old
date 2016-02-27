define(["jsglib/core/game", "jsglib/core/room", "./link"], function (_game, _room, _link) {
    "use strict";

    var _game2 = _interopRequireDefault(_game);

    var _room2 = _interopRequireDefault(_room);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var my_game = new _game2.default(document.getElementById('myGame'));
    var level = new _room2.default(512, 320);
    level.on('start', function () {
        new _link.Link(64, 64, my_game);
    });

    _link.LinkSprite.loadImage('./link.png').then(function () {
        _link.LinkSprite.init(my_game.timer);

        my_game.goToRoom(level).start();
    });
});
//# sourceMappingURL=sample.js.map