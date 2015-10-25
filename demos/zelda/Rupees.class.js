Game.addClass({
	'name': 'Rupees',
	'parent': 'Items',
	'abstract': true,
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Items);
		this.value=0;		
	},
	'action': function()
	{
		Game.earnRupees(this.value);
		Game.playSound('rupee');
	}
});

Rupees.newSprite=function()
{
	var sprite=new Sprite(Game.getImage('rupees')),
		mask=
		{
			'x': 2,
			'y': 8,
			'width': 10,
			'height': 12
		};
		
	sprite.makeTiles(14,28);
	sprite.deltaX=9
	sprite.deltaY=0
	
	for(var i=1; i<=6; i++)
	{
		sprite.setMask(i,mask);
	}
	return sprite;
};

Game.addClass({
	'name': 'GreenRupee',
	'parent': 'Rupees',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Rupees);
		this.sprite=GreenRupee.getSprite();
		this.value=1;
	}
});
GreenRupee.getSprite=function()
{
	var sprite=Rupees.newSprite();
	sprite.tiles=[1];
	return sprite;
};
GreenRupee.message=Game.getTranslation('get_green_rupee');

Game.addClass({
	'name': 'BlueRupee',
	'parent': 'Rupees',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Rupees);
		this.sprite=BlueRupee.getSprite();
		this.value=5;
	}
});
BlueRupee.getSprite=function()
{
	var sprite=Rupees.newSprite();
	sprite.tiles=[2];
	return sprite;
};
BlueRupee.message=Game.getTranslation('get_blue_rupee');

Game.addClass({
	'name': 'RedRupee',
	'parent': 'Rupees',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Rupees);
		this.sprite=RedRupee.getSprite();
		this.value=20;
	}
});
RedRupee.getSprite=function()
{
	var sprite=Rupees.newSprite();
	sprite.tiles=[3];
	return sprite;
};