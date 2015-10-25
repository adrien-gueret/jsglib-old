Game.addClass({
	'name': 'ArrowsItem',
	'parent': 'Items',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Items);		
		this.sprite=ArrowsItem.getSprite();
		this.value=5;
	},
	'action': function()
	{
		Game.earnArrows(this.value);
		if(!Game.soundIsPlaying('small_chest'))
		{
			Game.playSound('small_chest',false);
		}
	}
});

ArrowsItem.getSprite=function()
{
	return Sprite.spriteArrows;
};

ArrowsItem.message=Game.getTranslation('get_arrows');
ArrowsItem.itemName=Game.getTranslation('name_arrows');
ArrowsItem.condition=function()
{
	var ok=Game.data.hasBow?true:Game.getTranslation('need_bow');
	if(ok===true)
	{
		return Game.arrows<Game.data.max_arrows?true:Game.getTranslation('arrows_full');
	}
	return ok;
};