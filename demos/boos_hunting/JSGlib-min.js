/*!
 * JSGlib v3.0, JavaScript Library
 * http://jsglib.no-ip.org/
 *
 * Copyright 2011-2013, Adrien Guéret
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * Date: 28/04/2013
 */

(function (window, document, undefined) {
    'use strict';
    
    var JSGlib = {},
        animationLastTime = 0,
        requestAnimationFrame = (function () {
            return  window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (callback) {
                        var currTime = new Date().getTime(),
                            timeToCall = Math.max(0, 16 - (currTime - animationLastTime));
                        window.setTimeout(function () {
                            callback(currTime + timeToCall);
                        }, timeToCall);
                        animationLastTime = currTime + timeToCall;
                    };
        })(),
        jsglib_games = {},
        jsglib_keys_pressed = [],
        jsglib_types_tiles = {
            WALL: 1,
            SLOPE: 2
        },
        canvasFilter = document.createElement('canvas'),
        ctxFilter = canvasFilter.getContext('2d'),
        jsglib_total_types_tiles = 2,
        userLang = navigator.userLanguage ? navigator.userLanguage : navigator.language,
        langSep = userLang.indexOf('-'),
		states_constants = {
			//@start_const STATE
			STAND: 10,
			STAND_LEFT: 11,
			STAND_RIGHT: 12,
			STAND_UP: 13,
			STAND_DOWN: 14,
			STAND_UP_LEFT: 15,
			STAND_UP_RIGHT: 16,
			STAND_DOWN_LEFT: 17,
			STAND_DOWN_RIGHT: 18,
			MOVE: 20,
			MOVE_LEFT: 21,
			MOVE_RIGHT: 22,
			MOVE_UP: 23,
			MOVE_DOWN: 24,
			MOVE_UP_LEFT: 25,
			MOVE_UP_RIGHT: 26,
			MOVE_DOWN_LEFT: 27,
			MOVE_DOWN_RIGHT: 28,
			HURT: 30,
			HURT_LEFT: 31,
			HURT_RIGHT: 32,
			HURT_UP: 33,
			HURT_DOWN: 34,
			HURT_UP_LEFT: 35,
			HURT_UP_RIGHT: 36,
			HURT_DOWN_LEFT: 37,
			HURT_DOWN_RIGHT: 38,
			DEATH: 40,
			DEATH_LEFT: 41,
			DEATH_RIGHT: 42,
			DEATH_UP: 43,
			DEATH_DOWN: 44,
			DEATH_UP_LEFT: 45,
			DEATH_UP_RIGHT: 46,
			DEATH_DOWN_LEFT: 47,
			DEATH_DOWN_RIGHT: 48,
			SLIP: 50,
			SLIP_LEFT: 51,
			SLIP_RIGHT: 52,
			SLIP_UP: 53,
			SLIP_DOWN: 54,
			SLIP_UP_LEFT: 55,
			SLIP_UP_RIGHT: 56,
			SLIP_DOWN_LEFT: 57,
			SLIP_DOWN_RIGHT: 58
			//@end_const
		};
        
    userLang = langSep > -1 ? userLang.substr(0, langSep) : userLang;

    JSGlib = {
        /// <field name="TILES_TYPES" static="true" type="Const">Object containing tiles types constants.</field>
        get TILES_TYPES() { return jsglib_types_tiles; },
        /// <field name="USER_LANG" static="true" type="Const">Lang using by player's browser.</field>
        get USER_LANG() { return userLang; },
        /// <field name="KEYWORDS" static="true" type="Const">Object containing some keywords constants.</field>
        get KEYWORDS() {
            return {
                //@start_const KEYWORDS
				BREAK: 'JSGLIB_BREAK',
                CONTINUE: 'JSGLIB_CONTINUE',
                NULL: 'JSGLIB_NULL',
                UNDEFINED: 'JSGLIB_UNDEFINED',
                REPEAT: 'JSGLIB_REPEAT',
                REVERSE: 'JSGLIB_REVERSE'
                //@end_const
            };
        },
        /// <field name="BACKGROUND" static="true" type="Const">Object containing constants for behavior or background-repeat for layers.</field>
        get BACKGROUND() {
            return {
                //@start_const BACKGROUND
				NO_REPEAT: 0,
                REPEAT_X: 1,
                REPEAT_Y: 2,
                REPEAT: 3
                //@end_const
            };
        },
        /// <field name="KEY" static="true" type="Const">Object containing keyboard constants.</field>
        get KEY() {
            return {
                //@start_const KEY
				TAB: 9,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                CONTROL: 17,
                ALT: 18,
                CAPS_LOCK: 20,
                SPACE: 32,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
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
				//@end_const
            };
        },
        /// <field name="STATE" static="true" type="Const">Object containing states constants for development help.</field>
        get STATE() {
            return states_constants;
        },
        /// <field name="addStateConstant" static="true" type="Function">Add a new state constant to JSGlib. You must call this method BEFORE running your game.</field>
        addStateConstant: function (constantName) {
            /// <param name="constantName" type="String">Name of the constant to add.</param>
            /// <returns type="JSGlib">The JSGlib object.</returns>
            var lastContValue = 10,
				 minValue = 0;
			
			constantName = constantName.toUpperCase();
			
			if (states_constants[constantName]) {
				throw new ReferenceError('JSGlib.addStateConstant() => constant "' + constantName + '" already exists.');
			}
			
			JSGlib.forEach(states_constants, function () {
				if (this > lastContValue && this % 10 === 0) {
					lastContValue = this;
				}
			});

			lastContValue += 10;
			minValue = lastContValue;
			
			states_constants[constantName] = lastContValue;
			constantName += '_';
			states_constants[constantName + 'LEFT'] = ++lastContValue;
			states_constants[constantName + 'RIGHT'] = ++lastContValue;
			states_constants[constantName + 'UP'] = ++lastContValue;
			states_constants[constantName + 'DOWN'] = ++lastContValue;
			states_constants[constantName + 'UP_LEFT'] = ++lastContValue;
			states_constants[constantName + 'UP_RIGHT'] = ++lastContValue;
			states_constants[constantName + 'DOWN_LEFT'] = ++lastContValue;
			states_constants[constantName + 'DOWN_RIGHT'] = ++lastContValue;
			
			JSGlib.Element.prototype['isState' + constantName] = function () {
				var state = this.state();
				return state >= minValue && state <= lastContValue;
			};
			
            return JSGlib;
        },
		/// <field name="isKeyPressed" static="true" type="Function">Check if given key is pressed.</field>
        isKeyPressed: function (key) {
            /// <param name="key" type="Number">Key to check.</param>
            /// <returns type="Bool">true if key is pressed. false otherwise.</returns>
            key = key.valueOf();
			var r = JSGlib.forEach(jsglib_keys_pressed, function () {
				if (this.valueOf() == key) {
                    return true;
                }
            });
            return r || false;
        },
		/// <field name="forceKeyUp" static="true" type="Function">Force JSGlib to think that given key has been released, even if player still presses it.</field>
        forceKeyUp: function (key, dontTriggerEvent) {
            /// <param name="key" type="Number">Key to unpress.</param>
            /// <param name="dontTriggerEvent" type="Bool" optional="true">If true, "eventKeyUp" won't be triggered. Default: false.</param>
            /// <returns type="Bool">true if key was pressed. false otherwise.</returns>
			
			var r = JSGlib.removeFromArray(key, jsglib_keys_pressed);
			
			if (r && !dontTriggerEvent) {
				JSGlib.forEach(jsglib_games, function () {
					this.emitEvent('eventKeyUp', key);
				});
			}
			
			return r;
        },
        /// <field name="isNull" static="true" type="Function">Check if given value is null. This function must be used inside a forEach() callback.</field>
        isNull: function (value) {
            /// <param name="value" type="Mixed">Value to check.</param>
            /// <returns type="Bool">true if value is null. false otherwise.</returns>
            return value === null || value == JSGlib.KEYWORDS.NULL;
        },
        /// <field name="isUndefined" static="true" type="Function">Check if given value is undefined. This function must be used inside a forEach() callback.</field>
        isUndefined: function (value) {
            /// <param name="value" type="Mixed">Value to check.</param>
            /// <returns type="Bool">true if value is undefined. false otherwise.</returns>
            return value === undefined || value == JSGlib.KEYWORDS.UNDEFINED;
        },
        /// <field name="isset" static="true" type="Function">Check if given value is not undefined and not null. This function must be used inside a forEach() callback.</field>
        isSet: function (value) {
            /// <param name="value" type="Mixed">Value to check.</param>
            /// <returns type="Bool">true if value is not undefined and not null. false otherwise.</returns>
            return !JSGlib.isNull(value) && !JSGlib.isUndefined(value);
        },
        /// <field name="getVectorDirection" static="true" type="Function">Add both given vector values and return the direction of the result.</field>
        getVectorDirection: function (vectorValue1, vectorValue2) {
            /// <param name="vectorValue1" type="Number">Value of first vector.</param>
            /// <param name="vectorValue1" type="Number">Value of second vector.</param>
            /// <returns type="Number">true if value is not undefined and not null. false otherwise.</returns>
            if (vectorValue1 === 0 || vectorValue2 === 0) {
                return vectorValue1 === 0 ? (
                                    vectorValue2 > 0 ? 270 : (
                                        vectorValue2 < 0 ? 90 : 0
                                    )
                                ) : (
                                    vectorValue2 === 0 ? (
                                        vectorValue1 < 0 ? 180 : 360
                                    ) : 0
                                );
            } else {
                var direction = Math.round(180 * Math.abs(Math.atan(vectorValue2 / vectorValue1)) / Math.PI);
                return vectorValue1 < 0 && vectorValue2 < 0 ?
                                        180 - direction : (
                                            vectorValue1 > 0 && vectorValue2 > 0 ?
                                                360 - direction : (
                                                    vectorValue1 < 0 ? 180 + direction : direction
                                                )
                                        );
            }
        },
        /// <field name="removeFromArray" static="true" type="Function">Remove given element from given array.</field>
        removeFromArray: function (element, array, callback) {
            /// <param name="element" type="Mixed">Element to remove.</param>
            /// <param name="array" type="Array">Array to scan.</param>
            /// <param name="callback" type="Function" optional="true">Function to use in order to compare elements.<br />It must accept two parameters and return a boolean.</param>
            /// <returns type="Bool">true if the element was removed. false otherwise.</returns>

            callback = callback || function (a, b) {
				return a == b;
            };

            var r = JSGlib.forEach(array, function (i) {
                if (callback(element, this)) {
					array.splice(i.key, 1);
                    return true;
                }
            });
            
            return r || false;
        },
		/// <field name="uniqueArray" static="true" type="Function">Remove duplicated content in given array.</field>
        uniqueArray: function (array, isArrayOfElements) {
            /// <param name="array" type="Array">Array to scan.</param>
            /// <param name="isArrayOfElements" type="Bool" optional="true">If true, indicates that given array contains JSGlib.Element.<br />
			/// If false, indicates that given array contains only primitive values.<br />Default: false.</param>
            /// <returns type="Array">The new array.</returns>
			var tempObject = {},
				newArray = [];
			
			JSGlib.forEach(array, function () {
				tempObject[isArrayOfElements ? this.getId() : this] = this;
			});
			
			JSGlib.forEach(tempObject, function () {
				newArray.push(this);
			});

			return newArray;
		},
        /// <field name="ajax" static="true" type="Function">Performs an Ajax request.</field>
        ajax: function (options) {
            /// <param name="options" type="Object">Options setting the request.<br />
            /// {<br />
            ///  'url': URL to call. (required),<br />
            ///  'async': Boolean indicating if request must be asynchronous (true) or synchronous (false). Default: true,<br />
            ///  'type': 'GET' or 'POST'. Default: 'POST',<br />
            ///  'dataType': Type of data to receive from server: 'TEXT', 'XML' or 'JSON'. Default: 'TEXT',<br />
            ///  'data': Object containing values to send to the server. Default: {},<br />
            ///  'onAjaxAborted': function () { Function called if request is aborted },<br />
            ///  'onError': function () { Function called if an errors occurs },<br />
            ///  'onSuccess': function () { Function called when the request is successfully finished }<br />
            /// }</param>
			/// <returns type="JSGlib">The JSGlib object.</returns>
            var req = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP'),
                defaults = {
                    url: './',
                    async: true,
                    type: 'POST',
                    dataType: 'TEXT',
                    data: {},
                    onAjaxAborted: function () {},
                    onError: function () {},
                    onSuccess: function () {}
                },
                data = '',
                isPost = true,
                objectToStringData = function (index, value, prefix) {
                    index = prefix === undefined ? index : prefix + '[' + index + ']';

                    if (typeof value.valueOf() == 'object') {
                        var d = '';
                        JSGlib.forEach(value, function (i) {
                            d += objectToStringData(i.key, this, index);
                        });
                        return d;
                    }
                    else {
                        return index + '=' + value + '&';
                    }
                };
		
            //Merge defaults with given options
            JSGlib.forEach(defaults, function (i) {
                if (options[i.key] === undefined) {
                    options[i.key] = this;
                }
            });
            isPost = options.type == 'POST';
            options.dataType = options.dataType.toUpperCase();
	
            if (req) {	
                //Format datas
                JSGlib.forEach(options.data, function (i) {
                    data += objectToStringData(i.key, this);
                });

                data = data.substr(0, data.length - 1);
				
                req.onreadystatechange = function () {
                    //Only if req is "loaded"
                    if (req.readyState == 4) {
                        //Only if "OK"
                        if (req.status == 200 || req.status == 304) {
                            options.onSuccess(options.dataType == 'JSON' ? JSON.parse(req.responseText)
                                                : (options.dataType == 'XML' ? req.responseXML
                                                    : req.responseText));
                        } 
                        else {
                            options.onError(req.statusText);
                        }
                    }
                };
                req.open(options.type, options.url + (isPost ? '' : '?' + data), options.async);
                if (isPost) {
                    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                }

                req.send(isPost ? data : null);
            }
            else
            {
                options.onAjaxAborted();
            }
			return this;
        },
        /// <field name="random" static="true" type="Function">Generates a random interger.</field>
        random: function (min, max) {
            /// <param name="min" type="Number">Minimum inclusive value, can be negative.</param>
            /// <param name="max" type="Number">Maximum inclusive value, can be negative.</param>
            /// <returns type="Number">The generated integer.</returns>

            var temp = 0,
                delta = 0;

            if (min > max) {
                temp = max;
                max = min;
                min = temp;
            }
            delta = 1 + max - min;
            return Math.floor(delta * Math.random()) + min;
        },
        /// <field name="forEach" static="true" type="Function">Iterates through a collection in order to apply a callback function to each elements.<br />
		/// You can break the loop by returning the value JSGlib.KEYWORDS.BREAK or continue it by returning the value JSGlib.KEYWORDS.CONTINUE.</field>
        forEach: function (collection, callback, args) {
            /// <param name="collection" type="Array/Object">Collection to iterate through.</param>
            /// <param name="callback" type="Function">The function to call for each elements in the collection.</param>
            /// <param name="args" type="Mixed" optional="true">Parameters to send to the called function.<br />
            /// If you want to send several parameters, simply send an array or an Object.</param>
            /// <returns type="Mixed">The returned value of the callback function if this value isn't undefined.<br />Otherwise, it returns nothing.</returns>
            var index = '',
                length = 0,
                returnValue = null,
                performCallback = function (index, args) {
                    var value = collection[index];
                    args.key = index;

                    //This quite tricky... But if we give a null or undefined value to call() method, "this" refers to window Object!
                    if (value === undefined) {
                        value = JSGlib.KEYWORDS.UNDEFINED;
                    } else if (value === null) {
                        value = JSGlib.KEYWORDS.NULL;
                    }

                    return callback.call(value.valueOf(), args);
                };
            
            args = {
                'values': args
            };
            
            if (collection instanceof Array || collection instanceof window.NodeList) {
                length = collection.length;             
                for (index = 0; index < length; index++) {
                    returnValue = performCallback(index, args);

                    if (returnValue !== undefined) {
                        if (returnValue == JSGlib.KEYWORDS.BREAK) {
                            break;
                        } else if (returnValue == JSGlib.KEYWORDS.CONTINUE) {
                            continue;
                        } else {
                            return returnValue;
                        }
                    }           
                }               
            } else {
                for (index in collection) {
                    if (collection.hasOwnProperty(index)) {
                        returnValue = performCallback(index, args);

                        if (returnValue !== undefined) {
                            if (returnValue == JSGlib.KEYWORDS.BREAK) {
                                break;
                            } else {
                                return returnValue;
                            }
                        }
                    }
                }
            }
        },
        /// <field name="Game" static="true" type="Class">A class managing a game.</field>
        //@start_class Game
        Game: function (idContainer, tilesSize) {
			/// <param name="idContainer" type="String">ID of the container of the game.</param>
            /// <param name="tilesSize" type="Number" optional="true">Size of tiles composing the game. Default: 16.</param>
			
            if (!idContainer) {
                throw new ReferenceError('new JSGlib.Game(idContainer) -> please provide a paramater.');
            }

            if (jsglib_games[idContainer]) {
                throw new Error('Container with id "' + idContainer + '" already contains a game.');
            }
            
            /*==  Private properties  ==*/

            var _tilesSize = tilesSize ? parseInt(tilesSize, 10) : 16,
                _tiles = {},
                _thisGame = this,
                _container = null,
                _containerComputedStyle = null,
                _currentRoom = null,
                _images = {},
                _sounds = {},
                _soundsPlaying = [],
                _soundsPaused = [],
                _muteSounds = false,
                _rooms = [],
                _roomsDefinitions = {},
				_viewHasMoved = false,
                _isRunning = false,
                _mouse = new JSGlib.Point(),
                _allElements = [],
                _activeElements = [],
                _activeElementsIndex = [],
                _checkCollidedElementsIndexes = {},
                _instancesToDestroy = [],
                _layers = [],
                _classes = {},
                _fps = 60,
                _totalLayers = 0,
                _currentStep = 0,
                _drawingObjects = [],
                _defaultLang = 'en',
                _translations = {},
                _max_zIndex = 0,
                    
                /*==  Private methods  ==*/

                _refresh = function () {
                    setTimeout(function () {
                        //Clear needed layers and re-draw them.
                        _clearDisplay(false, function () {
                            var layer = this;
                            JSGlib.forEach(layer.elements, function () {
                                if (_thisGame.isElementActive(this)) {
									_drawElement(this, layer);
								}
                            });
                        });

                        JSGlib.forEach(_drawingObjects, function () {
                            var layer = this.layer,
                                borderSize = this.object.borderSize(),
                                fillPosition = new JSGlib.Point(parseInt(this.position.x(), 10),
                                                                parseInt(this.position.y(), 10)),
                                strokePosition = null;

                            layer.ctx.globalAlpha = this.object.opacity() / 100;
                            layer.ctx.fillStyle = this.object.color().getHexadecimal();

                            layer.ctx.globalCompositeOperation = this.eraseMode ? 'destination-out' : 'source-over';

                            if (borderSize > 0) {
                                layer.ctx.strokeStyle = this.object.borderColor().getHexadecimal();
                                layer.ctx.lineWidth = borderSize;

                                strokePosition = new JSGlib.Point(fillPosition);

                                if (layer.ctx.lineWidth % 2 > 0) {
                                    strokePosition.substract(0.5, 0.5);
                                }
                            }

                            this.object.draw(layer.ctx, fillPosition, strokePosition);
                        });

                        requestAnimationFrame(_refresh);

                    }, 1000 / _fps);
                },

                _drawElement = function (element, layer) {
                    var sprite = element.sprite(),
                        spritePosition = null,
                        spriteImage = null,
                        spriteX = 0,
                        spriteY = 0,
                        width = 0,
                        height = 0,
                        filter = null;

                    if (sprite) {
                        spritePosition = new JSGlib.Point(0, 0);
                        spriteImage = sprite.getImage();
                        width = element.width();
                        height = element.height();
                        filter = element.filter();

                        if (sprite.isTiles()) {
                            spritePosition.copy(sprite.getCurrentTilePosition());
                        }

                        spriteX = spritePosition.x();
                        spriteY = spritePosition.y();
                        
                        layer.ctx.globalAlpha = element.opacity() / 100;
                        layer.ctx.drawImage(spriteImage, spriteX, spriteY,
                                            width, element.height(),
                                            parseInt(element.x(), 10), parseInt(element.y(), 10),
                                            width, height);

                        if (filter) {
                            JSGlib.Drawing.CANVAS_FILTER.width = width;
                            JSGlib.Drawing.CANVAS_FILTER.height = height;
                            JSGlib.Drawing.CTX_FILTER.drawImage(spriteImage, spriteX, spriteY,
                                                width, height, 0, 0, width, height);

                            filter.draw(layer.ctx, element.position());
                        }

                        layer.ctx.globalAlpha = 1;
                    }
                },
                 
                _clearDisplay = function (all, drawingCallback) {
                    var view = _currentRoom ? _currentRoom.view() : null,
                        viewPosition = null,
                        displayView = function () { };

                    if (view !== null) {
                        viewPosition = view.position();
                        displayView = function () {
                            this.canvas.style.left = '-' + viewPosition.x() * this.hspeed + 'px';
                            this.canvas.style.top = '-' + viewPosition.y() * this.vspeed + 'px';
                        };
                    }

                    JSGlib.forEach(_layers, function () {
                        displayView.call(this);
                        if (all || this.needRefresh) {
                            
							this.canvas.width = _container.getAttribute('data-jsglib-room-width');
                            this.canvas.height = _container.getAttribute('data-jsglib-room-height');
                            this.needRefresh = false;
                            
                            if (drawingCallback) {
                                drawingCallback.call(this);
                            }
                        } 
                                    
                        //Animate and draw tiles

                        var layer = this;
                        if (this.animatedTiles.length > 0) {
                            JSGlib.forEach(this.animatedTiles, function () {
                                var t = this.sprite.animate(),
                                    x = 0,
                                    y = 0;

                                if (t !== null) {
                                    x = this.position.x();
                                    y = this.position.y();

                                    layer.tiles[x][y] = this.sprite.getCurrentTileNumber();
                                    layer.drawTile(x, y);
                                }
                            });
                        }
                    });
                },

				_deletePermanentlyElements = function () {
					JSGlib.forEach(_instancesToDestroy, function () {
						var cmpFunction = function (a, b) {
							return a.equals(b);
						},
							layer = _getLayer(this.getLayer());

						JSGlib.removeFromArray(this, layer.elements, cmpFunction);
						JSGlib.removeFromArray(this, _allElements, cmpFunction);
						JSGlib.removeFromArray(this, _activeElements, cmpFunction);
						_activeElementsIndex[this.getId()] = null;

						layer.needRefresh = true;
					});

					//Reset array containing elements to destroys
					_instancesToDestroy.length = 0;
				},
        
                _prepareRoomDisplaying = function () {
                    var roomWidth = _currentRoom.getWidth(),
                        roomHeight = _currentRoom.getHeight(),
                        view = _currentRoom.view(),
                        viewWidth = view ? view.width() : roomWidth,
                        viewHeight = view ? view.height() : roomHeight;

                    _container.setAttribute('data-jsglib-room-width', roomWidth);
                    _container.setAttribute('data-jsglib-room-height', roomHeight);
                    _container.style.width = viewWidth + 'px';
                    _container.style.height = viewHeight + 'px';

                    _clearDisplay(true, _initLayerDisplay);
                },
                
                _trigger = function (element, methodName, arg) {
                    if (element[methodName]) {
                        if (!(arg instanceof Array)) {
                            arg = [arg];
                        }
                        return element[methodName].apply(element, arg);
                    }
                },

                _triggerAll = function (eventName, arg) {
                    var result = true;

                    JSGlib.forEach(_activeElements, function () {
                        if (_trigger(this, eventName, arg) === false) {
                            result = false;
                        }
                    });

                    if (result === false) {
                        return false;
                    }
                },

                _step = function () {
                    //Reset array containing objects to draw
                    _drawingObjects.length = 0;
                    _currentStep++;
                    _moveView();

                    _trigger(_thisGame, 'eventStartStep', [_currentStep]);

                    JSGlib.forEach(_allElements, function () {
                        if (_thisGame.isElementActive(this)) {
                            _manageElement(this);
                        }
                    });

                    _trigger(_thisGame, 'eventEndStep', [_currentStep]);

                    //Delete elements to destroy
                    _deletePermanentlyElements();
                    
                    //Reset object containing elements which has been collided
                    _checkCollidedElementsIndexes = {};
                    
                    setTimeout(_step, 1000 / _fps);
                },
                
                _manageElement = function (element) {
                    var layerName = element.getLayer(),
                        layer = _getLayer(layerName),
                        sprite = element.sprite(),
                        value = null,
						usedTiles = sprite ? sprite.usedTiles().toString() : '';
                    
                    element.prevPosition(element.position())
                            .spriteModified(false);

                    _trigger(element, 'eventStartStep', _currentStep);

                    if (sprite) {
                        value = sprite.animate();

                        if (value !== null) {
							if (value) {
								_trigger(element, 'eventAnimationEnd');
							}
                        }
                    }
					
                    _moveElement(element);
                   
                    _trigger(element, 'eventStep', _currentStep);

                    element.checkMoveToPointCallback();

                    JSGlib.forEach(element.getAlarms(), function (i) {
                        if (element.setAlarm(i.key, -1, true)) {
                            _trigger(element, 'eventAlarm' + i.key);
                        }
                    });

                    _trigger(element, 'eventEndStep', _currentStep);
					
					if (sprite ? (sprite.getCurrentMasks().length > 0 && sprite.usedTiles().toString() != usedTiles) : false) {
						element.spriteModified(true);
					}
					
                    _askLayerForRefresh(layer, function () {
                        return value !== null || element.spriteModified() || !element.prevPosition().equals(element.position());
                    });
                },
                
                _moveElement = function (element) {
                    var hspeed = element.hspeed(),
                        vspeed = element.vspeed() + element.gravity(),
                        prevX = parseInt(element.prevPosition().x(), 10),
                        prevY = parseInt(element.prevPosition().y(), 10),
                        wallTileCollisions = false,
                        solidElementCollisions = false,
                        triggeredEvents = [],
                        spriteModified = element.spriteModified(),
						sprite = element.sprite(),
						hasMasks = (element.maskColorForSolidCollisions() ? true : false) && (sprite ? sprite.getCurrentMasks().length > 0 : false),
						checkRefinement = false,
						hasMoved;

                    if (spriteModified || hspeed !== 0 || vspeed !== 0) {
                        element.vspeed(vspeed);
                        element.x(element.x() + hspeed);
                        element.y(element.y() + vspeed);

                        hasMoved = !element.prevPosition().equals(element.position());
						
                        //Check collision if it's moved or if its sprite has been modified
                        if (element.checkCollisions() && (spriteModified || hasMoved)) {
							//First, check collision with tiles
							
							wallTileCollisions = _checkCollisionsWithTiles(element, triggeredEvents);
							//Then check collision with elements
							solidElementCollisions = _checkCollisionsWithElements(element, triggeredEvents);

							if ((wallTileCollisions || solidElementCollisions) && element.stopOnSolids()) {
                                
								//First, look collisions with its masks
								if (hasMasks) {
									JSGlib.forEach(triggeredEvents, function () {
										if (this.concernElement) {
											
											var mask = this.eventName == 'eventCollision' ? this.data[1].thisMasks : this.data[1];
											
											if (mask[element.maskColorForSolidCollisions().getHexadecimal()]) {
												checkRefinement = true;
												return JSGlib.KEYWORDS.BREAK;
											}
										}
									});
								} else {
									checkRefinement = true;
								}

								if (!checkRefinement) {
									return;
								}
								
								//We collide again a solid element or wall tile: go back to previous position
								element.position()
											.x(prevX).y(prevY);

                                //Try refinements
                                if (wallTileCollisions) {
									_moveRefinement(element, _checkCollisionsWithTiles);
                                }

                                if (solidElementCollisions) {
									_moveRefinement(element, _checkCollisionsWithElements);
                                }
                            }

                            //Movement is finished, let's trigger the collisions events for this element
                            JSGlib.forEach(triggeredEvents, function () {
                                _trigger(this.target, this.eventName, this.data);
                            });
                        }
                    }
							
					if (hasMoved || _viewHasMoved) {
						if (element.equals(_currentRoom.viewLinkedElement())) {
							_thisGame.checkElementsForActivation();
						} else {
							_checkElementForActivation(element);
						}
						
						if (_thisGame.isElementInsideView(element)) {
							_trigger(element, 'eventInsideView');
						} else {
							_trigger(element, 'eventOutsideView');
						}
					}
                },
                
                _moveView = function () {
                    var view = _currentRoom.view(),
                        viewLinkedElement,
						view_prev_position,
                        x,
                        y;
						
                    if (view === null) {
                        return false;
                    }
					
					view_prev_position = new JSGlib.Point(view.position());

                    viewLinkedElement = _currentRoom.viewLinkedElement();

                    if (viewLinkedElement === null) {
                        return false;
                    }
                    
                    x = viewLinkedElement.x() + viewLinkedElement.width() / 2 - view.width() / 2;
                    y = viewLinkedElement.y() + viewLinkedElement.height() / 2 - view.height() / 2;
                   
                    x = Math.max(x, 0);
                    y = Math.max(y, 0);

                    x = (x + view.width() > _currentRoom.getWidth()) ? (_currentRoom.getWidth() - view.width()) : x;
                    y = (y + view.height() > _currentRoom.getHeight()) ? (_currentRoom.getHeight() - view.height()) : y;
                    
                    view.position(x, y);
					
					_viewHasMoved = !view_prev_position.equals(view.position());

                    return true;
                },

                _moveRefinement = function (element, checkCollisionsFunction) {
                    var i = 0,
                        limit = 0,
                        hspeed = element.hspeed(),
                        vspeed = element.vspeed() + element.gravity(),
                        deltaX = hspeed > 0 ? 1 : -1,
                        deltaY = vspeed > 0 ? 1 : -1;

                    for (limit = Math.abs(hspeed) ; i < limit ; i++) {
						element.x(element.x() + deltaX);

                        if (checkCollisionsFunction(element, null, true)) {
                            //Collision with solid, stop refinement for X
							element.x(element.x() - deltaX);
                            break;
                        }
                    }

                    for (i = 0, limit = Math.abs(vspeed) ; i < limit ; i++) {
						element.y(element.y() + deltaY);

						if (checkCollisionsFunction(element, null, true)) {
                            //Collision with solid, stop refinement for Y
                            element.y(element.y() - deltaY);
                            break;
                        }
                    }
                },

                _checkCollisionsWithTiles = function (element, triggeredEvents, onlyCheckWalls) {
                    var collideAgainWall = false,
                        sprite = element.sprite(),
                        masks = sprite ? sprite.getCurrentMasks() : [],
                        elemTilePosition = sprite ? sprite.getCurrentTilePosition() : new JSGlib.Point(),
						elemTileX = elemTilePosition.x(),
						elemTileY = elemTilePosition.y(),
						hasMask = masks.length > 0,
						allCollisions = {},
						rectangle = element.getRectangleRepresentation(),
						elemX = rectangle.x(),
						elemY = rectangle.y(),
						globalCollision = _thisGame.isRectangleCollidedWithTiles(rectangle);
                        //slopeFunction = false;

					if (!globalCollision) {
						return false;
					}

					JSGlib.forEach(globalCollision, function (k) {
						var tileIsWall = this.type == jsglib_types_tiles.WALL,
							tileRectangle,
							thisTile,
							performThisTile = function () {
								if (tileIsWall) {
									collideAgainWall = true;
									return JSGlib.KEYWORDS[onlyCheckWalls ? 'BREAK' : 'CONTINUE'];
								}
								return JSGlib.KEYWORDS.CONTINUE;
								//TODO: maybe we'll apply slopes here.
								/* {								
										The code below is an old try in from an beta version of JSGlib, it doesn't work!					
										slopeFunction = _thisGame.isTileSlope(this.tileName, this.tiles[y][x]);

										if (slopeFunction) {
											element.y(element.y() - slopeFunction(Math.max(0, element.x() + width / 2 - x * _tilesSize)));
											console.log('Slope found.');
											break mainLoop;
										}
								}*/
							};

						if (!hasMask) {
							//Element has no masks: simply "send" found tiles
							if (!onlyCheckWalls) {
								allCollisions[k.key] = {
									tile: this,
									masks: {}
								};
							}

							if (performThisTile() == JSGlib.KEYWORDS.BREAK) {
								return JSGlib.KEYWORDS.BREAK;
							}
						} else {
							//Element has masks: we have to check them
							tileRectangle = new JSGlib.Rectangle(this.position, _tilesSize, _tilesSize);
							thisTile = this;

							JSGlib.forEach(masks, function () {
								var maskRectangle = new JSGlib.Rectangle(this.rectangle),
                                    nameTile;

								maskRectangle.position()
                                                .substract(elemTileX, elemTileY)
                                                .add(elemX, elemY);

                                if (maskRectangle.isCollidedWithRectangle(tileRectangle, true)) {

									if (performThisTile() == JSGlib.KEYWORDS.BREAK) {
										return JSGlib.KEYWORDS.BREAK;
									}

									if (!onlyCheckWalls) {

										nameTile = thisTile.layer + '_' + thisTile.position.x() + '_' + thisTile.position.y();

										if (!allCollisions[nameTile]) {
											allCollisions[nameTile] = {
												tile: thisTile,
												masks: {}
											};
										}

										allCollisions[nameTile].masks[this.color] = true;
									}
								}
							});
						}
					});

					if (!onlyCheckWalls) {
						//Trigger the events
						JSGlib.forEach(allCollisions, function () {
							triggeredEvents.push({
								target: element,
								concernElement: true,
								eventName: 'eventTileCollision',
								data: [this.tile, this.masks]
							});
						});
					}
					
					return collideAgainWall;
                },

                _checkCollisionsWithElements = function (element, triggeredEvents, onlyCheckWalls) {
					var collideAgainWall = false,
						sprite = element.sprite(),
						masks = sprite ? sprite.getCurrentMasks() : [],
						elementId = element.getId(),
						hasMask = masks.length > 0,

						registerEvents = function (otherElement, collisionsObject) {
							triggeredEvents.push({
								target: otherElement,
								eventName: 'eventCollision',
								data: [element, {
									thisMasks: collisionsObject.otherMasks,
									otherMasks: collisionsObject.thisMasks,
									thisHasMasksCollided: collisionsObject.otherHasMasksCollided,
									otherHasMasksCollided: collisionsObject.thisHasMasksCollided
								}]
							});

							triggeredEvents.push({
								target: element,
								concernElement: true,
								eventName: 'eventCollision',
								data: [otherElement, collisionsObject]
							});
						};

					if (!_checkCollidedElementsIndexes[elementId]) {
						_checkCollidedElementsIndexes[elementId] = {};
					}

					JSGlib.forEach(_activeElements, function () {
						var otherElement = this,
							otherId = otherElement.getId(),
							globalCollision,
							otherIsSolid,
							otherSprite,
							otherMasks,
							otherHasMasks;

						if (elementId != otherId && otherElement.checkCollisions() && (!_checkCollidedElementsIndexes[elementId][otherId] || onlyCheckWalls)) {
							//Register that collision between both elements has been done
							_checkCollidedElementsIndexes[elementId][otherId] = true;

							if (!_checkCollidedElementsIndexes[otherId]) {
								_checkCollidedElementsIndexes[otherId] = {};
							}

							_checkCollidedElementsIndexes[otherId][elementId] = true;

							globalCollision = element.isCollidedWithElement(otherElement);

							if (!globalCollision) {
								return JSGlib.KEYWORDS.CONTINUE;
							}
							
							otherSprite = otherElement.sprite();
							otherMasks = otherSprite ? otherSprite.getCurrentMasks() : [];
							otherHasMasks = otherMasks.length > 0;
							otherIsSolid = otherElement.solid();

							if (
								(
									!hasMask && !otherHasMasks
								) ||
								(
									hasMask && otherHasMasks && globalCollision.thisHasMasksCollided &&
									globalCollision.otherHasMasksCollided
								) ||
								(
									hasMask && globalCollision.thisHasMasksCollided
								) ||
								(
									otherHasMasks && globalCollision.otherHasMasksCollided
								)
							) {
								if (!onlyCheckWalls) {
									registerEvents(otherElement, globalCollision);
								}
								
								if (otherIsSolid) {
									collideAgainWall = true;
									if (onlyCheckWalls) {
										return JSGlib.KEYWORDS.BREAK;
									}
								}
							}
						}
					});

					return collideAgainWall;
				},
				
				_checkElementForActivation = function (element) {
					
					if (_thisGame.isElementInsideRoom(element)) {
						_trigger(element, 'eventMoveInsideRoom');
					} else {
						_trigger(element, 'eventMoveOutsideRoom');
					}
				
					if (!element.alwaysActive()) {
						var isActive = _thisGame.isElementActive(element),
							inView = _thisGame.isElementInsideView(element);

						if (!isActive && inView) {
							_thisGame.activateElement(element);
						} else if (isActive && !inView) {
							_thisGame.deactivateElement(element);
						}
					}
				},
                
                _getLayer = function (layerName) {
                    var layer = JSGlib.forEach(_layers, function () {
                        if (this.name == layerName) {
                            return this;
                        }
                    });

                    if (layer) {
                        return layer;
                    }
                    
                    throw new ReferenceError('Layer naming "' + layerName + '" is not defined for this game.');
                },

                _askLayerForRefresh = function (layer, callback) {
                    callback = callback || function () {return true; };
                    if (layer.containsElements &&
                        !layer.needRefresh && callback()) {
                        layer.needRefresh = true;
                    }
                },
                
                _initLayerDisplay = function () {
                    if (!_currentRoom || !this.backgroundAlias) { return false; }
                    var layer = this,
                        backgroundImage = _thisGame.getImage(layer.backgroundAlias),
                        w = backgroundImage ? backgroundImage.width : 0,
                        h = backgroundImage ? backgroundImage.height : 0,
                        posX = layer.backgroundPosition.x(),
                        posY = layer.backgroundPosition.y(),
                        x = 0,
                        y = 0;

                    if (!backgroundImage) {
                        return false;
                    }
                   
                    layer.canvas.width = _container.getAttribute('data-jsglib-room-width') * Math.max(1, layer.hspeed);
                    layer.canvas.height = _container.getAttribute('data-jsglib-room-height') * Math.max(1, layer.vspeed);

                    //Don't use CanvasPattern because of some bugs with position :/
                    if (layer.backgroundRepeat == JSGlib.BACKGROUND.NO_REPEAT) {
                        layer.ctx.drawImage(backgroundImage, 0, 0, w, h, posX, posY, w, h);
                    } else if (layer.backgroundRepeat == JSGlib.BACKGROUND.REPEAT_X) {
                        for (; x < layer.canvas.width; x += w) {
                            layer.ctx.drawImage(backgroundImage, 0, 0, w, h, x, posY, w, h);
                        }
                    } else if (layer.backgroundRepeat == JSGlib.BACKGROUND.REPEAT_Y) {
                        for (; y < layer.canvas.height; y += h) {
                            layer.ctx.drawImage(backgroundImage, 0, 0, w, h, posX, y, w, h);
                        }
                    } else {
                        for (x = 0 ; x < layer.canvas.width; x += w) {
                            for (y = 0; y < layer.canvas.height; y += h) {
                                layer.ctx.drawImage(backgroundImage, 0, 0, w, h, x, y, w, h);
                            }
                        }
                    }
                };

            /*==  Public methods  ==*/

            this.addClass = function (definition) {
                /// <summary>Add a class to this game.</summary>
                /// <param name="definition" type="Object">Definition of the new class.<br />
                /// {<br />
                ///  'name': 'Name of the class (required)',<br />
                ///  'parent': 'Name (or list of names) of class(es) to inherit from',<br />
                ///  'abstract': Indicates if this class is abstract or not (default: false),<br />
                ///  'eventX': function () {<br />
                ///    //Event-method to call when event X is performed.
				///  }<br />
				///  'static': {<br />
				///    List of static methods
				///  }
				/// }</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
               
				if (!definition.name) {
                    throw new ReferenceError('Class definition must have a name.');
                }
                if (_classes[definition.name]) {
                    throw new Error('Class "' + definition.name + '" is already defined for this game.');
                }

                //The new class
                var newClass = null,
                //Store new class name
                    className = definition.name,
                //Store the prototype of new class
                    classProto = {},
                //This array will store all types
                    types = ['Element'],
                //And a usefull method to make inheritance
                    mergePrototype = function (proto, isStatic) {
                        JSGlib.forEach(proto, function (i) {
							if (isStatic) {
								newClass[i.key] = this;
							} else {
								classProto[i.key] = this;
							}
                        });
                    };

                //Get all parents of new class
                definition.parent = (definition.parent === undefined) ? [] : definition.parent;
                if (typeof definition.parent == 'string') {
                    definition.parent = [definition.parent];
                }

                newClass = function (position, layer) {
                    JSGlib.Element.call(this, position.x(), position.y(), layer, _thisGame);
                };
			
                JSGlib.forEach(definition.parent, function () {
					if (!_classes[this]) {
						throw new Error('Game.addClass() -> Parent "' + this + '" for class "' + className + '" is not defined in this game.');
					}
					
					types = types.concat(_classes[this]._types);
					
					mergePrototype(_classes[this].prototype);
                });
				
				types = types.concat(definition.parent);
				types.push(className);
				
				types = JSGlib.uniqueArray(types);
				
				Object.defineProperty(classProto, '_types', {
                    get: function () {
                        return types;
                    }
                });
				
				Object.defineProperty(newClass, '_types', {
                    get: function () {
                        return types;
                    }
                });

				newClass['abstract'] = definition['abstract'] || false;

				//Static methods
				if (definition['static']) {
					mergePrototype(definition['static'], true);
					delete definition['static'];
				}

                //And we add our own properties!
                delete definition.parent;
                delete definition['abstract'];
                delete definition.name;
				
				mergePrototype(JSGlib.Element.prototype);
				mergePrototype(definition);

				newClass.prototype = classProto;

                //Store the new class
                _classes[className] = newClass;

                return this;
            };

            this.callParent = function (instance, methodName, args, parentToCall) {
                /// <signature>
                /// <summary>Call the given method from given parent class on the given instance.</summary>
                /// <param name="instance" type="JSGlib.Element">The instance affected by the call.</param>
                /// <param name="methodName" type="String">The name of the method to call.</param>
                /// <param name="args" type="Mixed/Array" optional="true">Arguments to send to the called method.<br />
                /// If you want to send several arguments, wrap them into an array.<br />
                /// If you want to send only one array, you also have to wrap it into another array.</param>
                /// <param name="parentToCall" type="String" optional="true">Name of the parent class having the method to use. If not specified, JSGlib will try to guess by itself.</param>
                /// <returns type="Mixed">The return value of the called method.</returns>
                /// </signature>

                if (parentToCall) {
                    if (!instance.instanceOf(parentToCall)) {
                        throw new TypeError('Game.callParent() -> instance of types "[' + instance._types + ']" is not an instance of "' + parentToCall + '".');
                    }
                } else {
                    parentToCall = instance._types[instance._types.length - 2];
                }

                if (_classes[parentToCall].prototype[methodName]) {
                    args = args === undefined ? [] : args;

                    if (!(args instanceof Array)) {
                        args = [args];
                    }

                    return _classes[parentToCall].prototype[methodName].apply(instance, args);
                } else {
                    throw new ReferenceError('Game.callParent() -> class "' + parentToCall + '" has no methods named "' + methodName + '".');
                }
            };

			this.callStatic = function (className, methodName, args) {
				/// <signature>
				/// <summary>Call the given static method of given class.</summary>
				/// <param name="className" type="String">Name of the class owning the method to call.</param>
				/// <param name="methodName" type="String">TName of the method to call.</param>
				/// <param name="args" type="Mixed/Array" optional="true">Arguments to send to the called method.<br />
				/// If you want to send several arguments, wrap them into an array.<br />
				/// If you want to send only one array, you also have to wrap it into another array.</param>
				/// <returns type="Mixed">The return value of the called method.</returns>
				/// </signature>

				if (_classes[className][methodName]) {
					args = args === undefined ? [] : args;

					if (!(args instanceof Array)) {
						args = [args];
					}

					return _classes[className][methodName].apply(null, args);
				} else {
					throw new ReferenceError('Game.callStatic() -> class "' + className + '" has no methods named "' + methodName + '".');
				}
			};

			this.checkElementsForActivation = function (reInitView) {
				/// <signature>
				/// <summary>Check all elements in order to activate or deactivate them.<br />This method is used internally by JSGlib, you shouldn't use it.</summary>
				/// <param name="reInitView" type="Bool">If true, view position will be recalculated. Default: false.</param>
				/// <returns type="JSGlib.Game">The calling Game object.</returns>
				/// </signature>
				if (reInitView) {
					_moveView();
				}

				JSGlib.forEach(_allElements, function () {
					_checkElementForActivation(this);
				});

				return this;
			};

            this.orderElementsOnLayer = function (layerName) {
                /// <signature>
                /// <summary>Order elements on layer with given name according to their zIndex.</summary>
                /// <param name="layerName" type="String">Name of the layer to request.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
				/// </signature>

				_getLayer(layerName).elements.sort(function (a, b) {
					return a.zIndex() - b.zIndex();
                });
                
                return this;
            };

            this.updateMaxZIndex = function (zIndex) {
                /// <signature>
                /// <summary>Update the maximum zIndex value if given value is greater than it.</summary>
                /// <param name="zIndex" type="Number">Number to check.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                /// </signature>

                if (zIndex > _max_zIndex) {
                    _max_zIndex = zIndex;
                }

                return this;
            };

            this.putElementToFirstPlan = function (instance) {
                /// <signature>
                /// <summary>Put the element on the first plan of its layer.</summary>
                /// <param name="instance" type="JSGlib.Element">The instance to change.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
				/// </signature>

                if (instance.zIndex() < _max_zIndex) {
					instance.zIndex(++_max_zIndex);
                }
                return this;               
            };
			
			this.emitEvent = function (eventName, args) {
                /// <signature>
                /// <summary>Simulate given event in order to call corresponding event-methods for each active elements.</summary>
                /// <param name="eventName" type="String">Name of the event to emit.</param>
                 /// <param name="args" type="Mixed/Array" optional="true">Arguments to send to the event method.<br />
                /// If you want to send several arguments, wrap them into an array.<br />
                /// If you want to send only one array, you also have to wrap it into another array.</param>
				/// <returns type="JSGlib.Game">The calling Game object.</returns>
                /// </signature>

                _triggerAll(eventName, args);
				
                return this;               
            };

            this.instanceCreate = function (x, y, className, layerName) {
                /// <signature>
                /// <summary>Create a new instance.</summary>
                /// <param name="x" type="Number">Abscissa.</param>
                /// <param name="y" type="Number">Ordinate.</param>
                /// <param name="className" type="String">Class name of the new element.</param>
                /// <param name="layerName" type="String" optional="true">Layer to put the element. (default: "main")</param>
                /// <returns type="JSGlib.Element">The created element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Create a new instance.</summary>
                /// <param name="point" type="JSGlib.Point">Coordinates of the instance.</param>
                /// <param name="className" type="String">Class name of the new element.</param>
                /// <param name="layerName" type="String" optional="true">Layer to put the element. (default: "main")</param>
                /// <returns type="JSGlib.Element">The created element.</returns>
                /// </signature>

                var position = null,
                    instance = null,
                    layer = null,
                    tempZIndex = 0;

                if (x instanceof JSGlib.Point) { //First signature
                    position = x;
                    layer = className;
                    className = y;
                } else { //Second signature
                    position = new JSGlib.Point(x, y);
                }

                if (!_classes[className]) {
                    throw new ReferenceError('Game.instanceCreate() -> Class "' + className + '" is not defined in this game.');
                }

                if (_classes[className]['abstract']) {
                    throw new Error('Game.instanceCreate() -> Class "' + className + '" is abstract and can\'t be instancied.');
                }

                layerName = layerName || 'main';
                layer = _getLayer(layerName);

                if (!layer.containsElements) {
                    throw new Error('Layer "' + layerName + '" is set to forbid elements inside it. Consider using tiles instead.');
                }

                instance = new _classes[className](position, layerName);

                _allElements.push(instance);
                _activeElements.push(instance);
                _activeElementsIndex[instance.getId()] = true;

                layer.elements.push(instance);
                layer.needRefresh = true;

                tempZIndex = instance.zIndex();

                if (tempZIndex > _max_zIndex) {
                    _max_zIndex = tempZIndex;
                }

                _trigger(instance, 'eventCreate');

                return instance;
            };

            this.instanceDestroy = function (element, dontTriggerEvent) {
                /// <summary>Destroy an instance.</summary>
                /// <param name="element" type="JSGlib.Element">Instance to destroy.</param>
                /// <param name="dontTriggerEvent" type="Bool" optional="true">If true, "eventDestroy" won't be triggered. Default: false.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>

                if (!dontTriggerEvent) {
                    _trigger(element, 'eventDestroy');
                }
                _instancesToDestroy.push(element);

                return this;
            };

            this.isElementInsideView = function (element) {
                /// <summary>Check if given element is inside view.</summary>
                /// <param name="element" type="JSGlib.Element">Element to check.</param>
                /// <returns type="Bool">true if given element is inside view. false otherwise.</returns>
                var view = _currentRoom.view();
                if (!view) {
                    return true;
                }

                return element.getRectangleRepresentation().isCollidedWithRectangle(view);
            };
			
			this.isElementInsideRoom = function (element) {
                /// <summary>Check if given element is inside current room.</summary>
                /// <param name="element" type="JSGlib.Element">Element to check.</param>
                /// <returns type="Bool">true if given element is inside current room. false otherwise.</returns>

                return element.getRectangleRepresentation().isCollidedWithRectangle(new JSGlib.Rectangle(0, 0, _currentRoom.getWidth(), _currentRoom.getHeight()));
            };
            
            this.isElementActive = function (element) {
                /// <summary>Check if given element is active.</summary>
                /// <param name="element" type="JSGlib.Element">Element to check.</param>
                /// <returns type="Bool">true if given element is active. false otherwise.</returns>
                return _activeElementsIndex[element.getId()];
            };

            this.activateElement = function (element) {
                /// <summary>Activate an element.</summary>
                /// <param name="element" type="JSGlib.Element">Instance to activate.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>

                if (!this.isElementActive(element)) {
                    _activeElements.push(element);
                    _activeElementsIndex[element.getId()] = true;
                }

                return this;
            };

            this.deactivateElement = function (element) {
                /// <summary>Deactivate an element.</summary>
                /// <param name="element" type="JSGlib.Element">Instance to deactivate.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>

                if (this.isElementActive(element)) {
                    var cmpFunction = function (a, b) {
                            return a.equals(b);
                        };

                    JSGlib.removeFromArray(element, _activeElements, cmpFunction);
                    _activeElementsIndex[element.getId()] = false;
                }

                return this;
            };

            this.getTilesSize = function () {
                /// <summary>Get the tiles size of this game.</summary>
                /// <returns type="Number">The tiles size.</returns>

                return _tilesSize;
            };

            this.load = function (listRessources, displayProgressBar, callback) {
                /// <summary>Load given images, sounds and/or rooms.</summary>
                /// <param name="listRessources" type="Object">List of ressources.<br />
                /// {<br />
                ///  'images': {'imageAlias': 'url_to_image'},<br />
                ///  'sounds': {'soundAlias': ['url_to_sound', 'url2_to_sound']},<br />
                ///  'tiles': ['url_to_tiles_definition'],<br />
                ///  'rooms': ['url_to_file_definition']<br />
                /// }<br />
                /// 'images' is an Object containing the list of images to load.<br />
                /// 'sounds' is an Object containing the list of sounds to load : each sound must be an array
                /// containing a list of URL to the same sound with different mime types (MP3, OGG etc.)<br />
                /// 'tiles' is an Array of String representing URL to tiles definition (JSON files)<br />
                /// 'rooms' is an Array of String representing URL to rooms definition (JSON files)</param>
                /// <param name="displayProgressBar" optional="true" default="true" type="Bool">Indicates if the progress bar must be displayed or not. (default: true)</param>
                /// <param name="callback" optional="true" type="Function">Function to call when all objects are loaded.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>

                //Prepare paramaters
                displayProgressBar = displayProgressBar === undefined ? true : displayProgressBar;
                listRessources = listRessources || {};
                listRessources.images = listRessources.images || {};
                listRessources.sounds = listRessources.sounds || {};
                listRessources.tiles = listRessources.tiles || [];
                listRessources.rooms = listRessources.rooms || [];

                var total = listRessources.tiles.length + listRessources.rooms.length,
                    numLoaded = 0,
                    progressBar = function () {
                        var percent = parseInt((numLoaded * 100 / total), 10),
                            ctx = _getLayer('main').ctx,
                            width = 500,
                            height = 30;

                        _container.setAttribute('data-jsglib-room-width', width);
                        _container.setAttribute('data-jsglib-room-height', height);
                        _container.style.width = width + 'px';
                        _container.style.height = height + 'px';

                        _clearDisplay(true);

                        ctx.fillStyle = '#ff0000';
                        ctx.rect(0, 0, (500 * percent) / 100, 30);
                        ctx.fill();
                        ctx.fillStyle = '#000';
                        ctx.font = 'bold 20px Calibri';
                        ctx.fillText(percent + '%', 250, 20);
                    },
                    checkCallback = function () {
                        if (displayProgressBar) {
                            progressBar();
                        }
                        if (callback && numLoaded == total) {
							setTimeout(function () { callback.call(_thisGame); }, 500);
                        }
                    };

                JSGlib.forEach(listRessources.images, function () {total++; });
                JSGlib.forEach(listRessources.sounds, function () {total++; });

                if (total > 0) {
                    if (displayProgressBar) {
                        //Prepare canvas for progress bar
                        progressBar(0, total);
                    }

                    //Load images
                    JSGlib.forEach(listRessources.images, function (values) {
                        var image = new Image();
                        image.src = this;
                        _images[values.key] = image;
                        image.onload = function () {
                            numLoaded++;
                            checkCallback();
                        };
                    });

                    //Load sounds
                    JSGlib.forEach(listRessources.sounds, function (values) {
                        var sound = this,
                            audio = document.createElement('audio');
                        audio.preload = 'auto';

                        _container.appendChild(audio);

                        JSGlib.forEach(sound, function () {
                            var mime = document.createElement('source'),
                                ext = this.substring(this.lastIndexOf('.') + 1),
                                type = '';

                            switch (ext) {
                            case 'mp3':
                                type = 'audio/mpeg';
                                break;
                            case 'wav':
                                type = 'audio/wav';
                                break;
                            case 'ogg':
                                type = 'audio/ogg';
                                break;
                            }

                            if (audio.canPlayType(type).length > 0) {
                                mime.src = this;
                                audio.appendChild(mime);
                            }
                        });

                        _sounds[values.key] = {
                            elem: audio,
                            volume: 1,
                            onEnd: null,
                            loop: true
                        };

                        numLoaded++;
                        checkCallback();
                    });

                    //Load tiles
                    JSGlib.forEach(listRessources.tiles, function () {
                        JSGlib.ajax({
                            url: this,
                            async: false,
                            dataType: 'JSON',
                            onError: function () {
                                throw new Error('An Ajax error occurs while loading tiles "' + this + '".');
                            },
                            onSuccess: function (json) {
                                JSGlib.forEach(json, function (i) {
                                    var imgHTML = _thisGame.getImage(this.image),
                                        sprite = new JSGlib.Sprite(imgHTML),
                                        tileDef = this,
                                        slopeFunction = function (a, b) {
                                            return function (x) {
                                                return a * x + b;
                                            };
                                        },
                                        initTile = function () {
                                            sprite.makeTiles(_tilesSize, _tilesSize, tileDef.separation);

                                            //Define slope function
                                            JSGlib.forEach(tileDef.slopes, function (j) {
                                                tileDef.slopes[j.key]['function'] = slopeFunction(this['function'][0], this['function'][1]);
                                            });


                                            _tiles[i.key] = {
                                                sprite: sprite,
                                                animations: tileDef.animations,
                                                slopes: tileDef.slopes,
                                                separation: tileDef.separation,
                                                types: {}
                                            };

                                            //For each defined types of given sheet of tiles
                                            JSGlib.forEach(tileDef.types, function (j) {
                                                var typeName = j.key;
                                                    
                                                //Create type if not exists
                                                if (!jsglib_types_tiles[typeName]) {
                                                    jsglib_types_tiles[typeName] = ++jsglib_total_types_tiles;
                                                }

                                                //For each tiles of this type
                                                JSGlib.forEach(this, function () {
                                                    _tiles[i.key].types[this] = jsglib_types_tiles[typeName];
                                                });
                                            });

                                            numLoaded++;
                                            checkCallback();
                                        };
                                    
                                    if (imgHTML.complete) {
                                        initTile();
                                    } else {
                                        imgHTML.addEventListener('load', initTile);
                                    }
                                });
                            }
                        });
                    });

                    //Load rooms
                    JSGlib.forEach(listRessources.rooms, function () {
                        JSGlib.ajax({
                            url: this,
                            async: false,
                            dataType: 'JSON',
                            onError: function () {
                                throw new Error('An Ajax error occurs while loading level "' + this + '".');
                            },
                            onSuccess: function (json) {
                                //We apply the definition of the gotten level
                                var room = new JSGlib.Room(json.name, json.width, json.height);

                                if (json.view_w > 0 && json.view_h > 0) {
                                    room.view(json.view_x, json.view_y, json.view_w, json.view_h);
                                }

                                _thisGame.addRooms(room);
                               
                                _roomsDefinitions[json.name] = {
                                    elements: json.elements,
                                    tiles: json.tiles
                                };

                                numLoaded++;
                                checkCallback();
                            }
                        });
                    });

                } else if (callback) {
                    callback.call(_thisGame);
                }

                return this;
            };

            this.getImage = function (imageAlias) {
                /// <summary>Get the HTML object representing the image having the given alias.</summary>
                /// <param name="imageAlias" type="String">Alias of the image to get.</param>
                /// <returns type="HTMLImageElement">The retreived image.</returns>
                return _images[imageAlias] || null;
            };

            this.soundIsPlaying = function (soundAlias) {
                /// <summary>Check if sound with given alias is playing or not. If not alias are given, check if at least one sound is playing.</summary>
                /// <param name="soundAlias" type="String" optional="true">Alias of the sound to check.</param>
                /// <returns type="Bool">true if sound is playing. false otherwise.<br />If no parameters are given, true if at least one sound is playing, false otherwise.</returns>

                if (soundAlias) {
                    return JSGlib.forEach(_soundsPlaying, function () {
                        if (this == soundAlias) {
                            return true;
                        }
                    }) || false;
                }
                return _soundsPlaying.length > 0;
            };

            this.playSound = function (soundAlias, loop, onEnd) {
                /// <summary>Play the sound having the given alias.</summary>
                /// <param name="soundAlias" type="String">Alias of the sound to play.</param>
                /// <param name="loop" type="Bool" optional="true">Indicates if the sound must be play in loop or not. Default: false.</param>
                /// <param name="onEnd" type="Function" optional="true">Function to call when the sound is ended.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                    
                var sound = _sounds[soundAlias],
                    soundHTML = null;

                if (sound && sound.elem) {
                    soundHTML = sound.elem;

                    //Replay sound if it's already playing
                    if (this.soundIsPlaying(soundAlias)) {
						soundHTML.currentTime = 0;
                    } else {
                        _soundsPlaying.push(soundAlias);
                        _sounds[soundAlias].onEnd = onEnd;
                        _sounds[soundAlias].loop = loop;
                        JSGlib.removeFromArray(soundAlias, _soundsPaused);
                    }

                    if (_muteSounds) {
                        soundHTML.volume = 0;
                    }

                    soundHTML.play();

                    soundHTML.addEventListener('ended', function handler() {

                        soundHTML.removeEventListener('ended', handler, false);

                        JSGlib.removeFromArray(soundAlias, _soundsPlaying);

                        if (onEnd) {
                            onEnd.apply(_thisGame);
                        }

                        if (loop) {
                            soundHTML.currentTime = 0;
                            _thisGame.playSound(soundAlias, true, onEnd);
                        }
                    }, false);

                } else {
                    throw new ReferenceError('Game.playSound() -> Sound "' + soundAlias + '" is not defined in this game.');
                }
                    
                return this;
            };

            this.stopSound = function (soundAlias, justPause, runCallBack) {
                /// <summary>Stop the sound having the given alias if it's playing.</summary>
                /// <param name="soundAlias" type="String">Alias of the sound to stop.</param>
                /// <param name="justPause" type="Bool" optional="true">If true, sound will stop without re-init it. If false, sound will stop and go back to start. Default: false.</param>
                /// <param name="runCallBack" type="Bool" optional="true">Indicates if the "onEnd" callback linked to the sound must be call or not. Default: false.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>

                var sound = _sounds[soundAlias],
                    soundHTML = null;

                if (sound && sound.elem) {
                    soundHTML = sound.elem;
                           
                    if (this.soundIsPlaying(soundAlias)) {
                                
                        soundHTML.pause();

                        if (justPause) {
                            _soundsPaused.push(soundAlias);
                        } else {
                            soundHTML.currentTime = 0;
                        }

                        JSGlib.removeFromArray(soundAlias, _soundsPlaying);

                        if (runCallBack && soundHTML.onended) {
                            soundHTML.onended.apply(_thisGame);
                        }
                    }

                } else {
                    throw new ReferenceError('Game.stopSound() -> Sound "' + soundAlias + '" is not defined in this game.');
                }   

                return this;
            };

            this.stopAllSounds = function (justPause, runCallBack) {
                /// <summary>Stop all sounds currently playing.</summary>
                /// <param name="justPause" type="Bool" optional="true">If true, sounds will stop without re-init it. If false, sounds will stop and go back to start. Default: false.</param>
                /// <param name="runCallBack" type="Bool" optional="true">Indicates if the "onEnd" callback linked to the sounds must be call or not. Default: false.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                while (_soundsPlaying.length > 0) {
                    this.stopSound(_soundsPlaying[0], justPause, runCallBack);
                }
                    
                return this;
            };

            this.replayPausedSounds = function () {
                /// <summary>Replay all sounds which have been paused.</summary>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>

                while (_soundsPaused.length > 0) {
                    var alias = _soundsPaused[0];
                    this.playSound(alias, _sounds[alias].loop, _sounds[alias].onEnd);
                }

                return this;
            };

            this.setSoundVolume = function (soundAlias, value) {
                /// <summary>Set the volume of the sound having the given alias.</summary>
                /// <param name="soundAlias" type="String">Alias of the sound to stop.</param>
                /// <param name="value" type="Number">The new volume of the sound, between 0 and 100 inclusives.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>

                if (!_muteSounds) {
                    var sound = _sounds[soundAlias];

                    if (sound) {
                        sound.elem.volume = (Math.min(100, Math.max(0, value)) / 100).toFixed(1);
                    } else {
                        throw new ReferenceError('Game.setSoundVolume() -> Sound "' + soundAlias + '" is not defined in this game.');
                    }
                }

                return this;
            };

            this.muteSounds = function (mute) {
                /// <signature>
                /// <summary>Check is sounds are mute or not.</summary>
                /// <returns type="Bool">true if sounds are mute, false otherwise.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Mute or un-mute sounds.</summary>
                /// <param name="mute" type="Bool">The new status of muting.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                /// </signature>

                if (mute === undefined) {
                    return _muteSounds;
                }

                _muteSounds = !!mute;

                if (_muteSounds) {
                    JSGlib.forEach(_sounds, function () {
                        this.volume = this.elem.volume;
                        this.elem.volume = 0;
                    });
                } else {
                    JSGlib.forEach(_sounds, function () {
                        this.elem.volume = this.volume;
                    });
                }

                return this;
            };

            this.toggleMuteSounds = function () {
                /// <summary>Mute sounds if they're not mute, un-mute them if they are..</summary>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                this.muteSounds(!_muteSounds);
                return this;
            };

            this.defaultLang = function (lang) {
                /// <signature>
                /// <summary>Get the default lang of the game.</summary>
                /// <returns type="String">Default lang used by the game.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Define the default lang of the game</summary>
                /// <param name="lang" type="String">The new default lang.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                /// </signature>

                if (!lang) {
                    return _defaultLang;
                }

                _defaultLang = lang;

                return this;
            };

            this.defineTranslation = function (definition) {
                /// <summary>Define some translations for the game.</summary>
                /// <param name="definition" type="Object">Translations definitions. Example:<br />
                /// {<br />
                ///  alias: { <br />
                ///  'fr': 'Texte français pour "alias".',<br />
                ///  'en': 'English text for "alias".',<br />
                /// },<br />
                /// alias2: { <br />
                ///  'fr': 'Texte français pour "alias2".',<br />
                ///  'en': 'English text for "alias2".',<br />
                /// }}
                /// </param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>

                JSGlib.forEach(definition, function (i) {
                    if (!_translations[i.key]) {
                        _translations[i.key] = {};
                    }

                    JSGlib.forEach(this, function (j) {
                        _translations[i.key][j.key] = this;
                    });
                });

                return this;
            };

            this.getTranslation = function (strAlias,  vars, forceLang) {
                /// <summary>Get the translated text corresponding to the given alias.</summary>
                /// <param name="strAlias" type="String">Alias of the text to get.</param>
                /// <param name="vars" type="Object" optional="true">Object containing some variable to replace inside the text. Default: {}</param>
                /// <param name="forceLang" type="String" optional="true">If specified, use this lang instead of the player one.</param>
                /// <returns type="String">The translated text.</returns>

                if (_translations[strAlias]) {
                    var lang = forceLang || JSGlib.USER_LANG,
                        text = _translations[strAlias][lang];

                    if (!text) {
                        text = _translations[strAlias][_defaultLang];
                    }

                    if (text) {
                        if (vars) {
                            JSGlib.forEach(vars, function (i) {
                                text = text.replace(new RegExp('%' + i.key, 'g'), this);
                            });
                        }

                        return text;
                    }

                    return '[' + strAlias + '][' + lang + ']';
                }
                throw new ReferenceError('Game.getTranslation() -> Text "' + strAlias + '" is not defined in this game.');
            };

            this.isTileAnimated = function (sheetAlias, index) {
                /// <summary>Check if tile from given sheet with given index is animated or not.</summary>
                /// <param name="sheetAlias" type="String">Name of the sheet where the tile is.</param>
                /// <param name="index" type="Number">Index of the tile.</param>
                /// <returns type="Number/Bool">Index of corresponding animation if tile is part of one. false otherwise.</returns>
               
                var tilesDef = _tiles[sheetAlias],
                    indexAnimation = false;
                if (!tilesDef) {
                    throw new ReferenceError('Game.isTileAnimated(): there is no tiles with name "' + sheetAlias + '"');
                }

                indexAnimation = JSGlib.forEach(tilesDef.animations, function (i) {
                    if (JSGlib.forEach(this.tiles, function () {
                        if (index.valueOf() == this) {
                            return true;
                        }
                    })) {
                        return i.key;
                    }
                });

                return indexAnimation === undefined ? false : indexAnimation;
            };

            this.isTileSlope = function (sheetAlias, index) {
                /// <summary>Check if tile from given sheet with given index is a slope or not.</summary>
                /// <param name="sheetAlias" type="String">Name of the sheet where the tile is.</param>
                /// <param name="index" type="Number">Index of the tile.</param>
                /// <returns type="Function / Bool">The slope function if tile is a slope. false otherwise.</returns>

                var tilesDef = _tiles[sheetAlias],
                    slopeFunction = false;
                if (!tilesDef) {
                    throw new ReferenceError('Game.isTileSlope() -> there is no tiles with name "' + sheetAlias + '"');
                }

                JSGlib.forEach(tilesDef.slopes, function () { 
                    if (JSGlib.forEach(this.tiles, function () {
                        if (index.valueOf() == this) {
                            return true;
                        }
                    })) {
                        slopeFunction = this['function'];
                        return JSGlib.KEYWORDS.BREAK;
                    }
                });

                return slopeFunction;
            };

            this.createLayer = function (name, willContainElements) {
                /// <summary>Create a new layer in the game.</summary>
                /// <param name="name" type="String">Name of the layer.</param>
                /// <param name="willContainElements" type="Bool" optional="true">If true, indicates that layer will contain elements.<br />
                /// The refresh method for drawing the layer depends on its content.<br />
                /// Default value: false.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                if (!name) {
                    throw new ReferenceError('Game.createLayer() -> name of new layer undefined.');
                }

                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    zIndex = _totalLayers++;

                canvas.id = 'jsglib-layer-' + name;
                canvas.style.position = 'absolute';
                canvas.style.zIndex = zIndex;
                canvas.style.left = 0;
                canvas.style.top = 0;
                canvas.width = 0;
                canvas.height = 0;

                ctx.textBaseline = 'top';

                _container.appendChild(canvas);

                _layers.push({
                    name: name,
                    canvas: canvas,
                    ctx: ctx,
                    elements: [],
                    tileName: '',
                    tiles: [],
                    animatedTiles: [],
                    spriteTile: null,
                    needRefresh: true,
                    hspeed: 1,
                    vspeed: 1,
                    containsElements: willContainElements || false,
                    backgroundAlias: null,
                    backgroundRepeat: JSGlib.BACKGROUND.REPEAT,
                    backgroundPosition: new JSGlib.Point(),
                    drawTile: function (x, y) {
                        var index = this.tiles[x][y],
                            spritePosition = new JSGlib.Point(0, 0),
                            abs = y * _tilesSize,
                            ord = x * _tilesSize;

                        if (index > 0) {
                            this.spriteTile.usedTiles([index]);
                            spritePosition.copy(this.spriteTile.getCurrentTilePosition());

                            this.ctx.clearRect(abs, ord, _tilesSize, _tilesSize);
                            this.ctx.drawImage(this.spriteTile.getImage(), spritePosition.x(), spritePosition.y(),
                                    _tilesSize, _tilesSize, abs, ord, _tilesSize, _tilesSize);
                        }
                    }
                });

                return this;
            };

            this.getLayers = function () {
                /// <summary>Get the names of all layers.</summary>
                /// <returns type="Array[String]">A list containing the names of each layer.</returns>
                var names = [];
                JSGlib.forEach(_layers, function () {
                    names.push(this.name);
                });
                return names;
            };
			
			this.isRectangleCollidedWithTiles = function (rectangle) {
				/// <summary>Check if given rectangle is collided with tiles.</summary>
				/// <param name="rectangle" type="JSGlib.Rectangle">Rectangle to check.</param>
                /// <returns type="Bool / Array[Object]">false if rectangle is not collided with tiles.<br />
				/// Otherwise, an array of objects containing these properties: <br />
				/// {<br />
				///  number: number of the collided tile,
				///  position: position of the collided tile,
				///  type: type of the collided tile,
				///  layer: name of the layer of the collided tile
				/// }</returns>
                var tiles = [],
					trueX = rectangle.x(),
					trueY = rectangle.y(),
					width = rectangle.width(),
					height = rectangle.height(),
					x,
					y,
					xMin = Math.floor(trueX / _tilesSize),
					yMin = Math.floor(trueY / _tilesSize),
					xMax = Math.floor((trueX + width - 1) / _tilesSize),
					yMax = Math.floor((trueY + height - 1) / _tilesSize);
                				
				JSGlib.forEach(_layers, function () {
                    if (this.tiles.length > 0) {
						mainLoop:
						for (x = xMin; x <= xMax; x++) {
							for (y = yMin; y <= yMax; y++) {

								if (this.tiles[y] && this.tiles[y][x]) {
									
									var tileType = _tiles[this.tileName].types[this.tiles[y][x]],
										tileX,
										tileY;
									if (tileType) {
										
										tileX = x * _tilesSize;
										tileY = y * _tilesSize;
										
										tiles.push({
											number: this.tiles[y][x],
											type: tileType,
											layer: this.name,
											position: new JSGlib.Point(tileX, tileY)
										});
									}
								}
							}
						}
					}
				});
				
                return tiles.length > 0 ? tiles : false;
            };

            this.setLayerBackgroundPosition = function (layerName, x, y) {
                ///<signature>
                /// <summary>Define the init position of background for the given layer.</summary>
                /// <param name="layerName" type="String">Name of the layer to request.</param>
                /// <param name="x" type="Number">Abscissa.</param>
                /// <param name="y" optional="true" type="Number">Ordinate.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                ///</signature>
                ///<signature>
                /// <summary>Define the init position of background for the given layer.</summary>
                /// <param name="layerName" type="String">Name of the layer to request.</param>
                /// <param name="point" type="JSGlib.Point">Point representing the init position.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                ///</signature>
                var layer = _getLayer(layerName);
                if (x instanceof JSGlib.Point) {
                    layer.backgroundPosition.copy(x);
                } else {
                    layer.backgroundPosition.x(x).y(y);
                }
                _initLayerDisplay.call(layer, layerName);
                return this;
            };

            this.setLayerBackgroundRepeat = function (layerName, behavior) {
                /// <summary>Define the behavior of background-repeat for the given layer.</summary>
                /// <param name="layerName" type="String">Name of the layer to request.</param>
                /// <param name="behavior" type="Number">Constant from JSGlib.BACKGROUND object.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                var layer = _getLayer(layerName);
                layer.backgroundRepeat = behavior;
                _initLayerDisplay.call(layer, layerName);
                return this;
            };

            this.setLayerBackgroundAlias = function (layerName, backgroundAlias) {
                /// <summary>Define the background image for the given layer.</summary>
                /// <param name="layerName" type="String">Name of the layer to request.</param>
                /// <param name="backgroundAlias" type="String">Alias of image to use ad background.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                var layer = _getLayer(layerName);
                layer.backgroundAlias = backgroundAlias;
                _initLayerDisplay.call(layer, layerName);
                return this;
            };

            this.setLayerSpeed = function (layerName, hspeed, vspeed) {
                /// <summary>Define the speed of layer for parallax.</summary>
                /// <param name="layerName" type="String">Name of the layer to request.</param>
                /// <param name="hspeed" type="Number">Horizontal speed.</param>
                /// <param name="vspeed" type="Number" optional="true">Vertical speed.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                var layer = _getLayer(layerName);
                layer.hspeed = parseFloat(hspeed || 0, 10);
                layer.vspeed = parseFloat(vspeed || 0, 10);
                return this;
            };

            this.orderLayers = function (layers) {
                /// <summary>Reorder the layers of the game.</summary>
                /// <param name="layers" type="Array[String]">List of layers name to re-order.<br />A layer in a large index will be more foreground.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                JSGlib.forEach(layers, function (i) {
                    _getLayer(this).canvas.style.zIndex = i.key;
                });

                return this;
            };

            this.getScreen = function () {
                /// <summary>Get the data URL, base64 encoded, containing the image data of the game, usefull to create screenshot.</summary>
                /// <returns type="String">Data URL of the game, base64 encoded.</returns>
                var sortFunction = function (a, b) { return (a.canvas.style.zIndex - b.canvas.style.zIndex); },
                    tempCanvas = document.createElement('canvas'),
                    tempCtx = tempCanvas.getContext('2d'),
                    view = _currentRoom.view(),
                    viewPosition = view ? view.position() : new JSGlib.Point(),
                    viewWidth = view ? view.width() : _currentRoom.getWidth(),
                    viewHeight = view ? view.height() : _currentRoom.getHeight();

                tempCanvas.width = viewWidth;
                tempCanvas.height = viewHeight;

                _layers.sort(sortFunction);

                JSGlib.forEach(_layers, function () {
                    tempCtx.drawImage(this.canvas, parseInt(viewPosition.x() * this.hspeed, 10), parseInt(viewPosition.y() * this.vspeed, 10),
                                        viewWidth, viewHeight, 0, 0, viewWidth, viewHeight);
                });

                return tempCanvas.toDataURL();
            };

            this.getTileType = function (x, y, layerName) {
                /// <summary>Get the type of tile placed at given position.</summary>
                /// <param name="x" type="Number">Abscissa.</param>
                /// <param name="y" type="Number">Ordinate.</param>
                /// <param name="layerName" type="String">Layer where the tile is drawn.</param>
                /// <returns type="Const">JSGlib.TILES_TYPES constant if tile exists and has a specific type. 0 otherwise.</returns>
                    
                var layer = _getLayer(layerName),
                    type = 0;

                x = Math.floor(x / _tilesSize);
                y = Math.floor(y / _tilesSize);

                if (layer.tiles.length > 0) {
                    if (layer.tiles[y] && layer.tiles[y][x]) {
                        type = _tiles[layer.tileName].types[layer.tiles[y][x]];
                    }
                }

                return type;
            };

            this.run = function () {
                /// <summary>Launch the game.</summary>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                if (_rooms.length === 0) {
                    throw new RangeError('The game can\'t be launched because it contains no rooms.');
                }

                //Attach events on game
                if (!_isRunning) {
                    _isRunning = true;

                    _container.addEventListener('mousemove', function (e) {
                        var x = e.pageX,
                            y = e.pageY,
                            view = _currentRoom.view(),
                            viewX = view ? view.x() : 0,
                            viewY = view ? view.y() : 0,
                            currentNode = this,
                            style = null,
                            borderLeft = 0,
                            borderTop = 0;

                        //Remove to mouse coordinates the offsets and borders width of container's parents
                        while (currentNode && currentNode.nodeType == 1) {
                            style = window.getComputedStyle(currentNode);
                            borderLeft = style ? parseInt(style.borderLeftWidth, 10) : 0;
                            borderTop = style ? parseInt(style.borderTopWidth, 10) : 0;

                            x -= ((currentNode.offsetLeft || 0) + borderLeft) - (currentNode.scrollLeft || 0);
                            y -= ((currentNode.offsetTop || 0) + borderTop) - (currentNode.scrollTop || 0);
                            currentNode = currentNode.parentNode;
                        }

                        //Also add the view coordinates
                        x += viewX;
                        y += viewY;

                        _mouse.x(x).y(y);

                    }, false);

                    _container.addEventListener('mousedown', function (e) {
                        _triggerAll('eventMouseDown', (e.button === 0 ? 37 : 39));
                    });

                    _container.addEventListener('mouseup', function (e) {
                        var key = e.button === 0 ? 37 : 39,
                            returnValue = _triggerAll('eventMouseUp', key),
                            preventDefault = returnValue === undefined ? false : !!!returnValue,
							clickedElements	=	[];
                       
                        returnValue = true;        
						
						JSGlib.forEach(_activeElements, function () {
							var	clicked			=	this.isMouseOver(),
									tempReturn	=	_trigger(this, 'eventClick', [clicked]);
							
							returnValue	=	returnValue && tempReturn;
							
							if (clicked) {
								clickedElements.push(this);
							}
						});
						
						_trigger(_thisGame, 'eventClick', [clickedElements]);

                        returnValue =  returnValue === undefined ? false : !!!returnValue;
                        _container.oncontextmenu = (preventDefault || returnValue) ? function () { return false; } : null;        
                    });

                    document.addEventListener('keydown', function (e) {
                        e = e || window.event;
                        var key = e.which || e.keyCode,
                            alreadyPressed = JSGlib.isKeyPressed(key),
                            preventDefault = false,
                            returnValue = null;

                        if (!alreadyPressed) {
                            jsglib_keys_pressed.push(key);
                            returnValue = _triggerAll('eventKeyDown', key);
                            preventDefault = returnValue === undefined ? false : !!!returnValue;
                        }

                        returnValue = _triggerAll('eventKeyPressed', key);
                        returnValue = returnValue === undefined ? false : !!!returnValue;

                        if (preventDefault || returnValue) {
                            e.preventDefault();
                            return false;
                        }
                    });
                    
                    document.addEventListener('keyup', function (e) {
                        e = e || window.event;
                        var key = e.which || e.keyCode;
                        if (JSGlib.removeFromArray(key, jsglib_keys_pressed)) {
							_triggerAll('eventKeyUp', key);
						}
                    });

                    document.addEventListener('keypress', function (e) {
                        e = e || window.event;
                        var key = e.which || e.keyCode;
                        if (key >= 37 && key <= 40) {
                            e.preventDefault();
                            return false;
                        }
                    });
                }

                //Launch first room
                this.goToFirstRoom();

                //Launch refresh method
                _refresh();

                //And launch the game!
                _step();

                return this;
            };

            this.getMouse = function () {
                /// <summary>Get the mouse coordinates relative to the game.</summary>
                /// <returns type="JSGlib.Point">The Point objetc containing the mouse coordinates.</returns>
                return _mouse;
            };

            this.addRooms = function (room) {
                /// <signature>
                /// <summary>Add a room to the game.</summary>
                /// <param name="room" type="JSGlib.Room">Room to add.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Add several rooms to the game.</summary>
                /// <param name="rooms" type="Array[JSGlib.Room]">List of rooms to add.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                /// </signature>
                if (room instanceof Array) {
                    JSGlib.forEach(room, function () {
                        if (this instanceof JSGlib.Room) {
                            _rooms.push(this);
                        } else {
                            throw new TypeError('Trying to add objects which are not instances of Room.');
                        }
                    });
                } else if (room instanceof JSGlib.Room) {
                    _rooms.push(room);
                } else {
                    throw new TypeError('Game.addRomms() -> trying to add an object which is not an instance of Room.');
                }

                return this;
            };

            this.getRoom = function (name) {
                /// <summary>Get the room having the given name.</summary>
                /// <returns type="JSGlib.Room">The corresponding room if name exists. Null otherwise.</returns>
                var room = JSGlib.forEach(_rooms, function () {
                    if (this.getName() == name) {
                        return this;
                    }
                });
                return room || null;
            };

            this.getRooms = function () {
                /// <summary>Get the list of rooms linked to the game.</summary>
                /// <returns type="Array[JSGlib.Room]">An array of rooms.</returns>
                return _rooms;
            };

            this.getCurrentRoom = function () {
                /// <summary>Get the room currently running.</summary>
                /// <returns type="JSGlib.Room">The room currently running.</returns>
                return _currentRoom;
            };

            this.goToFirstRoom = function () {
                /// <summary>Launch the first room of the game.</summary>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                return this.goToRoom(_rooms[0]);
            };

            this.goToLastRoom = function () {
                /// <summary>Launch the last room of the game.</summary>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                return this.goToRoom(_rooms[_rooms.length - 1]);
            };

            this.goToNextRoom = function () {
                /// <summary>Launch the next room of the game.</summary>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                var index = 0;

                JSGlib.forEach(_rooms, function (i) {
                    if (this.getName() == _currentRoom.getName()) {
                        index = i.key + 1;
                        return JSGlib.KEYWORDS.BREAK;
                    }
                });

                if (index >= _rooms.length) {
                    index = 0;
                }

                return this.goToRoom(_rooms[index]);
            };

            this.goToPrevRoom = function () {
                /// <summary>Launch the previous room of the game.</summary>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                var index = 0;

                JSGlib.forEach(_rooms, function (i) {
                    if (this.getName() == _currentRoom.getName()) {
                        index = i.key - 1;
                        return JSGlib.KEYWORDS.BREAK;
                    }
                });

                if (index < 0) {
                    return this.goToLastRoom();
                }

                return this.goToRoom(_rooms[index]);
            };

            this.restartRoom = function () {
                /// <summary>Restart the current room.</summary>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                return this.goToRoom(_currentRoom);
            };

            this.goToRoom = function (room) {
                /// <signature>
                /// <summary>Launch the given room.</summary>
                /// <param name="room" type="JSGlib.Room">Room to launch.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Launch the given room.</summary>
                /// <param name="name" type="String">Name of the room to launch.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                /// </signature>

                var r = null,
                    definition = {};

                if (room instanceof JSGlib.Room) {
                    _currentRoom = room;
                } else {
                    r = this.getRoom(room);
                    if (r) {
                        _currentRoom = r;
                    } else {
                        throw new ReferenceError('This game doesn\'t have a room with name "' + room + '".');
                    }
                }

				//Destroy all elements
				JSGlib.forEach(_allElements, function () {
					_thisGame.instanceDestroy(this, true);
				});
				_deletePermanentlyElements();

                //Destroy all animated tiles and reset layers elements
                JSGlib.forEach(_layers, function () {
					this.animatedTiles.length = 0;
					this.elements.length = 0;
                });

                //Reset array containing objects to draw
                _drawingObjects.length = 0;

                _prepareRoomDisplaying();
                
                //Create pre-defined elements and tiles if exist
                definition = _roomsDefinitions[_currentRoom.getName()];
                if (definition) {
                    JSGlib.forEach(definition.elements, function () {
                        _thisGame.instanceCreate(this.x, this.y, this['class'], this.layer);
                    });

                    JSGlib.forEach(definition.tiles, function (layerDef) {
                        var layer = _getLayer(layerDef.key);
                            
                        JSGlib.forEach(this, function (tileDef) {
                            var tileName = tileDef.key,
                                tilesDef = _tiles[tileName];

                            layer.tiles = this;
                            layer.tileName = tileName;
                            layer.spriteTile = tilesDef.sprite;

                            if (layer.spriteTile) {
                                
                                JSGlib.forEach(layer.tiles, function (i) {
                                    JSGlib.forEach(this, function (j) {
                                        var index = this,
                                            animatedSprite = null,
                                            indexAnimation = _thisGame.isTileAnimated(tileName, index),
                                            animationSpeed = 0;
                                        layer.drawTile(i.key, j.key);

                                        //If given tile is animated, store it
                                        if (indexAnimation !== false) {
                                            animationSpeed = tilesDef.animations[indexAnimation].speed;

                                            if (animationSpeed) {
                                                animatedSprite = new JSGlib.Sprite(layer.spriteTile.getImage())
                                                                .makeTiles(_tilesSize, _tilesSize, tilesDef.separation)
                                                                .usedTiles(tilesDef.animations[indexAnimation].tiles)
                                                                .imagespeed(animationSpeed);

                                                //Init first imageindex for animation
                                                JSGlib.forEach(animatedSprite.usedTiles(), function (i) {
                                                    if (this == index) {
                                                        animatedSprite.imageindex(i.key);
                                                        return true;
                                                    }
                                                });

                                                layer.animatedTiles.push({
                                                    position: new JSGlib.Point(i.key, j.key),
                                                    sprite: animatedSprite
                                                });
                                                
                                            }
                                        }
                                    });
                                });
                            }
                        });
                    });
                }

                _currentRoom.eventStart();
                return this;
            };

            this.fps = function (fps) {
                /// <signature>
                /// <summary>Get the FPS of the game.</summary>
                /// <returns type="Number">The FPS of the game.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the FPS of the game.</summary>
                /// <param name="fps" type="Number">The new FPS.</param>
                /// <returns type="JSGlib.Game">The calling Game.</returns>
                /// </signature>
                if (fps === undefined) {
                    return _fps;
                }
                _fps = parseInt(fps, 10);
                return this;
            };

            this.getInstancesByType = function (className) {
                /// <summary>Get all the active instances of given type.</summary>
                /// <param name="className" type="String">The class name to check.</param>
                /// <returns type="Array[JSGlib.Element]">An array containg all the found instances.</returns>
                if (!_classes[className]) {
                    throw new ReferenceError('Game.getInstancesByType() -> Class "' + className + '" is not defined in this game.');
                }
                var results = [];

                JSGlib.forEach(_activeElements, function () {
                    if (this.instanceOf(className)) {
                        results.push(this);
                    }
                });

                return results;
            };

            this.getInstancesIn = function (rectangle) {
                /// <summary>Get all the active instances inside the given rectangle area.</summary>
                /// <param name="rectangle" type="JSGlib.Rectangle">The area to check.</param>
                /// <returns type="Array[JSGlib.Element]">An array containg all the found instances.</returns>
                var results = [];

                JSGlib.forEach(_activeElements, function () {
                    if (this.getRectangleRepresentation().isCollidedWithRectangle(rectangle)) {
                        results.push(this);
                    }
                });

                return results;
            };

            this.getInstanceNearest = function (point, className, excludeInstance) {
                /// <summary>Get the active instance which center is the nearest of the given point.</summary>
                /// <param name="point" type="JSGlib.Point">Point to check.</param>
                /// <param name="className" type="Bool/String" optional="true">If not false, this method will check only instances of given type. Default: false.</param>
                /// <param name="excludeInstance" type="JSGlib.Element" optional="true">If specified, this method won't check given instance. Default: null.</param>
                /// <returns type="JSGlib.Element">The found Element, or null if none has been found.</returns>
                var element = null,
                    minValue = -1,
                    tempValue = 0;

                className = className || false;

                if (className && !_classes[className]) {
                    throw new ReferenceError('Game.getInstanceNearest() -> Class "' + className + '" is not defined in this game.');
                }

                excludeInstance = excludeInstance || null;

                JSGlib.forEach(_activeElements, function () {
                    if (className && !this.instanceOf(className) || excludeInstance && this.equals(excludeInstance)) {
                        return JSGlib.KEYWORDS.CONTINUE;
                    }

                    tempValue = point.getDistanceTo(this.getCenter());

                    if (minValue < 0 || tempValue < minValue) {
                        minValue = tempValue;
                        element = this;
                    }
                });

                return element;
            };
                
            this.instanceNumber = function (className) {
                /// <summary>Get the number of active instances of given type.</summary>
                /// <param name="className" type="String">The class name to check.</param>
                /// <returns type="Number">The total of active instances of given type.</returns>
                if (!_classes[className]) {
                    throw new ReferenceError('Game.instanceNumber() -> Class "' + className + '" is not defined in this game.');
                }

                return this.getInstancesByType(className).length;
            };

            this.totalOfInstances = function (className) {
                /// <summary>Get the total number of active instances.</summary>
                /// <param name="className" type="String" optional="true">If specified, count only instances of given type.</param>
                /// <returns type="Number">The total of instances found.</returns>
                if (!className) {
                    return _activeElements.length;
                }

                if (!_classes[className]) {
                    throw new ReferenceError('Game.totalOfInstances() -> Class "' + className + '" is not defined in this game.');
                }

                return this.getInstancesByType(className).length;
            };
            
            this.isMouseOver = function (element) {
                /// <summary>Check if mouse is over given element.</summary>
                /// <param name="element" type="JSGlib.Element">Element to check.</param>
                /// <returns type="Bool">true if mouse is over the element. false otherwise.</returns>
                return _mouse.isInRectangle(element.getRectangleRepresentation());
            };

            this.drawObject = function (drawingObject, layerName, position, forceRefresh, eraseMode) {
                /// <summary>Draw the given object on the given layer at the given position.</summary>
                /// <param name="drawingObject" type="JSGlib.Drawing.Object">Object to draw.</param>
                /// <param name="layerName" type="String">Name of the layer to draw the object.</param>
                /// <param name="position" type="JSGlib.Point" optional="true">Position where the object will be draw.</param>
                /// <param name="forceRefresh" type="Bool" optional="true">Indicate if given layer must be forced to refresh. Default: false.</param>
                /// <param name="eraseMode" type="Bool" optional="true">If true, the drawing object will be used as a mask to erase part of the layer instead of being drawn. Default: false.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                if (!drawingObject) {
                    throw new ReferenceError('Game.drawObject() -> given object seems to not exist.');
                }

                var layer = _getLayer(layerName);

                if (eraseMode || drawingObject.opacity() > 0) {
                    layer = _getLayer(layerName);

                    if (forceRefresh) {
                        layer.needRefresh = true;
                    }

                    position = position || new JSGlib.Point();
                    
                    _drawingObjects.push({
                        object: drawingObject,
                        position: position,
                        layer: layer,
                        eraseMode: eraseMode
                    });
                }
                return this;
            };

            this.eraseObject = function (drawingObject, layerName, position) {
                /// <summary>Use the given object as a mask to erase part of the the given layer at the given position.</summary>
                /// <param name="drawingObject" type="JSGlib.Drawing.Object">Object to use.</param>
                /// <param name="layerName" type="String">Name of the layer to erase.</param>
                /// <param name="position" type="JSGlib.Point" optional="true">Position where the object will be used.</param>
                /// <returns type="JSGlib.Game">The calling Game object.</returns>
                if (!drawingObject) {
                    throw new ReferenceError('Game.eraseObject() -> given object seems to not exist.');
                }

                return this.drawObject(drawingObject, layerName, position, false, true);
            };
            
            /*== Init game ==*/
            _container = document.getElementById(idContainer);
            if (!_container) {
                throw new ReferenceError('new JSGlib.Game("' + idContainer +
                                        '") -> id "' + idContainer + '" does not exist.');
            }
            _container.style.overflow = 'hidden';
            _container.style.display = 'block';
            _containerComputedStyle = window.getComputedStyle(_container);
            
            if (_containerComputedStyle.position == 'static' || _containerComputedStyle.position.length === 0) {
                _container.style.position = 'relative';
            }

            jsglib_games[idContainer] = this;

            //Create main layer
            this.createLayer('main', true);
        },
        //@end_class Game
        /// <field name="Element" static="true" type="Class">A class representing an element. You should not direclty use it: call Game.instanceCreate() in order to create new instances of Elements!</field>
        //@start_class Element
        Element: function (x, y, layer, game) {
            if (!JSGlib.Element._isLoaded) {
                JSGlib.Element._isLoaded = true;
                JSGlib.Element._lastId = 0;
            }

            /*==  Private properties  ==*/

            var _id = ++JSGlib.Element._lastId,
                _startPosition = new JSGlib.Point(x, y),
                _prevPosition = new JSGlib.Point(x, y),
                _layer = layer,
                _gravity = 0,
                _hspeed = 0,
                _vspeed = 0,
                _opacity = 100,
                _rectangleRepresentation = new JSGlib.Rectangle(x, y),
                _sprite = null,
                _state = JSGlib.STATE.STAND,
                _spriteModified = false,
                _alwaysActive = false,
                _solid = false,
                _checkCollisions = true,
                _stopOnSolids = true,
                _filter = null,
                _alarms = {},
                _moveToPointCallBack = null,
                _zIndex = _id,
                _isOnPath = false,
                _game = game,
				_solidsMaskColor = null;

            /*== Public methods ==*/
            this.getId = function () {
                /// <summary>Get the unique id of the element.</summary>
                /// <returns type="Number">Id of the element.</returns>
                return _id;
            };

            this.getGame = function () {
                /// <summary>Get the game of the element.</summary>
                /// <returns type="JSGlib.Game">The game where the element evolved.</returns>
                return _game;
            };

            this.zIndex = function (zIndex) {
                /// <signature>
                /// <summary>Get the zIndex of the element.</summary>
                /// <returns type="Number">zIndex of the element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the zIndex of the element.</summary>
                /// <param name="zIndex" type="Number">The new zIndex.</param>
                /// <returns type="JSGlib.Element">The calling Element object.</returns>
                /// </signature>

                if (zIndex === undefined) {
                    return _zIndex;
                } else if (zIndex != _zIndex) {
                    _zIndex = parseInt(zIndex, 10);
                    _game.orderElementsOnLayer(_layer)
                         .updateMaxZIndex(_zIndex);
                }

                return this;
            };

            this.putToFirstPlan = function () {
                /// <signature>
                /// <summary>Put the element on the first plan of its layer.</summary>
                /// <returns type="JSGlib.Element">The calling Element object.</returns>
                /// </signature>

                _game.putElementToFirstPlan(this);
                return this;
            };
			
			this.destroy = function (dontTriggerEvent) {
                /// <summary>Destroy the element.</summary>
                /// <param name="dontTriggerEvent" type="Bool" optional="true">If true, "eventDestroy" won't be triggered. Default: false.</param>
				/// <returns type="JSGlib.Element">The calling Element object.</returns>
				
                _game.instanceDestroy(this, dontTriggerEvent);
				return this;
            };
            
            this.getRectangleRepresentation = function () {
                /// <summary>Get the rectangle representaiton the element. <br />
                /// It should not be very useful to you, but JSGlib uses it internally.</summary>
                /// <returns type="JSGlib.Rectangle">Rectangle representing the element.</returns>
                return _rectangleRepresentation;
            };

            this.active = function (active) {
                /// <signature>
                /// <summary>Check if the element is active.</summary>
                /// <returns type="Bool">true if element is active. false otherwise.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Activate or deactivate the element.</summary>
                /// <param name="active" type="Bool">If true, activate the element. If false, deactivate it.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>

                if (active) {
                    _game.activateElement(this);
                } else if (active === false) {
                    _game.deactivateElement(this);
                } else {
                    return _game.isElementActive(this);
                }
                return this;
            };

            this.callParent = function (methodName, args, parentToCall) {
                /// <signature>
                /// <summary>Call the given method from given parent class on this instance.</summary>
                /// <param name="methodName" type="String">The name of the method to call.</param>
                /// <param name="args" type="Mixed/Array" optional="true">Arguments to send to the called method.<br />
                /// If you want to send several arguments, wrap them into an array.<br />
                /// If you want to send only one array, you also have to wrap it into another array.</param>
                /// <param name="parentToCall" type="String" optional="true">Name of the parent class having the method to use. If not specified, JSGlib will try to guess by itself.</param>
                /// <returns type="Mixed">The return value of the called method.</returns>
                /// </signature>

                return _game.callParent(this, methodName, args, parentToCall);
            };

            this.instanceNearest = function (className) {
                /// <summary>Get the active instance which center is the nearest of the center of this element.</summary>
                /// <param name="className" type="Bool/String" optional="true">If not false, this method will check only instances of given type. Default: false.</param>
                /// <returns type="JSGlib.Element">The found Element, or null if none has been found.</returns>

                return _game.getInstanceNearest(this.getCenter(), className, this);
            };

            this.isInsideRoom = function () {
                /// <summary>Check if element is inside current room.</summary>
                /// <returns type="Bool">true if element is inside current room. false otherwise.</returns>

                return _game.isInsideRoom(this);
            };

            this.isInsideView = function () {
                /// <summary>Check if element is inside view.</summary>
                /// <returns type="Bool">true if element is inside view. false otherwise.</returns>
                
                return _game.isInsideView(this);
            };

            this.isMouseOver = function () {
                /// <summary>Check if mouse is over element.</summary>
                /// <returns type="Bool">true if mouse is over the element. false otherwise.</returns>
                return _game.isMouseOver(this);
            };

            this.x = function (x) {
                /// <signature>
                /// <summary>Get the abscissa of the element.</summary>
                /// <returns type="Number">The abscissa of the element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the abscissa of the element.</summary>
                /// <param name="x" type="Number">The new abcissa.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (x === undefined) {
                    return _rectangleRepresentation.x();
                }
                _rectangleRepresentation.x(x);
                return this;
            };

            this.y = function (y) {
                /// <signature>
                /// <summary>Get the ordinate of the element.</summary>
                /// <returns type="Number">The ordinate of the element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the ordinate of the element.</summary>
                /// <param name="y" type="Number">The new ordinate.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (y === undefined) {
                    return _rectangleRepresentation.y();
                }
                _rectangleRepresentation.y(y);
                return this;
            };

            this.width = function (width) {
                /// <signature>
                /// <summary>Get the width of the element.</summary>
                /// <returns type="Number">The width of the element.<br />
                /// If the element has a sprite, the width is the one of the sprite.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the width of the element.<br />If the element has a sprite, setting its width is useless.</summary>
                /// <param name="width" type="Number">The new width.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (width === undefined) {
                    if (!_sprite) {
                        return _rectangleRepresentation.width();
                    } 
                    return _sprite.isTiles() ? _sprite.getTilesWidth() : _sprite.getWidth();
                }

                _rectangleRepresentation.width(width);
                return this;
            };

            this.height = function (height) {
                /// <signature>
                /// <summary>Get the height of the element.</summary>
                /// <returns type="Number">The height of the element.<br />
                /// If the element has a sprite, the height is the one of the sprite.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the height of the element.<br />If the element has a sprite, setting its height is useless.</summary>
                /// <param name="width" type="Number">The new height.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (height === undefined) {
                    if (!_sprite) {
                        return _rectangleRepresentation.height();
                    }
                    return _sprite.isTiles() ? _sprite.getTilesHeight() : _sprite.getHeight();
                }

                _rectangleRepresentation.height(height);
                return this;
            };

            this.position = function (x, y) {
                /// <signature>
                /// <summary>Get the position of the element.</summary>
                /// <returns type="JSGlib.Point">The Point object representing the position of the element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set a new position to the element.</summary>
                /// <param name="x" optional="true" type="Number">Abscissa.</param>
                /// <param name="y" optional="true" type="Number">Ordinate.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set a new position to the element.</summary>
				/// <param name="point" optional="true" type="JSGlib.Point">Point to copy.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>

                if (x === undefined) {
                    return _rectangleRepresentation.position();
                } else if (x instanceof JSGlib.Point) {
                    _rectangleRepresentation.position().copy(x);
                    _spriteModified = true;
                } else {
                    _rectangleRepresentation.position().x(x).y(y);
                    _spriteModified = true;
                }
                return this;
            };

            this.prevPosition = function (point) {
                /// <signature>
                /// <summary>Get the position of the element on the previous step.</summary>
                /// <returns type="JSGlib.Point">The Point object representing the position of the element on the previous step.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Define the position of the element on the previous step.<br />This signature is used internally by JSGlib, you shouldn't use it.</summary>
                /// <param name="point" optional="true" type="JSGlib.Point">Point to copy.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>

                if (point === undefined) {
                    return _prevPosition;
                } else {
                    _prevPosition.copy(point);
                } 
                return this;
            };

            this.prevX = function () {
                /// <summary>Get the abscissa of the element on the previous step.</summary>
                /// <returns type="Number">The abscissa of the element on the previous step.</returns>
               
                return _prevPosition.x();
            };

            this.prevY = function () {
                /// <summary>Get the ordinate of the element on the previous step.</summary>
                /// <returns type="Number">The ordinate of the element on the previous step.</returns>

                return _prevPosition.y();
            };

            this.startPosition = function () {
                /// <summary>Get the start position of the element.</summary>
                /// <returns type="JSGlib.Point">The Point object representing the start position of the element.</returns>

                return _startPosition;
            };

            this.startX = function () {
                /// <summary>Get the start abscissa of the element.</summary>
                /// <returns type="Number">The start abscissa of the element.</returns>

                return _startPosition.x();
            };

            this.startY = function () {
                /// <summary>Get the start ordinate of the element.</summary>
                /// <returns type="Number">The start ordinate of the element.</returns>

                return _startPosition.y();
            };

            this.setAlarm = function (indexAlarm, numberOfSteps, isRelative) {
                /// <summary>Tell the given alarm to start and finish it in the given number of steps.</summary>
                /// <param name="indexAlarm" type="String/Number">Index of the alarm to launch.</param>
                /// <param name="numberOfSteps" type="Number">Number of step to wait before the alarm will be finished.</param>
                /// <param name="isRelative" type="Bool" optional="true">If true, the second parameter will be added to the given alarm instead of replace it. Default: false.</param>
                /// <returns type="JSGlib.Element/Bool">The calling element if "isRelative" is false.<br />Otherwise, a boolean indicating if the alarm is finished or not.</returns>
                numberOfSteps = parseInt(numberOfSteps, 10);

                if (isRelative) {
                    _alarms[indexAlarm] += numberOfSteps;
                    if (_alarms[indexAlarm] < 1) {
                        delete _alarms[indexAlarm];
                        return true;
                    }
                    return false;
                } else {
                    _alarms[indexAlarm] = numberOfSteps;
                    return this;
                }
            };
			
			this.cancelAlarm = function (indexAlarm) {
                /// <summary>Cancel the alarm having the given name.</summary>
                /// <param name="indexAlarm" type="String/Number">Index of the alarm to cancel.</param>
                /// <returns type="JSGlib.Element">The calling element.</returns>
                delete _alarms[indexAlarm];
				return this;
            };

            this.getAlarms = function () {
                /// <summary>Get all the running alarms of the element. You don't really need to call this method: it's used behind the scenes by JSGlib!</summary>
                /// <returns type="Object">An object with this kind of properties:  alarmIndex => number of steps.</returns>
                return _alarms;
            };

            this.filter = function (filter) {
                /// <signature>
                /// <summary>Get the filter of the element.</summary>
                /// <returns type="JSGlib.Drawing.Filter">The filter of the element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the filter of the element.</summary>
                /// <param name="filter" type="JSGlib.Drawing.Filter">The new filter.</param>
                /// <returns type="Element">The calling element.</returns>
                /// </signature>
                if (!filter) {
                    return _filter;
                }
                _filter = filter;
                return this;
            };

            this.getCenter = function () {
                /// <summary>Get the center of the element.</summary>
                /// <returns type="JSGlib.Point">Coordinates of center of the element.</returns>
                return _rectangleRepresentation.getCenter();
            };

            this.gravity = function (gravity) {
                /// <signature>
                /// <summary>Get the gravity of the element.</summary>
                /// <returns type="Number">The gravity of the element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the gravity of the element.</summary>
                /// <param name="gravity" type="Number">The new gravity.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (gravity === undefined) {
                    return _gravity;
                }
                _gravity = parseFloat(gravity, 10);
                return this;
            };

            this.hspeed = function (hspeed) {
                /// <signature>
                /// <summary>Get the horizontal speed of the element.</summary>
                /// <returns type="Number">The horizontal speed of the element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the horizontal speed of the element.</summary>
                /// <param name="hspeed" type="Number">The new horizontal speed.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (hspeed === undefined) {
                    return _hspeed;
                }
                _hspeed = parseFloat(hspeed, 10);
                return this;
            };

            this.vspeed = function (vspeed) {
                /// <signature>
                /// <summary>Get the vertical speed of the element.</summary>
                /// <returns type="Number">The vertical speed of the element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the vertical speed of the element.</summary>
                /// <param name="vspeed" type="Number">The new vertical speed.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (vspeed === undefined) {
                    return _vspeed;
                }
                _vspeed = parseFloat(vspeed, 10);
                return this;
            };

            this.getDirection = function () {
                /// <signature>
                /// <summary>Get the direction of the element according to its hspeed and vspeed.</summary>
                /// <returns type="Number">The direction of the element, in °.</returns>
                /// </signature>
                return JSGlib.getVectorDirection(_hspeed, _vspeed);
            };

            this.moveToDirection = function (direction, speed) {
                /// <signature>
                /// <summary>Change hspeed and vspeed of the element in order to make it moving to the given direction with given speed.</summary>
                /// <param name="direction" type="Number">Direction to follow, in °.</param>
                /// <param name="speed" type="Number">Speed of movement.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                direction = (360 - direction) * Math.PI / 180;
                _hspeed = speed * Math.cos(direction);
                _vspeed = speed * Math.sin(direction);

                return this;
            };

            this.moveToPoint = function (point, speed, callback) {
                /// <signature>
                /// <summary>Change hspeed and vspeed of the element in order to make it moving to the given point with given speed.</summary>
                /// <param name="point" type="JSGlib.Point">Point to reach.</param>
                /// <param name="speed" type="Number">Speed of movement.</param>
                /// <param name="callback" type="Function" optional="true">Function to call when element will reach the given point.<br />
				/// If you want to call again moveToPoint() in the callback, you MUST consider using setPath() method.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                var targetX = parseInt(point.x(), 10),
                    targetY = parseInt(point.y(), 10),
                    deltaX = targetX - parseInt(this.x(), 10),
                    deltaY = targetY - parseInt(this.y(), 10);
				
                if (callback) {
                    _moveToPointCallBack = {
                        x: targetX,
                        y: targetY,
                        fromLeft: deltaX > 0,
                        fromTop: deltaY > 0,
                        callback: callback
                    };
                }

                return this.moveToDirection(JSGlib.getVectorDirection(deltaX, deltaY), speed);
            };

            this.setPath = function (points, speed, callback) {
                /// <signature>
                /// <summary>Change hspeed and vspeed of the element in order to make it moving to each given points.</summary>
                /// <param name="point" type="Array[Object/JSGlib.Point]">An array of objects containing these properties:<br />
                /// {<br />
                ///   point: Instance of JSGlib.Point,<br />
                ///   callBack: Function to call when corresponding point is reached (optional)
                /// }<br />If you don't want to provide a callback, you can specify an instance of JSGlib.Point without giving it via an object.</param>
                /// <param name="speed" type="Number">Speed of movement.</param>
                /// <param name="callback" type="Function" optional="true">Function to call when element will reach the last point.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Change hspeed and vspeed of the element in order to make it moving to each given points.</summary>
                /// <param name="point" type="Array[Object/JSGlib.Point]">An array of objects containing these properties:<br />
                /// {<br />
                ///   point: Instance of JSGlib.Point,<br />
                ///   callBack: Function to call when corresponding point is reached (optional)
                /// }<br />If you don't want to provide a callback, you can specify an instance of JSGlib.Point without giving it via an object.</param>
                /// <param name="speed" type="Number">Speed of movement.</param>
                /// <param name="callback" type="String" optional="true">A string constant that could be one of these values:<br />
                ///   JSGlib.KEYWORDS.REPEAT => path will be repeated once the element reaches the last point.<br />
                ///   JSGlib.KEYWORDS.REVERSE => path will be repeated reverted once the element reaches the last point.
                /// </param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (points[0] instanceof JSGlib.Point || points[0].point) {
                    var element = this,
                        point = null,
                        mainFunction = function mainFunction(i) {

                            _isOnPath = true;
                            point = points[i] instanceof JSGlib.Point ? points[i] : points[i].point;
                            
                            if (point) {
                                element.moveToPoint(point, speed, function () {
                                    //Callback for this point
                                    if (points[i].callback) {
                                        points[i].callback.apply(element);
                                    }

                                    //If there is a next point...
                                    if (points[++i]) {
                                        mainFunction(i);
                                    } else {
                                        if (callback) {
                                            if (typeof callback == 'string') {
                                                switch (callback) {
                                                case JSGlib.KEYWORDS.REPEAT:
                                                    mainFunction(0);
                                                    break;
                                                case JSGlib.KEYWORDS.REVERSE:
                                                    points.reverse();
                                                    points.push(points.shift());
                                                    mainFunction(0);
                                                    break;
                                                }
                                            } else {
                                                _isOnPath = false;
                                                callback.apply(element);
                                            }
                                        } else {
                                            _isOnPath = false;
                                        }
                                    }
                                });
                            } else {
                                throw new TypeError('Element.setPath() -> point at index "' + i + '" seems to not exist.');
                            }
                        };

                    mainFunction(0);
                } else {
                    throw new TypeError('Element.setPath() -> first parameter must be an array of JSGlib.Point or an array of objects having a property "point" which is an instance of JSGlib.Point.');
                }

                return this;
            };

            this.cancelMoveToPointCallBack = function () {
                /// <signature>
                /// <summary>Unbind the callback linked with moveToPoint() method.</summary>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                _moveToPointCallBack = null;
                _isOnPath = false;
                return this;
            };

            this.checkMoveToPointCallback = function () {
                /// <signature>
                /// <summary>Check if the callback linked with moveToPoint() method has to be run or not.<br />JSGlib uses this method behind the scene, you should not call it!</summary>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
				
                if (_moveToPointCallBack) {
                    var x = Math.floor(this.x()),
                        y = Math.floor(this.y()),
                        absHspeed = Math.abs(_hspeed),
                        absVspeed = Math.abs(_vspeed);
                   
                    if (absHspeed > 0 && absHspeed < 0.1) {
                        _hspeed = 0;
                        this.x(_moveToPointCallBack.x);
                    }

                    if (absVspeed > 0 && absVspeed < 0.1) {
                        _vspeed = 0;
                        this.y(_moveToPointCallBack.y);
                    }

                    if (
                        (_moveToPointCallBack.fromLeft && x >= _moveToPointCallBack.x || !_moveToPointCallBack.fromLeft && x <= _moveToPointCallBack.x) &&
                        (_moveToPointCallBack.fromTop && y >= _moveToPointCallBack.y || !_moveToPointCallBack.fromTop && y <= _moveToPointCallBack.y)
                    ) {
                        _moveToPointCallBack.callback.apply(this);
                      
                        if (!_isOnPath) {
                            _moveToPointCallBack = null;
                        }
                    }
                }
                return this;
            };

            this.opacity = function (opacity) {
                /// <signature>
                /// <summary>Get the opacity of the element.</summary>
                /// <returns type="Number">The opacity of the element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the opacity of the element.</summary>
                /// <param name="opacity" type="Number">The new opacity.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (opacity === undefined) {
                    return _opacity;
                }
                _opacity = parseInt(opacity, 10);
                _spriteModified = true;
                return this;
            };

            this.solid = function (solid) {
                /// <signature>
                /// <summary>Check if element is solid or not.</summary>
                /// <returns type="Bool">true if element is solid. false otherwise.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set solidity of element.</summary>
                /// <param name="solid" type="Bool">true if element must be solid. false otherwise.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (solid === undefined) {
                    return _solid;
                }
                _solid = solid;
                return this;
            };

            this.checkCollisions = function (checkCollisions) {
                /// <signature>
                /// <summary>Check if element has to check collisions or not.</summary>
                /// <returns type="Bool">true if element has to check collisions. false otherwise.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set if element has to check collisions.</summary>
                /// <param name="checkCollisions" type="Bool">true if element must check collisions. false otherwise.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (checkCollisions === undefined) {
                    return _checkCollisions;
                }
                _checkCollisions = checkCollisions;
                return this;
            };

            this.stopOnSolids = function (stopOnSolids) {
                /// <signature>
                /// <summary>Check if element has to stop on solids or not.</summary>
                /// <returns type="Bool">true if element has to stop on solids. false otherwise.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set if element has to stop on solids.</summary>
                /// <param name="stopOnSolids" type="Bool">true if element must stop on solids. false otherwise.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (stopOnSolids === undefined) {
                    return _stopOnSolids;
                }
                _stopOnSolids = stopOnSolids;
                return this;
            };
			
			this.maskColorForSolidCollisions = function (color) {
                /// <signature>
                /// <summary>Get the mask color used for collisions with solids.</summary>
                /// <returns type="JSGlib.Color">Color of the mask.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the mask color used for collisions with solids.</summary>
				/// <param name="color" type="JSGlib.Color">The color to copy.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
				/// </signature>
                if (!color) {
                    return _solidsMaskColor;
                }
                _solidsMaskColor = new JSGlib.Color(color);
                return this;
            };

            this.getLayer = function () {
                /// <signature>
                /// <summary>Get the layer name of the element.</summary>
                /// <returns type="String">The layer name.</returns>
                /// </signature>
                return _layer;
            };

            this.sprite = function (sprite, width, height, separation, mask) {
                /// <signature>
                /// <summary>Get the sprite of the element.</summary>
                /// <returns type="JSGlib.Sprite">The sprite of the element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the sprite of the element.</summary>
                /// <param name="sprite" type="JSGlib.Sprite">The new sprite.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
				/// <signature>
                /// <summary>Set the sprite of the element.</summary>
                /// <param name="imageAlias" type="String">Alias of the image used to create the new sprite.</param>
				/// <param name="width" type="Number" optional="true">Width of each tile. Default: 0.</param>
                /// <param name="height" type="Number" optional="true">Height of each tile. Default: 0.</param>
                /// <param name="separation" type="Number" optional="true">Separation size between each tile. Default: 0.</param>
                /// <param name="maskAlias" type="String" optional="true">Alias of the image to use as mask. Default: null.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (!sprite) {
                    return _sprite;
                }
                
				if (sprite instanceof JSGlib.Sprite) {
					_sprite = sprite;
				} else {
					_sprite = new JSGlib.Sprite(_game.getImage(sprite));
					
					if (width) {
						_sprite.makeTiles(width, height, separation);
						
						if (mask) {
							_sprite.masks(_game.getImage(mask));
						}
					}
				}
				
                _spriteModified = true;
                _rectangleRepresentation.height(_sprite.isTiles() ?
                        _sprite.getTilesHeight() :
                        _sprite.getHeight());
                _rectangleRepresentation.width(_sprite.isTiles() ?
                        _sprite.getTilesWidth() :
                        _sprite.getWidth());
                
				return this;
            };

            this.spriteModified = function (modified) {
                /// <signature>
                /// <summary>Check if sprite of element has been modified.</summary>
                /// <returns type="Bool">true if sprite has been modified. false otherwise.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Change the "modified" state of the sprite element.<br />JSGlib uses this signature internally, you shouldn't call it!</summary>
                /// <param name="modified" type="Bool">New state.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                
                if (modified === undefined) {
                    return _spriteModified;
                }
                _spriteModified = modified;
                return this;
            };
            
            this.alwaysActive = function (alwaysActive) {
                /// <signature>
                /// <summary>Check if element is always active or not.</summary>
                /// <returns type="Bool">true if element is always active. false otherwise.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Change the "always active" state of the element. If set to true, element will be managed by JSGlib even if it's outside the view.</summary>
                /// <param name="alwaysActive" type="Bool">New behavior.</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                
                if (alwaysActive === undefined) {
                    return _alwaysActive;
                }
                _alwaysActive = alwaysActive;
                return this;
            };
            
            this.equals = function (element) {
                /// <summary>Check if element is the same than the given one, checking by their id.</summary>
                /// <param name="element" type="JSGlib.Element">Element to check.</param>
                /// <returns type="Bool">true if elements are equal. false otherwise.</returns>
                
                return element ? (element.getId ? _id == element.getId() : false) : false;
            };

            this.instanceOf = function (className) {
                /// <summary>Check if element is an instance of given class.</summary>
                /// <param name="className" type="String">Name of class to check.</param>
                /// <returns type="Bool">true if elements an instance of given class. false otherwise.</returns>
                return !!JSGlib.forEach(this._types, function () {
                    if (this == className) {
                        return true;
                    }
                });
            };
            
            this.isCollidedWithElement = function (element) {
                /// <summary>Check if element is collided with given element</summary>
                /// <param name="element" type="JSGlib.Element">Element to check.</param>
                /// <returns type="Object/Bool">false if elements are not collided. An object containing the collided masks of each elements otherwise.</returns>
				var thisElement = this,
                    thisMasks = _sprite ? _sprite.getCurrentMasks() : [],
                    otherSprite = element.sprite(),
                    otherMasks = otherSprite ? otherSprite.getCurrentMasks() : [],
                    thisTilePosition = _sprite.getCurrentTilePosition(),
                    otherTilePosition = otherSprite ? otherSprite.getCurrentTilePosition() : new JSGlib.Point(),
                    tempMask = null,
                    thisMasksIsEmpty = thisMasks.length === 0,
                    otherMasksIsEmpty = otherMasks.length === 0,
                    thisTempRectangle = null,
                    returnObject = {
                        thisMasks: {},
                        otherMasks: {},
                        thisHasMasksCollided: false,
                        otherHasMasksCollided: false
                    },
					onlyOneMaskFunction = function (masks, firstElement, secondElement, tilePosition, thisOrOther) {
						JSGlib.forEach(masks, function () {
							var otherTempRectangle = new JSGlib.Rectangle(this.rectangle);
							otherTempRectangle.x(otherTempRectangle.x() + firstElement.x() - tilePosition.x())
												.y(otherTempRectangle.y() + firstElement.y() - tilePosition.y());

							if (secondElement.getRectangleRepresentation().isCollidedWithRectangle(otherTempRectangle)) {
								returnObject[thisOrOther + 'Masks'][this.color] = true;
								returnObject[thisOrOther + 'HasMasksCollided'] = true;
							}
						});
					},
                    globalCollision = _rectangleRepresentation.isCollidedWithRectangle(element.getRectangleRepresentation());
				
                if (globalCollision) {
				
					if (!thisMasksIsEmpty && !otherMasksIsEmpty) {
                           
                        JSGlib.forEach(thisMasks, function () {
                            thisTempRectangle = new JSGlib.Rectangle(this.rectangle);
                            thisTempRectangle.x(thisTempRectangle.x() + thisElement.x() - thisTilePosition.x())
                                                .y(thisTempRectangle.y() + thisElement.y() - thisTilePosition.y());
                            tempMask = this;

                            JSGlib.forEach(otherMasks, function () {
                                var otherTempRectangle = new JSGlib.Rectangle(this.rectangle);
                                otherTempRectangle.x(otherTempRectangle.x() + element.x() - otherTilePosition.x())
                                                    .y(otherTempRectangle.y() + element.y() - otherTilePosition.y());

                                if (thisTempRectangle.isCollidedWithRectangle(otherTempRectangle)) {
                                    returnObject.thisMasks[tempMask.color] = true;
                                    returnObject.otherMasks[this.color] = true;
                                    returnObject.thisHasMasksCollided = true;
                                    returnObject.otherHasMasksCollided = true;
                                }
                            });
                                
                        });
                    } else if (!thisMasksIsEmpty || !otherMasksIsEmpty) {
						if (thisMasksIsEmpty) {
							onlyOneMaskFunction(otherMasks, element, thisElement, otherTilePosition, 'other');
                        } else {
							onlyOneMaskFunction(thisMasks, thisElement, element, thisTilePosition, 'this');
                        }
                    }

                    return returnObject;
                }

                return false;
            };

            this.getMask = function (color) {
                /// <summary>Get the rectangle representation of one of the current masks.</summary>
                /// <param name="color" optional="true" type="String">Color of the mask to get.</param>
                /// <returns type="JSGlib.Rectangle">
                /// The rectangle representation of the first mask with given color if one is provided.<br />
                /// The rectangle representation of the first mask found otherwise.
                /// </returns>

                var sprite = this.sprite(),
                    masks = sprite ? sprite.getCurrentMasks() : [],
                    mask = null,
                    tempRectangle = null,
                    tilePosition = null;

                if (masks.length > 0) {
                    if (color) {
                        mask = JSGlib.forEach(masks, function () {
                            if (this.color === color) {
                                return this;
                            }
                        });
                    } else {
                        mask = masks[0];
                    }

                    if (mask) {
                        tempRectangle = new JSGlib.Rectangle(mask.rectangle);
                        tilePosition = sprite.getCurrentTilePosition();

                        tempRectangle.x(tempRectangle.x() - tilePosition.x())
                                        .y(tempRectangle.y() - tilePosition.y());
                    }
                }

                //If no representations were found, mask is the rectangle representation of the element
                if (!tempRectangle) {
                    tempRectangle = new JSGlib.Rectangle(_rectangleRepresentation)
                                        .x(0).y(0);
                }

                return tempRectangle;
            };

            this.state = function (state) {
                /// <signature>
                /// <summary>Get the state of the element.</summary>
                /// <returns type="Number">Number representing the state: compare with JSGlib.STATE constants.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the state of the element.</summary>
                /// <param name="state" type="Number">The new state: use JSGlib.STATE constants to manage states in an easy way!</param>
                /// <returns type="JSGlib.Element">The calling Element.</returns>
                /// </signature>
                if (state === undefined) {
                    return _state;
                }
                _state = state;
                return this;
            };

            this.isStateSTAND = function () {
                /// <summary>Look after the state of the element and check if it's standing or not.</summary>
                /// <returns type="Bool">true if element has a "STAND" state. false otherwise.</returns>
                return _state >= JSGlib.STATE.STAND && _state <= JSGlib.STATE.STAND_DOWN_RIGHT;
            };

            this.isStateMOVE = function () {
                /// <summary>Look after the state of the element and check if it's moving or not.</summary>
                /// <returns type="Bool">true if element has a "MOVE" state. false otherwise.</returns>
                return _state >= JSGlib.STATE.MOVE && _state <= JSGlib.STATE.MOVE_DOWN_RIGHT;
            };

            this.isStateHURT = function () {
                /// <summary>Look after the state of the element and check if it's hurt or not.</summary>
                /// <returns type="Bool">true if element has a "HURT" state. false otherwise.</returns>
                return _state >= JSGlib.STATE.HURT && _state <= JSGlib.STATE.HURT_DOWN_RIGHT;
            };

            this.isStateDEATH = function () {
                /// <summary>Look after the state of the element and check if it's dying or not.</summary>
                /// <returns type="Bool">true if element has a "DEATH" state. false otherwise.</returns>
                return _state >= JSGlib.STATE.DEATH && _state <= JSGlib.STATE.DEATH_DOWN_RIGHT;
            };
			
			this.isStateSLIP = function () {
                /// <summary>Look after the state of the element and check if it's slipping or not.</summary>
                /// <returns type="Bool">true if element has a "SLIP" state. false otherwise.</returns>
                return _state >= JSGlib.STATE.SLIP && _state <= JSGlib.STATE.SLIP_DOWN_RIGHT;
            };

            this.isStateLEFT = function () {
                /// <summary>Look after the state of the element and check if it goes on left.</summary>
                /// <returns type="Bool">true if element has a "LEFT" state. false otherwise.</returns>
                var digit = _state % 10;
                return digit == 1 || digit == 5 || digit == 7;
            };

            this.isStateRIGHT = function () {
                /// <summary>Look after the state of the element and check if it goes on right.</summary>
                /// <returns type="Bool">true if element has a "RIGHT" state. false otherwise.</returns>
                var digit = _state % 10;
                return digit == 2 || digit == 6 || digit == 8;
            };

            this.isStateUP = function () {
                /// <summary>Look after the state of the element and check if it goes up.</summary>
                /// <returns type="Bool">true if element has an "UP" state. false otherwise.</returns>
                var digit = _state % 10;
                return digit == 3 || digit == 5 || digit == 6;
            };

            this.isStateDOWN = function () {
                /// <summary>Look after the state of the element and check if it goes down.</summary>
                /// <returns type="Bool">true if element has a "DOWN" state. false otherwise.</returns>
                var digit = _state % 10;
                return digit == 4 || digit == 7 || digit == 8;
            };
        },
        //@end_class Element
        /// <field name="Sprite" static="true" type="Class">A class representing a sprite.</field>
        //@start_class Sprite
        Sprite: function (image) {
            /// <signature>
            /// <param name="image" type="HTMLImageElement">HTML image to use as sprite.</param>
            /// </signature>

            if (!image) {
                throw new ReferenceError('new Sprite() -> no image provided.');
            }

            /*==  Private properties  ==*/
            var _image = image,
                _tiles = [],
                _usedTiles = [],
                _tilesWidth = 0,
                _tilesHeight = 0,
                _separation = 0,
                _imagespeed = 0.1,
                _imageindex = 0,
                _mask = null,
                        
            /*== Private methods ==*/
                _addMask = function (color, rectangle) {
                    var x = rectangle.x(),
                        y = rectangle.y(),
                        deltaSepY = _image.height % _tilesHeight,
                        deltaSepX = _image.width % _tilesWidth,
                        numberOfColumns = 0,
                        tilePosition = 0;
										
                    if (_tiles.length > 0) {
                        //Get coordinates of corresponding tiles in the 2D array
                        x = Math.round(Math.max(0, x - deltaSepX) / (_tilesWidth));
                        y = Math.round(Math.max(0, y - deltaSepY) / (_tilesHeight));

                        //Get the number of tiles by lines
                        numberOfColumns = (_image.width - deltaSepX) / _tilesWidth;

                        //And get the index of the corresponding tile!
                        tilePosition = x + (y * numberOfColumns) + 1;
                    }
										
                    if (!_mask[tilePosition]) {
                        _mask[tilePosition] = [];
                    }

                    _mask[tilePosition].push({
                        color: color,
                        rectangle: rectangle
                    });
                };

            /*== Public methods ==*/
            this.getImage = function () {
                /// <summary>Get the image of the sprite.</summary>
                /// <returns type="HTMLImageElement">Image used as sprite.</returns>
                return _image;
            };

            this.getWidth = function () {
                /// <summary>Get the width of the sprite.</summary>
                /// <returns type="Number">Width of the sprite.</returns>
                return _image.width;
            };

            this.getHeight = function () {
                /// <summary>Get the height of the sprite.</summary>
                /// <returns type="Number">Height of the sprite.</returns>
                return _image.height;
            };

            this.getTilesWidth = function () {
                /// <summary>Get the width of the tiles contained in the sprite.</summary>
                /// <returns type="Number">Width of the tiles.</returns>
                return _tilesWidth;
            };

            this.getTilesHeight = function () {
                /// <summary>Get the height of the tiles contained in the sprite.</summary>
                /// <returns type="Number">Height of the tiles.</returns>
                return _tilesHeight;
            };

            this.getTilesSeparation = function () {
                /// <summary>Get the separation size bewteen tiles.</summary>
                /// <returns type="Number">The separation size, in pixels.</returns>
                return _separation;
            };

            this.isTiles = function () {
                /// <summary>Check if Sprite is divided into tiles.</summary>
                /// <returns type="Bool">true if Sprite contains tiles. false otherwise.</returns>
                return _tiles.length > 0;
            };

            this.animate = function () {
                /// <summary>Change the tile to display for this sprite via its image speed.</summary>
                /// <returns type="Mixed">true if tile has been changed and animation is finished.<br />
                /// false if tile has been changed and animation is NOT finished.
                /// Null if tile has not been changed.</returns>

                if (!this.isTiles() || _imagespeed === 0) {
                    return null;
                }

                var imageindex = _imageindex,
                    cleanImageindex = parseInt(_imageindex, 10),
                    nbrUsedTiles = _usedTiles.length;

                if (nbrUsedTiles == 1) {
                    return null;
                }

                imageindex += _imagespeed;

                if (imageindex > nbrUsedTiles) {
                    _imageindex = 0;
                    return nbrUsedTiles > 1 ? true : null;
                } else if (parseInt(imageindex, 10) > cleanImageindex) {
                    _imageindex = cleanImageindex + 1;
                    return false;
                } else {
                    _imageindex = imageindex;
                    return null;
                }
            };

            this.makeTiles = function (width, height, separation) {
                /// <summary>Divide the sprite into several tiles.</summary>
                /// <param name="width" type="Number">Width of each tile.</param>
                /// <param name="height" type="Number">Height of each tile.</param>
                /// <param name="separation" type="Number" optional="true">Separation size between each tile. Default: 0.</param>
                /// <returns type="JSGlib.Sprite">The calling Sprite object.</returns>
                separation = separation || 0;

                var imageWidth = this.getWidth(),
                    imageHeight = this.getHeight(),
                    i = 0,
                    j = 0,
                    x = 0;

                for (j = 0; j < imageHeight; j += height) {
                    x = j / height;
                    _tiles[x] = [];

                    for (i = 0; i < imageWidth; i += width) {
                        _tiles[x][i / width] = new JSGlib.Point(
                                                i + separation * (i / width),
                                                j + separation * (j / height));
                        imageWidth -= separation;
                    }
                    imageWidth = this.getWidth();
                    imageHeight -= separation;
                }
                
                _tilesWidth = width;
                _tilesHeight = height;
                _separation = separation;

                _usedTiles = [1];

                return this;
            };

            this.usedTiles = function (tiles) {
                /// <signature>
                /// <summary>Get the index number of tiles used for animation of this sprite.</summary>
                /// <returns type="Array[Number]">An array containing the list of tiles numbers.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the list of tiles to use for animate the sprite.</summary>
                /// <param name="tiles" type="Array[Number]">An array containing the list of tiles numbers to use.</param>
                /// <returns type="JSGlib.Sprite">The calling Sprite.</returns>
                /// </signature>
                if (!tiles) {
                    return _usedTiles;
                } else if (tiles.toString() != _usedTiles.toString()) {
                    _usedTiles = tiles;
                    this.imageindex(0);
                }
                    
                return this;
            };

            this.imagespeed = function (imagespeed) {
                /// <signature>
                /// <summary>Get the speed animation of the sprite.</summary>
                /// <returns type="Number">The speed animation.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the speed animation of the sprite.</summary>
                /// <param name="imagespeed" type="Number">The new speed animation.</param>
                /// <returns type="JSGlib.Sprite">The calling Sprite.</returns>
                /// </signature>
                if (imagespeed === undefined) {
                    return _imagespeed;
                }
                _imagespeed = imagespeed;
                return this;
            };

            this.imageindex = function (imageindex) {
                /// <signature>
                /// <summary>Get the index of animation.</summary>
                /// <returns type="Number">The index of the animation.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the index of the animation.<br />JSGlib uses this signature internally, you shouldn't call it!</summary>
                /// <param name="imageindex" type="Number">The new index of animation.</param>
                /// <returns type="JSGlib.Sprite">The calling Sprite.</returns>
                /// </signature>
                if (imageindex === undefined) {
                    return _imageindex;
                }
                _imageindex = imageindex;
                return this;
            };

            this.getCurrentMasks = function () {
                /// <summary>Get the masks corresponding to the current tile.</summary>
                /// <returns type="Array">A list of JSON object containing the masks of the current tile.</returns>
				
				if (_mask) {
					var tileNumber = this.getCurrentTileNumber();
					
					return _mask[tileNumber] ? _mask[tileNumber] : [];
				}
				return [];
            };

            this.masks = function (maskImage) {
                /// <signature>
                /// <summary>Get the collisions mask of the sprite.</summary>
                /// <returns type="Array">Collisions mask of the sprite.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Analyse the given image to create the collisions mask of the sprite.</summary>
                /// <param name="maskAlias" type="HTMLImageElement">The image to analyse.</param>
                /// <returns type="JSGlib.Sprite">The calling Sprite.</returns>
                /// </signature>
                if (!maskImage) {
                    return _mask;
                }
                    
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    tempArray = [],
                    maskRectangle = null,
                    red = null,
                    green = null,
                    blue = null,
                    d = null,
                    left = 0,
                    top = 0,
                    lastColor = JSGlib.KEYWORDS.NULL,
                    i = 0,
                    l = 0;

                if (!_mask) {
                    _mask = [];
                } else {
                    _mask.length = 0;
                }

                canvas.width = maskImage.width;
                canvas.height = maskImage.height;
                ctx.drawImage(maskImage, 0, 0);

                d = ctx.getImageData(0, 0, maskImage.width, maskImage.height);
                    
                //Retrieve mask data and store pixels in a 2D array
                for (l = d.data.length; i < l; i += 4) {
                    red = d.data[i];
                    green = d.data[i + 1];
                    blue = d.data[i + 2];
                    left = i / 4;
                    top = Math.floor(left / canvas.width);

                    left %= canvas.width;

                    if (!tempArray[top]) {
                        tempArray[top] = [];
                    }

                    if ((red == 255 && green == 255 && blue == 255) || d.data[i + 3] < 1) {
                        tempArray[top][left] = null;
                        continue;
                    }

                    red = red.toString(16);
                    green = green.toString(16);
                    blue = blue.toString(16);

                    red = red.length < 2 ? '0' + red : red;
                    green = green.length < 2 ? '0' + green : green;
                    blue = blue.length < 2 ? '0' + blue : blue;

                    tempArray[top][left] = '#' + red + green + blue;
                }

                //Store Rectangles as masks
                JSGlib.forEach(tempArray, function (y) {
                    JSGlib.forEach(this, function (x) {
                        //Must use localeCompare here: for strange reason, simple comparison doesn't work as expected in IE9...
                        if (lastColor.localeCompare(this) !== 0) {
                            if (maskRectangle) {
                                _addMask(lastColor, maskRectangle.width(left));
                                
                                //Delete rectangle from array
                                for (left = maskRectangle.x(), l = left + maskRectangle.width() ; left < l; left++) {
                                    for (top = maskRectangle.y(), d = top + maskRectangle.height() ; top < d; top++) {                                            
                                        tempArray[top][left] = null;
                                    }
                                }

                                maskRectangle = null;
                            }

                            lastColor = this;

                            if (!JSGlib.isSet(this)) {
                                return JSGlib.KEYWORDS.CONTINUE;
                            }

                            maskRectangle = new JSGlib.Rectangle(x.key, y.key);

                            //Check the height of rectangle
                            left = 1;
                            for (l = y.key + 1; ; l++) {
                                if (!tempArray[l] || tempArray[l][x.key] != lastColor) {
                                    maskRectangle.height(left);
                                    break;
                                }
                                left++;
                            }

                            left = 1;
                        } else if (JSGlib.isSet(lastColor)) {
                            left++;
                        }
                    });
                });

                if (maskRectangle) {
                    _addMask(lastColor, maskRectangle.width(left));
                }
                   
                return this;
            };

            this.getCurrentTileNumber = function () {
                /// <summary>Get the number of tile currently displayed.</summary>
                /// <returns type="Number">Number of the tile.</returns>
                if (!this.isTiles()) { return 0; }

                var imageindex = parseInt(_imageindex, 10);

                if (imageindex > _usedTiles.length) {
                    imageindex = 0;
                }

                return _usedTiles[imageindex] || 1;
            };

            this.getCurrentTilePosition = function () {
                /// <summary>Get the position of the tile in the whole image.</summary>
                /// <returns type="JSGlib.Point">Point representing the coordinates of the tile.</returns>
                if (!this.isTiles()) { return new JSGlib.Point(); }

                var currentTileNumber = this.getCurrentTileNumber(),
                    tempTileNumber = 0;
                    
                return JSGlib.forEach(_tiles, function () {
                    return JSGlib.forEach(this, function () {
                        if (++tempTileNumber == currentTileNumber) {
                            return this;
                        }
                    });
                });
            };
        },
        //@end_class Sprite
        /// <field name="Room" static="true" type="Class">A class representing a room.</field>
        //@start_class Room
        Room: function (name, width, height) {
            /// <param name="name" type="String">Name of the room.</param>
            /// <param name="width" type="Number">Width of the room.</param>
            /// <param name="height" type="Number">Height of the room.</param>

            /*==  Private properties  ==*/

            var _name = null,
                _width = 0,
                _height = 0,
                _view = null,
                _viewLinkedElement = null;

            /*==  Public methods  ==*/

            this.getName = function () {
                /// <summary>Get the name of the room.</summary>
                /// <returns type="String">Name of the room.</returns>
                return _name;
            };

            this.getWidth = function () {
                /// <summary>Get the width of the room.</summary>
                /// <returns type="Number">Width of the room.</returns>
                return _width;
            };

            this.getHeight = function () {
                /// <summary>Get the height of the room.</summary>
                /// <returns type="Number">Height of the room.</returns>
                return _height;
            };

            this.view = function (initX, initY, initWidth, initHeight) {
                /// <signature>
                /// <summary>Get the view of the room.</summary>
                /// <returns type="JSGlib.Rectangle">View of the room.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the view of the room.</summary>
                /// <param name="initX" type="Number">Abscissa.</param>
                /// <param name="initY" optional="true" type="Number">Ordinate.</param>
                /// <param name="initWidth" optional="true" type="Number">Width.</param>
                /// <param name="initHeight" optional="true" type="Number">Height.</param>
                /// <returns type="JSGlib.Room">The calling Room object.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the view of the room.</summary>
                /// <param name="point" type="JSGlib.Point">Point to copy.</param>
                /// <param name="initWidth" optional="true" type="Number">Width.</param>
                /// <param name="initHeight" optional="true" type="Number">Height.</param>
                /// <returns type="JSGlib.Room">The calling Room object.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the view of the room.</summary>
                /// <param name="rectangle" type="JSGlib.Rectangle">Rectangle to copy.</param>
                /// <returns type="JSGlib.Room">The calling Room object.</returns>
                /// </signature>
                
                if (initX === undefined) {
                    return _view;
                }
                _view = new JSGlib.Rectangle(initX, initY, initWidth, initHeight);
                return this;
            };

            this.viewLinkedElement = function (element) {
                /// <signature>
                /// <summary>Get the element followed by the view.</summary>
                /// <returns type="JSGlib.Element">The followed element.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Define an element which will be followed by the view.</summary>
                /// <param name="element" type="JSGlib.Element">The element to follow.</param>
                /// <returns type="JSGlib.Room">The calling Room.</returns>
                /// </signature>
                if (element === undefined) {
                    return _viewLinkedElement;
                }
                _viewLinkedElement = element;
				
                if (element) {
					element.getGame()
								.checkElementsForActivation(true);
                }

				return this;
            };

            /*== Event methods: user can define them ==*/

            this.eventStart = function () {
                /// <summary name="eventStart" static="false" type="Event">Event method called after the room is starting.</summary>
            };

            /*== Init room ==*/
            if (width !== undefined) {
                //First signature (no file defintion)
                _name = name;
                _width = width;
                _height = height;
            }
        },
        //@end_class Room
        /// <field name="Point" static="true" type="Class">A class representing a point.</field>
        //@start_class Point
        Point: function (initX, initY) {
            /// <signature>
            /// <param name="initX" optional="true" type="Number">Abscissa.</param>
            /// <param name="initY" optional="true" type="Number">Ordinate.</param>
            /// </signature>
            /// <signature>
            /// <param name="point" optional="true" type="JSGlib.Point">Point to copy.</param>
            /// </signature>
            
            var _x = 0,
                _y = 0;

            this.x = function (x) {
                /// <signature>
                /// <summary>Get the abscissa of the point.</summary>
                /// <returns type="Number">The abscissa of the point.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the abscissa of the point.</summary>
                /// <param name="x" type="Number">The new abcissa.</param>
                /// <returns type="JSGlib.Point">The calling Point.</returns>
                /// </signature>
                if (x === undefined) {
                    return _x;
                }

                _x = parseFloat(x, 10);
                return this;
            };

            this.y = function (y) {
                /// <signature>
                /// <summary>Get the ordinate of the point.</summary>
                /// <returns type="Number">The ordinate of the point.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the ordinate of the point.</summary>
                /// <param name="y" type="Number">The new ordinate.</param>
                /// <returns type="JSGlib.Point">The calling Point.</returns>
                /// </signature>
                if (y === undefined) {
                    return _y;
                }

                _y = parseFloat(y, 10);
                return this;
            };

            this.equals = function (point) {
                /// <summary>Check if the point has same coordinates than the given one.</summary>
                /// <param name="point" type="JSGlib.Point">The point to check.</param>
                /// <returns type="Bool">true if coordinates are equal. false otherwise.</returns>

                if (point instanceof JSGlib.Point) {
                    return this.x() == point.x() && this.y() == point.y();
                }
                return false;
            };

            this.copy = function (point) {
                /// <summary>Copy coordinates of given point.</summary>
                /// <param name="point" type="JSGlib.Point">Point to copy.</param>
                /// <returns type="JSGlib.Point">The calling Point.</returns>

                if (point instanceof JSGlib.Point) {
                    return this.x(point.x()).y(point.y());
                }
                throw new TypeError('Point.copy() -> given point is not an instance of Point.');
            };

            this.add = function (x, y) {
                /// <signature>
                /// <summary>Add given coordinates to calling Point.</summary>
                /// <param name="x" type="Number" optional="true">Abscissa.</param>
                /// <param name="y" type="Number" optional="true">Ordinate.</param>
                /// <returns type="JSGlib.Point">The calling Point.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Add coordinates of given point to calling Point.</summary>
                /// <param name="point" optional="true" type="JSGlib.Point">Point to use.</param>
                /// <returns type="JSGlib.Point">The calling Point.</returns>
                /// </signature>   

                if (x instanceof JSGlib.Point) {
                    return this.x(_x + x.x()).y(_y + x.y());
                } else {
                    return this.x(_x + (x || 0)).y(_y + (y || 0));
                }
            };

            this.substract = function (x, y) {
                /// <signature>
                /// <summary>Substract given coordinates to calling Point.</summary>
                /// <param name="x" type="Number" optional="true">Abscissa.</param>
                /// <param name="y" type="Number" optional="true">Ordinate.</param>
                /// <returns type="JSGlib.Point">The calling Point.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Substract coordinates of given point to calling Point.</summary>
                /// <param name="point" optional="true" type="JSGlib.Point">Point to use.</param>
                /// <returns type="JSGlib.Point">The calling Point.</returns>
                /// </signature>   

                if (x instanceof JSGlib.Point) {
                    return this.x(_x - x.x()).y(_y - x.y());
                } else {
                    return this.x(_x - (x || 0)).y(_y - (y || 0));
                }
                throw new TypeError('Point.substract() -> given point is not an instance of Point.');
            };
            
            this.isInRectangle = function (rectangle) {
                /// <summary>Check if point is in given rectangle</summary>
                /// <param name="rectangle" type="JSGlib.Rectangle">Rectangle to check.</param>
                /// <returns type="Bool">true if point is in the rectangle. false otherwise.</returns>
                var thisX = this.x(),
                    thisY = this.y(),
                    otherX = rectangle.x(),
                    otherY = rectangle.y(),
                    otherW = rectangle.width(),
                    otherH = rectangle.height();
 
                return (thisX >= otherX &&
                    thisX < otherX + otherW &&
                    thisY >= otherY &&
                    thisY < otherY + otherH);
            };

            this.getDistanceTo = function (point) {
                /// <summary>Get the distance between this point and the given one.</summary>
                /// <param name="point" type="JSGlib.Point">Point to check.</param>
                /// <returns type="Number">The distance between both points.</returns>
                return Math.sqrt(Math.pow(_x - point.x(), 2) + Math.pow(_y - point.y(), 2));
            };

            if (initX !== undefined) {
                if (initX instanceof JSGlib.Point) {
                    this.copy(initX);
                } else {
                    this.x(initX).y(initY);
                }
            }
        },
        //@end_class Point
        /// <field name="Rectangle" static="true" type="Class">A class representing a rectangle.</field>
        //@start_class Rectangle
        Rectangle: function (initX, initY, initWidth, initHeight) {
            /// <signature>
            /// <param name="initX" optional="true" type="Number">Abscissa.</param>
            /// <param name="initY" optional="true" type="Number">Ordinate.</param>
            /// <param name="initWidth" optional="true" type="Number">Width.</param>
            /// <param name="initHeight" optional="true" type="Number">Height.</param>
            /// </signature>
            /// <signature>
            /// <param name="point" optional="true" type="JSGlib.Point">Point to copy.</param>
            /// <param name="initWidth" optional="true" type="Number">Width.</param>
            /// <param name="initHeight" optional="true" type="Number">Height.</param>
            /// </signature>
            /// <signature>
            /// <param name="rectangle" optional="true" type="JSGlib.Rectangle">Rectangle to copy.</param>
            /// </signature>
            
            var _position = new JSGlib.Point(),
                _width = 0,
                _height = 0;

            this.position = function (x, y) {
                /// <signature>
                /// <summary>Get the position of the rectangle.</summary>
                /// <returns type="JSGlib.Point">The Point object representing the position of the rectangle.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set a new position to the rectangle.</summary>
                /// <param name="x" optional="true" type="Number">Abscissa.</param>
                /// <param name="y" optional="true" type="Number">Ordinate.</param>
                /// <returns type="JSGlib.Rectangle">The calling Rectangle.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set a new position to the rectangle.</summary>
                /// <param name="point" type="JSGlib.Point">Point to copy.</param>
                /// <returns type="JSGlib.Rectangle">The calling Rectangle.</returns>
                /// </signature>

                if (x === undefined) {
                    return _position;
                } else if (x instanceof JSGlib.Point) {
                    _position.copy(x);
                } else {
                    _position.x(x).y(y);
                }
                return this;
            };

            this.x = function (x) {
                /// <signature>
                /// <summary>Get the abscissa of the rectangle.</summary>
                /// <returns type="Number">The abscissa of the rectangle.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the abscissa of the rectangle.</summary>
                /// <param name="x" type="Number">The new abcissa.</param>
                /// <returns type="JSGlib.Rectangle">The calling Rectangle.</returns>
                /// </signature>
                if (x === undefined) {
                    return _position.x();
                }
                _position.x(x);
                return this;
            };

            this.y = function (y) {
                /// <signature>
                /// <summary>Get the ordinate of the rectangle.</summary>
                /// <returns type="Number">The ordinate of the rectangle.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the ordinate of the rectangle.</summary>
                /// <param name="y" type="Number">The new ordinate.</param>
                /// <returns type="JSGlib.Rectangle">The calling Rectangle.</returns>
                /// </signature>
                if (y === undefined) {
                    return _position.y();
                }
                _position.y(y);
                return this;
            };

            this.width = function (width) {
                /// <signature>
                /// <summary>Get the width of the rectangle.</summary>
                /// <returns type="Number">The width of the rectangle.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the width of the rectangle.</summary>
                /// <param name="width" type="Number">The new width.</param>
                /// <returns type="JSGlib.Rectangle">The calling Rectangle.</returns>
                /// </signature>
                if (width === undefined) {
                    return _width;
                }
                _width = parseInt(width, 10);
                return this;
            };

            this.height = function (height) {
                /// <signature>
                /// <summary>Get the height of the rectangle.</summary>
                /// <returns type="Number">The height of the rectangle.</returns>
                /// </signature>
                /// <signature>
                /// <summary>Set the height of the rectangle.</summary>
                /// <param name="height" type="Number">The new height.</param>
                /// <returns type="JSGlib.Rectangle">The calling Rectangle.</returns>
                /// </signature>
                if (height === undefined) {
                    return _height;
                }
                _height = parseInt(height, 10);
                return this;
            };

            this.getCenter = function () {
                /// <summary>Get the center of the rectangle.</summary>
                /// <returns type="JSGlib.Point">Coordinates of center of the rectangle.</returns>
                return new JSGlib.Point(_position.x() + _width / 2, _position.y() + _height / 2);
            };
            
            this.isCollidedWithRectangle = function (rectangle) {
                /// <summary>Check if rectangle is collided with given rectangle</summary>
                /// <param name="rectangle" type="JSGlib.Rectangle">Rectangle to check.</param>
                /// <returns type="Bool">true if rectangles are collided. false otherwise.</returns>
                var thisX = this.x(),
                    thisY = this.y(),
                    thisW = this.width(),
                    thisH = this.height(),
                    otherX = rectangle.x(),
                    otherY = rectangle.y(),
                    otherW = rectangle.width(),
                    otherH = rectangle.height();

                return !((otherX >= thisX + thisW) || // too right 
                    (otherX + otherW <= thisX) ||     // too left
                    (otherY >= thisY + thisH) ||      // too down
                    (otherY + otherH <= thisY));      // too up
            };
			
            if (initX !== undefined) {
                if (initX instanceof JSGlib.Rectangle) {
                    this.position(initX.position());
                    this.width(initX.width());
                    this.height(initX.height());
                } else if (initX instanceof JSGlib.Point) {
                    this.position(initX);
                    this.width(initY);
                    this.height(initWidth);
                } else {
                    this.position(initX, initY);
                    this.width(initWidth);
                    this.height(initHeight);
                }
            }
        },
        //@end_class Rectangle
        /// <field name="Drawing" static="true" type="Object">An object containing some classes to draw stuffs.</field>
        //@start_class Drawing
        Drawing: {
            /// <field name="BLENDING_MODES" static="true" type="Const">Object containing constants representing blending modes for filters.</field>
            get BLENDING_MODES() {
                return {
                    //@start_const BLENDING_MODES
					NORMAL: 1,
                    DIVIDE: 2,
                    SCREEN: 3,
                    OVERLAY: 4,
                    DODGE: 5,
                    BURN: 6,
                    HARD_LIGHT: 7,
                    GRAIN_EXTRACT: 8,
                    GRAIN_MERGE: 9,
                    AVERAGE: 10,
                    DIFFERENCES: 11,
                    ADDITION: 12,
                    SUBSTRACT: 13,
                    DARKEN_ONLY: 14,
                    LIGHTEN_ONLY: 15,
                    MULTIPLY: 16
					//@end_const
                };
            },
            /// <field name="CANVAS_FILTER" static="true" type="HTMLCanvasElement">HTML canvas object managing filters.</field>
            get CANVAS_FILTER() {
                return canvasFilter;
            },
            /// <field name="CTX_FILTER" static="true" type="CanvasRenderingContext2D">Context 2D of the canvas managing filters.</field>
            get CTX_FILTER() {
                return ctxFilter;
            },
            /// <field name="Object" static="true" type="Class">An abstract class representing a drawing object.</field>
            //@start_class Object
			Object: function () {
                var _opacity = 100,
                    _color = new JSGlib.Color('#000'),
                    _borderColor = '#000',
                    _borderSize = 0;

                this.opacity = function (opacity) {
                    /// <signature>
                    /// <summary>Get the opacity of the drawing object.</summary>
                    /// <returns type="Number">The opacity of the drawing object.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the opacity of the drawing object.</summary>
                    /// <param name="opacity" type="Number">The new opacity.</param>
                    /// <returns type="JSGlib.DrawingObject">The calling drawing object.</returns>
                    /// </signature>
                    if (opacity === undefined) {
                        return _opacity;
                    }
                    _opacity = parseInt(opacity, 10);
                    return this;
                };

                this.color = function (color, isHSL) {
                    /// <signature>
                    /// <summary>Get the color of the drawing object.</summary>
                    /// <returns type="JSGlib.Color">The color of the drawing object.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the color of the drawing object.</summary>
                    /// <param name="color" type="Array[Number]">An array containing the amount of Red, Green and Blue for the new color.</param>
                    /// <param name="isHSL" type="Bool" optional="true">If true, the first parameter will be considered as HSL values and not RGB ones. Default: false.</param>
                    /// <returns type="JSGlib.Drawing.Object">The calling Drawing.Object.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the color of the drawing object.</summary>
                    /// <param name="color" type="JSGlib.Color">The color to copy.</param>
                    /// <returns type="JSGlib.Drawing.Object">The calling Drawing.Object.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the color of the drawing object.</summary>
                    /// <param name="color" type="String">An hexadecimal representation of the color (starting with #) or a color name (red, blue etc.).</param>
                    /// <returns type="JSGlib.Drawing.Object">The calling Drawing.Object.</returns>
                    /// </signature>
                    if (!color) {
                        return _color;
                    }
                    _color = new JSGlib.Color(color, isHSL);
                    return this;
                };

                this.borderColor = function (borderColor, isHSL) {
                    /// <signature>
                    /// <summary>Get the border color of the drawing object.</summary>
                    /// <returns type="JSGlib.Color">The border color of the drawing object.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the border color of the drawing object.</summary>
                    /// <param name="borderColor" type="Array[Number]">An array containing the amount of Red, Green and Blue for the new border color.</param>
                    /// <param name="isHSL" type="Bool" optional="true">If true, the first parameter will be considered as HSL values and not RGB ones. Default: false.</param>
                    /// <returns type="JSGlib.Drawing.Object">The calling Drawing.Object.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the border color of the drawing object.</summary>
                    /// <param name="borderColor" type="JSGlib.Color">The color to copy.</param>
                    /// <returns type="JSGlib.Drawing.Object">The calling Drawing.Object.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the border color of the drawing object.</summary>
                    /// <param name="borderColor" type="String">An hexadecimal representation of the color (starting with #) or a color name (red, blue etc.).</param>
                    /// <returns type="JSGlib.Drawing.Object">The calling Drawing.Object.</returns>
                    /// </signature>
                    if (!borderColor) {
                        return _borderColor;
                    }
                    _borderColor = new JSGlib.Color(borderColor, isHSL);
                    return this;
                };

                this.borderSize = function (borderSize) {
                    /// <signature>
                    /// <summary>Get the border size of the drawing object.</summary>
                    /// <returns type="Number">The border size of the drawing object.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the border size of the drawing object.</summary>
                    /// <param name="borderSize" type="Number">The new border size.</param>
                    /// <returns type="JSGlib.Drawing.Object">The calling Drawing.Object.</returns>
                    /// </signature>
                    if (borderSize === undefined) {
                        return _borderSize;
                    }
                    _borderSize = borderSize;
                    return this;
                };

                this.draw = function () {
                    /// <signature>
                    /// <summary>This method should be overwritted by inherited classes.</summary>
                    /// </signature>
                    throw new Error('Class "Drawing.Object" shouldn\'t be directly called! You should use an inherited class from this one. Or maybe the inherited class doesn\'t overwritte the method draw()?');
                };
            },
			//@end_class Object
            /// <field name="Rectangle" static="true" type="Class">A class representing a drawing rectangle.</field>
            //@start_class Rectangle
			Rectangle: function (width, height) {
                /// <signature>
                /// <param name="width" type="number" optional="true">Width of drawing rectangle. Default: 1.</param>
                /// <param name="height" type="number" optional="true">Height of drawing rectangle. Default: 1.</param>
                /// </signature>

                JSGlib.Drawing.Object.call(this);

                var _width = width || 1,
                    _height = height || 1;

                this.width = function (width) {
                    /// <signature>
                    /// <summary>Get the width of the rectangle.</summary>
                    /// <returns type="Number">The width of the rectangle.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the width of the rectangle.</summary>
                    /// <param name="width" type="Number">The new width.</param>
                    /// <returns type="JSGlib.Drawing.Rectangle">The calling Drawing.Rectangle.</returns>
                    /// </signature>
                    if (width === undefined) {
                        return _width;
                    }
                    _width = parseInt(width, 10);
                    return this;
                };

                this.height = function (height) {
                    /// <signature>
                    /// <summary>Get the height of the rectangle.</summary>
                    /// <returns type="Number">The height of the rectangle.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the height of the rectangle.</summary>
                    /// <param name="height" type="Number">The new height.</param>
                    /// <returns type="JSGlib.Drawing.Rectangle">The calling Drawing.Rectangle.</returns>
                    /// </signature>
                    if (height === undefined) {
                        return _height;
                    }
                    _height = parseInt(height, 10);
                    return this;
                };

                this.draw = function (ctx, fillPosition, strokePosition) {
                    /// <signature>
                    /// <param name="ctx" type="CanvasRenderingContext2D ">Context to draw.</param>
                    /// <summary>Draw the object. This method will be automatically called by JSGlib, you should not call it by yourself!</summary>
                    /// </signature>

                    ctx.fillRect(fillPosition.x(), fillPosition.y(), _width, _height);
                    if (strokePosition) {
                        ctx.strokeRect(strokePosition.x(), strokePosition.y(), _width, _height);
                    }
                };
            },
			//@end_class Rectangle
            /// <field name="Line" static="true" type="Class">A class representing a drawing line.</field>
            //@start_class Line
			Line: function (firstPoint, secondPoint) {
                /// <signature>
                /// <param name="firstPoint" type="JSGlib.Point">First point of the line.</param>
                /// <param name="secondPoint" type="JSGlib.Point">Second point of the line.</param>
                /// </signature>

                JSGlib.Drawing.Object.call(this);

                this.borderSize(1);

                var _firstPoint = new JSGlib.Point(firstPoint),
                    _secondPoint = new JSGlib.Point(secondPoint);

                this.firstPoint = function (firstPoint) {
                    /// <signature>
                    /// <summary>Get the first point of the line.</summary>
                    /// <returns type="JSGlib.Point">The first point of the line.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the first point of the line.</summary>
                    /// <param name="firstPoint" type="JSGlib.Point">The new point.</param>
                    /// <returns type="JSGlib.Drawing.Line">The calling Drawing.Line.</returns>
                    /// </signature>
                    if (!firstPoint) {
                        return _firstPoint;
                    }
                    _firstPoint.copy(firstPoint);
                    return this;
                };

                this.secondPoint = function (secondPoint) {
                    /// <signature>
                    /// <summary>Get the second point of the line.</summary>
                    /// <returns type="JSGlib.Point">The second point of the line.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the second point of the line.</summary>
                    /// <param name="firstPoint" type="JSGlib.Point">The new point.</param>
                    /// <returns type="JSGlib.Drawing.Line">The calling Drawing.Line.</returns>
                    /// </signature>
                    if (!secondPoint) {
                        return _secondPoint;
                    }
                    _secondPoint.copy(secondPoint);
                    return this;
                };

                this.color = function (color, isHSL) {
                    /// <signature>
                    /// <summary>Get the color of the drawing line.</summary>
                    /// <returns type="JSGlib.Color">The color of the drawing line.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the color of the drawing drawing line.</summary>
                    /// <param name="color" type="Array[Number]">An array containing the amount of Red, Green and Blue for the new color.</param>
                    /// <param name="isHSL" type="Bool" optional="true">If true, the first parameter will be considered as HSL values and not RGB ones. Default: false.</param>
                    /// <returns type="JSGlib.Drawing.Line">The calling Drawing.Line.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the color of the drawing line.</summary>
                    /// <param name="color" type="JSGlib.Color">The color to copy.</param>
                    /// <returns type="JSGlib.Drawing.Line">The calling Drawing.Line.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the color of the drawing line.</summary>
                    /// <param name="color" type="String">An hexadecimal representation of the color (starting with #) or a color name (red, blue etc.).</param>
                    /// <returns type="JSGlib.Drawing.Line">The calling Drawing.Line.</returns>
                    /// </signature>
                    return this.borderColor(color, isHSL);
                };

                this.draw = function (ctx, fillPosition, strokePosition) {
                    /// <signature>
                    /// <param name="ctx" type="CanvasRenderingContext2D ">Context to draw.</param>
                    /// <summary>Draw the object. This method will be automatically called by JSGlib, you should not call it by yourself!</summary>
                    /// </signature>

                    if (strokePosition) {
                        var initX = strokePosition.x(),
                            initY = strokePosition.y();

                        ctx.beginPath();
                        ctx.moveTo(initX + _firstPoint.x(), initY + _firstPoint.y());
                        ctx.lineTo(initX + _secondPoint.x(), initY + _secondPoint.y());
                        ctx.stroke();
                    }
                };
            },
			//@end_class Line
            /// <field name="Circle" static="true" type="Class">A class representing a drawing circle.</field>
            //@start_class Circle
			Circle: function (radius) {
                /// <signature>
                /// <param name="radius" type="Number">Radius of the circle.</param>
                /// </signature>

                JSGlib.Drawing.Object.call(this);

                var _radius = radius;

                this.radius = function (radius) {
                    /// <signature>
                    /// <summary>Get the radius of the circle.</summary>
                    /// <returns type="Number">Radius of the circle.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the radius of the circle.</summary>
                    /// <param name="radius" type="Number">The new radius.</param>
                    /// <returns type="JSGlib.Drawing.Circle">The calling Drawing.Circle.</returns>
                    /// </signature>
                    if (!radius) {
                        return _radius;
                    }
                    _radius = radius;
                    return this;
                };

                this.draw = function (ctx, fillPosition, strokePosition) {
                    /// <signature>
                    /// <param name="ctx" type="CanvasRenderingContext2D ">Context to draw.</param>
                    /// <summary>Draw the object. This method will be automatically called by JSGlib, you should not call it by yourself!</summary>
                    /// </signature>
                    ctx.beginPath();
                    ctx.arc(fillPosition.x(), fillPosition.y(), _radius, 0, 360, false);
                    ctx.closePath();

                    ctx.fill();
                    if (strokePosition) {
                        ctx.stroke();
                    }
                };
            },
			//@end_class Circle
            /// <field name="Shape" static="true" type="Class">A class representing a drawing shape.</field>
            //@start_class Shape
			Shape: function (points) {
                /// <signature>
                /// <param name="points" type="Array[JSGlib.Point]">An array of Points composing the shape to draw.</param>
                /// </signature>

                JSGlib.Drawing.Object.call(this);

                var _points = points.slice(0);

                this.points = function (points) {
                    /// <signature>
                    /// <summary>Get the points of the shape.</summary>
                    /// <returns type="Array[JSGlib.Point]">A list of the points of the shape.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the points of the shape.</summary>
                    /// <param name="points" type="Array[JSGlib.Point]">The new points.</param>
                    /// <returns type="JSGlib.Drawing.Shape">The calling Drawing.Shape.</returns>
                    /// </signature>
                    if (!points) {
                        return _points;
                    }
                    _points = points;
                    return this;
                };

                this.draw = function (ctx, fillPosition, strokePosition) {
                    /// <signature>
                    /// <param name="ctx" type="CanvasRenderingContext2D ">Context to draw.</param>
                    /// <summary>Draw the object. This method will be automatically called by JSGlib, you should not call it by yourself!</summary>
                    /// </signature>

                    var initX = fillPosition.x(),
                        initY = fillPosition.y();

                    ctx.beginPath();
                    
                    JSGlib.forEach(_points, function (i) {
                        ctx[i.key > 0 ? 'lineTo' : 'moveTo'](initX + this.x(), initY + this.y());
                    });

                    ctx.closePath();

                    ctx.fill();

                    if (strokePosition) {
                        ctx.stroke();
                    }
                };
            },
			//@end_class Shape
            /// <field name="Text" static="true" type="Class">A class representing a drawing text.</field>
            //@start_class Text
			Text: function (text, font, maxWidth, lineHeight) {
                /// <signature>
                /// <param name="text" type="String" optional="true">Text to write. Use \n to insert break line. Default: ''.</param>
                /// <param name="font" type="String" optional="true">Font of the text. Default: '20px Calibri'.</param>
                /// <param name="maxWidth" type="Number" optional="true">Maximum width of the text. If longer, break lines will automatically be included.<br />Default: 0 (no maximum).</param>
                /// <param name="lineHeight" type="Number" optional="true">Height between each line of the text. Default: 20.</param>
                /// </signature>

                JSGlib.Drawing.Object.call(this);

                var _text = text + '' || '',
                    _font = font || '20px Calibri',
                    _maxWidth = parseInt(maxWidth, 10) || 0,
                    _lineHeight = parseInt(lineHeight, 10) || 20;

                this.text = function (text) {
                    /// <signature>
                    /// <summary>Get the text to write.</summary>
                    /// <returns type="String">The text to write.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the text to write.</summary>
                    /// <param name="text" type="String">Text to write. Use \n to insert break line.</param>
                    /// <returns type="JSGlib.Drawing.Text">The calling Drawing.Text.</returns>
                    /// </signature>
                    if (text === undefined) {
                        return _text;
                    }
                    _text = text + '';
                    return this;
                };

                this.font = function (font) {
                    /// <signature>
                    /// <summary>Get the font of the text.</summary>
                    /// <returns type="String">The font of the text.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the font of the text.</summary>
                    /// <param name="font" type="String">The new font.</param>
                    /// <returns type="JSGlib.Drawing.Text">The calling Drawing.Text.</returns>
                    /// </signature>
                    if (!font) {
                        return _font;
                    }
                    _font = font;
                    return this;
                };

                this.maxWidth = function (maxWidth) {
                    /// <signature>
                    /// <summary>Get the maximum width of the text.</summary>
                    /// <returns type="Number">The maximum width of the text.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the maximum width of the text.</summary>
                    /// <param name="maxWidth" type="Number">The new maximum width.</param>
                    /// <returns type="JSGlib.Drawing.Text">The calling Drawing.Text.</returns>
                    /// </signature>
                    if (maxWidth === undefined) {
                        return _maxWidth;
                    }
                    _maxWidth = parseInt(maxWidth, 10);
                    return this;
                };

                this.lineHeight = function (lineHeight) {
                    /// <signature>
                    /// <summary>Get the line height of the text.</summary>
                    /// <returns type="Number">The line height of the text.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the line height of the text.</summary>
                    /// <param name="lineHeight" type="Number">The new line height.</param>
                    /// <returns type="JSGlib.Drawing.Text">The calling Drawing.Text.</returns>
                    /// </signature>
                    if (lineHeight === undefined) {
                        return _lineHeight;
                    }
                    _lineHeight = parseInt(lineHeight, 10);
                    return this;
                };

                this.getLines = function () {
                    /// <signature>
                    /// <summary>Cut the text and get its lines one by one.</summary>
                    /// <returns type="Array[String]">An array containing all the lines of the text.</returns>
                    /// </signature>
                    
                    var lines = _text.split('\n'),
                        tempCtx = document.createElement('canvas').getContext('2d');

                    tempCtx.textBaseline = 'top';
                    tempCtx.font = _font;
                    tempCtx.lineWidth = this.borderSize();

                    if (_maxWidth > 0) {
                        JSGlib.forEach(lines, function (i) {
                            var widthText = tempCtx.measureText(this).width,
                                tempLine = '',
                                start = -1,
                                tempText = '',
                                tempChar = '',
                                words = [],
                                totalWords = 0;

                            if (widthText > _maxWidth) {

                                words = this.split(' ');
                                totalWords = words.length;

                                do
                                {
                                    tempText = tempChar;
                                    tempChar += words[++start] + ' ';

                                    if (tempCtx.measureText(tempChar).width > _maxWidth || start == totalWords) {
                                        tempLine += tempText + '\n';
                                        tempChar = words[start] + ' ';
                                    }
                                } while (start < widthText);

                                lines[i.key] = tempLine;

                            } else {
                                lines[i.key] += '\n';
                            }
                        });
                    }

                    return lines;
                };

                this.numberOfLines = function () {
                    /// <signature>
                    /// <summary>Get the number of lines of the text.</summary>
                    /// <returns type="Number">Number of lines of the text.</returns>
                    /// </signature>

                    return this.getLines().length;
                };

                this.getWidth = function () {
                    /// <signature>
                    /// <summary>Get the width of the text.</summary>
                    /// <returns type="Number">Width of the text.</returns>
                    /// </signature>

                    var tempCtx = document.createElement('canvas').getContext('2d'),
                        width = 0;

                    tempCtx.textBaseline = 'top';
                    tempCtx.font = _font;
                    tempCtx.lineWidth = this.borderSize();

                    width = tempCtx.measureText(_text).width;

                    return _maxWidth < width && _maxWidth > 0 ? maxWidth : width;
                };

                this.getHeight = function () {
                    /// <signature>
                    /// <summary>Get the height of the text.</summary>
                    /// <returns type="Number">Height of the text.</returns>
                    /// </signature>

                    return this.numberOfLines() * _lineHeight;
                };

                this.draw = function (ctx, fillPosition, strokePosition) {
                    /// <signature>
                    /// <param name="ctx" type="CanvasRenderingContext2D ">Context to draw.</param>
                    /// <summary>Draw the object. This method will be automatically called by JSGlib, you should not call it by yourself!</summary>
                    /// </signature>
                    
                    var strokeX = strokePosition ? strokePosition.x() : 0,
                        strokeY = strokePosition ? strokePosition.y() : 0,
                        fillX = fillPosition.x(),
                        fillY = fillPosition.y();

                    ctx.font = _font;

                    JSGlib.forEach(this.getLines(), function (i) {
                        if (strokePosition) {
                            ctx.strokeText(this, strokeX, strokeY + (i.key * _lineHeight) + _lineHeight);
                        }

                        ctx.fillText(this, fillX, fillY + (i.key * _lineHeight) + _lineHeight);
                    });
                };
            },
			//@end_class Text
            /// <field name="Sprite" static="true" type="Class">A class representing a drawing sprite.</field>
            //@start_class Sprite
			Sprite: function (sprite) {
                /// <signature>
                /// <param name="sprite" type="JSGlib.Sprite">Sprite to draw.</param>
                /// </signature>

                JSGlib.Drawing.Object.call(this);

                var _sprite = sprite,
                    _filter = null;

                this.sprite = function (sprite) {
                    /// <signature>
                    /// <summary>Get the sprite of the drawing object.</summary>
                    /// <returns type="JSGlib.Sprite">The sprite to draw.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the sprite of the drawing object.</summary>
                    /// <param name="sprite" type="JSGlib.Sprite">The new sprite.</param>
                    /// <returns type="JSGlib.Drawing.Sprite">The calling drawing object.</returns>
                    /// </signature>
                    if (!sprite) {
                        return _sprite;
                    }
                    _sprite = sprite;

                    return this;
                };

                this.filter = function (filter) {
                    /// <signature>
                    /// <summary>Get the filter of the drawing sprite.</summary>
                    /// <returns type="JSGlib.Drawing.Filter">The filter of the drawing sprite.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the filter of the drawing sprite.</summary>
                    /// <param name="filter" type="JSGlib.Drawing.Filter">The new filter.</param>
                    /// <returns type="JSGlib.Drawing.Sprite">The calling Drawing.Sprite.</returns>
                    /// </signature>
                    if (!filter) {
                        return _filter;
                    }
                    _filter = filter;
                    return this;
                };

                this.draw = function (ctx, fillPosition) {
                    /// <signature>
                    /// <param name="ctx" type="CanvasRenderingContext2D ">Context to draw.</param>
                    /// <summary>Draw the object. This method will be automatically called by JSGlib, you should not call it by yourself!</summary>
                    /// </signature>
                    var spritePosition = new JSGlib.Point(0, 0),
                        width = _sprite.getTilesWidth(),
                        height = _sprite.getTilesHeight(),
                        spriteX = 0,
                        spriteY = 0,
                        spriteImage = _sprite.getImage();

                    _sprite.animate();

                    if (_sprite.isTiles()) {
                        spritePosition.copy(_sprite.getCurrentTilePosition());
                    }

                    spriteX = spritePosition.x();
                    spriteY = spritePosition.y();

                    ctx.drawImage(spriteImage, spriteX, spriteY, width, height,
                                            fillPosition.x(), fillPosition.y(), width, height);

                    if (_filter) {
                        JSGlib.Drawing.CANVAS_FILTER.width = width;
                        JSGlib.Drawing.CANVAS_FILTER.height = height;
                        JSGlib.Drawing.CTX_FILTER.drawImage(spriteImage, spriteX, spriteY,
                                            width, height, 0, 0, width, height);

                        _filter.draw(ctx, fillPosition);
                    }
                };
            },
			//@end_class Sprite
            /// <field name="Filter" static="true" type="Class">A class representing a drawing filter.</field>
            //@start_class Filter
			Filter: function (mode) {
                /// <signature>
                /// <param name="mode" type="JSGlib.Drawing.MODE">Blending mode of the filter.</param>
                /// </signature>

                JSGlib.Drawing.Object.call(this);

                var _mode = mode || 1;

                this.mode = function (mode) {
                    /// <signature>
                    /// <summary>Get the blending mode of the filter.</summary>
                    /// <returns type="JSGlib.Drawing.MODE">The blending mode.</returns>
                    /// </signature>
                    /// <signature>
                    /// <summary>Set the blending mode of the filter.</summary>
                    /// <param name="sprite" type="JSGlib.Drawing.MODE">The new blending mode.</param>
                    /// <returns type="JSGlib.Drawing.Filter">The calling drawing filter.</returns>
                    /// </signature>
                    if (!mode) {
                        return _mode;
                    }
                    _mode = mode;

                    return this;
                };

                this.draw = function (ctx, fillPosition) {
                    /// <signature>
                    /// <param name="ctx" type="CanvasRenderingContext2D ">Context to draw.</param>
                    /// <summary>Draw the object. This method will be automatically called by JSGlib, you should not call it by yourself!</summary>
                    /// </signature>
                    
                    var imgData = JSGlib.Drawing.CTX_FILTER.getImageData(0, 0, JSGlib.Drawing.CANVAS_FILTER.width, JSGlib.Drawing.CANVAS_FILTER.height),
                        index = 0,
                        length = imgData.data.length,
                        color = new JSGlib.Color(this.color()),
                        thisColor = color.getRGB(),
                        blendingFunction = (function () {
                            // Thanks to http://docs.gimp.org/en/gimp-concepts-layer-modes.html for these modes!
                            switch (_mode) {
                            case JSGlib.Drawing.BLENDING_MODES.MULTIPLY:
                                return function (red, green, blue) {
                                    return {
                                        red: red * thisColor.red / 255,
                                        green: green * thisColor.green / 255,
                                        blue: blue * thisColor.blue / 255
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.DIVIDE:
                                return function (red, green, blue) {
                                    return {
                                        red: Math.min(255, (256 * red) / (thisColor.red + 1)),
                                        green: Math.min(255, (256 * green) / (thisColor.green + 1)),
                                        blue: Math.min(255, (256 * blue) / (thisColor.blue + 1))
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.SCREEN:
                                return function (red, green, blue) {
                                    return {
                                        red: 255 - (((255 - thisColor.red) * (255 - red)) / 255),
                                        green: 255 - (((255 - thisColor.green) * (255 - green)) / 255),
                                        blue: 255 - (((255 - thisColor.blue) * (255 - blue)) / 255)
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.OVERLAY:
                                return function (red, green, blue) {
                                    return {
                                        red: (red / 255) * (red + ((2 * thisColor.red) / 255) * (255 - red)),
                                        green: (green / 255) * (green + ((2 * thisColor.green) / 255) * (255 - green)),
                                        blue: (blue / 255) * (blue + ((2 * thisColor.blue) / 255) * (255 - blue))
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.DODGE:
                                return function (red, green, blue) {
                                    return {
                                        red: Math.min(255, (red * 256) / (255 - thisColor.red + 1)),
                                        green: Math.min(255, (green * 256) / (255 - thisColor.green + 1)),
                                        blue: Math.min(255, (blue * 256) / (255 - thisColor.blue + 1))
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.BURN:
                                return function (red, green, blue) {
                                    return {
                                        red: Math.max(0, 255 - ((256 * (255 - red)) / (thisColor.red + 1))),
                                        green: Math.max(0, 255 - ((256 * (255 - green)) / (thisColor.green + 1))),
                                        blue: Math.max(0, 255 - ((256 * (255 - blue)) / (thisColor.blue + 1)))
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.HARD_LIGHT:
                                return function (red, green, blue) {
                                    return {
                                        red: thisColor.red > 128 ? (255 - ((255 - 2 * (thisColor.red - 128)) * (255 - red)) / 256) : Math.min(255, (2 * thisColor.red * red) / 256),
                                        green: thisColor.green > 128 ? (255 - ((255 - 2 * (thisColor.green - 128)) * (255 - green)) / 256) : Math.min(255, (2 * thisColor.green * green) / 256),
                                        blue: thisColor.blue > 128 ? (255 - ((255 - 2 * (thisColor.blue - 128)) * (255 - blue)) / 256) : Math.min(255, (2 * thisColor.blue * blue) / 256)
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.GRAIN_EXTRACT:
                                return function (red, green, blue) {
                                    return {
                                        red: Math.min(255, Math.max(0, red - thisColor.red + 128)),
                                        green: Math.min(255, Math.max(0, green - thisColor.green + 128)),
                                        blue: Math.min(255, Math.max(0, blue - thisColor.blue + 128))
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.GRAIN_MERGE:
                                return function (red, green, blue) {
                                    return {
                                        red: Math.min(255, Math.max(0, red + thisColor.red - 128)),
                                        green: Math.min(255, Math.max(0, green + thisColor.green - 128)),
                                        blue: Math.min(255, Math.max(0, blue + thisColor.blue - 128))
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.AVERAGE:
                                return function (red, green, blue) {
                                    return {
                                        red: (red + thisColor.red) / 2,
                                        green: (green + thisColor.green) / 2,
                                        blue: (blue + thisColor.blue) / 2
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.DIFFERENCES:
                                return function (red, green, blue) {
                                    return {
                                        red: Math.abs(red - thisColor.red),
                                        green: Math.abs(green - thisColor.green),
                                        blue: Math.abs(blue - thisColor.blue)
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.ADDITION:
                                return function (red, green, blue) {
                                    return {
                                        red: Math.min(255, red + thisColor.red),
                                        green: Math.min(255, green + thisColor.green),
                                        blue: Math.min(255, blue + thisColor.blue)
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.SUBSTRACT:
                                return function (red, green, blue) {
                                    return {
                                        red: Math.max(0, red - thisColor.red),
                                        green: Math.max(0, green - thisColor.green),
                                        blue: Math.max(0, blue - thisColor.blue)
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.DARKEN_ONLY:
                                return function (red, green, blue) {
                                    return {
                                        red: Math.min(red, thisColor.red),
                                        green: Math.min(green, thisColor.green),
                                        blue: Math.min(blue, thisColor.blue)
                                    };
                                };

                            case JSGlib.Drawing.BLENDING_MODES.LIGHTEN_ONLY:
                                return function (red, green, blue) {
                                    return {
                                        red: Math.max(red, thisColor.red),
                                        green: Math.max(green, thisColor.green),
                                        blue: Math.max(blue, thisColor.blue)
                                    };
                                };

                            default:
                                return function () {
                                    return {
                                        red: thisColor.red,
                                        green: thisColor.green,
                                        blue: thisColor.blue
                                    };
                                };
                            }
                        })();

                    //Check each pixel...
                    for (; index < length; index += 4) {
                        if (imgData.data[index + 3] > 0) {   
                            color = blendingFunction(imgData.data[index], imgData.data[index + 1], imgData.data[index + 2]);
                            imgData.data[index] = color.red;
                            imgData.data[index + 1] = color.green;
                            imgData.data[index + 2] = color.blue;
                        }
                    }
                    JSGlib.Drawing.CTX_FILTER.putImageData(imgData, 0, 0);

                    ctx.globalAlpha = this.opacity() / 100;

                    ctx.drawImage(JSGlib.Drawing.CANVAS_FILTER, 0, 0, JSGlib.Drawing.CANVAS_FILTER.width, JSGlib.Drawing.CANVAS_FILTER.height,
                                            fillPosition.x(), fillPosition.y(), JSGlib.Drawing.CANVAS_FILTER.width, JSGlib.Drawing.CANVAS_FILTER.height);
                };
            }
			//@end_class Filter
        },
        //@end_class Drawing
		/// <field name="Color" static="true" type="Class">A class representing a color.</field>
        //@start_class Color
        Color: function (color, isHSL) {
            /// <signature>
            /// <param name="color" type="Array[Number]">An array containing the amount of Red, Green and Blue for the new color.</param>
            /// <param name="isHSL" type="Bool" optional="true">If true, the first parameter will be considered as HSL values and not RGB ones. Default: false.</param>
            /// </signature>
            /// <signature>
            /// <param name="color" type="JSGlib.Color">The color to copy.</param>
            /// </signature>
            /// <signature>
            /// <param name="color" type="String">An hexadecimal representation of the color (starting with #) or a color name (red, blue etc.).</param>
            /// </signature>

            var _red = 0,
                _green = 0,
                _blue = 0,
                _hue = 0,
                _saturation = 0,
                _lightness = 0,
                _hexadecimal = null,
                
                //Thanks to http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL for this algorithm!
                _generateRGB = function () {
                    var lightness = _lightness / 100,
                        saturation = _saturation / 100,
                        hue = _hue / 60,
                        chroma = (1 - Math.abs(2 * lightness - 1)) * saturation,
                        x = chroma * (1 - Math.abs(hue % 2 - 1)),
                        m = lightness - chroma / 2;

                    if (hue >= 0 && hue < 1) {
                        _red = chroma;
                        _green = x;
                        _blue = 0;
                    } else if (hue >= 1 && hue < 2) {
                        _red = x;
                        _green = chroma;
                        _blue = 0;
                    } else if (hue >= 2 && hue < 3) {
                        _red = 0;
                        _green = chroma;
                        _blue = x;
                    } else if (hue >= 3 && hue < 4) {
                        _red = 0;
                        _green = x;
                        _blue = chroma;
                    } else if (hue >= 4 && hue < 5) {
                        _red = x;
                        _green = 0;
                        _blue = chroma;
                    } else if (hue >= 5 && hue < 6) {
                        _red = chroma;
                        _green = 0;
                        _blue = x;
                    } else {
                        _red = 0;
                        _green = 0;
                        _blue = 0;
                    }

                    _red = Math.round((_red + m) * 255);
                    _green = Math.round((_green + m) * 255);
                    _blue = Math.round((_blue + m) * 255);
                    _hexadecimal = null;
                },

                //Thanks to http://www.easyrgb.com/ for this algorithm!
                _generateHSL = function () {
                    var red = (_red / 255),
                        green = (_green / 255),
                        blue = (_blue / 255),

                        min = Math.min(red, green, blue),
                        max = Math.max(red, green, blue),
                        deltaMax = max - min,
                        deltaRed = 0,
                        deltaGreen = 0,
                        deltaBlue = 0;

                    _lightness = (min + max) / 2;

                    if (deltaMax === 0) {
                        //Gray
                        _hue = 0;
                        _saturation = 0;
                    }
                    else {
                        //Chromatic data
                        if (_lightness < 0.5) {
                            _saturation = deltaMax / (max + min);
                        } else {
                            _saturation = deltaMax / (2 - max - min);
                        }

                        deltaRed = (((max - red) / 6) + (deltaMax / 2)) / deltaMax;
                        deltaGreen = (((max - green) / 6) + (deltaMax / 2)) / deltaMax;
                        deltaBlue = (((max - blue) / 6) + (deltaMax / 2)) / deltaMax;

                        if (red == max) {
                            _hue = deltaBlue - deltaGreen;
                        } else if (green == max) {
                            _hue = (1 / 3) + deltaRed - deltaBlue;
                        } else if (blue == max) {
                            _hue = (2 / 3) + deltaGreen - deltaRed;
                        }

                        if (_hue < 0) {
                            _hue += 1;
                        } else if (_hue > 1) {
                            _hue -= 1;
                        }

                        _hue = parseInt(Math.round(_hue * 360), 10);
                        _saturation = parseInt(Math.round(_saturation * 100), 10);
                    }

                    _lightness = parseInt(Math.round(_lightness * 100), 10);
                    _hexadecimal = null;
                };

            this.getHexadecimal = function () {
                /// <summary>Get the hexadecimal representation of the color.</summary>
                /// <returns type="String">The hexadecimal representation of the color (starting with #).</returns>
                if (!_hexadecimal) {
                    var red = _red.toString(16),
                        green = _green.toString(16),
                        blue = _blue.toString(16);


                    _hexadecimal = '#' + ((red.length < 2 ? '0' + red : red) +
                                          (green.length < 2 ? '0' + green : green) +
                                          (blue.length < 2 ? '0' + blue : blue)).toLowerCase();
                }

                return _hexadecimal;
            };

            this.getRGB = function () {
                /// <summary>Get the RGB representation of the color.</summary>
                /// <returns type="Object">An object containing the properties "red", "green" and "blue".</returns>
                return {
                    red: _red,
                    green: _green,
                    blue: _blue
                };
            };

            this.getHSL = function () {
                /// <summary>Get the HSL representation of the color.</summary>
                /// <returns type="Object">An object containing the properties "hue", "saturation" and "lightness".</returns>
                return {
                    hue: _hue,
                    saturation: _saturation,
                    lightness: _lightness
                };
            };

            this.setRed = function (amount, isRelative) {
                /// <summary>Change the amount of red in the color.</summary>
                /// <param name="amount" type="Number">The new amount of red. [0 - 255]</param>
                /// <param name="isRelative" type="Bool" optional="true">If true, the first parameter will be added to the current amount of red instead of replace it. Default: false.</param>
                /// <returns type="JSGlib.Color">The calling JSGlib.Color.</returns>
                var old = _red;
                if (isRelative) {
                    _red += amount;
                } else {
                    _red = amount;
                }
                _red = Math.min(255, Math.max(0, parseInt(_red, 10)));

                if (old != _red) {
                    _generateHSL();
                }

                return this;
            };

            this.setGreen = function (amount, isRelative) {
                /// <summary>Change the amount of green in the color.</summary>
                /// <param name="amount" type="Number">The new amount of green. [0 - 255]</param>
                /// <param name="isRelative" type="Bool" optional="true">If true, the first parameter will be added to the current amount of green instead of replace it. Default: false.</param>
                /// <returns type="JSGlib.Color">The calling JSGlib.Color.</returns>
                var old = _green;
                if (isRelative) {
                    _green += amount;
                } else {
                    _green = amount;
                }
                _green = Math.min(255, Math.max(0, parseInt(_green, 10)));

                if (old != _green) {
                    _generateHSL();
                }

                return this;
            };

            this.setBlue = function (amount, isRelative) {
                /// <summary>Change the amount of blue in the color.</summary>
                /// <param name="amount" type="Number">The new amount of blue. [0 - 255]</param>
                /// <param name="isRelative" type="Bool" optional="true">If true, the first parameter will be added to the current amount of blue instead of replace it. Default: false.</param>
                /// <returns type="JSGlib.Color">The calling JSGlib.Color.</returns>
                var old = _blue;
                if (isRelative) {
                    _blue += amount;
                } else {
                    _blue = amount;
                }
                _blue = Math.min(255, Math.max(0, parseInt(_blue, 10)));

                if (old != _blue) {
                    _generateHSL();
                }

                return this;
            };

            this.setHue = function (value, isRelative) {
                /// <summary>Change the hue of the color.</summary>
                /// <param name="value" type="Number">The new value of the hue. [0 - 359]</param>
                /// <param name="isRelative" type="Bool" optional="true">If true, the first parameter will be added to the current hue instead of replace it. Default: false.</param>
                /// <returns type="JSGlib.Color">The calling JSGlib.Color.</returns>
                var old = _hue;
                if (isRelative) {
                    _hue += value;
                } else {
                    _hue = value;
                }
                _hue = Math.min(359, Math.max(0, parseInt(_hue, 10)));

                if (old != _hue) {
                    _generateRGB();
                }

                return this;
            };

            this.setSaturation = function (value, isRelative) {
                /// <summary>Change the saturation of the color.</summary>
                /// <param name="value" type="Number">The new value of the saturation. [0 - 100]</param>
                /// <param name="isRelative" type="Bool" optional="true">If true, the first parameter will be added to the current saturation instead of replace it. Default: false.</param>
                /// <returns type="JSGlib.Color">The calling JSGlib.Color.</returns>
                var old = _saturation;
                if (isRelative) {
                    _saturation += value;
                } else {
                    _saturation = value;
                }
                _saturation = Math.min(100, Math.max(0, parseInt(_saturation, 10)));

                if (old != _saturation) {
                    _generateRGB();
                }

                return this;
            };

            this.setLightness = function (value, isRelative) {
                /// <summary>Change the lightness of the color.</summary>
                /// <param name="value" type="Number">The new value of the lightness. [0 - 100]</param>
                /// <param name="isRelative" type="Bool" optional="true">If true, the first parameter will be added to the current lightness instead of replace it. Default: false.</param>
                /// <returns type="JSGlib.Color">The calling JSGlib.Color.</returns>
                var old = _lightness;
                if (isRelative) {
                    _lightness += value;
                } else {
                    _lightness = value;
                }
                _lightness = Math.min(100, Math.max(0, parseInt(_lightness, 10)));

                if (old != _lightness) {
                    _generateRGB();
                }

                return this;
            };
			
			this.equals = function (color) {
                /// <summary>Check if color is the same than the given one.</summary>
                /// <param name="color" type="JSGlib.Color">Color to check.</param>
                /// <returns type="Bool">true if colors are equal. false otherwise.</returns>
                
                return color ? (color.getHexadecimal ? this.getHexadecimal() == color.getHexadecimal() : false) : false;
            };
            
            //Init color
            if (color instanceof Array) {
                //First signature
                if (isHSL) {
                    _hue = color[0];
                    _saturation = color[1];
                    _lightness = color[2];
                    _generateRGB();
                } else {
                    _red = color[0];
                    _green = color[1];
                    _blue = color[2];
                    _generateHSL();
                }
            } else if (color instanceof JSGlib.Color) {
                //Second signature
                _red = color.getRGB();
                _green = _red.green;
                _blue = _red.blue;
                _red = _red.red,

                _hue = color.getHSL();
                _saturation = _hue.saturation;
                _lightness = _hue.lightness;
                _hue = _hue.hue;
            } else {
                //Third signature
                color = color.toUpperCase();

                if (JSGlib.Color.NAMES[color]) {
                    //Color name
                    color = JSGlib.Color.NAMES[color];
                } else if (color.charAt(0) != '#') {
                    throw new Error('new Color() -> color "' + color + '" is not a valid color.');
                }

                //We now have the hexadecimal representation of the color: now we get its RGB.
                color = color.substr(1).toLowerCase();
                if (color.length == 3) {
                    _red = parseInt(color.charAt(0) + color.charAt(0), 16);
                    _green = parseInt(color.charAt(1) + color.charAt(1), 16);
                    _blue = parseInt(color.charAt(2) + color.charAt(2), 16);
                } else {
                    _red = parseInt(color.charAt(0) + color.charAt(1), 16);
                    _green = parseInt(color.charAt(2) + color.charAt(3), 16);
                    _blue = parseInt(color.charAt(4) + color.charAt(5), 16);
                }
                _generateHSL();
            }
        }
    };

	/// <field name="NAMES" static="true" type="Const">Object containing constants for several colors names.</field>
    Object.defineProperty(JSGlib.Color, 'NAMES', {
        get: function () {
            return {
                //@start_const NAMES
                ALICEBLUE: '#f0f8ff',
                ANTIQUEWHITE: '#faebd7',
                AQUA: '#0ff',
                AQUAMARINE: '#7fffd4',
                AZURE: '#f0ffff',
                BEIGE: '#f5f5dc',
                BISQUE: '#ffe4c4',
                BLACK: '#000',
                BLANCHEDALMOND: '#ffebcd',
                BLUE: '#00f',
                BLUEVIOLET: '#8a2be2',
                BROWN: '#a52a2a',
                BURLYWOOD: '#deb887',
                CADETBLUE: '#5f9ea0',
                CHARTREUSE: '#7fff00',
                CHOCOLATE: '#d2691e',
                CORAL: '#ff7f50',
                CORNFLOWERBLUE: '#6495ed',
                CORNSILK: '#fff8dc',
                CRIMSON: '#dc143c',
                CYAN: '#0ff',
                DARKBLUE: '#00008b',
                DARKCYAN: '#008b8b',
                DARKGOLDENROD: '#b8860b',
                DARKGRAY: '#a9a9a9',
                DARKGREY: '#a9a9a9',
                DARKGREEN: '#006400',
                DARKKHAKI: '#bdb76b',
                DARKMAGENTA: '#8b008b',
                DARKOLIVEGREEN: '#556b2f',
                DARKORANGE: '#ff8c00',
                DARKORCHID: '#9932cc',
                DARKRED: '#8b0000',
                DARKSALMON: '#e9967a',
                DARKSEAGREEN: '#8fbc8f',
                DARKSLATEBLUE: '#483d8b',
                DARKSLATEGRAY: '#2f4f4f',
                DARKSLATEGREY: '#2f4f4f',
                DARKTURQUOISE: '#00ced1',
                DARKVIOLET: '#9400d3',
                DEEPPINK: '#ff1493',
                DEEPSKYBLUE: '#00bfff',
                DIMGRAY: '#696969',
                DIMGREY: '#696969',
                DODGERBLUE: '#1e90ff',
                FIREBRICK: '#b22222',
                FLORALWHITE: '#fffaf0',
                FORESTGREEN: '#228b22',
                FUCHSIA: '#f0f',
                GAINSBORO: '#dcdcdc',
                GHOSTWHITE: '#f8f8ff',
                GOLD: '#ffd700',
                GOLDENROD: '#daa520',
                GRAY: '#808080',
                GREY: '#808080',
                GREEN: '#008000',
                GREENYELLOW: '#adff2f',
                HONEYDEW: '#f0fff0',
                HOTPINK: '#ff69b4',
                INDIANRED: '#cd5c5c',
                INDIGO: '#4b0082',
                IVORY: '#fffff0',
                KHAKI: '#f0e68c',
                LAVENDER: '#e6e6fa',
                LAVENDERBLUSH: '#fff0f5',
                LAWNGREEN: '#7cfc00',
                LEMONCHIFFON: '#fffacd',
                LIGHTBLUE: '#add8e6',
                LIGHTCORAL: '#f08080',
                LIGHTCYAN: '#e0ffff',
                LIGHTGOLDENRODYELLOW: '#fafad2',
                LIGHTGRAY: '#d3d3d3',
                LIGHTGREY: '#d3d3d3',
                LIGHTGREEN: '#90ee90',
                LIGHTPINK: '#ffb6c1',
                LIGHTSALMON: '#ffa07a',
                LIGHTSEAGREEN: '#20b2aa',
                LIGHTSKYBLUE: '#87cefa',
                LIGHTSLATEGRAY: '#778899',
                LIGHTSLATEGREY: '#778899',
                LIGHTSTEELBLUE: '#b0c4de',
                LIGHTYELLOW: '#ffffe0',
                LIME: '#0f0',
                LIMEGREEN: '#32cd32',
                LINEN: '#faf0e6',
                MAGENTA: '#f0f',
                MAROON: '#800000',
                MEDIUMAQUAMARINE: '#66cdaa',
                MEDIUMBLUE: '#0000cd',
                MEDIUMORCHID: '#ba55d3',
                MEDIUMPURPLE: '#9370db',
                MEDIUMSEAGREEN: '#3cb371',
                MEDIUMSLATEBLUE: '#7b68ee',
                MEDIUMSPRINGGREEN: '#00fa9a',
                MEDIUMTURQUOISE: '#48d1cc',
                MEDIUMVIOLETRED: '#c71585',
                MIDNIGHTBLUE: '#191970',
                MINTCREAM: '#f5fffa',
                MISTYROSE: '#ffe4e1',
                MOCCASIN: '#ffe4b5',
                NAVAJOWHITE: '#ffdead',
                NAVY: '#000080',
                OLDLACE: '#fdf5e6',
                OLIVE: '#808000',
                OLIVEDRAB: '#6b8e23',
                ORANGE: '#ffA500',
                ORANGERED: '#ff4500',
                ORCHID: '#da70d6',
                PALEGOLDENROD: '#eee8aa',
                PALEGREEN: '#98fb98',
                PALETURQUOISE: '#afeeee',
                PALEVIOLETRED: '#db7093',
                PAPAYAWHIP: '#ffefd5',
                PEACHPUFF: '#ffdab9',
                PERU: '#cd853f',
                PINK: '#ffc0cb',
                PLUM: '#dda0dd',
                POWDERBLUE: '#b0e0e6',
                PURPLE: '#800080',
                RED: '#f00',
                ROSYBROWN: '#bc8f8f',
                ROYALBLUE: '#4169e1',
                SADDLEBROWN: '#8b4513',
                SALMON: '#fa8072',
                SANDYBROWN: '#f4a460',
                SEAGREEN: '#2e8b57',
                SEASHELL: '#fff5ee',
                SIENNA: '#a0522d',
                SILVER: '#c0c0c0',
                SKYBLUE: '#87ceeb',
                SLATEBLUE: '#6a5acd',
                SLATEGRAY: '#708090',
                SLATEGREY: '#708090',
                SNOW: '#fffafa',
                SPRINGGREEN: '#00ff7f',
                STEELBLUE: '#4682b4',
                TAN: '#d2b48c',
                TEAL: '#008080',
                THISTLE: '#d8bfd8',
                TOMATO: '#ff6347',
                TURQUOISE: '#40e0D0',
                VIOLET: '#ee82ee',
                WHEAT: '#f5deb3',
                WHITE: '#fff',
                WHITESMOKE: '#f5f5f5',
                YELLOW: '#ff0',
                YELLOWGREEN: '#9acd32'
                //@end_const
            };
        }
    });
	//@end_class Color
    
    window.JSGlib = JSGlib;
})(window, document);