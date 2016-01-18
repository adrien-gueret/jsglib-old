"use strict";

import EventsHandler from "jsglib/events_handler";
import Point from "jsglib/point";

export default class Tile extends EventsHandler {
	constructor(sprite_class, x = 0, y = 0) {
		super();

		this.sprite_class = sprite_class;
		this.position = new Point(x, y);
		this.needs_redraw = true;
		this.clock_animation = null;
	}
	clone() {
		let new_tile = new Tile(this.sprite_class, this.position.x, this.position.y);

		if (this.animation) {
			let {next_tile_number, time} = this.animation;
			new_tile.animation = {next_tile_number, time};
		}

		return new_tile;
	}
	draw(ctx, x = 0, y = 0, timer) {
		let tiles_size = {
			width: this.sprite_class.tiles_width,
			height: this.sprite_class.tiles_height
		};

		let dest_x = x * tiles_size.height;
		let dest_y = y * tiles_size.width;

		ctx.clearRect(dest_x, dest_y, tiles_size.width, tiles_size.height);
		ctx.drawImage(
			this.sprite_class.image,
			this.position.x,
			this.position.y,
			tiles_size.width,
			tiles_size.height,
			dest_x,
			dest_y,
			tiles_size.width,
			tiles_size.height
		);

		this.needs_redraw = false;

		if (this.animation) {
			if (this.clock_animation) {
				timer.clearTimeout(this.clock_animation);
			}

			this.clock_animation = timer.setTimeout(() => {
				this.trigger('animation');
			}, this.animation.time);
		}

		return this;
	}
	setAnimation(next_tile_number, time) {
		this.animation = {next_tile_number, time};
		return this;
	}
}