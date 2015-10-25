Game.addClass({
	'name': 'Link',
	'initView': function()
	{
		Game.room.setView(640,480,this.x-this.x%640,this.y-this.y%480);
		this.navi.x=this.x;
		this.navi.y=this.y;
		this.setZIndex(this.y+10);
	},
	'isAttacking': function()
	{
		return (this.state>=29 && this.state<=36) || this.isSpinAttacking;
	},
    'isPushing': function()
    {
		return (this.state>=37 && this.state<=40);
    },
	'canInteract': function()
	{
		return !Game.cinematic && !this.isSleeping && !Game.message && !this.isAnimated && !this.isAttacking() && this.state!=Element.STATE_DEATH && this.state!=Element.STATE_HAPPY && !this.viewTransition;
	},
	'goOut': function()
	{
		switch(Game.room.name)
		{
			case 'link_house':
			case 'saria_house':
			case 'twins_house':
			case 'mido_house':
			case 'geeks_house':
			case 'kokiri_shop':
				Game.goTo('kokiri');
			break;
		}

		Game.Link.x=Game.xprev+32;
		Game.Link.y=Game.yprev+52;
		Game.Link.vspeed=Game.Link.speed;
		Game.Link.state=Element.STATE_MOVE_DOWN;
		Game.Link.initView();
	},
	'createSword': function(type)
	{
		this.hspeed=0;
		this.vspeed=0;
		var sword=Game.instanceCreate(this.x,this.y,type);
		this.sprite.imageindex=0;
		
		switch(this.state)
		{
			case Element.STATE_MOVE_DOWN:
			case Element.STATE_STAND_DOWN:
				sword.x=this.x-27;
				sword.y=this.y+10;
				sword.sprite.tiles=[1,2,3,4,5];
				sword.state=Element.STATE_MOVE_DOWN;
				this.state=Element.STATE_ATTACK_DOWN;
			break;
			
			case Element.STATE_MOVE_UP:
			case Element.STATE_STAND_UP:
				sword.x=this.x+24;
				sword.y=this.y-2;
				sword.sprite.tiles=[6,7,8,9,10];
				sword.state=Element.STATE_MOVE_UP;
				this.state=Element.STATE_ATTACK_UP;
			break;
			
			case Element.STATE_MOVE_LEFT:
			case Element.STATE_STAND_LEFT:
				sword.x=this.x-6;
				sword.y=this.y-26;
				sword.sprite.tiles=[11,12,13,14];
				sword.state=Element.STATE_MOVE_LEFT;
				this.state=Element.STATE_ATTACK_LEFT;
			break;
			
			case Element.STATE_MOVE_RIGHT:
			case Element.STATE_STAND_RIGHT:
				sword.x=this.x+8;
				sword.y=this.y-24;
				sword.sprite.tiles=[15,16,17,18];
				sword.state=Element.STATE_MOVE_RIGHT;
				this.state=Element.STATE_ATTACK_RIGHT;
			break;
		}
		
		if(sword.instanceOf(DekuStickSword))
		{
			for(var i=0,l=sword.sprite.tiles.length;i<l;i++)
			{
				sword.sprite.tiles[i]+=20;
			}
		}
		
		sword.xstart=sword.x;
		sword.ystart=sword.y;
		sword.setZIndex(this.zIndex+(sword.state==Element.STATE_MOVE_UP||sword.state==Element.STATE_MOVE_RIGHT?-1:1));
	},
	'prepareDefense': function(weapon,key)
	{
		this.isDefending=true;
		this.speed=2;
		this.hspeed/=2;
		this.vspeed/=2;
		this.keyWaitingForRelease=key;
		
		switch(this.state)
		{
			case Element.STATE_STAND_DOWN:
			case Element.STATE_MOVE_DOWN:
			case Element.STATE_ATTACK_DOWN:
				this.defendingState=Element.STATE_STAND_DOWN;
			break;
			
			case Element.STATE_STAND_UP:
			case Element.STATE_MOVE_UP:
			case Element.STATE_ATTACK_UP:
				this.defendingState=Element.STATE_STAND_UP;
			break;
			
			case Element.STATE_STAND_LEFT:
			case Element.STATE_MOVE_LEFT:
			case Element.STATE_ATTACK_LEFT:
				this.defendingState=Element.STATE_STAND_LEFT;
			break;
			
			case Element.STATE_STAND_RIGHT:
			case Element.STATE_MOVE_RIGHT:
			case Element.STATE_ATTACK_RIGHT:
				this.defendingState=Element.STATE_STAND_RIGHT;
			break;
		}
		
		if(key!=Game.data.controls.SHIELD)
		{
			this.isPreparingSpin=true;
		}
		Game.instanceCreate(0,0,weapon);
	},
	'prepareSpin': function()
	{
		if(Game.isKeyPressed(Game.data.controls.SWORD))
		{
			this.prepareDefense(SwordWeapon,Game.data.controls.SWORD);
		}
		else if(Game.isKeyPressed(Game.data.controls.OBJECT1) && Game.data.equipedObject1)
		{
			this.prepareDefense(window[Game.data.equipedObject1.toString()+'Weapon'],Game.data.controls.OBJECT1);
		}
		else if(Game.isKeyPressed(Game.data.controls.OBJECT2) && Game.data.equipedObject2)
		{
			this.prepareDefense(window[Game.data.equipedObject2.toString()+'Weapon'],Game.data.controls.OBJECT2);
		}
		else if(Game.isKeyPressed(Game.data.controls.OBJECT3) && Game.data.equipedObject3)
		{
			this.prepareDefense(window[Game.data.equipedObject3.toString()+'Weapon'],Game.data.controls.OBJECT3);
		}
	},
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('link'));
		this.sprite.makeTiles(40,48,1);
		this.sprite.imagespeed=0.8;
		
		this.spritePuddle=new Sprite(Game.getImage('puddle'));
		this.spritePuddle.makeTiles(32,16,1);
		this.spritePuddle.tiles=[1,2,3];
		this.spritePuddle.imagespeed=0.3;
		
		this.state=Element.STATE_STAND_DOWN;
		this.defendingState=Element.STATE_STAND_DOWN;
		this.newObject=null;
		this.holdObject=null;
		this.viewTransition=false;
		this.viewTransitionX=0;
		this.viewTransitionY=0;
		this.speed=4;
		this.hurt=false;
		this.drawPuddles=false;
		this.isDefending=false;
		this.isPreparingSpin=false;
        this.isPreparingFireSpin=false;
		this.isSpinAttacking=false;
		this.keyWaitingForRelease=0;
		this.startSpinTile=0;
		this.isRolling=false;
		this.isAnimated=false;
        this.isSleeping=false;
		
		Game.Link=this;
		Game.instanceCreate(0,0,InfosBar);
		this.navi=Game.instanceCreate(0,0,Fairie);
		this.navi.toLink=true;
		this.initView();
		
		var mask=
		{
			'x': 6,
			'y': 12,
			'width': 28,
			'height': 32
		};
		
		for(var i=1; i<=999; i++)
		{
			this.sprite.setMask(i,mask);
		}
		
		if(Game.room.name=='kokiri')
		{
			Game.instanceCreate(0,0,BackgroundAmbiance);
		}   
	},
	'eventStartStep': function(step)
	{
		this.checkTransition();
		this.checkSprite();
		
		//Puddles
		if(step%3==0 && ((this.state!=35 && this.state!=36) || this.isRolling)  && Game.room.name=='kokiri' && Game.room.view_x>=Game.room.view_w && Game.room.view_x<Game.room.view_w*2)
		{
			this.drawPuddles=false,
				data=Game.context2D.getImageData(this.x+6-Game.room.view_x, this.y+33-Game.room.view_y,26,14).data;
			
			//To know if we have to draw puddles, we check the pixels color under Link
			for (var i = 0, n = data.length; i < n; i += 4)
			{
				//      RED            GREEN           BLUE
				if(data[i]==128 && data[i+1]==240 && data[i+2]==208)
				{
					this.drawPuddles=true;
					break;
				}
			}
		}
		
		if(this.drawPuddles)
		{
			SolidJump.totalJumps=0;
			if(this.hspeed!=0 || this.vspeed!=0)
			{
				if(!Game.soundIsPlaying('splash'))
				{
					Game.playSound('splash');
				}
			}
			var deltaX=4;
			
			if(this.state==Element.STATE_ATTACK_LEFT||this.state==Element.STATE_STAND_LEFT||this.state==Element.STATE_MOVE_LEFT)
			{
				deltaX=0;
			}
			else if(this.state==Element.STATE_ATTACK_RIGHT||this.state==Element.STATE_STAND_RIGHT||this.state==Element.STATE_MOVE_RIGHT)
			{
				deltaX=8;
			}
			
			this.drawSprite(
			{
				'x': this.x+deltaX-Game.room.view_x,
				'y': this.y-9+this.sprite.height-Game.room.view_y,
				'sprite': this.spritePuddle
			});
		}
        
        //Sleep
        if(this.isSleeping)
        {
            var x=this.x+12,
                y=this.y+24;

            this.drawRectangle(
            {
                'x': x,
                'y': y,
                'color': '#f8e0b8',
                'width': 4,
                'height': 2
            });
            
            this.drawRectangle(
            {
                'x': x+2,
                'y': y+2,
                'color': '#f8e0b8',
                'width': 4,
                'height':2
            });
            
            this.drawRectangle(
            {
                'x': x+12,
                'y': y,
                'color': '#f8e0b8',
                'width': 4,
                'height':2
            });
            
            this.drawRectangle(
            {
                'x': x+10,
                'y': y+2,
                'color': '#f8e0b8',
                'width': 4,
                'height':2
            });
        }
	},
	'eventStep': function()
	{		
		if(this.keyWaitingForRelease!=0 && this.canInteract() && !Game.isKeyPressed(this.keyWaitingForRelease))
		{
			this.eventKeyUp(this.keyWaitingForRelease);
		}

		if(this.y>=1 && this.y!=this.yprev && (this.state<Element.STATE_ROLL_UP || this.state>Element.STATE_ROLL_RIGHT))
		{
			this.setZIndex(this.y+10);
		}
		
		if(Game.room.isHouse && this.vspeed>0 && this.y>=this.ystart)
		{
			this.goOut();
		}
	},
	'checkSprite': function()
	{
		if(this.state!=Element.STATE_DEATH && !this.isSpinAttacking)
		{
			this.sprite.imagespeed=0.8;
		}
		if(this.isDefending)
		{
			switch(this.defendingState)
			{
				case Element.STATE_STAND_DOWN:
					this.sprite.tiles=[144,145,146,147,148,149,150,151];
				break;
				
				case Element.STATE_STAND_UP:
					this.sprite.tiles=[152,153,154,155,156,157,158,159];
				break;
				
				case Element.STATE_STAND_LEFT:
					this.sprite.tiles=[160,161,162,163,164,165,166,167];
				break;
				
				case Element.STATE_STAND_RIGHT:
					this.sprite.tiles=[168,169,170,171,172,173,174,175];
				break;
			}
			if(this.hspeed==0 && this.vspeed==0)
			{
				this.sprite.tiles=this.sprite.tiles.slice(0,1);
			}
		}
		else if(this.isSpinAttacking)
		{
			if(this.startSpinTile>0)
			{
				this.sprite.tiles=[this.startSpinTile];
				
				do
				{
					if(++this.startSpinTile>184)
					{
						this.startSpinTile=176;
					}
					if(this.startSpinTile!=this.sprite.tiles[0])
					{
						this.sprite.tiles.push(this.startSpinTile);
					}
				}while(this.startSpinTile!=this.sprite.tiles[0]);
				this.startSpinTile=0;
			}
		}
		else
		{
			switch(this.state)
			{
				case Element.STATE_MOVE_DOWN:
					this.sprite.tiles=[2,3,4,5,6,7,8,9,10,11];
				break;
				
				case Element.STATE_MOVE_UP:
					this.sprite.tiles=[13,14,15,16,17,18,19,20,21,22];
				break;
				
				case Element.STATE_MOVE_LEFT:
					this.sprite.tiles=[24,25,26,27,28,29,30,31,32,33];
				break;
				
				case Element.STATE_MOVE_RIGHT:
					this.sprite.tiles=[35,36,37,38,39,40,41,42,43,44];
				break;
				
				case Element.STATE_STAND_DOWN:
					this.sprite.tiles=[1];
				break;
				
				case Element.STATE_STAND_UP:
					this.sprite.tiles=[12];
				break;
				
				case Element.STATE_STAND_LEFT:
					this.sprite.tiles=[23];
				break;
				
				case Element.STATE_STAND_RIGHT:
					this.sprite.tiles=[34];
				break;
				
				case Element.STATE_ATTACK_RIGHT:
					this.sprite.tiles=[71,72,73,74];
				break;
				
				case Element.STATE_ATTACK_LEFT:
					this.sprite.tiles=[67,68,69,70];
				break;
				
				case Element.STATE_ATTACK_UP:
					this.sprite.tiles=[61,62,63,64,65];
				break;
				
				case Element.STATE_ATTACK_DOWN:
					this.sprite.tiles=[56,57,58,59,60];
				break;
				
				case Element.STATE_ROLL_RIGHT:
					if(!this.holdObject){this.sprite.tiles=[87,88,89,90,91,92]};
				break;
				
				case Element.STATE_ROLL_LEFT:
					if(!this.holdObject){this.sprite.tiles=[75,76,77,78,79,80]};
				break;
				
				case Element.STATE_ROLL_UP:
					if(!this.holdObject){this.sprite.tiles=[81,82,83,84,85,86]};
				break;
				
				case Element.STATE_ROLL_DOWN:
					if(!this.holdObject){this.sprite.tiles=[93,94,95,96,97,98]};
				break;
                
                case Element.STATE_PUSH_RIGHT:
					this.sprite.tiles=[203,204,205,206,206,208];
				break;
				
				case Element.STATE_PUSH_LEFT:
					this.sprite.tiles=[197,198,199,200,201,202];
				break;
				
				case Element.STATE_PUSH_UP:
					this.sprite.tiles=[191,192,193,194,195,196];
				break;
				
				case Element.STATE_PUSH_DOWN:
					this.sprite.tiles=[185,186,187,188,189,190];
				break;
				
				case Element.STATE_DEATH:
					this.sprite.tiles=[47,48,49,50,47,48,49,50,51,52,53,54,55,55,55,55,55];
				break;
				
				case Element.STATE_HAPPY:
					this.sprite.tiles=[45,46];
				break;
			}
			
			//Set sprite to "Link is holding something"
			if(this.holdObject && this.state<Element.STATE_ROLL_UP && this.state!=Element.STATE_DEATH)
			{
				for(var i=0,l=this.sprite.tiles.length;i<l;i++)
				{
					this.sprite.tiles[i]+=99;
				}
			}
			
			if(this.newObject)
			{
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+4+this.newObject.deltaX-(this.hspeed<0?5:(this.hspeed>0?-5:0)),
					'y': this.y-26-Game.room.view_y+this.newObject.deltaY-(this.vspeed<0?10:0),
					'sprite': this.newObject,
					'opacity': 100
				});
			}
		}
	},
	'checkTransition': function()
	{
        if(!this.viewTransition)
		{
			if(this.y+this.sprite.height/2>=Game.room.view_y+Game.room.view_h && this.vspeed>0)
			{
				this.viewTransition=true;
				this.viewTransitionY=32;
				this.hspeed=0;
				this.vspeed=0;
			}
			else if(this.y+this.sprite.height/2<=Game.room.view_y && this.vspeed<0)
			{
				this.viewTransition=true;
				this.viewTransitionY=-32;
				this.hspeed=0;
				this.vspeed=0;
			}
			else if(this.x+this.sprite.width/2<=Game.room.view_x && this.hspeed<0)
			{
				this.viewTransition=true;
				this.viewTransitionX=-32;
				this.hspeed=0;
				this.vspeed=0;
			}
			else if(this.x+this.sprite.width/2>=Game.room.view_x+Game.room.view_w && this.hspeed>0)
			{
				this.viewTransition=true;
				this.viewTransitionX=32;
				this.hspeed=0;
				this.vspeed=0;
			}
		}
		else
		{
			Game.room.view_x+=this.viewTransitionX;
			Game.room.view_y+=this.viewTransitionY;
			if(Game.room.view_x%Game.room.view_w==0 && Game.room.view_y%Game.room.view_h==0)
			{
				this.viewTransition=false;
				this.viewTransitionX=0;
				this.viewTransitionY=0;
				
				if(this.isRolling)
				{			
					if(this.moveToPointCallBack.f)
                    {
                        this.moveToPointCallBack.f.apply(this);
                    }
					this.moveToPointCallBack={};
					this.eventEndAnimation([Element.STATE_ROLL_DOWN,Element.STATE_ROLL_UP,Element.STATE_ROLL_LEFT,Element.STATE_ROLL_RIGHT]);	
				}
				else
				{
					this.eventEndAnimation([Element.STATE_MOVE_DOWN,Element.STATE_MOVE_UP,Element.STATE_MOVE_LEFT,Element.STATE_MOVE_RIGHT]);
				}
			}
		}
	},
	'eventKeyPressed': function(key)
	{
		switch(key)
		{
			case Game.KEY_DOWN:
			case Game.KEY_UP:
			case Game.KEY_LEFT:
			case Game.KEY_RIGHT:
			case Game.KEY_SPACE:
				return false;
		}
	},
	'eventKeyDown': function(key)
	{
		if(this.canInteract())
		{
			switch(key)
			{
				case Game.data.controls.DOWN:
					this.vspeed=this.speed;
					
					if(this.state!=Element.STATE_MOVE_LEFT && this.state!=Element.STATE_MOVE_RIGHT)
					{
						this.state=Element.STATE_MOVE_DOWN;
					}
				return false;
				
				case Game.data.controls.UP:
					this.vspeed=-this.speed;
					if(this.state!=Element.STATE_MOVE_LEFT && this.state!=Element.STATE_MOVE_RIGHT)
					{
						this.state=Element.STATE_MOVE_UP;
					}
				return false;
				
				case Game.data.controls.RIGHT:
					this.hspeed=this.speed;
					if(this.state!=Element.STATE_MOVE_DOWN && this.state!=Element.STATE_MOVE_UP)
					{
						this.state=Element.STATE_MOVE_RIGHT;
					}
				return false;
				
				case Game.data.controls.LEFT:
					this.hspeed=-this.speed;
					if(this.state!=Element.STATE_MOVE_DOWN && this.state!=Element.STATE_MOVE_UP)
					{
						this.state=Element.STATE_MOVE_LEFT;
					}
				return false;
				
				case Game.KEY_ENTER:
					Game.instanceCreate(0,0,PauseMenu);
				return false;
				
				case Game.data.controls.SHIELD:
					if(!this.isDefending && (Game.data.dekuShieldIsEquiped || Game.data.hylianShieldIsEquiped || Game.data.mirrorShieldIsEquiped))
					{
						this.prepareDefense(ShieldWeapon,Game.data.controls.SHIELD);
					}
				return false;
				
				case Game.data.controls.OBJECT1:
					if(Game.data.equipedObject1 && !this.isDefending)
					{
						Game.data.equipedObject1.use();
					}
				return false;
				
				case Game.data.controls.OBJECT2:
					if(Game.data.equipedObject2 && !this.isDefending)
					{
						Game.data.equipedObject2.use();
					}
				return false;
				
				case Game.data.controls.OBJECT3:
					if(Game.data.equipedObject3 && !this.isDefending)
					{
						Game.data.equipedObject3.use();
					}
				return false;
				
				case Game.data.controls.SWORD:
					if(!this.isDefending && !this.isPushing() && (Game.data.swordIsEquiped || Game.data.masterSwordIsEquiped || Game.data.giantSwordIsEquiped) && !this.holdObject)
					{
						this.createSword(Sword);
					}
				return false;
				
				case Game.data.controls.ACTION:
					if(!this.isDefending)
					{
						if(this.holdObject)
						{
							switch(this.state)
							{
								case Element.STATE_MOVE_DOWN:
								case Element.STATE_STAND_DOWN:
									this.holdObject.vspeed=12;
								break;
								
								case Element.STATE_MOVE_RIGHT:
								case Element.STATE_STAND_RIGHT:
									this.holdObject.hspeed=12;
								break;
								
								case Element.STATE_MOVE_UP:
								case Element.STATE_STAND_UP:
									this.holdObject.vspeed=-12;
								break;
								
								case Element.STATE_MOVE_LEFT:
								case Element.STATE_STAND_LEFT:
									this.holdObject.hspeed=-12;
								break;
							}
							this.holdObject.xstart=this.holdObject.x;
							this.holdObject.ystart=this.holdObject.y;
							this.holdObject.setZIndex(this.holdObject.y+10);
							this.holdObject.gravity=this.holdObject.hspeed!=0?0.4:0;
							this.holdObject.checkForCollisions=true;
							this.holdObject.collideSolid=true;
							this.holdObject.visible=true;
							this.holdObject=null;
							this.newObject=null;
							Game.playSound('throw_item');
                            return false;
						}
						else
						{
							switch(this.state)
							{
								case Element.STATE_MOVE_UP:
								case Element.STATE_STAND_UP:
									var o=Game.getInstancesIn(this.x+18,this.y,4,8,{'elements':[this]});
									if(o.length>0)
									{
										var obj=this.instanceNearest(Sign,this.x,this.y,o);
										if(obj)
										{
											var m=Game.instanceCreate(0,0,Message);
											m.message=obj.message;
                                            return false;
										}
										else
										{
											obj=this.instanceNearest(Chest,this.x,this.y,o);
											if(obj && !obj.chestObject.open)
											{
												this.state=Element.STATE_HAPPY;
												this.newObject=obj.open();
                                                return false;
											}
											else
											{
												obj=this.instanceNearest(Characters,this.x,this.y,o);
												if(obj)
												{
													obj.talk('tilesStandDown');
                                                    return false;
												}
												else
												{
													obj=this.instanceNearest(Holdable,this.x,this.y,o);
													if(obj)
													{
														obj.toHold();
                                                        return false;
													}
												}
											}
										}
									}
									else
									{
										if(!this.navi.hey && this.vspeed<0 && this.yprev>this.y)
										{
											this.state=Element.STATE_ROLL_UP;
											this.isRolling=true;
											this.moveToPoint(this.x,this.y-96,6,function()
											{
												this.vspeed=0;
												this.hspeed=0;
												this.isRolling=false;
												this.eventEndAnimation([Element.STATE_ROLL_DOWN,Element.STATE_ROLL_UP,Element.STATE_ROLL_LEFT,Element.STATE_ROLL_RIGHT]);							
											});
											this.hspeed=0;
											Game.playSound('attack'+Game.random(1,3));
                                            return false;
										}
									}
								break;
								
								case Element.STATE_MOVE_LEFT:
								case Element.STATE_STAND_LEFT:
									var o=Game.getInstancesIn(this.x,this.y+26,8,8,{'elements':[this]});
									if(o.length>0)
									{
										obj=this.instanceNearest(Characters,this.x,this.y,o);
										if(obj)
										{
											obj.talk('tilesStandRight');
                                            return false;
										}
										else
										{
											obj=this.instanceNearest(Holdable,this.x,this.y,o);
											if(obj)
											{
												obj.toHold();
                                                return false;
											}
										}
									}
									else
									{
										if(!this.navi.hey && this.hspeed<0  && this.xprev>this.x)
										{
											this.state=Element.STATE_ROLL_LEFT;
											this.isRolling=true;
											this.moveToPoint(this.x-96,this.y,6,function()
											{
												this.vspeed=0;
												this.hspeed=0;
												this.isRolling=false;
												this.eventEndAnimation([Element.STATE_ROLL_DOWN,Element.STATE_ROLL_UP,Element.STATE_ROLL_LEFT,Element.STATE_ROLL_RIGHT]);
											});
											this.vspeed=0;
											Game.playSound('attack'+Game.random(1,3));
                                            return false;
										}
									}
								break;
								
								case Element.STATE_MOVE_DOWN:
								case Element.STATE_STAND_DOWN:
									var o=Game.getInstancesIn(this.x+18,this.y+this.sprite.height,4,8,{'elements':[this]});
									if(o.length>0)
									{
										obj=this.instanceNearest(Characters,this.x,this.y,o);
										if(obj)
										{
											obj.talk('tilesStandUp');
                                            return false;
										}
										else
										{
											obj=this.instanceNearest(Holdable,this.x,this.y,o);
											if(obj)
											{
												obj.toHold();
                                                return false;
											}
										}
									}
									else
									{
										if(!this.navi.hey && this.vspeed>0  && this.yprev<this.y)
										{
											this.state=Element.STATE_ROLL_DOWN;
											this.isRolling=true;
											this.moveToPoint(this.x,this.y+96,6,function()
											{
												this.vspeed=0;
												this.hspeed=0;
												this.isRolling=false;
												this.eventEndAnimation([Element.STATE_ROLL_DOWN,Element.STATE_ROLL_UP,Element.STATE_ROLL_LEFT,Element.STATE_ROLL_RIGHT]);
							
											});
											this.hspeed=0;
											Game.playSound('attack'+Game.random(1,3));
                                            return false;
										}
									}
								break;
								
								case Element.STATE_MOVE_RIGHT:
								case Element.STATE_STAND_RIGHT:
									var o=Game.getInstancesIn(this.x-8+this.sprite.width,this.y+26,8,8,{'elements':[this]});
									if(o.length>0)
									{
										obj=this.instanceNearest(Characters,this.x,this.y,o);
										if(obj)
										{
											obj.talk('tilesStandLeft');
                                            return false;
										}
										else
										{
											obj=this.instanceNearest(Holdable,this.x,this.y,o);
											if(obj)
											{
												obj.toHold();
                                                return false;
											}
										}
									}
									else
									{
										if(!this.navi.hey && this.hspeed>0  && this.xprev<this.x)
										{
											this.state=Element.STATE_ROLL_RIGHT;
											this.isRolling=true;
											this.moveToPoint(this.x+96,this.y,6,function()
											{
												this.vspeed=0;
												this.hspeed=0;
												this.isRolling=false;
												this.eventEndAnimation([Element.STATE_ROLL_DOWN,Element.STATE_ROLL_UP,Element.STATE_ROLL_LEFT,Element.STATE_ROLL_RIGHT]);
							
											});
											this.vspeed=0;
											Game.playSound('attack'+Game.random(1,3));
                                            return false;
										}
									}
								break;
							}
                            
                            if(this.navi.hey)
                            {
                                this.navi.hey = false;
                                Game.playSound('navi_listen');
                                this.navi.talk();
                                this.navi.setAlarm(1, this.navi.timeBeforeHey);
                            }
						}
					}
				return false;
			}
		}
	},
	'eventKeyUp': function(key)
	{
		if(this.canInteract())
		{
			switch(key)
			{
				case Game.data.controls.SHIELD:
				case Game.data.controls.SWORD:
				case Game.data.controls.OBJECT1:
				case Game.data.controls.OBJECT2:
				case Game.data.controls.OBJECT3:
					if(this.keyWaitingForRelease==key)
					{
						this.keyWaitingForRelease=0;
						if((!this.isPreparingSpin && key==Game.data.controls.SHIELD) || (this.isPreparingSpin && (key==Game.data.controls.SWORD || key==Game.data.controls.OBJECT1 || key==Game.data.controls.OBJECT2 || key==Game.data.controls.OBJECT3)))
						{
							this.isDefending=false;
							this.speed=4;
							
							if(this.isPreparingSpin)
							{
								this.hspeed=0;
								this.vspeed=0;
								this.isPreparingSpin=false;
								this.isSpinAttacking=true;
								this.sprite.imageindex=0;
								
                                var o=Game.instanceCreate(Game.Link.x,Game.Link.y,SpinSword);
                                if(key!=Game.data.controls.SWORD)
                                {
                                    o.transformToDekuStick();
                                    if(this.isPreparingFireSpin)
                                    {
                                        this.isPreparingFireSpin=false;
                                        o.toFire();
                                    }
                                }
                                
								switch(this.defendingState)
								{
									case Element.STATE_STAND_DOWN:
										this.state=Element.STATE_ATTACK_DOWN;
										this.startSpinTile=184;
									break;
									
									case Element.STATE_STAND_UP:
										this.state=Element.STATE_ATTACK_UP;
										this.startSpinTile=180;
									break;
									
									case Element.STATE_STAND_LEFT:
										this.state=Element.STATE_ATTACK_LEFT;
										this.startSpinTile=178;
									break;
									
									case Element.STATE_STAND_RIGHT:
										this.state=Element.STATE_ATTACK_RIGHT;
										this.startSpinTile=182;
									break;
								}
							}
							else
							{
								if(this.hspeed!=0)
								{
									this.hspeed*=(this.speed/Math.abs(this.hspeed));
								}
								if(this.vspeed!=0)
								{
									this.vspeed*=(this.speed/Math.abs(this.vspeed));
								}
								this.state=this.defendingState;
								this.eventEndAnimation([Element.STATE_STAND_DOWN,Element.STATE_STAND_UP,Element.STATE_STAND_LEFT,Element.STATE_STAND_RIGHT]);
							}
						}
					}
				return false;
				
				case Game.data.controls.DOWN:
				case Game.data.controls.UP:				
					if(this.hspeed>0)
					{
						this.state=Element.STATE_MOVE_RIGHT;
						this.vspeed=0;
					}
					else if(this.hspeed<0)
					{
						this.state=Element.STATE_MOVE_LEFT;
						this.vspeed=0;
					}
					else
					{
						if(Game.isKeyPressed(Game.data.controls.UP))
						{
							this.vspeed=-this.speed;
							this.state=Element.STATE_MOVE_UP;
						}
						else if(Game.isKeyPressed(Game.data.controls.DOWN))
						{
							this.vspeed=this.speed;
							this.state=Element.STATE_MOVE_DOWN;
						}
						else
						{
							this.state=this.vspeed<0?Element.STATE_STAND_UP:Element.STATE_STAND_DOWN;
							this.vspeed=0;
						}
					}
				break;
				
				case Game.data.controls.RIGHT:
				case Game.data.controls.LEFT:			
					if(this.vspeed>0)
					{
						this.state=Element.STATE_MOVE_DOWN;
						this.hspeed=0;
					}
					else if(this.vspeed<0)
					{
						this.state=Element.STATE_MOVE_UP;
						this.hspeed=0;
					}
					else
					{
						if(Game.isKeyPressed(Game.data.controls.LEFT))
						{
							this.hspeed=-this.speed;
							this.state=Element.STATE_MOVE_LEFT;
						}
						else if(Game.isKeyPressed(Game.data.controls.RIGHT))
						{
							this.hspeed=this.speed;
							this.state=Element.STATE_MOVE_RIGHT;
						}
						else
						{
							this.state=this.hspeed<0?Element.STATE_STAND_LEFT:Element.STATE_STAND_RIGHT;
							this.hspeed=0;
						}
					}
				break;
			}
		}
	},
	'eventEndAnimation': function(states)
	{
		if(this.state==Element.STATE_HAPPY)
		{
			return false;
		}
		else if(this.state==Element.STATE_DEATH)
		{
			Game.restartRoom();
			Game.data.life=Game.data.max_life-Game.data.max_life%4;
		}
		else
		{
			var prevState=this.state;
			states=states!=undefined?states:[Element.STATE_ATTACK_DOWN,Element.STATE_ATTACK_UP,Element.STATE_ATTACK_LEFT,Element.STATE_ATTACK_RIGHT];
		
			if(this.isSpinAttacking)
			{
				this.isSpinAttacking=false;
			}
			
			switch(this.state)
			{
				case states[0]:
					if(this.state==Element.STATE_ATTACK_DOWN)
					{
						this.prepareSpin();
					}
					if(Game.isKeyPressed(Game.data.controls.DOWN))
					{
						this.vspeed=this.speed;
						this.state=Element.STATE_MOVE_DOWN;
					}
					else
					{
						this.state=Element.STATE_STAND_DOWN;
					}
					
					if(Game.isKeyPressed(Game.data.controls.RIGHT))
					{
						this.hspeed=this.speed;
						if(this.state==Element.STATE_STAND_DOWN)
						{
							this.state=Element.STATE_MOVE_RIGHT;
						}
					}
					if(Game.isKeyPressed(Game.data.controls.LEFT))
					{
						this.hspeed=-this.speed;
						if(this.state==Element.STATE_STAND_DOWN)
						{
							this.state=Element.STATE_MOVE_LEFT;
						}
					}
					if(Game.isKeyPressed(Game.data.controls.UP))
					{
						this.vspeed=-this.speed;
						if(this.state==Element.STATE_STAND_DOWN)
						{
							this.state=Element.STATE_MOVE_UP;
						}
					}
				break;
				
				case states[1]:
					if(this.state==Element.STATE_ATTACK_UP)
					{
						this.prepareSpin();
					}
					if(Game.isKeyPressed(Game.data.controls.UP))
					{
						this.vspeed=-this.speed;
						this.state=Element.STATE_MOVE_UP;
					}
					else
					{
						this.state=Element.STATE_STAND_UP;
					}
					
					if(Game.isKeyPressed(Game.data.controls.RIGHT))
					{
						this.hspeed=this.speed;
						if(this.state==Element.STATE_STAND_UP)
						{
							this.state=Element.STATE_MOVE_RIGHT;
						}
					}
					if(Game.isKeyPressed(Game.data.controls.LEFT))
					{
						this.hspeed=-this.speed;
						if(this.state==Element.STATE_STAND_UP)
						{
							this.state=Element.STATE_MOVE_LEFT;
						}
					}
					if(Game.isKeyPressed(Game.data.controls.DOWN))
					{
						this.vspeed=this.speed;
						if(this.state==Element.STATE_STAND_UP)
						{
							this.state=Element.STATE_MOVE_DOWN;
						}
					}
				break;
				
				case states[2]:
					if(this.state==Element.STATE_ATTACK_LEFT)
					{
						this.prepareSpin();
					}
					if(Game.isKeyPressed(Game.data.controls.LEFT))
					{
						this.hspeed=-this.speed;
						this.state=Element.STATE_MOVE_LEFT;
					}
					else
					{
						this.state=Element.STATE_STAND_LEFT;
					}
					
					if(Game.isKeyPressed(Game.data.controls.DOWN))
					{
						this.vspeed=this.speed;
						if(this.state==Element.STATE_STAND_LEFT)
						{
							this.state=Element.STATE_MOVE_DOWN;
						}
					}
					if(Game.isKeyPressed(Game.data.controls.UP))
					{
						this.vspeed=-this.speed;
						if(this.state==Element.STATE_STAND_LEFT)
						{
							this.state=Element.STATE_MOVE_UP;
						}
					}
					if(Game.isKeyPressed(Game.data.controls.RIGHT))
					{
						this.hspeed=this.speed;
						if(this.state==Element.STATE_STAND_LEFT)
						{
							this.state=Element.STATE_MOVE_RIGHT;
						}
					}
				break;
				
				case states[3]:
					if(this.state==Element.STATE_ATTACK_RIGHT)
					{
						this.prepareSpin();
					}
					if(Game.isKeyPressed(Game.data.controls.RIGHT))
					{
						this.hspeed=this.speed;
						this.state=Element.STATE_MOVE_RIGHT;
					}
					else
					{
						this.state=Element.STATE_STAND_RIGHT;
					}
					
					if(Game.isKeyPressed(Game.data.controls.DOWN))
					{
						this.vspeed=this.speed;
						if(this.state==Element.STATE_STAND_RIGHT)
						{
							this.state=Element.STATE_MOVE_DOWN;
						}
					}
					if(Game.isKeyPressed(Game.data.controls.UP))
					{
						this.vspeed=-this.speed;
						if(this.state==Element.STATE_STAND_RIGHT)
						{
							this.state=Element.STATE_MOVE_UP;
						}
					}
					if(Game.isKeyPressed(Game.data.controls.LEFT))
					{
						this.hspeed=-this.speed;
						if(this.state==Element.STATE_STAND_RIGHT)
						{
							this.state=Element.STATE_MOVE_LEFT;
						}
					}
				break;
			}
			if(this.state!=prevState)
			{
				this.checkSprite();
			}
		}
	},
	'eventCollisionWith': function(other)
	{
		if(this.canInteract() || this.isRolling)
		{
			if(other.instanceOf(Ennemy) && !this.hurt)
			{
				if(other.canBeBlocked)
                {
                    var shield = this.instanceNearest(ShieldWeapon);
                    if(shield)
                    {
                        var thisCenter = this.getCenter(true),
                            otherCenter = other.getCenter(true);
                            
                        if(Math.abs(otherCenter.x - thisCenter.x) > Math.abs(otherCenter.y - thisCenter.y))
                        {
                            if(this.defendingState==Element.STATE_STAND_RIGHT && thisCenter.x<=otherCenter.x)
                            {
                                this.x-=16;
                                this.moveToCollision({"x":1});
                                if(other.instanceOf(Bullets))
                                {
                                    other.bounce();
                                }
                                return;
                            }
                            else if(this.defendingState==Element.STATE_STAND_LEFT && thisCenter.x>=otherCenter.x)
                            {
                                this.x+=16;
                                this.moveToCollision({"x":-1});
                                if(other.instanceOf(Bullets))
                                {
                                    other.bounce();
                                }
                                return;
                            }
                            
                        } else
                        {
                            if(this.defendingState==Element.STATE_STAND_DOWN && thisCenter.y<=otherCenter.y)
                            {
                                this.y-=16;
                                this.moveToCollision({"y":1});
                                if(other.instanceOf(Bullets))
                                {
                                    other.bounce();
                                }
                                return;
                            }
                            else if(this.defendingState==Element.STATE_STAND_UP && thisCenter.y>=otherCenter.y)
                            {
                                this.y+=16;
                                this.moveToCollision({"y":-1});
                                if(other.instanceOf(Bullets))
                                {
                                    other.bounce();
                                }
                                return;
                            }
                        }
                    }
                }
                
                Game.data.life-=other.damage;
				Game.playSound('hurt');
                
                if(other.instanceOf(Bullets))
                {
                    Game.instanceDestroy(other);
                }
				
				if(Game.data.life<=0)
				{
					this.isDefending=false;
					this.state=Element.STATE_DEATH;
					this.sprite.imageindex=0;
					this.sprite.imagespeed=0.45;
					this.hspeed=0;
					this.vspeed=0;
				}
				else
				{
					this.hurt=true;
					this.opacity=35;
					this.setAlarm(1,1);
				}
			}
			else if(other.solid || (other.instanceOf(SolidJump) && other.goodDirection(this)))
			{
				if(this.isRolling)
                {
                    if(this.moveToPointCallBack.f)
                    {
                        this.moveToPointCallBack.f.apply(this);
                    }
                    this.moveToPointCallBack={};
                }
                
                if(Game.keyspressed.length===1 && other.instanceOf(Pushable))
                {
                    switch(this.state)
                    {
                        case Element.STATE_MOVE_DOWN:
                            this.state = Element.STATE_PUSH_DOWN;
                        break;
                        
                        case Element.STATE_MOVE_UP:
                            this.state = Element.STATE_PUSH_UP;
                        break;
                        
                        case Element.STATE_MOVE_LEFT:
                            this.state = Element.STATE_PUSH_LEFT;
                        break;
                        
                        case Element.STATE_MOVE_RIGHT:
                            this.state = Element.STATE_PUSH_RIGHT;
                        break;
                    }
                }
			}
		}
	},
	'eventAlarm1': function() //After hurting
	{
		this.opacity=100;
		this.hurt=false;
	},
    'moveToCollision': function(directionObject)
    {
        var mask = this.sprite.getMask();
        
        directionObject.x = directionObject.x == undefined ? 0 : directionObject.x;
        directionObject.y = directionObject.y == undefined ? 0 : directionObject.y;
        
        if(directionObject.x!=0 || directionObject.y!=0)
        {
            while(Game.placeIsFree(this.x+mask.x, this.y+mask.y, mask.width, mask.height) !== true)
            {
                this.x+=directionObject.x;
                this.y+=directionObject.y;
            }
        }
        else
        {
            alert('<Link.moveToCollision> Given values are null: risk of infinite loop!');
        }
    }
});

Element.STATE_HAPPY=28;
Element.STATE_ATTACK_UP=29;
Element.STATE_ATTACK_DOWN=30;
Element.STATE_ATTACK_LEFT=31;
Element.STATE_ATTACK_RIGHT=32;
Element.STATE_ROLL_UP=33;
Element.STATE_ROLL_DOWN=34;
Element.STATE_ROLL_LEFT=35;
Element.STATE_ROLL_RIGHT=36;
Element.STATE_PUSH_UP=37;
Element.STATE_PUSH_DOWN=38;
Element.STATE_PUSH_LEFT=39;
Element.STATE_PUSH_RIGHT=40;