(function(window) {
    "use strict";

    let JSGlib = window.JSGlib || {};

    JSGlib.Point = class Point {
		constructor(x = 0, y = 0) {
			this.x = x;
			this.y = y;
		}
    };

    window.JSGlib = JSGlib;
})(window);