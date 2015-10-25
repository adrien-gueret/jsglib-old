Game.addClass({
	'name': 'Ennemy',
	'parent': 'Overlay',
	'damage': 1,
    'life': 1,
    'defense': 0,
    'deltaX': 0,
    'deltaY': 0,
    'isParalysed': false,
    'canBeBlocked': true,
    'isHit': false,
    'isLinkNear': function(near, far)
	{
		var dist = Game.getDistanceBetweenPoints(this.getCenter(), Game.Link.getCenter());
        
        near = near || 100;
        far = far || 250;
        
        return {
            'near': dist<=near,
            'far': dist<=far
        };
	},
    'getPositionFromLink': function(state) {
        state = 'STATE_' + (state || 'STAND') + '_';
        
        var centreLink = Game.Link.getCenter(),
            thisCentre = this.getCenter();

        if(Math.abs(centreLink.x - thisCentre.x) > Math.abs(centreLink.y - thisCentre.y))
        {
            return centreLink.x < thisCentre.x ? Element[state+'LEFT'] : Element[state+'RIGHT'];
        } else
        {
            return centreLink.y < thisCentre.y ? Element[state+'UP'] : Element[state+'DOWN'];
        }
    },
    'eventCollisionWith': function(other)
    {
        if(!this.isHit)
        {
            if(other.instanceOf(Sword) || other.instanceOf(Bullets))
            {
                this.looseLife(other.damage);
                if(other.instanceOf(Bullets))
                {
                    Game.instanceDestroy(other);
                }
            }
            else if(other.instanceOf(Holdable) && other.visible && (other.hspeed!=0 || other.vspeed!=0))
            {
                this.looseLife(2);
            }
        }
    },
    'eventDestroy': function()
    {
        var d = Game.instanceCreate(this.x+this.deltaX,this.y+this.deltaY,MonsterDeath),
            center = d.getCenter();
        Game.createItem(center.x-16,center.y-16);
    },
    'eventStep': function() 
    {
        if(this.isHit)
        {
            this.drawFilter({
                'color': [255,0,0],
                'mode': 'lighten_only'
            });
        }
        else if(this.isParalysed)
        {
            this.drawFilter({
                'color': [138,100,234],
                'opacity': this.opacity,
                'mode': 'lighten_only'
            });
        }
    },
    'eventAlarm8': function()
    {
        this.isParalysed=false;
        this.hspeed=this.tempHspeed;
        this.vspeed=this.tempVspeed;
        this.sprite.imagespeed=this.tempImagespeed;
    },
    'eventAlarm9': function()
    {
        this.isHit=false;
    },
    'looseLife': function(total)
    {
        this.life-=total;
        this.isHit=true;
        this.setAlarm(9,0.3);
        Game.playSound('enemy_hit');
        if(this.life<=0)
        {
            Game.instanceDestroy(this);
        }
    },
    'paralyse': function()
    {
        this.isParalysed=true;
        this.tempHspeed=this.hspeed;
        this.tempVspeed=this.vspeed;
        this.hspeed=0;
        this.vspeed=0;
        this.tempImagespeed=this.sprite.imagespeed;
        this.sprite.imagespeed=0;
        this.setAlarm(8,1);
    }
});