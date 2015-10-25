(function (Game) {
    'use strict';
	
	var	SHADOWS_OPACITY	=	95,
			OBJECTIVE					=	20,
			START_TIMER				=	5000,
			TYPES_BOOS				=	['NormalBoos', 'CrazyBoos', 'HappyBoos', 'Eerie', 'MarioBoos', 'GentleBoos'],
			
			_end								=	false,
			
			_is_flash						=	false,
			_target							=	null,
			_targetObject					=	null,
			_spanTarget					=	document.getElementById('target'),
			_spanLabelTarget			=	document.getElementById('label_target'),
			_spanTimer					=	document.getElementById('timer'),
			_timer							=	0,
			_timerClock					=	null,
			
			_totalKilledBoos				=	0,
			_controlorObject			=	null,
			
			_getRandomBoo			=	function () {
				return TYPES_BOOS[JSGlib.random(0, TYPES_BOOS.length - 1)];
			},
			
			_selectNextTarget			=	function () {
				do {
					_target			=	_getRandomBoo();
				} while (Game.instanceNumber(_target) < 1);
				
				_targetObject	=	Game.getInstancesByType(_target)[0];
				_timer			=	START_TIMER;
			},
			
			_createBoo					=	function () {
				Game.instanceCreate(
					Game.callStatic('Controlor', 'randomCreationPoint'),
					_getRandomBoo()
				);
			},
			
			_createEctofeu				=	function () {
				Game.instanceCreate(
					Game.callStatic('Controlor', 'randomCreationPoint'),
					'Ectofeux'
				);
			},
			
			_destroyEctofeu			=	function () {
				var	ectofeux	=	Game.getInstancesByType('Ectofeux');
				if (ectofeux.length > 0) {
					ectofeux[0].destroy();
				}
			};			

	Game.addClass({
        name: 'Controlor',
        eventCreate: function () {
            
			_controlorObject	=	this;
			
			var	currentRoom	=	Game.getCurrentRoom(),
					roomWidth	=	currentRoom.getWidth(),
					roomHeight	=	currentRoom.getHeight();
			
			this.background	=	new JSGlib.Drawing.Rectangle(roomWidth, roomHeight);
			this.foreground	=	new JSGlib.Drawing.Rectangle(roomWidth, roomHeight)
													.opacity(SHADOWS_OPACITY);
													
			this.mouseLight	=	new JSGlib.Drawing.Circle(50);

			this.setAlarm('CheckForFlash', 50);		
			this.setAlarm('CheckForLuigi', 70);	
			
			//Create elements
			for (var i = 0; i < 50; i++) {
				_createBoo();
			}

			_createEctofeu();
			_createEctofeu();
			_createEctofeu();
			
			_selectNextTarget();
			
			//Init timer
			_timerClock	=	window.setInterval(function () {
				_timer -=	10;
				
				if(_timer <= 0) {
					_destroyEctofeu();
					_selectNextTarget();
				}
				
				var	milliseconds	=	_timer % 1000,
						seconds		=	(_timer - milliseconds) / 1000;
				
				seconds		=	seconds < 10 ? '0' + seconds : seconds;
				milliseconds	=	milliseconds < 100 ? ((milliseconds < 10 ? '00' : '0') + milliseconds) : milliseconds;
				
				_spanTimer.innerHTML	=	seconds + ':' + milliseconds;
			}, 10);
        },
		eventStep: function () {
			if (_end) {
				return false;
			}
			
			if (_is_flash) {
				this.drawFlash();
			} else {
				Game
					.drawObject(this.background.color('#000'), 'color_layer')
					.drawObject(this.foreground.opacity(SHADOWS_OPACITY), 'light_layer', new JSGlib.Point(), true);
			}
			
			Game.eraseObject(this.mouseLight, 'light_layer', Game.getMouse());
			
			var	tilePosition	=	_targetObject.sprite().getCurrentTilePosition();
			_spanTarget.style.backgroundPosition = '-' + tilePosition.x() + 'px -' + tilePosition.y() + 'px';
		},
		eventAlarmCheckForFlash: function () {
			if (!_end) {			
				if (!Game.soundIsPlaying('go_dark') && JSGlib.random(1, 100) <= 15) {
					this.flash();
				}
				this.setAlarm('CheckForFlash', 60);
			}
		},
		eventAlarmCheckForLuigi: function () {
			if (!_end) {
				if (!Game.soundIsPlaying('go_dark') && JSGlib.random(1, 100) <= 10 && Game.instanceNumber('Luigi') == 0) {
					Game.instanceCreate(0, 0, 'Luigi');
				}

				this.setAlarm('CheckForLuigi', 70);
			}
		},
		drawFlash: function () {
			Game
					.drawObject(this.background.color('#fff'), 'color_layer')
					.drawObject(this.foreground.opacity(100), 'light_layer', new JSGlib.Point(), true, true);
		},
		flash: function () {
			if (_is_flash) {
				return false;
			}
			
			_is_flash	=	true;
			Game.emitEvent('eventFlash');
			Game.playSound('thunder');
			
			document.body.className	=	'flash';
				
			this.setAlarm('BackToNormal', 35);
		},
		eventAlarmBackToNormal: function () {	
			_is_flash	=	false;
			Game.emitEvent('eventFlashEnd');
			document.body.className	=	'';
		},
		'static': {
			isEnd: function () {
				return _end;
			},
			randomCreationPoint: function () {
				 var	currentRoom	=	Game.getCurrentRoom(),
						roomWidth	=	currentRoom.getWidth(),
						roomHeight	=	currentRoom.getHeight();
				
				return new JSGlib.Point(
					JSGlib.random(50, roomWidth - 50),
					JSGlib.random(50, roomHeight - 50)
				);
			},
			isFlash:	function () {
				return _is_flash;
			},
			forceFlash: function () {
				_controlorObject.flash();
			},
			endTimer: function () {
				window.clearInterval(_timerClock);
				_timerClock	=	null;
				_spanTimer.parentNode.removeChild(_spanTimer);
			},
			checkClickedGhosts: function (ghosts) {
				
				var	boo			=	null,
						totalBoos	=	0;
				
				JSGlib.forEach(ghosts, function () {
					if (this.instanceOf('Boos')) {
						totalBoos++;
						
						if (this.instanceOf(_target)) {
							boo	=	this;
						}
					}				
				});
				
				if (totalBoos > 0) {
					if (boo === null) {
						if (_timerClock !== null) {
							_timer	=	START_TIMER;
							_destroyEctofeu();
						}
					} else {
						boo.destroy();
						
						if (++_totalKilledBoos >= OBJECTIVE) {
							_end	=	true;
							
							_spanLabelTarget.parentNode.removeChild(_spanLabelTarget);
							_spanTarget.parentNode.removeChild(_spanTarget);

							_controlorObject.drawFlash();
							document.body.className	=	'flash';
							
							var	spanResults				=	document.createElement('span'),
									replayLink					=	document.createElement('a');
									
							spanResults.id					=	'results';
							spanResults.innerHTML		=	'Vous avez capturé ' + OBJECTIVE + ' Boos, la chasse est terminée !<br />';
							
							replayLink.innerHTML		=	'Rejouer !';
							spanResults.appendChild(replayLink);
							
							replayLink.onclick				=	function (e) {
								window.location.href	=	window.location.href;
								e.preventDefault();
								return false;
							};
							
							document.getElementById('game').appendChild(spanResults);
							
							setTimeout(function () {
								spanResults.style.opacity	=	1;
							}, 100);
							
							Game
								.emitEvent('eventGameEnd')
								.stopAllSounds()
								.playSound('start_end', false, function () {
									Game.playSound('end', true);
								})
								.callStatic('Controlor', 'endTimer');
								
						} else {
							_createBoo();
							_selectNextTarget();
						}
					}
				}
			}
		}
    });
})(myGame);