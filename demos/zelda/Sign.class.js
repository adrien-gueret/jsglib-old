Game.addClass({
	'name': 'Sign',
	'parent': 'Solid',
	'eventCreate': function()
	{
		var tiles=[3];
		this.callParent('eventCreate',tiles,Solid);
		this.message=this.x+','+this.y;
		
		if(Game.room.name=='kokiri')
		{
			if(this.x==768 && this.y==768)
			{
				this.message=Game.getTranslation('link_house', {
                    '=USERNAME=': Game.getUsername()
                });
			}
			else if(this.x==928 && this.y==768)
			{
				this.message=Game.getTranslation('saria_house');
			}
			else if(this.x==1056 && this.y==608)
			{
				this.message=Game.getTranslation('twins_house');
			}
			else if(this.x==1152 && this.y==352)
			{
				this.message=Game.getTranslation('go_to_mojo');
			}
			else if(this.x==896 && this.y==96)
			{
				this.message=Game.getTranslation('kokiri_shop');
			}
			else if(this.x==192 && this.y==128)
			{
				this.message=Game.getTranslation('lost_woods');
			}
			else if(this.x==384 && this.y==256)
			{
				this.message=Game.getTranslation('mido_house');
			}
			else if(this.x==64 && this.y==352)
			{
				this.message=Game.getTranslation('leaving_forest');
			}
			else if(this.x==128 && this.y==608)
			{
				this.message=Game.getTranslation('geeks_house');
			}
			else if(this.x==480 && this.y==640)
			{
				this.message=Game.getTranslation('useless_advice');
			}
			else if(this.x==480 && this.y==736)
			{
				this.message=Game.getTranslation('roll_advice');
			}
			else if(this.x==480 && this.y==832)
			{
				this.message=Game.getTranslation('joke_sign');
			}
			else if(this.x==448 && this.y==1312)
			{
				this.message=Game.getTranslation('geeks_pub');
			}
			else if(this.x==720 && this.y==192)
			{
				this.message=Game.getTranslation('jump_sign');
			}
		}
	}
});