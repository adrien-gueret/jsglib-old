Game.addClass({
	'name': 'DekuScrub',
	'parent': 'Ennemy',
    'eventDestroy': function()
    {
        var d = Game.instanceCreate(this.x+this.deltaX,this.y+this.deltaY,MonsterDeath),
            center = d.getCenter(),
            item=null,
			r=Game.random(1,100);
        
        if(Game.data.hasSlingshot && r>=25)
        {
            item=DekuSeeds;
        }
        else if(Game.data.life<Game.data.max_life && Game.random(1,3)<3)
        {
            item=Heart;
        }
        
        if(item)
        {
            item = Game.instanceCreate(center.x-16, center.y-16, item);
        }
    },
	'eventCreate': function()
	{
		this.callParent('eventCreate', Overlay);
		this.sprite=new Sprite(Game.getImage('deku_scrub'));
		this.sprite.makeTiles(38, 48, 1);
		this.collideSolid=false;
		this.solid=false;
		this.state=Element.STATE_STAND;
        this.isAttacking=false;
        this.life=1;
        this.damage=1;
        this.canBeBlocked=true;
        
        var mask=
        {
            "x": 7,
            "y": 15,
            "width": 28,
            "height": 24
        };
        
        for(var i=1; i<=13; i++)
        {
            this.sprite.setMask(i,mask);
        }
	},
	'eventStep': function()
	{
        this.callParent('eventStep',[],'Ennemy');
        if(!this.isFreezed && !this.isParalysed)
        {
            switch(this.state)
            {
                case Element.STATE_STAND:
                    this.sprite.tiles=[1];
                break;

                case Element.STATE_STAND_UP:
                    this.sprite.tiles=[5,5,5,5];
                break;

                case Element.STATE_STAND_DOWN:
                    this.sprite.tiles=[2,2,2,2];
                break;

                case Element.STATE_STAND_LEFT:
                    this.sprite.tiles=[8,8,8,8];
                break;

                case Element.STATE_STAND_RIGHT:
                    this.sprite.tiles=[11,11,11,11];
                break;
                
                case Element.STATE_ATTACK_LEFT:
                    this.sprite.tiles=[9,9,9,9,10];
                break;

                case Element.STATE_ATTACK_RIGHT:
                    this.sprite.tiles=[12,12,12,13];
                break;

                case Element.STATE_ATTACK_DOWN:
                    this.sprite.tiles=[3,3,3,3,4];
                break;

                case Element.STATE_ATTACK_UP:
                    this.sprite.tiles=[6,6,6,6,7];
                break;
            }
		}
	},
    'eventCollisionWith': function(other)
    {
        if(this.state!=Element.STATE_STAND)
        {
            this.callParent('eventCollisionWith', [other], Ennemy);
        }
    },
	'eventStartStep': function()
	{
        if(!this.isAttacking)
        {
            var checkNear = this.isLinkNear(50, 100);
            if(checkNear.far)
            {
                if(!checkNear.near)
                {
                    this.state = this.getPositionFromLink();
                    this.sprite.imagespeed=0.1;
                    this.canBeBlocked=true;
                }
                else
                {
                    this.state = Element.STATE_STAND;
                    this.sprite.imagespeed=0;
                    this.canBeBlocked=false;
                }
            }
            else
            {
                this.state = Element.STATE_STAND;
                this.sprite.imagespeed=0;
                this.canBeBlocked=false;
            }
        }
	},
	'eventEndAnimation': function()
	{
		if(this.state!=Element.STATE_STAND && !this.isFreezed)
        {
            if(this.isAttacking)
            {
                this.isAttacking=false;
                this.sprite.imagespeed=0;
                
                var bullet = Game.instanceCreate(this.x, this.y, DekuBullet);
                Game.playSound('dekuscrub');
                switch(this.state)
                {
                    case Element.STATE_ATTACK_UP:
                        bullet.x--;
                        bullet.y-=bullet.sprite.height/2;
                        bullet.vspeed=-5;
                    break;

                    case Element.STATE_ATTACK_DOWN:
                        bullet.x++;
                        bullet.y+=this.sprite.height-bullet.sprite.height/2;
                        bullet.vspeed=5;
                    break;
                    
                    case Element.STATE_ATTACK_LEFT:
                        bullet.x-=bullet.sprite.width/2;
                        bullet.y+=4;
                        bullet.hspeed=-5;
                    break;
                    
                    case Element.STATE_ATTACK_RIGHT:
                        bullet.x+=this.sprite.width-bullet.sprite.width/2;
                        bullet.y+=4;
                        bullet.hspeed=5;
                    break;
                }
            }
            else
            {
                this.sprite.imageindex=0;
                this.sprite.imagespeed=0.4;
                this.isAttacking=true;
                
                switch(this.state)
                {
                    case Element.STATE_STAND_UP:
                        this.state = Element.STATE_ATTACK_UP;
                    break;

                    case Element.STATE_STAND_DOWN:
                        this.state = Element.STATE_ATTACK_DOWN;
                    break;
                    
                    case Element.STATE_STAND_LEFT:
                        this.state = Element.STATE_ATTACK_LEFT;
                    break;
                    
                    case Element.STATE_STAND_RIGHT:
                        this.state = Element.STATE_ATTACK_RIGHT;
                    break;
                }
            }
        }
	}
});