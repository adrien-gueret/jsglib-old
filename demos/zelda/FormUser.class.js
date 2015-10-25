Game.addClass({
	'name': 'FormUser',
	'parent': 'Form',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], Form);
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
		this.sprite.tiles=[Game.userLang=='fr'?14:13];
		this.state=Element.STATE_STAND;
		
		var i=this.createInput(
		{
			'x': 480,
			'y': this.y-10,
			'type': ButtonBack
		});
		i.directionState=Element.STATE_MOVE_RIGHT;
		
		this.inputUsername=this.createInput(
		{
			'x': 80,
			'y': this.y+50,
			'width': 250,
			'type': InputUsername
		});
		
		this.inputPassword=this.createInput(
		{
			'x': 80,
			'y': this.y+150,
			'width': 250,
			'type': InputPassword
		});
		
		this.inputPasswordConfirm=this.createInput(
		{
			'x': 80,
			'y': this.y+250,
			'width': 250,
			'type': InputPassword
		});
		this.inputPasswordConfirm.name='password_confirm';
		this.inputPasswordConfirm.placeholder=Game.getTranslation('main_menu_password_confirm');
		
		i=this.createInput(
		{
			'x': 80,
			'y': this.y+350,
			'width': 250,
			'type': SubmitNewUser
		});
	},
	'eventKeyDown': function(key)
	{
		if(Game.room.view_x==Game.room.view_w && Game.room.view_y==Game.room.view_h)
		{
			switch(key)
			{
				default: return;
			}
		}
	},
	'eventEndStep': function()
	{
		if(this.state==Element.STATE_MOVE_RIGHT)
		{
			Game.room.view_x+=20;
			Game.room.viewHasMoved=true;
			if(Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
			{
				this.state=Element.STATE_STAND;
			}
		}
		else if(this.state==Element.STATE_MOVE_LEFT)
		{
			Game.room.view_x-=20;
			Game.room.viewHasMoved=true;
			if(Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
			{
				this.state=Element.STATE_STAND;
			}
		}

		if(Game.room.view_x==0 && Game.room.view_y==Game.room.view_h)
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
	},
	'eventSubmit': function(data)
	{
		var form=this;
		data.lang=Game.userLang;
		Game.ajax(
		{
			'type': 'POST',
			'data': data,
			'dataType': 'JSON',
			'url': './server/newUser.php',
			'onSuccess': function(data)
			{
				if(data.success)
				{
					Game.data.userid=data.userid;
					Game.data.username=data.username;
					Game.data.userpassword=data.userpassword;
					Game.getInstancesByType(FormControls)[0].createInputs();
					Game.room.view_x=Game.room.view_w*3;
					form.state=Element.STATE_MOVE_LEFT;
				}
				else
				{
					switch(data.error)
					{
						case 'username':
						case 'alreadyused':
							form.inputUsername.html.value='';
							form.inputUsername.placeholder=data.message;
							form.inputUsername.placeHolderColor='red';
						break;
						
						case 'password':
							form.inputPassword.html.value='';
							form.inputPassword.placeholder=data.message;
							form.inputPassword.placeHolderColor='red';
						break;
						
						case 'confirmpassword':
							form.inputPasswordConfirm.html.value='';
							form.inputPasswordConfirm.placeholder=data.message;
							form.inputPasswordConfirm.placeHolderColor='red';
						break;
					}
				}
			},
			'onError': function(err)
			{
				alert(err);
			}
		});
	}
});

Game.addClass({
	'name': 'InputUsername',
	'parent': 'InputText',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], InputText);
		this.borderLength=0;
		this.backgroundColor='transparent';
		this.textColor='#fff';
		this.cursorColor='#fff';
		this.name='username';
		this.placeholder=Game.getTranslation('main_menu_username');
	},
	'eventStartStep': function()
	{
		this.callParent('eventStartStep',[],Input);
		this.drawRectangle(
		{
			'x': this.x-Game.room.view_x,
			'y': this.y+this.sprite.height+2-Game.room.view_y,
			'width': this.sprite.width,
			'color': '#fff',
			'height': 1
		});
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	},
	'eventInsideView': function()
	{
		this.setActive(true);
	}
});

Game.addClass({
	'name': 'InputPassword',
	'parent': 'InputText',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], InputText);
		this.borderLength=0;
		this.backgroundColor='transparent';
		this.textColor='#fff';
		this.cursorColor='#fff';
		this.name='password';
		this.placeholder=Game.getTranslation('main_menu_password');
		this.toPasswordInput();
	},
	'eventStartStep': function()
	{
		this.callParent('eventStartStep',[],Input);
		this.drawRectangle(
		{
			'x': this.x-Game.room.view_x,
			'y': this.y+this.sprite.height+2-Game.room.view_y,
			'width': this.sprite.width,
			'color': '#fff',
			'height': 1
		});
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	},
	'eventInsideView': function()
	{
		this.setActive(true);
	}
});

Game.addClass({
	'name': 'SubmitNewUser',
	'parent': 'InputSubmit',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], InputSubmit);
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
	},
	'eventStartStep': function()
	{
		this.callParent('eventStartStep',[],InputSubmit);
		switch(this.state)
		{
			case Input.STATE_NORMAL:
				this.sprite.tiles=[Game.userLang=='fr'?26:25];
			break;
			
			default:
				this.sprite.tiles=[Game.userLang=='fr'?28:27];
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
	}
});