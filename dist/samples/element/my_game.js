define(["jsglib/game", "jsglib/room", "jsglib/layer", "./car"], function (_game, _room, _layer, _car) {
    "use strict";

    var _game2 = _interopRequireDefault(_game);

    var _room2 = _interopRequireDefault(_room);

    var _layer2 = _interopRequireDefault(_layer);

    var _car2 = _interopRequireDefault(_car);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    console.log(_car2.default);
    var my_game = new _game2.default(document.getElementById('myGame'));
    var level = new _room2.default(500, 300);
    level.on('start', function () {
        var myCar = new _car2.default(10, 130);
    });
    my_game.goToRoom(level).start();
});
//# sourceMappingURL=my_game.js.map