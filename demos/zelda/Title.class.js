Game.addClass({
	'name': 'Title',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
		this.sprite.tiles=[Game.userLang=='fr'?2:1];
		this.opacity=20;
		this.fadeIn=true;
		this.pressEnter=false;
		this.state=Element.STATE_STAND;
	},
	'eventStep': function(step)
	{
		if(this.fadeIn)
		{
			if(this.opacity<100)
			{
				this.opacity+=4;
				if(this.opacity>=100)
				{
					this.setAlarm(1,1);
				}
			}
		}
		else
		{
			this.opacity-=4;
			if(this.opacity<=0)
			{
				this.fadeIn=true;
			}
		}
		
		if(this.state==Element.STATE_MOVE)
		{
			Game.room.view_x+=20;
			Game.room.viewHasMoved=true;
			if(Game.room.view_x%Game.room.view_w==0)
			{
				Game.instanceDestroy(this);
			}
		}
	},
	'eventAlarm1': function()
	{
		this.fadeIn=false;
	},
	'eventKeyDown': function(key)
	{
		if(key==Game.KEY_ENTER && !this.pressEnter)
		{
			Game.playSound('press_start');
			this.pressEnter=true;
			this.state=Element.STATE_MOVE;
		}
	}
});