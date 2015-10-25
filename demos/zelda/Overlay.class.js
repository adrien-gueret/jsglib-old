Game.addClass({
	'name': 'Overlay',
	'eventCreate': function(tiles)
	{
		this.setZIndex(this.y+10);
		this.collideSolid=false;
		this.solid=true;
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