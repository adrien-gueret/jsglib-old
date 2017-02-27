(window => {
    const { JSGLib, WantedGameSprites } = window;
    const { Element, Layer } = JSGLib.Core;
    const { random, shuffleArray } = JSGLib.Core.Utils;
    const Trait_MoveWrap = JSGLib.Traits.MoveWrap;
    const SmallHeadsSprite = WantedGameSprites.SmallHeadsSprite;

    function getRandomSpeed() {
        const speeds = shuffleArray([0, 20, 30, 40, 50]);
        let speed = speeds[0];

        return random(0, 1) ? speed : -speed;
    }

    class Head extends Element {
        constructor(room_size, tile_number) {
            // Randomly position the head
            const head_size = SmallHeadsSprite.getTilesSize();
            const x = random(0, room_size.width - head_size.width);
            const y = random(0, room_size.height - head_size.height);

            super(x, y);

            // Randomly set this head speed
            this.speed.set(getRandomSpeed(), getRandomSpeed());

            this.setSpriteClass(SmallHeadsSprite, tile_number);

            // Thanks to Trait_MoveWrap, tell the head to wrap its position when leaving room
            this.initMoveWrap();

            // Add player to layer in order to display it
            Layer.MAIN_LAYER.addElement(this);
        }
    }

    Trait_MoveWrap(Head);

   window.Head = Head;
})(window);