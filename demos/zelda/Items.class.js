Game.addClass({
	'name': 'Items',
	'parent': 'Overlay',
	'abstract': true,
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Overlay);		
		this.solid=false;
		this.createSword=Game.getInstancesByType(Sword)[0]||new Sword();
	},
	'eventCollisionWith': function(other)
	{
		if(other.instanceOf(Link) || (other.instanceOf(Sword) && this.createSword.id!=other.id))
		{
			Game.instanceDestroy(this);
		}
	},
	'eventDestroy': function()
	{
		this.action(this.value);
	}
});

Items.newSprite=function(tile)
{
	var sprite=new Sprite(Game.getImage('items')),
		mask=
		{
			'x': 2,
			'y': 8,
			'width': 28,
			'height': 12
		};
	
	sprite.deltaX=0;
	sprite.deltaY=0;
	sprite.makeTiles(32,32,2);
	
	if(tile instanceof Array)
	{
		sprite.tiles=tile;
		for(var i=0,l=tile.length; i<l; i++)
		{
			sprite.setMask(tile[i],mask);
		}
	}
	else
	{
		sprite.setMask(tile,mask);
		sprite.tiles=[tile];
	}
	
	return sprite;
};