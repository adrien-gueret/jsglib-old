(function (window, document, undefined) {
	'use strict';
	
	JSGlib.addStateConstant('FAIRY_NORMAL');
	JSGlib.addStateConstant('FAIRY_YELLOW');
	JSGlib.addStateConstant('FAIRY_GREEN');
	JSGlib.addStateConstant('FAIRY_BLUE');
	JSGlib.addStateConstant('FAIRY_PURPLE');
	
	var	myGame	=	new JSGlib.Game('zelda_container');

	myGame
		.createLayer('background_tiles')
		.createLayer('player', true)
		.createLayer('bridges_tiles')
		.createLayer('bridges', true)
		.createLayer('top_tiles')	
		.createLayer('top', true)	
		.orderLayers(['background_tiles', 'main', 'player', 'bridges_tiles', 'bridges', 'top_tiles', 'top']);
	
	
	window.myGame	=	myGame;
	
	//Control zooms
	var	transforms				=	['transform', 'webkitTransform', 'mozTransform', 'oTransform', 'msTransform'],
			transforms_origins	=	['transformOrigin', 'webkitTransformOrigin', 'mozTransformOrigin', 'oTransformOrigin', 'msTransformOrigin'],
			game					=	document.getElementById('game_container'),
			zelda_game			=	document.getElementById('zelda_container'),
			controls					=	document.getElementById('zoom'),
			transform				=	false,
			label_size, select_size;
			
	JSGlib.forEach(transforms, function () {
		if (game.style[this] !== undefined) {
			transform	=	this;
			return JSGlib.KEYWORDS.BREAK;
		}
	});
	
	if (transform !== false) {
		JSGlib.forEach(transforms_origins, function () {
			if (game.style[this] !== undefined) {
				game.style[this]	=	'center top';
				return JSGlib.KEYWORDS.BREAK;
			}
		});
		
		label_size			=	document.createElement('label');
		label_size.setAttribute('for',	'game_size');
		label_size.appendChild(document.createTextNode('Taille du jeu : '));
		controls.appendChild(label_size);
		
		select_size	=	document.createElement('select');
		select_size.id =	'game_size';
		
		var fullscreenRatio	=	1;
		if(window.screen.width > window.screen.height) {
			fullscreenRatio	=	window.screen.height / 144;
		} else {
			fullscreenRatio	=	window.screen.width / 160;
		}
		
		JSGlib.forEach([1, 2, 3, 4, 5, fullscreenRatio], function () {
			var	option	=	document.createElement('option');
			option.value	=	this;
			option.appendChild(document.createTextNode('x' + this));
			select_size.appendChild(option);
		});
		
		select_size.onchange	=	function () {
			game.style[transform]	=	'scale(' + this.value + ')';
			controls.style.marginTop	=	((parseInt(zelda_game.style.height, 10) + 16) * (this.value - 1) + 16) + 'px';
		};

		controls.appendChild(select_size);
		controls.style.display	=	'block';
	}
})(window, document);