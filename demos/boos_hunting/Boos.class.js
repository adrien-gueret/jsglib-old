(function (Game) {
    'use strict';
	
	var	_is_dark	=	false;
	
	Game.addClass({
        name: 'Boos',
		'abstract': true,
        eventCreate: function () {
            this.checkCollisions(false).sprite('boos', 52, 52, 2);
			
			this.old_opacity	=	100;
			this.init_speed	=	2;
			this.tiles			=	[];
			this.dark			=	_is_dark;

			this
				.opacity(JSGlib.random(1, 99))
				.goToNewPoint()
				.deltaOpacity	=	JSGlib.random(0, 1) == 1 ? 1 : -1;
				
        },
		eventDestroy: function () {
			var	death	=	Game
										.playSound('boo_ok')
										.instanceCreate(this.x() + this.width() / 2, this.y() + this.height() / 2, 'DeathBoos'),
					tiles		=	this.dark ? [6, 7, 8, 9, 10] : [1, 2, 3, 4, 5];
					
			death.sprite().usedTiles(tiles);
		},
		eventStep: function (step) {
			var	tiles				=	this.tiles.slice(0),
					newOpacity	=	this.opacity(),
					checkStep		=	(newOpacity <= 15 && this.deltaOpacity > 0) ? 8 : 3;
						
			if (!Game.callStatic('Controlor', 'isFlash') && step % checkStep === 0) {
				newOpacity	+=	this.deltaOpacity
				newOpacity	=	this.deltaOpacity > 0 ? Math.min(100, newOpacity) : Math.max(0, newOpacity);
				
				this.opacity(newOpacity);
							
				if (newOpacity >= 100 || newOpacity <= 0) {
					this.deltaOpacity	*=	-1;
				}
			}
					
			if (this.isStateLEFT()) {
				tiles	=	tiles.map(function (i) {
					return i + 3;
				});
			}
			
			if (this.dark) {
				tiles	=	tiles.map(function (i) {
					return i + 6;
				});
			}
			
			this.sprite().usedTiles(tiles);
		},
		eventAlarmWaitForNewPoint: function () {
			this.goToNewPoint();
		},
		eventAlarmGoDark: function () {
			this.dark	=	true;
		},
		eventFlash: function () {
			this.old_opacity	=	Math.ceil(this.opacity() / JSGlib.random(1, 2));
			
			this.opacity(100);
		},
		eventFlashEnd: function () {
			this.opacity(this.old_opacity);
		},
		eventGameEnd: function () {
			this.destroy(true);
		},
		goToNewPoint: function () {
			var	room	=	Game.getCurrentRoom();
			
			this.moveToPoint(
				new JSGlib.Point(
					JSGlib.random(0, room.getWidth() - this.width()),
					JSGlib.random(0, room.getHeight() - this.height())
				),
				this.init_speed * (this.dark ? 2 : 1),
				function () {
					this.hspeed(0).vspeed(0);
					this.setAlarm('WaitForNewPoint', JSGlib.random(10, 200));
				}
			);
			
			this.state(JSGlib.STATE['MOVE_' + (this.hspeed() < 0 ? 'LEFT' : 'RIGHT')]);
			
			return this;
		},
		'static': {
			makeDark: function () {
				if (!Game.callStatic('Controlor', 'isEnd')) {
					var	fps	=	Game.fps();				
					
					_is_dark	=	true;
					
					Game
						.stopSound('background')
						.playSound('go_dark', false, function () {
							if (!Game.callStatic('Controlor', 'isEnd')) {
								Game
									.playSound('background_dark', true)
									.callStatic('Controlor', 'forceFlash');
							}
						})
						.callStatic('Controlor', 'forceFlash');
						
					Game.callStatic('Controlor', 'endTimer');
					
					JSGlib.forEach(Game.getInstancesByType('Boos'), function () {
						this.setAlarm('GoDark', JSGlib.random(fps / 2, fps * 24));
					});
				}
			},
			isDark: function () {
				return _is_dark;
			}
		}
    })
	.addClass({
		name: 'NormalBoos',
		parent: 'Boos',
		eventCreate: function () {
			this.callParent('eventCreate', []);
			this.tiles	=	[1, 2, 3];
			this.init_speed = 1.25;
		}
	})
	.addClass({
		name: 'CrazyBoos',
		parent: 'Boos',
		eventCreate: function () {
			this.callParent('eventCreate', []);
			this.tiles	=	[13, 14, 15];
			this.init_speed = 1.5;
		}
	})
	.addClass({
		name: 'HappyBoos',
		parent: 'Boos',
		eventCreate: function () {
			this.callParent('eventCreate', []);
			this.tiles	=	[25, 26, 27];
			this.init_speed = 1.75;
		}
	})
	.addClass({
		name: 'Eerie',
		parent: 'Boos',
		eventCreate: function () {
			this.callParent('eventCreate', []);
			this.tiles	=	[37, 38, 39];
			this.init_speed = 0.75;
		}
	})
	.addClass({
		name: 'MarioBoos',
		parent: 'Boos',
		eventCreate: function () {
			this.callParent('eventCreate', []);
			this.tiles	=	[49, 50, 51];
			this.init_speed = 1;
		}
	})
	.addClass({
		name: 'GentleBoos',
		parent: 'Boos',
		eventCreate: function () {
			this.callParent('eventCreate', []);
			this.tiles	=	[61, 62, 63];
			this.init_speed = 1.25;
		}
	});
})(myGame);