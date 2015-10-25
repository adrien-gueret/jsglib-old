(function (window, document) {
	'use strict';
	
	var myGame = new JSGlib.Game('game');

	myGame.createLayer('background')
			.setLayerBackgroundRepeat('background', JSGlib.BACKGROUND.REPEAT_X)
			.setLayerBackgroundAlias('background', 'background')
			.setLayerSpeed('background', 0.2)
		   .createLayer('middleground')
			.setLayerBackgroundRepeat('middleground', JSGlib.BACKGROUND.REPEAT_X)
			.setLayerBackgroundAlias('middleground', 'middleground')
			.setLayerSpeed('middleground', 0.5)
		  .createLayer('tiles')
		  .orderLayers(['background', 'middleground', 'tiles', 'main']); 
		  
	myGame.eventStartStep = function (step) {
		this.callStatic('Brick', 'resetBrickHasJumped');
	};
	
	//Controls
	var	transforms				=	['transform', 'webkitTransform', 'mozTransform', 'oTransform', 'msTransform'],
			transforms_origins	=	['transformOrigin', 'webkitTransformOrigin', 'mozTransformOrigin', 'oTransformOrigin', 'msTransformOrigin'],
			canvas					=	document.getElementById('game'),
			controls				=	document.getElementById('controls'),
			transform				=	false,
			label_size, select_size, button_audio,
			sound_text				=	'Sounds';
			
	JSGlib.forEach(transforms, function () {
		if (canvas.style[this] !== undefined) {
			transform	=	this;
			return JSGlib.KEYWORDS.BREAK;
		}
	});
	
	if (transform !== false) {
		JSGlib.forEach(transforms_origins, function () {
			if (canvas.style[this] !== undefined) {
				canvas.style[this]	=	'center top';
				return JSGlib.KEYWORDS.BREAK;
			}
		});
		
		label_size			=	document.createElement('label');
		label_size.setAttribute('for',	'game_size');
		label_size.appendChild(document.createTextNode('Game size: '));
		controls.appendChild(label_size);
		
		select_size	=	document.createElement('select');
		select_size.id =	'game_size';
		
		JSGlib.forEach([1, 2, 3], function () {
			var	option	=	document.createElement('option');
			option.value	=	this;
			option.appendChild(document.createTextNode('x' + this));
			select_size.appendChild(option);
		});
		
		select_size.onchange	=	function () {
			canvas.style[transform]	=	'scale(' + this.value + ')';
			controls.style.marginTop	=	(parseInt(canvas.style.height, 10) * (this.value - 1) + 16) + 'px';
		};

		controls.appendChild(select_size);
		controls.appendChild(document.createTextNode(' '));
	}
	
	button_audio	=	document.createElement('button');
	button_audio.appendChild(document.createTextNode(sound_text));
	
	button_audio.onclick	=	function () {
		myGame.toggleMuteSounds();
		
		if (myGame.muteSounds()) {
			button_audio.innerHTML	=	'<del>' + sound_text + '</del>';
		} else {
			button_audio.innerHTML	=	sound_text;
		}
	};
	
	controls.appendChild(button_audio);
	
	window.myGame = myGame;
})(window, document, undefined);