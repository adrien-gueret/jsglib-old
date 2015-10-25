Game.addClass({
	'name': 'Tree',
	'parent': 'Overlay',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite=new Sprite(Game.getImage('tree'));
		
		var mask={
			'x': 2,
			'y': 8,
			'width': 60,
			'height': 44
		};
		
		this.sprite.setMask(1,mask);
	}
});