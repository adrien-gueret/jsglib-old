/*!
 * Form and Inputs classes for JSGlib, JavaScript Library
 * http://jsglib.no-ip.org/
 *
 * Copyright 2012, Adrien Guéret
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * Date: 12/08/2012
 *
 */
 
 /*! 
 * === [Form class] ===
 * Permit to create forms for the game
 *
 * == Properties ==
 *   -> inputs					:	Array of Inputs elements in the form
 *
 * == Methods ==
 *   -> getData()					: Retrieve data of the form
 *		=Return=
 *			JSON
 *   -> remove()					: Delete the form and its inputs
 *   -> createInput(options)		: Create a new Input in this form
 *		=Params=
 *			options= {
 *					'x': 0,					//Abscissa of the new Input
 *					'y': 0,					//Oridnate of the new Input
 *					'font': '20px Calibri',	//Font style of the text
 *					'width': 200,			//Width of the new Input
 *					'height': 30,			//Height of the new Input
 *					'type': InputText		//Class of the new Input (see below)
 *				}
 *		=Return=
 *			HTML Element : the created input
 *
 * == Events used ==
 *   -> eventCreate
 *   -> eventKeyDown
 *
 * == Events provided ==
 *   -> eventSubmit	:	Call when the form is submitted
 */
 Game.addClass({
	'name': 'Form',
	'eventCreate': function()
	{
		this.inputs=[];
		this.collideSolid=false;
		this.checkForCollisions=false;
	},
	'eventSubmit': function(){},
	'getData': function()
	{
		var r={};
		for(var i=0, l=this.inputs.length; i<l; i++)
		{
			var o=this.inputs[i];
			if(o.name)
			{
				r[o.name]=o.instanceOf(InputCheckBox)
							?o.checked
							:(
								o.instanceOf(InputSelect)
								?o.html['data-value']
								:o.html.value
							);
			}
		}
		return r;
	},
	'createInput': function(options)
	{
		var options=Game.mergeJSON(
			{
				'x': 0,
				'y': 0,
				'width': 200,
				'height': 30,
				'type': InputText
			},options),
			i=Game.instanceCreate(options.x,options.y,options.type);
		
		if(i.instanceOf(Input))
		{
			if(i.sprite.src==null)
			{
				i.sprite.width=options.width;
				i.sprite.height=options.height;
			}
			i.form=this;
			i.font=options.font;
			
			this.inputs.push(i);
			return i;
		}
		else
		{
			alert('Error <Form.createInput()> : "type" of the given object is not a class inherited from Input.');
			Game.instanceDestroy(i);
			return null;
		}
	},
	'remove': function()
	{
		for(var i=0, l=this.inputs.length; i<l; i++)
		{
			Game.instanceDestroy(this.inputs[i]);
		}
		Game.instanceDestroy(this);
	}
});

 /*! 
 * === [Input class] (abstract) ===
 * Permit to create an input
 *
 * == Properties ==
 *   -> focus					:	Boolean indicating if there is a focus in this input
 *   -> font					:	Font property used to write text
 *   -> html					:	HTML input linked to this element (internal use only)
 *   -> form					:	Form instance containing this input
 *   -> borderLength			:	Border size
 *   -> borderColor				:	Border color
 *   -> backgroundColor			:	Background color
 *   -> paddingLeft				:	Space width between left border and text
 *   -> paddingRight			:	Space width between right border and text
 *   -> paddingTop				:	Space width between top border and text
 *   -> paddingBototm			:	Space width between bottom border and text
 *
 * == Static Properties ==
 *   -> STATE_FOCUS				:	The input has this state when it has the focus
 *   -> STATE_HOVER				:	The input has this state when the mouse is over it and it doesn't have the focus
 *   -> STATE_NORMAL			:	The input has this state in the other cases
 *
 * == Methods ==
 *	-> textTooLong(text)		:	Check if the given text object is too long for this input
 *		=Params=
 *			text = JSGlib Text object
 *		=Return=
 *			Boolean : true if the text is too long, false otherwise
 *
 *	-> getFocus()				:	Permits the input to get the focus (internal)
 *	-> looseFocus()				:	Permits the input to loose the focus (internal)
 *
 * == Events used ==
 *  -> eventCreate
 *  -> eventStartStep
 *  -> eventClick
 *	-> eventDestroy
 *
 * == Events provided ==
 *   -> eventFocus			:	Called when the input takes the focus
 *   -> eventBlur			:	Called when the input loses the focus
 */
Game.addClass({
	'name': 'Input',
	'abstract': true,
	'eventCreate': function()
	{
		this.collideSolid=false;
		this.checkForCollisions=false;
		this.state=Input.STATE_NORMAL;
		
		this.focus=false;
		this.form=null;
		this.font='20px Calibri';
		this.borderLength=2;
		this.borderColor='#000';
		this.backgroundColor='#fff';
		this.paddingLeft=5;
		this.paddingRight=5;
		this.paddingTop=5;
		this.paddingBottom=5;
		
		//We create an hidden input to authorize backspace key
		this.html=document.createElement('input');
		this.html.type=this.instanceOf(InputButton)?'button':'text';
		this.html.value='';
		this.html.id='jsglib-input-'+this.id;
		this.html.style.width='1px';
		this.html.style.height='1px';
		this.html.style.border=0;
		this.html.style.opacity=0;
		this.html.style.left='-10px';
		this.html.style.color='transparent';
		this.html.style.backgroundColor='transparent';
		this.html.style.position='fixed';
		this.html.autocomplete=false;
		(function(obj)
		{
			obj.html.onfocus=function()
			{
				obj.getFocus();
			};
			
			obj.html.onblur=function()
			{
				obj.looseFocus();
			};
		})(this);
		Game.canvas.parentNode.appendChild(this.html);
	},
	'eventStartStep': function()
	{
		if(this.focus)
		{
			this.state=Input.STATE_FOCUS;
		}
		else if(this.isMouseOver())
		{
			this.state=Input.STATE_HOVER;
		}
		else
		{
			this.state=Input.STATE_NORMAL;
		}
	},
	'eventFocus': function(){},
	'eventBlur': function(){},
	'eventClick': function()
	{
		var newState=this.isMouseOver();
		
		if(this.focus && !newState)
		{
			this.html.blur();
		}
		else if(!this.focus && newState)
		{			
			this.html.focus();
			Game.stopPropagation=true;
		}
	},
	'eventDestroy': function()
	{
		this.html.parentNode.removeChild(this.html);
	},
	'getFocus': function()
	{
		for(var i=0, l=this.form.inputs.length; i<l; i++)
		{
			if(this.form.inputs[i].id!=this.id && this.form.inputs[i].focus)
			{
				this.form.inputs[i].html.blur();
			}
		}
		this.prevValue=this.html.value;
		this.focus=true;
		this.eventFocus();
	},
	'looseFocus': function()
	{
		this.focus=false;
		this.eventBlur();
		if(this.instanceOf(InputText) && this.value!=this.prevValue)
		{
			this.eventConfirmChange();
		}
	},
	'textTooLong': function(text)
	{
		return (this.paddingLeft+Game.widthOfText(text)+this.paddingRight+this.borderLength>=this.sprite.width);
	}
});
Input.STATE_NORMAL=1;
Input.STATE_HOVER=2;
Input.STATE_FOCUS=3;

 /*! 
 * === [InputText class] ===
 * Permit to create a text input
 *
 * == Inheritance ==
 * 	 -> Input
 *
 * == Properties ==
 *   -> name					:	Name of the variable which will be generated for this input
 *   -> placeholder				:	Text displayed when this input has no focus and no value
 *   -> textColor				:	Color of the text
 *   -> placeHolderColor		:	Color of the placeholder text
 *   -> cursorColor				:	Color of the cursor
 *   -> isPassword				:	Indicating if the input is a password one (internal use only)
 *   -> value					:	Input value (internal use only)
 *   -> prevValue				:	Input value before focusing (internal use only)
 *   -> showCursorOnFocus		:	Boolean indicating if the cursor has to be shown while focusing the input
 *   -> showCursorThisStep		:	Boolean indicating if the cursor has to be shown while focusing the input (internal use only)
 *
 * == Methods ==
 *   -> getCursorPos()			:	Get the position of the cursor from the linked HTML input
 *		=Return=
 *			Integer : the position of the cursor if input has focus, -1 otherwise.
 *
 *	-> toPasswordInput()		:	Transform the input into a password one
 *
 *	-> displayAsPassword(text)	:	Return the text given with all characters replaced with bullets
 *		=Params=
 *			text	: String
 *		=Return=
 *			String	: The "passworded" text
 *
 * == Events used ==
 *   -> eventCreate
 *   -> eventStartStep
 *   -> eventStep
 *   -> eventClick
 *
 * == Events provided ==
 *   -> eventChange			:	Call when the input value changes
 *   -> eventConfirmChange	:	Call when the input loses the focus only if its value has been changed
 */
Game.addClass({
	'name': 'InputText',
	'parent': 'Input',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],Input);
		this.name='';
		this.placeholder='';
		this.textColor='#000';
		this.placeHolderColor='#b3b3b3';
		this.cursorColor='#000';
		this.value='';
		this.prevValue='';
		this.showCursorOnFocus=true;
		this.showCursorThisStep=true;
	},
	'eventStartStep': function()
	{
		this.callParent('eventStartStep',[],Input);
		this.backgroundColor=this.state==Input.STATE_HOVER?'#f9f6cb':'#fff';
	},
	'eventStep': function(step)
	{		
		if(!this.sprite.src)
		{
			this.drawRectangle(
			{
				'x': this.x-Game.room.view_x,
				'y': this.y-Game.room.view_y,
				'width': this.sprite.width,
				'height': this.sprite.height,
				'color': this.backgroundColor,
				'borderLength': this.borderLength,
				'borderColor': this.borderColor,
				'opacity': 100
			});
		}
		
		if(this.value!=this.html.value)
		{
			this.value=this.html.value;
			this.eventChange();
			if(this.instanceOf(InputSelect))
			{
				this.eventConfirmChange();
			}
		}
		
		var showPlaceholder=(!this.focus && this.value.length==0),
			cursorPos=this.getCursorPos(),
			textToDisplay=showPlaceholder?this.placeholder:this.value;
		
		if(!showPlaceholder && this.password)
		{
			textToDisplay=this.displayAsPassword(textToDisplay);
		}
		
		var objValue=
			{
				'x': this.x+this.paddingLeft-Game.room.view_x,
				'y': this.y+this.paddingTop-Game.room.view_y,
				'text': textToDisplay,
				'color': showPlaceholder?this.placeHolderColor:this.textColor,
				'font': this.font
			};

		//If the text to display is longer than the width of the displaying area
		if(!showPlaceholder && this.textTooLong(objValue) && !this.instanceOf(InputSelect))
		{
			//We get all the characters before the cursor if it isn't at the end of the string
			if(cursorPos<textToDisplay.length)
			{
				textToDisplay='';			
				for(var i=0; i<cursorPos; i++)
				{
					textToDisplay+=this.password?'•':this.value.charAt(i);
				}
			}
			objValue.text=textToDisplay;
			var startChar=0;
			
			//We remove characters from the left if the text is too long
			while(this.textTooLong(objValue))
			{
				textToDisplay=textToDisplay.substr(1);
				objValue.text=textToDisplay;
				startChar++;
			}
			
			//We can now try to add characters from the right
			for(var i=cursorPos, l=this.value.length; i<l; i++)
			{
				textToDisplay+=this.password?'•':this.value.charAt(i);
				objValue.text=textToDisplay;
				
				if(this.textTooLong(objValue))
				{
					textToDisplay=textToDisplay.substr(0,textToDisplay.length-1);
					objValue.text=textToDisplay;
					break;
				}
			}
		}
		this.drawText(objValue);
		
		if(this.focus && this.showCursorOnFocus)
		{
			if(step%20==0)
			{
				this.showCursorThisStep=false;
			}
			else if(step%10==0)
			{
				this.showCursorThisStep=true;
			}
			
			if(this.showCursorThisStep)
			{
				//Draw the cursor at the right position
				this.drawRectangle(
				{
					'x': Game.widthOfText({'text':(this.password?this.displayAsPassword(this.html.value):this.html.value).substring(startChar,cursorPos),'font':this.font})+this.x+this.paddingLeft-Game.room.view_x,
					'y': this.y+this.paddingTop-Game.room.view_y,
					'width': 1,
					'height': this.sprite.height-this.paddingTop-this.paddingBottom,
					'color': this.cursorColor,
					'borderLength': 0,
					'opacity': 100
				});
			}
		}		
	},
	'eventChange': function(){},
	'eventConfirmChange': function(){},
	'getCursorPos': function()
	{
		if(this.focus)
		{
			//IE
			if (document.selection)
			{
				this.html.focus();

				var selection = document.selection.createRange();
				selection.moveStart('character', -this.html.value.length);

				return selection.text.length;
			}
			else if(this.html.selectionStart || this.html.selectionStart==0)
			{
				return this.html.selectionStart;
			}
		}
		return -1;
	},
	'toPasswordInput': function()
	{
		this.html.type='password';
		this.password=true;
	},
	'displayAsPassword': function(text)
	{
		var temp='';
		for(var i=0, l=text.length; i<l; i++)
		{
			temp+='•';
		}
		return temp;
	}
});

 /*! 
 * === [InputButton class] ===
 * Permit to create a button input
 *
 * == Inheritance ==
 * 	 -> Input
 *
 * == Events used ==
 *   -> eventCreate
 *   -> eventStartStep
 *   -> eventStep
 *   -> eventClick
 *   -> eventKeyDown
 *
 * == Events provided ==
 *	-> eventClickAction	: Called when the player click on the button
 */
Game.addClass({
	'name': 'InputButton',
	'parent': 'Input',
	'eventStartStep': function()
	{
		if(this.focus || this.isMouseOver())
		{
			this.state=Input.STATE_FOCUS;
			if(!this.focus)
			{
				this.html.focus();
			}
		}
		else
		{
			this.state=Input.STATE_NORMAL;
		}
		
		this.backgroundColor=this.state==Input.STATE_NORMAL?'#fff':'#f9f6cb';
	},
	'eventStep': function()
	{				
		if(!this.sprite.src)
		{
			this.drawRectangle(
			{
				'x': this.x-Game.room.view_x,
				'y': this.y-Game.room.view_y,
				'width': this.sprite.width,
				'height': this.sprite.height,
				'color': this.backgroundColor,
				'borderLength': this.borderLength,
				'borderColor': '#000',
				'opacity': 100
			});
		}
		
		var textToDisplay=this.html.value,
			objValue=
			{
				'x': this.x+this.paddingLeft-Game.room.view_x,
				'y': this.y+this.paddingTop-Game.room.view_y,
				'text': textToDisplay,
				'font': this.font
			};

		//If the text to display is longer than the width of the displaying area
		while(this.textTooLong(objValue))
		{
			textToDisplay=textToDisplay.substr(1);
			objValue.text=textToDisplay;
		}
		this.drawText(objValue);		
	},
	'eventClick': function()
	{
		if(this.isMouseOver())
		{
			this.eventClickAction();
			Game.stopPropagation=true;
		}
	},
	'eventKeyDown': function(key)
	{
		if(this.focus && key==Game.KEY_ENTER)
		{
			this.eventClickAction();
		}
	},
	'eventClickAction': function(){}
});

 /*! 
 * === [InputSubmit class] ===
 * Permit to create a submit input
 *
 * == Inheritance ==
 * 	 -> InputButton
 *
 * == Events used ==
 *   -> eventCreate
 *   -> eventStartStep
 *   -> eventStep
 *   -> eventClick
 *   -> eventKeyDown
 *
 */
Game.addClass({
	'name': 'InputSubmit',
	'parent': 'InputButton',
	'eventClickAction': function()
	{
		this.form.eventSubmit(this.form.getData());
	}
});

 /*! 
 * === [InputCheckBox class] ===
 * Permit to create a checkbox
 *
 * == Inheritance ==
 * 	 -> InputButton
 *
 * == Properties ==
 *   -> checked 			: Boolean indicating if this checkbox is checked or not
 *   -> crossColor 			: Color of the cross, when checked
 *   -> crossBorderColor 	: Borders color of the cross, when checked
 *
 * == Events used ==
 *   -> eventCreate
 *   -> eventStartStep
 *   -> eventStep
 *   -> eventClick
 *   -> eventKeyDown
 *
 */
Game.addClass({
	'name': 'InputCheckBox',
	'parent': 'InputButton',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],InputButton);
		this.checked=false;
		this.crossColor='#21b14c';
		this.crossBorderColor='#000';
	},
	'eventStep': function()
	{				
		if(!this.sprite.src)
		{
			this.drawRectangle(
			{
				'x': this.x-Game.room.view_x,
				'y': this.y-Game.room.view_y,
				'width': this.sprite.width,
				'height': this.sprite.height,
				'color': this.backgroundColor,
				'borderLength': this.borderLength,
				'borderColor': '#000',
				'opacity': 100
			});
			
			if(this.checked)
			{
				this.drawShape(
				{
					'color': this.crossColor,
					'borderLength': 2,
					'borderColor': this.crossBorderColor,
					'points':
					[
						{'x': this.x-5-Game.room.view_x,'y':this.y+13-Game.room.view_y},
						{'x': this.x+8-Game.room.view_x,'y':this.y+12-Game.room.view_y},
						{'x': this.x+13-Game.room.view_x,'y':this.y+23-Game.room.view_y},
						{'x': this.x+20-Game.room.view_x,'y':this.y-3-Game.room.view_y},
						{'x': this.x+31-Game.room.view_x,'y':this.y-Game.room.view_y},
						{'x': this.x+18-Game.room.view_x,'y':this.y+32-Game.room.view_y},
						{'x': this.x+6-Game.room.view_x,'y':this.y+31-Game.room.view_y}
					]
				});
			}
		}	
	},
	'eventClickAction': function()
	{
		this.checked=!this.checked;
		Game.stopPropagation=true;
	}
});

/*! 
 * === [InputSelect class] ===
 * Permit to create a select box
 *
 * == Inheritance ==
 * 	 -> InputText
 *
 * == Properties ==
 *	-> options				: Array of JSON defining the options : {'label': 'myLabel', 'value': myVal}
 *	-> drawOptionsDeltaY  	: Integer indicating the Y-delta for drawing options when there are too much ones
 *
 * == Methods ==
 *	-> getHoverOption()	: Return the option which the mouse is on
 *		=Return=
 *			Int: the index of the target option, -1 if none
 *
 *	-> setValue(val) : Set a new value to the select box
 *		=Params=
 *			Var val : the new value
 *		=Return=
 *			InputSelect : the called instance
 *
 * == Events used ==
 *   -> eventCreate
 *   -> eventStartStep
 *   -> eventStep
 *   -> eventClick
 *   -> eventKeyDown
 *
 */
Game.addClass({
	'name': 'InputSelect',
	'parent': 'InputText',
	'eventCreate': function()
	{
		this.callParent('eventCreate',[],InputText);
		this.showCursorOnFocus=false;
		this.name='';
		this.options=[];
		this.html['data-value']='';
		this.drawOptionsDeltaY=0;
	},
	'eventStep': function()
	{				
		this.callParent('eventStep',[],InputText);
		
		var l=this.options.length;
		if(this.focus && l>0)
		{
			var optionsHeight=this.sprite.height*l,
				optionsY=this.y+this.drawOptionsDeltaY+this.sprite.height-Game.room.view_y;

			this.drawRectangle(
			{
				'x': this.x-Game.room.view_x,
				'y': optionsY,
				'width': this.sprite.width,
				'height': optionsHeight,
				'color': '#fff',
				'borderLength': this.borderLength,
				'borderColor': this.borderColor
			});
			
			var hoverOptionIndex=this.getHoverOption();
			
			for(var i=0; i<l; i++)
			{
				var startY=this.y+((i+1)*this.sprite.height)+this.drawOptionsDeltaY-Game.room.view_y;
				if(i==hoverOptionIndex)
				{
					this.drawRectangle(
					{
						'x': this.x-Game.room.view_x,
						'y': startY,
						'width': this.sprite.width,
						'height': this.sprite.height,
						'color': '#e5f5f9',
						'borderLength': this.borderLength,
						'borderColor': this.borderColor
					});
				}
				
				this.drawText({
					'x': this.x+this.paddingLeft-Game.room.view_x,
					'y': startY+this.paddingTop,
					'text': this.options[i].label,
					'color': this.textColor,
					'font': this.font
				});

				if(startY>Game.room.view_h){break;}
			}

			var m=Game.getMouse();
			if(optionsY<0 && m[1]<=this.sprite.height)
			{
				this.drawOptionsDeltaY+=8;
			}
			else if(optionsY+optionsHeight>Game.room.view_h && m[1]>=Game.room.view_h-this.sprite.height)
			{
				this.drawOptionsDeltaY-=8;
			}
		}
	},
	'eventKeyDown': function(){return !this.focus;},
	'eventClick': function()
	{
		var opt=this.options[this.getHoverOption()];
		if(opt)
		{
			this.setValue(opt.value);
			Game.stopPropagation=true;
		}
		else
		{
			if(this.focus)
			{
				this.focus=false;
			}
			else
			{
				this.focus=this.isMouseOver();
				if(this.focus)
				{
					this.toFirstPlan();
					Game.stopPropagation=true;
				}
			}
		}
	},
	'getHoverOption': function()
	{
		if(this.focus)
		{
			var m=Game.getMouse(),
				l=this.options.length,
				deltaY=this.y-Game.room.view_y+this.drawOptionsDeltaY;
			
			if(m[0]>=this.x-Game.room.view_x && m[0] <= this.x+this.sprite.width-Game.room.view_x && m[1]>=this.sprite.height+deltaY && m[1]<=this.sprite.height*(1+l)+deltaY)
			{
				for(var i=0; i<l; i++)
				{
					if(m[1]> this.sprite.height*(i+1)+deltaY && m[1]<this.sprite.height*(i+2)+deltaY)
					{
						return i;
					}
				}
			}
		}
		return -1;
	},
	'setValue': function(val)
	{
		if(val=='')
		{
			this.html.value=val;
			this.html['data-value']=val;
			this.focus=false;
			return this;
		}
		else
		{
			for(var i=0, l=this.options.length; i<l; i++)
			{
				if(this.options[i].value==val)
				{
					this.html.value=this.options[i].label;
					this.html['data-value']=val;
					this.focus=false;
					return this;
				}
			}
		}
		alert('Error <InputSelect.setValue(val)>: the given value is not defined in this select box.');
		return this;
	}
});