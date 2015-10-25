(function (Game) {
    'use strict';
    
	var	_view_is_moved	=	false,
			_viewControlor	=	null,
			VIEW_SPEED	=	4,
			_infos_bar			=	document.getElementById('infos_bar');
	
	Game.addClass({
        name: 'ViewControlor',
        eventCreate: function () {
			var	room	=	Game.getCurrentRoom(),
					view	=	room.view();
			
			this
				.x(view.x() + view.width() / 2)
				.y(view.y() + view.height() / 2)
				.alwaysActive(true)
				.checkCollisions(false);
				
			room.viewLinkedElement(this);
			
			_viewControlor	=	this;
        },
		'static': {
			isMoved:	function() {
				return _view_is_moved;
			},
			moveView: function(direction) {
				if(!_view_is_moved) {
					_view_is_moved	=	true;
					
					var	view		=	Game.getCurrentRoom().view(),
							viewW	=	view.width(),
							viewH	=	view.height(),
							targetX	=	_viewControlor.x(),
							targetY	=	_viewControlor.y();
							
					switch(direction) {
						case JSGlib.STATE.MOVE_LEFT:
							targetX	-=	viewW;
						break;
						
						case JSGlib.STATE.MOVE_RIGHT:
							targetX	+=	viewW;
						break;
						
						case JSGlib.STATE.MOVE_UP:
							targetY	-=	viewH;
						break;
						
						case JSGlib.STATE.MOVE_DOWN:
							targetY	+=	viewH;
						break;
					}
					
					Game.emitEvent('eventViewMovedStart', [direction, VIEW_SPEED]);
					
					_viewControlor.moveToPoint(new JSGlib.Point(targetX, targetY), VIEW_SPEED, function () {
						this.hspeed(0).vspeed(0);
						_view_is_moved	=	false;
						Game.emitEvent('eventViewMovedEnd', [direction]);
					});
				}
			},
			showInfosBar: function () {
				_infos_bar.style.display	=	'block';
			},
			hideInfosBar: function () {
				_infos_bar.style.display	=	'none';
			}
		}
    });
})(myGame);