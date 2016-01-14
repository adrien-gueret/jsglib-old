(function(window) {
    "use strict";

    let JSGlib = window.JSGlib || {};

	class Timer extends JSGlib.EventsHandler {
		constructor(fps = 30) {
			super();

			this.fps = fps;
			this.clocks = {};

			this.on('step', () => {
				this.checkCounters();
			});
		}
		checkCounters() {
			for (let generated_event_name in this.clocks) {
				let clock = this.clocks[generated_event_name];
				if (++clock.counter >= clock.target) {
					this.trigger(generated_event_name);
					this.clearTimeout(generated_event_name);
				}
			}

			return this;
		}
		setTimeout(callback, time) {
			let generated_event_name = (Date.now() * Math.random()).toString(16);
			this.clocks[generated_event_name] = {
				counter: 0,
				target: (time / 1000) * this.fps
			};
			this.on(generated_event_name, callback);
			return generated_event_name;
		}
		clearTimeout(generated_event_name) {
			delete this.clocks[generated_event_name];
			return this.off(generated_event_name);
		}
    }
	Timer.fps = 30;

	JSGlib.Timer = Timer;
    window.JSGlib = JSGlib;
})(window, document);