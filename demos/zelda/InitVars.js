//Init
Game.data=
{
	'userid': false,
	'username': false,
	'userpassword': false,
    'firstLaunch': true,
    'deku_tree_open': false,
	'life': 12,
	'max_life': 12,
	'hasSword': false,
	'hasMasterSword': false,
	'hasGiantSword': false,
	'hasDekuShield': false,
	'hasHylianShield': false,
	'hasMirrorShield': false,
	'hasRedTunic': false,
	'hasBlueTunic': false,
	'hasIronBoots': false,
	'hasHoverBoots': false,
	'swordIsEquiped': false,
	'masterSwordIsEquiped': false,
	'giantSwordIsEquiped': false,
	'dekuShieldIsEquiped': false,
	'hylianShieldIsEquiped': false,
	'mirrorShieldIsEquiped': false,
	'greenTunicIsEquiped': true, 
	'redTunicIsEquiped': false,
	'blueTunicIsEquiped': false,
	'bootsAreEquiped': true,
	'ironBootsAreEquiped': false,
	'hoverBootsAreEquiped': false,
	'equipedObject1': null,
	'equipedObject2': null,
	'equipedObject3': null,
	'rupees': 0,
	'max_rupees': 99,
	'hasSlingshot': false,
	'deku_seeds': 0,
	'max_deku_seeds': 30,
	'hasDekuStick': false,
	'deku_sticks': 20,
	'max_deku_sticks': 20,
	'hasDekuNut': false,
	'deku_nuts': 0,
	'max_deku_nuts': 20,
	'hasBow': false,
	'arrows': 0,
	'max_arrows': 30,
	'pause_menu_default_screen': 1,
	'pause_menu_default_cursor_position': 1,
	'controls':
	{
		'LEFT': Game.KEY_LEFT,
		'UP': Game.KEY_UP,
		'RIGHT': Game.KEY_RIGHT,
		'DOWN': Game.KEY_DOWN,
		'ACTION': Game.userLang=='fr'?Game.KEY_W:Game.KEY_Z,
		'SWORD': Game.userLang=='fr'?Game.KEY_Q:Game.KEY_A,
		'SHIELD': Game.KEY_S,
		'OBJECT1': Game.KEY_X,
		'OBJECT2': Game.KEY_C,
		'OBJECT3': Game.KEY_D
	},
	'chests':
	{
		'kokiri':
		{
			'x_384_y_1280':
			{
				'open': false,
				'contain': 'Sword'
			}
		},
		'mido_house':
		{
			'x_240_y_144':
			{
				'open': false,
				'contain': 'BlueRupee'
			},
			'x_240_y_240':
			{
				'open': false,
				'contain': 'BlueRupee'
			},
			'x_368_y_144':
			{
				'open': false,
				'contain': 'Heart'
			},
			'x_368_y_240':
			{
				'open': false,
				'contain': 'GreenRupee'
			}
		}
	}
}
Game.message=false;
Game.cinematic=false;
Game.isConnected=function()
{
	return Game.data.userid!==false && Game.data.username!==false && Game.data.userpassword!==false;
};

Game.getUsername=function()
{
    return Game.data.username || 'Link';
}

Game.saveGame=function(successCbk, errorCbk)
{
	var d=JSON.parse(JSON.stringify(Game.data));
													
	delete d.username;
	delete d.userid;
	delete d.userpassword;
	
	Game.ajax(
	{
		'url': './server/save.php',
		'data': 
		{
			'userid': Game.data.userid,
			'username': Game.data.username,
			'userpassword': Game.data.userpassword,
			'lang': Game.userLang,
			'data': JSON.stringify(d)
		},
		'dataType': 'JSON',
		'method': 'POST',
		'async': false,
		'onSuccess': successCbk || function(){},
		'onError': errorCbk || function(){}
	});
};

Game.initCinematic=function()
{
    Game.stopSounds();
    Game.cinematic=true;
    Game.Link.isDefending=false;
    Game.Link.speed=4;
    Game.Link.navi.hey=false;
    var objects = Game.getInstancesByType(FollowLinkObjects).concat(Game.getInstancesByType(Holdable));
    for(var i=0, l=objects.length; i<l; i++)
    {
        objects[i].x=-1000;
        objects[i].y=-1000;
        Game.instanceDestroy(objects[i]);
    }
};