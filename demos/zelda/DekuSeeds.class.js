Game.addClass({
	'name': 'DekuSeeds',
	'parent': 'Items',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Items);		
		this.sprite=DekuSeeds.getSprite();
		this.value=5;
	},
	'action': function()
	{
		Game.earnDekuSeeds(this.value);
		if(!Game.soundIsPlaying('small_chest'))
		{
			Game.playSound('small_chest',false);
		}
	}
});

DekuSeeds.getSprite=function()
{
	return Sprite.spriteDekuSeeds;
};

DekuSeeds.message=Game.getTranslation('get_deku_seeds');
DekuSeeds.itemName=Game.getTranslation('name_deku_seeds');
DekuSeeds.condition=function()
{
	var ok=Game.data.hasSlingshot?true:Game.getTranslation('need_slingshot');
	if(ok===true)
	{
		return Game.deku_seeds<Game.data.max_deku_seeds?true:Game.getTranslation('deku_seeds_full');
	}
	return ok;
};