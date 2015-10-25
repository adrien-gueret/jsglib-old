Game.addClass({
	'name': 'Barrier',
	'parent': 'Solid',
	'eventCreate': function()
	{
		var tiles=[5];
		this.callParent('eventCreate',tiles,Solid);	
	}
});