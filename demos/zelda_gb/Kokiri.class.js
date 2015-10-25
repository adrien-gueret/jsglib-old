(function (Game) {
    'use strict';
    
	Game.addClass({
        name: 'Kokiri',
		parent: 'NaviInterestBlue',
		eventCreate: function() {
			this
				.solid(true)
				.sprite('kokiri', 16, 16, 1)
				.sprite()
					.imagespeed(0.1);
		}
    });
	
	Game.addClass({
        name: 'Mido',
		parent: 'Kokiri',
		getMessage: function () {
			return 'Dégage Link ! Non mais vraiment !';
		},
		eventCreate: function() {
			this.callParent('eventCreate', 'Kokiri');
			this.sprite().usedTiles([3, 4]);
			this.state(JSGlib.STATE.STAND_LEFT);
			
			Game.instanceCreate(this.x(), this.y(), 'Fairy', 'top').state(JSGlib.STATE.FAIRY_PURPLE).fellow	=	this;
		},
		eventStep: function() {
			var	link		=	Game.callStatic('Link', 'getLink'),
					linkY		=	link.y(),
					y			=	this.y();
			
			if(link) {
				
				if(linkY < y) {
					this.vspeed(-link.INIT_SPEED);
				} else if(linkY > y) {
					this.vspeed(link.INIT_SPEED);
				} else {
					this.vspeed(0);
				}
			} else {
				this.vspeed(0);
			}
		}
    });
	
	Game.addClass({
        name: 'Fado',
		parent: 'Kokiri',
		getMessage: function () {
			if(this.solid()) {
				return 'LOL !';
			}
		},
		eventCreate: function() {
			this.callParent('eventCreate', 'Kokiri');
			this.sprite().usedTiles([9, 10]);
			this.state(JSGlib.STATE.STAND_DOWN);
			
			Game.instanceCreate(this.x(), this.y(), 'Fairy', 'top').state(JSGlib.STATE.FAIRY_NORMAL).fellow	=	this;
		},
		eventViewMovedEnd: function() {
			this.solid(Game.callStatic('Link', 'isOnTop'));
		}
    });
})(myGame);