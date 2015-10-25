(function (Game) {
    'use strict';
    
	var	_showMessage		=	false,
			_currentMessage	=	null,
			_hasNext				=	false,
			_isScrolling			=	false,
			_messageContainer	=	document.getElementById('message'),
			_lineHeight				=	parseInt(window.getComputedStyle(_messageContainer).lineHeight, 10);
				
	Game.addClass({
        name: 'Message',
		eventCreate: function () {
			this
				.checkCollisions(false)
				.stopOnSolids(false)
				.alwaysActive(true);
				
			_showMessage		=	true;
			_currentMessage	=	this;
			
			_messageContainer.scrollTop	=	0;
			_hasNext				=	_messageContainer.scrollHeight > _messageContainer.offsetHeight;
			_messageContainer.className = _hasNext ? 'next' : 'end';
						
			var	link	=	Game.callStatic('Link', 'getLink');
			if(link) {
				link.hspeed(0).vspeed(0);
				var view	=	Game.getCurrentRoom().view();
				
				if(link.y() <= view.y() + 40) {
					_messageContainer.style.bottom = '8px';
					_messageContainer.style.top		= 'auto';
				} else {
					_messageContainer.style.top		= '8px';
					_messageContainer.style.bottom = 'auto';
				}
			}
		},
		eventStartStep: function (step) {
			if(step % 40 == 0) {
				_messageContainer.className = _hasNext ? 'next' : 'end';
			} else if(step % 20 == 0) {
				_messageContainer.className = '';
			}
			
			if(_isScrolling) {
				_messageContainer.scrollTop++;
				
				var	height	=	_messageContainer.scrollHeight - _messageContainer.offsetHeight;
				height		-=	height % _lineHeight;
				
				_hasNext = height > _messageContainer.scrollTop;
				
				if(!_hasNext || _messageContainer.scrollTop % (_lineHeight * 2) == 0) {
					_isScrolling = false;
				}
			}
		},
		eventDestroy: function () {
			_showMessage		=	false;
			_currentMessage	=	null;
			_messageContainer.style.display = 'none';
		},
		eventKeyDown: function (key) {
			if(!_isScrolling && key == JSGlib.KEY.W) {
				if(_hasNext) {
					_isScrolling	=	true;
				} else {
					this.destroy();
				}
			}
		},
		'static': {
			'isShow': function () {
				return _showMessage;
			},
			'show': function (text) {
				if(!_showMessage) {
					_messageContainer.innerHTML = text;
					_messageContainer.style.display = 'block';
					Game.instanceCreate(Game.getCurrentRoom().view().position(), 'Message', 'top');
				}
			}
		}
    });
	
})(myGame);