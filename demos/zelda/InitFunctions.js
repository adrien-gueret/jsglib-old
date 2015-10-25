Game.earnRupees=function(value)
{
	Game.data.rupees+=value;
	Game.data.rupees=Math.min(Game.data.rupees,Game.data.max_rupees);
};

Game.earnDekuSticks=function(value)
{
	Game.data.hasDekuStick=true;
	Game.data.deku_sticks+=value;
	Game.data.deku_sticks=Math.min(Game.data.deku_sticks,Game.data.max_deku_sticks);
};

Game.earnDekuNuts=function(value)
{
	Game.data.hasDekuNut=true;
	Game.data.deku_nuts+=value;
	Game.data.deku_nuts=Math.min(Game.data.deku_nuts,Game.data.max_deku_nuts);
};

Game.earnDekuSeeds=function(value)
{
	Game.data.deku_seeds+=value;
	Game.data.deku_seeds=Math.min(Game.data.deku_seeds,Game.data.max_deku_seeds);
};

Game.earnArrows=function(value)
{
	Game.data.arrows+=value;
	Game.data.arrows=Math.min(Game.data.arrows,Game.data.max_arrows);
};

Game.restoreLife=function(value)
{
	Game.data.life+=value;
	Game.data.life=Math.min(Game.data.life,Game.data.max_life)-Game.data.max_life%4;
};

Game.createItem=function(x,y)
{
	var item=null,
			delta=0,
			r=Game.random(1,100);
			
	if(r>30)
	{
		if(r<=45)
		{
			if(Game.data.life<Game.data.max_life && Game.random(1,3)<3)
			{
				item=Heart;
			}
		}
		else if(r<=70)
		{
			item=GreenRupee;
			delta=9;
		}
		else if(r<=80)
		{
			item=BlueRupee;
			delta=9;
		}
	}
	
	if(item)
	{
		Game.instanceCreate(x+delta,y,item);
	}
};

Game.getStatsText=function(x,y,stat)
{
	var i=Game.data[stat],
		m=Game.data['max_'+stat];
	return {
		'x': x,
		'y': y,
		'color': i>m/2?'#7bef82':(i>m/4?'#eece7b':'#ff2828'),
		'borderColor': '#000000',
		'borderLength': 2,
		'font': '12px Calibri',
		'text': i
	}
};

Game.getEquipedSword=function()
{
	if(Game.data.swordIsEquiped)
	{
		return Sword;
	}
	if(Game.data.masterSwordIsEquiped)
	{
		return MasterSword;
	}
	if(Game.data.giantSwordIsEquiped)
	{
		return GiantSword;
	}
	return null;
};

Game.getEquipedShield=function()
{
	if(Game.data.dekuShieldIsEquiped)
	{
		return ShieldItem;
	}
	if(Game.data.hylianShieldIsEquiped)
	{
		return HylianShield;
	}
	if(Game.data.mirrorShieldIsEquiped)
	{
		return MirrorShield;
	}
	return null;
};

Game.initSprites=function()
{
	Sprite.spriteHeart=Items.newSprite(6);		
	Sprite.spriteKokiriSword=Items.newSprite(7);		
	Sprite.spriteMasterSword=Items.newSprite(8);		
	Sprite.spriteGiantSword=Items.newSprite(9);		
	Sprite.spriteDekuShield=Items.newSprite(13);
	Sprite.spriteHylianShield=Items.newSprite(14);
	Sprite.spriteMirrorShield=Items.newSprite(15);
	Sprite.spriteGreenTunic=Items.newSprite(16);		
	Sprite.spriteRedTunic=Items.newSprite(17);		
	Sprite.spriteBlueTunic=Items.newSprite(18);		
	Sprite.spriteBasicBoots=Items.newSprite(19);
	Sprite.spriteIronBoots=Items.newSprite(20);
	Sprite.spriteHoverBoots=Items.newSprite(21);	
	Sprite.spriteDekuStick=Items.newSprite(22);	
	Sprite.spriteDekuNut=Items.newSprite(23);
	Sprite.spriteDekuSeeds=Items.newSprite(24);
	Sprite.spriteArrows=Items.newSprite(25);
	Sprite.spriteSlingshot=Items.newSprite(26);
};