Game.addClass({
	'name': 'Message',
	'parent': 'FreezeGame',
	'eventCreate': function()
	{
		this.sprite=new Sprite(Game.getImage('message'));
		this.spriteArrow=new Sprite(Game.getImage('dialog_arrow'));
		this.spriteArrow.makeTiles(14,14);
		this.messageIndex=0;
		this.multiPages=false;
		this.showArrow=false;
		this.askConfirm=false;
		this.confirmYesMessage='OK';
		this.confirmNoMessage='...';
		this.confirmYesX=32;
		this.confirmNoX=0;
		this.confirmValue=true;
		this.confirmActionYes=null;
		this.confirmActionNo=null;
		this.fromShop=false;
		this.x=Game.room.view_x+Game.room.view_w/2-this.sprite.width/2;
		this.y=Game.room.view_y+Game.room.view_h/2-this.sprite.height/2;
        this.onClose = function(){};
		
		if(Game.Link.state==Element.STATE_HAPPY && Game.Link.y+Game.Link.sprite.height>=this.y && Game.Link.y<=this.y+this.sprite.height)
		{
			this.y=Game.room.view_y+32;
		}
		
		this.callParent('eventCreate',[],FreezeGame);
		
		this.message='';
		if(!Game.cinematic && Game.Link.state!=Element.STATE_HAPPY)
		{
			Game.playSound('text_open');
		}
	},
	'eventKeyDown': function(key)
	{
		if(this.askConfirm)
		{
			switch(key)
			{
				case Game.data.controls.LEFT: case Game.data.controls.RIGHT: this.confirmValue=!this.confirmValue; break;
				case Game.data.controls.ACTION:
					this.confirmValue?this.confirmActionYes():this.confirmActionNo();
				return false;
				default: return false;
			}
			Game.playSound('pause_cursor');
		}
		else if(!this.fromShop && key==Game.data.controls.ACTION)
		{
			if(!this.multiPages || ++this.messageIndex==this.message.length)
			{
				(function(t)
				{
					setTimeout(function(){if(t){Game.instanceDestroy(t);}},50);
				})(this);
			}
			else
			{
				Game.playSound('text_next');
			}
			return false;
		}
	},
	'eventDestroy': function()
	{
		if(Game.instanceNumber(Message)==1)
		{
			if(!Game.cinematic)
            {
                Game.playSound('text_close');
            }
			this.callParent('eventDestroy',[],FreezeGame);
            this.onClose();
		}
	},
	'eventStep': function(step)
	{
		this.drawText(
		{
			'x': this.x+16-Game.room.view_x,
			'y': this.y+16-Game.room.view_y,
			'color': '#e3e3e3',
			'maxWidth': 414,
			'text': this.multiPages?this.message[this.messageIndex]:this.message
		});
		
		if(step%20==0)
		{
			this.showArrow=false;
		}
		else if(step%10==0)
		{
			this.showArrow=true;
		}
		
		if(this.askConfirm)
		{
			var y=this.y+this.sprite.height-32-Game.room.view_y,
				textYes=
				{
					'x': this.x+this.confirmYesX+32-Game.room.view_x,
					'y': y,
					'color': '#e3e3e3',
					'text': this.confirmYesMessage
				},
				textNo=
				{
					'x': this.x+this.confirmNoX+32-Game.room.view_x,
					'y': y,
					'color': '#e3e3e3',
					'text': this.confirmNoMessage
				};
			this.drawText(textYes);
			this.drawText(textNo);
			
			this.drawSprite(
			{
				'x': this.x+(this.confirmValue?this.confirmYesX:this.confirmNoX)+16-Game.room.view_x,
				'y': y+2,
				'sprite': this.spriteArrow
			});
		}
		else if(this.multiPages && this.messageIndex+1<this.message.length && this.showArrow)
		{
			this.drawSprite(
			{
				'x': this.x-26+this.sprite.width-Game.room.view_x,
				'y': this.y-24+this.sprite.height-Game.room.view_y,
				'sprite': this.spriteArrow
			});
		}
	},
	'setMessage': function(message)
	{
		message={
			'x': this.x+16-Game.room.view_x,
			'y': this.y+16-Game.room.view_y,
			'color': '#e3e3e3',
			'maxWidth': 414,
			'text': message
		};
		
		var lines=Game.getLinesOfText(message),
			l=lines.length;
		
		if(l>3)
		{
			this.multiPages=true;
			this.showArrow=true;
			this.spriteArrow.tiles=[1];
			var newMessage=[],
				index=-1;
			
			for(var i=0; i<l; i++)
			{
				if(i%3==0)
				{
					index++;
					newMessage[index]='';
				}
				newMessage[index]+=lines[i]+'\n';
			}
			this.message=newMessage;
		}
		else
		{
			this.message=lines.join('\n');
		}
	},
	'setConfirmTexts': function(texts)
	{
		this.confirmYesMessage=texts[0];
		this.confirmNoMessage=texts[1];
		this.confirmNoX=Game.widthOfText({'text': this.confirmYesMessage})+this.confirmYesX+32;
		this.spriteArrow.tiles=[2];
	},
	'setConfirmActions': function(actions)
	{
		this.confirmActionYes=actions[0];
		this.confirmActionNo=actions[1];
	}
});