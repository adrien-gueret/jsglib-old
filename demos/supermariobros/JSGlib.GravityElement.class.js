/*!
 * GravityElement class for JSGlib, JavaScript Library
 * http://jsglib.no-ip.org/
 *
 * Copyright 2013, Adrien Guéret
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * Date: 11/01/2013
 *
 * Allow gravity to be applied on instances
 *
 * == Properties ==
 *   -> max_vspeed
 *   -> gravity_value
 *   -> layer_name
 *
 * == Methods ==
 *   -> isLanding
 *
 * == Events used ==
 *   -> eventCreate
 *   -> eventStep
 *   -> eventEndStep
 */
 
 (function () {
	'use strict';
	
	window.GravityElement = {
		name: 'GravityElement',
		'abstract': true,
		eventCreate: function() {
			this.max_vspeed = 10;
			this.gravity_value = 0.8;
			this.layer_name = 'main';
		},
		eventStep: function () {
			this.vspeed(Math.min(this.vspeed(), this.max_vspeed));
		},
		eventEndStep: function() {		
			if (this.isLanding()) {
                this.gravity(0).vspeed(0);
            } else {
                this.gravity(this.gravity_value);
            }
		},
		isLanding: function () {
			var mask = this.getMask(),
				thisX = this.x() + mask.x(),
				checkY = this.y() + mask.y() + mask.height(),
				leftType = this.getGame().getTileType(thisX + 1, checkY, this.layer_name),
				rightType = this.getGame().getTileType(thisX + mask.width() - 1, checkY, this.layer_name),
				isLanding = leftType == JSGlib.TILES_TYPES.WALL || rightType == JSGlib.TILES_TYPES.WALL,
				instances = [];
			
			if (!isLanding) {
				instances = this.getGame().getInstancesIn(new JSGlib.Rectangle(thisX + 1, checkY, mask.width() - 1, 1));
				
				JSGlib.forEach(instances, function () {
					if (this.solid()) {
						isLanding = true;
						return JSGlib.KEYWORDS.BREAK;
					}
				});
			}
			
			return isLanding;
		}
	};
 })();