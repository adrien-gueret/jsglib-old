Game.addClass({
	'name': 'DekuBaba',
	'parent': 'Ennemy',
    'eventDestroy': function()
    {
        var d = Game.instanceCreate(this.x+this.deltaX,this.y+this.deltaY,MonsterDeath),
            center = d.getCenter(),
            item=null,
			r=Game.random(1,100);
        
        if(r>=50)
        {
            item=DekuStick;
        }
        else if (r>=25)
        {
            item=DekuNut;
        }
        else if(Game.data.life<Game.data.max_life && Game.random(1,3)<3)
        {
            item=Heart;
        }
        
        if(item)
        {
            item = Game.instanceCreate(center.x-16, center.y-16, item);
            item.value = 1;
        }
    },
	'eventCreate': function()
	{
		this.callParent('eventCreate', Overlay);
		this.sprite=new Sprite(Game.getImage('deku_baba'));
		this.sprite.makeTiles(110,104,2);
		this.collideSolid=false;
		this.solid=false;
		this.state=Element.STATE_STAND;
        this.isAttacking=false;
        this.life=3;
        this.setZIndex(this.zIndex-36+this.sprite.height/2);
        this.deltaX=26;
        this.deltaY=27;
        this.damage=2;

		for(var i=1; i<=33; i++) {
			var mask = {
				'x': 40,
				'y': 28,
				'width': 32,
				'height': 30 
			};

			switch(i) {
				case 10:
				case 11:
					mask.x -= 15;
				case 14:
				case 15:
					mask.width += 15;
                break;
                    
				case 12:
				case 13:
                    mask.x -= 35;
                    mask.width += 35;
                break;
                    
                case 16:
                case 17:
                    mask.width += 35;
                break;
                
                case 24:
                case 25:
                    mask.y -= 20;
                    mask.height += 20;
                break;
                
                case 32:
                case 33:
                    mask.height += 35;
                break;
			}

			this.sprite.setMask(i, mask);
		}
	},
	'eventStep': function()
	{
        this.callParent('eventStep',[],'Ennemy');
        this.canBeBlocked=true;
        if(!this.isFreezed && !this.isParalysed)
        {
            switch(this.state)
            {
                case Element.STATE_STAND:
                    this.sprite.tiles=[1];
                    this.canBeBlocked=false;
                    this.sprite.imagespeed=0;
                break;

                case Element.STATE_STAND_UP:
                    this.sprite.tiles=[1,2,3,4];
                    this.sprite.imagespeed=0.4;
                break;

                case Element.STATE_STAND_DOWN:
                    this.sprite.tiles=[4,3,2,1];
                    this.sprite.imagespeed=0.4;
                break;

                case Element.STATE_MOVE_LEFT:
                    this.sprite.tiles=[10,11];
                    this.sprite.imagespeed=0.2;
                break;

                case Element.STATE_MOVE_RIGHT:
                    this.sprite.tiles=[14,15];
                    this.sprite.imagespeed=0.2;
                break;

                case Element.STATE_MOVE_DOWN:
                    this.sprite.tiles=[26,27,26,27,26,27,28,29,28,29,28,29,26,27,26,27,26,27,30,31,30,31,30,31];
                    this.sprite.imagespeed=0.2;
                break;

                case Element.STATE_MOVE_UP:
                    this.sprite.tiles=[18,19,18,19,18,19,20,21,20,21,20,21,18,19,18,19,18,19,22,23,22,23,22,23];
                    this.sprite.imagespeed=0.2;
                break;
                
                case Element.STATE_ATTACK_LEFT:
                    this.sprite.tiles=[12,13,12,13,12,13,12,13,12,13,12,13];
                    this.sprite.imagespeed=0.4;
                break;

                case Element.STATE_ATTACK_RIGHT:
                    this.sprite.tiles=[16,17,16,17,16,17,16,17,16,17,16,17];
                    this.sprite.imagespeed=0.4;
                break;

                case Element.STATE_ATTACK_DOWN:
                    this.sprite.tiles=[32,33,32,33,32,33,32,33,32,33,32,33];
                    this.sprite.imagespeed=0.4;
                break;

                case Element.STATE_ATTACK_UP:
                    this.sprite.tiles=[24,25,24,25,24,25,24,25,24,25,24,25];
                    this.sprite.imagespeed=0.4;
                break;
            }
		}
        else
        {
            this.setAlarm(1, 1.5);
        }
	},
	'eventStartStep': function()
	{
		if(!this.isAttacking)
        {
            if(this.isLinkNear().near)
            {
                if(this.state==Element.STATE_STAND)
                {
                    this.sprite.imageindex=0;
                    this.state = Element.STATE_STAND_UP;
                    this.setAlarm(1, 1.5);
                }
                else if(this.state != Element.STATE_STAND_UP && this.state != Element.STATE_STAND_DOWN)
                {
                    this.state = this.getPositionFromLink('MOVE');
                }
            }
            else if(this.state!=Element.STATE_STAND && this.state!=Element.STATE_STAND_DOWN)
            {
                this.sprite.imageindex=0;
                this.state = Element.STATE_STAND_DOWN;
            }
        }
	},
    'eventAlarm1': function()
    {
        if(this.state!=Element.STATE_STAND && this.state!=Element.STATE_STAND_DOWN && this.state!=Element.STATE_STAND_UP)
        {
            this.isAttacking=true;
            this.sprite.imageindex=0;
            switch(this.state)
            {
                case Element.STATE_MOVE_LEFT:
                    this.state = Element.STATE_ATTACK_LEFT;
                break;

                case Element.STATE_MOVE_RIGHT:
                    this.state = Element.STATE_ATTACK_RIGHT;
                break;

                case Element.STATE_MOVE_DOWN:
                    this.state = Element.STATE_ATTACK_DOWN;
                break;

                case Element.STATE_MOVE_UP:
                    this.state = Element.STATE_ATTACK_UP;
                break;
            }
        }
    },
	'eventEndAnimation': function()
	{
		if(this.isAttacking)
        {
            this.isAttacking=false;
            this.setAlarm(1, 1.5);
        }
        else
        {
            switch(this.state)
            {
                case Element.STATE_STAND_UP:
                    this.state = Element.STATE_MOVE_DOWN;
                return false;

                case Element.STATE_STAND_DOWN:
                    this.state = Element.STATE_STAND;
                return false;
            }
        }
	}
});