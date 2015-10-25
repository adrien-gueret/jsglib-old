Game.addClass({
	'name': 'ShieldItem',
	'parent': 'Items',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Items);		
		this.sprite=ShieldItem.getSprite();
	},
	'action': function()
	{
		Game.data.hasDekuShield=true;
		if(!Game.soundIsPlaying('chest'))
		{
			Game.playSound('chest',false);
		}
	}
});

ShieldItem.getSprite=function()
{
	return Sprite.spriteDekuShield;
};
ShieldItem.message=Game.getTranslation('get_deku_shield');
ShieldItem.itemName=Game.getTranslation('name_deku_shield');
ShieldItem.condition=function()
{
	return !Game.data.hasDekuShield?true:Game.getTranslation('deku_shield_already_own');
};

Game.addClass({
	'name': 'HylianShield',
	'parent': 'ShieldItem'
});

HylianShield.getSprite=function()
{
	return Sprite.spriteHylianShield;
};
HylianShield.message=Game.getTranslation('get_hylian_shield');
HylianShield.itemName=Game.getTranslation('name_hylian_shield');

Game.addClass({
	'name': 'MirrorShield',
	'parent': 'ShieldItem'
});

MirrorShield.getSprite=function()
{
	return Sprite.spriteMirrorShield;
};
MirrorShield.message=Game.getTranslation('get_mirror_shield');
MirrorShield.itemName=Game.getTranslation('name_mirror_shield');