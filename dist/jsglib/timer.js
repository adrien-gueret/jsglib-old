function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(["exports", "jsglib/events_handler"], function (exports, _events_handler) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _events_handler2 = _interopRequireDefault(_events_handler);

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

	var Timer = (function (_EventsHandler) {
		_inherits(Timer, _EventsHandler);

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
	})(_events_handler2.default);

	exports.default = Timer;
});
//# sourceMappingURL=timer.js.map