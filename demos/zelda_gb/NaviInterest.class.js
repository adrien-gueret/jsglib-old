(function (Game) {
    'use strict';
    
	Game.addClass({
        name: 'NaviInterest',
		'abstract': true
    });
	
	Game.addClass({
        name: 'NaviInterestBlue',
		parent: ['NaviInterest', 'Interactive'],
		naviState: 'FAIRY_BLUE',
		getMessage: function () {
			return '...';
		},
		action: function () {
			var	message	=	this.getMessage();
			
			if(message) {
				Game.callStatic('Message', 'show', [message]);
			}
		}
    });
	
	Game.addClass({
        name: 'NaviInterestYellow',
		parent: 'NaviInterest',
		naviState: 'FAIRY_YELLOW'
    });
	
	Game.addClass({
        name: 'NaviInterestGreen',
		parent: 'NaviInterest',
		naviState: 'FAIRY_GREEN'
    });
})(myGame);