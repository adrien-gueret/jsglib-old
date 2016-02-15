"use strict";

import Rectangle from "jsglib/rectangle";
import $http from "jsglib/http";
import Trait_EventsHandler from "jsglib/traits/events_handler";

class Room {
    constructor(width = 0, height = 0) {
        this.width = width;
        this.height = height;
        this.definition = null;
    }

    destroy() {
        this.definition = null;
        this.off();
        return this;
    }

    getRectangle() {
        return new Rectangle(this.width, this.height);
    }

    getSize() {
        let {width, height} = this.getRectangle();
        return {width, height};
    }

    initRoom(game) {
        if (!this.definition) {
            return this;
        }

        if (this.definition.layers) {
            this.width = 0;
            this.height = 0;

            for (let layer_name in this.definition.layers) {
                let definition = this.definition.layers[layer_name];
                let layer = game.getLayerFromName(layer_name);
                layer.tiles_sprite_class = null;
                layer.tiles = [];

                if (definition.tiles) {
                    let SpriteClass = game.getClass(definition.sprite_class);
                    layer.tiles_sprite_class = SpriteClass;

                    definition.tiles.forEach((row, row_index) => {
                        layer.tiles[row_index] = layer.tiles[row_index] || [];

                        row.forEach((tile_number, column_index) => {
                            layer.tiles[row_index][column_index] = SpriteClass.getTile(tile_number);
                        });
                    });

                    layer.clearTilesAnimations().initTilesAnimations(game.timer);

                    let tiles_size = layer.tiles_sprite_class.getTilesSize();
                    this.width = Math.max(this.width, layer.tiles[0].length * tiles_size.width);
                    this.height = Math.max(this.height, layer.tiles.length * tiles_size.height);
                }
            }
        } else {
            this.width = this.definition.width;
            this.height = this.definition.height;
        }

        return this;
    }

    useDefinition(data) {
        let promise = (resolve) => {
            if (typeof data === 'string') {
                $http.get(data, {data_type: $http.DATA_TYPES.JSON}).then(data => {
                    this.definition = data;
                    resolve();
                });
            } else {
                this.definition = data;
                resolve();
            }
        };

        return new Promise(promise);
    }
}

Trait_EventsHandler(Room);

export default Room;