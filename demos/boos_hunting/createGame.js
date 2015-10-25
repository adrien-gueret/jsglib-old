(function (window, document, undefined) {
	'use strict';
	
	var	GAME_WIDTH	=	1022,
			
			myGame	=	new JSGlib.Game('game'),
			myRoom	=	new JSGlib.Room('testRoom', GAME_WIDTH, 525);

	myGame
		.createLayer('color_layer')
		.createLayer('walls_layer')
			.setLayerBackgroundAlias('walls_layer', 'walls')
		.createLayer('light_layer')
		.orderLayers(['color_layer', 'walls_layer', 'main', 'light_layer']);
		
	myRoom.eventStart	=	function () {
		document.getElementById('game').style.backgroundColor	=	'#000';
		myGame.instanceCreate(0, 0, 'Controlor');
	};
	
	document.getElementById('controls').style.width	=	GAME_WIDTH + 'px';

	myGame.addRooms(myRoom);
	
	myGame.eventClick	=	function (elements) {
		if (elements.length > 0) {
			this.callStatic('Controlor', 'checkClickedGhosts', [elements]);
		}
	};
	
	window.myGame	=	myGame;
})(window, document, undefined);