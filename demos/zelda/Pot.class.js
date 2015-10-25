Game.addClass({
	'name': 'Pot',
	'parent': 'Holdable',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[12],'Solid');
	},
	'eventDestroy': function()
	{
		this.callParent('eventDestroy',[],'Holdable');
		Game.instanceCreate(this.x-16,this.y-15,BrokenPot);
	}
});