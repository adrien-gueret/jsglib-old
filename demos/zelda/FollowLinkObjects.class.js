Game.addClass({
	'name': 'FollowLinkObjects',
	'abstract': true,
	'eventCreate': function()
	{
		this.buttonDestroy=0;
		this.sprite.imagespeed=0;
		this.collideSolid=false;
		this.state=Game.Link.defendingState;
		this.deltaX=0;
		this.deltaY=0;
		switch(this.state)
		{
			case Element.STATE_STAND_DOWN:
				this.sprite.tiles=[this.sprite.tiles[0]];
				if(this.instanceOf(ShieldWeapon))
				{
					this.deltaX=5;
					this.deltaY=25;
				}
				else
				{
					this.deltaX=5;
					this.deltaY=30;
				}
			break;

			case Element.STATE_STAND_RIGHT:
				this.sprite.tiles=[this.sprite.tiles[1]];
				if(this.instanceOf(ShieldWeapon))
				{
					this.deltaX=11;
					this.deltaY=11;
				}
				else
				{
					this.deltaX=21;
					this.deltaY=9;
				}
			break;
		
			case Element.STATE_STAND_LEFT:
				this.sprite.tiles=[this.sprite.tiles[2]];
				if(this.instanceOf(ShieldWeapon))
				{
					this.deltaX=-3;
					this.deltaY=11;
				}
				else
				{
					this.deltaX=-21;
					this.deltaY=9;
				}
			break;
			
			case Element.STATE_STAND_UP:
				this.sprite.tiles=[this.sprite.tiles[3]];
				if(this.instanceOf(ShieldWeapon))
				{
					this.deltaY=-3;
				}
				else
				{
					this.deltaY=-6;
				}
			break;
		}
	
		this.eventStep();
	},
	'eventStep': function(step)
	{
		this.x=Game.Link.x+this.deltaX;
		this.y=Game.Link.y+this.deltaY;
		this.opacity=Game.Link.opaicty;
		if(this.y!=this.yprev)
		{
			this.setZIndex(Game.Link.zIndex+(this.state==Element.STATE_STAND_UP?-2:1));
		}
		if((this.state!=Element.STATE_STAND_UP || (this.state==Element.STATE_STAND_UP && Game.Link.vspeed==0)) && step%10==0 && (Game.Link.hspeed!=0 || Game.Link.vspeed!=0))
		{
			this.y-=2;
		}
	},
	'eventKeyUp': function(key)
	{
		if(key==this.buttonDestroy)
		{
            Game.instanceDestroy(this);
			return false;
		}
	}
});

Game.addClass({
	'name': 'ShieldWeapon',
	'parent': 'FollowLinkObjects',
	'eventCreate': function()
	{
		this.sprite=Items.newSprite([13,27,28,29]);
		this.callParent('eventCreate',[],FollowLinkObjects);
		this.buttonDestroy=Game.data.controls.SHIELD;
	}
});

Game.addClass({
	'name': 'SwordWeapon',
	'parent': 'FollowLinkObjects',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('sword'));
		this.sprite.makeTiles(42,42,1);
		this.sprite.tiles=[20,5,1,19];
		
		var mask={
			'x': 10,
			'y': 10,
			'width': 23,
			'height': 23
		};
		
		for(var i=1; i<40;i++)
		{
			this.sprite.setMask(i,mask);
		}
		this.callParent('eventCreate',[],FollowLinkObjects);
		this.buttonDestroy=Game.data.controls.SWORD;
	}
});

Game.addClass({
	'name': 'DekuStickWeapon',
	'parent': 'SwordWeapon',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('sword'));
		this.sprite.makeTiles(42,42,1);
		this.sprite.tiles=[40,25,21,39];
        
        this.spriteFire=new Sprite(Game.getImage('fire'));
		this.spriteFire.makeTiles(24,38,1);
		this.spriteFire.tiles=[1,2,3,4];
		this.spriteFire.imagespeed=0.5;
        
        this.isFire=false;
		
		var mask={
			'x': 10,
			'y': 10,
			'width': 23,
			'height': 23
		};
		
		for(var i=1; i<40;i++)
		{
			this.sprite.setMask(i,mask);
		}
        
		this.callParent('eventCreate',[],FollowLinkObjects);
		this.buttonDestroy=Game.data.controls.OBJECT1;
        this.collideSolid=true;
	},
    'eventStep': function(step)
	{
		this.callParent('eventStep',[],FollowLinkObjects);
        if(this.isFire)
        {
            var x=this.x,
                y=this.y;
                
            switch(this.state)
            {
                case Element.STATE_STAND_DOWN:
                    x+=8;
                    y+=6;
                break;

                case Element.STATE_STAND_RIGHT:
                    x+=30;
                    y-=8;
                break;
            
                case Element.STATE_STAND_LEFT:
                    x-=12;
                    y-=8;
                break;
                
                case Element.STATE_STAND_UP:
                    x+=10;
                    y-=30;
                break;
            }
            this.drawSprite(
            {
                'x': x-Game.room.view_x,
                'y': y-Game.room.view_y,
                'sprite': this.spriteFire
            });
        }
	},
    'eventCollisionWith': function(other)
    {
        if(!this.isFire && other.isFire && other.instanceOf(Torch))
        {
            this.isFire=true;
            Game.Link.isPreparingFireSpin=true;
            Game.playSound('init_fire');
        }
        else if(this.isFire && !other.isFire && other.instanceOf(Torch))
        {
            other.initFire();
        }
    }
});