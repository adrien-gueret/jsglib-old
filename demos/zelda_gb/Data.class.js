(function (Game) {
    'use strict';
	
	var	_data	=	{
			player_name	:	'Link',
			max_life			:	12,
			current_life		:	12,
			pieces_hearts	:	0
		},
		hearts_container	=	document.getElementById('hearts_container');
	
	Game.addClass({
        name: 'Data',
		'abstract': true,
		'static': {
			get	:	function(prop) {
				return	_data[prop];
			},
			set	:	function(prop, value) {
				_data[prop]	=	value;
			},
			load	:	function() {
				//LOAD HERE
				
				for(var i = 0; i < _data.max_life; i += 4) {
					var div	=	document.createElement('div');
					hearts_container.appendChild(div);
				}
				
				Game.callStatic('Data', 'showLife');
			},
			showLife	:	function () {
				var	hearts		=	hearts_container.getElementsByTagName('div'),
						total_full	=	Math.floor(_data.current_life / 4);

				for(var i = 0, l = hearts.length; i < l ; i++) {
					
					if (i  < total_full) {
						hearts[i].className	=	'';
					} else if (i  == total_full) {
					
						switch(_data.current_life % 4) {
							case 3:	hearts[i].className	=	'third';		break;
							case 2:	hearts[i].className	=	'half';			break;
							case 1:	hearts[i].className	=	'quarter';	break;
							default:	hearts[i].className	=	'empty';	break;
						}
					
					} else {
						hearts[i].className	=	'empty';
					}					
				}
			},
			looseLife	:	function (total) {
				_data.current_life	-=	total;
				if(_data.current_life < 0) {
					_data.current_life	=	0;
				}
				Game.callStatic('Data', 'showLife');
				
				if(_data.current_life == 0) {
					Game.callStatic('Link', 'dead');
				}
			},
			earnLife	:	function (total) {
				_data.current_life	+=	total;
				if(_data.current_life > _data.max_life) {
					_data.current_life	=	_data.max_life;
				}
				Game.callStatic('Data', 'showLife');
			},
			setLife	:	function (total) {
				_data.current_life	=	total;
				if(_data.current_life > _data.max_life) {
					_data.current_life	=	_data.max_life;
				} else if(_data.current_life < 0) {
					_data.current_life	=	0;
				}
				Game.callStatic('Data', 'showLife');
			}
		}
    });
})(myGame);