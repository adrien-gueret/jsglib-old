"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (window) {
	"use strict";

	var JSGlib = window.JSGlib || {};

	var Timer = (function (_JSGlib$EventsHandler) {
		_inherits(Timer, _JSGlib$EventsHandler);

		function Timer() {
			var fps = arguments.length <= 0 || arguments[0] === undefined ? 30 : arguments[0];

			_classCallCheck(this, Timer);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Timer).call(this));

			_this.fps = fps;
			_this.clocks = {};

			_this.on('step', function () {
				_this.checkCounters();
			});
			return _this;
		}

		_createClass(Timer, [{
			key: "checkCounters",
			value: function checkCounters() {
				for (var generated_event_name in this.clocks) {
					var clock = this.clocks[generated_event_name];
					if (++clock.counter >= clock.target) {
						this.trigger(generated_event_name);
						this.clearTimeout(generated_event_name);
					}
				}

				return this;
			}
		}, {
			key: "setTimeout",
			value: function setTimeout(callback, time) {
				var generated_event_name = (Date.now() * Math.random()).toString(16);
				this.clocks[generated_event_name] = {
					counter: 0,
					target: time / 1000 * this.fps
				};
				this.on(generated_event_name, callback);
				return generated_event_name;
			}
		}, {
			key: "clearTimeout",
			value: function clearTimeout(generated_event_name) {
				delete this.clocks[generated_event_name];
				return this.off(generated_event_name);
			}
		}]);

		return Timer;
	})(JSGlib.EventsHandler);

	Timer.fps = 30;

	JSGlib.Timer = Timer;
	window.JSGlib = JSGlib;
})(window, document);
//# sourceMappingURL=timer.js.map