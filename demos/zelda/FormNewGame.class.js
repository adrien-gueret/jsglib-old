Game.addClass({
	'name': 'FormNewGame',
	'parent': 'Form',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], Form);
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
		this.sprite.tiles=[Game.userLang=='fr'?6:5];
		this.state=Element.STATE_STAND;
		
		var i=this.createInput(
		{
			'x': Game.room.view_w+480,
			'y': this.y-10,
			'type': ButtonBack
		});
		i.directionState=Element.STATE_MOVE_UP;
		
		this.createInput(
		{
			'x': Game.room.view_w+40,
			'y': this.y+120,
			'type': ButtonCreateGame
		});
		
		this.createInput(
		{
			'x': Game.room.view_w+400,
			'y': this.y+120,
			'type': ButtonAnonymousGame
		});
	},
	'eventKeyDown': function(key)
	{
		if(Game.room.view_x==Game.room.view_w && Game.room.view_y==Game.room.view_h)
		{
			switch(key)
			{
				case Game.KEY_LEFT:
				case Game.KEY_RIGHT:
					if(this.inputs[0].focus)
					{
						this.inputs[key==Game.KEY_LEFT?1:2].html.focus();
					}
					else if(this.inputs[1].focus)
					{
						this.inputs[2].html.focus();
					}
					else
					{
						this.inputs[1].html.focus();
					}
				return false;
				
				case Game.KEY_UP:
				case Game.KEY_DOWN:
					if(this.inputs[0].focus)
					{
						this.inputs[2].html.focus();
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
		if(this.state==Element.STATE_MOVE_LEFT || this.state==Element.STATE_MOVE_UP)
		{
			Game.room['view_'+(this.state==Element.STATE_MOVE_LEFT?'x':'y')]-=20;
			Game.room.viewHasMoved=true;
			if(Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
			{
				this.state=Element.STATE_STAND;
			}
		}
		else if(this.state==Element.STATE_MOVE_RIGHT)
		{
			Game.room.view_x+=20;
			Game.room.viewHasMoved=true;
			if(Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
			{
				this.state=Element.STATE_STAND;
			}
		}
		if(Game.room.view_x==Game.room.view_w && Game.room.view_y==Game.room.view_h)
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
	'name': 'ButtonCreateGame',
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
				this.sprite.tiles=[Game.userLang=='fr'?14:13];
			break;
			
			default:
				this.sprite.tiles=[Game.userLang=='fr'?16:15];
			break;
		}
		
		if(this.focus && Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
		{
			var obj={
				'y': Game.room.view_h-60,
				'text': Game.getTranslation('main_menu_register_game'),
				'color': '#fff',
				'maxWidth': Game.room.view_w,
				'font': '25px Calibri'
			};
			obj.x=Game.room.view_w/2-Game.widthOfText(obj)/2;
			this.drawText(obj);
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
		alert('This action is not available in this demo, sorry for that...');
		/*if(Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
		{
			this.form.state=Element.STATE_MOVE_LEFT;
		}*/
	}
});

Game.addClass({
	'name': 'ButtonAnonymousGame',
	'parent': 'InputButton',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], InputButton);
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
	},
	'eventStartStep': function(step)
	{
		this.callParent('eventStartStep',[],InputButton);
		switch(this.state)
		{
			case Input.STATE_NORMAL:
				this.sprite.tiles=[Game.userLang=='fr'?18:17];
			break;
			
			default:
				this.sprite.tiles=[Game.userLang=='fr'?20:19];
			break;
		}
		
		if(this.focus && Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
		{
			var obj={
				'y': Game.room.view_h-60,
				'text': Game.getTranslation('main_menu_anonymous_game'),
				'color': '#fff',
				'maxWidth': Game.room.view_w,
				'font': '25px Calibri'
			};
			obj.x=Game.room.view_w/2-Game.widthOfText(obj)/2;
			this.drawText(obj);
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
		Game.getInstancesByType(FormControls)[0].createInputs();
		this.form.state=Element.STATE_MOVE_RIGHT;
	}
});

Game.addClass({
	'name': 'ButtonBack',
	'parent': 'InputButton',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], InputButton);
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
		this.directionState=Element.STATE_MOVE_LEFT;
	},
	'eventStartStep': function(step)
	{
		this.callParent('eventStartStep',[],InputButton);
		switch(this.state)
		{
			case Input.STATE_NORMAL:
				this.sprite.tiles=[Game.userLang=='fr'?22:21];
			break;
			
			default:
				this.sprite.tiles=[Game.userLang=='fr'?24:23];
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
			this.form.state=this.directionState;
		}
	}
});