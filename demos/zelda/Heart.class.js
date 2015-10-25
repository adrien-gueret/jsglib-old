Game.addClass({
	'name': 'Heart',
	'parent': 'Items',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Items);		
		this.sprite=Heart.getSprite();
	},
	'action': function()
	{
		Game.restoreLife(4);
		Game.playSound('small_heart');
	}
});

Heart.getSprite=function()
{
	return Sprite.spriteHeart;
};
Heart.message=Game.getTranslation('get_small_heart');
Heart.itemName=Game.getTranslation('name_small_heart');
Heart.condition=function()
{
	return Game.data.life<Game.data.max_life?true:Game.getTranslation('life_full');
};