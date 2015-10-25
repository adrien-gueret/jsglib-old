Game.addClass({
	'name': 'FormControls',
	'parent': 'Form',
	'eventCreate': function()
	{
		this.callParent('eventCreate', [], Form);
		this.sprite=new Sprite(Game.getImage('press_enter'));
		this.sprite.makeTiles(201,31);
		this.sprite.tiles=[Game.userLang=='fr'?30:29];
		this.state=Element.STATE_STAND;
		this.hasError=false;
	},
	'eventKeyDown': function(key)
	{
		if(Game.room.view_x==Game.room.view_w*3 && Game.room.view_y==Game.room.view_h*2)
		{
			switch(key)
			{
				default: return;
			}
		}
	},
	'eventEndStep': function()
	{
		if(Game.room.view_x==Game.room.view_w*3 && Game.room.view_y==Game.room.view_h*2)
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
		if(this.hasError)
		{
			this.drawText(
			{
				'x': Game.room.view_w - 360,
				'y': Game.room.view_h-80,
				'text': Game.getTranslation('controls_error'),
				'color': '#bb3e3e'						
			});	
		}
	},
	'eventSubmit': function(data)
	{
		this.hasError=false;
		for(var i in data)
		{
			if(data[i]!='')
			{
				Game.data.controls[i]=data[i];
			}
			else
			{
				this.hasError=true;
				return false;
			}
		}
		if(Game.isConnected()) //Save new controls
		{
			Game.saveGame(function(){},function(err)
			{
				alert(Game.getTranslation('save_failure')+' '+err);
			});
		}
		Game.goToNextRoom();
	},
	'createInputs': function()
	{
		var s = this.createInput(
		{
			'x': this.x-200,
			'y': this.y+110,
			'width': 30,
			'type': SelectControl
		});
		s.setValue(Game.data.controls.LEFT);
		s.name = 'LEFT';
		s.label = Game.getTranslation('left');

		s = this.createInput(
		{
			'x': this.x-125,
			'y': this.y+60,
			'width': 30,
			'type': SelectControl
		});
		s.setValue(Game.data.controls.UP);
		s.name = 'UP';
		s.label = Game.getTranslation('up');

		s = this.createInput(
		{
			'x': this.x-50,
			'y': this.y+110,
			'width': 30,
			'type': SelectControl
		});
		s.setValue(Game.data.controls.RIGHT);
		s.name = 'RIGHT';
		s.label = Game.getTranslation('right');

		s = this.createInput(
		{
			'x': this.x-125,
			'y': this.y+160,
			'width': 30,
			'type': SelectControl
		});
		s.setValue(Game.data.controls.DOWN);
		s.name = 'DOWN';
		s.label = Game.getTranslation('down');

		s = this.createInput(
		{
			'x': this.x+100,
			'y': this.y+78,
			'width': 30,
			'type': SelectControl
		});
		s.setValue(Game.data.controls.SWORD);
		s.name = 'SWORD';
		s.label = Game.getTranslation('sword');

		s = this.createInput(
		{
			'x': this.x+250,
			'y': this.y+78,
			'width': 30,
			'type': SelectControl
		});
		s.setValue(Game.data.controls.SHIELD);
		s.name = 'SHIELD';
		s.label = Game.getTranslation('shield');

		s = this.createInput(
		{
			'x': this.x+100,
			'y': this.y+142,
			'width': 30,
			'type': SelectControl
		});
		s.setValue(Game.data.controls.ACTION);
		s.name = 'ACTION';
		s.label = Game.getTranslation('action');

		s = this.createInput(
		{
			'x': this.x+100,
			'y': this.y+206,
			'width': 30,
			'type': SelectControl
		});
		s.setValue(Game.data.controls.OBJECT1);
		s.name = 'OBJECT1';
		s.label = Game.getTranslation('object')+' 1';

		s = this.createInput(
		{
			'x': this.x+100,
			'y': this.y+270,
			'width': 30,
			'type': SelectControl
		});
		s.setValue(Game.data.controls.OBJECT2);
		s.name = 'OBJECT2';
		s.label = Game.getTranslation('object')+' 2';

		s = this.createInput(
		{
			'x': this.x+100,
			'y': this.y+334,
			'width': 30,
			'type': SelectControl
		});
		s.setValue(Game.data.controls.OBJECT3);
		s.name = 'OBJECT3';
		s.label = Game.getTranslation('object')+' 3';

		this.createInput(
		{
			'x': this.x+150,
			'y': this.y+400,
			'width': 250,
			'type': SubmitNewUser
		});
	}
});

Game.addClass({
	'name': 'SelectControl',
	'parent': 'InputSelect',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],'InputSelect');
		this.placeholder='...';
		this.placeholderColor='#e3e3e3';
		this.label='???';
		this.options=
		[
			{"label": "A", "value": Game.KEY_A},
			{"label": "B", "value": Game.KEY_B},
			{"label": "C", "value": Game.KEY_C},
			{"label": "D", "value": Game.KEY_D},
			{"label": "E", "value": Game.KEY_E},
			{"label": "F", "value": Game.KEY_F},
			{"label": "G", "value": Game.KEY_G},
			{"label": "H", "value": Game.KEY_H},
			{"label": "I", "value": Game.KEY_I},
			{"label": "J", "value": Game.KEY_J},
			{"label": "K", "value": Game.KEY_K},
			{"label": "L", "value": Game.KEY_L},
			{"label": "M", "value": Game.KEY_M},
			{"label": "N", "value": Game.KEY_N},
			{"label": "O", "value": Game.KEY_O},
			{"label": "P", "value": Game.KEY_P},
			{"label": "Q", "value": Game.KEY_Q},
			{"label": "R", "value": Game.KEY_R},
			{"label": "S", "value": Game.KEY_S},
			{"label": "T", "value": Game.KEY_T},
			{"label": "U", "value": Game.KEY_U},
			{"label": "V", "value": Game.KEY_V},
			{"label": "W", "value": Game.KEY_W},
			{"label": "X", "value": Game.KEY_X},
			{"label": "Y", "value": Game.KEY_Y},
			{"label": "Z", "value": Game.KEY_Z},
			{"label": "←", "value": Game.KEY_LEFT},
			{"label": "↑", "value": Game.KEY_UP},
			{"label": "→", "value": Game.KEY_RIGHT},
			{"label": "↓", "value": Game.KEY_DOWN}	
		];
	},
	'eventStep': function()
	{
		this.backgroundColor=this.value==''?'#bb3e3e':this.backgroundColor;
		this.callParent('eventStep', [], InputSelect);
		this.drawText(
			{
				'x': this.x+this.sprite.width+10-Game.room.view_x,
				'y': this.y+7-Game.room.view_y,
				'text': ' : '+this.label,
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
	},
	'eventChange': function()
	{
		for(var i=0, l=this.form.inputs.length; i<l; i++)
		{
			var other = this.form.inputs[i];
			if(this.id!=other.id && this.value == other.value)
			{
				other.setValue('');
			}
		}
	}
});