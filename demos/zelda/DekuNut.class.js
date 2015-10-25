Game.addClass({
	'name': 'DekuNut',
	'parent': 'Items',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Items);		
		this.sprite=DekuNut.getSprite();
		this.value=5;
	},
	'action': function()
	{
		Game.earnDekuNuts(this.value);
		if(!Game.soundIsPlaying('small_chest'))
		{
			Game.playSound('small_chest',false);
		}
	}
});

DekuNut.getSprite=function()
{
	return Sprite.spriteDekuNut;
};

DekuNut.message=Game.getTranslation('get_deku_nut');
DekuNut.itemName=Game.getTranslation('name_deku_nut');
DekuNut.stats='deku_nuts';
DekuNut.condition=function()
{
	return Game.data.deku_nuts<Game.data.max_deku_nuts?true:Game.getTranslation('deku_nuts_full');
};
DekuNut.use=function()
{
	if(Game.data.deku_nuts>0)
	{
		Game.data.deku_nuts--;
		InfosBar.flashOpacity=100;
		Game.playSound('deku_nut');
        var monsters = Game.getInstancesByType(Ennemy);
        for(var i=0, l=monsters.length; i<l; i++)
        {
            if(monsters[i].canBeBlocked && !monsters[i].instanceOf(Bullets))
            {
                monsters[i].paralyse();
            }
        }
	}
};