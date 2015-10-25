Game.addClass({
	'name': 'Characters',
	'parent': 'Overlay',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Overlay);
		this.message='...';
				
		if(Game.room.name=='kokiri')
		{
			var fairie=true;
            //Saria
            if(this.x==704 && this.y==576)
			{
				if(Game.data.firstLaunch)
                {
                    Game.instanceDestroy(this);
                    fairie=false;
                }
                else
                {
                    // Game.instanceDestroy(this);fairie=false; //TODO: Delete this line!
                    this.message=Game.getTranslation('saria_first_message', {
                    '=USERNAME=': Game.getUsername()
                    });
                    this.sprite=new Sprite(Game.getImage('saria'));
                    this.sprite.makeTiles(34,46,1);
                    var mask=
                    {
                        'x': 2,
                        'y': 8,
                        'width': 30,
                        'height': 32
                    };
                    for(var i=1; i<16; i++)
                    {
                        this.sprite.setMask(i,mask);
                    }
                    this.tilesStandDown=[1];
                    this.tilesStandUp=[4];
                    this.tilesStandLeft=[7];
                    this.tilesStandRight=[10];
                }
			}
			
			fairie?Game.instanceCreate(this.x+32,this.y,Fairie):null;
		}
	},
	'talk': function(dir)
	{
		var m=Game.instanceCreate(0,0,Message);
		m.setMessage(this.message);
		this.sprite.tiles=this[dir];
	}
});

Game.addClass({
	'name': 'ShopCharacters',
	'parent': 'Characters',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Overlay);
		
		this.message='...';
		this.messageObject=null;
		this.isTalking=false;
		this.state=-1;
		
		this.spriteCursor=new Sprite(Game.getImage('cursor'));
		this.spriteCursor.makeTiles(56,48);
		this.spriteCursor.tiles=[1,2];
		this.spriteCursor.imagespeed=0.2;
        
        this.closeDialog = false;
				
		switch(Game.room.name)
		{
			case 'kokiri_shop':
				Game.instanceCreate(this.x+32,this.y,Fairie);
				this.message=Game.getTranslation('seller_kokiri_shop');
				
				this.objects=
				[
					{
						'type': Heart,
						'price': 10,
						'desc': Game.getTranslation('desc_kokiri_small_heart')
					},
					{
						'type': ArrowsItem,
						'quantity': 10,
						'price': 20,
						'desc': Game.getTranslation('desc_kokiri_arrows')
					},
					{
						'type': DekuNut,
						'quantity': 5,
						'price': 15,
						'desc': Game.getTranslation('desc_kokiri_deku_nut')
					},
					{
						'type': DekuStick,
						'price': 2,
						'desc': Game.getTranslation('desc_kokiri_deku_stick')
					},
					{
						'type': ArrowsItem,
						'quantity': 30,
						'price': 60,
						'desc': Game.getTranslation('desc_kokiri_arrows')
					},
					{
						'type': DekuSeeds,
						'quantity': 30,
						'price': 30,
						'desc': Game.getTranslation('desc_kokiri_deku_seeds')
					},
					{
						'type': ShieldItem,
						'price': 40,
						'desc': Game.getTranslation('desc_kokiri_deku_shield')
					},
					{
						'type': DekuNut,
						'quantity': 10,
						'price': 30,
						'desc': Game.getTranslation('desc_kokiri_deku_nut')
					}
				];
				
				this.sprite=new Sprite(Game.getImage('saria'));
				this.sprite.makeTiles(34,32,1);
				var mask=
				{
					'width': 34,
					'height': 68
				};
				for(var i=1; i<16; i++)
				{
					this.sprite.setMask(i,mask);
				}
			break;
		}
	},
	'talk': function()
	{
		if(!this.closeDialog)
        {
            var m=Game.instanceCreate(0,0,Message);
            m.y=Game.room.view_h-m.sprite.height-130;
            m.setMessage(this.message);
            m.fromShop=true;
            this.messageObject=m;
            this.state=-1;
            
            (function(t)
            {
                setTimeout(function()
                {
                    t.isTalking=true;
                },50);
            })(this);
        }
	},
	'eventStep': function()
	{
		this.closeDialog = false;
        for(var i=0; i<8; i++)
		{
			var topLeftX=210,
				topLeftY=148;
				
			if(i>3){topLeftY+=48;}
			if(i==2 || i==3 || i==6 || i==7){topLeftX+=96;}

			this.drawSprite(
			{
				'x': topLeftX+32*(i%4),
				'y': topLeftY,
				'sprite': this.objects[i].type.getSprite()
			});
		}
		
		if(this.isTalking)
		{
			if(!this.messageObject.askConfirm)
			{
				var i=this.state;
				if(this.state>-1)
				{
					topLeftX=197;
					topLeftY=141;
					
					if(i==2 || i==3 || i==6 || i==7){topLeftX+=160;}
					
					if(i%2==1)
					{
						topLeftX+=32;
					}
				
					if(i>3){topLeftY+=48;}
				}
				else
				{
					topLeftX=this.x-13;
					topLeftY=this.y-7;
				}
				this.drawSprite(
				{
					'x': topLeftX,
					'y': topLeftY,
					'sprite': this.spriteCursor
				});
			}
			else
			{
				this.messageObject.drawSprite(
				{
					'x': this.messageObject.x+this.messageObject.sprite.width-80,
					'y': this.messageObject.y+15,
					'sprite': this.objects[this.state].type.getSprite()
				});
			}
		}
	},
	'eventKeyDown': function(key)
	{
		if(this.isTalking && !this.messageObject.askConfirm)
		{
			switch(key)
			{
				case Game.data.controls.ACTION:
					if(this.state==-1)
					{
						Game.instanceDestroy(this.messageObject);
						this.isTalking=false;
                        this.closeDialog = true;
					}
					else
					{
						var o=this.objects[this.state];
						
						this.messageObject.setMessage(Game.getTranslation('confirm_purchase')+'\n'+(o.quantity?o.quantity+' ':'')+o.type.itemName+' : '+o.price+' '+Game.getTranslation('price_rupee'));
						this.messageObject.setConfirmTexts([Game.getTranslation('confirm_purchase_yes'),Game.getTranslation('confirm_purchase_no')]);
						this.messageObject.confirmValue=true;
						
						(function(t)
						{
							t.messageObject.setConfirmActions(
							[
								function()
								{
									var target=t.objects[t.state],
										newObject=target.type,
										message=Game.getTranslation('no_money'),
										conditionOK=true;
									
									if(newObject.condition)
									{
										var isAllowed=newObject.condition();
										if(isAllowed!==true)
										{
											conditionOK=false;
											message=isAllowed;
										}
									}
									
									if(conditionOK && Game.data.rupees>=target.price)
									{
										Game.data.rupees-=target.price;
										var o=Game.instanceCreate(0,0,newObject);
									
										if(target.quantity)
										{
											o.value=target.quantity;
										}
										
										//Action on datas of the new object
										Game.instanceDestroy(o);

										Game.Link.state=Element.STATE_HAPPY;
										Game.Link.newObject=newObject.getSprite();
										message=newObject.message;
									}
									var m=Game.instanceCreate(0,0,Message);
									m.setMessage(message);
									
									Game.instanceDestroy(t.messageObject);
									t.isTalking=false;
								},
								function()
								{
									t.messageObject.askConfirm=false;
									t.updateMessage();
								}
							]);
						})(this);
						
						(function(t)
						{
							setTimeout(function()
							{
								t.askConfirm=true;
							},50);
						})(this.messageObject);
					}
				return false;
				
				case Game.data.controls.LEFT:
					switch(this.state)
					{
						case -1: this.state=1; break;
						case 0: this.state=3; break;
						case 2: case 6: this.state=-1; break;
						case 4: this.state=7; break;
						default: this.state--; break;
					}
				break;
				
				case Game.data.controls.RIGHT:
					switch(this.state)
					{
						case -1: this.state=2; break;
						case 1: case 5: this.state=-1; break;
						case 3: this.state=0; break;
						case 7: this.state=4; break;
						default: this.state++; break;
					}
				break;
				
				case Game.data.controls.DOWN:
				case Game.data.controls.UP:
					if(this.state>-1)
					{
						this.state+=this.state<4?4:-4;
					}
					else
					{
						return false;
					}
				break;
				
				default: return false;
			}
			
			this.updateMessage();
			
			Game.playSound('pause_cursor');
			return false;
		}
	},
	'updateMessage': function()
	{
		var o=this.objects[this.state];
		this.messageObject.setMessage(this.state==-1?this.message:((o.quantity?o.quantity+' ':'')+o.type.itemName.toUpperCase()+' : '+o.price+' '+Game.getTranslation('price_rupee')+'\n'+o.desc));
	}
});