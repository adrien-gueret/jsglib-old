Game.addClass({
	'name': 'SmallRock',
	'parent': 'Holdable',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[11],'Solid');
	},
	'eventDestroy': function()
	{
		this.callParent('eventDestroy',[],'Holdable');
		Game.instanceCreate(this.x-16,this.y-15,BrokenRock);
	}
});