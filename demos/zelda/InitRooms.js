window.initRooms = function()
{	
	var rooms=[]
		r=null;
	
	//TITLE SCREEN
		r=new Room(1920,960,'back_title');
		r.eventStart=function()
		{
			Game.stopSounds();
            Game.playSound('main_menu',true);
			this.setView(640,480);
			Game.canvas.style.backgroundColor='#000';
			Game.instanceCreate(this.view_w/2-100,400,Title);
			Game.instanceCreate(this.view_w+this.view_w/2-100,20,FormMainChoice);
			Game.instanceCreate(this.view_w+this.view_w/2-100,this.view_h+20,FormNewGame);
			Game.instanceCreate(this.view_w/2-100,this.view_h+20,FormUser);
			Game.instanceCreate(this.view_w*2+this.view_w/2-100,20,FormLoad);
			Game.instanceCreate(this.view_w*2+this.view_w/2-100,20+this.view_h,FormControls);
		};
		r.name='title';
		rooms.push(r);
	
	//FORET KOKIRI
		r=new Room('./levels/kokiri.xml');
		r.secretRupee=false;
		r.eventStart=function()
		{
			Game.stopSounds();
			Game.canvas.style.backgroundColor='#c0e840';
			Game.canvas.style.backgroundPosition='center';
			Game.canvas.style.backgroundRepeat='repeat';
			Game.canvas.style.backgroundImage='url("./images/backgrounds/kokiri_forest.png")';
 
            if(Game.data.firstLaunch)
            {
                Game.cinematic=true;
                var navi = Game.Link.navi;
                navi.toLink=false;
                navi.visible=false;
                
                Game.xprev=Game.Link.x-32;
                Game.yprev=Game.Link.y-32;
                Game.instanceDestroy(Game.Link);
                
                Game.room.viewLink=navi;
                navi.x=1580;
                navi.y=200;
                
                var m=Game.instanceCreate(0,0,Message),
                    messageX=Game.room.view_w*2.5-m.sprite.width/2;
                m.setMessage(Game.getTranslation('deku_tree_first_message'));
                m.x = messageX;
                m.y = 320;
                m.onClose = function()
                {
                    Game.playSound('intro_deku',true);
                    navi.visible=true;
                    (function fadeOut()
                    {
                        BackgroundAmbiance.launchGameOpacity -= 2;
                        if(BackgroundAmbiance.launchGameOpacity>0)
                        {
                            if(BackgroundAmbiance.launchGameOpacity == 50)
                            {
                                var m=Game.instanceCreate(0,0,Message);
                                m.setMessage(Game.getTranslation('deku_tree_second_message'));
                                    
                                m.x = messageX;
                                m.y = 320;
                                
                                m.onClose = function()
                                {
                                    Game.stopSounds();
                                    Game.playSound('intro_navi');
                                    navi.setPath([
                                        [1626, 223],
                                        [1713, 211],
                                        [1798, 316],
                                        [1761, 433],
                                        [1574, 368],
                                        [1486, 423],
                                        [1334, 405],
                                        [1257, 373],
                                        [1114, 414],
                                        [1044, 306],                   
                                        [1079, 144],
                                        [1045, 127],
                                        [847, 174],
                                        [730, 123],
                                        [560, 270],
                                        [590, 340],
                                        [510, 460],
                                        [455, 575],
                                        [570, 680],
                                        [740, 760]
                                    ],5.5, function()
                                    {
                                        Game.room.viewLink=null;
                                        Game.goToNextRoom();
                                    });
                                };
                            }
                            setTimeout(fadeOut,33);
                        }
                        else
                        {
                            BackgroundAmbiance.launchGameOpacity=0;
                        }
                    })();
                };                 
            }
            else
            {
                Game.playSound('kokiri',true);
            }
		};
		r.name='kokiri';
		rooms.push(r);
	
	//MAISON DE LINK
		r=new Room('./levels/link_house.xml')
		r.eventStart=function()
		{
			Game.stopSounds();
			Game.playSound('house',true);
			Game.canvas.style.backgroundColor='#080828';
			Game.canvas.style.backgroundRepeat='no-repeat';
			Game.canvas.style.backgroundImage='url("./images/backgrounds/kokiri_houses.png")';
            
            if(Game.data.firstLaunch)
            {
                Game.Link.x=396;
                Game.Link.y=165;
                Game.Link.sprite.height=29;
                Game.Link.isSleeping=true;
                
                setTimeout(function()
                {
                    var m=Game.instanceCreate(0,0,Message);
                    m.setMessage(Game.getTranslation('navi_first_message',{'=USERNAME=':Game.getUsername()}));
                        
                    m.x = Game.room.width/2-m.sprite.width/2;
                    m.y = 320;
                    m.onClose = function()
                    {
                        Game.Link.isSleeping=false;
                        Game.playSound('link_yawn');
                        m=Game.instanceCreate(0,0,Message);
                        m.setMessage(Game.getTranslation('navi_second_message'));
                            
                        m.x = Game.room.width/2-m.sprite.width/2;
                        m.y = 320;
                        m.onClose = function()
                        {
                            Game.data.firstLaunch=false;
                            Game.cinematic=false;
                            
                            Game.Link.sprite.height=48;
                            //Jump outside bed
                            Game.playSound('jump');
                            Game.Link.collideSolid=false;
                            Game.instanceCreate(0,0,SolidJumpLeft).nextPosition(Game.Link);
                            Game.Link.vspeed=-4;
                            Game.Link.gravity=0.6;
                        };
                    };
                }, 2500);
            }
		};
		r.name='link_house';
		r.isHouse=true;
		rooms.push(r);
		
	//MAISON DE SARIA
		r=new Room('./levels/saria_house.xml')
		r.eventStart=function()
		{
			Game.stopSounds();
			Game.playSound('house',true);
			Game.canvas.style.backgroundColor='#080828';
			Game.canvas.style.backgroundRepeat='no-repeat';
			Game.canvas.style.backgroundImage='url("./images/backgrounds/kokiri_houses.png")';
		};
		r.name='saria_house';
		r.isHouse=true;
		rooms.push(r);
		
	//MAISON DES JUMELLES
		r=new Room('./levels/twins_house.xml')
		r.eventStart=function()
		{
			Game.stopSounds();
			Game.playSound('house',true);
			Game.canvas.style.backgroundColor='#080828';
			Game.canvas.style.backgroundRepeat='no-repeat';
			Game.canvas.style.backgroundImage='url("./images/backgrounds/kokiri_houses.png")';
		};
		r.name='twins_house';
		r.isHouse=true;
		rooms.push(r);
		
	//MAISON DE MIDO
		r=new Room('./levels/mido_house.xml')
		r.eventStart=function()
		{
			Game.stopSounds();
			Game.playSound('house',true);
			Game.canvas.style.backgroundColor='#080828';
			Game.canvas.style.backgroundRepeat='no-repeat';
			Game.canvas.style.backgroundImage='url("./images/backgrounds/kokiri_houses.png")';
		};
		r.name='mido_house';
		r.isHouse=true;
		rooms.push(r);
		
	//MAISON DES JE-SAIS-TOUT
		r=new Room('./levels/geeks_house.xml')
		r.eventStart=function()
		{
			Game.stopSounds();
			Game.playSound('house',true);
			Game.canvas.style.backgroundColor='#080828';
			Game.canvas.style.backgroundRepeat='no-repeat';
			Game.canvas.style.backgroundImage='url("./images/backgrounds/kokiri_houses.png")';
		};
		r.name='geeks_house';
		r.isHouse=true;
		rooms.push(r);
		
	//KOKIRI SHOP
		r=new Room('./levels/kokiri_shop.xml')
		r.eventStart=function()
		{
			Game.stopSounds();
			Game.playSound('shop',true);
			Game.canvas.style.backgroundColor='#080828';
			Game.canvas.style.backgroundRepeat='no-repeat';
			Game.canvas.style.backgroundImage='url("./images/backgrounds/kokiri_houses.png")';
		};
		r.name='kokiri_shop';
		r.isHouse=true;
		rooms.push(r);

	Game.setRooms(rooms);
};

Game.goTo=function(name)
{
	var r=null;
	for(var i=0, l=Game.rooms.length; i<l; i++)
	{
		if(Game.rooms[i].name==name)
		{
			r=Game.rooms[i];
			break;
		}
	}
	if(r)
	{
		if(r.name=='kokiri' && Game.room.name!='link_house' && Game.room.name!='saria_house' && Game.room.name!='twins_house' && Game.room.name!='mido_house' && Game.room.name!='geeks_house' && Game.room.name!='kokiri_shop')
		{
			r.secretRupee=false;
		}
		Game.goToRoom(r);
	}
};