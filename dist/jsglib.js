!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.JSGLib = factory() : root.JSGLib = factory();
}(this, function() {
    /******/
    return function(modules) {
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: !1,
                /******/
                exports: {}
            };
            /******/
            // Return the exports of the module
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        // Load entry module and return exports
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        // identity function for calling harmony imports with the correct context
        /******/
        /******/
        // define getter function for harmony exports
        /******/
        /******/
        // getDefaultExport function for compatibility with non-harmony modules
        /******/
        /******/
        // Object.prototype.hasOwnProperty.call
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.i = function(value) {
            return value;
        }, __webpack_require__.d = function(exports, name, getter) {
            /******/
            __webpack_require__.o(exports, name) || /******/
            Object.defineProperty(exports, name, {
                /******/
                configurable: !1,
                /******/
                enumerable: !0,
                /******/
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            /******/
            var getter = module && module.__esModule ? /******/
            function() {
                return module.default;
            } : /******/
            function() {
                return module;
            };
            /******/
            /******/
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 139);
    }([ /* 0 */
    /***/
    function(module, exports) {
        var core = module.exports = {
            version: "2.4.0"
        };
        "number" == typeof __e && (__e = core);
    }, /* 1 */
    /***/
    function(module, exports, __webpack_require__) {
        var store = __webpack_require__(40)("wks"), uid = __webpack_require__(26), Symbol = __webpack_require__(4).Symbol, USE_SYMBOL = "function" == typeof Symbol, $exports = module.exports = function(name) {
            return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)("Symbol." + name));
        };
        $exports.store = store;
    }, /* 2 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = !0, exports.default = function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        };
    }, /* 3 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _defineProperty = __webpack_require__(87), _defineProperty2 = _interopRequireDefault(_defineProperty);
        exports.default = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), (0, _defineProperty2.default)(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }();
    }, /* 4 */
    /***/
    function(module, exports) {
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = global);
    }, /* 5 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(14);
        module.exports = function(it) {
            if (!isObject(it)) throw TypeError(it + " is not an object!");
            return it;
        };
    }, /* 6 */
    /***/
    function(module, exports, __webpack_require__) {
        // Thank's IE8 for his funny defineProperty
        module.exports = !__webpack_require__(18)(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 7 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4), core = __webpack_require__(0), ctx = __webpack_require__(17), hide = __webpack_require__(11), PROTOTYPE = "prototype", $export = function(type, name, source) {
            var key, own, out, IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), expProto = exports[PROTOTYPE], target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
            IS_GLOBAL && (source = name);
            for (key in source) // contains in native
            own = !IS_FORCED && target && void 0 !== target[key], own && key in exports || (// export native or passed
            out = own ? target[key] : source[key], // prevent global pollution for namespaces
            exports[key] = IS_GLOBAL && "function" != typeof target[key] ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
                var F = function(a, b, c) {
                    if (this instanceof C) {
                        switch (arguments.length) {
                          case 0:
                            return new C();

                          case 1:
                            return new C(a);

                          case 2:
                            return new C(a, b);
                        }
                        return new C(a, b, c);
                    }
                    return C.apply(this, arguments);
                };
                return F[PROTOTYPE] = C[PROTOTYPE], F;
            }(out) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out, // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
            IS_PROTO && ((exports.virtual || (exports.virtual = {}))[key] = out, // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
            type & $export.R && expProto && !expProto[key] && hide(expProto, key, out)));
        };
        // type bitmap
        $export.F = 1, // forced
        $export.G = 2, // global
        $export.S = 4, // static
        $export.P = 8, // proto
        $export.B = 16, // bind
        $export.W = 32, // wrap
        $export.U = 64, // safe
        $export.R = 128, // real proto method for `library` 
        module.exports = $export;
    }, /* 8 */
    /***/
    function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(5), IE8_DOM_DEFINE = __webpack_require__(60), toPrimitive = __webpack_require__(42), dP = Object.defineProperty;
        exports.f = __webpack_require__(6) ? Object.defineProperty : function(O, P, Attributes) {
            if (anObject(O), P = toPrimitive(P, !0), anObject(Attributes), IE8_DOM_DEFINE) try {
                return dP(O, P, Attributes);
            } catch (e) {}
            if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
            return "value" in Attributes && (O[P] = Attributes.value), O;
        };
    }, /* 9 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function initEventsCallback(handler) {
            handler.$events_callbacks || (handler.$events_callbacks = {});
        }
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_2__core_trait__ = __webpack_require__(20), JSGLibEvent = function() {
            function JSGLibEvent(detail) {
                __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, JSGLibEvent), 
                this.defaultPrevented = !1, this.propagationStopped = !1, this.detail = detail;
            }
            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(JSGLibEvent, [ {
                key: "stopPropagation",
                value: function() {
                    this.propagationStopped = !0;
                }
            }, {
                key: "preventDefault",
                value: function() {
                    this.defaultPrevented = !0;
                }
            } ]), JSGLibEvent;
        }(), Events_Handler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__core_trait__.a)({
            /**
     * @method on
     * @public
     * @description Add an event listener.
     * @param {String} event_name Name of the event to listen.
     * @param {Function} callback Function to call when `event_name` is triggered. It receive a **JSGLibEvent** as
     * parameter.
     * @return {Core.Element} This instance.
     * @example
     * myInstance.on('my_event_name', (e) => {
     *  console.log(e);
     *  // ...
     * });
     */
            on: function(event_name, callback) {
                return initEventsCallback(this), this.$events_callbacks[event_name] || (this.$events_callbacks[event_name] = []), 
                this.$events_callbacks[event_name].push(callback), this;
            },
            /**
     * @method off
     * @public
     * @description Remove one or multiple events listeners.
     * @param {String} [event_name] Name of the event to remove. If omitted, all events will be removed.
     * @param {Function} [callback] Function to remove from specific `event_name`. If omitted, all listeners from
     * `event_name` will be removed.
     * @return {Core.Element} This instance.
     * @example myInstance.off();
     * @example myInstance.off('my_event_name');
     * @example myInstance.off('my_event_name', myCallback);
     */
            off: function(event_name, callback) {
                var _this = this;
                if (initEventsCallback(this), !event_name) {
                    for (var name in this.$events_callbacks) this.off(name);
                    return this;
                }
                return this.$events_callbacks[event_name] ? callback ? (this.$events_callbacks[event_name].some(function(event_callback, index) {
                    if (callback === event_callback) return _this.$events_callbacks[event_name].splice(index, 1), 
                    !0;
                }), this.$events_callbacks[event_name].length || delete this.$events_callbacks[event_name], 
                this) : (delete this.$events_callbacks[event_name], this) : this;
            },
            /**
     * @method trigger
     * @public
     * @description Trigger the specific event and execute the registered corresponding callbacks.
     * @param {String} [event_name] Name of the event to trigger.
     * @param {Object} [detail={}] Details of the event to send.
     * @return {Event} A custom **JSGLibEvent**.
     * @example myInstance.trigger('my_event_name');
     * @example myInstance.trigger('my_event_name', { someData: 'someValue' });
     */
            trigger: function(event_name) {
                var detail = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                initEventsCallback(this);
                var custom_event = new JSGLibEvent(detail);
                return this.$events_callbacks[event_name] ? (this.$events_callbacks[event_name].some(function(callback) {
                    return callback(custom_event), custom_event.propagationStopped;
                }), custom_event) : custom_event;
            }
        });
        /* harmony default export */
        __webpack_exports__.a = Events_Handler;
    }, /* 10 */
    /***/
    function(module, exports) {
        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
        };
    }, /* 11 */
    /***/
    function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(8), createDesc = __webpack_require__(24);
        module.exports = __webpack_require__(6) ? function(object, key, value) {
            return dP.f(object, key, createDesc(1, value));
        } : function(object, key, value) {
            return object[key] = value, object;
        };
    }, /* 12 */
    /***/
    function(module, exports, __webpack_require__) {
        // to indexed object, toObject with fallback for non-array-like ES3 strings
        var IObject = __webpack_require__(109), defined = __webpack_require__(34);
        module.exports = function(it) {
            return IObject(defined(it));
        };
    }, /* 13 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__), Point = function() {
            function Point() {
                var x = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Point), 
                this.x = x, this.y = y, this.x_min = NaN, this.y_min = NaN, this.x_max = NaN, this.y_max = NaN;
            }
            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Point, [ {
                key: "set",
                value: function(x) {
                    var y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : x;
                    return this.x = x, this.y = y, isNaN(this.x_min) || (this.x = Math.max(this.x, this.x_min)), 
                    isNaN(this.x_max) || (this.x = Math.min(this.x, this.x_max)), isNaN(this.y_min) || (this.y = Math.max(this.y, this.y_min)), 
                    isNaN(this.y_max) || (this.y = Math.min(this.y, this.y_max)), this;
                }
            }, {
                key: "$set",
                value: function(x, y, new_point) {
                    return new_point ? this.clone().set(x, y) : this.set(x, y);
                }
            }, {
                key: "copy",
                value: function(point) {
                    return this.set(point.x, point.y);
                }
            }, {
                key: "clone",
                value: function() {
                    return new Point(this.x, this.y).minimum(this.x_min, this.y_min, !1).maximum(this.x_max, this.y_max, !1);
                }
            }, {
                key: "equals",
                value: function(point) {
                    return this.x === point.x && this.y === point.y;
                }
            }, {
                key: "add",
                value: function(point) {
                    var new_point = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], new_x = this.x + point.x, new_y = this.y + point.y;
                    return this.$set(new_x, new_y, new_point);
                }
            }, {
                key: "subtract",
                value: function(point) {
                    var new_point = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], new_x = this.x - point.x, new_y = this.y - point.y;
                    return this.$set(new_x, new_y, new_point);
                }
            }, {
                key: "multiply",
                value: function(point) {
                    var new_point = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], new_x = this.x * point.x, new_y = this.y * point.y;
                    return this.$set(new_x, new_y, new_point);
                }
            }, {
                key: "divide",
                value: function(point) {
                    var new_point = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], new_x = this.x / point.x, new_y = this.y / point.y;
                    return this.$set(new_x, new_y, new_point);
                }
            }, {
                key: "abs",
                value: function() {
                    var new_point = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], new_x = Math.abs(this.x), new_y = Math.abs(this.y);
                    return this.$set(new_x, new_y, new_point);
                }
            }, {
                key: "round",
                value: function() {
                    var new_point = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], new_x = this.x + (this.x < 0 ? -.5 : .5), new_y = this.y + (this.y < 0 ? -.5 : .5);
                    return this.$set(0 | new_x, 0 | new_y, new_point);
                }
            }, {
                key: "minimum",
                value: function(x) {
                    var y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : x, new_point = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], point = new_point ? this.clone() : this;
                    return point.x_min = x, point.y_min = y, this.set(this.x, this.y);
                }
            }, {
                key: "maximum",
                value: function(x) {
                    var y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : x, new_point = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], point = new_point ? this.clone() : this;
                    return point.x_max = x, point.y_max = y, this.set(this.x, this.y);
                }
            }, {
                key: "isInRectangle",
                value: function(rectangle) {
                    return this.x >= rectangle.position.x && this.x < rectangle.position.x + rectangle.width && this.y >= rectangle.position.y && this.y < rectangle.position.y + rectangle.height;
                }
            }, {
                key: "isOverElement",
                value: function(element) {
                    return this.isInRectangle(element.getRectangle());
                }
            }, {
                key: "getDistanceFromPoint",
                value: function(point) {
                    var delta = this.subtract(point, !0).abs();
                    return delta.multiply(delta), Math.sqrt(delta.x + delta.y);
                }
            } ]), Point;
        }();
        /* harmony default export */
        __webpack_exports__.a = Point;
    }, /* 14 */
    /***/
    function(module, exports) {
        module.exports = function(it) {
            return "object" == typeof it ? null !== it : "function" == typeof it;
        };
    }, /* 15 */
    /***/
    function(module, exports) {
        module.exports = {};
    }, /* 16 */
    /***/
    function(module, exports) {
        var toString = {}.toString;
        module.exports = function(it) {
            return toString.call(it).slice(8, -1);
        };
    }, /* 17 */
    /***/
    function(module, exports, __webpack_require__) {
        // optional / simple context binding
        var aFunction = __webpack_require__(32);
        module.exports = function(fn, that, length) {
            if (aFunction(fn), void 0 === that) return fn;
            switch (length) {
              case 1:
                return function(a) {
                    return fn.call(that, a);
                };

              case 2:
                return function(a, b) {
                    return fn.call(that, a, b);
                };

              case 3:
                return function(a, b, c) {
                    return fn.call(that, a, b, c);
                };
            }
            return function() {
                return fn.apply(that, arguments);
            };
        };
    }, /* 18 */
    /***/
    function(module, exports) {
        module.exports = function(exec) {
            try {
                return !!exec();
            } catch (e) {
                return !0;
            }
        };
    }, /* 19 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_2__point__ = __webpack_require__(13), Rectangle = function() {
            function Rectangle() {
                var width = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, height = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, position = arguments[2];
                __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Rectangle), 
                this.width = width, this.height = height, this.position = position ? position.clone() : new __WEBPACK_IMPORTED_MODULE_2__point__.a();
            }
            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Rectangle, [ {
                key: "clone",
                value: function() {
                    return new Rectangle(this.width, this.height, this.position);
                }
            }, {
                key: "getCenter",
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_2__point__.a(this.position.x + this.width / 2, this.position.y + this.height / 2);
                }
            }, {
                key: "getSize",
                value: function() {
                    var width = this.width, height = this.height;
                    return {
                        width: width,
                        height: height
                    };
                }
            }, {
                key: "isCollidedWithRectangle",
                value: function(rectangle) {
                    // too right
                    // too left
                    // too down
                    return !(rectangle.position.x >= this.position.x + this.width || rectangle.position.x + rectangle.width <= this.position.x || rectangle.position.y >= this.position.y + this.height || rectangle.position.y + rectangle.height <= this.position.y);
                }
            }, {
                key: "containsRectangle",
                value: function(rectangle) {
                    return rectangle.position.x > this.position.x && rectangle.position.y > this.position.y && rectangle.position.x + rectangle.width < this.position.x + this.width && rectangle.position.y + rectangle.height < this.position.y + this.height;
                }
            } ]), Rectangle;
        }();
        /* harmony default export */
        __webpack_exports__.a = Rectangle;
    }, /* 20 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        // TODO: export to Utils?
        function Trait(trait) {
            return function(target_class) {
                __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_names___default()(trait).forEach(function(property_name) {
                    target_class.prototype[property_name] = trait[property_name];
                });
            };
        }
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_names__ = __webpack_require__(30), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_names___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_names__);
        /* harmony default export */
        __webpack_exports__.a = Trait;
    }, /* 21 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(101),
            __esModule: !0
        };
    }, /* 22 */
    /***/
    function(module, exports) {
        module.exports = !0;
    }, /* 23 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.14 / 15.2.3.14 Object.keys(O)
        var $keys = __webpack_require__(67), enumBugKeys = __webpack_require__(36);
        module.exports = Object.keys || function(O) {
            return $keys(O, enumBugKeys);
        };
    }, /* 24 */
    /***/
    function(module, exports) {
        module.exports = function(bitmap, value) {
            return {
                enumerable: !(1 & bitmap),
                configurable: !(2 & bitmap),
                writable: !(4 & bitmap),
                value: value
            };
        };
    }, /* 25 */
    /***/
    function(module, exports, __webpack_require__) {
        var def = __webpack_require__(8).f, has = __webpack_require__(10), TAG = __webpack_require__(1)("toStringTag");
        module.exports = function(it, tag, stat) {
            it && !has(it = stat ? it : it.prototype, TAG) && def(it, TAG, {
                configurable: !0,
                value: tag
            });
        };
    }, /* 26 */
    /***/
    function(module, exports) {
        var id = 0, px = Math.random();
        module.exports = function(key) {
            return "Symbol(".concat(void 0 === key ? "" : key, ")_", (++id + px).toString(36));
        };
    }, /* 27 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var $at = __webpack_require__(125)(!0);
        // 21.1.3.27 String.prototype[@@iterator]()
        __webpack_require__(61)(String, "String", function(iterated) {
            this._t = String(iterated), // target
            this._i = 0;
        }, function() {
            var point, O = this._t, index = this._i;
            return index >= O.length ? {
                value: void 0,
                done: !0
            } : (point = $at(O, index), this._i += point.length, {
                value: point,
                done: !1
            });
        });
    }, /* 28 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(129);
        for (var global = __webpack_require__(4), hide = __webpack_require__(11), Iterators = __webpack_require__(15), TO_STRING_TAG = __webpack_require__(1)("toStringTag"), collections = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], i = 0; i < 5; i++) {
            var NAME = collections[i], Collection = global[NAME], proto = Collection && Collection.prototype;
            proto && !proto[TO_STRING_TAG] && hide(proto, TO_STRING_TAG, NAME), Iterators[NAME] = Iterators.Array;
        }
    }, /* 29 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign__ = __webpack_require__(85), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_3__traits_events_handler__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_4__point__ = __webpack_require__(13), __WEBPACK_IMPORTED_MODULE_5__rectangle__ = __webpack_require__(19), __WEBPACK_IMPORTED_MODULE_6__mask__ = __webpack_require__(49), __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(52), Element = function() {
            function Element(x, y) {
                __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Element), 
                this.prev_position = new __WEBPACK_IMPORTED_MODULE_4__point__.a(NaN, NaN), this.position = new __WEBPACK_IMPORTED_MODULE_4__point__.a(x, y), 
                this.transform_origin = new __WEBPACK_IMPORTED_MODULE_4__point__.a(), this.rotation = 0, 
                this.layer = null, this.sprite_class = null, this.current_tile = null, this.current_animation = null, 
                this.speed = new __WEBPACK_IMPORTED_MODULE_4__point__.a(), this.acceleration = new __WEBPACK_IMPORTED_MODULE_4__point__.a(), 
                this.is_destroyed = !1, this.is_inside_room = !1, this.is_solid = !1, this.stop_on_solids = !1;
            }
            return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Element, [ {
                key: "destroy",
                value: function() {
                    var custom_event = this.trigger("destroy");
                    return custom_event.defaultPrevented ? this : (this.current_animation && (this.current_animation.stop(), 
                    this.current_animation = null), this.is_destroyed = !0, this);
                }
            }, {
                key: "setSpriteClass",
                value: function(sprite_class) {
                    var current_tile_number = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    return this.sprite_class = sprite_class, this.current_tile = sprite_class.getTile(current_tile_number), 
                    this;
                }
            }, {
                key: "setCurrentTileNumber",
                value: function(tile_number) {
                    return this.current_tile = this.sprite_class.getTile(tile_number), this.layer && (this.layer.needs_clear = !0), 
                    this;
                }
            }, {
                key: "useAnimation",
                value: function(animation_name, time) {
                    var _this = this, loop = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], timer = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                    if (this.current_animation && this.current_animation.is_running) {
                        if (this.getAnimationName() === animation_name) return this;
                        this.current_animation.stop();
                    }
                    var animation_class = this.sprite_class.getAnimationClass(animation_name);
                    if (!animation_class) throw new ReferenceError('Element.useAnimation: animation "' + animation_name + '" is not defined for sprite "' + this.sprite_class.name + '".');
                    return this.current_animation = new animation_class(timer), this.setCurrentTileNumber(this.current_animation.getCurrentTileNumber()), 
                    this.current_animation.on("animation_update", function() {
                        _this.setCurrentTileNumber(_this.current_animation.getCurrentTileNumber());
                    }).start(time, loop), this;
                }
            }, {
                key: "getAnimationName",
                value: function() {
                    return this.current_animation ? this.current_animation.name : "";
                }
            }, {
                key: "getSize",
                value: function() {
                    var _getRectangle = this.getRectangle(), width = _getRectangle.width, height = _getRectangle.height;
                    return {
                        width: width,
                        height: height
                    };
                }
            }, {
                key: "getDirection",
                value: function() {
                    var to_degree = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], direction = Math.atan2(-this.speed.y, this.speed.x);
                    return to_degree ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils__.a)(direction) : direction;
                }
            }, {
                key: "draw",
                value: function(ctx) {
                    var transform_origin = this.position.add(this.transform_origin, !0), draw_position = this.position.subtract(transform_origin, !0);
                    return ctx.save(), ctx.translate(transform_origin.x, transform_origin.y), ctx.rotate(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils__.b)(this.rotation)), 
                    this.current_tile.draw(ctx, draw_position.x, draw_position.y), ctx.restore(), this;
                }
            }, {
                key: "getRectangle",
                value: function() {
                    var size = this.sprite_class ? this.sprite_class.getTilesSize() : {};
                    return new __WEBPACK_IMPORTED_MODULE_5__rectangle__.a(size.width, size.height, this.position);
                }
            }, {
                key: "setTransformOriginToCenter",
                value: function() {
                    var _getSize = this.getSize(), width = _getSize.width, height = _getSize.height;
                    return this.transform_origin.set(width / 2, height / 2), this;
                }
            }, {
                key: "move",
                value: function(delta_time) {
                    var delta_position = new __WEBPACK_IMPORTED_MODULE_4__point__.a(delta_time, delta_time);
                    return this.speed.add(this.acceleration), this.position.add(this.speed.multiply(delta_position, !0)), 
                    this;
                }
            }, {
                key: "getCurrentMasks",
                value: function() {
                    return this.current_tile.hasMasks() ? this.current_tile.masks : [ __WEBPACK_IMPORTED_MODULE_6__mask__.a.createFromRectangle(this.getRectangle(), this.is_solid, this.stop_on_solids) ];
                }
            }, {
                key: "checkCollisions",
                value: function(layers) {
                    var _this2 = this, has_solid_collision = !1, solid_tiles_collisions = [], solid_elements_collisions = [], solid_masks_collisions = [];
                    if (this.getCurrentMasks().forEach(function(mask) {
                        for (var layer_name in layers) {
                            var layer = layers[layer_name], collisions_data = _this2.checkTilesCollisions(layer, mask);
                            // Check collisions with solid tiles
                            if (mask.stop_on_solids && collisions_data.solids_collisions) {
                                has_solid_collision = !0;
                                var new_solid_collisions = collisions_data.tiles.filter(function(tile_data) {
                                    return tile_data.tile.isSolid();
                                });
                                new_solid_collisions = new_solid_collisions.map(function(solid_tile_data) {
                                    return {
                                        mask: mask,
                                        solid_tile_data: solid_tile_data
                                    };
                                }), solid_tiles_collisions = solid_tiles_collisions.concat(new_solid_collisions), 
                                _this2.refinePosition(layer, mask, _this2.checkTilesCollisions), collisions_data.slopes_collisions && _this2.refinePositionOnSlopes(new_solid_collisions.filter(function(collision_data) {
                                    return collision_data.solid_tile_data.tile.isSlope();
                                }));
                            }
                            // Trigger collision events for each tile
                            collisions_data.tiles.some(function(tile_data) {
                                var custom_event = _this2.trigger("tile_collision", {
                                    tile_data: tile_data,
                                    mask: mask
                                });
                                return custom_event.propagationStopped;
                            }), // Then check collisions with other elements
                            collisions_data = _this2.checkElementsCollisions(layer, mask), // Check collisions with solid elements
                            mask.stop_on_solids && collisions_data.solids_collisions && (has_solid_collision = !0, 
                            collisions_data.collisions.forEach(function(collision) {
                                collision.element.is_solid && solid_elements_collisions.push({
                                    mask: mask,
                                    solid_element: collision.element
                                });
                                var new_solid_masks = collision.masks.filter(function(mask) {
                                    return mask.is_solid;
                                });
                                new_solid_masks = new_solid_masks.map(function(solid_mask) {
                                    return {
                                        mask: mask,
                                        solid_mask: solid_mask
                                    };
                                }), solid_masks_collisions = solid_masks_collisions.concat(new_solid_masks);
                            }), _this2.refinePosition(layer, mask, _this2.checkElementsCollisions)), // Trigger collision events for each element
                            collisions_data.collisions.some(function(collision) {
                                var custom_event = _this2.trigger("collision", {
                                    collision: collision
                                });
                                return custom_event.propagationStopped;
                            });
                        }
                    }), has_solid_collision) {
                        var elements_collisions = solid_elements_collisions.map(function(collision) {
                            return {
                                mask: collision.mask,
                                solid: collision.solid_element,
                                position: collision.solid_element.position
                            };
                        }), masks_collisions = solid_masks_collisions.map(function(collision) {
                            return {
                                mask: collision.mask,
                                solid: collision.solid_mask,
                                position: collision.solid_mask.position
                            };
                        }), tiles_collisions = solid_tiles_collisions.map(function(collision) {
                            return {
                                mask: collision.mask,
                                solid: collision.solid_tile_data.tile,
                                position: collision.solid_tile_data.position
                            };
                        }), all_solids_collisions = tiles_collisions.concat(elements_collisions).concat(masks_collisions);
                        this.trigger("solids_collision", {
                            elements_collisions: elements_collisions,
                            masks_collisions: masks_collisions,
                            tiles_collisions: tiles_collisions,
                            all_solids_collisions: all_solids_collisions
                        });
                    } else this.trigger("no_solids_collision");
                }
            }, {
                key: "checkTilesCollisions",
                value: function(layer, mask) {
                    var position = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.position, data = {
                        tiles: [],
                        solids_collisions: !1,
                        slopes_collisions: !1,
                        only_slopes_collisions: !1
                    };
                    if (!layer.tiles.length) return data;
                    var rectangle = mask.clone();
                    rectangle.position.add(position), data.tiles = layer.getTilesFromRectangle(rectangle);
                    var end_slope_tile = data.tiles.filter(function(tile_data) {
                        return tile_data.tile.isEndSlope();
                    })[0];
                    // If collision with "end of slope" tile, ignore solid directly next to this tile
                    if (end_slope_tile) {
                        var contact_y = end_slope_tile.tile.getContactY(rectangle.getCenter().x, end_slope_tile.position);
                        // Ignore only if element can interact with this slope
                        if (!isNaN(contact_y)) {
                            var delta = end_slope_tile.tile.getSize().width;
                            0 === end_slope_tile.tile.slope_point.x && (delta *= -1), data.tiles = data.tiles.filter(function(tile_data) {
                                return !(tile_data.tile.isSolid() && tile_data.position.y === end_slope_tile.position.y && tile_data.position.x === end_slope_tile.position.x + delta);
                            });
                        }
                    }
                    var solids_tiles = data.tiles.filter(function(tile_data) {
                        return tile_data.tile.isSolid();
                    });
                    return data.solids_collisions = solids_tiles.length > 0, data.slopes_collisions = data.solids_collisions && solids_tiles.some(function(tile_data) {
                        return tile_data.tile.isSlope();
                    }), data.only_slopes_collisions = data.slopes_collisions && solids_tiles.every(function(tile_data) {
                        return tile_data.tile.isSlope();
                    }), data;
                }
            }, {
                key: "checkElementsCollisions",
                value: function(layer, mask) {
                    var _this3 = this, position = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.position, data = {
                        collisions: [],
                        solids_collisions: !1
                    };
                    if (!layer.elements.length) return data;
                    var rectangle = mask.clone();
                    return rectangle.position.add(position), layer.elements.forEach(function(element) {
                        if (element !== _this3) {
                            var collision = {
                                element: null,
                                masks: []
                            };
                            element.getCurrentMasks().forEach(function(otherMask) {
                                var otherRectangle = otherMask.clone();
                                otherRectangle.position.add(element.position), rectangle.isCollidedWithRectangle(otherRectangle) && (collision.element = element, 
                                collision.masks.push(otherRectangle));
                            }), collision.element && data.collisions.push(collision);
                        }
                    }), data.solids_collisions = data.collisions.some(function(collision) {
                        return collision.element.is_solid || collision.masks.some(function(mask) {
                            return mask.is_solid;
                        });
                    }), data;
                }
            }, {
                key: "refinePosition",
                value: function(layer, mask, checkCollisionsMethod) {
                    // Refine X
                    for (var delta_position = this.position.subtract(this.prev_position, !0), limit_x = Math.abs(delta_position.x), limit_y = Math.abs(delta_position.y), delta_x = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(delta_position.x), delta_y = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(delta_position.y), new_position = this.prev_position.clone(), x = 0; x < limit_x; x++) {
                        new_position.x += delta_x;
                        var collisions_data = checkCollisionsMethod.call(this, layer, mask, new_position);
                        if (collisions_data.solids_collisions && !collisions_data.only_slopes_collisions) {
                            new_position.x -= delta_x;
                            break;
                        }
                    }
                    // Refine Y
                    for (var y = 0; y < limit_y; y++) {
                        new_position.y += delta_y;
                        var _collisions_data = checkCollisionsMethod.call(this, layer, mask, new_position);
                        if (_collisions_data.solids_collisions && !_collisions_data.only_slopes_collisions) {
                            new_position.y -= delta_y;
                            break;
                        }
                    }
                    return this.position.copy(new_position), this;
                }
            }, {
                key: "refinePositionOnSlopes",
                value: function(slopes_tiles_data) {
                    var _this4 = this, new_position = this.position.clone(), height = this.getSize().height, center_x = this.getRectangle().getCenter().x;
                    return slopes_tiles_data.some(function(slope_data) {
                        var y_contact = slope_data.solid_tile_data.tile.getContactY(center_x, slope_data.solid_tile_data.position);
                        return !isNaN(y_contact) && (new_position.y = y_contact - height - 1, new_position.y - _this4.position.y >= 0 || (_this4.position.copy(new_position).round(), 
                        !0));
                    });
                }
            }, {
                key: "onCollision",
                value: function(targetClass, callback) {
                    return this.on("collision", function(e) {
                        var element = e.detail.collision.element;
                        element instanceof targetClass && callback(e.detail.collision, e);
                    }), this;
                }
            } ]), Element;
        }();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__traits_events_handler__.a)(Element), 
        /* harmony default export */
        __webpack_exports__.a = Element;
    }, /* 30 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(96),
            __esModule: !0
        };
    }, /* 31 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(100),
            __esModule: !0
        };
    }, /* 32 */
    /***/
    function(module, exports) {
        module.exports = function(it) {
            if ("function" != typeof it) throw TypeError(it + " is not a function!");
            return it;
        };
    }, /* 33 */
    /***/
    function(module, exports, __webpack_require__) {
        // getting tag from 19.1.3.6 Object.prototype.toString()
        var cof = __webpack_require__(16), TAG = __webpack_require__(1)("toStringTag"), ARG = "Arguments" == cof(function() {
            return arguments;
        }()), tryGet = function(it, key) {
            try {
                return it[key];
            } catch (e) {}
        };
        module.exports = function(it) {
            var O, T, B;
            return void 0 === it ? "Undefined" : null === it ? "Null" : "string" == typeof (T = tryGet(O = Object(it), TAG)) ? T : ARG ? cof(O) : "Object" == (B = cof(O)) && "function" == typeof O.callee ? "Arguments" : B;
        };
    }, /* 34 */
    /***/
    function(module, exports) {
        // 7.2.1 RequireObjectCoercible(argument)
        module.exports = function(it) {
            if (void 0 == it) throw TypeError("Can't call method on  " + it);
            return it;
        };
    }, /* 35 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(14), document = __webpack_require__(4).document, is = isObject(document) && isObject(document.createElement);
        module.exports = function(it) {
            return is ? document.createElement(it) : {};
        };
    }, /* 36 */
    /***/
    function(module, exports) {
        // IE 8- don't enum bug keys
        module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, /* 37 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        var anObject = __webpack_require__(5), dPs = __webpack_require__(120), enumBugKeys = __webpack_require__(36), IE_PROTO = __webpack_require__(39)("IE_PROTO"), Empty = function() {}, PROTOTYPE = "prototype", createDict = function() {
            // Thrash, waste and sodomy: IE GC bug
            var iframeDocument, iframe = __webpack_require__(35)("iframe"), i = enumBugKeys.length, lt = "<", gt = ">";
            for (iframe.style.display = "none", __webpack_require__(59).appendChild(iframe), 
            iframe.src = "javascript:", // eslint-disable-line no-script-url
            // createDict = iframe.contentWindow.Object;
            // html.removeChild(iframe);
            iframeDocument = iframe.contentWindow.document, iframeDocument.open(), iframeDocument.write(lt + "script" + gt + "document.F=Object" + lt + "/script" + gt), 
            iframeDocument.close(), createDict = iframeDocument.F; i--; ) delete createDict[PROTOTYPE][enumBugKeys[i]];
            return createDict();
        };
        module.exports = Object.create || function(O, Properties) {
            var result;
            // add "__proto__" for Object.getPrototypeOf polyfill
            return null !== O ? (Empty[PROTOTYPE] = anObject(O), result = new Empty(), Empty[PROTOTYPE] = null, 
            result[IE_PROTO] = O) : result = createDict(), void 0 === Properties ? result : dPs(result, Properties);
        };
    }, /* 38 */
    /***/
    function(module, exports) {
        exports.f = {}.propertyIsEnumerable;
    }, /* 39 */
    /***/
    function(module, exports, __webpack_require__) {
        var shared = __webpack_require__(40)("keys"), uid = __webpack_require__(26);
        module.exports = function(key) {
            return shared[key] || (shared[key] = uid(key));
        };
    }, /* 40 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4), SHARED = "__core-js_shared__", store = global[SHARED] || (global[SHARED] = {});
        module.exports = function(key) {
            return store[key] || (store[key] = {});
        };
    }, /* 41 */
    /***/
    function(module, exports) {
        // 7.1.4 ToInteger
        var ceil = Math.ceil, floor = Math.floor;
        module.exports = function(it) {
            return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        };
    }, /* 42 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.1 ToPrimitive(input [, PreferredType])
        var isObject = __webpack_require__(14);
        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
        // and the second argument - flag - preferred type is a string
        module.exports = function(it, S) {
            if (!isObject(it)) return it;
            var fn, val;
            if (S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            if ("function" == typeof (fn = it.valueOf) && !isObject(val = fn.call(it))) return val;
            if (!S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            throw TypeError("Can't convert object to primitive value");
        };
    }, /* 43 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4), core = __webpack_require__(0), LIBRARY = __webpack_require__(22), wksExt = __webpack_require__(44), defineProperty = __webpack_require__(8).f;
        module.exports = function(name) {
            var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
            "_" == name.charAt(0) || name in $Symbol || defineProperty($Symbol, name, {
                value: wksExt.f(name)
            });
        };
    }, /* 44 */
    /***/
    function(module, exports, __webpack_require__) {
        exports.f = __webpack_require__(1);
    }, /* 45 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(55), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(57), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(56), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol__ = __webpack_require__(21), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol__), __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_6__traits__ = __webpack_require__(53), Animation = function() {
            /**
     * @method constructor
     * @private
     * @param {Core.Timer} timer Timer used for the animation.
     * @param {Array} [tiles_numbers=[]] Tiles numbers used in the animation.
     * @param {Number} [default_time=500] Default time in ms between each tiles.
     */
            function Animation(timer) {
                var tiles_numbers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], default_time = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 500;
                __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, Animation), 
                this.timer = timer, this.tiles_numbers = tiles_numbers, this.default_time = default_time, 
                this.animation_index = 0, this.animation_clock = null, this.is_running = !1;
            }
            /**
     * @method getPreviousTileNumber
     * @private
     * @description Get the previous tile number of current animation.
     * @return {Number} The previous tile number of current animation.
     */
            return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(Animation, [ {
                key: "getPreviousTileNumber",
                value: function() {
                    var tile_index = this.animation_index > 0 ? this.animation_index - 1 : this.tiles_numbers.length - 1;
                    return this.tiles_numbers[tile_index];
                }
            }, {
                key: "getCurrentTileNumber",
                value: function() {
                    return this.tiles_numbers[this.animation_index];
                }
            }, {
                key: "start",
                value: function() {
                    var _this = this, time = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.default_time, loop = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    return this.is_running = !0, this.animation_clock = this.timer.setTimeout(function() {
                        _this.animation_index++, _this.animation_index < _this.tiles_numbers.length ? (_this.trigger("animation_update"), 
                        _this.start(time, loop)) : loop ? (_this.stop(), _this.trigger("animation_update"), 
                        _this.start(time, loop)) : (_this.stop(), _this.trigger("animation_end"));
                    }, time), this;
                }
            }, {
                key: "stop",
                value: function() {
                    return this.animation_clock && this.timer.clearTimeout(this.animation_clock), this.animation_clock = null, 
                    this.animation_index = 0, this.is_running = !1, this;
                }
            } ], [ {
                key: "define",
                value: function(timer, tiles_numbers, default_time) {
                    var name = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_symbol___default()();
                    return Animation.classes[name] = function(_Animation) {
                        function _class(default_timer) {
                            __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, _class);
                            var _this2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_class.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(_class)).call(this, timer || default_timer, tiles_numbers, default_time));
                            return _this2.name = name, _this2;
                        }
                        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(_class, _Animation), 
                        _class;
                    }(Animation), Animation.classes[name];
                }
            } ]), Animation;
        }();
        Animation.classes = {}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__traits__.Events_Handler)(Animation), 
        /* harmony default export */
        __webpack_exports__.a = Animation;
    }, /* 46 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function getParamsStringFromData(data) {
            var params = [];
            for (var param in data) data.hasOwnProperty(param) && params.push(encodeURIComponent(param) + "=" + encodeURIComponent(data[param]));
            return params.join("&");
        }
        function getReadyStateChangeHandler(xhr, data_type, resolve, reject) {
            return function() {
                if (4 === xhr.readyState) if (200 === xhr.status || 304 === xhr.status) {
                    var response = void 0;
                    switch (data_type) {
                      case DATA_TYPE_JSON:
                        response = JSON.parse(xhr.responseText);
                        break;

                      case DATA_TYPE_XML:
                        response = xhr.responseXML;
                        break;

                      default:
                        response = xhr.responseText;
                    }
                    resolve(response);
                } else reject(xhr);
            };
        }
        function performRequest(method, url) {
            var data = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0, async = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3], data_type = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : DATA_TYPE_TEXT, promise = function(resolve, reject) {
                var xhr = new XMLHttpRequest(), params_string = null;
                data && (params_string = getParamsStringFromData(data)), params_string && method === METHOD_GET && (url += url.indexOf("?") === -1 ? "?" : "&", 
                url += params_string), xhr.onreadystatechange = getReadyStateChangeHandler(xhr, data_type, resolve, reject), 
                xhr.open(method, url, async), xhr.send(method === METHOD_POST ? params_string : null);
            };
            return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(promise);
        }
        function getExposedMethod(request_method) {
            return function(url) {
                var _ref = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, _ref$data = _ref.data, data = void 0 === _ref$data ? void 0 : _ref$data, _ref$async = _ref.async, async = void 0 === _ref$async || _ref$async, _ref$data_type = _ref.data_type, data_type = void 0 === _ref$data_type ? DATA_TYPE_TEXT : _ref$data_type;
                return performRequest(request_method, url, data, async, data_type);
            };
        }
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(31), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__), METHOD_GET = "GET", METHOD_POST = "POST", METHOD_PUT = "PUT", METHOD_DELETE = "DELETE", DATA_TYPE_TEXT = "TEXT", DATA_TYPE_JSON = "JSON", DATA_TYPE_XML = "XML", $http = {
            DATA_TYPES: {
                TEXT: DATA_TYPE_TEXT,
                XML: DATA_TYPE_XML,
                JSON: DATA_TYPE_JSON
            },
            /**
     * @method get
     * @public
     * @description Perform a GET request.
     * @param {String} url Url to request.
     * @param {Object} [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]
     * The options to send to the request. Properties are:
     *  _Object_ data Data to send with the request, in the format { paramName: paramValue }
     *  _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
     *  _String_ data_type Type of data the request is expected to answer with.
     * @return {Promise} The promise handling the request.
     * @example
     * $http.get('http://my.url.com/').then((response) => {
     *  //  ...
     * });
     * @example
     * $http.get('http://my.url.com/', { data_type: $http.DATA_TYPES.JSON }).then((response) => {
     *  //  ...
     * });
     */
            get: getExposedMethod(METHOD_GET),
            /**
     * @method post
     * @public
     * @description Perform a POST request.
     * @param {String} url Url to request.
     * @param {Object} [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]
     * The options to send to the request. Properties are:
     *  _Object_ data Data to send with the request, in the format { paramName: paramValue }
     *  _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
     *  _String_ data_type Type of data the request is expected to answer with.
     * @return {Promise} The promise handling the request.
     * @example
     * $http.post('http://my.url.com/').then((response) => {
     *  //  ...
     * });
     * @example
     * $http.post('http://my.url.com/', { data: { foo: 'bar' } }).then((response) => {
     *  //  ...
     * });
     */
            post: getExposedMethod(METHOD_POST),
            /**
     * @method delete
     * @public
     * @description Perform a DELETE request.
     * @param {String} url Url to request.
     * @param {Object} [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]
     * The options to send to the request. Properties are:
     *  _Object_ data Data to send with the request, in the format { paramName: paramValue }
     *  _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
     *  _String_ data_type Type of data the request is expected to answer with.
     * @return {Promise} The promise handling the request.
     * @example
     * $http.delete('http://my.url.com/').then((response) => {
     *  //  ...
     * });
     * @example
     * $http.delete('http://my.url.com/', { data: { foo: 'bar' } }).then((response) => {
     *  //  ...
     * });
     */
            delete: getExposedMethod(METHOD_DELETE),
            /**
     * @method put
     * @public
     * @description Perform a PUT request.
     * @param {String} url Url to request.
     * @param {Object} [options={ data, async = true, data_type = $http.DATA_TYPES.TEXT}]
     * The options to send to the request. Properties are:
     *  _Object_ data Data to send with the request, in the format { paramName: paramValue }
     *  _Boolean_ async Tells if the Ajax request should be performed asynchronously or not.
     *  _String_ data_type Type of data the request is expected to answer with.
     * @return {Promise} The promise handling the request.
     * @example
     * $http.put('http://my.url.com/').then((response) => {
     *  //  ...
     * });
     * @example
     * $http.put('http://my.url.com/', { data: { foo: 'bar' } }).then((response) => {
     *  //  ...
     * });
     */
            put: getExposedMethod(METHOD_PUT)
        };
        /* harmony default export */
        __webpack_exports__.a = $http;
    }, /* 47 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_2__traits_events_handler__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_3__point__ = __webpack_require__(13), Inputs = function() {
            function Inputs(dom_element) {
                var _this = this;
                __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Inputs), 
                this.mouse = new __WEBPACK_IMPORTED_MODULE_3__point__.a(), this.keys_pressed = [], 
                this.dom_element = dom_element, this.$mouseMoveEventHandler = function(e) {
                    var dom_element = _this.dom_element, x = e.pageX, y = e.pageY;
                    x -= dom_element.getBoundingClientRect().left + (window.pageXOffset || dom_element.scrollLeft) + (dom_element.clientLeft || 0), 
                    y -= dom_element.getBoundingClientRect().top + (window.pageYOffset || dom_element.scrollTop) + (dom_element.clientTop || 0), 
                    _this.mouse.set(Math.floor(x), Math.floor(y)), _this.trigger("mousemove", {
                        mouse: _this.mouse
                    });
                }, this.$clickHandler = function() {
                    _this.trigger("click", {
                        mouse: _this.mouse
                    });
                }, this.$keyDownHandler = function(e) {
                    var key = e.which || e.keyCode;
                    if (!(_this.isKeyPressed(key) || _this.keys_pressed.length >= 2)) // We don't handle more than 2 pressed keys on same time
                    {
                        _this.keys_pressed.push(key);
                        var custom_event = _this.trigger("keydown", {
                            key: key,
                            is_arrow: key >= Inputs.KEYS.ARROWS.LEFT && key <= Inputs.KEYS.ARROWS.DOWN
                        });
                        custom_event.defaultPrevented && e.preventDefault();
                    }
                }, this.$keyUpHandler = function(e) {
                    var key = e.which || e.keyCode;
                    _this.keys_pressed.some(function(current_key, key_index) {
                        if (key === current_key) return _this.keys_pressed.splice(key_index, 1), !0;
                    });
                    var custom_event = _this.trigger("keyup", {
                        key: key,
                        is_arrow: key >= Inputs.KEYS.ARROWS.LEFT && key <= Inputs.KEYS.ARROWS.DOWN
                    });
                    custom_event.defaultPrevented && e.preventDefault();
                }, this.$windowFocusHandler = function() {
                    _this.trigger("window_focus");
                }, this.$windowBlurHandler = function() {
                    _this.trigger("window_blur");
                }, dom_element.addEventListener("mousemove", this.$mouseMoveEventHandler), dom_element.addEventListener("click", this.$clickHandler), 
                document.body.addEventListener("keydown", this.$keyDownHandler), document.body.addEventListener("keyup", this.$keyUpHandler), 
                window.addEventListener("focus", this.$windowFocusHandler), window.addEventListener("blur", this.$windowBlurHandler);
            }
            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Inputs, [ {
                key: "destroy",
                value: function() {
                    return this.dom_element.removeEventListener("mousemove", this.$mouseMoveEventHandler), 
                    this.dom_element.removeEventListener("click", this.$clickHandler), document.body.removeEventListener("keydown", this.$keyDownHandler), 
                    document.body.removeEventListener("keyup", this.$keyUpHandler), window.removeEventListener("focus", this.$windowFocusHandler), 
                    window.removeEventListener("blur", this.$windowBlurHandler), this.off(), this.dom_element = null, 
                    this.mouse = null, this.keys_pressed = [], this;
                }
            }, {
                key: "isKeyPressed",
                value: function(key) {
                    return this.keys_pressed.indexOf(key) >= 0;
                }
            } ]), Inputs;
        }();
        Inputs.KEYS = {
            ARROWS: {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40
            },
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            CONTROL: 17,
            ALT: 18,
            CAPS_LOCK: 20,
            SPACE: 32,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90
        }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__traits_events_handler__.a)(Inputs), 
        /* harmony default export */
        __webpack_exports__.a = Inputs;
    }, /* 48 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_symbols__ = __webpack_require__(54), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_symbols___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_symbols__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_names__ = __webpack_require__(30), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_names___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_names__), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_4__point__ = __webpack_require__(13), Layer = function() {
            function Layer(name) {
                __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Layer), 
                this.name = name, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), 
                this.ctx.imageSmoothingEnabled = !1, this.canvas.setAttribute("data-name", this.name), 
                this.canvas.style.position = "absolute", this.canvas.style.left = 0, this.canvas.style.top = 0, 
                this.canvas.style.zIndex = 0, this.tiles_sprite_class = null, this.needs_clear = !1, 
                this.tiles = [], this.elements = [], this.tiles_animations = [];
            }
            return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Layer, [ {
                key: "setSize",
                value: function(width, height) {
                    return this.canvas.width = width, this.canvas.height = height, this;
                }
            }, {
                key: "setZindex",
                value: function(new_zindex) {
                    return this.canvas.style.zIndex = new_zindex, this;
                }
            }, {
                key: "getTileFromPoint",
                value: function(point) {
                    if (!this.tiles_sprite_class) return null;
                    var tiles_size = this.tiles_sprite_class.getTilesSize(), row = this.tiles[Math.floor(point.y / tiles_size.height)];
                    return row ? row[Math.floor(point.x / tiles_size.width)] || null : null;
                }
            }, {
                key: "getTilesFromRectangle",
                value: function(rectangle) {
                    var tiles = [];
                    if (!this.tiles_sprite_class) return tiles;
                    for (var tiles_size = this.tiles_sprite_class.getTilesSize(), x_min = Math.floor(rectangle.position.x / tiles_size.width), y_min = Math.floor(rectangle.position.y / tiles_size.height), x_max = Math.floor((rectangle.position.x + rectangle.width - 1) / tiles_size.width), y_max = Math.floor((rectangle.position.y + rectangle.height - 1) / tiles_size.height), x = x_min; x <= x_max; x++) for (var y = y_min; y <= y_max; y++) {
                        var row = this.tiles[y];
                        if (row) {
                            var tile = row[x];
                            tile && tiles.push({
                                tile: tile,
                                position: new __WEBPACK_IMPORTED_MODULE_4__point__.a(x * tiles_size.width, y * tiles_size.height)
                            });
                        }
                    }
                    return tiles;
                }
            }, {
                key: "getAllTilesFromNumber",
                value: function(tile_number) {
                    var tiles = [];
                    return this.tiles.forEach(function(row) {
                        row.forEach(function(tile) {
                            tile.tile_number === tile_number && tiles.push(tile);
                        });
                    }), tiles;
                }
            }, {
                key: "addElement",
                value: function(element) {
                    return element.layer && element.layer.removeElement(element), element.layer = this, 
                    this.elements.push(element), this.needs_clear = !0, this;
                }
            }, {
                key: "removeElement",
                value: function(element_to_remove) {
                    var _this = this;
                    return this.elements.some(function(element, element_index) {
                        if (element === element_to_remove) return _this.elements.splice(element_index, 1), 
                        element_to_remove.layer = null, _this.needs_clear = !0, !0;
                    }), this;
                }
            }, {
                key: "clearTilesAnimations",
                value: function() {
                    return this.tiles_animations.forEach(function(animation) {
                        animation.stop();
                    }), this.tiles_animations = [], this;
                }
            }, {
                key: "initTilesAnimations",
                value: function(timer) {
                    var _this2 = this;
                    if (!this.tiles_sprite_class) throw new Error("Layer.initTilesAnimation: this layer has no Sprite class for its tiles.");
                    var keys = Array.prototype.concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_names___default()(this.tiles_sprite_class.animations), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_symbols___default()(this.tiles_sprite_class.animations));
                    return keys.forEach(function(key) {
                        var animation_class = _this2.tiles_sprite_class.animations[key], animation = new animation_class(timer);
                        _this2.tiles_animations.push(animation), animation.on("animation_update", function() {
                            _this2.getAllTilesFromNumber(animation.getPreviousTileNumber()).forEach(function(tile) {
                                tile.setTileNumber(animation.getCurrentTileNumber());
                            });
                        }).start();
                    }), this;
                }
            }, {
                key: "draw",
                value: function() {
                    var _this3 = this, force_redraw = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    // No tiles layer: draw elements if any
                    return this.tiles.length ? (this.tiles.forEach(function(row, row_index) {
                        row.forEach(function(tile, column_index) {
                            // Draw tile only if we need it
                            if (force_redraw || tile.needs_redraw) {
                                var tiles_size = {
                                    width: tile.sprite_class.tiles_width,
                                    height: tile.sprite_class.tiles_height
                                }, dest_x = column_index * tiles_size.width, dest_y = row_index * tiles_size.height;
                                tile.needs_redraw = !1, tile.clear(_this3.ctx, dest_x, dest_y), // If empty tile, we skip it
                                tile.is_empty || tile.draw(_this3.ctx, dest_x, dest_y);
                            }
                        });
                    }), this) : force_redraw ? (this.elements.forEach(function(element) {
                        element.draw(_this3.ctx);
                    }), this) : this;
                }
            }, {
                key: "clear",
                value: function() {
                    return this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this;
                }
            } ]), Layer;
        }();
        Layer.MAIN_LAYER = new Layer("MAIN_LAYER"), Layer.TILES_LAYER = new Layer("TILES_LAYER"), 
        Layer.BACKGROUND_LAYER = new Layer("BACKGROUND_LAYER"), /* harmony default export */
        __webpack_exports__.a = Layer;
    }, /* 49 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(55), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(57), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__), __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(56), __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__), __WEBPACK_IMPORTED_MODULE_5__rectangle__ = __webpack_require__(19), Mask = function(_Rectangle) {
            function Mask() {
                var width = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, height = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, position = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0, is_solid = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], stop_on_solids = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Mask);
                var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Mask.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Mask)).call(this, width, height, position));
                return _this.is_solid = is_solid, _this.stop_on_solids = stop_on_solids, _this;
            }
            return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Mask, _Rectangle), 
            __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Mask, [ {
                key: "clone",
                value: function() {
                    return new Mask(this.width, this.height, this.position, this.is_solid, this.stop_on_solids);
                }
            } ], [ {
                key: "createFromRectangle",
                value: function(rectangle) {
                    var is_solid = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], stop_on_solids = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    return new Mask(rectangle.width, rectangle.height, void 0, is_solid, stop_on_solids);
                }
            } ]), Mask;
        }(__WEBPACK_IMPORTED_MODULE_5__rectangle__.a);
        /* harmony default export */
        __webpack_exports__.a = Mask;
    }, /* 50 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(21), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_3__point__ = __webpack_require__(13), __WEBPACK_IMPORTED_MODULE_4__traits_events_handler__ = __webpack_require__(9), Tile = function() {
            function Tile(sprite_class) {
                var x = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, y = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, tile_number = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, type = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null, masks = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : [];
                __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Tile), 
                this.sprite_class = sprite_class, this.sheet_position = new __WEBPACK_IMPORTED_MODULE_3__point__.a(x, y), 
                this.tile_number = tile_number, this.type = type, this.masks = masks, this.is_empty = !1, 
                this.needs_redraw = !0, this.slope_point = null;
            }
            return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Tile, [ {
                key: "getSize",
                value: function() {
                    return this.sprite_class.getTilesSize();
                }
            }, {
                key: "clone",
                value: function() {
                    var clone_tile = new Tile(this.sprite_class, this.sheet_position.x, this.sheet_position.y, this.tile_number, this.type);
                    return clone_tile.slope_point = this.slope_point ? this.slope_point.clone() : null, 
                    clone_tile.masks = this.masks.slice(0), clone_tile;
                }
            }, {
                key: "setTileNumber",
                value: function(tile_number) {
                    var tile = this.sprite_class.getTile(tile_number);
                    return this.is_empty = tile.is_empty, this.tile_number = tile_number, this.sheet_position = tile.sheet_position, 
                    this.type = tile.type, this.slope_point = tile.slope_point ? tile.slope_point.clone() : null, 
                    this.masks = tile.masks.slice(0), this.needs_redraw = !0, this;
                }
            }, {
                key: "draw",
                value: function(ctx) {
                    var x = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, y = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, tiles_size = {
                        width: this.sprite_class.tiles_width,
                        height: this.sprite_class.tiles_height
                    };
                    return ctx.drawImage(this.sprite_class.image, this.sheet_position.x, this.sheet_position.y, tiles_size.width, tiles_size.height, x, y, tiles_size.width, tiles_size.height), 
                    this.trigger("drawn"), this;
                }
            }, {
                key: "clear",
                value: function(ctx, x, y) {
                    var tiles_size = {
                        width: this.sprite_class.tiles_width,
                        height: this.sprite_class.tiles_height
                    };
                    return ctx.clearRect(x, y, tiles_size.width, tiles_size.height), this;
                }
            }, {
                key: "hasMasks",
                value: function() {
                    return this.masks.length > 0;
                }
            }, {
                key: "isSolid",
                value: function() {
                    return this.type === Tile.TYPES.SOLID || this.isSlope();
                }
            }, {
                key: "isSlope",
                value: function() {
                    return null !== this.slope_point;
                }
            }, {
                key: "isEndSlope",
                value: function() {
                    return this.isSlope() && (0 === this.slope_point.x || 0 === this.slope_point.y);
                }
            }, {
                key: "getContactY",
                value: function(x, tile_position) {
                    var x_on_tile = this.getXOnTile(x, tile_position.x), y_on_tile = this.getYFromSlope(x_on_tile);
                    return isNaN(y_on_tile) ? NaN : tile_position.y + y_on_tile;
                }
            }, {
                key: "getXOnTile",
                value: function(target_x, tile_x) {
                    return (target_x - tile_x) / this.getSize().width;
                }
            }, {
                key: "getYFromSlope",
                value: function(x_on_tile) {
                    return this.isSlope() ? x_on_tile < 0 || x_on_tile > 1 ? NaN : (1 - x_on_tile) * this.slope_point.x + x_on_tile * this.slope_point.y : 0;
                }
            } ], [ {
                key: "getNewEmptyTile",
                value: function(sprite_class) {
                    var tile = new Tile(sprite_class);
                    return tile.is_empty = !0, tile;
                }
            } ]), Tile;
        }();
        Tile.TYPES = {
            SOLID: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default()(),
            SLOPE: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default()()
        }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__traits_events_handler__.a)(Tile), 
        /* harmony default export */
        __webpack_exports__.a = Tile;
    }, /* 51 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_2__traits_events_handler__ = __webpack_require__(9), Timer = function() {
            function Timer() {
                var _this = this, fps = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 30;
                __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Timer), 
                this.fps = fps, this.clocks = {}, this.on("frame", function() {
                    _this.checkCounters();
                });
            }
            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Timer, [ {
                key: "destroy",
                value: function() {
                    return this.clocks = {}, this.off(), this;
                }
            }, {
                key: "checkCounters",
                value: function() {
                    for (var generated_event_name in this.clocks) {
                        var clock = this.clocks[generated_event_name];
                        ++clock.counter >= clock.target && (this.trigger(generated_event_name), this.clearTimeout(generated_event_name));
                    }
                    return this;
                }
            }, {
                key: "setTimeout",
                value: function(callback, time) {
                    var generated_event_name = (Date.now() * Math.random()).toString(16);
                    return this.clocks[generated_event_name] = {
                        counter: 0,
                        target: time / 1e3 * this.fps
                    }, this.on(generated_event_name, callback), generated_event_name;
                }
            }, {
                key: "clearTimeout",
                value: function(generated_event_name) {
                    return delete this.clocks[generated_event_name], this.off(generated_event_name);
                }
            } ]), Timer;
        }();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__traits_events_handler__.a)(Timer), 
        /* harmony default export */
        __webpack_exports__.a = Timer;
    }, /* 52 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /**
 * @method random
 * @public
 * @description Get a random number.
 * @param {Number} min Minimum value of the number to generate.
 * @param {Number} max Maximum value of the number to generate.
 * @return {Number} The generated random number.
 * @example const randomNumber = Utils.random(0, 100);
 */
        function random(min, max) {
            if (min > max) {
                var _ref = [ max, min ];
                min = _ref[0], max = _ref[1];
            }
            var delta = 1 + max - min;
            return Math.floor(delta * Math.random()) + min;
        }
        /**
 * @method shuffleArray
 * @public
 * @description Return a shuffled copy of given array.
 * @param {Array} array The array to shuffle.
 * @return {Array} A shuffled copy of the array.
 * @example const shuffledArray = Utils.shuffleArray([1, 2, 3, 4, 5]);
*/
        function shuffleArray(array) {
            for (var shuffled_array = [], length = array.length; length; ) {
                var randomIndex = Math.floor(Math.random() * array.length), value = array.splice(randomIndex, 1);
                length--, shuffled_array.push(value[0]);
            }
            return shuffled_array;
        }
        /**
 * @method degreeToRadian
 * @public
 * @description Convert a degree value into radian.
 * @param {Number} degree The degree walue to convert.
 * @return {Number} The corresponding value in radian.
 * @example const radian = Utils.degreeToRadian(180);
 */
        function degreeToRadian(degree) {
            return (360 - degree) * Math.PI / 180;
        }
        /**
 * @method radianToDegree
 * @public
 * @description Convert a radian value into degree.
 * @param {Number} radian The radian walue to convert.
 * @return {Number} The corresponding value in degree.
 * @example const degree = Utils.radianToDegree(Math.PI);
 */
        function radianToDegree(radian) {
            for (var degree = -radian / (Math.PI / 180) + 360; degree < 0; ) degree += 360;
            return degree % 360;
        }
        /* unused harmony export random */
        /* unused harmony export shuffleArray */
        /* harmony export (immutable) */
        __webpack_exports__.b = degreeToRadian, /* harmony export (immutable) */
        __webpack_exports__.a = radianToDegree;
        /**
 * @namespace Utils
 * @description A collection of utils methods.
 * @example const { Utils } = JSGLib.Core;
 */
        var Utils = {
            random: random,
            shuffleArray: shuffleArray,
            degreeToRadian: degreeToRadian
        };
        /* harmony default export */
        __webpack_exports__.c = Utils;
    }, /* 53 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__events_handler__ = __webpack_require__(9), __WEBPACK_IMPORTED_MODULE_1__keys_mapping__ = __webpack_require__(81), __WEBPACK_IMPORTED_MODULE_2__move_wrap__ = __webpack_require__(82);
        /**
 * @namespace Traits
 * @description Collection of traits usable by classes.
 * @property {Traits.Events_Handler} Events_Handler Trait adding events related features, in order to be able to listen and trigger custom events.
 * @property {Traits.Keys_Mapping} Keys_Mapping Trait adding methods to maps some actions to keyboard events.
 * @property {Traits.Move_Wrap} Move_Wrap Trait allowing affected elements to switch to opposite side of a room when the go outside it.
 * @example
 * import { Events_Handler } 'jsglib';
 * console.log(Events_Handler);
 * @example
 * const { Events_Handler, Move_Wrap } = JSGLib.Core;
 */
        /* harmony default export */
        __webpack_exports__.a = {
            Events_Handler: __WEBPACK_IMPORTED_MODULE_0__events_handler__.a,
            Keys_Mapping: __WEBPACK_IMPORTED_MODULE_1__keys_mapping__.a,
            Move_Wrap: __WEBPACK_IMPORTED_MODULE_2__move_wrap__.a
        };
    }, /* 54 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(97),
            __esModule: !0
        };
    }, /* 55 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(98),
            __esModule: !0
        };
    }, /* 56 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _setPrototypeOf = __webpack_require__(88), _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf), _create = __webpack_require__(86), _create2 = _interopRequireDefault(_create), _typeof2 = __webpack_require__(58), _typeof3 = _interopRequireDefault(_typeof2);
        exports.default = function(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + ("undefined" == typeof superClass ? "undefined" : (0, 
            _typeof3.default)(superClass)));
            subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (_setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass);
        };
    }, /* 57 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _typeof2 = __webpack_require__(58), _typeof3 = _interopRequireDefault(_typeof2);
        exports.default = function(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== ("undefined" == typeof call ? "undefined" : (0, _typeof3.default)(call)) && "function" != typeof call ? self : call;
        };
    }, /* 58 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _iterator = __webpack_require__(89), _iterator2 = _interopRequireDefault(_iterator), _symbol = __webpack_require__(21), _symbol2 = _interopRequireDefault(_symbol), _typeof = "function" == typeof _symbol2.default && "symbol" == typeof _iterator2.default ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof _symbol2.default && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj;
        };
        exports.default = "function" == typeof _symbol2.default && "symbol" === _typeof(_iterator2.default) ? function(obj) {
            return "undefined" == typeof obj ? "undefined" : _typeof(obj);
        } : function(obj) {
            return obj && "function" == typeof _symbol2.default && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : "undefined" == typeof obj ? "undefined" : _typeof(obj);
        };
    }, /* 59 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(4).document && document.documentElement;
    }, /* 60 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = !__webpack_require__(6) && !__webpack_require__(18)(function() {
            return 7 != Object.defineProperty(__webpack_require__(35)("div"), "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 61 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var LIBRARY = __webpack_require__(22), $export = __webpack_require__(7), redefine = __webpack_require__(69), hide = __webpack_require__(11), has = __webpack_require__(10), Iterators = __webpack_require__(15), $iterCreate = __webpack_require__(113), setToStringTag = __webpack_require__(25), getPrototypeOf = __webpack_require__(66), ITERATOR = __webpack_require__(1)("iterator"), BUGGY = !([].keys && "next" in [].keys()), FF_ITERATOR = "@@iterator", KEYS = "keys", VALUES = "values", returnThis = function() {
            return this;
        };
        module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
            $iterCreate(Constructor, NAME, next);
            var methods, key, IteratorPrototype, getMethod = function(kind) {
                if (!BUGGY && kind in proto) return proto[kind];
                switch (kind) {
                  case KEYS:
                    return function() {
                        return new Constructor(this, kind);
                    };

                  case VALUES:
                    return function() {
                        return new Constructor(this, kind);
                    };
                }
                return function() {
                    return new Constructor(this, kind);
                };
            }, TAG = NAME + " Iterator", DEF_VALUES = DEFAULT == VALUES, VALUES_BUG = !1, proto = Base.prototype, $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT], $default = $native || getMethod(DEFAULT), $entries = DEFAULT ? DEF_VALUES ? getMethod("entries") : $default : void 0, $anyNative = "Array" == NAME ? proto.entries || $native : $native;
            if (// Fix native
            $anyNative && (IteratorPrototype = getPrototypeOf($anyNative.call(new Base())), 
            IteratorPrototype !== Object.prototype && (// Set @@toStringTag to native iterators
            setToStringTag(IteratorPrototype, TAG, !0), // fix for some old engines
            LIBRARY || has(IteratorPrototype, ITERATOR) || hide(IteratorPrototype, ITERATOR, returnThis))), 
            // fix Array#{values, @@iterator}.name in V8 / FF
            DEF_VALUES && $native && $native.name !== VALUES && (VALUES_BUG = !0, $default = function() {
                return $native.call(this);
            }), // Define iterator
            LIBRARY && !FORCED || !BUGGY && !VALUES_BUG && proto[ITERATOR] || hide(proto, ITERATOR, $default), 
            // Plug for library
            Iterators[NAME] = $default, Iterators[TAG] = returnThis, DEFAULT) if (methods = {
                values: DEF_VALUES ? $default : getMethod(VALUES),
                keys: IS_SET ? $default : getMethod(KEYS),
                entries: $entries
            }, FORCED) for (key in methods) key in proto || redefine(proto, key, methods[key]); else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
            return methods;
        };
    }, /* 62 */
    /***/
    function(module, exports, __webpack_require__) {
        var pIE = __webpack_require__(38), createDesc = __webpack_require__(24), toIObject = __webpack_require__(12), toPrimitive = __webpack_require__(42), has = __webpack_require__(10), IE8_DOM_DEFINE = __webpack_require__(60), gOPD = Object.getOwnPropertyDescriptor;
        exports.f = __webpack_require__(6) ? gOPD : function(O, P) {
            if (O = toIObject(O), P = toPrimitive(P, !0), IE8_DOM_DEFINE) try {
                return gOPD(O, P);
            } catch (e) {}
            if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
        };
    }, /* 63 */
    /***/
    function(module, exports, __webpack_require__) {
        // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
        var toIObject = __webpack_require__(12), gOPN = __webpack_require__(64).f, toString = {}.toString, windowNames = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], getWindowNames = function(it) {
            try {
                return gOPN(it);
            } catch (e) {
                return windowNames.slice();
            }
        };
        module.exports.f = function(it) {
            return windowNames && "[object Window]" == toString.call(it) ? getWindowNames(it) : gOPN(toIObject(it));
        };
    }, /* 64 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
        var $keys = __webpack_require__(67), hiddenKeys = __webpack_require__(36).concat("length", "prototype");
        exports.f = Object.getOwnPropertyNames || function(O) {
            return $keys(O, hiddenKeys);
        };
    }, /* 65 */
    /***/
    function(module, exports) {
        exports.f = Object.getOwnPropertySymbols;
    }, /* 66 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
        var has = __webpack_require__(10), toObject = __webpack_require__(72), IE_PROTO = __webpack_require__(39)("IE_PROTO"), ObjectProto = Object.prototype;
        module.exports = Object.getPrototypeOf || function(O) {
            return O = toObject(O), has(O, IE_PROTO) ? O[IE_PROTO] : "function" == typeof O.constructor && O instanceof O.constructor ? O.constructor.prototype : O instanceof Object ? ObjectProto : null;
        };
    }, /* 67 */
    /***/
    function(module, exports, __webpack_require__) {
        var has = __webpack_require__(10), toIObject = __webpack_require__(12), arrayIndexOf = __webpack_require__(105)(!1), IE_PROTO = __webpack_require__(39)("IE_PROTO");
        module.exports = function(object, names) {
            var key, O = toIObject(object), i = 0, result = [];
            for (key in O) key != IE_PROTO && has(O, key) && result.push(key);
            // Don't enum bug & hidden keys
            for (;names.length > i; ) has(O, key = names[i++]) && (~arrayIndexOf(result, key) || result.push(key));
            return result;
        };
    }, /* 68 */
    /***/
    function(module, exports, __webpack_require__) {
        // most Object methods by ES6 should accept primitives
        var $export = __webpack_require__(7), core = __webpack_require__(0), fails = __webpack_require__(18);
        module.exports = function(KEY, exec) {
            var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
            exp[KEY] = exec(fn), $export($export.S + $export.F * fails(function() {
                fn(1);
            }), "Object", exp);
        };
    }, /* 69 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(11);
    }, /* 70 */
    /***/
    function(module, exports, __webpack_require__) {
        var defer, channel, port, ctx = __webpack_require__(17), invoke = __webpack_require__(108), html = __webpack_require__(59), cel = __webpack_require__(35), global = __webpack_require__(4), process = global.process, setTask = global.setImmediate, clearTask = global.clearImmediate, MessageChannel = global.MessageChannel, counter = 0, queue = {}, ONREADYSTATECHANGE = "onreadystatechange", run = function() {
            var id = +this;
            if (queue.hasOwnProperty(id)) {
                var fn = queue[id];
                delete queue[id], fn();
            }
        }, listener = function(event) {
            run.call(event.data);
        };
        // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
        setTask && clearTask || (setTask = function(fn) {
            for (var args = [], i = 1; arguments.length > i; ) args.push(arguments[i++]);
            return queue[++counter] = function() {
                invoke("function" == typeof fn ? fn : Function(fn), args);
            }, defer(counter), counter;
        }, clearTask = function(id) {
            delete queue[id];
        }, // Node.js 0.8-
        "process" == __webpack_require__(16)(process) ? defer = function(id) {
            process.nextTick(ctx(run, id, 1));
        } : MessageChannel ? (channel = new MessageChannel(), port = channel.port2, channel.port1.onmessage = listener, 
        defer = ctx(port.postMessage, port, 1)) : global.addEventListener && "function" == typeof postMessage && !global.importScripts ? (defer = function(id) {
            global.postMessage(id + "", "*");
        }, global.addEventListener("message", listener, !1)) : defer = ONREADYSTATECHANGE in cel("script") ? function(id) {
            html.appendChild(cel("script"))[ONREADYSTATECHANGE] = function() {
                html.removeChild(this), run.call(id);
            };
        } : function(id) {
            setTimeout(ctx(run, id, 1), 0);
        }), module.exports = {
            set: setTask,
            clear: clearTask
        };
    }, /* 71 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.15 ToLength
        var toInteger = __webpack_require__(41), min = Math.min;
        module.exports = function(it) {
            return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
        };
    }, /* 72 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.13 ToObject(argument)
        var defined = __webpack_require__(34);
        module.exports = function(it) {
            return Object(defined(it));
        };
    }, /* 73 */
    /***/
    function(module, exports, __webpack_require__) {
        var classof = __webpack_require__(33), ITERATOR = __webpack_require__(1)("iterator"), Iterators = __webpack_require__(15);
        module.exports = __webpack_require__(0).getIteratorMethod = function(it) {
            if (void 0 != it) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
        };
    }, /* 74 */
    /***/
    function(module, exports) {}, /* 75 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        // ECMAScript 6 symbols shim
        var global = __webpack_require__(4), has = __webpack_require__(10), DESCRIPTORS = __webpack_require__(6), $export = __webpack_require__(7), redefine = __webpack_require__(69), META = __webpack_require__(118).KEY, $fails = __webpack_require__(18), shared = __webpack_require__(40), setToStringTag = __webpack_require__(25), uid = __webpack_require__(26), wks = __webpack_require__(1), wksExt = __webpack_require__(44), wksDefine = __webpack_require__(43), keyOf = __webpack_require__(116), enumKeys = __webpack_require__(106), isArray = __webpack_require__(111), anObject = __webpack_require__(5), toIObject = __webpack_require__(12), toPrimitive = __webpack_require__(42), createDesc = __webpack_require__(24), _create = __webpack_require__(37), gOPNExt = __webpack_require__(63), $GOPD = __webpack_require__(62), $DP = __webpack_require__(8), $keys = __webpack_require__(23), gOPD = $GOPD.f, dP = $DP.f, gOPN = gOPNExt.f, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, PROTOTYPE = "prototype", HIDDEN = wks("_hidden"), TO_PRIMITIVE = wks("toPrimitive"), isEnum = {}.propertyIsEnumerable, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), OPSymbols = shared("op-symbols"), ObjectProto = Object[PROTOTYPE], USE_NATIVE = "function" == typeof $Symbol, QObject = global.QObject, setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild, setSymbolDesc = DESCRIPTORS && $fails(function() {
            return 7 != _create(dP({}, "a", {
                get: function() {
                    return dP(this, "a", {
                        value: 7
                    }).a;
                }
            })).a;
        }) ? function(it, key, D) {
            var protoDesc = gOPD(ObjectProto, key);
            protoDesc && delete ObjectProto[key], dP(it, key, D), protoDesc && it !== ObjectProto && dP(ObjectProto, key, protoDesc);
        } : dP, wrap = function(tag) {
            var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
            return sym._k = tag, sym;
        }, isSymbol = USE_NATIVE && "symbol" == typeof $Symbol.iterator ? function(it) {
            return "symbol" == typeof it;
        } : function(it) {
            return it instanceof $Symbol;
        }, $defineProperty = function(it, key, D) {
            return it === ObjectProto && $defineProperty(OPSymbols, key, D), anObject(it), key = toPrimitive(key, !0), 
            anObject(D), has(AllSymbols, key) ? (D.enumerable ? (has(it, HIDDEN) && it[HIDDEN][key] && (it[HIDDEN][key] = !1), 
            D = _create(D, {
                enumerable: createDesc(0, !1)
            })) : (has(it, HIDDEN) || dP(it, HIDDEN, createDesc(1, {})), it[HIDDEN][key] = !0), 
            setSymbolDesc(it, key, D)) : dP(it, key, D);
        }, $defineProperties = function(it, P) {
            anObject(it);
            for (var key, keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length; l > i; ) $defineProperty(it, key = keys[i++], P[key]);
            return it;
        }, $create = function(it, P) {
            return void 0 === P ? _create(it) : $defineProperties(_create(it), P);
        }, $propertyIsEnumerable = function(key) {
            var E = isEnum.call(this, key = toPrimitive(key, !0));
            return !(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) && (!(E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]) || E);
        }, $getOwnPropertyDescriptor = function(it, key) {
            if (it = toIObject(it), key = toPrimitive(key, !0), it !== ObjectProto || !has(AllSymbols, key) || has(OPSymbols, key)) {
                var D = gOPD(it, key);
                return !D || !has(AllSymbols, key) || has(it, HIDDEN) && it[HIDDEN][key] || (D.enumerable = !0), 
                D;
            }
        }, $getOwnPropertyNames = function(it) {
            for (var key, names = gOPN(toIObject(it)), result = [], i = 0; names.length > i; ) has(AllSymbols, key = names[i++]) || key == HIDDEN || key == META || result.push(key);
            return result;
        }, $getOwnPropertySymbols = function(it) {
            for (var key, IS_OP = it === ObjectProto, names = gOPN(IS_OP ? OPSymbols : toIObject(it)), result = [], i = 0; names.length > i; ) !has(AllSymbols, key = names[i++]) || IS_OP && !has(ObjectProto, key) || result.push(AllSymbols[key]);
            return result;
        };
        // 19.4.1.1 Symbol([description])
        USE_NATIVE || ($Symbol = function() {
            if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
            var tag = uid(arguments.length > 0 ? arguments[0] : void 0), $set = function(value) {
                this === ObjectProto && $set.call(OPSymbols, value), has(this, HIDDEN) && has(this[HIDDEN], tag) && (this[HIDDEN][tag] = !1), 
                setSymbolDesc(this, tag, createDesc(1, value));
            };
            return DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
                configurable: !0,
                set: $set
            }), wrap(tag);
        }, redefine($Symbol[PROTOTYPE], "toString", function() {
            return this._k;
        }), $GOPD.f = $getOwnPropertyDescriptor, $DP.f = $defineProperty, __webpack_require__(64).f = gOPNExt.f = $getOwnPropertyNames, 
        __webpack_require__(38).f = $propertyIsEnumerable, __webpack_require__(65).f = $getOwnPropertySymbols, 
        DESCRIPTORS && !__webpack_require__(22) && redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, !0), 
        wksExt.f = function(name) {
            return wrap(wks(name));
        }), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
            Symbol: $Symbol
        });
        for (var symbols = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), i = 0; symbols.length > i; ) wks(symbols[i++]);
        for (var symbols = $keys(wks.store), i = 0; symbols.length > i; ) wksDefine(symbols[i++]);
        $export($export.S + $export.F * !USE_NATIVE, "Symbol", {
            // 19.4.2.1 Symbol.for(key)
            for: function(key) {
                return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
            },
            // 19.4.2.5 Symbol.keyFor(sym)
            keyFor: function(key) {
                if (isSymbol(key)) return keyOf(SymbolRegistry, key);
                throw TypeError(key + " is not a symbol!");
            },
            useSetter: function() {
                setter = !0;
            },
            useSimple: function() {
                setter = !1;
            }
        }), $export($export.S + $export.F * !USE_NATIVE, "Object", {
            // 19.1.2.2 Object.create(O [, Properties])
            create: $create,
            // 19.1.2.4 Object.defineProperty(O, P, Attributes)
            defineProperty: $defineProperty,
            // 19.1.2.3 Object.defineProperties(O, Properties)
            defineProperties: $defineProperties,
            // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
            // 19.1.2.7 Object.getOwnPropertyNames(O)
            getOwnPropertyNames: $getOwnPropertyNames,
            // 19.1.2.8 Object.getOwnPropertySymbols(O)
            getOwnPropertySymbols: $getOwnPropertySymbols
        }), // 24.3.2 JSON.stringify(value [, replacer [, space]])
        $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function() {
            var S = $Symbol();
            // MS Edge converts symbol values to JSON as {}
            // WebKit converts symbol values to JSON as null
            // V8 throws on boxed symbols
            return "[null]" != _stringify([ S ]) || "{}" != _stringify({
                a: S
            }) || "{}" != _stringify(Object(S));
        })), "JSON", {
            stringify: function(it) {
                if (void 0 !== it && !isSymbol(it)) {
                    for (// IE8 returns string on undefined
                    var replacer, $replacer, args = [ it ], i = 1; arguments.length > i; ) args.push(arguments[i++]);
                    return replacer = args[1], "function" == typeof replacer && ($replacer = replacer), 
                    !$replacer && isArray(replacer) || (replacer = function(key, value) {
                        if ($replacer && (value = $replacer.call(this, key, value)), !isSymbol(value)) return value;
                    }), args[1] = replacer, _stringify.apply($JSON, args);
                }
            }
        }), // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
        $Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf), 
        // 19.4.3.5 Symbol.prototype[@@toStringTag]
        setToStringTag($Symbol, "Symbol"), // 20.2.1.9 Math[@@toStringTag]
        setToStringTag(Math, "Math", !0), // 24.3.3 JSON[@@toStringTag]
        setToStringTag(global.JSON, "JSON", !0);
    }, /* 76 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(78), __WEBPACK_IMPORTED_MODULE_1__traits__ = __webpack_require__(53);
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "Core", function() {
            return __WEBPACK_IMPORTED_MODULE_0__core__.a;
        }), /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "Traits", function() {
            return __WEBPACK_IMPORTED_MODULE_1__traits__.a;
        });
    }, /* 77 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_2__layer__ = __webpack_require__(48), __WEBPACK_IMPORTED_MODULE_3__timer__ = __webpack_require__(51), __WEBPACK_IMPORTED_MODULE_4__inputs__ = __webpack_require__(47), __WEBPACK_IMPORTED_MODULE_5__traits_events_handler__ = __webpack_require__(9), Game = function() {
            function Game(game_container) {
                var _this = this, layers = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [ __WEBPACK_IMPORTED_MODULE_2__layer__.a.MAIN_LAYER, __WEBPACK_IMPORTED_MODULE_2__layer__.a.TILES_LAYER, __WEBPACK_IMPORTED_MODULE_2__layer__.a.BACKGROUND_LAYER ], fps = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 30;
                __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Game), 
                this.container = game_container, this.current_room = null, this.classes = {}, this.timer = new __WEBPACK_IMPORTED_MODULE_3__timer__.a(fps), 
                this.is_paused = !1, this.is_stopped = !1, this.defineLayers(layers), this.inputs = new __WEBPACK_IMPORTED_MODULE_4__inputs__.a(this.container), 
                this.inputs.on("click", function() {
                    for (var layer_name in _this.layers) {
                        var layer = _this.layers[layer_name];
                        layer.elements.some(function(element) {
                            if (_this.inputs.mouse.isOverElement(element)) {
                                var custom_event = element.trigger("click", {
                                    mouse: _this.inputs.mouse
                                });
                                return custom_event.propagationStopped;
                            }
                        });
                    }
                }).on("window_blur", this.togglePause.bind(this, !0)).on("window_focus", this.togglePause.bind(this, !1)), 
                this.on("pause_disabled", function() {
                    _this.last_loop_time = Date.now(), _this.$launchLoop();
                });
            }
            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Game, [ {
                key: "defineLayers",
                value: function(layers) {
                    var _this2 = this;
                    return this.layers = {}, layers.reverse().forEach(function(layer, key) {
                        layer.setZindex(key), _this2.layers[layer.name] = layer, _this2.container.appendChild(layer.canvas);
                    }), this;
                }
            }, {
                key: "getLayerFromName",
                value: function(layer_name) {
                    return this.layers[layer_name];
                }
            }, {
                key: "registerClass",
                value: function(new_class) {
                    return this.classes[new_class.name] = new_class, this;
                }
            }, {
                key: "getClass",
                value: function(class_name) {
                    return "function" == typeof class_name ? class_name : this.classes[class_name] ? this.classes[class_name] : window[class_name];
                }
            }, {
                key: "start",
                value: function() {
                    return this.trigger("start"), this.last_loop_time = Date.now(), this.$loop(), this;
                }
            }, {
                key: "stop",
                value: function() {
                    var custom_event = this.trigger("stop");
                    return custom_event.defaultPrevented ? this : (this.is_stopped = !0, this);
                }
            }, {
                key: "togglePause",
                value: function(force_pause) {
                    return this.is_paused = void 0 === force_pause ? !this.is_paused : force_pause, 
                    this.trigger(this.is_paused ? "pause_enabled" : "pause_disabled"), this;
                }
            }, {
                key: "$launchLoop",
                value: function() {
                    window.requestAnimationFrame(this.$loop.bind(this));
                }
            }, {
                key: "$loop",
                value: function() {
                    if (this.is_paused) return this;
                    if (this.is_stopped) // Reset all properties!
                    return this.container = null, this.classes = null, this.layers = {}, this.current_room.destroy(), 
                    this.current_room = null, this.timer.destroy(), this.timer = null, this.inputs.destroy(), 
                    this.inputs = null, this;
                    this.$launchLoop();
                    var now = Date.now(), delta_time = now - this.last_loop_time, interval = 1e3 / this.timer.fps;
                    return delta_time <= interval ? this : (this.timer.trigger("frame"), this.$manageElements(delta_time / 1e3), 
                    this.$render(), this.last_loop_time = now - delta_time % interval, this);
                }
            }, {
                key: "$manageElements",
                value: function(delta_time) {
                    var _this3 = this, _loop = function(layer_name) {
                        var layer = _this3.layers[layer_name];
                        layer.elements.forEach(function(element) {
                            element.is_destroyed || (element.trigger("frame", {
                                delta_time: delta_time
                            }), element.move(delta_time), // We don't want elements to have float positions (prevent blurry effects and positions related bugs)
                            element.position.round(), // Check collisions only if element has moved
                            element.position.equals(element.prev_position) || element.checkCollisions(_this3.layers), 
                            element.position.equals(element.prev_position) || (// Check if element is inside room
                            _this3.current_room.getRectangle().isCollidedWithRectangle(element.getRectangle()) ? (element.is_inside_room || element.trigger("enter_room", {
                                room: _this3.current_room
                            }), element.is_inside_room = !0) : (element.is_inside_room && element.trigger("leave_room", {
                                room: _this3.current_room
                            }), element.is_inside_room = !1), layer.needs_clear = !0, element.prev_position.copy(element.position)));
                        }), layer.elements.filter(function(element) {
                            return element.is_destroyed;
                        }).forEach(function(element) {
                            layer.removeElement(element), element.current_tile = null, element.current_animation = null;
                        });
                    };
                    for (var layer_name in this.layers) _loop(layer_name);
                    return this;
                }
            }, {
                key: "$render",
                value: function() {
                    for (var layer_name in this.layers) {
                        var _layer = this.layers[layer_name], force_redraw = !1;
                        _layer.needs_clear && (_layer.clear(), _layer.needs_clear = !1, force_redraw = !0), 
                        _layer.draw(force_redraw);
                    }
                    return this;
                }
            }, {
                key: "goToRoom",
                value: function(level) {
                    this.current_room = level, level.initRoom(this), this.container.style.width = level.width + "px", 
                    this.container.style.height = level.height + "px";
                    for (var layer_name in this.layers) {
                        var _layer2 = this.layers[layer_name];
                        _layer2.setSize(level.width, level.height);
                    }
                    return level.trigger("start"), this;
                }
            } ]), Game;
        }();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__traits_events_handler__.a)(Game), 
        /* harmony default export */
        __webpack_exports__.a = Game;
    }, /* 78 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__animation__ = __webpack_require__(45), __WEBPACK_IMPORTED_MODULE_1__element__ = __webpack_require__(29), __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(77), __WEBPACK_IMPORTED_MODULE_3__http__ = __webpack_require__(46), __WEBPACK_IMPORTED_MODULE_4__inputs__ = __webpack_require__(47), __WEBPACK_IMPORTED_MODULE_5__layer__ = __webpack_require__(48), __WEBPACK_IMPORTED_MODULE_6__mask__ = __webpack_require__(49), __WEBPACK_IMPORTED_MODULE_7__point__ = __webpack_require__(13), __WEBPACK_IMPORTED_MODULE_8__rectangle__ = __webpack_require__(19), __WEBPACK_IMPORTED_MODULE_9__room__ = __webpack_require__(79), __WEBPACK_IMPORTED_MODULE_10__sprite__ = __webpack_require__(80), __WEBPACK_IMPORTED_MODULE_11__tile__ = __webpack_require__(50), __WEBPACK_IMPORTED_MODULE_12__timer__ = __webpack_require__(51), __WEBPACK_IMPORTED_MODULE_13__trait__ = __webpack_require__(20), __WEBPACK_IMPORTED_MODULE_14__utils__ = __webpack_require__(52);
        /**
 * @namespace Core
 * @description Core classes of JSGLib.
 * @property {Core.Animation} Animation Class allowing sprites animations.
 * @property {Core.Element} Element Main class handling the interactive game elements.
 * @property {Core.Game} Game Main class handling a game.
 * @property {Core.$http} $http Utils handling Ajax requests.
 * @property {Core.Inputs} Inputs Class handling users inputs, such as keyboard or mouse.
 * @property {Core.Layer} Layer Class handling the different game layers.
 * @property {Core.Mask} Mask Class used to define collisions masks on sprites tiles.
 * @property {Core.Point} Point A simple class handling points such as coordinates.
 * @property {Core.Rectangle} Rectangle A simple class handling rectangles.
 * @property {Core.Room} Room Class handling the different game rooms.
 * @property {Core.Sprite} Sprite Class used to load and manipulate sprites.
 * @property {Core.Tile} Tile Class used to decompose sprites into small squares called tiles.
 * @property {Core.Timer} Timer Class handling time based events.
 * @property {Core.Trait} Trait Class handling JSGLib traits.
 * @property {Core.Utils} Utils A collection of utils methods.
 * @example
 * import { Core } 'jsglib';
 * console.log(Core);
 * @example
 * const { Game, Room, Sprite, Tile } = JSGLib.Core;
 */
        /* harmony default export */
        __webpack_exports__.a = {
            Animation: __WEBPACK_IMPORTED_MODULE_0__animation__.a,
            Element: __WEBPACK_IMPORTED_MODULE_1__element__.a,
            Game: __WEBPACK_IMPORTED_MODULE_2__game__.a,
            $http: __WEBPACK_IMPORTED_MODULE_3__http__.a,
            Inputs: __WEBPACK_IMPORTED_MODULE_4__inputs__.a,
            Layer: __WEBPACK_IMPORTED_MODULE_5__layer__.a,
            Mask: __WEBPACK_IMPORTED_MODULE_6__mask__.a,
            Point: __WEBPACK_IMPORTED_MODULE_7__point__.a,
            Rectangle: __WEBPACK_IMPORTED_MODULE_8__rectangle__.a,
            Room: __WEBPACK_IMPORTED_MODULE_9__room__.a,
            Sprite: __WEBPACK_IMPORTED_MODULE_10__sprite__.a,
            Tile: __WEBPACK_IMPORTED_MODULE_11__tile__.a,
            Timer: __WEBPACK_IMPORTED_MODULE_12__timer__.a,
            Trait: __WEBPACK_IMPORTED_MODULE_13__trait__.a,
            Utils: __WEBPACK_IMPORTED_MODULE_14__utils__.c
        };
    }, /* 79 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(31), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__ = __webpack_require__(90), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray__), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_4__rectangle__ = __webpack_require__(19), __WEBPACK_IMPORTED_MODULE_5__http__ = __webpack_require__(46), __WEBPACK_IMPORTED_MODULE_6__traits_events_handler__ = __webpack_require__(9), Room = function() {
            function Room() {
                var width = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, height = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Room), 
                this.width = width, this.height = height, this.definition = null;
            }
            return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Room, [ {
                key: "destroy",
                value: function() {
                    return this.definition = null, this.off(), this;
                }
            }, {
                key: "getRectangle",
                value: function() {
                    return new __WEBPACK_IMPORTED_MODULE_4__rectangle__.a(this.width, this.height);
                }
            }, {
                key: "getSize",
                value: function() {
                    var _getRectangle = this.getRectangle(), width = _getRectangle.width, height = _getRectangle.height;
                    return {
                        width: width,
                        height: height
                    };
                }
            }, {
                key: "initRoom",
                value: function(game) {
                    var _this = this;
                    if (!this.definition) return this;
                    if (this.definition.layers) {
                        this.width = 0, this.height = 0;
                        var _loop = function(layer_name) {
                            var definition = _this.definition.layers[layer_name], layer = game.getLayerFromName(layer_name);
                            if (layer.tiles_sprite_class = null, layer.tiles = [], definition.tiles) {
                                var SpriteClass = game.getClass(definition.sprite_class);
                                layer.tiles_sprite_class = SpriteClass, definition.tiles.forEach(function(row, row_index) {
                                    layer.tiles[row_index] = layer.tiles[row_index] || [], row.forEach(function(tile_number, column_index) {
                                        layer.tiles[row_index][column_index] = SpriteClass.getTile(tile_number);
                                    });
                                }), layer.clearTilesAnimations().initTilesAnimations(game.timer);
                                var tiles_size = layer.tiles_sprite_class.getTilesSize();
                                _this.width = Math.max(_this.width, layer.tiles[0].length * tiles_size.width), _this.height = Math.max(_this.height, layer.tiles.length * tiles_size.height);
                            }
                            definition.elements && definition.elements.forEach(function(element_data) {
                                var class_element = game.getClass(element_data.class_name);
                                if (!class_element) throw new ReferenceError('Class "' + element_data.class_name + '" found in room definition is not declared or not registered in current game.');
                                var _ref = element_data.position || [], _ref2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_slicedToArray___default()(_ref, 2), x = _ref2[0], y = _ref2[1];
                                new class_element(x, y, game);
                            });
                        };
                        for (var layer_name in this.definition.layers) _loop(layer_name);
                    } else this.width = this.definition.width, this.height = this.definition.height;
                    return this;
                }
            }, {
                key: "useDefinition",
                value: function(data) {
                    var _this2 = this, promise = function(resolve) {
                        "string" == typeof data ? __WEBPACK_IMPORTED_MODULE_5__http__.a.get(data, {
                            data_type: __WEBPACK_IMPORTED_MODULE_5__http__.a.DATA_TYPES.JSON
                        }).then(function(data) {
                            _this2.definition = data, resolve();
                        }) : (_this2.definition = data, resolve());
                    };
                    return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(promise);
                }
            } ]), Room;
        }();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__traits_events_handler__.a)(Room), 
        /* harmony default export */
        __webpack_exports__.a = Room;
    }, /* 80 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_symbols__ = __webpack_require__(54), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_symbols___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_symbols__), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_names__ = __webpack_require__(30), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_names___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_names__), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol__ = __webpack_require__(21), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol__), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise__ = __webpack_require__(31), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise__), __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2), __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__), __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__ = __webpack_require__(3), __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__), __WEBPACK_IMPORTED_MODULE_6__tile__ = __webpack_require__(50), __WEBPACK_IMPORTED_MODULE_7__animation__ = __webpack_require__(45), Sprite = function() {
            function Sprite() {
                __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, Sprite);
            }
            return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(Sprite, null, [ {
                key: "getTilesSize",
                value: function() {
                    return {
                        width: this.tiles_width || 0,
                        height: this.tiles_height || 0
                    };
                }
            }, {
                key: "hasTiles",
                value: function() {
                    return this.tiles.length > 0;
                }
            }, {
                key: "getTile",
                value: function(tile_number) {
                    var clone = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (tile_number--, !this.hasTiles() || tile_number < 0) return __WEBPACK_IMPORTED_MODULE_6__tile__.a.getNewEmptyTile(this);
                    var tiles = this.tiles, total_columns = tiles[0].length, row_index = Math.floor(tile_number / total_columns), column_index = tile_number % total_columns, tile = tiles[row_index] ? tiles[row_index][column_index] : null;
                    return tile ? clone ? tiles[row_index][column_index].clone() : tiles[row_index][column_index] : __WEBPACK_IMPORTED_MODULE_6__tile__.a.getNewEmptyTile(this);
                }
            }, {
                key: "loadImage",
                value: function(url) {
                    var _this = this, promise = function(resolve, reject) {
                        _this.image = new Image(), _this.image.onload = function() {
                            _this.makeTiles(_this.image.naturalWidth, _this.image.naturalHeight, 0), resolve(_this.image);
                        }, _this.image.onerror = reject, _this.image.src = url;
                    };
                    return new __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default.a(promise);
                }
            }, {
                key: "makeTiles",
                value: function() {
                    var tiles_width = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 16, tiles_height = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 16, tiles_separation = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    if (!this.image) throw ReferenceError(this.name + ".makeTiles(): image not found for this class");
                    this.tiles = [], this.tiles_width = tiles_width, this.tiles_height = tiles_height, 
                    this.tiles_separation = tiles_separation;
                    for (var image_width = this.image.naturalWidth, image_height = this.image.naturalHeight, tile_number = 1, j = 0; j < image_height; j += tiles_height) {
                        var x = j / tiles_height;
                        this.tiles[x] = [];
                        for (var i = 0; i < image_width; i += tiles_width) this.tiles[x][i / tiles_width] = new __WEBPACK_IMPORTED_MODULE_6__tile__.a(this, i + tiles_separation * (i / tiles_width), j + tiles_separation * (j / tiles_height), tile_number++), 
                        image_width -= tiles_separation;
                        image_width = this.image.naturalWidth, image_height -= tiles_separation;
                    }
                    return this;
                }
            }, {
                key: "defineTilesAnimations",
                value: function(animations, timer) {
                    var _this2 = this;
                    return this.animations = {}, animations.forEach(function(animation) {
                        _this2.animations[animation.name || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_symbol___default()()] = __WEBPACK_IMPORTED_MODULE_7__animation__.a.define(timer, animation.tiles, animation.time, animation.name);
                    }), this;
                }
            }, {
                key: "getAnimationClass",
                value: function(animation_name) {
                    return this.animations[animation_name] || null;
                }
            }, {
                key: "defineTilesTypes",
                value: function(types) {
                    var _this3 = this, keys = Array.prototype.concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_own_property_names___default()(types), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_own_property_symbols___default()(types));
                    return keys.forEach(function(type_name) {
                        var tiles_numbers = types[type_name];
                        tiles_numbers.forEach(function(tile_number) {
                            var tile = _this3.getTile(tile_number, !1);
                            tile.type = type_name;
                        });
                    }), this;
                }
            }, {
                key: "defineTilesSlopes",
                value: function(slopes_definitions) {
                    for (var tile_number in slopes_definitions) {
                        var tile = this.getTile(tile_number, !1);
                        tile.type = __WEBPACK_IMPORTED_MODULE_6__tile__.a.TYPES.SLOPE, tile.slope_point = slopes_definitions[tile_number];
                    }
                    return this;
                }
            } ]), Sprite;
        }();
        Sprite.image = null, Sprite.tiles = [], Sprite.tiles_width = 0, Sprite.tiles_height = 0, 
        Sprite.animations = {}, /* harmony default export */
        __webpack_exports__.a = Sprite;
    }, /* 81 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__core_trait__ = __webpack_require__(20), __WEBPACK_IMPORTED_MODULE_1__core_element__ = __webpack_require__(29), Keys_Mapping = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_trait__.a)({
            /**
     * @method initKeysMap
     * @public
     * @description Init the key mapping.
     * @param {Object} keys_mapping Object storing actions names mapped to keyboards keys.
     * @return {Core.Element} This instance.
     * @example
     * myInstance.initKeysMap({ jumpAction: [ Inputs.KEYS.ARROWS.UP, Inputs.KEYS.SPACE ] });
     */
            initKeysMap: function(keys_mapping) {
                if (!this instanceof __WEBPACK_IMPORTED_MODULE_1__core_element__.a) throw new TypeError("Trait Keys_Mapping: trying to make playable a non-Element instance");
                this.useKeysMapping(keys_mapping);
            },
            /**
     * @method useKeysMapping
     * @public
     * @description Update the key mapping.
     * @param {Object} keys_mapping Object storing actions names mapped to keyboards keys.
     * @return {Core.Element} This instance.
     * @example
     * myInstance.useKeysMapping({ jumpAction: [ Inputs.KEYS.ARROWS.UP, Inputs.KEYS.SPACE ] });
     */
            useKeysMapping: function(keys_mapping) {
                return this.$keys_mapping = keys_mapping, this;
            },
            /**
     * @method isActionKeyPressed
     * @public
     * @description Checks if given Inputs object has a pressed key corresponding to given action.
     * @param {Core.Inputs} inputs The Inputs object to check on.
     * @param {String} action_name Name of the action to check.
     * @return {Boolean} `true` if a key corresponding to given action is pressed. `false` otherwise.
     * @example
     * if (myInstance.isActionKeyPressed(myGame.inputs, 'jumpAction') {
     *  // A key for "jumpAction" is pressed
     * }
     */
            isActionKeyPressed: function(inputs, action_name) {
                var keys = this.$keys_mapping[action_name] || [];
                return keys instanceof Array ? keys.some(function(key) {
                    return inputs.isKeyPressed(key);
                }) : inputs.isKeyPressed(keys);
            },
            /**
     * @method isKeyBindedToAction
     * @public
     * @description Checks if given key is binded to given action name.
     * @param {Number} key Key to check.
     * @param {String} action_name Name of the action to check.
     * @return {Boolean} `true` if a this key is binded to this action. `false` otherwise.
     * @example
     * if (myInstance.isKeyBindedToAction(Inputs.KEYS.ARROWS.UP, 'jumpAction') {
     *  // Given key is binded to "jumpAction"
     * }
     */
            isKeyBindedToAction: function(key, action_name) {
                var keys = this.$keys_mapping[action_name] || [];
                return keys instanceof Array ? keys.indexOf(key) >= 0 : keys === key;
            }
        });
        /* harmony default export */
        __webpack_exports__.a = Keys_Mapping;
    }, /* 82 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__core_trait__ = __webpack_require__(20), __WEBPACK_IMPORTED_MODULE_1__core_element__ = __webpack_require__(29), Move_Wrap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_trait__.a)({
            /**
     * @method initMoveWrap
     * @public
     * @description Init the "move wrap" feature.
     * @param {Boolean} [wrap_horizontally=true] If `true`, the element will be switch to opposite side if it goes
     * outside the room from the left or from the right.
     * @param {Boolean} [wrap_vertically=true] If `true`, the element will be switch to opposite side if it goes
     * outside the room from the top or from the bottom.
     * @return {Core.Element} This instance.
     * @example myInstance.initMoveWrap();
     * @example myInstance.initMoveWrap(false);
     * @example myInstance.initMoveWrap(true, false);
     */
            initMoveWrap: function() {
                var _this = this, wrap_horizontally = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], wrap_vertically = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (!this instanceof __WEBPACK_IMPORTED_MODULE_1__core_element__.a) throw new TypeError("Trait Move_Wrap: trying to init move wrap feature on non-Element instance");
                // When instance leaves the room, move it to the opposite side of the room
                return this.on("leave_room", function(e) {
                    var size = _this.getSize();
                    wrap_vertically && (_this.position.y + size.height <= 0 ? _this.position.y = e.detail.room.height : _this.position.y >= e.detail.room.height && (_this.position.y = -size.height)), 
                    wrap_horizontally && (_this.position.x + size.width <= 0 ? _this.position.x = e.detail.room.width : _this.position.x >= e.detail.room.width && (_this.position.x = -size.width));
                }), this;
            }
        });
        /* harmony default export */
        __webpack_exports__.a = Move_Wrap;
    }, /* 83 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(91),
            __esModule: !0
        };
    }, /* 84 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(92),
            __esModule: !0
        };
    }, /* 85 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(93),
            __esModule: !0
        };
    }, /* 86 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(94),
            __esModule: !0
        };
    }, /* 87 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(95),
            __esModule: !0
        };
    }, /* 88 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(99),
            __esModule: !0
        };
    }, /* 89 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = {
            default: __webpack_require__(102),
            __esModule: !0
        };
    }, /* 90 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        exports.__esModule = !0;
        var _isIterable2 = __webpack_require__(84), _isIterable3 = _interopRequireDefault(_isIterable2), _getIterator2 = __webpack_require__(83), _getIterator3 = _interopRequireDefault(_getIterator2);
        exports.default = function() {
            function sliceIterator(arr, i) {
                var _arr = [], _n = !0, _d = !1, _e = void 0;
                try {
                    for (var _s, _i = (0, _getIterator3.default)(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                    !i || _arr.length !== i); _n = !0) ;
                } catch (err) {
                    _d = !0, _e = err;
                } finally {
                    try {
                        !_n && _i.return && _i.return();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            return function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if ((0, _isIterable3.default)(Object(arr))) return sliceIterator(arr, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        }();
    }, /* 91 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(28), __webpack_require__(27), module.exports = __webpack_require__(127);
    }, /* 92 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(28), __webpack_require__(27), module.exports = __webpack_require__(128);
    }, /* 93 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(130), module.exports = __webpack_require__(0).Math.sign;
    }, /* 94 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(131);
        var $Object = __webpack_require__(0).Object;
        module.exports = function(P, D) {
            return $Object.create(P, D);
        };
    }, /* 95 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(132);
        var $Object = __webpack_require__(0).Object;
        module.exports = function(it, key, desc) {
            return $Object.defineProperty(it, key, desc);
        };
    }, /* 96 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(133);
        var $Object = __webpack_require__(0).Object;
        module.exports = function(it) {
            return $Object.getOwnPropertyNames(it);
        };
    }, /* 97 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(75), module.exports = __webpack_require__(0).Object.getOwnPropertySymbols;
    }, /* 98 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(134), module.exports = __webpack_require__(0).Object.getPrototypeOf;
    }, /* 99 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(135), module.exports = __webpack_require__(0).Object.setPrototypeOf;
    }, /* 100 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(74), __webpack_require__(27), __webpack_require__(28), __webpack_require__(136), 
        module.exports = __webpack_require__(0).Promise;
    }, /* 101 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(75), __webpack_require__(74), __webpack_require__(137), __webpack_require__(138), 
        module.exports = __webpack_require__(0).Symbol;
    }, /* 102 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(27), __webpack_require__(28), module.exports = __webpack_require__(44).f("iterator");
    }, /* 103 */
    /***/
    function(module, exports) {
        module.exports = function() {};
    }, /* 104 */
    /***/
    function(module, exports) {
        module.exports = function(it, Constructor, name, forbiddenField) {
            if (!(it instanceof Constructor) || void 0 !== forbiddenField && forbiddenField in it) throw TypeError(name + ": incorrect invocation!");
            return it;
        };
    }, /* 105 */
    /***/
    function(module, exports, __webpack_require__) {
        // false -> Array#indexOf
        // true  -> Array#includes
        var toIObject = __webpack_require__(12), toLength = __webpack_require__(71), toIndex = __webpack_require__(126);
        module.exports = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
                var value, O = toIObject($this), length = toLength(O.length), index = toIndex(fromIndex, length);
                // Array#includes uses SameValueZero equality algorithm
                if (IS_INCLUDES && el != el) {
                    for (;length > index; ) if (value = O[index++], value != value) return !0;
                } else for (;length > index; index++) if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
                return !IS_INCLUDES && -1;
            };
        };
    }, /* 106 */
    /***/
    function(module, exports, __webpack_require__) {
        // all enumerable object keys, includes symbols
        var getKeys = __webpack_require__(23), gOPS = __webpack_require__(65), pIE = __webpack_require__(38);
        module.exports = function(it) {
            var result = getKeys(it), getSymbols = gOPS.f;
            if (getSymbols) for (var key, symbols = getSymbols(it), isEnum = pIE.f, i = 0; symbols.length > i; ) isEnum.call(it, key = symbols[i++]) && result.push(key);
            return result;
        };
    }, /* 107 */
    /***/
    function(module, exports, __webpack_require__) {
        var ctx = __webpack_require__(17), call = __webpack_require__(112), isArrayIter = __webpack_require__(110), anObject = __webpack_require__(5), toLength = __webpack_require__(71), getIterFn = __webpack_require__(73), BREAK = {}, RETURN = {}, exports = module.exports = function(iterable, entries, fn, that, ITERATOR) {
            var length, step, iterator, result, iterFn = ITERATOR ? function() {
                return iterable;
            } : getIterFn(iterable), f = ctx(fn, that, entries ? 2 : 1), index = 0;
            if ("function" != typeof iterFn) throw TypeError(iterable + " is not iterable!");
            // fast case for arrays with default iterator
            if (isArrayIter(iterFn)) {
                for (length = toLength(iterable.length); length > index; index++) if (result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]), 
                result === BREAK || result === RETURN) return result;
            } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) if (result = call(iterator, f, step.value, entries), 
            result === BREAK || result === RETURN) return result;
        };
        exports.BREAK = BREAK, exports.RETURN = RETURN;
    }, /* 108 */
    /***/
    function(module, exports) {
        // fast apply, http://jsperf.lnkit.com/fast-apply/5
        module.exports = function(fn, args, that) {
            var un = void 0 === that;
            switch (args.length) {
              case 0:
                return un ? fn() : fn.call(that);

              case 1:
                return un ? fn(args[0]) : fn.call(that, args[0]);

              case 2:
                return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

              case 3:
                return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

              case 4:
                return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
            }
            return fn.apply(that, args);
        };
    }, /* 109 */
    /***/
    function(module, exports, __webpack_require__) {
        // fallback for non-array-like ES3 and non-enumerable old V8 strings
        var cof = __webpack_require__(16);
        module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
            return "String" == cof(it) ? it.split("") : Object(it);
        };
    }, /* 110 */
    /***/
    function(module, exports, __webpack_require__) {
        // check on default Array iterator
        var Iterators = __webpack_require__(15), ITERATOR = __webpack_require__(1)("iterator"), ArrayProto = Array.prototype;
        module.exports = function(it) {
            return void 0 !== it && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
        };
    }, /* 111 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.2.2 IsArray(argument)
        var cof = __webpack_require__(16);
        module.exports = Array.isArray || function(arg) {
            return "Array" == cof(arg);
        };
    }, /* 112 */
    /***/
    function(module, exports, __webpack_require__) {
        // call something on iterator step with safe closing on error
        var anObject = __webpack_require__(5);
        module.exports = function(iterator, fn, value, entries) {
            try {
                return entries ? fn(anObject(value)[0], value[1]) : fn(value);
            } catch (e) {
                var ret = iterator.return;
                throw void 0 !== ret && anObject(ret.call(iterator)), e;
            }
        };
    }, /* 113 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var create = __webpack_require__(37), descriptor = __webpack_require__(24), setToStringTag = __webpack_require__(25), IteratorPrototype = {};
        // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
        __webpack_require__(11)(IteratorPrototype, __webpack_require__(1)("iterator"), function() {
            return this;
        }), module.exports = function(Constructor, NAME, next) {
            Constructor.prototype = create(IteratorPrototype, {
                next: descriptor(1, next)
            }), setToStringTag(Constructor, NAME + " Iterator");
        };
    }, /* 114 */
    /***/
    function(module, exports, __webpack_require__) {
        var ITERATOR = __webpack_require__(1)("iterator"), SAFE_CLOSING = !1;
        try {
            var riter = [ 7 ][ITERATOR]();
            riter.return = function() {
                SAFE_CLOSING = !0;
            }, Array.from(riter, function() {
                throw 2;
            });
        } catch (e) {}
        module.exports = function(exec, skipClosing) {
            if (!skipClosing && !SAFE_CLOSING) return !1;
            var safe = !1;
            try {
                var arr = [ 7 ], iter = arr[ITERATOR]();
                iter.next = function() {
                    return {
                        done: safe = !0
                    };
                }, arr[ITERATOR] = function() {
                    return iter;
                }, exec(arr);
            } catch (e) {}
            return safe;
        };
    }, /* 115 */
    /***/
    function(module, exports) {
        module.exports = function(done, value) {
            return {
                value: value,
                done: !!done
            };
        };
    }, /* 116 */
    /***/
    function(module, exports, __webpack_require__) {
        var getKeys = __webpack_require__(23), toIObject = __webpack_require__(12);
        module.exports = function(object, el) {
            for (var key, O = toIObject(object), keys = getKeys(O), length = keys.length, index = 0; length > index; ) if (O[key = keys[index++]] === el) return key;
        };
    }, /* 117 */
    /***/
    function(module, exports) {
        // 20.2.2.28 Math.sign(x)
        module.exports = Math.sign || function(x) {
            return 0 == (x = +x) || x != x ? x : x < 0 ? -1 : 1;
        };
    }, /* 118 */
    /***/
    function(module, exports, __webpack_require__) {
        var META = __webpack_require__(26)("meta"), isObject = __webpack_require__(14), has = __webpack_require__(10), setDesc = __webpack_require__(8).f, id = 0, isExtensible = Object.isExtensible || function() {
            return !0;
        }, FREEZE = !__webpack_require__(18)(function() {
            return isExtensible(Object.preventExtensions({}));
        }), setMeta = function(it) {
            setDesc(it, META, {
                value: {
                    i: "O" + ++id,
                    // object ID
                    w: {}
                }
            });
        }, fastKey = function(it, create) {
            // return primitive with prefix
            if (!isObject(it)) return "symbol" == typeof it ? it : ("string" == typeof it ? "S" : "P") + it;
            if (!has(it, META)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return "F";
                // not necessary to add metadata
                if (!create) return "E";
                // add missing metadata
                setMeta(it);
            }
            return it[META].i;
        }, getWeak = function(it, create) {
            if (!has(it, META)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return !0;
                // not necessary to add metadata
                if (!create) return !1;
                // add missing metadata
                setMeta(it);
            }
            return it[META].w;
        }, onFreeze = function(it) {
            return FREEZE && meta.NEED && isExtensible(it) && !has(it, META) && setMeta(it), 
            it;
        }, meta = module.exports = {
            KEY: META,
            NEED: !1,
            fastKey: fastKey,
            getWeak: getWeak,
            onFreeze: onFreeze
        };
    }, /* 119 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(4), macrotask = __webpack_require__(70).set, Observer = global.MutationObserver || global.WebKitMutationObserver, process = global.process, Promise = global.Promise, isNode = "process" == __webpack_require__(16)(process);
        module.exports = function() {
            var head, last, notify, flush = function() {
                var parent, fn;
                for (isNode && (parent = process.domain) && parent.exit(); head; ) {
                    fn = head.fn, head = head.next;
                    try {
                        fn();
                    } catch (e) {
                        throw head ? notify() : last = void 0, e;
                    }
                }
                last = void 0, parent && parent.enter();
            };
            // Node.js
            if (isNode) notify = function() {
                process.nextTick(flush);
            }; else if (Observer) {
                var toggle = !0, node = document.createTextNode("");
                new Observer(flush).observe(node, {
                    characterData: !0
                }), // eslint-disable-line no-new
                notify = function() {
                    node.data = toggle = !toggle;
                };
            } else if (Promise && Promise.resolve) {
                var promise = Promise.resolve();
                notify = function() {
                    promise.then(flush);
                };
            } else notify = function() {
                // strange IE + webpack dev server bug - use .call(global)
                macrotask.call(global, flush);
            };
            return function(fn) {
                var task = {
                    fn: fn,
                    next: void 0
                };
                last && (last.next = task), head || (head = task, notify()), last = task;
            };
        };
    }, /* 120 */
    /***/
    function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(8), anObject = __webpack_require__(5), getKeys = __webpack_require__(23);
        module.exports = __webpack_require__(6) ? Object.defineProperties : function(O, Properties) {
            anObject(O);
            for (var P, keys = getKeys(Properties), length = keys.length, i = 0; length > i; ) dP.f(O, P = keys[i++], Properties[P]);
            return O;
        };
    }, /* 121 */
    /***/
    function(module, exports, __webpack_require__) {
        var hide = __webpack_require__(11);
        module.exports = function(target, src, safe) {
            for (var key in src) safe && target[key] ? target[key] = src[key] : hide(target, key, src[key]);
            return target;
        };
    }, /* 122 */
    /***/
    function(module, exports, __webpack_require__) {
        // Works with __proto__ only. Old v8 can't work with null proto objects.
        /* eslint-disable no-proto */
        var isObject = __webpack_require__(14), anObject = __webpack_require__(5), check = function(O, proto) {
            if (anObject(O), !isObject(proto) && null !== proto) throw TypeError(proto + ": can't set as prototype!");
        };
        module.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? // eslint-disable-line
            function(test, buggy, set) {
                try {
                    set = __webpack_require__(17)(Function.call, __webpack_require__(62).f(Object.prototype, "__proto__").set, 2), 
                    set(test, []), buggy = !(test instanceof Array);
                } catch (e) {
                    buggy = !0;
                }
                return function(O, proto) {
                    return check(O, proto), buggy ? O.__proto__ = proto : set(O, proto), O;
                };
            }({}, !1) : void 0),
            check: check
        };
    }, /* 123 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var global = __webpack_require__(4), core = __webpack_require__(0), dP = __webpack_require__(8), DESCRIPTORS = __webpack_require__(6), SPECIES = __webpack_require__(1)("species");
        module.exports = function(KEY) {
            var C = "function" == typeof core[KEY] ? core[KEY] : global[KEY];
            DESCRIPTORS && C && !C[SPECIES] && dP.f(C, SPECIES, {
                configurable: !0,
                get: function() {
                    return this;
                }
            });
        };
    }, /* 124 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.3.20 SpeciesConstructor(O, defaultConstructor)
        var anObject = __webpack_require__(5), aFunction = __webpack_require__(32), SPECIES = __webpack_require__(1)("species");
        module.exports = function(O, D) {
            var S, C = anObject(O).constructor;
            return void 0 === C || void 0 == (S = anObject(C)[SPECIES]) ? D : aFunction(S);
        };
    }, /* 125 */
    /***/
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(41), defined = __webpack_require__(34);
        // true  -> String#at
        // false -> String#codePointAt
        module.exports = function(TO_STRING) {
            return function(that, pos) {
                var a, b, s = String(defined(that)), i = toInteger(pos), l = s.length;
                return i < 0 || i >= l ? TO_STRING ? "" : void 0 : (a = s.charCodeAt(i), a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 55296 << 10) + (b - 56320) + 65536);
            };
        };
    }, /* 126 */
    /***/
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(41), max = Math.max, min = Math.min;
        module.exports = function(index, length) {
            return index = toInteger(index), index < 0 ? max(index + length, 0) : min(index, length);
        };
    }, /* 127 */
    /***/
    function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(5), get = __webpack_require__(73);
        module.exports = __webpack_require__(0).getIterator = function(it) {
            var iterFn = get(it);
            if ("function" != typeof iterFn) throw TypeError(it + " is not iterable!");
            return anObject(iterFn.call(it));
        };
    }, /* 128 */
    /***/
    function(module, exports, __webpack_require__) {
        var classof = __webpack_require__(33), ITERATOR = __webpack_require__(1)("iterator"), Iterators = __webpack_require__(15);
        module.exports = __webpack_require__(0).isIterable = function(it) {
            var O = Object(it);
            return void 0 !== O[ITERATOR] || "@@iterator" in O || Iterators.hasOwnProperty(classof(O));
        };
    }, /* 129 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var addToUnscopables = __webpack_require__(103), step = __webpack_require__(115), Iterators = __webpack_require__(15), toIObject = __webpack_require__(12);
        // 22.1.3.4 Array.prototype.entries()
        // 22.1.3.13 Array.prototype.keys()
        // 22.1.3.29 Array.prototype.values()
        // 22.1.3.30 Array.prototype[@@iterator]()
        module.exports = __webpack_require__(61)(Array, "Array", function(iterated, kind) {
            this._t = toIObject(iterated), // target
            this._i = 0, // next index
            this._k = kind;
        }, function() {
            var O = this._t, kind = this._k, index = this._i++;
            return !O || index >= O.length ? (this._t = void 0, step(1)) : "keys" == kind ? step(0, index) : "values" == kind ? step(0, O[index]) : step(0, [ index, O[index] ]);
        }, "values"), // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
        Iterators.Arguments = Iterators.Array, addToUnscopables("keys"), addToUnscopables("values"), 
        addToUnscopables("entries");
    }, /* 130 */
    /***/
    function(module, exports, __webpack_require__) {
        // 20.2.2.28 Math.sign(x)
        var $export = __webpack_require__(7);
        $export($export.S, "Math", {
            sign: __webpack_require__(117)
        });
    }, /* 131 */
    /***/
    function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(7);
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        $export($export.S, "Object", {
            create: __webpack_require__(37)
        });
    }, /* 132 */
    /***/
    function(module, exports, __webpack_require__) {
        var $export = __webpack_require__(7);
        // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
        $export($export.S + $export.F * !__webpack_require__(6), "Object", {
            defineProperty: __webpack_require__(8).f
        });
    }, /* 133 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.7 Object.getOwnPropertyNames(O)
        __webpack_require__(68)("getOwnPropertyNames", function() {
            return __webpack_require__(63).f;
        });
    }, /* 134 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.9 Object.getPrototypeOf(O)
        var toObject = __webpack_require__(72), $getPrototypeOf = __webpack_require__(66);
        __webpack_require__(68)("getPrototypeOf", function() {
            return function(it) {
                return $getPrototypeOf(toObject(it));
            };
        });
    }, /* 135 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.3.19 Object.setPrototypeOf(O, proto)
        var $export = __webpack_require__(7);
        $export($export.S, "Object", {
            setPrototypeOf: __webpack_require__(122).set
        });
    }, /* 136 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var Internal, GenericPromiseCapability, Wrapper, LIBRARY = __webpack_require__(22), global = __webpack_require__(4), ctx = __webpack_require__(17), classof = __webpack_require__(33), $export = __webpack_require__(7), isObject = __webpack_require__(14), aFunction = __webpack_require__(32), anInstance = __webpack_require__(104), forOf = __webpack_require__(107), speciesConstructor = __webpack_require__(124), task = __webpack_require__(70).set, microtask = __webpack_require__(119)(), PROMISE = "Promise", TypeError = global.TypeError, process = global.process, $Promise = global[PROMISE], process = global.process, isNode = "process" == classof(process), empty = function() {}, USE_NATIVE = !!function() {
            try {
                // correct subclassing with @@species support
                var promise = $Promise.resolve(1), FakePromise = (promise.constructor = {})[__webpack_require__(1)("species")] = function(exec) {
                    exec(empty, empty);
                };
                // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
                return (isNode || "function" == typeof PromiseRejectionEvent) && promise.then(empty) instanceof FakePromise;
            } catch (e) {}
        }(), sameConstructor = function(a, b) {
            // with library wrapper special case
            return a === b || a === $Promise && b === Wrapper;
        }, isThenable = function(it) {
            var then;
            return !(!isObject(it) || "function" != typeof (then = it.then)) && then;
        }, newPromiseCapability = function(C) {
            return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
        }, PromiseCapability = GenericPromiseCapability = function(C) {
            var resolve, reject;
            this.promise = new C(function($$resolve, $$reject) {
                if (void 0 !== resolve || void 0 !== reject) throw TypeError("Bad Promise constructor");
                resolve = $$resolve, reject = $$reject;
            }), this.resolve = aFunction(resolve), this.reject = aFunction(reject);
        }, perform = function(exec) {
            try {
                exec();
            } catch (e) {
                return {
                    error: e
                };
            }
        }, notify = function(promise, isReject) {
            if (!promise._n) {
                promise._n = !0;
                var chain = promise._c;
                microtask(function() {
                    for (var value = promise._v, ok = 1 == promise._s, i = 0, run = function(reaction) {
                        var result, then, handler = ok ? reaction.ok : reaction.fail, resolve = reaction.resolve, reject = reaction.reject, domain = reaction.domain;
                        try {
                            handler ? (ok || (2 == promise._h && onHandleUnhandled(promise), promise._h = 1), 
                            handler === !0 ? result = value : (domain && domain.enter(), result = handler(value), 
                            domain && domain.exit()), result === reaction.promise ? reject(TypeError("Promise-chain cycle")) : (then = isThenable(result)) ? then.call(result, resolve, reject) : resolve(result)) : reject(value);
                        } catch (e) {
                            reject(e);
                        }
                    }; chain.length > i; ) run(chain[i++]);
                    // variable length - can't use forEach
                    promise._c = [], promise._n = !1, isReject && !promise._h && onUnhandled(promise);
                });
            }
        }, onUnhandled = function(promise) {
            task.call(global, function() {
                var abrupt, handler, console, value = promise._v;
                if (isUnhandled(promise) && (abrupt = perform(function() {
                    isNode ? process.emit("unhandledRejection", value, promise) : (handler = global.onunhandledrejection) ? handler({
                        promise: promise,
                        reason: value
                    }) : (console = global.console) && console.error && console.error("Unhandled promise rejection", value);
                }), // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
                promise._h = isNode || isUnhandled(promise) ? 2 : 1), promise._a = void 0, abrupt) throw abrupt.error;
            });
        }, isUnhandled = function(promise) {
            if (1 == promise._h) return !1;
            for (var reaction, chain = promise._a || promise._c, i = 0; chain.length > i; ) if (reaction = chain[i++], 
            reaction.fail || !isUnhandled(reaction.promise)) return !1;
            return !0;
        }, onHandleUnhandled = function(promise) {
            task.call(global, function() {
                var handler;
                isNode ? process.emit("rejectionHandled", promise) : (handler = global.onrejectionhandled) && handler({
                    promise: promise,
                    reason: promise._v
                });
            });
        }, $reject = function(value) {
            var promise = this;
            promise._d || (promise._d = !0, promise = promise._w || promise, // unwrap
            promise._v = value, promise._s = 2, promise._a || (promise._a = promise._c.slice()), 
            notify(promise, !0));
        }, $resolve = function(value) {
            var then, promise = this;
            if (!promise._d) {
                promise._d = !0, promise = promise._w || promise;
                // unwrap
                try {
                    if (promise === value) throw TypeError("Promise can't be resolved itself");
                    (then = isThenable(value)) ? microtask(function() {
                        var wrapper = {
                            _w: promise,
                            _d: !1
                        };
                        // wrap
                        try {
                            then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
                        } catch (e) {
                            $reject.call(wrapper, e);
                        }
                    }) : (promise._v = value, promise._s = 1, notify(promise, !1));
                } catch (e) {
                    $reject.call({
                        _w: promise,
                        _d: !1
                    }, e);
                }
            }
        };
        // constructor polyfill
        USE_NATIVE || (// 25.4.3.1 Promise(executor)
        $Promise = function(executor) {
            anInstance(this, $Promise, PROMISE, "_h"), aFunction(executor), Internal.call(this);
            try {
                executor(ctx($resolve, this, 1), ctx($reject, this, 1));
            } catch (err) {
                $reject.call(this, err);
            }
        }, Internal = function(executor) {
            this._c = [], // <- awaiting reactions
            this._a = void 0, // <- checked in isUnhandled reactions
            this._s = 0, // <- state
            this._d = !1, // <- done
            this._v = void 0, // <- value
            this._h = 0, // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
            this._n = !1;
        }, Internal.prototype = __webpack_require__(121)($Promise.prototype, {
            // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
            then: function(onFulfilled, onRejected) {
                var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
                return reaction.ok = "function" != typeof onFulfilled || onFulfilled, reaction.fail = "function" == typeof onRejected && onRejected, 
                reaction.domain = isNode ? process.domain : void 0, this._c.push(reaction), this._a && this._a.push(reaction), 
                this._s && notify(this, !1), reaction.promise;
            },
            // 25.4.5.1 Promise.prototype.catch(onRejected)
            catch: function(onRejected) {
                return this.then(void 0, onRejected);
            }
        }), PromiseCapability = function() {
            var promise = new Internal();
            this.promise = promise, this.resolve = ctx($resolve, promise, 1), this.reject = ctx($reject, promise, 1);
        }), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
            Promise: $Promise
        }), __webpack_require__(25)($Promise, PROMISE), __webpack_require__(123)(PROMISE), 
        Wrapper = __webpack_require__(0)[PROMISE], // statics
        $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
            // 25.4.4.5 Promise.reject(r)
            reject: function(r) {
                var capability = newPromiseCapability(this), $$reject = capability.reject;
                return $$reject(r), capability.promise;
            }
        }), $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
            // 25.4.4.6 Promise.resolve(x)
            resolve: function(x) {
                // instanceof instead of internal slot check because we should fix it without replacement native Promise core
                if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
                var capability = newPromiseCapability(this), $$resolve = capability.resolve;
                return $$resolve(x), capability.promise;
            }
        }), $export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(114)(function(iter) {
            $Promise.all(iter).catch(empty);
        })), PROMISE, {
            // 25.4.4.1 Promise.all(iterable)
            all: function(iterable) {
                var C = this, capability = newPromiseCapability(C), resolve = capability.resolve, reject = capability.reject, abrupt = perform(function() {
                    var values = [], index = 0, remaining = 1;
                    forOf(iterable, !1, function(promise) {
                        var $index = index++, alreadyCalled = !1;
                        values.push(void 0), remaining++, C.resolve(promise).then(function(value) {
                            alreadyCalled || (alreadyCalled = !0, values[$index] = value, --remaining || resolve(values));
                        }, reject);
                    }), --remaining || resolve(values);
                });
                return abrupt && reject(abrupt.error), capability.promise;
            },
            // 25.4.4.4 Promise.race(iterable)
            race: function(iterable) {
                var C = this, capability = newPromiseCapability(C), reject = capability.reject, abrupt = perform(function() {
                    forOf(iterable, !1, function(promise) {
                        C.resolve(promise).then(capability.resolve, reject);
                    });
                });
                return abrupt && reject(abrupt.error), capability.promise;
            }
        });
    }, /* 137 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(43)("asyncIterator");
    }, /* 138 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(43)("observable");
    }, /* 139 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(76);
    } ]);
});