Game.addClass({
	'name': 'Torch',
	'parent': 'Solid',
    'eventCreate': function()
    {
        this.callParent('eventCreate',[[31,32,33,34,35]],Solid);
        
        var mask=
		{
			'x': 0,
			'y': 0,
			'width': 32,
			'height': 32
		};
        
        for(var i=31; i<=35; i++)
        {
            this.sprite.setMask(i, mask);
        }
        
        this.setZIndex(10);
        this.isFire=true;
    },
    'eventStep': function()
    {
        this.sprite.tiles=this.isFire?[31,32,33,34]:[35];
    },
    'eventCollisionWith': function(other)
    {
        if(!this.isFire && other.isFire && other.instanceOf(SpinSword))
        {
            this.initFire();
        }
    },
    'initFire': function()
    {
        this.isFire=true;
        Game.playSound('init_fire');
    }
});