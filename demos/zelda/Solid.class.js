Game.addClass({
	'name': 'Solid',
	'parent': 'Overlay',
	'eventCreate': function(tiles)
	{
		this.callParent('eventCreate',[],'Overlay');
		this.sprite=new Sprite(Game.getImage('items'));
		this.sprite.makeTiles(32,32,2);
		
		var mask=
			{
				'x': 2,
				'y': 8,
				'width': 28,
				'height': 12
			};
		
		if(tiles!=undefined)
		{
			if(typeof tiles!='object')
			{
				tiles=[tiles];
			}
			
			this.sprite.tiles=tiles;
			this.visible=true;
				
			for(var i=0,l=tiles.length; i<l; i++)
			{
				this.sprite.setMask(tiles[i],mask);
			}
		}
		else
		{
			mask.y=0;
			mask.height=20;
			this.visible=false;
			this.sprite.setMask(1,mask);
		}
	}
});