Game.addClass({
	'name': 'Holdable',
	'parent': 'Solid',
	'abstract': true,
	'eventDestroy': function()
	{				
		Game.createItem(this.x,this.y+(this.vspeed<0?16:(this.vspeed>0?-8:0)));
	},
	'eventStep': function()
	{
		if(!this.visible)
		{
			this.x=Game.Link.x+4;
			this.y=Game.Link.y+8;
		}
		else
		{
			if((this.hspeed>0 && this.x>=this.xstart+96) || (this.hspeed<0 && this.x<=this.xstart-96) || (this.vspeed>0 && this.y>=this.ystart+96) || (this.vspeed<0 && this.y<=this.ystart-96))
			{
				Game.instanceDestroy(this);
			}
		}
	},
	'toHold': function()
	{
		if(this.visible && this.hspeed==0 && this.vspeed==0)
        {
            Game.Link.newObject=this.sprite;
            Game.Link.newObject.deltaX=0;
            Game.Link.newObject.deltaY=10;
            Game.Link.holdObject=this;
            this.solid=false;
            this.checkForCollisions=false;
            this.visible=false;
            this.eventOutsideView=function(){};
            if(this.instanceOf(SmallRock))
            {
                Game.playSound('pickup_rock');
            }
            else
            {
                Game.playSound('pickup_pot');
            }
        }
	},
	'eventCollisionWith': function(other)
	{
		if((this.hspeed!=0 || this.vspeed!=0) && other.solid)
		{
			Game.instanceDestroy(this);
		}
	}
});