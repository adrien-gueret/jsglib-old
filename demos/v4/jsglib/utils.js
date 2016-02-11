define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.random = random;
    exports.shuffleArray = shuffleArray;

    function random(min, max) {
        if (min > max) {
            var _ref = [max, min];
            min = _ref[0];
            max = _ref[1];
        }

        var delta = 1 + max - min;
        return Math.floor(delta * Math.random()) + min;
    }

    function shuffleArray(array) {
        var shuffled_array = [];
        var length = array.length;

        while (length) {
            var randomIndex = Math.floor(Math.random() * array.length);
            var value = array.splice(randomIndex, 1);
            length--;
            shuffled_array.push(value[0]);
        }

        return shuffled_array;
    }

    var Utils = {
        random: random,
        shuffleArray: shuffleArray
    };
    exports.default = Utils;
});
//# sourceMappingURL=utils.js.map