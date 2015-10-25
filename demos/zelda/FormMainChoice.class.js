Game.addClass({
	'name': 'FormMainChoice',
	'parent': 'Form',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], Form);
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
		this.sprite.tiles=[Game.userLang=='fr'?4:3];
		this.state=Element.STATE_STAND;
		
		this.createInput(
		{
			'x': Game.room.view_w+40,
			'y': this.y+100,
			'type': ButtonNewGame
		});
		
		this.createInput(
		{
			'x': Game.room.view_w+400,
			'y': this.y+270,
			'type': ButtonLoadGame
		});
	},
	'eventKeyDown': function(key)
	{
		if(Game.room.view_x==Game.room.view_w && Game.room.view_y==0)
		{
			switch(key)
			{
				case Game.KEY_LEFT:
				case Game.KEY_RIGHT:
				case Game.KEY_UP:
				case Game.KEY_DOWN:
					if(this.inputs[0].focus)
					{
						this.inputs[1].html.focus();
					}
					else
					{
						this.inputs[0].html.focus();
					}
				return false;
			}
		}
	},
	'eventEndStep': function()
	{	
		if(this.state==Element.STATE_MOVE_DOWN)
		{
			Game.room.view_y+=20;
			Game.room.viewHasMoved=true;
			if(Game.room.view_y%Game.room.view_h==0)
			{
				this.state=Element.STATE_STAND;
			}
		}
		else if(this.state==Element.STATE_MOVE_RIGHT)
		{
			Game.room.view_x+=20;
			Game.room.viewHasMoved=true;
			if(Game.room.view_x%Game.room.view_w==0)
			{
				this.state=Element.STATE_STAND;
			}
		}
		
		if(Game.room.view_x==Game.room.view_w && Game.room.view_y==0)
		{
			for(var i=0, l=this.inputs.length; i<l; i++)
			{
				if(this.inputs[i].focus)
				{
					return;
				}
			}
			this.inputs[0].html.focus();
		}
	}
});

Game.addClass({
	'name': 'ButtonNewGame',
	'parent': 'InputButton',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], InputButton);
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
		this.wasShown=false;
	},
	'eventStartStep': function()
	{
		this.callParent('eventStartStep',[],InputButton);
		switch(this.state)
		{
			case Input.STATE_NORMAL:
				this.sprite.tiles=[Game.userLang=='fr'?6:5];
			break;
			
			default:
				this.sprite.tiles=[Game.userLang=='fr'?8:7];
			break;
		}
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	},
	'eventInsideView': function()
	{
		this.setActive(true);
		if(!this.wasShown)
		{
			this.wasShown=true;
			this.html.focus();
		}
	},
	'eventKeyDown': function(key)
	{
		if(key==Game.KEY_ENTER && this.state!=Input.STATE_NORMAL)
		{
			this.eventClickAction();
			return false;
		}
	},
	'eventClickAction': function()
	{
		if(Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
		{
			this.form.state=Element.STATE_MOVE_DOWN;
		}
	}
});

Game.addClass({
	'name': 'ButtonLoadGame',
	'parent': 'InputButton',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], InputButton);
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
	},
	'eventStartStep': function()
	{
		this.callParent('eventStartStep',[],InputButton);
		switch(this.state)
		{
			case Input.STATE_NORMAL:
				this.sprite.tiles=[Game.userLang=='fr'?10:9];
			break;
			
			default:
				this.sprite.tiles=[Game.userLang=='fr'?12:11];
			break;
		}
	},
	'eventKeyDown': function(key)
	{
		if(key==Game.KEY_ENTER && this.state!=Input.STATE_NORMAL)
		{
			this.eventClickAction();
			return false;
		}
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	},
	'eventInsideView': function()
	{
		this.setActive(true);
	},
	'eventClickAction': function()
	{
		if(Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
		{
			this.form.state=Element.STATE_MOVE_RIGHT;
		}
	}
});