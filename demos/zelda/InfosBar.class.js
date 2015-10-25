Game.addClass({
	'name': 'InfosBar',
	'eventCreate': function()
	{
		this.spriteHeart4=new Sprite(Game.getImage('hearts'));
		this.spriteHeart4.makeTiles(18,16,4);
		this.spriteHeart4.tiles=[1];
		
		this.spriteHeart3=new Sprite(Game.getImage('hearts'));
		this.spriteHeart3.makeTiles(18,16,4);
		this.spriteHeart3.tiles=[2];
		
		this.spriteHeart2=new Sprite(Game.getImage('hearts'));
		this.spriteHeart2.makeTiles(18,16,4);
		this.spriteHeart2.tiles=[3];	
		
		this.spriteHeart1=new Sprite(Game.getImage('hearts'));
		this.spriteHeart1.makeTiles(18,16,4);
		this.spriteHeart1.tiles=[4];

		this.spriteHeart0=new Sprite(Game.getImage('hearts'));
		this.spriteHeart0.makeTiles(18,16,4);
		this.spriteHeart0.tiles=[5];
		
		this.spriteBourse=new Sprite(Game.getImage('bourse'));
		
		for(var i in Game.data.controls)
		{
			var key='spriteButton'+i,
				value=Game.data.controls[i];
			this[key]=new Sprite(Game.getImage('letters_buttons'));
			this[key].makeTiles(24,28);
			this[key].tiles=[value-((value>=65 && value<=90)?64:10)];
		}
		
		for(var i=0; i<10; i++)
		{
			var sprite=new Sprite(Game.getImage('chiffres'));
			sprite.makeTiles(12,24,1);
			sprite.tiles=[i+1];
			this['spriteChiffre'+i]=sprite;
		}
		
		this.setZIndex(9999999999999);
		this.opacity=0;
		this.checkForCollisions=false;
		this.collideSolid=false;
	},
	'eventStep': function()
	{
		if(!Game.cinematic)
        {
            //Hearts
            var totalFull = Math.floor(Game.data.life/4),
                totalParts = Game.data.life%4,
                partDrawn=false;
            
            for(var i=0, l=Math.floor(Game.data.max_life/4); i<l; i++)
            {	
                var sprite=null,
                    j=i+1;
                
                if(j<=totalFull)
                {
                    sprite=this.spriteHeart4;
                }
                else
                {
                    if(partDrawn)
                    {
                        sprite=this.spriteHeart0;
                    }
                    else
                    {
                        switch(totalParts)
                        {
                            case 0: sprite=this.spriteHeart0; break;
                            case 1: sprite=this.spriteHeart1; break;
                            case 2: sprite=this.spriteHeart2; break;
                            case 3: sprite=this.spriteHeart3; break;
                        }
                        partDrawn=true;
                    }
                }
                this.drawSprite(
                {
                    'x': 16+(i*24),
                    'y': 16,
                    'opacity': 100,
                    'sprite': sprite
                });
            }
            
            //Rupees
            this.drawSprite(
            {
                'x': Game.room.view_w-80,
                'y': Game.room.view_h-40,
                'opacity': 100,
                'sprite': this.spriteBourse
            });
            
            var total=Game.data.rupees>9?Game.data.rupees.toString():'0'+Game.data.rupees;
            
            if(Game.data.max_rupees>99 && total.length==2)
            {
                total='0'+total;
            }
            
            total=total.split('');

            for(var i=0,l=total.length; i<l; i++)
            {
                this.drawSprite(
                {
                    'x': Game.room.view_w-40+12*i,
                    'y': Game.room.view_h-30,
                    'opacity': 100,
                    'sprite': this['spriteChiffre'+total[i]]
                });
            }
            
            //Letters Buttons
            this.drawSprite(
            {
                'x': Game.room.view_w-80,
                'y': 20,
                'opacity': 100,
                'sprite': this.spriteButtonSWORD
            });
            var object=Game.getEquipedSword();
            if(object)
            {
                this.drawSprite(
                {
                    'x': Game.room.view_w-96,
                    'y': 16,
                    'opacity': 70,
                    'sprite': object.getSprite()
                });
            }
            
            this.drawSprite(
            {
                'x': Game.room.view_w-80,
                'y': 52,
                'opacity': 100,
                'sprite': this.spriteButtonSHIELD
            });
            object=Game.getEquipedShield();
            if(object)
            {
                this.drawSprite(
                {
                    'x': Game.room.view_w-96,
                    'y': 48,
                    'opacity': 70,
                    'sprite': object.getSprite()
                });
            }
            
            this.drawSprite(
            {
                'x': Game.room.view_w-32,
                'y': 20,
                'opacity': 100,
                'sprite': this.spriteButtonOBJECT1
            });
            object=Game.data.equipedObject1;
            if(object)
            {
                this.drawSprite(
                {
                    'x': Game.room.view_w-48,
                    'y': 16,
                    'opacity': 70,
                    'sprite': object.getSprite()
                });
                
                if(object.stats)
                {
                    this.drawText(Game.getStatsText(Game.room.view_w-23,37,object.stats));
                }
            }		
            
            this.drawSprite(
            {
                'x': Game.room.view_w-32,
                'y': 52,
                'opacity': 100,
                'sprite': this.spriteButtonOBJECT2
            });
            object=Game.data.equipedObject2;
            if(object)
            {
                this.drawSprite(
                {
                    'x': Game.room.view_w-48,
                    'y': 48,
                    'opacity': 70,
                    'sprite': object.getSprite()
                });
                
                if(object.stats)
                {
                    this.drawText(Game.getStatsText(Game.room.view_w-23,69,object.stats));
                }
            }
            
            this.drawSprite(
            {
                'x': Game.room.view_w-32,
                'y': 84,
                'opacity': 100,
                'sprite': this.spriteButtonOBJECT3
            });
            object=Game.data.equipedObject3;
            if(object)
            {
                this.drawSprite(
                {
                    'x': Game.room.view_w-48,
                    'y': 80,
                    'opacity': 70,
                    'sprite': object.getSprite()
                });
                if(object.stats)
                {
                    this.drawText(Game.getStatsText(Game.room.view_w-23,101,object.stats));
                }
            }
        }
		
		//Black screen for pause
		if(Game.message && Game.pauseMenu)
		{
			this.drawRectangle(
			{
				'x': 0,
				'y': 0,
				'width': Game.room.view_w,
				'height': Game.room.view_h,
				'opacity': 50
			});
		}
		else if(InfosBar.flashOpacity>0)//Flash (deku nuts)
		{
			this.drawRectangle(
			{
				'x': 0,
				'y': 0,
				'width': Game.room.view_w,
				'height': Game.room.view_h,
				'opacity': InfosBar.flashOpacity,
				'color': '#ffffff'
			});
			InfosBar.flashOpacity-=10;
			if(InfosBar.flashOpacity<0)
			{
				InfosBar.flashOpacity=0;
			}
		}
	}
});
InfosBar.flashOpacity=0;