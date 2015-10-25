Game.addClass({
	'name': 'Chest',
	'parent': 'Solid',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[[1,2]],'Solid');
		this.chestObject=Game.data.chests[Game.room.name]['x_'+this.x+'_y_'+this.y];
		this.sprite.tiles=[this.chestObject.open?2:1];
		this.action=null;
		
		if(Game.room.name=='kokiri')
		{
			this.action=function()
			{
				Game.data.hasSword=true;
			};
		}
	},
	'open': function()
	{
		if(!this.chestObject.open)
		{
			if(this.instanceOf(BigChest))
			{
				Game.playSound('chest',false);
			}
			else
			{
				Game.playSound('small_chest',false);
			}
			
			this.chestObject.open=true;
			this.sprite.tiles=[2];
			
			var newObject=window[this.chestObject.contain];
			
			//Action on datas of the new object
			if(this.action)
			{
				this.action();
			}
			else
			{
				Game.instanceDestroy(Game.instanceCreate(0,0,newObject));
			}
			
			var m=Game.instanceCreate(0,0,Message);
			m.setMessage(newObject.message);
			
			return newObject.getSprite();	
		}
		return null;
	}
});

Game.addClass({
	'name': 'BigChest',
	'parent': 'Chest',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],'Chest');
		this.sprite=new Sprite(Game.getImage('big_chest'));
		this.sprite.makeTiles(64,80);
		this.sprite.tiles=[this.chestObject.open?2:1];
		
		var mask=
			{
				'x': 2,
				'y': 40,
				'width': 60,
				'height': 28
			};
		this.sprite.setMask(1,mask);
		this.sprite.setMask(2,mask);
	}
});