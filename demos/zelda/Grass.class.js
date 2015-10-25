Game.addClass({
	'name': 'Grass',
	'parent': 'Solid',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[4],'Solid');
	},
	'eventCollisionWith': function(other)
	{
		if(this.solid)
		{
			if(other.instanceOf(Sword))
			{
				if(other.isHurting())
				{
					this.eventDestroy();
				}
			}
		}
	},
	'eventDestroy': function()
	{
		this.solid=false;
		this.checkForCollisions=false;
		this.setZIndex(1);
		this.sprite.tiles=[10];
		
		Game.instanceCreate(this.x-6,this.y-3,GrassCut);
		Game.createItem(this.x,this.y);
	}
});