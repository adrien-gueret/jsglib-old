Game.addClass({
	'name': 'Pushable',
	'parent': 'Solid',
    'eventCreate': function()
    {
        this.callParent('eventCreate',[30],Solid);
        this.collideSolid=true;
        this.stopMove();
        this.moveDirection=false;
        this.isPushable=true;
        var mask=
		{
			'x': 0,
			'y': 0,
			'width': 32,
			'height': 32
		};
        this.sprite.setMask(30, mask);
    },
	'eventCollisionWith': function(other)
	{
		if(this.isPushable && this.moveDirection===false && this.x%this.sprite.width==0 && this.y%this.sprite.height==0 && other.instanceOf(Link))
        {
            var pushOk=false;
            switch(other.state)
            {
                case Element.STATE_PUSH_RIGHT:
                    pushOk=Game.placeIsFree(this.x+32,this.y, 32, 32);
                break;
                
                case Element.STATE_PUSH_LEFT:
                    pushOk=Game.placeIsFree(this.x-32,this.y, 32, 32);
                break;
                
                case Element.STATE_PUSH_UP:
                    pushOk=Game.placeIsFree(this.x,this.y-32, 32, 32);
                break;
                
                case Element.STATE_PUSH_DOWN:
                    pushOk=Game.placeIsFree(this.x,this.y+32, 32, 32);
                break;
            }
            
            if(pushOk===true)
            {
                this.moveDirection=other.state;
                this.setAlarm(1,0.7);
            }
        }
	},
    'stopMove': function()
    {
        this.hspeed=0;
        this.vspeed=0;
        this.x-=this.x%this.sprite.width;
        this.y-=this.y%this.sprite.height;
    },
    'eventStep': function()
    {
        if(this.y>=1 && this.y!=this.yprev)
		{
			this.setZIndex(this.y+10);
		}
    },
    'eventAlarm1': function()
    {
        var other = Game.Link;
        if(this.moveDirection==other.state && this.isPushable)
        {
            switch(this.moveDirection)
            {
                case Element.STATE_PUSH_RIGHT:
                    this.moveToPoint(this.x+32, this.y, other.speed/2, this.stopMove);
                break;
                
                case Element.STATE_PUSH_LEFT:
                    this.moveToPoint(this.x-32, this.y, other.speed/2, this.stopMove);
                break;
                
                case Element.STATE_PUSH_UP:
                    this.moveToPoint(this.x, this.y-32, other.speed/2, this.stopMove);
                break;
                
                case Element.STATE_PUSH_DOWN:
                    this.moveToPoint(this.x, this.y+32, other.speed/2, this.stopMove);
                break;
            }
        }
        this.moveDirection=false;
    }
});

Game.addClass({
	'name': 'PushableOnce',
	'parent': 'Pushable',
    'stopMove': function()
    {
        this.isPushable=false;
        this.callParent('stopMove',[],Pushable);
    }
});