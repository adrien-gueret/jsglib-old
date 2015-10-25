Game.addClass({
	'name': 'FreezeGame',
	'abstract': true,
	'eventCreate': function()
	{
		Game.message=true;
		Game.Link.vspeed=0;
		Game.Link.hspeed=0;
		this.setZIndex(99999999999999);
		this.solid=false;
		this.collideSolid=false;
		
		switch(Game.Link.state)
		{
			case Element.STATE_MOVE_UP:
				Game.Link.state=Element.STATE_STAND_UP;
			break;
			
			case Element.STATE_MOVE_DOWN:
				Game.Link.state=Element.STATE_STAND_DOWN;
			break;
			
			case Element.STATE_MOVE_LEFT:
				Game.Link.state=Element.STATE_STAND_LEFT;
			break;
			
			case Element.STATE_MOVE_RIGHT:
				Game.Link.state=Element.STATE_STAND_RIGHT;
			break;
		}
		
		for(var i=0,l=Game.activeElements.length; i<l; i++)
		{
			var elem=Game.activeElements[i];
			if(!elem.isFreezed && elem.id!=this.id)
			{
				elem.isFreezed=true;
				if(!elem.isParalysed)
                {
                    elem.tempHspeed=elem.hspeed;
                    elem.tempVspeed=elem.vspeed;
                    elem.hspeed=0;
                    elem.vspeed=0;
                    if(elem.sprite && !elem.instanceOf(Link) && !elem.instanceOf(Fairie))
                    {
                        elem.tempImagespeed=elem.sprite.imagespeed;
                        elem.sprite.imagespeed=0;
                    }
                }
			}
		}
	},
	'eventDestroy': function()
	{
		Game.message=false;
		for(var i=0,l=Game.activeElements.length; i<l; i++)
		{
			var elem=Game.activeElements[i];
			if(!isNaN(elem.tempHspeed) && !elem.isParalysed)
			{
				elem.hspeed=elem.tempHspeed;
				elem.vspeed=elem.tempVspeed;
				elem.isFreezed=false;
				if(elem.sprite && !elem.instanceOf(Link) && !elem.instanceOf(Fairie))
				{
					elem.sprite.imagespeed=elem.tempImagespeed;
				}
			}
		}
		
		if(Game.Link.state==Element.STATE_HAPPY)
		{
			Game.Link.state=Element.STATE_STAND_DOWN;
			Game.Link.newObject=null;
			Game.Link.sprite.imagespeed=0.8;
		}
	}
});