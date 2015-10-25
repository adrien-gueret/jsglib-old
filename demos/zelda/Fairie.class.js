Game.addClass({
	'name': 'Fairie',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('fairie'));
		this.sprite.makeTiles(32,20,2);
		this.sprite.tiles=[1,2,3,4,1,2,5,4];
		this.sprite.imagespeed=0.5;
		this.setZIndex(9999999999998);
		this.collideSolid=false;
		this.checkForCollisions=false;
		this.toLink=false;
        this.hey=false;
        this.heyImage=null;
        this.timeBeforeHey=10*10000000;
        this.setAlarm(1, this.timeBeforeHey);
	},
	'eventStep': function(step)
	{
		if(this.toLink && step%10==0)
		{
			if(Game.Link && !Game.message)
			{
				var targetX=Math.floor(Game.Link.state==Element.STATE_MOVE_LEFT||Game.Link.state==Element.STATE_STAND_LEFT||Game.Link.state==Element.STATE_ATTACK_LEFT?Game.Link.x+Game.Link.sprite.width:Game.Link.x-20),
					targetY=Math.floor(Game.Link.state==Element.STATE_MOVE_UP||Game.Link.state==Element.STATE_STAND_UP||Game.Link.state==Element.STATE_ATTACK_UP?Game.Link.y+Game.Link.sprite.height:Game.Link.y-20);
							
				this.moveToPoint(targetX,targetY,5,function()
				{
					this.vspeed/=4;
					this.hspeed/=4;
				});
			}
		}
        if(this.hey)
        {
            if(!this.heyImage)
            {
                this.heyImage=new Sprite(Game.getImage('exclamation_mark'));
                this.heyImage.makeTiles(30,32);
                this.heyImage.tiles=[1,2];
            }
            this.drawSprite({
                'x': this.x-Game.room.view_x,
                'y': this.y-this.sprite.height*2-Game.room.view_y,
                'sprite': this.heyImage
            });
        }
	},
    'eventKeyDown': function(key)
    {
        if(key==Game.KEY_CONTROL)
        {
            Game.stopSounds();
            return false;
        }
    },
    'eventAlarm1': function()
    {
        if(this.toLink)
        {
            if(Game.Link.canInteract())
            {
                Game.playSound('navi_hey');
                this.hey=true;
            }
            this.setAlarm(1, this.hey ? this.timeBeforeHey/2 : this.timeBeforeHey);
        }
    },
    'talk': function()
    {
        var messages = ['navi_fake_advice_forgot'];
        
        //Select a message according to progress in game
        if(!Game.data.deku_tree_open)
        {
            messages.push('navi_advice_deku_summon');
        }
        
        var m=Game.instanceCreate(0,0,Message);
		m.setMessage(Game.getTranslation(messages[Game.random(0,messages.length-1)]));
    }
});