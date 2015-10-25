(function (Game) {
    'use strict';
    
	Game.addClass({
        name: 'Interactive',
		'abstract': true,
		action: function (link_state) {
			throw new Error('Interactive.action(): this method is abstract and must be implemanted.');
		},
		eventKeyDown: function(key) {

			if(key == JSGlib.KEY.W) {
				var	link	=	Game.callStatic('Link', 'getLink');
				if(link) {
					var	x					=	this.x(),
							y					=	this.y(),
							width				=	this.width(),
							height			=	this.height(),
							linkCenter		=	link.getCenter(),
							linkCenterX	=	linkCenter.x(),
							linkCenterY	=	linkCenter.y(),
							linkX				=	link.x(),
							linkY				=	link.y(),
							mask			=	link.getMask(),
							maskX			=	mask.x(),
							maskY			=	mask.y();
							
					if(link.isStateUP() && linkY + maskY == y + height && linkCenterX > x && linkCenterX < x + width) {
						this.action(JSGlib.KEY.UP);
					} else if(link.isStateDOWN() && linkY + maskY + mask.height() == y && linkCenterX > x && linkCenterX < x + width) {
						this.action(JSGlib.KEY.DOWN);
					} else if(link.isStateRIGHT() && linkX + maskX + mask.width() == x && linkCenterY > y && linkCenterY < y+ height) {
						this.action(JSGlib.KEY.RIGHT);
					} else if(link.isStateLEFT() && linkX + maskX == x + width && linkCenterY > y && linkCenterY < y + height) {
						this.action(JSGlib.KEY.LEFT);
					}
				}
			}
		}
    });
	
})(myGame);