Game.addClass({
	'name': 'GossipStone',
	'parent': 'Characters',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Overlay);
		this.message='...';
             
        this.sprite=new Sprite(Game.getImage('gossip_stone'));
        this.sprite.makeTiles(44,44);
        var mask=
        {
            'x': 2,
            'y': 9,
            'width': 40,
            'height': 32
        };
        this.sprite.setMask(1,mask);
        this.sprite.setMask(2,mask);
        
        this.speak = false;
	},
	'talk': function()
	{
		var m=Game.instanceCreate(0,0,Message),
            stone=this;
        this.speak=true;
        m.onClose=function()
        {
            stone.speak=false;
            stone.message='...';
        };
		m.setMessage(this.message);
	},
    'eventStep': function()
    {
        this.sprite.tiles=[this.speak?2:1];
    },
    'eventCollisionWith': function(other)
    {
        if(other.instanceOf(Sword) && !this.speak)
        {
            var time = new Date(),
                h = time.getHours(),
                m = time.getMinutes();
                
            h = h < 10 ? '0'+h : h;
            m = m < 10 ? '0'+m : m;
            
            this.message = Game.getTranslation('gossip_stone_init_hour', {'=DATE=': h+':'+m})+"\n";
            
            if(h>=6 && h<=10)
            {
                this.message+=Game.getTranslation('gossip_stone_morning');
            }
            else if(h>=11 && h<=16)
            {
                this.message+=Game.getTranslation('gossip_stone_afternoon');
            }
            else if(h>=17 && h<=21)
            {
                this.message+=Game.getTranslation('gossip_stone_evening');
            }
            else
            {
                this.message+=Game.getTranslation('gossip_stone_night');
            }
                
            this.speak = true;
            this.setAlarm(1,0.1);
        }
    },
    'eventAlarm1': function()
    {
        if(Game.Link.isAttacking())
        {
            this.setAlarm(1,0.1);
        }
        else
        {
            this.talk();
        }
    }
});