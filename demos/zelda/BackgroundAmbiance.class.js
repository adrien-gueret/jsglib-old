Game.addClass({
	'name': 'BackgroundAmbiance',
	'eventCreate': function()
	{
		this.setZIndex(9999999999998);
		this.checkForCollisions=false;
		this.collideSolid=false;
		this.sparkles=null;
		
		if(Game.room.name=='kokiri')
		{
			this.sparkles=[];
			
			function initSpeed()
			{
				var x=0; while(x==0){x=Game.random(-2,2);} return x;
			}
			
			for(var i=0; i<40; i++)
			{
				this.sparkles.push(
				{
					'x': Game.random(0,Game.room.view_w),
					'y': Game.random(0,Game.room.view_h),
					'hspeed':  initSpeed(),
					'vspeed': initSpeed(),
					'opacity': Game.random(50,100),
					'appear': Game.random(1,2)==2,
					'size': Game.random(1,4)
				});
			}
		}
	},
	'eventStep': function()
	{
		if(this.sparkles)
		{
			for(var i=0, l=this.sparkles.length; i<l; i++)
			{
				var s=this.sparkles[i];
				this.drawRectangle(
				{
					'x': s.x,
					'y': s.y,
					'width': s.size,
					'height': s.size,
					'color': '#fff',
					'opacity': s.opacity
				});
				s.x+=s.hspeed;
				s.y+=s.vspeed;
				
				if(s.x<0)
				{
					s.x=Game.room.view_w;
				}
				else if(s.x>Game.room.view_w)
				{
					s.x=0;
				}
				if(s.y<0)
				{
					s.y=Game.room.view_h;
				}
				else if(s.y>Game.room.view_h)
				{
					s.y=0;
				}
				
				if(s.appear && ++s.opacity>=100)
				{
					s.appear=false;
					s.opacity=100;
				}
				else if(!s.appear && --s.opacity<=50)
				{
					s.appear=true;
					s.opacity=50;
				}
			}
		}
		// for(var i=0; i<400; i++)
		// {
			// this.drawRectangle(
			// {
				// 'x': Game.random(0,Game.room.view_w),
				// 'y': Game.random(0,Game.room.view_h),
				// 'width': 1,
				// 'height': 1,
				// 'color': '#fff'
			// });
		// }
        
        if(Game.data.firstLaunch && BackgroundAmbiance.launchGameOpacity>0)
        {
            this.drawRectangle(
			{
				'x': 0,
				'y': 0,
				'width': Game.room.view_w,
				'height': Game.room.view_h,
				'opacity': BackgroundAmbiance.launchGameOpacity
			});
        }
	}
});
BackgroundAmbiance.launchGameOpacity=100;