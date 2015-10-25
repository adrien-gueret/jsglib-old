(function (Game) {
    'use strict';
    
	Game.addClass({
        name: 'Utils',
		'abstract': true,
		'static': {
			isNextToBridge: function (point, direction) {
				var	targetPoint	=	new JSGlib.Point(point),
						tileSize			=	Game.getTilesSize();
				
				switch(direction) {
					case JSGlib.KEY.LEFT:
						targetPoint.substract(tileSize);
					break;
					
					case JSGlib.KEY.UP:
						targetPoint.substract(0, tileSize);
					break;
					
					case JSGlib.KEY.RIGHT:
						targetPoint.add(tileSize);
					break;
					
					case JSGlib.KEY.BOTTOM:
						targetPoint.add(0, tileSize);
					break;
				}
				
				var	type	=	Game.getTileType(targetPoint.x(), targetPoint.y(), 'bridges_tiles', 'Mountain');
				
				return type == JSGlib.TILES_TYPES.BRIDGE_V || type == JSGlib.TILES_TYPES.BRIDGE_H;
			},
			checkWalkToUpOnTop: function(link, tileY) {
				if(link.vspeed() < 0 && link.y() + link.getMask().y() <= tileY &&  !Game.callStatic('Utils', 'isNextToBridge', [link.getCenter(), JSGlib.KEY.UP])) {
					link.y(link.prevY());
				}
			},
			checkWalkToLeftOnTop: function(link, tileX) {
				if(link.hspeed() < 0 && link.x() + link.getMask().x() <= tileX &&  !Game.callStatic('Utils', 'isNextToBridge', [link.getCenter(), JSGlib.KEY.LEFT])) {
					link.x(link.prevX());
				}
			},
			checkWalkToDownOnTop: function(link, tileY) {
				var	tileSize	=	Game.getTilesSize(),
						mask	=	link.getMask();
				
				if(link.vspeed() > 0 && link.y() + mask.y() + mask.height() >= tileY + tileSize &&  !Game.callStatic('Utils', 'isNextToBridge', [link.getCenter(), JSGlib.KEY.DOWN])) {
					link.y(link.prevY());
				}
			},
			checkWalkToRightOnTop: function(link, tileX) {
				var	tileSize	=	Game.getTilesSize(),
						mask	=	link.getMask();
				
				if(link.hspeed() > 0 && link.x() + mask.x() + mask.width() >= tileX + tileSize &&  !Game.callStatic('Utils', 'isNextToBridge', [link.getCenter(), JSGlib.KEY.RIGHT])) {
					link.x(link.prevX());
				}
			}
		}
    });
})(myGame);