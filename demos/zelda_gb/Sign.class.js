(function (Game) {
    'use strict';
    
	Game.addClass({
        name: 'Sign',
		parent: ['NaviInterestGreen', 'Interactive'],
		action: function (direction) {
			if(direction == JSGlib.KEY.UP) {
				Game.callStatic('Message', 'show', this.message);
			} else {
				Game.callStatic('Message', 'show', Game.getTranslation('sign_cant_read'));
			}
		},
		eventCreate: function() {
			this
				.solid(true)
				.sprite('objects', 16, 16, 1)
				.sprite()
					.usedTiles([5]);
					
			var	x	=	this.x(),
					y	=	this.y();
					
			this.message	=	x + ' ; ' + y;
			
			//Init message
			switch(Game.getCurrentRoom().getName())
			{
				case 'kokiri_forest':
					if(x == 240 && y == 320) {
						this.message	=	Game.getTranslation('sign_link_house', {
							player_name: Game.callStatic('Data', 'get', 'player_name')
						});
					} else if(x == 384 && y == 320) {
						this.message	=	Game.getTranslation('sign_saria_house');
					} else if(x == 400 && y == 208) {
						this.message	=	Game.getTranslation('sign_twins_house');
					} else if(x == 368 && y == 64) {
						this.message	=	Game.getTranslation('sign_kokiri_shop');
					} else if(x == 64 && y == 160) {
						this.message	=	Game.getTranslation('sign_geeks_house');
					} else if(x == 128 && y == 64) {
						this.message	=	Game.getTranslation('sign_mido_house');
					} else if(x == 32 && y == 48) {
						this.message	=	Game.getTranslation('sign_leaving_forest');
					} else if(x == 432 && y == 272) {
						this.message	=	Game.getTranslation('sign_go_to_mojo');
					} else if(x == 176 && y == 48) {
						this.message	=	Game.getTranslation('sign_water_story');
					} else if(x == 80 && y == 16) {
						this.message	=	Game.getTranslation('sign_lost_woods');
					} else if(x == 112 && y == 224) {
						this.message	=	Game.getTranslation('sign_useless_advice');
					} else if(x == 112 && y == 288) {
						this.message	=	Game.getTranslation('sign_pause');
					}  else if(x == 80 && y == 336) {
						this.message	=	Game.getTranslation('sign_save');
					} else if(x == 112 && y == 336) {
						this.message	=	Game.getTranslation('sign_joke');
					} else if(x == 32 && y == 416) {
						this.message	=	Game.getTranslation('sign_differences_oot');
					} else if(x == 16 && y == 448) {
						this.message	=	Game.getTranslation('sign_differences_oot2');
					} else if(x == 560 && y == 448) {
						this.message	=	Game.getTranslation('sign_pub_geek');
					}
				break;
			}
		}
    });
})(myGame);