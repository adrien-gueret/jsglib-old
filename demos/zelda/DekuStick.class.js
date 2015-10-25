Game.addClass({
	'name': 'DekuStick',
	'parent': 'Items',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Items);		
		this.sprite=DekuStick.getSprite();
		this.value=1;
	},
	'action': function()
	{
		Game.earnDekuSticks(this.value);
		if(!Game.soundIsPlaying('small_chest'))
		{
			Game.playSound('small_chest',false);
		}
	}
});

DekuStick.getSprite=function()
{
	return Sprite.spriteDekuStick;
};
DekuStick.message=Game.getTranslation('get_deku_stick');
DekuStick.itemName=Game.getTranslation('name_deku_stick');
DekuStick.stats='deku_sticks';
DekuStick.condition=function()
{
	return Game.data.deku_sticks<Game.data.max_deku_sticks?true:Game.getTranslation('deku_sticks_full');
};
DekuStick.use=function()
{
	if(Game.data.deku_sticks>0)
	{
		Game.data.deku_sticks--;
        Game.Link.createSword(DekuStickSword);
	}
};