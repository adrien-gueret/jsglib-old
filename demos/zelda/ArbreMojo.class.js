Game.addClass({
	'name': 'ArbreMojo',
	'parent': 'Overlay',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Overlay);
		this.sprite=new Sprite(Game.getImage('arbre_mojo'));
		this.sprite.makeTiles(250,202);
		this.collideSolid=false;
		this.solid=true;
        this.setZIndex(999);
        
        var mask=
        {
            'x': 20,
            'width': 210,
            'height': 163
        };
        
        this.sprite.setMask(2, mask);
	},
    'eventStep': function()
    {
        if(Game.Link.y<Game.Link.yprev)
        {
            this.setZIndex(Game.Link.zIndex-10);
        }
        if(Game.data.deku_tree_open)
        {
            this.sprite.tiles=[2];
        }
        if(!Game.data.deku_tree_open && !Game.cinematic && Game.Link.y <= 280)
        {
            Game.initCinematic();
            Game.playSound('intro_deku',true);
            Game.Link.state=Element.STATE_MOVE_UP;
            Game.Link.setPath([
                [Game.Link.x-50, Game.Link.y-70, function()
                {
                    this.state=Element.STATE_MOVE_LEFT;
                }],
                [1580, 210]
            ], Game.Link.speed, function()
            {
                this.state=Element.STATE_STAND_UP;
                this.hspeed=0;
                this.vspeed=0;
                
                var m=Game.instanceCreate(0,0,Message),
                    messageX=Game.room.view_x+Game.room.view_w/2-m.sprite.width/2;
                    
                m.setMessage(Game.getTranslation('navi_back_deku_tree'));
                    
                m.x = messageX;
                m.y = 320;
                
                m.onClose=function()
                {
                    m=Game.instanceCreate(0,0,Message);
                    
                    m.setMessage(Game.getTranslation('deku_tree_third_message',{
                        '=USERNAME=': Game.getUsername()
                    }));
                        
                    m.x = messageX;
                    m.y = 320;
                    
                    m.onClose=function()
                    {
                        Game.cinematic=false;
                        Game.data.deku_tree_open=true;
                        Game.stopSounds();
                        Game.playSound('kokiri',true);
                    };
                };
            });
        }
    }
});