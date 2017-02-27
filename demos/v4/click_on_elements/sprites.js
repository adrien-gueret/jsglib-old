((window) => {
    const Sprite = window.JSGLib.Core.Sprite;

    const CHARACTERS_NUMBERS = {
        LUIGI: 1,
        MARIO: 2,
        YOSHI: 3,
        WARIO: 4,
        NONE: 5
    };

    class BigHeadsSprite extends Sprite {
        static init() {
            this.makeTiles(55, 60);
        }
    }

    class SmallHeadsSprite extends Sprite {
        static init() {
            this.makeTiles(30, 32);
        }
    }

    window.WantedGameSprites = {
        CHARACTERS_NUMBERS,
        BigHeadsSprite,
        SmallHeadsSprite
    };
})(window);