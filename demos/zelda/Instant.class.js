Game.addClass({
	'name': 'Instant',
	'parent': 'Overlay',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],'Overlay');
		this.solid=false;
		this.checkForCollisions=false;
		this.sprite.imagespeed=0.6;
		this.setZIndex(this.y+25);
	},
	'eventOutsideView': function(){},
	'eventEndAnimation': function()
	{
		Game.instanceDestroy(this);
		return false;
	}
});

Game.addClass({
	'name': 'GrassCut',
	'parent': 'Instant',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('grass_cut'));
		this.sprite.makeTiles(44,38,1);
		this.sprite.tiles=[1,2,3,4];
		this.callParent('eventCreate',[],'Instant');
		Game.playSound('grass');
	}
});

Game.addClass({
	'name': 'BrokenRock',
	'parent': 'Instant',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('broken_rock'));
		this.sprite.makeTiles(64,48,1);
		this.sprite.tiles=[1,2,3,4];
		this.callParent('eventCreate',[],'Instant');
		Game.playSound('broken_rock');
	}
});

Game.addClass({
	'name': 'BrokenPot',
	'parent': 'Instant',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('broken_pot'));
		this.sprite.makeTiles(59,42,1);
		this.sprite.tiles=[1,2,3,4];
		this.callParent('eventCreate',[],'Instant');
		Game.playSound('broken_pot');
	}
});

Game.addClass({
	'name': 'MonsterDeath',
	'parent': 'Instant',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('monster_death'));
		this.sprite.makeTiles(52,54,1);
		this.sprite.tiles=[1,2,3,4,5,6];
		this.callParent('eventCreate',[],'Instant');
		Game.playSound('enemy_kill');
	}
});