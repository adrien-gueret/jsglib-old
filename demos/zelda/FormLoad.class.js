Game.addClass({
	'name': 'FormLoad',
	'parent': 'Form',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], Form);
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
		this.sprite.tiles=[Game.userLang=='fr'?10:9];
		this.state=Element.STATE_STAND;
		
		var i=this.createInput(
		{
			'x': 480+Game.room.view_w*2,
			'y': this.y-10,
			'type': ButtonBack
		});
		i.directionState=Element.STATE_MOVE_LEFT;
		
		this.inputUsername=this.createInput(
		{
			'x': 80+Game.room.view_w*2,
			'y': this.y+50,
			'width': 250,
			'type': InputUsername
		});
		
		this.inputPassword=this.createInput(
		{
			'x': 80+Game.room.view_w*2,
			'y': this.y+150,
			'width': 250,
			'type': InputPassword
		});
		
		this.inputChangeConf=this.createInput(
		{
			'x': 80+Game.room.view_w*2,
			'y': this.y+250,
			'width': 30,
			'type': InputCheckChangeConf
		});
		
		this.createInput(
		{
			'x': 80+Game.room.view_w*2,
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
		if(this.state==Element.STATE_MOVE_LEFT)
		{
			Game.room.view_x-=20;
			Game.room.viewHasMoved=true;
			if(Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
			{
				this.state=Element.STATE_STAND;
			}
		}
		else if(this.state==Element.STATE_MOVE_DOWN)
		{
			Game.room.view_y+=20;
			Game.room.viewHasMoved=true;
			if(Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
			{
				this.state=Element.STATE_STAND;
			}
		}
		
		if(Game.room.view_x==Game.room.view_w*2 && Game.room.view_y==0)
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
			'url': './server/loadGame.php',
			'onSuccess': function(data)
			{
				if(data.success)
				{
					Game.data=Game.mergeJSON(Game.data,data.data,true);
					
					if(form.inputChangeConf.checked)
					{
						Game.getInstancesByType(FormControls)[0].createInputs();
						form.state=Element.STATE_MOVE_DOWN;
					}
					else
					{
						var forms=Game.getInstancesByType(Form);
						for(var i=0, l=forms.length; i<l; i++)
						{
							forms[i].remove();
						}
						Game.goToNextRoom();
					}
				}
				else
				{
					form.inputUsername.html.value='';
					form.inputUsername.placeholder=data.message;
					form.inputUsername.placeHolderColor='red';
					
					form.inputPassword.html.value='';
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
	'name': 'InputCheckChangeConf',
	'parent': 'InputCheckBox',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],InputCheckBox);
		this.value=Game.getTranslation('checkbox_controls');
		this.sprite.setMask(1,{'x':0,'y':0,'height':30,'width':220});
	},
	'eventStep': function()
	{
		this.callParent('eventStep',[],InputCheckBox);
		this.drawText(
		{
			'x': this.x+this.sprite.width+10-Game.room.view_x,
			'y': this.y+7-Game.room.view_y,
			'text': this.value,
			'color': '#b3b3b3'
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