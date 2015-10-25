Game.addClass({
	'name': 'Sword',
	'isHurting': function()
	{
		return true;
	},
	'eventCreate': function()
	{
		this.collideSolid=true;
        this.damage=1;
		this.sprite=new Sprite(Game.getImage('sword'));
		this.sprite.makeTiles(42,42,1);
		this.sprite.imagespeed=Game.Link.sprite.imagespeed;
		this.sprite.imageindex=0;
		Game.playSound('attack'+Game.random(1,3));
		
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
	},
	'eventStep': function()
	{
		this.opacity=Game.Link.opacity;
		if(this.sprite.imageindex>=1)
		{
			switch(this.state)
			{
				case Element.STATE_MOVE_DOWN:
					this.x=this.xstart+8;
					this.y=this.ystart+10;
					if(this.sprite.imageindex>=2)
					{
						this.x+=11;
						this.y+=10;						
						if(this.sprite.imageindex>=3)
						{
							this.x+=24;
							if(this.sprite.imageindex>=4)
							{
								this.x+=12;
								this.y-=21;
							}
						}
					}
				break;
				
				case Element.STATE_MOVE_UP:
					this.x=this.xstart-16;
					this.y=this.ystart-18;
					if(this.sprite.imageindex>=2)
					{
						this.x-=11;
						this.y-=4;
						if(this.sprite.imageindex>=3)
						{
							this.x-=12;
							this.y+=3;
							if(this.sprite.imageindex>=4)
							{
								this.x-=15;
								this.y+=32;
							}
						}
					}
				break;
				
				case Element.STATE_MOVE_LEFT:
					this.x=this.xstart-10;
					this.y=this.ystart+10;
					if(this.sprite.imageindex>=2)
					{
						this.x-=12;
						this.y+=26;
						if(this.sprite.imageindex>=3)
						{
							this.x+=13;
							this.y+=19;
						}
					}
				break;
				
				case Element.STATE_MOVE_RIGHT:
					this.x=this.xstart+7;
					this.y=this.ystart+7;
					if(this.sprite.imageindex>=2)
					{
						this.x+=11;
						this.y+=28;
						if(this.sprite.imageindex>=3)
						{
							this.x-=12;
							this.y+=17;
						}
					}
				break;
			}
		}
	},
	'eventEndAnimation': function()
	{
		Game.instanceDestroy(this);
		return false;
	}
});

Sword.getSprite=function()
{
	return Sprite.spriteKokiriSword;
};
Sword.message=Game.getTranslation('get_kokiri_sword');
Sword.itemName=Game.getTranslation('name_kokiri_sword');

Game.addClass({
	'name': 'DekuStickSword',
	'parent': 'Sword',
    'eventCreate': function()
    {
        this.callParent('eventCreate', [], 'Sword');
        this.damage=2;
    }
});

Game.addClass({
	'name': 'MasterSword',
	'parent': 'Sword',
    'eventCreate': function()
    {
        this.callParent('eventCreate', [], 'Sword');
        this.damage=2;
    }
});

MasterSword.getSprite=function()
{
	return Sprite.spriteMasterSword;
};
MasterSword.itemName=Game.getTranslation('name_master_sword');


Game.addClass({
	'name': 'GiantSword',
	'parent': 'Sword',
    'eventCreate': function()
    {
        this.callParent('eventCreate', [], 'Sword');
        this.damage=3;
    }
});

GiantSword.getSprite=function()
{
	return Sprite.spriteGiantSword;
};
GiantSword.message=Game.getTranslation('get_giant_sword');
GiantSword.itemName=Game.getTranslation('name_giant_sword');

Game.addClass({
	'name': 'SpinSword',
	'parent': 'Sword',
	'transformToDekuStick': function()
	{
		for(var i=0,l=this.sprite.tiles.length; i<l; i++)
		{
			this.sprite.tiles[i]+=8;
		}
        this.damage=3;
        this.isDekuStick=true;
	},
    'toFire': function()
    {
        if(!this.isFire && this.isDekuStick)
        {
            this.isFire=true;
            for(var i=0,l=this.sprite.tiles.length; i<l; i++)
            {
                this.sprite.tiles[i]+=8;
                this.damage++;
            }
        }
    },
    'eventCollisionWith': function(other) 
    {
        if(this.isDekuStick && !this.isFire && other.instanceOf(Torch) && other.isFire)
        {
            this.toFire();
            Game.playSound('init_fire');
        }
    },
	'eventCreate': function()
	{
		this.collideSolid=true;
		this.sprite=new Sprite(Game.getImage('spin_attack'));
		this.sprite.makeTiles(84,80,1);
		this.sprite.tiles=[1,2,3,4,5,6,7,8];
		Game.Link.sprite.imagespeed*=2;
        
		this.sprite.imagespeed=Game.Link.sprite.imagespeed;
		this.sprite.imageindex=0;
		this.setZIndex(Game.Link.zIndex-1);
		Game.playSound('spin_attack'+Game.random(1,2));
        this.damage=2;
        this.isFire=false;
        this.isDekuStick=false;
		
		var mask={
			'x': 27,
			'y': 6,
			'width': 25,
			'height': 65
		};
		this.sprite.setMask(1,mask);
		this.sprite.setMask(9,mask);
		this.sprite.setMask(17,mask);
		
		mask={
			'x': 21,
			'y': 16,
			'width': 46,
			'height': 14
		};
		this.sprite.setMask(2,mask);
		this.sprite.setMask(10,mask);
		this.sprite.setMask(18,mask);
		
		mask={
			'x': 23,
			'y': 20,
			'width': 52,
			'height': 28
		};
		this.sprite.setMask(3,mask);
		this.sprite.setMask(11,mask);
		this.sprite.setMask(19,mask);
		
		mask={
			'x': 58,
			'y': 20,
			'width': 12,
			'height': 42
		};
		this.sprite.setMask(4,mask);
		this.sprite.setMask(12,mask);
		this.sprite.setMask(20,mask);
		
		mask={
			'x': 43,
			'y': 23,
			'width': 22,
			'height': 45
		};
		this.sprite.setMask(5,mask);
		this.sprite.setMask(13,mask);
		this.sprite.setMask(21,mask);
		
		mask={
			'x': 28,
			'y': 53,
			'width': 42,
			'height': 10
		};
		this.sprite.setMask(6,mask);
		this.sprite.setMask(14,mask);
		this.sprite.setMask(22,mask);
		
		mask={
			'x': 24,
			'y': 33,
			'width': 42,
			'height': 30
		};
		this.sprite.setMask(7,mask);
		this.sprite.setMask(15,mask);
		this.sprite.setMask(23,mask);
		
		mask={
			'x': 13,
			'y': 16,
			'width': 15,
			'height': 55
		};
		this.sprite.setMask(8,mask);
		this.sprite.setMask(16,mask);
		this.sprite.setMask(24,mask);

	},
	'eventStep': function()
	{
		this.opacity=Game.Link.opacity;
		switch(this.sprite.getTile())
		{
			case 1:
			case 9:
			case 17:
				this.x=this.xstart;
				this.y=this.ystart;
			break;
			
			case 2:
			case 10:
			case 18:
				this.x=this.xstart-23;
				this.y=this.ystart+39;
			break;
			
			case 3:
			case 11:
			case 19:
				this.x=this.xstart-39;
				this.y=this.ystart+13;
			break;
			
			case 4:
			case 12:
			case 20:
				this.x=this.xstart-79;
				this.y=this.ystart-20;
			break;
			
			case 5:
			case 13:
			case 21:
				this.x=this.xstart-49;
				this.y=this.ystart-25;
			break;
			
			case 6:
			case 14:
			case 22:
				this.x=this.xstart-25;
				this.y=this.ystart-55;
			break;
			
			case 7:
			case 15:
			case 23:
				this.x=this.xstart;
				this.y=this.ystart-35;
			break;
			
			case 8:
			case 16:
			case 24:
				this.x=this.xstart+32;
				this.y=this.ystart;
			break;
		}
	}
});