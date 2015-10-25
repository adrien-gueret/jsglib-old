Game.addClass({
	'name': 'Bullets',
	'parent': 'Ennemy',
	'abstract': true,
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Ennemy);		
		this.damage=2;
        this.collideSolid=true;
        this.solid=false;
	},
	'eventDestroy': function(){},
    'bounce': function()
    {
        this.hspeed*=-1;
        this.vspeed*=-1;
        Game.playSound('shield_block');
    }
});

Game.addClass({
	'name': 'DekuBullet',
	'parent': 'Bullets',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Bullets);		
		this.damage=2;
        this.sprite = new Sprite(Game.getImage('deku_scrub'));
        this.sprite.makeTiles(38, 48, 1);
        this.sprite.tiles=[14,15,16];
        this.sprite.imagespeed=0.4;
        
        var mask=
        {
            "x": 17,
            "y": 21,
            "width": 6,
            "height": 8
        };
        for(var i=14; i<=16; i++)
        {
            this.sprite.setMask(i,mask);
        }
	},
    'eventCollisionWith': function(other)
    {
        if(other.solid)
        {
            Game.instanceDestroy(this);
        }
        else
        {
            this.callParent('eventCollisionWith', [other], Bullets);
        }
    }
});