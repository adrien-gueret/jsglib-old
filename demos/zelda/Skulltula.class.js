Game.addClass({
	'name': 'Skulltula',
	'parent': 'Ennemy',
	'eventCreate': function()
	{
		this.callParent('eventCreate', Overlay);
		this.sprite=new Sprite(Game.getImage('skulltula'));
		this.sprite.makeTiles(58, 72, 2);
        this.sprite.imagespeed=0.1;
		this.collideSolid=false;
		this.solid=false;
		this.state=Element.STATE_STAND_DOWN;
        this.isAttacking=false;
        this.life=5;
        this.damage=2;
        this.canBeBlocked=true;
        this.opacity=0;
        this.checkForCollisions=false;
        this.yspritestart=Game.room.view_h - this.sprite.height;
        this.ysprite=this.yspritestart;
        
        var mask=
        {
            "x": 18,
            "y": 24,
            "width": 22,
            "height": 32
        };
        
        for(var i=1; i<=8; i++)
        {
            this.sprite.setMask(i,mask);
        }
	},
    'eventCollisionWith': function(other)
    {
        this.callParent('eventCollisionWith', [other], Ennemy);
    },
    'eventStartStep': function()
    {
        if(!this.isParalysed)
        {
            this.state = this.getPositionFromLink();
            switch(this.state)
            {
                case Element.STATE_STAND_DOWN:
                    this.sprite.tiles = [1,2];
                break;
                
                case Element.STATE_STAND_UP:
                    this.sprite.tiles = [3,4];
                break;
                
                case Element.STATE_STAND_RIGHT:
                    this.sprite.tiles = [5,6];
                break;
                
                case Element.STATE_STAND_LEFT:
                    this.sprite.tiles = [7,8];
                break;
            }
        }
    },
	'eventStep': function()
	{
        this.callParent('eventStep',[],'Ennemy');
        
        if(!this.isParalysed)
        {
            var checkNear = this.isLinkNear();
            
            if(!checkNear.near) {
                if(this.ysprite > this.yspritestart) {
                    this.ysprite-=3;
                    this.opacity=0;
                    this.checkForCollisions=false;
                } else {
                    this.ysprite = this.yspritestart;
                }
            } else if (this.ysprite < this.y) {
                this.ysprite+=6;
                this.opacity=0;
                this.checkForCollisions=false;
            } else {
                this.opacity=100;
                this.ysprite=this.y;
                this.checkForCollisions=true;
            }
        }
        
        var x = this.getCenter().x - Game.room.view_x;
        
        this.drawCircle({
            'x': x,
            'y': this.y+this.sprite.height - Game.room.view_y,
            'radius': Math.min(8, this.ysprite / 64),
            'opacity': 30
        });

        if(Game.Link.viewTransitionY == 0 ) {        
            if(this.opacity < 100) {
                this.drawSprite({
                    'sprite': this.sprite,
                    'x': x - this.sprite.width/2,
                    'y': this.ysprite - Game.room.view_y,
                    'filter': this.isParalysed ? {
                        'color': [138,100,234],
                        'mode': 'lighten_only'
                    } : null
                });
            }
            
            this.drawRectangle({
                'color': '#fff',
                'opacity': 80,
                'x': x-1,
                'y': 0,
                'width': 2,
                'height': this.ysprite-Game.room.view_y + 24
            });
        }
	}
});