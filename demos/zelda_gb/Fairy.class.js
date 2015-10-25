(function (Game) {
    'use strict';
	    
	Game.addClass({
        name: 'Fairy',
		setIsNavi: function() {
			this
				.alwaysActive(true)
				._is_navi	=	true;
				
			return this;
		},
        eventCreate: function () {
			this.fellow				=	null;
			this.targetElement	=	null;
			this._is_navi			=	false;
			
			this
				.checkCollisions(false)
				.state(JSGlib.STATE.FAIRY_NORMAL)
				.sprite('fairy', 16, 17, 1)
				.sprite()
					.imagespeed(0.3);
        },
		eventStartStep: function () {
			var	delta = 0;
			
			switch(this.state()) {
				case JSGlib.STATE.FAIRY_PURPLE		:	delta	+=	12;
				case JSGlib.STATE.FAIRY_BLUE			:	delta	+=	12;
				case JSGlib.STATE.FAIRY_GREEN		:	delta	+=	12;
				case JSGlib.STATE.FAIRY_YELLOW		:	delta	+=	12;
			}

			this.sprite().usedTiles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function(el){return el + delta;}));
		},
		eventStep: function (step) {
			if(this.fellow) {
				
				var	objX, objY, targetX, targetY;
				
				this.targetElement	=	this._is_navi ? this.fellow.instanceNearest('NaviInterest', 30) : false;

				if(this.targetElement) {
					targetX	=	this.targetElement.x() + this.targetElement.width() / 2 - this.width() / 2;
					targetY	=	this.targetElement.y() - this.height();
					this.state(JSGlib.STATE[this.targetElement.naviState]);
				} else {
					if(this._is_navi) {
						this.state(JSGlib.STATE.FAIRY_NORMAL);
					}
					
					objX		=	this.fellow.x();
					objY		=	this.fellow.y();
					targetX	=	this.fellow.isStateLEFT() ? objX + this.fellow.width() : objX - this.width();
					targetY	=	this.fellow.isStateUP() ? objY + this.fellow.height() : objY - this.height();
				}
				
				this.moveToPoint(new JSGlib.Point(targetX, targetY), 1);
			}
		}
    });
})(myGame);