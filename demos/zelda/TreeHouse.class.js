Game.addClass({
	'name': 'TreeHouse',
	'parent': 'Overlay',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite=new Sprite(Game.getImage('tree_house'));
		this.sprite.makeTiles(96,64);
		this.sprite.tiles=[1];
		
		var mask={
			'x': 2,
			'y': 8,
			'width': 92,
			'height': 44
		};
		
		this.sprite.setMask(1,mask);
		this.sprite.setMask(2,mask);

		if(Game.room.name=='kokiri')
		{
			if(this.x==704 && this.y==704)
			{
				this.room='link_house';
			}
			else if(this.x==960 && this.y==736)
			{
				this.room='saria_house';
			}
			else if(this.x==1088 && this.y==576)
			{
				this.room='twins_house';
			}
			else if(this.x==288 && this.y==224)
			{
				this.room='mido_house';
			}
			else if(this.x==32 && this.y==608)
			{
				this.room='geeks_house';
			}
			else
			{
				this.sprite.tiles=[2];
				this.room='kokiri_shop';
			}
		}
		
	},
	'eventCollisionWith': function(other)
	{
		if(other.instanceOf(Link) && other.state==Element.STATE_MOVE_UP && other.y+other.sprite.height>this.y+this.sprite.height && other.x>=this.x+24 && other.x+other.sprite.width<=this.x+72)
		{
			Game.xprev=this.x;
			Game.yprev=this.y;
			if(this.room)
			{
				Game.goTo(this.room);
				Game.Link.navi.x=Game.Link.x;
				Game.Link.navi.y=Game.Link.y;
				Game.Link.state=Element.STATE_MOVE_UP;
				Game.Link.vspeed=-Game.Link.speed;
			}
			else
			{
				other.vspeed=0;
				alert(this.x+','+this.y);
			}
		}
	}
});