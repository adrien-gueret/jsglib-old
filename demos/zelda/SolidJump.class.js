Game.addClass({
	'name': 'SolidJump',
	'abstract': true,
	'parent': 'Solid',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],'Solid');
		this.solid=!(Game.room.name=='kokiri'&&this.x>Game.room.view_w&&this.y<Game.room.view_h);
		if(!this.solid)
		{
			this.sprite.height/=2;
			this.y-=this.sprite.height/2;
		}
	},
	'eventCollisionWith': function(other)
	{
		if(other.instanceOf(Link))
		{
			if(this.goodDirection(other))
			{
				if(Game.room.name=='kokiri'&&this.x>Game.room.view_w&&this.y<Game.room.view_h&&!Game.room.secretRupee)
				{
					if((other.hspeed>0 && SolidJump.linkSpeed>0) || (other.hspeed<0 && SolidJump.linkSpeed<0))
					{
						SolidJump.totalJumps++;
						if(this.y==232 && ((other.hspeed>0 && this.x==752) || (other.hspeed<0 && this.x==1104)))
						{
							SolidJump.totalJumps=1;
						}				
						
						if(SolidJump.totalJumps==5)
						{
							Game.room.secretRupee=true;
							Game.instanceCreate(other.x+(other.hspeed>0?72:-72),other.y+64,BlueRupee);
						}
					}
					else
					{
						SolidJump.totalJumps=1;
						SolidJump.linkSpeed=other.hspeed;
					}
				}
				Game.playSound('jump');
				this.nextPosition(other);
				other.collideSolid=false;
				if(!this.instanceOf(SolidJumpTop))
				{
					other.vspeed=-4;
					other.gravity=0.6;
				}
			}
			else
			{
				if(!this.solid && this.hspeed!=0)
				{
					SolidJump.totalJumps=1;
					SolidJump.linkSpeed=other.hspeed;
				}
			}
		}
	}
});
SolidJump.callBackFunction=function()
{
	this.collideSolid=true;
	this.hspeed=0;
	this.vspeed=0;
	this.gravity=0;
	this.eventEndAnimation([Element.STATE_ROLL_DOWN,Element.STATE_ROLL_UP,Element.STATE_ROLL_LEFT,Element.STATE_ROLL_RIGHT]);
};

//For the secret Rupee in Kokiri Forest
SolidJump.linkSpeed=0;
SolidJump.totalJumps=0;

Game.addClass({
	'name': 'SolidJumpRight',
	'parent': 'SolidJump',
	'goodDirection': function(l)
	{
		return l.vspeed==0 && l.hspeed>0 && (this.solid?true:(l.xprev+l.sprite.width-16<=this.x));
	},
	'nextPosition': function(l)
	{
		l.state=Element.STATE_ROLL_RIGHT;
		l.moveToPoint(l.x+64,l.y,6,SolidJump.callBackFunction);
	}
});

Game.addClass({
	'name': 'SolidJumpBottom',
	'parent': 'SolidJump',
	'goodDirection': function(l)
	{
		return l.vspeed>0 && l.hspeed==0;
	},
	'nextPosition': function(l)
	{
		l.state=Element.STATE_ROLL_DOWN;
		l.moveToPoint(l.x,l.y+88,6,SolidJump.callBackFunction);
	}
});

Game.addClass({
	'name': 'SolidJumpLeft',
	'parent': 'SolidJump',
	'goodDirection': function(l)
	{
		return l.vspeed==0 && l.hspeed<0 && (this.solid?true:(l.xprev<=this.x+2));
	},
	'nextPosition': function(l)
	{
		l.state=Element.STATE_ROLL_LEFT;
		l.moveToPoint(l.x-64,l.y,6,SolidJump.callBackFunction);
	}
});

Game.addClass({
	'name': 'SolidJumpTop',
	'parent': 'SolidJump',
	'goodDirection': function(l)
	{
		return l.vspeed<0 && l.hspeed==0;
	},
	'nextPosition': function(l)
	{
		l.state=Element.STATE_ROLL_UP;
		l.moveToPoint(l.x,l.y-58,6,SolidJump.callBackFunction);
	}
});