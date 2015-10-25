Game.addClass({
	'name': 'PauseMenu',
	'parent': 'FreezeGame',
	'changeMainTitle': function()
	{
		switch(this.state)
		{
			case PauseMenu.INVENTORY:
				this.mainTitle=Game.getTranslation('pause_inventory');
			return false;
			
			case PauseMenu.MAP:
				this.mainTitle=Game.getTranslation('pause_map');
			return false;
			
			case PauseMenu.QUEST_STATUS:
				this.mainTitle=Game.getTranslation('pause_status');
			return false;
			
			case PauseMenu.EQUIPMENTS:
				this.mainTitle=Game.getTranslation('pause_equipment');
			return false;
		}
	},
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('menu'));
		this.sprite.makeTiles(416,266);
		
		this.spriteMessage=new Sprite(Game.getImage('message'));
		this.messageX=Game.room.view_w/2-this.spriteMessage.width/2;
		
		this.spriteCursor=new Sprite(Game.getImage('cursor'));
		this.spriteCursor.makeTiles(56,48);
		this.spriteCursor.tiles=[1,2];
		this.spriteCursor.imagespeed=0.2;
		
		this.spriteCursorHeart=new Sprite(Game.getImage('cursor_heart'));
		this.spriteCursorHeart.makeTiles(76,72);
		this.spriteCursorHeart.tiles=[1,2];
		this.spriteCursorHeart.imagespeed=0.2;
		
		this.spriteCursorSave=new Sprite(Game.getImage('cursor_save'));
		this.spriteCursorSave.makeTiles(104,44);
		this.spriteCursorSave.tiles=[1,2];
		this.spriteCursorSave.imagespeed=0.2;
		
		this.spriteSelected=new Sprite(Game.getImage('pause_selected'));
		
		this.spriteArrowLeft=new Sprite(Game.getImage('pause_arrows'));
		this.spriteArrowLeft.makeTiles(30,38);
		this.spriteArrowLeft.tiles=[1];
		this.spriteArrowRight=new Sprite(Game.getImage('pause_arrows'));
		this.spriteArrowRight.makeTiles(30,38);
		this.spriteArrowRight.tiles=[2];
		this.arrowY=Game.room.view_h/2-this.spriteArrowLeft.height/2+15;
		this.arrowLeftX=50;
		this.arrowRightX=Game.room.view_w-this.spriteArrowRight.width-this.arrowLeftX;
		
		this.spritePartHeart=new Sprite(Game.getImage('pause_heart'));
		this.spritePartHeart.makeTiles(52,48);
		this.spritePartHeart.tiles=[Game.data.max_life%4+1];
		this.x=Game.room.view_x+Game.room.view_w/2-this.sprite.width/2;
		this.y=Game.room.view_y+Game.room.view_h/2-this.sprite.height/2+20;
		
		this.state=Game.data.pause_menu_default_screen;
		this.subState=Game.data.pause_menu_default_cursor_position;
		this.maxSubstate=17;
		
		this.changeMainTitle();
		
		this.callParent('eventCreate',[],FreezeGame);
		
		Game.pauseMenu=true;
		
		Game.playSound('pause_open');
		
		//Cursor positions
		this.cursorPos=
		{
			1: //Inventory
			[
				{'x':this.arrowLeftX-this.x+Game.room.view_x-10,'y':this.arrowY-this.y+Game.room.view_y-5},
				{'x':72,'y':33,'type':DekuStick},
				{'x':144,'y':33,'type':DekuNut},
				{'x':216,'y':33},
				{'x':288,'y':33},
				{'x':72,'y':81/*,'type':Slingshot*/},
				{'x':144,'y':81},
				{'x':216,'y':81},
				{'x':288,'y':81},
				{'x':72,'y':129},
				{'x':144,'y':129},
				{'x':216,'y':129},
				{'x':288,'y':129},
				{'x':72,'y':177},
				{'x':144,'y':177},
				{'x':216,'y':177},
				{'x':288,'y':177},
				{'x':this.arrowRightX-this.x+Game.room.view_x-15,'y':this.arrowY-this.y+Game.room.view_y-5}
			],
			2: //Equipment
			[
				{'x':this.arrowLeftX-this.x+Game.room.view_x-10,'y':this.arrowY-this.y+Game.room.view_y-5},
				{'x':72,'y':33},
				{'x':144,'y':33},
				{'x':216,'y':33},
				{'x':288,'y':33},
				{'x':72,'y':81},
				{'x':144,'y':81},
				{'x':216,'y':81},
				{'x':288,'y':81},
				{'x':72,'y':129},
				{'x':144,'y':129},
				{'x':216,'y':129},
				{'x':288,'y':129},
				{'x':72,'y':177},
				{'x':144,'y':177},
				{'x':216,'y':177},
				{'x':288,'y':177},
				{'x':this.arrowRightX-this.x+Game.room.view_x-15,'y':this.arrowY-this.y+Game.room.view_y-5}
			],
			3: //Map
			[
				{'x':this.arrowLeftX-this.x+Game.room.view_x-10,'y':this.arrowY-this.y+Game.room.view_y-5},
				{'x':this.arrowRightX-this.x+Game.room.view_x-15,'y':this.arrowY-this.y+Game.room.view_y-5}
			],
			4: //Quest Status
			[
				{'x':this.arrowLeftX-this.x+Game.room.view_x-10,'y':this.arrowY-this.y+Game.room.view_y-5},
				{'x': 37,'y':44},
				{'x': 116,'y':57},
				{'x': 216,'y':52},
				{'x': 264,'y':52},
				{'x': 312,'y':52},
				{'x': 32,'y':133},
				{'x': 56,'y':133},
				{'x': 80,'y':133},
				{'x': 104,'y':133},
				{'x': 128,'y':133},
				{'x': 152,'y':133},
				{'x': 213,'y':131},
				{'x': 265,'y':131},
				{'x': 317,'y':131},
				{'x': 32,'y':171},
				{'x': 56,'y':171},
				{'x': 80,'y':171},
				{'x': 104,'y':171},
				{'x': 128,'y':171},
				{'x': 152,'y':171},
				{'x': 213,'y':186},
				{'x': 265,'y':186},
				{'x': 317,'y':186},
				{'x':this.arrowRightX-this.x+Game.room.view_x-15,'y':this.arrowY-this.y+Game.room.view_y-5}
			]
		};
	},
	'eventKeyDown': function(key)
	{
        if(!this.isFreezed)
		{
            var playSound=true;

			switch(key)
			{
				case Game.KEY_ENTER:
					(function(t)
					{
						setTimeout(function(){if(t){Game.instanceDestroy(t);}},50);
					})(this);
				return false;
				
				case Game.data.controls.OBJECT1:
				case Game.data.controls.OBJECT2:
				case Game.data.controls.OBJECT3:
					if(this.state==PauseMenu.INVENTORY)
					{
						if(this.changeObject(key))
						{
							Game.playSound('pause_select');
						}
					}
				return false;
				
				case Game.data.controls.ACTION:
					playSound=false;
					if(this.subState==0)
					{
						this.goToPrev();
					}
					else if(this.subState==this.maxSubstate)
					{
						this.goToNext();
					}
					else
					{
						switch(this.state)
						{
							case PauseMenu.QUEST_STATUS:
								if(this.subState==2)
								{
									var m=Game.instanceCreate(0,0,Message),
										pause=this;
                                        
                                    m.toFirstPlan();
                                    
									m.eventDestroy=function()
									{
										pause.isFreezed=false;
									};
									
									if(Game.isConnected())
									{
										m.setMessage(Game.getTranslation('save_confirm'));
										m.setConfirmTexts([Game.getTranslation('confirm_save_yes'),Game.getTranslation('confirm_save_no')]);
										m.confirmValue=true;
										
										(function(t)
										{
											m.setConfirmActions(
											[
												function()
												{
													Game.saveGame(function(data)
													{
														if(data.success)
														{
															m.setMessage(Game.getTranslation('save_ok'));
														}
														else
														{
															m.setMessage(Game.getTranslation('save_failure')+' '+data.message);
														}
													},
													function(err)
													{
														m.setMessage(Game.getTranslation('save_failure')+' '+err);
													});
													m.askConfirm=false;
												},
												function()
												{
													Game.instanceDestroy(m);
												}
											]);
										})(this);
										
										(function(t)
										{
											setTimeout(function()
											{
												t.askConfirm=true;
											},50);
										})(m);
									}
									else
									{
										m.setMessage(Game.getTranslation('save_forbidden'));
									}
								}
							return false;
							
							case PauseMenu.EQUIPMENTS:
								if((this.subState-1)%4!=0)
								{
									switch(this.subState)
									{
										case 2:
										case 3:
										case 4:
											this.changeSword();
											Game.playSound('pause_select');
										break;
										
										case 6:
										case 7:
										case 8:
											this.changeShield();
											Game.playSound('pause_select');
										break;
										
										case 10:
										case 11:
										case 12:
											this.changeTunic();
											Game.playSound('pause_select');
										break;
										
										case 14:
										case 15:
										case 16:
											this.changeBoots();
											Game.playSound('pause_select');
										break;
									}
								}
							return false;
						}
					}
				break;
				
				case Game.data.controls.RIGHT:
					if(this.subState==this.maxSubstate)
					{
						this.goToNext();
						playSound=false;
					}
					else if((this.state!=PauseMenu.QUEST_STATUS && this.subState!=0 && this.subState%4==0) || (this.state==PauseMenu.QUEST_STATUS && this.subState==5))
					{
						this.subState=this.maxSubstate;
					}
					else if(this.state!=PauseMenu.QUEST_STATUS && this.subState!=0 && this.subState%4==0)
					{
						this.subState=this.maxSubstate;
					}
					else if(this.state==PauseMenu.QUEST_STATUS && (this.subState==5 || this.subState==14 || this.subState==23))
					{
						this.subState=this.maxSubstate;
					}
					else
					{
						this.subState++;
					}
				break;
				
				case Game.data.controls.LEFT:
					if(this.subState==0)
					{
						this.goToPrev();
						playSound=false;
					}
					else if((this.state!=PauseMenu.QUEST_STATUS && this.subState!=this.maxSubstate && (this.subState-1)%4==0) || (this.state==PauseMenu.QUEST_STATUS && (this.subState==6 || this.subState==15)))
					{
						this.subState=0;
					}
					else if(this.subState==this.maxSubstate)
					{
						this.subState=this.state==PauseMenu.MAP?0:(this.state==PauseMenu.QUEST_STATUS?5:4);
					}
					else
					{
						this.subState--;
					}
				break;
				
				case Game.data.controls.DOWN:
					if(this.subState!=0 && this.subState!=this.maxSubstate)
					{
						if(this.state==PauseMenu.QUEST_STATUS)
						{
							if(this.subState==1 || this.subState==2)
							{						
								this.subState=6;
							}
							else if(this.subState>=3 && this.subState<=14)
							{
								this.subState+=9;
							}
							else if(this.subState>=15 && this.subState<=17)
							{
								this.subState=1;
							}
							else if(this.subState>=18 && this.subState<=20)
							{
								this.subState=2;
							}
							else
							{
								this.subState-=18;
							}
						}
						else
						{
							this.subState+=(this.subState<13)?4:-12;
						}
					}
					else
					{
						playSound=false;
					}
				break;
				
				case Game.data.controls.UP:
					if(this.subState!=0 && this.subState!=this.maxSubstate)
					{
						if(this.state==PauseMenu.QUEST_STATUS)
						{
							if(this.subState==1 || this.subState==2)
							{						
								this.subState=15;
							}
							else if(this.subState>=3 && this.subState<=5)
							{
								this.subState+=18;
							}
							else if(this.subState>=6 && this.subState<=8)
							{
								this.subState=1;
							}
							else if(this.subState>=9 && this.subState<=11)
							{
								this.subState=2;
							}
							else
							{
								this.subState-=9;
							}
						}
						else
						{
							this.subState-=(this.subState>4)?4:-12;
						}
					}
					else
					{
						playSound=false;
					}
				break;
				
				default: playSound=false; break;
			}
			
			if(playSound){Game.playSound('pause_cursor');}
			
			this.changeMainTitle();
		}
		return false;
	},
	'eventStep': function()
	{
		//Main sprite
		this.sprite.tiles=[this.state];
		
		//Main title
		this.drawSprite(
		{
			'x': this.messageX,
			'y': 30,
			'sprite': this.spriteMessage
		});	
		var mainTitle={
			'x': 0,
			'y': 60,
			'color': '#e3e3e3',
			'font': '30px Calibri',
			'text': this.mainTitle
		};	
		mainTitle.x=Game.room.view_w/2-Game.widthOfText(mainTitle)/2;				
		this.drawText(mainTitle);
		
		//Subtitle
		var text='???';
		switch(this.state)
		{
			case PauseMenu.INVENTORY:
				switch(this.subState)
				{
					case 0: text=Game.getTranslation('pause_to_status'); break;
					case 1: if(Game.data.hasDekuStick){text=Game.getTranslation('name_deku_stick')+' ('+Game.data.deku_sticks+'/'+Game.data.max_deku_sticks+')';} break;
					case 2: if(Game.data.hasDekuNut){text=Game.getTranslation('name_deku_nut')+' ('+Game.data.deku_nuts+'/'+Game.data.max_deku_nuts+')';} break;
					case 5: if(Game.data.hasSlingshot){text=Game.getTranslation('name_slingshot')+' ('+Game.data.deku_seeds+'/'+Game.data.max_deku_seeds+')';} break;
					case this.maxSubstate: text=Game.getTranslation('pause_to_equipment'); break;
				}
			break;
			
			case PauseMenu.MAP:
				switch(this.subState)
				{
					case 0: text=Game.getTranslation('pause_to_equipment'); break;
					case this.maxSubstate: text=Game.getTranslation('pause_to_status'); break;
				}
			break;
			
			case PauseMenu.QUEST_STATUS:
				switch(this.subState)
				{
					case 0: text=Game.getTranslation('pause_to_map'); break;
					case 1: text=Game.getTranslation('pause_heart')+' ('+(Game.data.max_life%4)+'/4)'; break;
					case 2: text=Game.getTranslation('pause_save'); break;
					case this.maxSubstate: text=Game.getTranslation('pause_to_inventory'); break;
				}
			break;
			
			case PauseMenu.EQUIPMENTS:
				switch(this.subState)
				{
					case 0: text=Game.getTranslation('pause_to_inventory'); break;
					case 2: if(Game.data.hasSword){text=Sword.itemName;} break;
					case 3: if(Game.data.hasMasterSword){text=MasterSword.itemName;} break;
					case 4: if(Game.data.hasGiantSword){text=GiantSword.itemName;} break;
					case 6: if(Game.data.hasDekuShield){text=ShieldItem.itemName;} break;
					case 7: if(Game.data.hasHylianShield){text=HylianShield.itemName;} break;
					case 8: if(Game.data.hasMirrorShield){text=MirrorShield.itemName;} break;
					case 10: text=Game.getTranslation('pause_green_tunic'); break;
					case 14: text=Game.getTranslation('pause_basic_boots'); break;
					case this.maxSubstate: text=Game.getTranslation('pause_to_map'); break;
				}
			break;
		}
			
		var subTitle={
			'x': 0,
			'y': Game.room.view_h-60,
			'color': '#e3e3e3',
			'borderColor': '#000000',
			'borderLength': 5,
			'font': '25px Calibri',
			'text': text
		};
		subTitle.x=Game.room.view_w/2-Game.widthOfText(subTitle)/2;				
		this.drawText(subTitle);
		
		//Arrows
		this.drawSprite(
		{
			'x': this.arrowLeftX,
			'y': this.arrowY,
			'sprite': this.spriteArrowLeft
		});
		
		this.drawSprite(
		{
			'x': this.arrowRightX,
			'y': this.arrowY,
			'sprite': this.spriteArrowRight
		});
		
		//QUEST STATUS
		if(this.state==PauseMenu.QUEST_STATUS)
		{
			this.drawSprite(
			{
				'x': this.x-Game.room.view_x+49,
				'y': this.y-Game.room.view_y+60,
				'sprite': this.spritePartHeart
			});
		}
		//EQUIPMENTS
		else if(this.state==PauseMenu.EQUIPMENTS)
		{
			if(Game.data.hasSword)
			{
				if(Game.data.swordIsEquiped)
				{
					this.drawSprite(
					{
						'x': this.x-Game.room.view_x+146,
						'y': this.y-Game.room.view_y+39,
						'sprite': this.spriteSelected
					});
				}
				
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+156,
					'y': this.y-Game.room.view_y+41,
					'sprite': Sprite.spriteKokiriSword
				});				
			}
			
			if(Game.data.hasMasterSword)
			{
				if(Game.data.masterSwordIsEquiped)
				{
					this.drawSprite(
					{
						'x': this.x-Game.room.view_x+218,
						'y': this.y-Game.room.view_y+39,
						'sprite': this.spriteSelected
					});
				}
				
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+228,
					'y': this.y-Game.room.view_y+41,
					'sprite': Sprite.spriteMasterSword
				});				
			}
			
			if(Game.data.hasGiantSword)
			{
				if(Game.data.giantSwordIsEquiped)
				{
					this.drawSprite(
					{
						'x': this.x-Game.room.view_x+290,
						'y': this.y-Game.room.view_y+39,
						'sprite': this.spriteSelected
					});
				}
				
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+300,
					'y': this.y-Game.room.view_y+41,
					'sprite': Sprite.spriteGiantSword
				});				
			}
			
			if(Game.data.hasDekuShield)
			{
				if(Game.data.dekuShieldIsEquiped)
				{
					this.drawSprite(
					{
						'x': this.x-Game.room.view_x+146,
						'y': this.y-Game.room.view_y+87,
						'sprite': this.spriteSelected
					});
				}
				
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+156,
					'y': this.y-Game.room.view_y+89,
					'sprite': Sprite.spriteDekuShield
				});
			}
			
			if(Game.data.hasHylianShield)
			{
				if(Game.data.hylianShieldIsEquiped)
				{
					this.drawSprite(
					{
						'x': this.x-Game.room.view_x+218,
						'y': this.y-Game.room.view_y+87,
						'sprite': this.spriteSelected
					});
				}
				
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+228,
					'y': this.y-Game.room.view_y+89,
					'sprite': Sprite.spriteHylianShield
				});				
			}
			
			if(Game.data.hasMirrorShield)
			{
				if(Game.data.mirrorShieldIsEquiped)
				{
					this.drawSprite(
					{
						'x': this.x-Game.room.view_x+290,
						'y': this.y-Game.room.view_y+87,
						'sprite': this.spriteSelected
					});
				}
				
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+300,
					'y': this.y-Game.room.view_y+89,
					'sprite': Sprite.spriteMirrorShield
				});				
			}
			
			if(Game.data.greenTunicIsEquiped)
			{
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+146,
					'y': this.y-Game.room.view_y+135,
					'sprite': this.spriteSelected
				});
			}			
			this.drawSprite(
			{
				'x': this.x-Game.room.view_x+156,
				'y': this.y-Game.room.view_y+137,
				'sprite': Sprite.spriteGreenTunic
			});
			
			if(Game.data.hasRedTunic)
			{
				if(Game.data.redTunicIsEquiped)
				{
					this.drawSprite(
					{
						'x': this.x-Game.room.view_x+218,
						'y': this.y-Game.room.view_y+135,
						'sprite': this.spriteSelected
					});
				}
				
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+228,
					'y': this.y-Game.room.view_y+137,
					'sprite': Sprite.spriteRedTunic
				});				
			}
			
			if(Game.data.hasBlueTunic)
			{
				if(Game.data.blueTunicIsEquiped)
				{
					this.drawSprite(
					{
						'x': this.x-Game.room.view_x+290,
						'y': this.y-Game.room.view_y+135,
						'sprite': this.spriteSelected
					});
				}
				
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+300,
					'y': this.y-Game.room.view_y+137,
					'sprite': Sprite.spriteBlueTunic
				});				
			}
			
			if(Game.data.bootsAreEquiped)
			{
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+146,
					'y': this.y-Game.room.view_y+183,
					'sprite': this.spriteSelected
				});
			}
			this.drawSprite(
			{
				'x': this.x-Game.room.view_x+156,
				'y': this.y-Game.room.view_y+185,
				'sprite': Sprite.spriteBasicBoots
			});
			
			if(Game.data.hasIronBoots)
			{
				if(Game.data.ironBootsAreEquiped)
				{
					this.drawSprite(
					{
						'x': this.x-Game.room.view_x+218,
						'y': this.y-Game.room.view_y+183,
						'sprite': this.spriteSelected
					});
				}
				
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+228,
					'y': this.y-Game.room.view_y+185,
					'sprite': Sprite.spriteIronBoots
				});				
			}
			
			if(Game.data.hasHoverBoots)
			{
				if(Game.data.hoverBootsAreEquiped)
				{
					this.drawSprite(
					{
						'x': this.x-Game.room.view_x+290,
						'y': this.y-Game.room.view_y+183,
						'sprite': this.spriteSelected
					});
				}
				
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+300,
					'y': this.y-Game.room.view_y+185,
					'sprite': Sprite.spriteHoverBoots
				});				
			}
		}
		//INVENTORY
		else if(this.state==PauseMenu.INVENTORY)
		{
			for(var i=1; i<4; i++)
			{
				var o=Game.data['equipedObject'+i];
				if(o)
				{
					var c=this.cursorPos[1];
					for(var j=1, l=c.length; j<l; j++)
					{
						if(c[j].type==o)
						{
							this.drawSprite(
							{
								'x': this.x-Game.room.view_x+c[j].x+2,
								'y': this.y-Game.room.view_y+c[j].y+5,
								'sprite': this.spriteSelected
							});	
							break;
						}
					}
				}
			}
			
			if(Game.data.hasDekuStick)
			{
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+this.cursorPos[1][1].x+13,
					'y': this.y-Game.room.view_y+this.cursorPos[1][1].y+8,
					'sprite': Sprite.spriteDekuStick
				});
				
				this.drawText(Game.getStatsText(this.x-Game.room.view_x+this.cursorPos[1][1].x+38,this.y-Game.room.view_y+this.cursorPos[1][1].y+27,'deku_sticks'));
			}
			if(Game.data.hasDekuNut)
			{
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+this.cursorPos[1][2].x+13,
					'y': this.y-Game.room.view_y+this.cursorPos[1][2].y+8,
					'sprite': Sprite.spriteDekuNut
				});
				
				this.drawText(Game.getStatsText(this.x-Game.room.view_x+this.cursorPos[1][2].x+38,this.y-Game.room.view_y+this.cursorPos[1][2].y+27,'deku_nuts'));
			}
			if(Game.data.hasSlingshot)
			{
				this.drawSprite(
				{
					'x': this.x-Game.room.view_x+this.cursorPos[1][5].x+13,
					'y': this.y-Game.room.view_y+this.cursorPos[1][5].y+8,
					'sprite': Sprite.spriteSlingshot
				});
				
				this.drawText(Game.getStatsText(this.x-Game.room.view_x+this.cursorPos[1][5].x+38,this.y-Game.room.view_y+this.cursorPos[1][5].y+27,'deku_seeds'));
			}
		}
		
		//Cursor
		this.drawSprite(
		{
			'x': this.x-Game.room.view_x+this.cursorPos[this.state][this.subState].x,
			'y': this.y-Game.room.view_y+this.cursorPos[this.state][this.subState].y,
			'sprite': ((this.state==PauseMenu.QUEST_STATUS&&this.subState==1)?this.spriteCursorHeart:((this.state==PauseMenu.QUEST_STATUS&&this.subState==2)?this.spriteCursorSave:this.spriteCursor))
		});
	},
	'goToNext': function()
	{
		this.state=this.state==PauseMenu.QUEST_STATUS?PauseMenu.INVENTORY:this.state+1;
		this.updateMaxSubstate();
		this.subState=0;
		Game.playSound('pause_change');
	},
	'goToPrev': function()
	{
		this.state=this.state==PauseMenu.INVENTORY?PauseMenu.QUEST_STATUS:this.state-1;
		this.updateMaxSubstate();
		this.subState=this.maxSubstate;
		Game.playSound('pause_change');
	},
	'updateMaxSubstate': function()
	{
		switch(this.state)
		{
			case PauseMenu.INVENTORY:
			case PauseMenu.EQUIPMENTS:
				this.maxSubstate=17;
			break;
			
			case PauseMenu.MAP:
				this.maxSubstate=1;
			break;
			
			case PauseMenu.QUEST_STATUS:
				this.maxSubstate=24;
			break;
		}
	},
	'changeSword':function()
	{
		switch(this.subState)
		{
			case 2:
				if(Game.data.hasSword)
				{
					Game.data.masterSwordIsEquiped=false;
					Game.data.giantSwordIsEquiped=false;
					Game.data.swordIsEquiped=!Game.data.swordIsEquiped;
					return true;
				}
			break;
			
			case 3:
				if(Game.data.hasMasterSword)
				{
					Game.data.masterSwordIsEquiped=!Game.data.masterSwordIsEquiped;
					Game.data.giantSwordIsEquiped=false;
					Game.data.swordIsEquiped=false;
					return true;
				}
			break;
			
			case 4:
				if(Game.data.hasGiantSword)
				{
					Game.data.masterSwordIsEquiped=false;
					Game.data.giantSwordIsEquiped=!Game.data.giantSwordIsEquiped;
					Game.data.swordIsEquiped=false;
					return true;
				}
			break;
		}
		return false;
	},
	'changeShield':function()
	{
		switch(this.subState)
		{
			case 6:
				if(Game.data.hasDekuShield)
				{
					Game.data.hylianShieldIsEquiped=false;
					Game.data.mirrorShieldIsEquiped=false;
					Game.data.dekuShieldIsEquiped=!Game.data.dekuShieldIsEquiped;
					return true;
				}
			break;
			
			case 7:
				if(Game.data.hasHylianShield)
				{
					Game.data.hylianShieldIsEquiped=!Game.data.hylianShieldIsEquiped;
					Game.data.mirrorShieldIsEquiped=false;
					Game.data.dekuShieldIsEquiped=false;
					return true;
				}
			break;
			
			case 8:
				if(Game.data.hasMirrorShield)
				{
					Game.data.hylianShieldIsEquiped=false;
					Game.data.mirrorShieldIsEquiped=!Game.data.mirrorShieldIsEquiped;
					Game.data.dekuShieldIsEquiped=false;
					return true;
				}
			break;
		}
		return false;
	},
	'changeTunic':function()
	{
		switch(this.subState)
		{
			case 10:
				Game.data.greenTunicIsEquiped=true;
				Game.data.redTunicIsEquiped=false;
				Game.data.blueTunicIsEquiped=false;
				return true;
			break;
			
			case 11:
				if(Game.data.hasRedTunic)
				{
					Game.data.greenTunicIsEquiped=false;
					Game.data.redTunicIsEquiped=true;
					Game.data.blueTunicIsEquiped=false;
					return true;
				}
			break;
			
			case 12:
				if(Game.data.hasBlueTunic)
				{
					Game.data.greenTunicIsEquiped=false;
					Game.data.redTunicIsEquiped=false;
					Game.data.blueTunicIsEquiped=true;
					return true;
				}
			break;
		}
		return false;
	},
	'changeBoots':function()
	{
		switch(this.subState)
		{
			case 14:
				Game.data.bootsAreEquiped=true;
				Game.data.ironBootsAreEquiped=false;
				Game.data.hoverBootsAreEquiped=false;
				return true;
			break;
			
			case 15:
				if(Game.data.hasIronBoots)
				{
					Game.data.bootsAreEquiped=false;
					Game.data.ironBootsAreEquiped=true;
					Game.data.hoverBootsAreEquiped=false;
					return true;
				}
			break;
			
			case 16:
				if(Game.data.hasHoverBoots)
				{
					Game.data.bootsAreEquiped=false;
					Game.data.ironBootsAreEquiped=false;
					Game.data.hoverBootsAreEquiped=true;
					return true;
				}
			break;
		}
		return false;
	},
	'changeObject': function(key)
	{
		var obj='equipedObject',
			others=[],
			target=this.cursorPos[1][this.subState].type;
			
		switch(key)
		{
			case Game.data.controls.OBJECT1:
				obj+=1;
				others.push(2);
				others.push(3);
			break;
			
			case Game.data.controls.OBJECT2:
				obj+=2;
				others.push(1);
				others.push(3);
			break;
			
			case Game.data.controls.OBJECT3:
				obj+=3;
				others.push(1);
				others.push(2);
			break;
		}

		var prev=Game.data[obj],
			hasTarget=target?Game.data['has'+target.toString()]:false;
		if(target && target!=prev && hasTarget)
		{
			Game.data[obj]=target;
			for(var i=0; i<2; i++)
			{
				key='equipedObject'+others[i];
				if(Game.data[key]==target)
				{
					Game.data[key]=null||prev;
				}
			}
		}
		else
		{
			Game.data[obj]=null;
		}
		return target!=prev && hasTarget;
	},
	'eventDestroy': function()
	{
		Game.playSound('pause_close');
		Game.pauseMenu=false;
		Game.data.pause_menu_default_screen=this.state;
		Game.data.pause_menu_default_cursor_position=this.subState;
		this.callParent('eventDestroy',[],FreezeGame);
		
	}
});

PauseMenu.INVENTORY=1;
PauseMenu.EQUIPMENTS=2;
PauseMenu.MAP=3;
PauseMenu.QUEST_STATUS=4;