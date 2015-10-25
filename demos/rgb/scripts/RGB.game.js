/*!
 * RGB: Really Great Ball, JavaScript Game
 * Made with GameBuilder : http://gamebuilder.no-ip.org/
 *
 * Copyright 2011-2012, Adrien Guéret
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * Date: 25/10/2012
 */

/*!
	== Définition de la balle ==
*/

Game.addClass({
	'name': 'Ball',
	'updateColors': function()	//Modifie les couleurs de la page
	{
		var classes='';
		
		if(this.hasColor(Ball.R))
		{
			Game.red.style.opacity=1;
			Game.red.innerHTML='';
			classes+=' red';
		}
		else
		{
			Game.red.style.opacity=0.2;
			Game.red.innerHTML='&Chi;';
		}
		if(this.hasColor(Ball.G))
		{
			Game.green.style.opacity=1;
			Game.green.innerHTML='';
			classes+=' green';
		}
		else
		{
			Game.green.style.opacity=0.2;
			Game.green.innerHTML='&Chi;';
		}
		if(this.hasColor(Ball.B))
		{
			Game.blue.style.opacity=1;
			Game.blue.innerHTML='';
			classes+=' blue';
		}
		else
		{
			Game.blue.style.opacity=0.2;
			Game.blue.innerHTML='&Chi;';
		}
		Game.color.className='tache'+classes;
		Game.borders.className='change'+classes;
		Game.titleLevel.className='change'+classes;
		Game.credits.className='change'+classes;
	},
	'gainCouleur': function(colors)	//La boule gagne une couleur
	{
		var newColor=false;
		for(var i in colors)
		{
			if(!this.hasColor(colors[i]))
			{
				this.colors[colors[i]]=Ball.PLEIN;
				newColor=true;
			}
		}
		if(newColor)
		{
			Game.playSound('splash');
			var s=Game.instanceCreate(this.x-18.5,this.y-18,Splash);
			s.ball=this;
			switch(colors.length)
			{
				case 1: s.sprite.tiles=[4*colors[0]+1]; break;					
				case 2: s.sprite.tiles=[21-4*(3-colors[0]-colors[1])]; break;
				default: s.sprite.tiles=[25]; break;
			}			
			for(var i=1;i<4;i++)
			{
				s.sprite.tiles.push(s.sprite.tiles[0]+i);
			}
			this.updateColors();
		}
	},
	'perdCouleur': function(colors)	//La boule perd une couleur
	{
		var looseColor=false;
		for(var i in colors)
		{
			if(this.hasColor(colors[i]))
			{
				this.colors[colors[i]]=Ball.VIDE;
				looseColor=true;
			}
		}
		if(looseColor)
		{
			Game.playSound('absorb');
			var s=Game.instanceCreate(this.x,this.y-16,Bubble);
			s.ball=this;
			switch(colors.length)
			{
				case 1: s.sprite.tiles=[5*colors[0]+1]; break;					
				case 2: s.sprite.tiles=[26-5*(3-colors[0]-colors[1])]; break;
				default: s.sprite.tiles=[31]; break;
			}		
			for(var i=1;i<5;i++)
			{
				s.sprite.tiles.push(s.sprite.tiles[0]+i);
			}
			this.updateColors();
		}
	},
	'darker': function darker(color)	//Retourne la couleur donnée en plus sombre
	{
		var newColor=[];
		newColor.push(Math.round(color[0]*0.8));
		newColor.push(Math.round(color[1]*0.8));
		newColor.push(Math.round(color[2]*0.8));
		return newColor;
	},
	'isColor': function(colors) //colors => tableau de trois cases avec Ball.VIDE ou Ball.PLEIN
	{
		for(var i in colors)
		{
			if(colors[i]!=this.colors[i])
			{
				return false;
			}
		}
		return true;
	},
	'hasColor': function(color) //color => une couleur : Ball.R, Ball.G ou Ball.B
	{
		return (this.colors[color]==Ball.PLEIN);
	},
	'draw': function()	//Dessine la boule à l'écran (ce n'est pas un sprite !)
	{
		var shadowColor=this.darker(this.colors);
		var borderColor=this.darker(shadowColor);
		
		this.drawCircle(
		{
			'x': (this.x-Game.room.view_x+this.sprite.width/2),
			'y': (this.y-Game.room.view_y+this.sprite.height/2),
			'radius': 15,
			'color': 'transparent',
			'borderColor': 'rgb('+borderColor.join(',')+')',
			'borderLength': 1
		});
		
		this.drawCircle(
		{
			'x': (this.x-Game.room.view_x+this.sprite.width/2),
			'y': (this.y-Game.room.view_y+this.sprite.height/2),
			'radius': 14,
			'color': 'rgb('+this.colors.join(',')+')',
			'borderColor': 'rgb('+shadowColor.join(',')+')',
			'borderLength': 3
		});
		
		this.drawSprite(
		{
			'sprite': this.sprite,
			'x': this.x-Game.room.view_x,
			'y': this.y-Game.room.view_y
		});
	},
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('yeux'));
		this.sprite.makeTiles(32,32,1);
		this.state=Element.STATE_STAND_RIGHT;
		this.fall=false;
		this.endLevel=false;
		this.colors=[Ball.VIDE,Ball.VIDE,Ball.VIDE];
		this.setZIndex(500);
		Game.ball=this;
	},
	'eventEndStep': function()
	{			
		if(!this.endLevel)
		{
			this.vspeed=Math.min(this.vspeed,10);
			if(Game.placeIsFree(this.x,this.y,this.sprite.width,this.sprite.height+1)!==true)
			{
				this.vspeed=0;
				this.gravity=0;
				this.fall=false;
			}
			else
			{
				if(this.vspeed<0)
				{
					this.gravity=0.7;
				}
				else
				{
					this.gravity=2;
				}
			}
		}
	},
	'eventStartStep': function()
	{
		if(!this.endLevel)
		{
			switch(this.state)
			{
				case Element.STATE_STAND_RIGHT:	
					this.sprite.tiles=[2];
				break;
				
				case Element.STATE_STAND_LEFT:
					this.sprite.tiles=[5];
				break;
				
				case Element.STATE_MOVE_RIGHT:	
					this.sprite.tiles=[1,2,3,2];
				break;

				case Element.STATE_MOVE_LEFT:
					this.sprite.tiles=[4,5,6,5];
				break;
			}
		}
		else
		{
			var end=this.instanceNearest(End);
			if(parseInt(this.x,10)!=end.x || parseInt(this.y,10)!=end.y)
			{
				this.moveToPoint(end.x,end.y,0.7);
			}
			else
			{
				this.hspeed=0;
				this.vspeed=0;
			}
		}
	},
	'eventStep': function()
	{
		if(!this.endLevel)
		{
			this.x=Math.max(0,Math.min(this.x,Game.room.width-this.sprite.width));
			this.y=Math.min(this.y,Game.room.height-this.sprite.height);
			if(this.vspeed<0 && (Game.isKeyPressed(Game.KEY_SPACE)||Game.isKeyPressed(Game.KEY_UP)) && !this.fall)
			{
				if(this.vspeed>-6.4)
				{
					this.vspeed-=1.05;
				}
				else
				{
					this.fall=true;
				}
			}
			Game.canvas.style.backgroundPosition=-(Game.room.view_x/3)+'px '+(-(Game.room.view_y/3)+'px');
		}
		this.draw();
	},
	'eventKeyPressed': function(key)
	{
		switch(key)
		{
			case Game.KEY_RIGHT:
				if(!this.endLevel)
				{
					this.state=Element.STATE_MOVE_RIGHT;
					this.hspeed=4;
				}
			return false;
			
			case Game.KEY_LEFT:				
				if(!this.endLevel)
				{
					this.state=Element.STATE_MOVE_LEFT;
					this.hspeed=-4;
				}
			return false;
			
			case Game.KEY_UP:
			case Game.KEY_DOWN:
			case Game.KEY_SPACE:
				return false;
		}
	},
	'eventKeyDown': function(key)
	{
		switch(key)
		{
			case Game.KEY_UP:
			case Game.KEY_SPACE:			
				if(!this.endLevel&&Game.placeIsFree(this.x,this.y,this.sprite.width,this.sprite.height+1)!==true&&Game.placeIsFree(this.x,this.y-1,this.sprite.width,1)===true)
				{
					Game.playSound('jump');
					this.vspeed=-5;
				}
			return false;
				
			case Game.KEY_R:			
				if(!this.endLevel)
				{
					Game.restartRoom();
				}
			return false;
			
			case Game.KEY_CONTROL:
				if(!this.endLevel)
				{
					Game.toggleSounds();
				}
			return false;
		}
	},
	'eventKeyUp': function(key)
	{
		if(!this.endLevel)
		{
			if((this.hspeed<0 && key==Game.KEY_LEFT) || (this.hspeed>0 && key==Game.KEY_RIGHT))
			{
				if(this.hspeed<0)
				{
					this.state=Element.STATE_STAND_LEFT;
				}
				else
				{
					this.state=Element.STATE_STAND_RIGHT;
				}
				this.hspeed=0;
			}
			else if(key==Game.KEY_UP || key==Game.KEY_SPACE)
			{
				this.fall=true;
			}
		}
	},
	'eventRoomStart': function()
	{
		Game.room.viewLink=this;
		Game.room.background_hspeed=0.6;
		Game.room.background_vspeed=0.6;
		Game.titleLevel.innerHTML='Niveau '+(Game.room.id);
		if(Game.red){this.updateColors();}
	}
});

//On définit quelques constantes en plus
Ball.VIDE=80;
Ball.PLEIN=240;
Ball.R=0;
Ball.G=1;
Ball.B=2;

/*!
	== Définition des pots de peintures ==
*/

//Classe-mère
Game.addClass({
	'name': 'Paint',
	'abstract': true,
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('peinture'));
		this.sprite.makeTiles(32,32,1);
		this.sprite.imagespeed=0;
		for(var i=1; i<=8; i++)
		{
			//Modification du masque de collision
			this.sprite.setMask(i,
			{
				'x': 5,
				'y': 6,
				'width': 23,
				'height': 25 
			});
		}
		this.collideSolid=false;
		this.color=[];
		this.setZIndex(100);
	},
	'eventCollisionWith': function(other)
	{
		if(other.instanceOf(Ball))
		{
			other.gainCouleur(this.color);
		}
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	},
	'eventInsideView': function()
	{
		this.setActive(true);
	}
});

//Puis définition des pots de couleur
Game.addClass({
	'name': 'RPaint',
	'parent': 'Paint',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[1];
		this.color=[Ball.R];
	}
});

Game.addClass({
	'name': 'GPaint',
	'parent': 'Paint',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[2];
		this.color=[Ball.G];
	}
});

Game.addClass({
	'name': 'BPaint',
	'parent': 'Paint',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[3];
		this.color=[Ball.B];
	}
});

Game.addClass({
	'name': 'YPaint',
	'parent': 'Paint',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[4];
		this.color=[Ball.R,Ball.G];
	}
});

Game.addClass({
	'name': 'MPaint',
	'parent': 'Paint',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[6];
		this.color=[Ball.R,Ball.B];
	}
});

Game.addClass({
	'name': 'CPaint',
	'parent': 'Paint',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[7];
		this.color=[Ball.G,Ball.B];
	}
});

Game.addClass({
	'name': 'WPaint',
	'parent': 'Paint',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[8];
		this.color=[Ball.R,Ball.G,Ball.B];
	}
});

/*!
	== Définition des absorbers ==
*/

//Classe-mère
Game.addClass({
	'name': 'Absorber',
	'abstract': true,
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('absorber'));
		this.sprite.makeTiles(32,64,1);
		this.sprite.imagespeed=0.3;
		this.collideSolid=false;
		this.activated=true;
		this.tempTiles=[];
		this.color=[];
		this.setZIndex(100);
		for(var i=1; i<=22; i++)
		{
			//Modification du masque de collision
			this.sprite.setMask(i,
			{
				'x': 2,
				'y': 4,
				'width': 26,
				'height': 28 
			});
		}
	},
	'switchState': function()
	{
		this.activated=!this.activated;
		this.sprite.tiles=this.activated?this.tiles:[1];
	},
	'eventCollisionWith': function(other)
	{
		if(this.activated && other.instanceOf(Ball))
		{
			other.perdCouleur(this.color);
		}
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	},
	'eventInsideView': function()
	{
		this.setActive(true);
	}
});

//Puis définition des absorbers de couleurs
Game.addClass({
	'name': 'RAbsorber',
	'parent': 'Absorber',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[2,3,4];
		this.tiles=[2,3,4];
		this.color=[Ball.R];
	}
});

Game.addClass({
	'name': 'GAbsorber',
	'parent': 'Absorber',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[5,6,7];
		this.tiles=[5,6,7];
		this.color=[Ball.G];
	}
});

Game.addClass({
	'name': 'BAbsorber',
	'parent': 'Absorber',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[8,9,10];
		this.tiles=[8,9,10];
		this.color=[Ball.B];
	}
});

Game.addClass({
	'name': 'YAbsorber',
	'parent': 'Absorber',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[11,12,13];
		this.tiles=[11,12,13];
		this.color=[Ball.R,Ball.G];
	}
});

Game.addClass({
	'name': 'MAbsorber',
	'parent': 'Absorber',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[14,15,16];
		this.tiles=[14,15,16];
		this.color=[Ball.R,Ball.B];
	}
});

Game.addClass({
	'name': 'CAbsorber',
	'parent': 'Absorber',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[17,18,19];
		this.tiles=[17,18,19];
		this.color=[Ball.G,Ball.B];
	}
});

Game.addClass({
	'name': 'WAbsorber',
	'parent': 'Absorber',
	'eventCreate': function()
	{
		this.callParent('eventCreate');
		this.sprite.tiles=[20,21,22];
		this.tiles=[20,21,22];
		this.color=[Ball.R,Ball.G,Ball.B];
	}
});

/*!
	== Définition des solids ==
	== (Tout sur ce qu'on peut marcher) ==
*/

//La classe-mère des solids
Game.addClass({
	'name': 'Solid',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('peinture'));
		this.sprite.makeTiles(32,32,1);
		this.sprite.tiles=[9];
		this.solid=true;
		this.sprite.imagespeed=0;
		this.visible=false;
		this.desactivable=true;
		this.isEnabled=true;
	},
	'eventCollisionWith': function(other)
	{
		if(other.instanceOf(Ball))
		{
			if(other.y>=this.y+this.sprite.height)
			{
				other.vspeed=1;
			}
		}
	},
	'eventOutsideView': function()
	{
		if(this.y>=0 && this.desactivable)
		{
			this.setActive(false);
		}
	},
	'eventInsideView': function()
	{
		
		this.setActive(true);
	}
});

//Solids toujours activés
Game.addClass({
	'name': 'ActivedSolid',
	'parent': 'Solid',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],'Solid');
		this.desactivable=false;
	}
});

////////////////
//La classe-mère des blocs de couleurs "pleins"
Game.addClass({
	'name': 'BlocFull',
	'parent': 'Solid',
	'abstract': true,
	'eventCreate': function()
	{
		this.desactivable=true;
		this.sprite=new Sprite(Game.getImage('blocs'));
		this.sprite.makeTiles(39,39);
		this.solid=true;
		this.colors=[];
		this.y-=7;
		this.setZIndex((this.x-this.y)/1000000+20);
		for(var i=1;i<=56;i++)
		{
			this.sprite.setMask(i,
			{
				'x': 0,
				'y': 7,
				'height': 32,
				'width': 32
			});
		}
	},
	'enable': function()
	{
		this.sprite.tiles[0]=this.sprite.tiles[0]-28;
		this.isEnabled=true;
        this.checkForCollisions=true;
	},
	'disable': function()
	{
		this.sprite.tiles[0]=this.sprite.tiles[0]+28;
		this.isEnabled=false;
        this.checkForCollisions=false;
	},
	'eventStep': function()
	{
		var isColor=(Game.ball.isColor(this.colors));
		if(isColor && !this.solid)
		{
			var mask=this.sprite.getMask();	
			if(((Game.ball.x>=this.x+mask.x+mask.width) 
			|| (Game.ball.x+Game.ball.sprite.width<=this.x+mask.x) 					
			|| (Game.ball.y>=this.y+mask.y+mask.height) 	
			|| (Game.ball.y+Game.ball.sprite.height<=this.y+mask.y)))
			{
				this.enable();
				this.solid=true;
			}
		}
		else if(!isColor && this.solid)
		{	
			this.disable();
			this.solid=false;
		}
	}
});

Game.addClass({
	'name': 'NBlocFull',
	'parent': 'BlocFull',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocFull);
		this.colors=[Ball.VIDE,Ball.VIDE,Ball.VIDE];
		this.sprite.tiles=[8];
	}
});

Game.addClass({
	'name': 'RBlocFull',
	'parent': 'BlocFull',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocFull);
		this.colors=[Ball.PLEIN,Ball.VIDE,Ball.VIDE];
		this.sprite.tiles=[1];
	}
});

Game.addClass({
	'name': 'GBlocFull',
	'parent': 'BlocFull',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocFull);
		this.colors=[Ball.VIDE,Ball.PLEIN,Ball.VIDE];
		this.sprite.tiles=[2];
	}
});

Game.addClass({
	'name': 'BBlocFull',
	'parent': 'BlocFull',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocFull);
		this.colors=[Ball.VIDE,Ball.VIDE,Ball.PLEIN];
		this.sprite.tiles=[3];
	}
});

Game.addClass({
	'name': 'YBlocFull',
	'parent': 'BlocFull',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocFull);
		this.colors=[Ball.PLEIN,Ball.PLEIN,Ball.VIDE];
		this.sprite.tiles=[4];
	}
});

Game.addClass({
	'name': 'MBlocFull',
	'parent': 'BlocFull',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocFull);
		this.colors=[Ball.PLEIN,Ball.VIDE,Ball.PLEIN];
		this.sprite.tiles=[5];
	}
});

Game.addClass({
	'name': 'CBlocFull',
	'parent': 'BlocFull',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocFull);
		this.colors=[Ball.VIDE,Ball.PLEIN,Ball.PLEIN];
		this.sprite.tiles=[6];
	}
});

Game.addClass({
	'name': 'WBlocFull',
	'parent': 'BlocFull',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocFull);
		this.colors=[Ball.PLEIN,Ball.PLEIN,Ball.PLEIN];
		this.sprite.tiles=[7];
	}
});

////////////////
//La classe-mère des blocs de couleurs "partiels"
Game.addClass({
	'name': 'BlocPart',
	'parent': 'BlocFull',
	'eventStep': function()
	{
		var total=0;
		for(var i in this.colors)
		{
			if(this.colors[i]==Ball.PLEIN && !Game.ball.hasColor(i))
			{
				break;
			}
			total++;
		}
				
		if(total==this.colors.length)
		{
			var mask=this.sprite.getMask();	
			if(((Game.ball.x>=this.x+mask.x+mask.width) 
			|| (Game.ball.x+Game.ball.sprite.width<=this.x+mask.x) 					
			|| (Game.ball.y>=this.y+mask.y+mask.height) 	
			|| (Game.ball.y+Game.ball.sprite.height<=this.y+mask.y)))
			{
				if(!this.solid)
				{
					this.enable();
				}
				this.solid=true;
			}
		}
		else
		{
			if(this.solid)
			{
				this.disable();
			}
			this.solid=false;
		}
	}
});

Game.addClass({
	'name': 'RBlocPart',
	'parent': 'BlocPart',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocPart);
		this.colors=[Ball.PLEIN,Ball.VIDE,Ball.VIDE];
		this.sprite.tiles=[9];
	}
});

Game.addClass({
	'name': 'GBlocPart',
	'parent': 'BlocPart',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocPart);
		this.colors=[Ball.VIDE,Ball.PLEIN,Ball.VIDE];
		this.sprite.tiles=[10];
	}
});

Game.addClass({
	'name': 'BBlocPart',
	'parent': 'BlocPart',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocPart);
		this.colors=[Ball.VIDE,Ball.VIDE,Ball.PLEIN];
		this.sprite.tiles=[11];
	}
});

Game.addClass({
	'name': 'YBlocPart',
	'parent': 'BlocPart',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocPart);
		this.colors=[Ball.PLEIN,Ball.PLEIN,Ball.VIDE];
		this.sprite.tiles=[12];
	}
});

Game.addClass({
	'name': 'MBlocPart',
	'parent': 'BlocPart',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocPart);
		this.colors=[Ball.PLEIN,Ball.VIDE,Ball.PLEIN];
		this.sprite.tiles=[13];
	}
});

Game.addClass({
	'name': 'CBlocPart',
	'parent': 'BlocPart',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BlocPart);
		this.colors=[Ball.VIDE,Ball.PLEIN,Ball.PLEIN];
		this.sprite.tiles=[14];
	}
});

////////////////
//La classe-mère des blocs poussables
Game.addClass(
{
	'name': 'BlocMovable',
	'abstract': true,
	'eventCollisionWith': function(other)
	{
		if(other.instanceOf(Ball))
		{
			if(this.solid && this.vspeed==0 && other.vspeed==0 && other.hspeed!=0)
			{
				var blocs=Game.getInstancesByType(BlocMovable);
				for(var i=0, l=blocs.length; i<l; i++)
				{
					blocs[i].hspeed=0;
				}
				this.hspeed=other.hspeed/2;
			}
			else
			{
				this.hspeed=0;
			}
		}
		else if(other.instanceOf(Solid) && this.vspeed>0)
		{
			if(other.isEnabled)
			{
				this.vspeed=0;
				this.gravity=0;
				this.y=other.y-32;
				if(this.vspeed==0 && Game.getInstancesIn(this.x+32,this.y+16,1,1,{'elements':[this],'types':[Paint,Absorber,Ball,Splash,Bubble,BlocFull,BlocPart]},true))
				{
					this.sprite.width=30;
				}
				else
				{
					this.sprite.width=39;
				}
			}
		}
	},
	'eventStep': function()
	{
		if(this.instanceOf(BlocPart))
		{
			this.callParent('eventStep',[],BlocPart);
		}
		else
		{
			this.callParent('eventStep',[],BlocFull);
		}
		if(this.hspeed!=0||this.vspeed!=0)
		{
			this.x=Math.max(0,Math.min(this.x,Game.room.width-this.sprite.width));
			this.y=Math.min(this.y,Game.room.height-this.sprite.height);
		}
	},
	'eventEndStep': function()
	{			
		this.vspeed=Math.min(this.vspeed,10);
		
		var objects=Game.getInstancesIn(this.x,this.y+this.sprite.height,32,1,{'elements':[this],'types':[Ball]}),
		falling=objects.length==0;

		if(!falling)
		{
			falling=true;
			for(var i=0,l=objects.length; i<l; i++)
			{
				if(objects[i].isEnabled)
				{
					falling=false;
					break;
				}
			}
		}

		if(falling)
		{
			this.gravity=2;
			this.hspeed=0;
		}
		else
		{
			this.vspeed=0;
			this.gravity=0;
			var solids=Game.getInstancesIn(this.x,this.y+48,32,1,{'elements':[this]});
			for(var i=0,l=solids.length;i<l;i++)
			{
				solids[i].desactivable=false;
			}			
		}
		this.setZIndex((this.x-this.y)/1000000+20);
	},
	'eventKeyDown': function(key)
	{
		if(key==Game.KEY_UP || (key==Game.KEY_LEFT && this.hspeed>0) || (key==Game.KEY_RIGHT && this.hspeed<0))
		{
			this.hspeed=0;
			return false;
		}
	},
	'eventKeyUp': function(key)
	{
		if((key==Game.KEY_LEFT || key==Game.KEY_RIGHT) && this.hspeed!=0)
		{
			this.hspeed=0;
			return false;
		}
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	},
	'eventInsideView': function()
	{
		
		this.setActive(true);
	}
});

Game.addClass({
	'name': 'NBlocFullMovable',
	'parent': ['NBlocFull','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],NBlocFull);
		this.sprite.tiles=[22];
	}
});

Game.addClass({
	'name': 'RBlocFullMovable',
	'parent':  ['RBlocFull','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],RBlocFull);
		this.sprite.tiles=[15];
	}
});

Game.addClass({
	'name': 'GBlocFullMovable',
	'parent': ['GBlocFull','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],GBlocFull);
		this.sprite.tiles=[16];
	}
});

Game.addClass({
	'name': 'BBlocFullMovable',
	'parent': ['BBlocFull','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BBlocFull);
		this.sprite.tiles=[17];
	}
});

Game.addClass({
	'name': 'YBlocFullMovable',
	'parent': ['YBlocFull','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],YBlocFull);
		this.sprite.tiles=[18];
	}
});

Game.addClass({
	'name': 'MBlocFullMovable',
	'parent': ['MBlocFull','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],MBlocFull);
		this.sprite.tiles=[19];
	}
});

Game.addClass({
	'name': 'CBlocFullMovable',
	'parent': ['CBlocFull','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],CBlocFull);
		this.sprite.tiles=[20];
	}
});

Game.addClass({
	'name': 'WBlocFullMovable',
	'parent': ['WBlocFull','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],WBlocFull);
		this.sprite.tiles=[21];
	}
});

Game.addClass({
	'name': 'RBlocPartMovable',
	'parent':  ['RBlocPart','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],RBlocPart);
		this.sprite.tiles=[23];
	}
});

Game.addClass({
	'name': 'GBlocPartMovable',
	'parent': ['GBlocPart','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],GBlocPart);
		this.sprite.tiles=[24];
	}
});

Game.addClass({
	'name': 'BBlocPartMovable',
	'parent': ['BBlocPart','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],BBlocPart);
		this.sprite.tiles=[25];
	}
});

Game.addClass({
	'name': 'YBlocPartMovable',
	'parent': ['YBlocPart','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],YBlocPart);
		this.sprite.tiles=[26];
	}
});

Game.addClass({
	'name': 'MBlocPartMovable',
	'parent': ['MBlocPart','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],MBlocPart);
		this.sprite.tiles=[27];
	}
});

Game.addClass({
	'name': 'CBlocPartMovable',
	'parent': ['CBlocPart','BlocMovable'],
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],CBlocPart);
		this.sprite.tiles=[28];
	}
});

/*!
	== Définition de la zone de fin ==
*/

Game.addClass({
	'name': 'End',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('end'));
		this.sprite.makeTiles(32,32);
		this.sprite.tiles=[1,2,3,4,5,6,7,8,9,10];
		this.collideSolid=false;
		this.sprite.imagespeed=0.4;
		this.setZIndex(150);
	},
	'eventCollisionWith': function(other)
	{
		if(other.instanceOf(Ball))
		{
			if(!other.endLevel)
			{
				other.endLevel=true;
				other.gravity=0;
				
				if(Game.soundsActivated)
				{
					if(!Game.soundIsPlaying('end'))
					{
						other.hspeed=0;
						other.vspeed=0;
						Game.playSound('end',false,function()
						{
							Game.goToNextRoom();
							if(window.localStorage.getItem('RGB.lastLevel')<Game.room.id)
							{
								window.localStorage.setItem('RGB.lastLevel',Game.room.id);
							}
						});
					}
				}
				else
				{
					other.hspeed=0;
					other.vspeed=0;
					setTimeout(function()
					{
						Game.goToNextRoom();
					},1000);	
				}
			}
		}
	}
});

/*!
	== Définition des effets sur la boule ==
*/

//Le splash sur un pot de peinture
Game.addClass({
	'name': 'Splash',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('splash'));
		this.sprite.makeTiles(69,68,1);
		this.sprite.imagespeed=0.6;
		this.setZIndex(600);
	},
	'eventStep': function()
	{
		this.x=this.ball.x-18.5;
		this.y=this.ball.y-18;
	},
	'eventEndAnimation': function(other)
	{
		Game.instanceDestroy(this);
	}
});

//Les bulles lors de la perte de couleur
Game.addClass({
	'name': 'Bubble',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('bubbles'));
		this.sprite.makeTiles(32,28);
		this.sprite.tiles=[1,2,3,4];
		this.sprite.imagespeed=0.5;
		this.setZIndex(600);
		this.vspeed=-4;
	},
	'eventStep': function()
	{
		this.x=this.ball.x;
	},
	'eventEndAnimation': function(other)
	{
		Game.instanceDestroy(this);
	}
});

/*!
	== Classe des interrupteurs ==
*/
Game.addClass(
{
	'name': 'Button',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('blocs'));
		this.sprite.makeTiles(39,39);
		this.sprite.tiles=[57];
		this.y-=7;
		this.sprite.imagespeed=0;
		this.setZIndex(10);
		this.activated=false;
		this.solid=true;
		this.sprite.setMask(57,
		{
			'x': 0,
			'y': 14,
			'height': 26,
			'width': 32
		});
		this.sprite.setMask(58,
		{
			'x': 0,
			'y': 27,
			'height': 16,
			'width': 32
		});
	},
	'effect': function()
	{
		var absorbers = Game.getInstancesByType(Absorber,true);
		
		for(var i=0,l=absorbers.length; i<l;i++)
		{
			absorbers[i].switchState();
		}
	},
	'eventStep': function()
	{					
		if(!this.activated)
		{
			var elements=Game.getInstancesIn(this.x,this.y-7,this.sprite.width-10,this.sprite.height,{'elements':[this]});
			
			for(var i=0, l=elements.length; i<l; i++)
			{		
				if(elements[i].vspeed>=0 && (elements[i].instanceOf(Ball) || elements[i].instanceOf(BlocMovable)))
				{				
					this.activated=true;
					this.sprite.tiles=[58];
					this.effect();
					break;
				}
			}
		}
	},
	'eventOutsideView': function()
	{
		this.setActive(false);
	},
	'eventInsideView': function()
	{
		this.setActive(true);
	}
});

/*!
	== Définition des messages à afficher ==
	/!\ Créé avant la mise en place du système de traduction,
	ce fichier n'utilise pas ce dernier ! /!\
*/

Game.addClass({
	'name': 'Message',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('peinture'));
		this.sprite.makeTiles(32,32,1);
		this.sprite.tiles=[9];
		this.collideSolid=false;
		this.setZIndex(100);
		
		var lang='fr';
		
		switch(Game.room.id)
		{
			case 1:
				this.message=Message.texts.INTRO[lang];
			break;
			
			case 2:
				this.message=Message.texts.MIX[lang];
			break;	
			
			case 3:
				this.message=Message.texts.RESTART[lang];
			break;
			
			case 6:
				this.message=Message.texts.PART[lang];
			break;
			
			case 9:
				this.message=Message.texts.ABSORB[lang];
			break;
			
			case 10:
				this.message=Message.texts.ABSORB_COLORS[lang];
			break;
			
			case 20:
				this.message=Message.texts.MOVABLE[lang];
			break;
			
			case 26:
				this.message=Message.texts.BUTTON[lang];
			break;
			
			case 27:
				this.message=Message.texts.BUTTON_BIS[lang];
			break;
		}
	},
	'eventCollisionWith': function(other)
	{
		if(other.instanceOf(Ball))
		{
			var text={
				'x': 3,
				'y': 3,
				'maxWidth': Game.room.view_w,
				'text': this.message
			},
			height=22*(Game.numberOfLines(text)+1);
			
			if(other.y<height)
			{
				text.y+=Game.room.height-height;
			}
			
			other.drawRectangle(
			{
				'x': 0,
				'y': other.y>=height?0:(Game.room.height-height),
				'width': Game.room.view_w,
				'height': height,
				'color': '#fff',
				'opacity': 70,
				'borderLength': 2,
				'borderColor': '#444'
			});
			
			other.drawText(text);
		}
	}
	
});

Message.texts=
{
	'INTRO':
	{
		'fr': 'Bienvenue dans le jeu RGB ! Ici, les blocs se matérialisent selon la couleur de votre balle. Essayez de devenir rouge en touchant le pot de peinture !'
	},
	'MIX':
	{
		'fr': 'En touchant un pot de peinture lorsque vous êtes déjà coloré, un mélange s\'effectue ! N\'oubliez pas que ce sont les normes RGB qui sont utilisées !'
	},
	'RESTART':
	{
		'fr': 'Si vous vous retrouvez coincé, appuyez sur "R" pour recommencer le niveau en cours.'
	},
	'PART':
	{
		'fr': 'Les blocs avec un point coloré restent solides tant que vous possédez la couleur qu\'ils indiquent !'
	},
	'ABSORB':
	{
		'fr': 'Les absorbeurs aspirent les couleurs qui vous composent...'
	},
	'ABSORB_COLORS':
	{
		'fr': 'Les absorbeurs colorés n\'aspirent que leur couleur. Ainsi, l\'absorbeur rouge n\'aspire que le rouge !'
	},
	'MOVABLE':
	{
		'fr': 'Les blocs avec une main peuvent être poussés s\'ils sont solides. Attention, ils sont également soumis à la gravité !'
	},
	'BUTTON':
	{
		'fr': 'Cet absorbeur est désactivé ! Appuyez sur le bouton pour le remettre en marche !'
	},
	'BUTTON_BIS':
	{
		'fr': 'Une fois pressé, un bouton active les absorbeurs désactivés et désactivent ceux activés...'
	}
};

/*!
	== Définition de la sélection de niveau ==
*/

Game.addClass({
	'name': 'SelectLevel',
	'drawLevel': function()
	{
		var level=this.level.toString(),
		nbrChiffres=level.length,
		x=(nbrChiffres*59)/2,
		tile=0;
		
		for(var i=0, l=nbrChiffres; i<l; i++)
		{
			tile=parseInt(level[i],10);
			var sprite=new Sprite(Game.getImage('chiffres'));
			sprite.makeTiles(59,91);
			sprite.tiles=[tile==0?10:tile];
			this.drawSprite(
			{
				'sprite': sprite,
				'x': Game.room.width/2-x,
				'y': 140
			});
			x-=59;
		}
	},
	'eventCreate': function()
	{
		document.getElementById('taches').style.display='none';
		this.sprite=new Sprite(Game.getImage('logo'));
		this.hspeed=0.5;
		this.level=window.localStorage.getItem('RGB.lastLevel');
		if(!this.level)
		{
			this.level=1;
		}
		this.max=this.level;
		this.press=false;
	},
	'eventStep': function()
	{
		if((this.x>=this.xstart+6 && this.hspeed>0) || (this.x<=this.xstart-6 && this.hspeed<0))
		{
			this.hspeed*=-1;
		}
		this.drawLevel();
	},
	'eventKeyPressed': function(key)
	{
		switch(key)
		{
			case Game.KEY_RIGHT:
			case Game.KEY_UP:
				if(!this.press)
				{
					this.press=true;
					var obj=this;
					setTimeout(function()
					{
						obj.press=false;
					},250);
					this.level++;
					this.level=this.level>this.max?1:this.level;
				}
			return false;
			case Game.KEY_LEFT:
			case Game.KEY_DOWN:
				if(!this.press)
				{
					this.press=true;
					var obj=this;
					setTimeout(function()
					{
						obj.press=false;
					},250);
					this.level--;
					this.level=this.level<1?this.max:this.level;
				}
			return false;
		}
	},
	'eventKeyDown': function(key)
	{
		switch(key)
		{
			case Game.KEY_CONTROL:
				Game.toggleSounds();
			case Game.KEY_RIGHT:
			case Game.KEY_UP:
			case Game.KEY_LEFT:
			case Game.KEY_DOWN:
			return false;

			case Game.KEY_ENTER:
				document.getElementById('taches').style.display='block';
				Game.goToRoom(this.level);
			return false;
		}			
	}
});

/*!
	== Appel et lancement du jeu ==
*/

Game.totalLevels=28,
r=[new Room(288,296,'background')];
	
for(var i=1; i<=Game.totalLevels; i++)
{
	r.push(new Room('./levels/'+i+'.xml'));
}
	
for(var i=1, l=r.length; i<l; i++)
{
	r[i].setView(288,256);
}
	
r[0].eventStart=function()
{
	if(window.localStorage.getItem('RGB.lastLevel')>1)
	{
		Game.titleLevel.innerHTML='Selection du niveau';
		Game.instanceCreate(5,5,SelectLevel);
	}
	else
	{
		document.getElementById('taches').style.display='block';
		Game.goToNextRoom();
	}
};

r[26].eventStart=function()
{
	var absorbers = Game.getInstancesByType(Absorber,true);
	absorbers[0].switchState();
};

r[27].eventStart=function()
{
	var absorbers = Game.getInstancesByType(Absorber,true);
	
	for(var i=0,l=absorbers.length; i<l; i++)
	{
		if(absorbers[i].instanceOf(YAbsorber))
		{
			absorbers[i].switchState();
		}
	}
};

r[28].eventStart=function()
{
	var absorbers = Game.getInstancesByType(Absorber,true),
		buttons = Game.getInstancesByType(Button,true),
		blocsMovables= Game.getInstancesByType(BlocMovable,true);
	
	for(var i=0,l=absorbers.length; i<l; i++)
	{
		if(absorbers[i].instanceOf(GAbsorber))
		{
			absorbers[i].switchState();
		}
	}
	
	for(var i=0,l=blocsMovables.length; i<l; i++)
	{
		blocsMovables[i].eventOutsideView=function(){};
	}
	
	buttons[0].eventOutsideView=function(){};
};

Game.setRooms(r);
Game.titleLevel=document.getElementById('level');
Game.credits=document.getElementById('credits');
Game.gameStart=function()
{
	var d=document.createElement('div'),
	infos=document.getElementById('infoGameBuilder');
	Game.borders=document.getElementById('borders');
	d.style.cssText=infos.style.cssText;
	d.style.height='40px';
	d.style.border='3px solid #000';
	d.style.color='#222';
	d.style.borderTop='0px';
	d.style.display='none';
	d.id='taches';
	d.style.backgroundImage='url("./images/backgroundColors.png")';
	
	Game.canvas.parentNode.insertBefore(d,infos);
	d.innerHTML='<div id="red" class="tache">&Chi;</div>'+
		'<div class="tache none">+</div>'+
		'<div id="green" class="tache">&Chi;</div>'+
		'<div class="tache none">+</div>'+
		'<div id="blue" class="tache">&Chi;</div>'+
		'<div class="tache none">=</div>'+
		'<div id="color" class="tache"></div>';
		
	Game.borders.style.backgroundImage="url('./images/webBackground.png')";
	Game.borders.style.border='3px solid #000';
	Game.borders.style.width='350px';
	Game.borders.style.height='350px';
		
	Game.red=document.getElementById('red');
	Game.green=document.getElementById('green');
	Game.blue=document.getElementById('blue');
	Game.color=document.getElementById('color');	
	
	Game.playSound('music',true);	
};		
Game.loadAndRun('jeu',
{
	'background': './images/background.png',
	'logo': './images/logo.png',
	'chiffres': './images/chiffres.png',
	'peinture': './images/paint.png',
	'absorber': './images/absorber.png',
	'tiles':  './images/tiles.png',
	'yeux': './images/yeux.png',
	'blocs': './images/blocs.png',
	'end': './images/end.png',
	'splash': './images/splash.png',
	'bubbles': './images/bubbles.png'
},
{
	'music': ['./sounds/music.mp3','./sounds/music.ogg'],
	'absorb': ['./sounds/absorb.mp3','./sounds/absorb.ogg'],
	'splash': ['./sounds/splash.mp3','./sounds/splash.ogg'],
	'end': ['./sounds/end.mp3','./sounds/end.ogg'],
	'jump': ['./sounds/jump.mp3','./sounds/jump.ogg']
});