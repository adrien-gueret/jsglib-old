Game.addClass({
	'name': 'Rock',
	'parent': 'Ennemy',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Ennemy);
		this.sprite=new Sprite(Game.getImage('rock'));
		this.sprite.makeTiles(60,60,2);
		this.collideSolid=true;
		this.solid=false;
		this.speed=8;
		this.state=Element.STATE_MOVE_UP;
		this.vspeed=-this.speed;
        this.canBeBlocked=false;
	},
	'eventStartStep': function()
	{
		switch(this.state)
		{
			case Element.STATE_MOVE_LEFT:
			case Element.STATE_MOVE_DOWN:
				this.sprite.tiles=[4,3,2,1];
			break;
			
			case Element.STATE_MOVE_RIGHT:
			case Element.STATE_MOVE_UP:
				this.sprite.tiles=[1,2,3,4];
			break;	
		}
	},
	'eventCollisionWith': function(other)
	{
		if(other.solid)
		{
			if(this.vspeed<0)
			{
				this.hspeed=-this.speed;
				this.vspeed=0;
				this.state=Element.STATE_MOVE_LEFT;
			}
			else if(this.hspeed<0)
			{
				this.vspeed=this.speed;
				this.hspeed=0;
				this.state=Element.STATE_MOVE_DOWN;
			}
			else if(this.vspeed>0)
			{
				this.hspeed=this.speed;
				this.vspeed=0;
				this.state=Element.STATE_MOVE_RIGHT;
			}
			else if(this.hspeed>0)
			{
				this.vspeed=-this.speed;
				this.hspeed=0;
				this.state=Element.STATE_MOVE_UP;
			}
		}
	}
});