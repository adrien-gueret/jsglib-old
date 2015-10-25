/*!
 * JSGlib v2.2, JavaScript Library
 * http://jsglib.no-ip.org/
 *
 * Copyright 2011-2012, Adrien Guéret
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * Date: 25/10/2012
 */

/*====================================================*/
/*==================== Main class ====================*/
/*====================================================*/

function Game()
{
	alert('Il est inutile d\'instancier la classe Game !');
}

Game.elements=[];				//Store all the elements of the game
Game.activeElements=[];			//Store all the active elements
Game.tilesAndElements=[];		//Store the tiles to display and the elements to manage, ordered by their zIndex
Game.end=true;					//Indicate if the game is ended or not
Game.lastId=1;					//ID of the last created element
Game.canvas=null;				//HTML canvas displaying the game
Game.context2D=null;			//2D context of the canvas
Game.canvasBuffer=null;			//HTML canvas for buffer
Game.contextBuffer=null;		//Context of buffer
Game.isPause=false;				//Indicate if the pause is active or not
Game.rooms=[];					//Store the rooms of the game
Game.room=null;					//Current room
Game.infoGameBuilder=true;		//Indicate if the "Powered by JSGlib" must be displayed or not
Game.currentStep=0;				//Number of the current step
Game.images={};					//Preloaded images
Game.sounds={};					//Preloaded sounds
Game.soundsPlaying=[];			//Store the sounds currently played
Game.soundsActivated=true;		//Have sounds to be played, or not?
Game.zIndex=false;				//Indicate if the zIndex has been modified or not
Game.speed=100;					//Speed of the game
Game.mouse_x=0;					//Mouse abscissa
Game.mouse_y=0;					//Mouse ordinate
Game.changeRoom=false;			//Indicate if the room is changed or not
Game.keyspressed=[];			//Store the pressed keys
Game.translations={};			//Object storing the texts to write and translate
Game.stopPropagation=false;		//Permit to stop or not events propagation
Game.isFullscreen=false;        //Indicate if fullscreen is on or off
Game.MAX_ZINDEX=1;				//Highest z-index in the game
Game.KEY_TAB=9;
Game.KEY_ENTER=13;
Game.KEY_SHIFT=16;
Game.KEY_CONTROL=17;
Game.KEY_ALT=18;
Game.KEY_CAPS_LOCK=20;
Game.KEY_SPACE=32;
Game.KEY_LEFT=37;
Game.KEY_UP=38;
Game.KEY_RIGHT=39;
Game.KEY_DOWN=40;
Game.KEY_A=65;
Game.KEY_B=66;
Game.KEY_C=67;
Game.KEY_D=68;
Game.KEY_E=69;
Game.KEY_F=70;
Game.KEY_G=71;
Game.KEY_H=72;
Game.KEY_I=73;
Game.KEY_J=74;
Game.KEY_K=75;
Game.KEY_L=76;
Game.KEY_M=77;
Game.KEY_N=78;
Game.KEY_O=79;
Game.KEY_P=80;
Game.KEY_Q=81;
Game.KEY_R=82;
Game.KEY_S=83;
Game.KEY_T=84;
Game.KEY_U=85;
Game.KEY_V=86;
Game.KEY_W=87;
Game.KEY_X=88;
Game.KEY_Y=89;
Game.KEY_Z=90;
var lang=(navigator.userLanguage)?navigator.userLanguage:navigator.language;
var t=lang.indexOf('-');
Game.userLang=(t>-1?lang.substr(0,t):lang);	//User lang
Game.defaultLang='en';						//Default lang

/*====================================================*/
/*================ Internal methods ==================*/
/*====================================================*/

//Check if requestAnimationFrame exists
if(!window.requestAnimationFrame)
{
	window.requestAnimationFrame=
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(fn)
		{
			window.setTimeout(fn,(1000/60));
		};
}

/*== Method to refresh the drawing of the game ==*/
Game.refreshDrawing=function()
{
	// Game.context2D.clearRect(0,0,Game.canvas.width,Game.canvas.height);
	Game.canvas.width=Game.canvas.width;
	Game.context2D.drawImage(Game.canvasBuffer,0,0,Game.canvas.width,Game.canvas.height);
	// Game.contextBuffer.clearRect(0,0,Game.canvas.width,Game.canvas.height);
    Game.canvasBuffer.width=Game.canvasBuffer.width;
};

/*== Method called on each "loop of the game" ==*/
Game.step=function()
{
	Game.currentStep++;
	if(!Game.isPause)
	{	
		Game.room.display();
		
		if(Game.zIndex)
		{
			var sortFunction = function(a,b){return (a.zIndex-b.zIndex);};
			Game.elements.sort(sortFunction);		
			Game.activeElements.sort(sortFunction);		
			Game.tilesAndElements=Game.elements.concat(Game.room.tiles);
			Game.tilesAndElements.sort(sortFunction);		
			Game.zIndex=false;
		}
		
		for(var i=0,l=Game.tilesAndElements.length; i<l; i++)
		{
			if(Game.tilesAndElements[i].types)
			{
				Game.manageElements(Game.tilesAndElements[i]);
				if(Game.changeRoom)
				{
					Game.changeRoom=false;
					break;
				}
			}
			else
			{
				var t=Game.tilesAndElements[i];				
				if(t.image.complete && t.x>Game.room.view_x-t.w && t.x<Game.room.view_x+Game.room.view_w && t.y>Game.room.view_y-t.h && t.y<Game.room.view_y+Game.room.view_h)
				{
					Game.contextBuffer.drawImage(t.image,t.posXImage,t.posYImage,t.w,t.h,t.x-Math.round(Game.room.view_x),t.y-Math.round(Game.room.view_y),t.w,t.h);
				}
			}
		}
	}
	if(!Game.end)
	{
		window.requestAnimationFrame(Game.refreshDrawing);
		setTimeout(Game.step,(33/(Game.speed/100)));
	}
	else
	{
		Game.gameEnd();
	}
};

/*== Method managing each elements ==*/
Game.manageElements=function(element)
{	
	if(element)
	{
		if(element.x>=(Game.room.view_w+Game.room.view_x) || element.y>=(Game.room.view_h+Game.room.view_y) || element.x<=(Game.room.view_x-element.sprite.width) || element.y<=(Game.room.view_y-element.sprite.height))
		{
			element.eventOutsideView();
		}
		else
		{
			element.eventInsideView();
		}
	
		if(element.active)
		{			
			if(element.x>=Game.room.width || element.y>=Game.room.height || element.x<=-element.sprite.width || element.y<=-element.sprite.height)
			{
				element.eventOutsideRoom();
				if(element.switchPositionWhenLeave)
				{
					element.switchPositionWhenOutsideRoom();
				}
			}
			element.xprev=element.x;
			element.yprev=element.y;
			
			if(element.moveToPointCallBack.f!=undefined)
			{
				var c=element.moveToPointCallBack;
				
				if((c.fromLeft&&Math.floor(element.x)>=c.x||!c.fromLeft&&Math.floor(element.x)<=c.x)&&(c.fromTop&&Math.floor(element.y)>=c.y||!c.fromTop&&Math.floor(element.y)<=c.y))
				{
					var f=c.f;
					element.x=c.x;
					element.y=c.y;
					element.moveToPointCallBack={};
					f.apply(element);
				}
			}
			element.eventStartStep(Game.currentStep);
			
			element.move();	
			
			if(element.sprite.changeImage())
			{
				if(element.eventEndAnimation()===false)
				{
					element.sprite.imagespeed=0;
					element.sprite.imageindex=element.sprite.tiles.length-1;
				}
			}
			
			for(var j=1; j<=10; j++)
			{
				if(element['alarm'+j]>0)
				{
					if(--element['alarm'+j]==0)
					{
						element['eventAlarm'+j]();
					}
				}
			}
			
			element.eventStep(Game.currentStep);
			
			element.display();

			if(!element.solid && element.checkForCollisions)
			{
				Game.checkCollisions(element);
			}
			element.eventEndStep(Game.currentStep);
		}
	}
};

/*== Method checking collisions of the given element ==*/
Game.checkCollisions=function(objet)
{
	var collisions=objet.checkCollisions();
	for(var i=0,l=collisions.length; i<l; i++)
	{
		if(collisions[i])
		{
			objet.eventCollisionWith(collisions[i]);
		}
	}	
};

/*== Method running the game ==*/
Game.run=function()
{
	if(Game.rooms.length==0)
	{
		alert("Impossible de lancer le jeu : il ne possède aucune Room !\nVeuillez lui en ajoutant via la méthode Game.setRooms().");
		return false;
	}
	
	Game.canvas.style.overflow='hidden';
	if(Game.canvas.style.position=='static' || Game.canvas.style.position.length==0)
	{
		Game.canvas.style.position='relative';
	}
	
	Game.canvas.onmousemove=function(e)
	{
		if(e.x)
		{
			Game.mouse_x=e.offsetX;
			Game.mouse_y=e.offsetY;
		}
		else
		{
			Game.mouse_x=e.layerX;
			Game.mouse_y=e.layerY;
		}
        
        //Change coordinates if fullscreen is on
        if(Game.isFullscreen)
        {
            Game.mouse_x/=parseFloat(Game.canvas.getAttribute('data-jsglib-ratioWidth'),10);
            Game.mouse_y/=parseFloat(Game.canvas.getAttribute('data-jsglib-ratioHeight'),10);
        }
	};
	
	Game.canvas.onmousedown=function(e)
	{
		Game.canvas.onmousemove(e);
		
		for(var i=0,l=Game.activeElements.length; i<l; i++)
		{
			if(Game.activeElements[i])
			{
				Game.activeElements[i].eventMouseDown(e.button==0?37:39);
			}
		}
	};
	
	Game.canvas.onmouseup=function(e)
	{
		Game.canvas.onmousemove(e);
		var preventDefault=false,
			key=e.button==0?37:39,
			t;
		
		Game.stopPropagation=false;

		for(i=Game.activeElements.length-1; i>=0; i--)
		{
			if(Game.activeElements[i])
			{
				t=Game.activeElements[i].eventMouseUp(key);
				if(!preventDefault && t===false)
				{
					preventDefault=true;
				}
				if(Game.stopPropagation)
				{
					break;
				}
			}
		}

		Game.stopPropagation=false;
		
		for(i=Game.activeElements.length-1; i>=0; i--)
		{
			if(Game.activeElements[i])
			{
				t=Game.activeElements[i].eventClick(key);

				if(!preventDefault && t===false)
				{
					preventDefault=true;
				}
				if(Game.stopPropagation)
				{
					break;
				}
			}
		}
		
		Game.canvas.oncontextmenu=preventDefault?function(){return false;}:null;
	};
	
	document.onkeydown=function(e)
	{	
		if (!e) e=window.event;
		var code=(e.which)?e.which:e.keyCode,
		alreadypressed=Game.isKeyPressed(code),
		preventDefault=false,
		t;
		
		if(!alreadypressed)
		{
			Game.keyspressed.push(code);
		}
		
		for(var i=0,l=Game.activeElements.length; i<l; i++)
		{
			if(Game.activeElements[i])
			{
				if(!alreadypressed)
				{
					t=Game.activeElements[i].eventKeyDown(code);
					if(!preventDefault && t===false)
					{
						preventDefault=true;
					}
				}
				if(Game.activeElements[i])
				{
					t=Game.activeElements[i].eventKeyPressed(code);
				}
				if(!preventDefault && t===false)
				{
					preventDefault=true;
				}
			}
		}
		if(preventDefault)
		{
			return false;
		}
	};
	
	document.onkeyup=function(e)
	{	
		if (!e) e=window.event;
		var code=(e.which)?e.which:e.keyCode,
		temp=[];
		
		for(var i=0,l=Game.keyspressed.length; i<l; i++)
		{
			if(Game.keyspressed[i]!=code)
			{
				temp.push(Game.keyspressed[i]);
			}
		}
		Game.keyspressed=temp;
		
		for(var i=0,l=Game.activeElements.length; i<l; i++)
		{
			if(Game.activeElements[i])
			{
				Game.activeElements[i].eventKeyUp(code);
			}
		}
	};
	
	Game.room=Game.rooms[0];
	
	var parent=Game.canvas.parentNode;
	Game.canvasBuffer=document.createElement('canvas');
	Game.canvasBuffer.style.display='none';
	parent.appendChild(Game.canvasBuffer);
	Game.contextBuffer=Game.canvasBuffer.getContext('2d');
	
	if(Game.infoGameBuilder)
	{
		var p=document.createElement('span');
		
		p.innerHTML='Powered by <a href="http://jsglib.no-ip.org/">JSGlib</a>.';
		p.id='infoGameBuilder';
		p.style.textAlign='right';
		p.style.display='block';
		p.style.width=Game.room.width+'px';
		p.style.margin='auto';
		p.style.fontSize='12px';
		
		if(parent.lastchild==Game.canvas)
		{
			parent.appendChild(p);
		}
		else
		{
			parent.insertBefore(p,Game.canvas.nextSibling);
		}
	}
	
	Game.gameStart();
	Game.room.start();
	Game.end=false;
	Game.step();
};

/*== Method centering the game while resizing window during fullscreen ==*/
Game.centerResizeHandler=function()
{
    var style=window.getComputedStyle(Game.canvas),
        initWidth=parseInt(Game.canvas.getAttribute('data-jsglib-width'),10),
        initHeight=parseInt(Game.canvas.getAttribute('data-jsglib-height'),10),
        widthGTheight=window.innerWidth>window.innerHeight,
        gameWidthGTgameHeight=initWidth>initHeight;
        propWellSized=widthGTheight?'height':'width',
        propToChange=widthGTheight?'width':'height';
    
    //Check ratio width/height to resize correctly
    if((gameWidthGTgameHeight && widthGTheight) || (!gameWidthGTgameHeight && !widthGTheight))
    {
        if(window.innerWidth/window.innerHeight
            < initWidth/initHeight
        )
        {
            propWellSized=widthGTheight?'width':'height';
            propToChange=widthGTheight?'height':'width';
        }
    }
    
    var initValue=parseInt(Game.canvas.getAttribute('data-jsglib-'+propToChange),10);
        
    Game.canvas.style[propWellSized]='100%';
        
    initValue*=(parseInt(style[propWellSized],10)/parseInt(Game.canvas.getAttribute('data-jsglib-'+propWellSized), 10));
    
    Game.canvas.style[propToChange]=initValue+'px';
    
    if(propWellSized=='height')
    {
        Game.canvas.style.left=(window.innerWidth/2-parseInt(style.width,10)/2)+'px';
        Game.canvas.style.top=0;
    }
    else
    {
        Game.canvas.style.top=(window.innerHeight/2-parseInt(style.height,10)/2)+'px';
        Game.canvas.style.left=0;
    }
};

/*== Method resizing background-image while resizing window during fullscreen ==*/
Game.backgroundResizeHandler=function()
{
    var style=window.getComputedStyle(Game.canvas),
        backgroundImage=style.backgroundImage
                        .substring(
                            style.backgroundImage.indexOf('(')+1,
                            style.backgroundImage.lastIndexOf(')')
                        ).replace(/"/gi, '');
                        
    if(backgroundImage.length>0)
    {
        var img=new Image();
        img.src=backgroundImage;
        Game.canvas.setAttribute('data-jsglib-backgroundImageWidth', img.width);
        Game.canvas.setAttribute('data-jsglib-backgroundImageHeight', img.height);
    }
        
    var initWidth=parseInt(Game.canvas.getAttribute('data-jsglib-width'),10),
        initHeight=parseInt(Game.canvas.getAttribute('data-jsglib-height'),10),
        initImageWidth=parseInt(Game.canvas.getAttribute('data-jsglib-backgroundImageWidth'),10),
        initImageHeight=parseInt(Game.canvas.getAttribute('data-jsglib-backgroundImageHeight'),10),
        newWidth=parseInt(style.width,10),
        newHeight=parseInt(style.height,10),
        ratioWidth=newWidth/initWidth,
        ratioHeight=newHeight/initHeight;
        
    Game.canvas.setAttribute('data-jsglib-ratioWidth', ratioWidth);
    Game.canvas.setAttribute('data-jsglib-ratioHeight', ratioHeight);
    
    initImageWidth*=ratioWidth;
    initImageHeight*=ratioHeight;
    
    Game.canvas.style.backgroundSize=initImageWidth+'px '+initImageHeight+'px';
};

/*====================================================*/
/*============= Methods the user can call ============*/
/*====================================================*/

/*== Method adding a class to the game ==*/
Game.addClass=function(c)
{
	//We define a function: our future class
	window[c.name]=function(x,y)
	{
		c.parent=(c.parent==undefined)?['Element']:c.parent;
		
		if(typeof c.parent=='string')
		{
			c.parent=[c.parent];
		}
		
		c['abstract']=(c['abstract']==undefined)?false:c['abstract'];
		
		for(var i=0, l=c.parent.length; i<l; i++)
		{
			window[c.parent[i]].call(this); //We call the parent constructor
		}
		
		if(window[c.name].isLoaded==undefined)
		{
			//We get the parent's properties
			for(var i=0, l=c.parent.length; i<l; i++)
			{
				for(var e in window[c.parent[i]].prototype)
				{
					window[c.name].prototype[e]=window[c.parent[i]].prototype[e];
					this[e]=window[c.parent[i]].prototype[e];
				}
			}
			
			//And we add our own properties!
			for(var e in c)
			{
				if(e!='name' && e!='parent' && e!='abstract')
				{
					window[c.name].prototype[e]=c[e];
					this[e]=c[e];
				}
			}
			
			window[c.name].isLoaded=true;
			window[c.name]['abstract']=c['abstract'];
		}
		this.types.push(c.name);	
		
		this.x=parseInt(x,10);
		this.xstart=parseInt(x,10);
		this.y=parseInt(y,10);
		this.ystart=parseInt(y,10);
		this.id=Game.lastId++;
		
		//isNaN() is for the inheritance
		if(!isNaN(this.x))
		{
			var temp=['Element'];
			
			for(var i=0,l=this.types.length; i<l; i++)
			{
				temp.push(this.types[i]);
			}
			this.types=temp;
			Game.zIndex=true;
		}
	};
	window[c.name].toString=function(){return c.name;};
};

/*== Method preloading ressources and running the game ==*/
Game.loadAndRun=function(id,listImages,listSounds)
{
	Game.canvas=document.getElementById(id);
	if(Game.canvas==null)
	{
		alert('La zone de jeu indiquée n\'existe pas !');
		return false;
	}
	
	Element['abstract']=true;
	Game.context2D=Game.canvas.getContext("2d");
	Game.context2D.textBaseline = "top";
	
	Game.canvas.width='500';
	Game.canvas.height='30';
	Game.context2D.fillStyle='#000';
	Game.context2D.font='bold 20px Calibri';
	Game.context2D.fillText('0%',250,20);
							
	var length=0,
	total=-1,
	pourcent=0;
	listImages=(listImages==undefined)?{}:listImages;
	listSounds=(listSounds==undefined)?{}:listSounds;
	
	for(var i in listImages){length++;}
	for(var i in listSounds){length++;}
	length+=Game.rooms.length;
	if(length>0)
	{
		function progressBar()
		{
			total++;
			Game.canvas.height='30';
			pourcent=parseInt((total*100/length),10);
			Game.context2D.fillStyle='#ff0000';
			Game.context2D.rect(0,0,(500*pourcent)/100,30);
			Game.context2D.fill();
			Game.context2D.fillStyle='#000';
			Game.context2D.font='bold 20px Calibri';
			Game.context2D.fillText(pourcent+'%',250,20);
			
			if(total==length)
			{
				setTimeout(function(){Game.run();},500);
			}
		}
		progressBar();
		
		//Preloading the levels
		for(var i=0,l=Game.rooms.length; i<l; i++)
		{
			var room=Game.rooms[i];
			if(room.path)
			{
				Game.ajax(
				{
					'url': room.path,
					'type': 'GET',
					'async': false,
					'dataType': 'XML',
					'onSuccess': function(xml)
					{
						//We apply the definition of the gotten level
						room.xml=xml.documentElement;
						room.width=parseInt(room.xml.getAttribute('width'),10);
						if(room.view_w==0)
						{
							room.view_w=room.width;
						}
						room.height=parseInt(room.xml.getAttribute('height'),10);
						if(room.view_h==0)
						{
							room.view_h=room.height;
						}
						room.backgroundImage=room.xml.getAttribute('background');
						progressBar();
					},
					'onError': function()
					{
						alert('Erreur de chargement du fichier de niveau : '+room.path);
						return false;
					}
				});
			}
			else
			{
				progressBar();
			}
		}
		
		//The sounds
		for(var i in listSounds)
		{
			var sound=listSounds[i],
			audio=document.createElement('audio'),
			parent=Game.canvas.parentNode;
			audio.preload=true;
		
			if(parent.lastchild==Game.canvas)
			{
				parent.appendChild(audio);
			}
			else
			{
				parent.insertBefore(audio,Game.canvas.nextSibling);
			}
					
			for(var j in sound)
			{
				var mime=document.createElement('source'),
					ext=sound[j].substring(sound[j].lastIndexOf('.') + 1),
					type='';
					
				switch(ext)
				{
					case 'mp3': type='audio/mpeg'; break;
					case 'wav': type='audio/wav'; break;
					case 'ogg': type='audio/ogg'; break;
				}
				
				if(audio.canPlayType(type).length>0)
				{
					mime.src=sound[j];
					audio.appendChild(mime);
				}
			}
			
			Game.sounds[i]=audio;
			progressBar();
		}
		
		//And the images
		for(var i in listImages)
		{
			var image=new Image();
			image.src=listImages[i];
			Game.images[i]=image;
			image.onload=progressBar;		
		}
	}
	else
	{
		Game.run();
	}
};

/*== Method returning the image linked with the given alias (preloaded by loadImages) ==*/
Game.getImage=function(nom)
{
	if(Game.images[nom]!=undefined)
	{
		return Game.images[nom];
	}
	return null;
};

/*== Method returning the mouse coordinates ==*/
Game.getMouse=function(relativeToView)
{
	relativeToView=(relativeToView==null)?true:relativeToView;
	return [(relativeToView?Game.mouse_x:Game.mouse_x+Game.room.view_x),(relativeToView?Game.mouse_y:Game.mouse_y+Game.room.view_y)];
};

/*== Method setting the rooms of the game ==*/
Game.setRooms=function(rooms)
{
	Game.rooms=rooms;
	for(var i=0,l=rooms.length;i<l;i++)
	{
		Game.rooms[i].id=i;
	}
};

/*== Method redirecting to the next room ==*/
Game.goToNextRoom=function()
{
	var id=Game.room.id+1;
	if(Game.id>=Game.rooms.length)
	{
		id=0;
	}
	Game.room.eventEnd();
	Game.room=Game.rooms[id];
	Game.room.start();
};

/*== Method redirecting to the previous room ==*/
Game.goToPreviousRoom=function()
{
	var id=Game.room.id-1;
	if(id<0)
	{
		id=Game.rooms.length-1;
	}
	Game.room.eventEnd();
	Game.room=Game.rooms[id];
	Game.room.start();
};

/*== Method redirecting to the given room or to the one having the given id ==*/
Game.goToRoom=function(id)
{
	Game.room.eventEnd();
	if(!(id instanceof Room))
	{
		id=parseInt(id,10);
		if(id<0)
		{
			id=0;
		}
		else if(id>=Game.rooms.length)
		{
			id=Game.rooms.length-1;
		}
		Game.room=Game.rooms[id];
	}
	else
	{
		Game.room=id;
	}

	Game.room.start();
};

/*== Method restarting the room ==*/
Game.restartRoom=function()
{
	Game.room.start();
};

/*== Method returning the number of generated lines of the given text object ==*/
Game.numberOfLines=function(objet)
{
	return Game.getLinesOfText(objet).length;
};

/*== Method returning an array of lines of the given text object ==*/
Game.getLinesOfText=function(objet)
{
	objet=Game.mergeJSON(
	{
		'type': 'text',
		'x': 0,
		'y': 0,
		'color': '#000000',
		'borderLength': 0,
		'maxWidth': -1,
		'borderColor': '#ffffff',
		'font': '20px Calibri',
		'opacity': 100,
		'lineHeight': 20,
		'text': ''
	},(objet==undefined?{}:objet));
	
	Game.contextBuffer.textBaseline = "top";
	Game.contextBuffer.font=objet.font;
	
	var lines=objet.text.toString().split('\n');

	if(objet.maxWidth>0)
	{
		for(var k=0,nbr_lines=lines.length;k<nbr_lines;k++)
		{
			var l=Game.contextBuffer.measureText(lines[k]).width,
				tempLine='';	

			if(l>objet.maxWidth)
			{
				var start=-1,
					tempText='',
					c='',
					mots=lines[k].split(' '),
					length=mots.length;
				do
				{	
					tempText=c;
					c+=mots[++start]+' ';
					if(Game.contextBuffer.measureText(c).width>objet.maxWidth || start==length)
					{
						tempLine+=tempText+'\n';
						c=mots[start]+' ';
					}										
				}while(start<length);
				lines[k]=tempLine;
			}
			else
			{
				lines[k]+='\n';
			}
		}
		lines=lines.join('').split('\n');
		lines.splice(lines.length-1);
	}
	
	return lines;
};

/*== Method returning the width of the given text object ==*/
Game.widthOfText=function(objet)
{
	objet=Game.mergeJSON(
	{
		'type': 'text',
		'x': 0,
		'y': 0,
		'color': '#000000',
		'borderLength': 0,
		'maxWidth': -1,
		'borderColor': '#ffffff',
		'font': '20px Calibri',
		'opacity': 100,
		'lineHeight': 20,
		'text': ''
	},(objet==undefined?{}:objet));
	
	Game.context2D.lineWidth=objet.borderLength;
	Game.context2D.textBaseline = "top";
	Game.context2D.font=objet.font;
	var l=Game.context2D.measureText(objet.text).width;
	
	return (objet.maxWidth<l&&objet.maxWidth>-1)?objet.maxWidth:l;
};

/*== Method creating an instance of the given type on the given coordinates ==*/
Game.instanceCreate=function(x,y,type)
{
	if(typeof type=='string')
	{
		type=window[type];
	}
	
	if(type==undefined){alert('Erreur <intanceCreate> : impossible d\'instancier une classe non définie.');return null;}
	if(type['abstract']){alert('Erreur <intanceCreate> : impossible d\'instancier une classe abstraite ('+type.toString()+').');return null;}
		
	var instance=new type(x,y);
	Game.elements.push(instance);
	Game.activeElements.push(instance);
    instance.eventCreate();
	return instance;
};

/*== Method destroying the given element ==*/
Game.instanceDestroy=function(objet)
{
	objet.eventDestroy();
	
	for(var i=0,l=Game.elements.length; i<l; i++)
	{	
		if(Game.elements[i].id==objet.id)
		{
			Game.elements.splice(i,1);
			break;			
		}
	}
	
	for(var i=0,l=Game.activeElements.length; i<l; i++)
	{	
		if(Game.activeElements[i].id==objet.id)
		{
			Game.activeElements.splice(i,1);
			break;			
		}
	}
	
	Game.zIndex=true;
};

/*== Method returning the number of instances having the given type ==*/
Game.instanceNumber=function(type,scanNonActivated)
{
	if(typeof type=='string')
	{
		type=window[type];
	}
	var x=0,
		scan=scanNonActivated?Game.elements:Game.activeElements;
	
	for(var i=0,l=scan.length; i<l; i++)
	{
		if(scan[i].instanceOf(type))
		{
			x++;
		}
	}
	return x;
};

/*== Method checking if the given key is pressed or not ==*/
Game.isKeyPressed=function(key)
{
	for(var i=0,l=Game.keyspressed.length; i<l; i++)
	{
		if(Game.keyspressed[i]==key)
		{
			return true;
		}
	}
	return false;
};

/*== Method setting the pause of the game ==*/
Game.pause=function(objet)
{
	if(!Game.isPause)
	{
		Game.gameStartPause();
	}
	else
	{
		Game.gameEndPause();
	}
	
	for(var i=0,l=Game.elements.length; i<l; i++)
	{
		if(Game.elements[i].id!=objet.id)
		{
			Game.elements[i].setActive(Game.isPause);
		}
	}

	Game.isPause=!Game.isPause;
};

/*== Method returning the elements placing within the given area ==*/
Game.getInstancesIn=function(x,y,width,height,exclude,justTest,scanNonActivated)
{
	scanNonActivated=scanNonActivated==undefined?false:scanNonActivated;
	
	var element=false,
		retour=[],
		elements=scanNonActivated?Game.elements:Game.activeElements;
	
	// We multiply the data by 1000 because of floats comparisons bugs
	x=Math.round(x*1000);
	y=Math.round(y*1000);
	width=((width==undefined)?1:width)*1000;
	height=((height==undefined)?1:height)*1000;
	exclude=(exclude==undefined)?{}:exclude;
	justTest=(justTest==undefined)?false:justTest;
	
	exclude.elements=(exclude.elements==undefined)?[]:exclude.elements;
	exclude.types=(exclude.types==undefined)?[]:exclude.types;
	
	loopFree:
	for(var i=0,l=elements.length; i<l; i++)
	{
		element=elements[i];
		
		for(var j=0,length=exclude.types.length; j<length; j++)
		{
			if(element.instanceOf(exclude.types[j]))
			{
				continue loopFree;
			}
		}	
		
		for(var j=0,length=exclude.elements.length; j<length; j++)
		{
			if(element.id==exclude.elements[j].id)
			{
				continue loopFree;
			}
		}
		var mask=element.sprite.getMask(),
		maskX=mask.x*1000,
		maskY=mask.y*1000,
		elemX=Math.round(element.x*1000),
		elemY=Math.round(element.y*1000);
		
		if(!((x>=elemX+maskX+mask.width*1000) 
		|| (x+width<=elemX+maskX) 					
		|| (y>=elemY+maskY+mask.height*1000) 	
		|| (y+height<=elemY+maskY)))  				
		{
			if(justTest)
			{
				return true;
			}
			retour.push(element);
		}
	}
	if(justTest)
	{
		return false;
	}

	return retour;
};

/*== Method indicating if solid objects are placed within the given area ==*/
Game.placeIsFree=function(x,y,width,height)
{
	var instances=Game.getInstancesIn(x,y,width,height,{},false,false),
	solids=[];
	
	for(var i=0,l=instances.length; i<l; i++)
	{
		if(instances[i].solid)
		{
			solids.push(instances[i]);
		}
	}
	return (solids.length==0?true:solids);
};

/*== Methods returning the elements of the given type ==*/
Game.getInstancesByType=function(type,scanNonActivated)
{
	if(typeof type=='string')
	{
		type=window[type];
	}
	
	scanNonActivated=scanNonActivated==undefined?false:scanNonActivated;
	
	var retour=[],
		elements=scanNonActivated?Game.elements:Game.activeElements;
	
	for(var i=0,l=elements.length; i<l; i++)
	{
		if(elements[i].instanceOf(type))
		{
			retour.push(elements[i]);
		}
	}
	return retour;
};

/*== Method returning the element having the given id ==*/
Game.getInstanceById=function(id)
{
	for(var i=0,l=Game.elements.length; i<l; i++)
	{
		if(Game.elements[i].id==id)
		{
			return Game.elements[i];
		}
	}
	return null;
};

/*== Method defining a translation for the given text thanks to a key ==*/
Game.setTranslation=function(key,lang,text)
{
	if(Game.translations[key]==undefined)
	{
		Game.translations[key]={};
	}
	Game.translations[key][lang]=text;
};

/*== Method returning a translated text via its key ==*/
Game.getTranslation=function(key,vars,lang)
{
	if(Game.translations[key])
	{
		lang=(lang==undefined)?Game.userLang:lang;
		vars=(vars==undefined)?{}:vars;
		if(!Game.translations[key][lang])
		{
			lang=Game.defaultLang;
		}
		if(Game.translations[key][lang])
		{
			var t=Game.translations[key][lang];
			for(var i in vars)
			{
				t=t.replace(new RegExp(i,'g'),vars[i]);
			}
			return t;
		}
		else
		{
			return '['+key+']['+lang+']';
		}
	}
	else
	{
		return '['+key+']';
	}
};

/*== Method returning the coordinates of a point after a rotation ==*/
Game.getPointAfterRotation=function(pointSource,angle,pointRotation)
{
	angle=360-angle;
	angle*=Math.PI/180;
	
	return {
		'x': Math.cos(angle)*(pointSource.x-pointRotation.x)-Math.sin(angle)*(pointSource.y-pointRotation.y)+pointRotation.x,
		'y': Math.sin(angle)*(pointSource.x-pointRotation.x)+Math.cos(angle)*(pointSource.y-pointRotation.y)+pointRotation.y
	};
};

/*== Method indicating if two segments are in collision or not ==*/
Game.segmentsAreInCollision=function(segment1,segment2)
{
	var a=((segment2.end.x-segment2.start.x)*(segment1.start.y-segment2.start.y)-(segment2.end.y-segment2.start.y)*(segment1.start.x-segment2.start.x))/((segment2.end.y-segment2.start.y)*(segment1.end.x-segment1.start.x)-(segment2.end.x-segment2.start.x)*(segment1.end.y-segment1.start.y)),
	b=((segment1.end.x-segment1.start.x)*(segment1.start.y-segment2.start.y)-(segment1.end.y-segment1.start.y)*(segment1.start.x-segment2.start.x))/((segment2.end.y-segment2.start.y)*(segment1.end.x-segment1.start.x)-(segment2.end.x-segment2.start.x)*(segment1.end.y-segment1.start.y));
	
	return (a>=0&&a<=1&&b>=0&&b<=1);
};

/*== Method returning a random integer ==*/
Game.random=function(min,max)
{
	if(min>max)
	{
		var t=max;
		max=min;
		min=t;
	}
	var delta=1+max-min;
	return Math.floor(delta*Math.random())+min;
};

/*== Method merging two JSON ==*/
Game.mergeJSON=function(slave,master,overwrite)
{
	if(overwrite)
	{
		var r={};	
		for(var i in slave)
		{
			r[i]=slave[i];
		}
		
		for(var i in master)
		{
			if(r[i] && typeof r[i]=='object')
			{
				r[i]=Game.mergeJSON(r[i],master[i],true);
			}
			else
			{
				r[i]=master[i];
			}
		}
		return r;
	}
	
	for(var i in slave)
	{
		if(master[i]==undefined)
		{
			master[i]=slave[i];
		}
	}
	return master;
};

/*== Method playing a sound ==*/
Game.playSound=function(alias,loop,onend)
{
	if(Game.soundsActivated)
	{
		loop=loop==undefined?false:loop;
		var sound=Game.sounds[alias];
		
		if(sound!=undefined)
		{
            if(sound.currentTime!=0)
            {
                sound.currentTime=0;
            }
			sound.play();
			if(!Game.soundIsPlaying(alias))
			{
				Game.soundsPlaying.push(alias);
			}
						
			sound.addEventListener('ended',function listener()
			{
				sound.removeEventListener('ended',listener,false);
				for(var i=0,l=Game.soundsPlaying.length; i<l; i++)
				{	
					if(Game.soundsPlaying[i]==alias)
					{
						Game.soundsPlaying.splice(i,1);
						break;			
					}
				}	
				if(onend!=undefined)
				{
					onend();
				}
				if(loop)
				{
					sound.currentTime=0;
					Game.playSound(alias,true,onend);
				}
			},false);
		}
		else
		{
			alert('Erreur <playSound> : son "'+alias+'" non défini.');
		}
	}
};

/*== Method stopping a sound ==*/
Game.pauseSound=function(alias,stop,callEndFunction)
{
	var sound=Game.sounds[alias];
	if(sound!=undefined)
	{
		if(Game.soundIsPlaying(alias))
		{
			callEndFunction=callEndFunction==undefined?false:callEndFunction;
			stop=stop==undefined?false:true;
			if(stop)
			{
				sound.currentTime=0;
			}

			sound.pause();
			
			for(var i=0,l=Game.soundsPlaying.length; i<l; i++)
			{	
				if(Game.soundsPlaying[i]==alias)
				{
					Game.soundsPlaying.splice(i,1);
					break;			
				}
			}
			
			if(callEndFunction && sound.onended)
			{
				sound.onended();
			}
		}
	}
	else
	{
		alert('Erreur <Game.pauseSound()> : son "'+alias+'" non défini.');
	}
};

/*== Method indicating if a sound is playing or not ==*/
Game.soundIsPlaying=function(alias)
{
	if(Game.soundsActivated)
	{
		for(var i=0,l=Game.soundsPlaying.length; i<l; i++)
		{
			if(Game.soundsPlaying[i]==alias)
			{
				return true;
			}
		}
	}
	return false;
};

/*== Method (des)activating the sound ==*/
Game.toggleSounds=function(force)
{
	Game.soundsActivated=force==undefined?!Game.soundsActivated:force;
	var method=Game.soundsActivated?'play':'pause';
	
	for(var i=0,l=Game.soundsPlaying.length; i<l; i++)
	{
		Game.sounds[Game.soundsPlaying[i]][method]();
	}
};

/*== Method stopping all the sounds ==*/
Game.stopSounds=function()
{
	for(var i=0, l=Game.soundsPlaying.length; i<l; i++)
	{
		if(Game.soundsPlaying[i])
		{
			Game.pauseSound(Game.soundsPlaying[i],true);
		}
	}
};

/*== Method performing an Ajax request ==*/
Game.ajax=function(options)
{
	var req=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP'),
		defaults=
		{
			'url': './',
			'async': true,
			'type': 'POST',
			'dataType': 'text',
			'data': null,
			'onAjaxAborted': function(){},
			'onError': function(){},
			'onSuccess': function(){}
		};
		
	//Merge defaults with given options
	for(var i in defaults)
	{
		if(typeof options[i] === "undefined")
		{
			options[i]=defaults[i];
		}
	}
	
	if(req)
	{	
		//Format datas
		var data='',
			isPost=options.type=='POST',
			objectToStringData=function(index,value,prefix)
			{
				index=prefix==undefined?index:prefix+'['+index+']';
				
				if(typeof value== 'object')
				{
					var d='';
					if(value instanceof Array)
					{
						for(var i=0, l=value.length; i<l; i++)
						{
							d+=objectToStringData(i,value[i],index);
						}
					}
					else
					{
						for(var i in value)
						{
							d+=objectToStringData(i,value[i],index);
						}
					}
					return d;
				}
				else
				{
					return index+'='+value+'&';
				}
			};
			
		for(var i in options.data)
		{
			data+=objectToStringData(i,options.data[i]);
		}

		data=data.substr(0,data.length-1);
				
		req.onreadystatechange=function() 
		{
			//Only if req is "loaded"
			if(req.readyState == 4) 
			{
			   //Only if "OK"
			   if (req.status == 200 || req.status == 304) 
			   {
				   options.dataType=options.dataType.toUpperCase();
				   options.onSuccess(options.dataType=='JSON'?JSON.parse(req.responseText):(options.dataType=='XML'?req.responseXML:req.responseText));
			   } 
			   else 
			   {
				  options.onError(req.statusText);
			   }
			}
		};
		req.open(options.type, options.url+(isPost?'':'?'+data), options.async);
		if(isPost)
		{
			req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			req.setRequestHeader('Content-length', data.length);
		}
		req.send(data);
	}
	else
	{
		options.onAjaxAborted();
	}
};

/*== Method setting the fullscreen on/off ==*/
Game.toggleFullscreen = function(scale)
{
    var style=window.getComputedStyle(Game.canvas);
        
    if(Game.isFullscreen)
    {
        Game.isFullscreen=false;
        Game.canvas.style.position=Game.canvas.getAttribute('data-jsglib-position');
        Game.canvas.style.left=Game.canvas.getAttribute('data-jsglib-left');
        Game.canvas.style.top=Game.canvas.getAttribute('data-jsglib-top');
        Game.canvas.style.width=Game.canvas.getAttribute('data-jsglib-width');
        Game.canvas.style.height=Game.canvas.getAttribute('data-jsglib-height');
        Game.canvas.style.backgroundSize=Game.canvas.getAttribute('data-jsglib-backgroundSize');
        window.removeEventListener('resize', Game.centerResizeHandler);
        window.removeEventListener('resize', Game.backgroundResizeHandler);
    }
    else
    {
        Game.isFullscreen=true;        
        Game.canvas.setAttribute('data-jsglib-position', style.position);
        Game.canvas.setAttribute('data-jsglib-left', style.left);
        Game.canvas.setAttribute('data-jsglib-top', style.top);
        Game.canvas.setAttribute('data-jsglib-width', style.width);
        Game.canvas.setAttribute('data-jsglib-height', style.height);
        Game.canvas.setAttribute('data-jsglib-backgroundSize', style.backgroundSize);
        Game.canvas.setAttribute('data-jsglib-backgroundImageWidth', 0);
        Game.canvas.setAttribute('data-jsglib-backgroundImageHeight', 0);
        
        Game.canvas.style.position='fixed';
        Game.canvas.style.left=0;
        Game.canvas.style.top=0;
        
        if(scale)
        {
            Game.canvas.style.width='100%';
            Game.canvas.style.height='100%';        
        }
        else
        {
            Game.centerResizeHandler();
            window.addEventListener('resize', Game.centerResizeHandler);
        }
        Game.backgroundResizeHandler();
        window.addEventListener('resize', Game.backgroundResizeHandler);
    }
};

/*== Method returning the distance bewteen two points ==*/
Game.getDistanceBetweenPoints = function(point1, point2)
{
    if(point1 instanceof Array)
    {
        point1=
        {
            "x": point1[0],
            "y": point1[1]
        };
    }
    if(point2 instanceof Array)
    {
        point2=
        {
            "x": point2[0],
            "y": point2[1]
        };
    }
    return Math.sqrt(Math.pow(point1.x-point2.x,2)+Math.pow(point1.y-point2.y,2));
};

/*====================================================*/
/*==		Methods defined by the user				==*/
/*====================================================*/

Game.gameStart=function(){};			//Method called when the game starts
Game.gameEnd=function(){};				//Method called when the game stops
Game.gameStartPause=function(){};		//Method called when the game is pause
Game.gameEndPause=function(){};			//Method called when the game is no longer pause

/*====================================================*/
/*========== Main class for each element =============*/
/*====================================================*/

function Element()
{
	this.types=!this.types?[]:this.types;//Types of the element
	this.id=0;							//Id of the element
	this.x=0;							//Abscissa
	this.y=0;							//Ordinate
	this.xstart=0;						//Start abscissa
	this.ystart=0;						//Start ordinate
	this.xprev=0;						//Abscissa on the previous step
	this.yprev=0;						//Ordinate on the previous step
	this.vspeed=0;						//Vertical speed
	this.hspeed=0;						//Horizontal speed
	this.visible=true;					//Is the element visible?
	this.opacity=100;					//Opacity of the element (0=transparent ; 100=opaque)
	this.rotate=0;						//Rotation of the element
	this.zIndex=1;						//Depth of the element 
	this.centerRotateX=0;				//Abscissa of the center of rotation
	this.centerRotateY=0;				//Ordinate of the center of rotation
	this.sprite=new Sprite(null,0,0);	//Sprite of the element
	this.gravity=0;						//Gravity applied on the element
	this.draws=[];						//Array storing the graphics elements to draw
	this.active=true;					//Is the element active?
	this.switchPositionWhenLeave=false;	//Is the element teleported when it leaves the screen?
	this.checkForCollisions=true;		//Do we need to check collisions?
	this.collideSolid=true;				//Do we need to check precise collisions with solids objects?
	this.solid=false;					//Is the element a solid one?
	this.moveToPointCallBack={};		//JSON containing the function to call via moveToPoint()
	this.alarm1=0;						//Time to wait before the event for alarm 1 is triggered
	this.alarm2=0;						//Time to wait before the event for alarm 2 is triggered
	this.alarm3=0;						//Time to wait before the event for alarm 3 is triggered
	this.alarm4=0;						//Time to wait before the event for alarm 4 is triggered
	this.alarm5=0;						//Time to wait before the event for alarm 5 is triggered
	this.alarm6=0;						//Time to wait before the event for alarm 6 is triggered
	this.alarm7=0;						//Time to wait before the event for alarm 7 is triggered
	this.alarm8=0;						//Time to wait before the event for alarm 8 is triggered
	this.alarm9=0;						//Time to wait before the event for alarm 9 is triggered
	this.alarm10=0;						//Time to wait before the event for alarm 10 is triggered
	this.state=0;						//State of the element (defined below)
	
	if(Element.isLoaded==undefined)
	{
		Element.isLoaded=true;			//The class is correctly loaded
		Element.canvasFilter = document.createElement('canvas');
		Element.contextFilter = Element.canvasFilter.getContext('2d');
        Element.STATE_STAND=0;				
		Element.STATE_STAND_LEFT=1;			
		Element.STATE_STAND_RIGHT=2;		
		Element.STATE_STAND_UP=3;			
		Element.STATE_STAND_UP_LEFT=4;		
		Element.STATE_STAND_UP_RIGHT=5;		
		Element.STATE_STAND_DOWN=6;			
		Element.STATE_STAND_DOWN_LEFT=7;	
		Element.STATE_STAND_DOWN_RIGHT=8;	
		Element.STATE_MOVE=9;				
		Element.STATE_MOVE_RIGHT=10;		
		Element.STATE_MOVE_LEFT=11;			
		Element.STATE_MOVE_UP=12;			
		Element.STATE_MOVE_UP_LEFT=13;		
		Element.STATE_MOVE_UP_RIGHT=14;		
		Element.STATE_MOVE_DOWN=15;			
		Element.STATE_MOVE_DOWN_LEFT=16;	
		Element.STATE_MOVE_DOWN_RIGHT=17;	
		Element.STATE_HURT=18;				
		Element.STATE_HURT_LEFT=19;			
		Element.STATE_HURT_RIGHT=20;		
		Element.STATE_HURT_UP=21;			
		Element.STATE_HURT_DOWN=22;			
		Element.STATE_DEATH=23;				
		Element.STATE_DEATH_LEFT=24;		
		Element.STATE_DEATH_RIGHT=25;		
		Element.STATE_DEATH_UP=26;			
		Element.STATE_DEATH_DOWN=27;	

		/*====================================================*/
		/*================ Internal methods ==================*/
		/*====================================================*/

		/*== Method moving the element ==*/
		Element.prototype.move=function()
		{		
			if(Math.abs(this.hspeed)<0.05)
			{
				this.hspeed=0;
			}
			if(Math.abs(this.vspeed)<0.05)
			{
				this.vspeed=0;
			}
			this.x+=this.hspeed;
			this.vspeed+=this.gravity;
			this.y+=this.vspeed;
		
			if(this.collideSolid)
			{
				
				//If we are on a solid element, we change the position
				var thisMask=this.sprite.getMask(),
				s=Game.placeIsFree(this.x+thisMask.x,this.y+thisMask.y,thisMask.width,thisMask.height),
				solids=(s===true?true:(s.length>1?s:(s[0].id==this.id?true:s)));
				
				if(solids!==true)
				{
					var dir=this.getDirection();
					
					if(dir>0)
					{			
						var direction=((dir==360)?Element.STATE_MOVE_RIGHT:(dir==90?Element.STATE_MOVE_UP:(dir==180?Element.STATE_MOVE_LEFT:(dir==270?Element.STATE_MOVE_DOWN:((dir>0&&dir<90)?Element.STATE_MOVE_UP_RIGHT:((dir>90&&dir<180)?Element.STATE_MOVE_UP_LEFT:((dir>180&&dir<270)?Element.STATE_MOVE_DOWN_LEFT:Element.STATE_MOVE_DOWN_RIGHT))))))),
						tempX=this.xprev+thisMask.x,
						tempY=this.yprev+thisMask.y;
						
						while(solids!==true)
						{							
							if(solids.length>1)
							{
								s=this.instanceNearest(Element,thisMask.x,thisMask.y,solids);
							}
							else
							{
								s=solids[0];
							}
							if(s.id==this.id){break;}
													
							var otherMask=s.sprite.getMask();
							
							this.eventCollisionWith(s);
							s.eventCollisionWith(this);
							if(direction==Element.STATE_MOVE_RIGHT)
							{								
								this.x=s.x+otherMask.x-thisMask.x-thisMask.width;
							}
							else if(direction==Element.STATE_MOVE_UP)
							{
								this.y=s.y+otherMask.y+otherMask.height-thisMask.y;							
							}
							else if(direction==Element.STATE_MOVE_LEFT)
							{
								this.x=s.x+otherMask.x+otherMask.width-thisMask.x;
							}
							else if(direction==Element.STATE_MOVE_DOWN)
							{
								this.y=s.y+otherMask.y-thisMask.y-thisMask.height;	
							}
							else 
							{
								if(direction==Element.STATE_MOVE_UP_RIGHT)
								{						
									if(tempY>=s.y+otherMask.y+otherMask.height)
									{
										this.y=s.y+otherMask.y+otherMask.height-thisMask.y;
									}
									else
									{
										this.x=s.x+otherMask.x-thisMask.x-thisMask.width;
									}
								}
								else if(direction==Element.STATE_MOVE_UP_LEFT)
								{
									if(tempY>=s.y+otherMask.y+otherMask.height)
									{
										this.y=s.y+otherMask.y+otherMask.height-thisMask.y;
									}
									else
									{
										this.x=s.x+otherMask.x+otherMask.width-thisMask.x;
									}
								}
								else if(direction==Element.STATE_MOVE_DOWN_LEFT)
								{
									if(tempY+thisMask.height<=s.y+otherMask.y)
									{
										this.y=s.y+otherMask.y-thisMask.y-thisMask.height;
									}
									else
									{
										this.x=s.x+otherMask.x+otherMask.width-thisMask.x;
									}
								}
								else if(direction==Element.STATE_MOVE_DOWN_RIGHT)
								{
									if(tempY+thisMask.height<=s.y+otherMask.y)
									{
										this.y=s.y+otherMask.y-thisMask.y-thisMask.height;
									}
									else
									{
										this.x=s.x+otherMask.x-thisMask.x-thisMask.width
									}
								}
							}
							
							s=Game.placeIsFree(this.x+thisMask.x,this.y+thisMask.y,thisMask.width,thisMask.height);
							solids=(s===true?true:(s.length>1?s:(s[0].id==this.id?true:s)));
						}
					}
					else
					{
						for(var i=0,l=solids.length;i<l;i++)
						{
							this.eventCollisionWith(solids[i]);
							solids[i].eventCollisionWith(this);
						}
					}
				}
			}
		};

		/*== Method displaying the element ==*/
		Element.prototype.display=function()
		{
			if(this.active)
			{
				if(this.visible)
				{
					var posXImage=0,
					posYImage=0;
					if(this.sprite.src!=null&& this.sprite.src.complete)
					{
						if(this.sprite.isTiles)
						{
							var position=this.sprite.getImage();
							posXImage=parseInt(position[0],10);
							posYImage=parseInt(position[1],10);
						}
						var spriteX=this.x-Game.room.view_x,
                            spriteY=this.y-Game.room.view_y,
                            isRotated=this.rotate>0;
						
                        Game.contextBuffer.globalAlpha=(this.opacity/100).toFixed(1);
                        
                        if(isRotated)
                        {
                            Game.contextBuffer.save();
                            Game.contextBuffer.translate(this.centerRotateX,this.centerRotateY);
                            Game.contextBuffer.rotate((360-this.rotate) * Math.PI/180);
                        }
						Game.contextBuffer.drawImage(this.sprite.src,posXImage,posYImage,this.sprite.width,this.sprite.height,Math.round(spriteX-this.centerRotateX),Math.round(spriteY-this.centerRotateY),this.sprite.width*this.sprite.stretchX,this.sprite.height*this.sprite.stretchY);
						
                        if(isRotated)
                        {
                            Game.contextBuffer.restore();
                        }
					}
					var lengthDraws=this.draws.length;
					for(var i=0; i<lengthDraws; i++)
					{
						if(this.draws[i].opacity){Game.contextBuffer.globalAlpha=(this.draws[i].opacity/100).toFixed(1);}
						if(this.draws[i].color && this.draws[i].type!='filter'){Game.contextBuffer.fillStyle=this.draws[i].color;}
						if(this.draws[i].borderLength){Game.contextBuffer.lineWidth=this.draws[i].borderLength;}
						if(this.draws[i].borderColor){Game.contextBuffer.strokeStyle=this.draws[i].borderColor;}
						
						switch(this.draws[i].type)
						{
							case 'text':
								var lines=Game.getLinesOfText(this.draws[i]),
									nbr_lines=lines.length;
								
								for(var k=0;k<nbr_lines;k++)
								{
									if(this.draws[i].borderLength>0)
									{
										Game.contextBuffer.strokeText(lines[k],this.draws[i].x,this.draws[i].y+(k*this.draws[i].lineHeight));
									}

									Game.contextBuffer.fillText(lines[k],this.draws[i].x,this.draws[i].y+(k*this.draws[i].lineHeight));
								}
							break;
							
							case 'rectangle':
								Game.contextBuffer.fillRect(this.draws[i].x,this.draws[i].y,this.draws[i].width,this.draws[i].height);
								if(this.draws[i].borderLength>0)
								{
									Game.contextBuffer.strokeRect(this.draws[i].x,this.draws[i].y,this.draws[i].width,this.draws[i].height);								
								}	
															
							break;
							
							case 'circle':
								Game.contextBuffer.beginPath();
								Game.contextBuffer.arc(this.draws[i].x,this.draws[i].y,this.draws[i].radius,0,360,false);
								Game.contextBuffer.fill();
								if(this.draws[i].borderLength>0)
								{
									Game.contextBuffer.stroke();
								}
							break;
							
							case 'shape':
								Game.contextBuffer.beginPath();
								Game.contextBuffer.moveTo(this.draws[i].points[0].x,this.draws[i].points[1].y);
								
								for(var j=1, l=this.draws[i].points.length; j<l; j++)
								{
									Game.contextBuffer.lineTo(this.draws[i].points[j].x,this.draws[i].points[j].y);
								}
								
								if(this.draws[i].close)
								{
									Game.contextBuffer.closePath();
								}
								
								Game.contextBuffer.fill();
								if(this.draws[i].borderLength>0)
								{
									Game.contextBuffer.stroke();
								}
							break;
							
							case 'image':
								this.draws[i].sprite.changeImage();
								var position=this.draws[i].sprite.getImage(),
                                    posXSubImage=parseInt(position[0],10),
                                    posYSubImage=parseInt(position[1],10),
                                    drawIsRotated=this.draws[i].rotate>0;
								
								if(drawIsRotated)
								{
                                    Game.contextBuffer.save();
									Game.contextBuffer.translate(this.draws[i].centerRotateX,this.draws[i].centerRotateY);
									Game.contextBuffer.rotate((360-this.draws[i].rotate) * Math.PI/180);
								}
								Game.contextBuffer.drawImage(this.draws[i].sprite.src,posXSubImage,posYSubImage,this.draws[i].sprite.width,this.draws[i].sprite.height,this.draws[i].x-this.draws[i].centerRotateX,this.draws[i].y-this.draws[i].centerRotateY,this.draws[i].sprite.width*this.draws[i].sprite.stretchX,this.draws[i].sprite.height*this.draws[i].sprite.stretchY);
								
                                if(drawIsRotated)
								{
                                    Game.contextBuffer.restore();
                                }
							break;
                            
                            case 'filter':
                                var c=Element.canvasFilter,
                                    ctx = Element.contextFilter,
                                    sprite = this.draws[i].sprite;

                                c.width = sprite.width*sprite.stretchX;
                                c.height = sprite.height*sprite.stretchY;
                                
                                if(isRotated)
                                {
                                    ctx.save();
                                    ctx.translate(this.centerRotateX,this.centerRotateY);
                                    ctx.rotate((360-this.rotate) * Math.PI/180);
                                }
                                
                                ctx.drawImage(sprite.src,posXImage,posYImage,sprite.width,sprite.height,Math.round(-this.centerRotateX),Math.round(-this.centerRotateY),sprite.width*sprite.stretchX,sprite.height*sprite.stretchY);            
                                
                                if(isRotated)
                                {
                                    ctx.restore();
                                }
                                var imgData=ctx.getImageData(0,0,c.width,c.height);

                                //Check each pixel...
                                for (var k = 0, n = imgData.data.length; k < n; k += 4)
                                {
                                    if(imgData.data[k+3]>0)
                                    {
                                        //Thanks to http://docs.gimp.org/en/gimp-concepts-layer-modes.html for these modes!
                                        switch(this.draws[i].mode)
                                        {
                                            case 'multiply':
                                                imgData.data[k]*=this.draws[i].color[0]/255;
                                                imgData.data[k+1]*=this.draws[i].color[1]/255;
                                                imgData.data[k+2]*=this.draws[i].color[2]/255;
                                            break;
                                            
                                            case 'divide':
                                                imgData.data[k]=Math.min(255, (256*imgData.data[k])/(this.draws[i].color[0]+1));
                                                imgData.data[k+1]=Math.min(255, (256*imgData.data[k+1])/(this.draws[i].color[1]+1));
                                                imgData.data[k+2]=Math.min(255, (256*imgData.data[k+2])/(this.draws[i].color[2]+1));
                                            break;
                                            
                                            case 'screen':
                                                imgData.data[k]=255-(((255-this.draws[i].color[0])*(255-imgData.data[k]))/255);
                                                imgData.data[k+1]=255-(((255-this.draws[i].color[1])*(255-imgData.data[k+1]))/255);
                                                imgData.data[k+2]=255-(((255-this.draws[i].color[2])*(255-imgData.data[k+2]))/255);
                                            break;
                                            
                                            case 'overlay':
                                                imgData.data[k]=(imgData.data[k]/255)*(imgData.data[k]+((2*this.draws[i].color[0])/255)*(255-imgData.data[k]));
                                                imgData.data[k+1]=(imgData.data[k+1]/255)*(imgData.data[k+1]+((2*this.draws[i].color[1])/255)*(255-imgData.data[k+1]));
                                                imgData.data[k+2]=(imgData.data[k+2]/255)*(imgData.data[k+2]+((2*this.draws[i].color[2])/255)*(255-imgData.data[k+2]));
                                            break;
                                            
                                            case 'dodge':
                                                imgData.data[k]=Math.min(255,(imgData.data[k]*256)/(255-this.draws[i].color[0]+1));
                                                imgData.data[k+1]=Math.min(255,(imgData.data[k+1]*256)/(255-this.draws[i].color[1]+1));
                                                imgData.data[k+2]=Math.min(255,(imgData.data[k+2]*256)/(255-this.draws[i].color[2]+1));
                                            break;
                                            
                                            case 'burn':
                                                imgData.data[k]=Math.max(0,255-((256*(255-imgData.data[k]))/(this.draws[i].color[0]+1)));
                                                imgData.data[k+1]=Math.max(0,255-((256*(255-imgData.data[k+1]))/(this.draws[i].color[1]+1)));
                                                imgData.data[k+2]=Math.max(0,255-((256*(255-imgData.data[k+2]))/(this.draws[i].color[2]+1)));
                                            break;
                                            
                                            case 'hard_light':
                                                var red=this.draws[i].color[0]>128?(255-((255-2*(this.draws[i].color[0]-128))*(255-imgData.data[k]))/256):Math.min(255,(2*this.draws[i].color[0]*imgData.data[k])/256),
                                                    green=this.draws[i].color[1]>128?(255-((255-2*(this.draws[i].color[1]-128))*(255-imgData.data[k+1]))/256):Math.min(255,(2*this.draws[i].color[1]*imgData.data[k+1])/256),
                                                    blue=this.draws[i].color[2]>128?(255-((255-2*(this.draws[i].color[2]-128))*(255-imgData.data[k+2]))/256):Math.min(255,(2*this.draws[i].color[2]*imgData.data[k+2])/256);
                                                
                                                imgData.data[k]=red;
                                                imgData.data[k+1]=green;
                                                imgData.data[k+2]=blue;
                                            break;
                                            
                                            case 'grain_extract':
                                                var red=Math.max(0,imgData.data[k]-this.draws[i].color[0]+128),
                                                    green=Math.max(0,imgData.data[k+1]-this.draws[i].color[1]+128),
                                                    blue=Math.max(0,imgData.data[k+2]-this.draws[i].color[2]+128);
                                                
                                                imgData.data[k]=Math.min(255,red);
                                                imgData.data[k+1]=Math.min(255,green);
                                                imgData.data[k+2]=Math.min(255,blue);
                                            break;
                                            
                                            case 'grain_merge':
                                                var red=Math.max(0,imgData.data[k]+this.draws[i].color[0]-128),
                                                    green=Math.max(0,imgData.data[k+1]+this.draws[i].color[1]-128),
                                                    blue=Math.max(0,imgData.data[k+2]+this.draws[i].color[2]-128);
                                                
                                                imgData.data[k]=Math.min(255,red);
                                                imgData.data[k+1]=Math.min(255,green);
                                                imgData.data[k+2]=Math.min(255,blue);
                                            break;
                                            
                                            case 'average':
                                                var red=(imgData.data[k]+this.draws[i].color[0])/2,
                                                    green=(imgData.data[k+1]+this.draws[i].color[1])/2,
                                                    blue=(imgData.data[k+2]+this.draws[i].color[2])/2;
                                                
                                                imgData.data[k]=red;
                                                imgData.data[k+1]=green;
                                                imgData.data[k+2]=blue;
                                            break;
                                            
                                            case 'difference':
                                                imgData.data[k]=Math.abs(imgData.data[k]-this.draws[i].color[0]);
                                                imgData.data[k+1]=Math.abs(imgData.data[k+1]-this.draws[i].color[1]);
                                                imgData.data[k+2]=Math.abs(imgData.data[k+2]-this.draws[i].color[2]);
                                            break;
                                            
                                            case 'addition':
                                                imgData.data[k]=Math.min(255,imgData.data[k]+this.draws[i].color[0]);
                                                imgData.data[k+1]=Math.min(255,imgData.data[k+1]+this.draws[i].color[1]);
                                                imgData.data[k+2]=Math.min(255,imgData.data[k+2]+this.draws[i].color[2]);
                                            break;
                                            
                                            case 'substract':
                                                imgData.data[k]=Math.max(0,imgData.data[k]-this.draws[i].color[0]);
                                                imgData.data[k+1]=Math.max(0,imgData.data[k+1]-this.draws[i].color[1]);
                                                imgData.data[k+2]=Math.max(0,imgData.data[k+2]-this.draws[i].color[2]);
                                            break;
                                            
                                            case 'darken_only':
                                                imgData.data[k]=Math.min(imgData.data[k],this.draws[i].color[0]);
                                                imgData.data[k+1]=Math.min(imgData.data[k+1],this.draws[i].color[1]);
                                                imgData.data[k+2]=Math.min(imgData.data[k+2],this.draws[i].color[2]);
                                            break;
                                            
                                            case 'lighten_only':
                                                imgData.data[k]=Math.max(imgData.data[k],this.draws[i].color[0]);
                                                imgData.data[k+1]=Math.max(imgData.data[k+1],this.draws[i].color[1]);
                                                imgData.data[k+2]=Math.max(imgData.data[k+2],this.draws[i].color[2]);
                                            break;

                                            default:
                                                imgData.data[k] = this.draws[i].color[0];
                                                imgData.data[k+1] = this.draws[i].color[1];
                                                imgData.data[k+2] = this.draws[i].color[2];
                                            break;
                                        }
                                    }
                                }
                                ctx.putImageData(imgData,0,0);

                                Game.contextBuffer.drawImage(c,0,0,sprite.width,sprite.height,Math.round(this.draws[i].x-this.centerRotateX),Math.round(this.draws[i].y-this.centerRotateY),sprite.width*sprite.stretchX,sprite.height*sprite.stretchY);
                            break;
						}
					}
					this.draws=[];
				}
			}
		};
		
		/*== Method switching the position of the element when it leaves the room ==*/
		Element.prototype.switchPositionWhenOutsideRoom=function()
		{
			if(this.x>=Game.room.width && this.x>this.xprev)
			{
				this.x=-(this.sprite.width/2);
			}
			else if(this.x<=0 && this.x<this.xprev)
			{
				this.x=Game.room.width-(this.sprite.width/2);
			}
			else if(this.y<=0 && this.y<this.yprev)
			{
				this.y=Game.room.height+(this.sprite.height/2);
			}
			else if(this.y>=Game.room.height && this.y>this.yprev)
			{
				this.y=-(this.sprite.height/2);
			}
		};
		
		/*== Method returning all the elements in collision with this element ==*/
		Element.prototype.checkCollisions=function()
		{
			var collisions=[],
			element=null,
			
			thisTopLeft=null,
			thisTopRight=null,
			thisBottomRight=null,
			thisBottomLeft=null,
			thisSegments=[],
			
			elementTopLeft=null,
			elementTopRight=null,
			elementBottomRight=null,
			elementBottomLeft=null,
			elementSegments=[],
			
			thisMask=this.sprite.getMask();
			
			for(var i=0,l=Game.activeElements.length; i<l; i++)
			{
				element=Game.activeElements[i];
				if(element.id==this.id){continue;}
				var otherMask=element.sprite.getMask();
				if(element.id!=this.id && !element.solid && element.checkForCollisions)
				{
					if((this.rotate==0 || this.rotate==360) && (element.rotate==0 || element.rotate==360))
					{
						var x=Math.round(this.x*1000),
						y=Math.round(this.y*1000),
						elemX=Math.round(element.x*1000),
						elemY=Math.round(element.y*1000);
						thisMaskx=thisMask.x*1000,
						thisMasky=thisMask.y*1000,
						otherMaskx=otherMask.x*1000,
						otherMasky=otherMask.y*1000;
						
						if(!((x+thisMaskx>=elemX+otherMaskx+otherMask.width*1000) 
						|| (x+thisMaskx+thisMask.width*1000<=elemX+otherMaskx) 					
						|| (y+thisMasky>=elemY+otherMasky+otherMask.height*1000) 	
						|| (y+thisMasky+thisMask.height*1000<=elemY+otherMasky)))  				
						{
							collisions.push(element);
						}
					}
					else
					{
						if(thisTopLeft==null)
						{
							thisTopLeft=Game.getPointAfterRotation({'x':this.x+thisMask.x,'y':this.y+thisMask.y},this.rotate,{'x':this.centerRotateX,'y':this.centerRotateY});
							thisTopRight=Game.getPointAfterRotation({'x':this.x+thisMask.x+thisMask.width,'y':this.y+thisMask.y},this.rotate,{'x':this.centerRotateX,'y':this.centerRotateY});
							thisBottomRight=Game.getPointAfterRotation({'x':this.x+thisMask.x+thisMask.width,'y':this.y+thisMask.y+thisMask.height},this.rotate,{'x':this.centerRotateX,'y':this.centerRotateY});
							thisBottomLeft=Game.getPointAfterRotation({'x':this.x+thisMask.x,'y':this.y+thisMask.y+thisMask.height},this.rotate,{'x':this.centerRotateX,'y':this.centerRotateY});
							
							thisSegments=[{'start': thisTopLeft, 'end': thisTopRight},
							{'start': thisTopRight, 'end': thisBottomRight},
							{'start': thisBottomRight, 'end': thisBottomLeft},
							{'start': thisBottomLeft, 'end': thisTopLeft}];
						}
						
						elementTopLeft=Game.getPointAfterRotation({'x':element.x+otherMask.x,'y':element.y+otherMask.y},element.rotate,{'x':element.centerRotateX,'y':element.centerRotateY});
						elementTopRight=Game.getPointAfterRotation({'x':element.x+otherMask.x+otherMask.width,'y':element.y+otherMask.y},element.rotate,{'x':element.centerRotateX,'y':element.centerRotateY});
						elementBottomRight=Game.getPointAfterRotation({'x':element.x+otherMask.x+otherMask.width,'y':element.y+otherMask.y+otherMask.height},element.rotate,{'x':element.centerRotateX,'y':element.centerRotateY});
						elementBottomLeft=Game.getPointAfterRotation({'x':element.x+otherMask.x,'y':element.y+otherMask.y+otherMask.height},element.rotate,{'x':element.centerRotateX,'y':element.centerRotateY});
					
						elementSegments=[{'start': elementTopLeft, 'end': elementTopRight},
						{'start': elementTopRight, 'end': elementBottomRight},
						{'start': elementBottomRight, 'end': elementBottomLeft},
						{'start': elementBottomLeft, 'end': elementTopLeft}];
						
						loopFree:
						for(var j=0; j<4; j++)
						{
							for(var k=0; k<4; k++)
							{
								if(Game.segmentsAreInCollision(thisSegments[j],elementSegments[k]))
								{
									collisions.push(element);
									continue loopFree;
								}
							}
						}
					}
				}
			}
			
			return collisions;
		};
		
		/*====================================================*/
		/*============= Methods the user can call ============*/
		/*====================================================*/

		/*== Method returning the nearest instance of the given type ==*/
		Element.prototype.instanceNearest=function(type,deltaX,deltaY,elements)
		{
			elements=elements==undefined?Game.activeElements:elements;
			
			var objet=null,
			max=-1,
			temp=0;
			
			deltaX=(deltaX==undefined)?0:deltaX;
			deltaY=(deltaY==undefined)?0:deltaY;

			for(var i=0,l=elements.length; i<l; i++)
			{
				var element=elements[i];
				if(element.instanceOf(type) && element.id!=this.id)
				{
					temp=Game.getDistanceBetweenPoints([element.x, element.y], [this.x+deltaX, this.y+deltaY]);
					if(max<0 || temp<max)
					{
						max=temp;
						objet=element;
					}
				}
			}
			return objet;
		};
		
		/*== Method setting the "active" statut of the element ==*/
		Element.prototype.setActive=function(active)
		{
			if(!active && this.active)
			{
				this.active=false;
				
				for(var i=0,l=Game.activeElements.length; i<l; i++)
				{	
					if(Game.activeElements[i].id==this.id)
					{
						Game.activeElements.splice(i,1);
						break;			
					}
				}	
			}
			else if(active && !this.active)
			{
				this.active=true;
				Game.activeElements.push(this);
			}
		};
		
		/*== Method returning the direction (in °) of the element according to its hspeed and vspeed ==*/
		Element.prototype.getDirection=function()
		{
			var angle=0;
	
			if(this.hspeed!=0 && this.vspeed!=0)
			{
				angle=180*Math.abs(Math.atan(this.vspeed/this.hspeed))/Math.PI;	
				angle=(this.hspeed<0&&this.vspeed<0)?180-angle:((this.hspeed>0&&this.vspeed>0)?360-angle:((this.hspeed<0)?180+angle:angle));
			}
			else
			{
				angle=(this.hspeed==0)?((this.vspeed>0)?270:((this.vspeed<0)?90:0)):((this.vspeed==0)?((this.hspeed<0)?180:360):0);
			}
			
			return Math.round(angle);
		};
		
		/*== Method returning the gloal speed of the element (>=0) ==*/
		Element.prototype.getSpeed=function()
		{
			return parseFloat(parseFloat(Math.sqrt(Math.pow(this.hspeed,2)+Math.pow(this.vspeed,2))).toFixed(2));
		};
		
		/*== Method modifing the hspeed and the vspeed in order to make the element moving to the given direction ==*/
		Element.prototype.moveToDirection=function(direction,speed)
		{			
			direction=360-direction;
			direction*=Math.PI/180;
			this.vspeed=speed*Math.sin(direction);
			this.hspeed=speed*Math.cos(direction);
		};
		
		/*== Method modifing the hspeed and the vspeed in order to make the element moving to the given position  ==*/
		Element.prototype.moveToPoint=function(x,y,speed,callBack)
		{
			var deltaX=x-this.x,
			deltaY=y-this.y,
			adj=Math.abs(deltaX),
			op=Math.abs(deltaY),			
			angle=0;

			if(callBack!=undefined)
			{
				this.moveToPointCallBack=
				{
					'x':x,
					'y':y,
					'fromLeft':deltaX>0,
					'fromTop':deltaY>0,
					'f':callBack
				};
			}
			
			if(deltaX!=0 && deltaY!=0)
			{
				angle=180*Math.abs(Math.atan(deltaY/deltaX))/Math.PI;	
				angle=(deltaX<0&&deltaY<0)?180-angle:((deltaX>0&&deltaY>0)?360-angle:((deltaX<0)?180+angle:angle));
			}
			else
			{
				angle=(deltaX==0)?((deltaY>0)?270:((deltaY<0)?90:0)):((deltaY==0)?((deltaX<0)?180:0):0);
			}

			this.moveToDirection(angle,speed);
		};
		
		/*== Method setting a path following by the element ==*/
		Element.prototype.setPath=function(points,speed,callBack)
		{	
			if(points[0])
			{
				var el=this;
				function a(i)
				{
					el.moveToPoint(points[i][0],points[i][1],speed,function()
					{
						//Callback for this point
                        if(points[i][2])
                        {
                            points[i][2].apply(el);
                        }
                        if(points[++i])
						{
							a(i);
						}
						else if(callBack)
						{
							if(typeof callBack=='string')
							{
								switch(callBack)
								{
									case 'repeat': a(0); break;
									case 'reverse': points.reverse(); points.push(points.shift()); a(0); break;
								}
							}
							else
							{
								callBack.apply(el);
							}						
						}
					});
				}
				a(0);
			}
		};
		
		/*== Method indicating if the element has the given type ==*/
		Element.prototype.instanceOf=function(type)
		{
			if(typeof type=='string')
			{
				type=window[type];
			}
			
			for(var i=0,l=this.types.length; i<l; i++)
			{
				if(window[this.types[i]]==type)
				{
					return true;
				}
			}
			return false;
		};
		
		/*== Method calling a parent method ==*/
		Element.prototype.callParent=function(methode,args,parent)
		{
			if(methode==undefined)
			{
				alert('Erreur <callParent> (Méthode ['+methode+'] appelée par ['+this.types+']) : méthode non définie !');
				return false;
			}
			args=(args==undefined)?[]:args;
			parent=(parent==undefined)?(this.types[1]==undefined?this.types[0]:this.types[1]):parent;
			if(typeof parent=='string')
			{
				parent=window[parent];
			}
			if(this.instanceOf(parent))
			{
				return parent.prototype[methode].apply(this,args);
			}
			else
			{
				alert('Erreur <callParent> (Méthode ['+methode+'] appelée par ['+this.types+']) : l\'élément appelant n\'est pas du type indiqué  !');
				return false;
			}
		};
		
		/*== Method setting the depth of the element ==*/
		Element.prototype.setZIndex=function(newZIndex)
		{
			if(this.zIndex!=newZIndex)
			{
				this.zIndex=newZIndex;
				Game.zIndex=true;

				if(newZIndex>Game.MAX_ZINDEX)
				{
					Game.MAX_ZINDEX=newZIndex;
				}
			}
		};
        
        /*== Method returning the coordinates of the center of the element ==*/
		Element.prototype.getCenter=function(checkWithMask)
		{
			if(checkWithMask)
            {
                var mask = this.sprite.getMask();
                
                return {
                    "x": this.x+mask.x+mask.width/2,
                    "y": this.y+mask.y+mask.height/2
                };
            }
            return {
                "x": this.x+this.sprite.width/2,
                "y": this.y+this.sprite.height/2
            };
		};

		/*== Method setting the zIndex to the highest value ==*/
		Element.prototype.toFirstPlan=function()
		{
			this.setZIndex(++Game.MAX_ZINDEX);
		};
		
		/*== Method defining a time for the given alarm ==*/
		Element.prototype.setAlarm=function(id_alarm,temps_secondes)
		{
			if(id_alarm>=1 && id_alarm<=10)
			{
				if(temps_secondes>0)
				{
					this['alarm'+id_alarm]=parseInt(temps_secondes*33,10);
				}
				else
				{
					alert('Erreur <setAlarm> (Appelé par ['+this.types+']) : le temps spécifié doit être supérieur à 0 seconde !');
				}
			}
			else
			{
				alert('Erreur <setAlarm> (Appelé par ['+this.types+']) : le numéro de l\'alarme doit être compris entre 1 et 10 inclus !');
			}
		};
		
		/*== Method adding a text to draw ==*/
		Element.prototype.drawText=function(object)
		{			
			var o = object.opacity || 100;
            
            if(o > 0)
            {
                this.draws.push(Game.mergeJSON(
                {
                    'type': 'text',
                    'x': this.x,
                    'y': this.y,
                    'color': '#000000',
                    'borderLength': 0,
                    'maxWidth': -1,
                    'borderColor': '#ffffff',
                    'font': '20px Calibri',
                    'opacity': 100,
                    'lineHeight': 20,
                    'text': ''
                },(object==undefined?{}:object)));
            }
		};
		
		/*== Method adding a rectangle to draw ==*/
		Element.prototype.drawRectangle=function(object)
		{
			var o = object.opacity || 100;
            
            if(o > 0)
            {
                this.draws.push(Game.mergeJSON(
                {
                    'type': 'rectangle',
                    'x': 0,
                    'y': 0,
                    'width': 100,
                    'height': 100,
                    'color': '#000000',
                    'borderLength': 0,
                    'borderColor': '#ffffff',
                    'opacity': 100
                },(object==undefined?{}:object)));
            }
		};
		
		/*== Method drawing the collision mask of an element ==*/
		Element.prototype.drawCollisions=function(color)
		{
			if(!this.visible)
			{
				this.visible=true;
				this.opacity=0;
			}
			var mask = this.sprite.getMask(),
				rectangle=
				{
					'width': mask.width,
					'height': mask.height
				};
				
			rectangle.x=this.x+mask.x-Game.room.view_x;
			rectangle.y=this.y+mask.y-Game.room.view_y;			
			rectangle.color=color==undefined?'red':color;
			
			this.drawRectangle(rectangle);
		};
        
        /*== Method defining a filter on the element ==*/
		Element.prototype.drawFilter=function(object)
		{
			var o = object.opacity || 100;
            
            if(o > 0)
            {
                this.draws.push(Game.mergeJSON(
                {
                    'type': 'filter',
                    'color': [255,0,0],
                    'mode': 'normal',
                    'x': this.x - Game.room.view_x,
                    'y': this.y - Game.room.view_y,
                    'sprite': this.sprite,
                    'opacity': 100
                },(object==undefined?{}:object)));
            }
		};
		
		/*== Method adding a circle to draw ==*/
		Element.prototype.drawCircle=function(object)
		{
			var o = object.opacity || 100;
            
            if(o > 0)
            {
                this.draws.push(Game.mergeJSON(
                {
                    'type': 'circle',
                    'x': 0,
                    'y': 0,
                    'radius': 16,
                    'color': '#000000',
                    'borderLength': 0,
                    'borderColor': '#ffffff',
                    'opacity': 100
                },(object==undefined?{}:object)));
            }
		};
		
		/*== Method adding a shape to draw ==*/
		Element.prototype.drawShape=function(object)
		{
			var o = object.opacity || 100;
            
            if(o > 0)
            {
                this.draws.push(Game.mergeJSON(
                {
                    'type': 'shape',
                    'points': [],
                    'color': '#000000',
                    'borderLength': 0,
                    'borderColor': '#ffffff',
                    'close': true,
                    'opacity': 100
                },(object==undefined?{}:object)));
            }
		};
		
		/*== Method adding an image to draw ==*/
		Element.prototype.drawSprite=function(object)
		{
			var o = object.opacity || 100
                json = Game.mergeJSON(
                    {
                        'type': 'image',
                        'x': 0,
                        'y': 0,
                        'rotate': 0,
                        'centerRotateX': 0,
                        'centerRotateY': 0,
                        'sprite': null,
                        'filter': null,
                        'opacity': 100
                    },(object==undefined?{}:object));
            
            if(o > 0 && object.sprite)
            {
                this.draws.push(json);
            }
            
            if(json.filter)
            {
                json.filter.sprite = json.sprite;
                json.filter.x = json.x;
                json.filter.y = json.y;
                this.drawFilter(json.filter);
            }
		};
		
		/*== Method indicating if the mouse is over the element or not ==*/
		Element.prototype.isMouseOver=function()
		{
			var mouse=Game.getMouse(false),
			thisMask=this.sprite.getMask();
			return !((this.x+thisMask.x>mouse[0]) 
			|| (this.x+thisMask.x+thisMask.width<mouse[0]) 					
			|| (this.y+thisMask.y>mouse[1]) 	
			|| (this.y+thisMask.y+thisMask.height<mouse[1]))
		};
		
		/*====================================================*/
		/*==		Methods defined by the user				==*/
		/*====================================================*/

		Element.prototype.eventCreate=function(){};				//Method called when the element is created
		Element.prototype.eventOutsideRoom=function(){};		//Method called when the element is outside the room
		Element.prototype.eventOutsideView=function(){};		//Method called when the element is outside the view
		Element.prototype.eventInsideView=function(){};			//Method called when the element is inside the room
		Element.prototype.eventRoomStart=function(){};			//Method called when the room starts
		Element.prototype.eventDestroy=function(){};			//Method called when the element is destroyed
		Element.prototype.eventStartStep=function(){};			//Method called at the beginning of each step
		Element.prototype.eventStep=function(){};				//Method called at each step
		Element.prototype.eventEndStep=function(){};			//Method called at the end of each step
		Element.prototype.eventCollisionWith=function(objet){};	//Method called when a collision occurs
		Element.prototype.eventMouseDown=function(){};			//Method called when a mouse button is pressed
		Element.prototype.eventMouseUp=function(){};			//Method called when a mouse button is released
		Element.prototype.eventClick=function(){};				//Method called when a click occurs
		Element.prototype.eventKeyDown=function(key){};			//Method called when a key is pressed
		Element.prototype.eventKeyPressed=function(key){};		//Method called when a key is continuously pressed
		Element.prototype.eventKeyUp=function(key){};			//Method called when a key is released
		Element.prototype.eventEndAnimation=function(){};		//Method called when the sprite animation is finished
		Element.prototype.eventAlarm1=function(){};				//Method called when the alarm 1 is ready
		Element.prototype.eventAlarm2=function(){};				//Method called when the alarm 2 is ready
		Element.prototype.eventAlarm3=function(){};				//Method called when the alarm 3 is ready
		Element.prototype.eventAlarm4=function(){};				//Method called when the alarm 4 is ready
		Element.prototype.eventAlarm5=function(){};				//Method called when the alarm 5 is ready
		Element.prototype.eventAlarm6=function(){};				//Method called when the alarm 6 is ready
		Element.prototype.eventAlarm7=function(){};				//Method called when the alarm 7 is ready
		Element.prototype.eventAlarm8=function(){};				//Method called when the alarm 8 is ready
		Element.prototype.eventAlarm9=function(){};				//Method called when the alarm 9 is ready
		Element.prototype.eventAlarm10=function(){};			//Method called when the alarm 10 is ready
	}
}

/*====================================================*/
/*=========== Class managing the Sprites =============*/
/*====================================================*/

function Sprite(image,width,height)
{
	this.src=image;											//Image
	this.width=(width==undefined)?this.src.width:width;		//Width
	this.height=(height==undefined)?this.src.height:height;	//Height
	this.stretchX=1;										//Horizontal stretch
	this.stretchY=1;										//Vertical stretch
	this.isTiles=false;										//Is this sprite composed of tiles?
	this.tilesSheet=[[]];									//Store the coordinates of each tile
	this.tiles=[];											//Tiles to use for the animation
	this.imagespeed=0.3;									//Animation speed
	this.imageindex=0;										//Index of the displaying tile
	this.masks={};											//Collision mask of the tiles
	
	if(Sprite.isLoaded==undefined)
	{
		Sprite.isLoaded=true;	//The class is correctly loaded
		
		/*====================================================*/
		/*================ Internal methods ==================*/
		/*====================================================*/
		
		/*== Method changing the tile to display ==*/
		Sprite.prototype.changeImage=function()
		{
			if(this.isTiles)
			{
				var old=parseInt(this.imageindex,10);
				this.imageindex+=this.imagespeed;
				
				if(this.imageindex>this.tiles.length)
				{
					this.imageindex=0;
					return true;
				}
				else if(parseInt(this.imageindex,10)>old)
				{
					this.imageindex=old+1;
				}
			}
			return false;
		};
		
		/*== Method returning the position of the current tile ==*/
		Sprite.prototype.getImage=function()
		{
			var imageindex=(this.imageindex==undefined)?0:parseInt(this.imageindex,10);
			
			if(imageindex>this.tiles.length)
			{
				imageindex=0;
			}
			var tile=this.tiles[imageindex],
			compteur=0;
			if(tile==undefined){return [0,0];}

			for(var i in this.tilesSheet)
			{
				for(var j in this.tilesSheet[i])
				{
					compteur++;
					if(compteur==tile)
					{
						return this.tilesSheet[i][j];
					}
				}
			}			
		};
		
		/*====================================================*/
		/*============= Methods the user can call ============*/
		/*====================================================*/

		/*== Method defining the sprite as set of tiles	  ==*/
		Sprite.prototype.makeTiles=function(width,height,sep)
		{
			this.isTiles=true;
			sep=(sep==undefined)?0:sep;
			
			var h=this.height,
			w=this.width;
						
			for(var j=0;j<h;j+=height)
			{
				this.tilesSheet[j/height]=[];
				for(var i=0;i<w;i+=width)
				{
					this.tilesSheet[j/height][i/width]=[(i+sep*(i/width)),(j+sep*(j/height))];
					w-=sep;
				}
				w=this.width;
				h-=sep;
			}
			
			this.width=width;
			this.height=height;
			this.tiles=[1];
		};
		
		/*==  Method returning the index of the tile	  ==*/
		Sprite.prototype.getTile=function()
		{
			var r=this.tiles[parseInt(this.imageindex,10)];
			return r==undefined?(this.tiles[0]==undefined?1:this.tiles[0]):r;
		};
		
		/*== Method defining the collision mask of a tile ==*/
		Sprite.prototype.setMask=function(numTile,conf)
		{
			this.masks[numTile]=Game.mergeJSON(
			{
				'x':0,
				'y':0,
				'width':16,
				'height': 16
			},(conf==undefined?{}:conf));
		};
		
		/*== Method returning the collision mask of a tile ==*/
		Sprite.prototype.getMask=function()
		{
			var r=this.masks[this.getTile()],
			retour=
			{
				'x':0,
				'y':0,
				'width':this.width,
				'height': this.height
			};
			return (r==undefined?retour:Game.mergeJSON(retour,r));
		};
	}
}

/*====================================================*/
/*===========    Class managing rooms   ==============*/
/*====================================================*/

function Room(width,height,background)
{
	//If the first parameter is a string, we want to load an XML file !
	this.path=null;
	if(typeof width=='string')
	{
		this.path=width;
		width=0;
		height=0;
	}
	this.xml=null;
	this.id=0;						//Id of the room
	this.width=width;				//Room width
	this.height=height;				//Room height
	this.view_x=0;					//View bscissa
	this.view_y=0;					//View ordinate
	this.view_w=width;				//View width
	this.view_h=height;				//View height
	this.viewLink=null;				//Element followed by the view
	this.viewHasMoved=false;		//Has the view been moved?
	this.background_hspeed=1;		//Horizontal speed applied on the background
	this.background_vspeed=1;		//Vertical speed applied on the background
	this.tiles=[];					//Room tiles
	this.backgroundImage=background;//Background image
	this.background=new Image();	//Background of the room
	
	if(Room.isLoaded==undefined)
	{
		Room.isLoaded=true;		//The class is correctly loaded
		
		/*====================================================*/
		/*================ Internal methods ==================*/
		/*====================================================*/

		/*== Method displaying the room ==*/
		Room.prototype.display=function()
		{
			Game.contextBuffer.globalAlpha=1;
			var x=this.view_x,
			y=this.view_y;
			
			if(this.background&&this.background.src.complete==undefined)
			{			
				this.background=Game.getImage(this.backgroundImage);
			}
				
			try
			{
				if(this.viewLink!==null || this.viewHasMoved)
				{
					if(this.viewLink!==null)
					{
						this.viewHasMoved=true;
						x=this.viewLink.x+(this.viewLink.sprite.width/2)-(this.view_w/2);
						y=this.viewLink.y+(this.viewLink.sprite.height/2)-(this.view_h/2);
						x=(x<0)?0:x;
						y=(y<0)?0:y;				
						x=(x+this.view_w>this.width)?(this.width-this.view_w):x;
						y=(y+this.view_h>this.height)?(this.height-this.view_h):y;				
						this.view_x=x;
						this.view_y=y;
					}
					else
					{
						x=this.view_x;
						y=this.view_y;
					}

					if(this.background)
					{
						x*=this.background_hspeed;
						y*=this.background_vspeed;
						
						for(var i=0; i<this.width*this.background_hspeed; i+=this.background.width)
						{
							for(var j=0; j<this.height*this.background_vspeed; j+=this.background.height)
							{
								if(i>=x-this.background.width&&i<=x+this.view_w+this.background.width&&j>=y-this.background.height&&j<=y+this.view_h+this.background.height)
								{
									Game.contextBuffer.drawImage(this.background,0,0,this.background.width,this.background.height,i-x,j-y,this.background.width,this.background.height);
								}
							}
						}
					}
                    Game.canvas.style.backgroundPosition='-'+x+'px -'+y+'px';
				}
				else if(this.background)
				{
					for(var i=0; i<this.width; i+=this.background.width)
					{
						for(var j=0; j<this.height; j+=this.background.height)
						{
							Game.contextBuffer.drawImage(this.background,0,0,this.background.width,this.background.height,i,j,this.background.width,this.background.height);
						}
					}
				}
			}
			catch(e){}
		};
		
		Room.prototype.start=function()
		{
			Game.changeRoom=true;
			Game.currentStep=0;
			if(!Game.end)
			{
				Game.elements.splice(0,Game.elements.length);
				Game.activeElements.splice(0,Game.activeElements.length);
			}

			Game.canvas.width=this.view_w;
			Game.canvas.height=this.view_h;
            Game.canvas.style.backgroundPosition='center center';
			Game.canvasBuffer.width=this.view_w;
			Game.canvasBuffer.height=this.view_h;
			this.view_x=0;
			this.view_y=0;

			//If we've loaded a level, we add its elements
			if(this.xml!==null)
			{
				var tiles=this.xml.getElementsByTagName('tiles')[0];
				
				if(tiles && this.tiles.length==0)
				{
					tiles=tiles.childNodes;

					var t='',
					elements=null,
					total=0,
					
					tile_w=0,
					tile_h=0,
					
					div=null;

					for(var i=0,length=tiles.length; i<length; i++)
					{				
						if(tiles[i].nodeName=='#text')
						{
							continue;
						}
						tile_w=parseInt(tiles[i].getAttribute('tiles_width'),10);
						tile_h=parseInt(tiles[i].getAttribute('tiles_height'),10);
						
						//We iterate through each set of tiles
						t=new Sprite(Game.getImage(tiles[i].getAttribute('src')));					
						t.makeTiles(tile_w,tile_h,parseInt(tiles[i].getAttribute('sep'),10));
						
						//Depth definition
						elements=tiles[i].getElementsByTagName('zIndex')[0];
						var zIndexes={};
						if(elements)
						{
							elements=elements.getElementsByTagName('z');
							for(var j=0,lengthElem=elements.length; j<lengthElem; j++)
							{
								zIndexes[parseInt(elements[j].getAttribute('num'),10)]=parseInt(elements[j].getAttribute('value'),10);
							}
						}
						
						//We manage each tile one by one
						elements=tiles[i].getElementsByTagName('tile');

						for(var j=0,lengthElem=elements.length; j<lengthElem; j++)
						{
							var num=parseInt(elements[j].textContent || elements[j].firstChild.nodeValue);
							t.tiles=[num];
							var position=t.getImage();
							
							this.tiles.push(
							{
								'image': t.src,
								'posXImage': parseInt(position[0],10),
								'posYImage': parseInt(position[1],10),
								'w': tile_w,
								'h': tile_h,
								'x': elements[j].getAttribute('x'),
								'y': elements[j].getAttribute('y'),
								'zIndex': zIndexes[num]||0
							});
						}
					}
				}
				
				//We create the elements
				elements=this.xml.getElementsByTagName('element');
				t=null;
				
				for(var i=0,length=elements.length; i<length; i++)
				{
					t=elements[i].textContent || elements[i].firstChild.nodeValue;
					Game.instanceCreate(elements[i].getAttribute('x'),elements[i].getAttribute('y'),t);
				}
			}

			this.eventStart();
			
			for(var i=0,l=Game.activeElements.length; i<l; i++)
			{
				Game.activeElements[i].eventRoomStart();
			}

            if(Game.isFullscreen)
            {
                Game.backgroundResizeHandler();
            }
		};

		/*====================================================*/
		/*============= Methods the user can call ============*/
		/*====================================================*/

		/*== Method setting a view for the room ==*/
		Room.prototype.setView=function(width,height,x,y)
		{
			this.view_w=width;
			this.view_h=height;
			this.view_x=(x==undefined)?this.view_x:x;
			this.view_y=(y==undefined)?this.view_y:y;
			
			if(Game.canvas)
			{
				Game.canvas.width=this.view_w;
				Game.canvas.height=this.view_h;
				Game.canvasBuffer.width=this.view_w;
				Game.canvasBuffer.height=this.view_h;
				document.getElementById('infoGameBuilder').style.width=this.view_w+'px';
			}
		};
		
		/*====================================================*/
		/*==		Methods defined by the user				==*/
		/*====================================================*/

		Room.prototype.eventStart=function(){};		//Method called after the room initialization
		Room.prototype.eventEnd=function(){};		//Method called juste before changing room
	}
}