var myGame = new JSGlib.Game('game'),
	myRoom = new JSGlib.Room('testRoom', 256, 384),
	mainControlor = null;
	
myRoom.eventStart = function () {
	 mainControlor = myGame.instanceCreate(0, 0, 'Controlor');
};
	
myGame.createLayer('backgroundLayer')
        .setLayerBackgroundRepeat('backgroundLayer', JSGlib.BACKGROUND.NO_REPEAT)
        .setLayerBackgroundAlias('backgroundLayer', 'backgroundImage')
	  .createLayer('textLayer')
	.orderLayers(['backgroundLayer', 'main', 'textLayer']);
	
myGame.addRooms(myRoom);