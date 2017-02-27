(window => {
    const { Room, Layer } = window.JSGLib.Core;
    const { BigHeadsSprite, SmallHeadsSprite } = window.WantedGameSprites;
    const WantedGame = window.WantedGame;

    // Store some DOM elements
    const game_container = document.getElementById('myGame');
    const big_head_container = document.getElementById('big_head');
    const timer_container = document.getElementById('timer');
    const points_container = document.getElementById('points');

    // Create a new game from an inherited class
    const my_game = new WantedGame(game_container);

    // Our game will have only one room. We won't use any definitions, we simply provide the size
    const level = new Room(256, 192);

    // Load images
    Promise.all([
        SmallHeadsSprite.loadImage('./small_heads.png'),
        BigHeadsSprite.loadImage('./big_heads.png')
    ])
        .then(() => {
            // Init sprites to make tiles
            SmallHeadsSprite.init();
            BigHeadsSprite.init();

            // Listen custom events
            my_game
            // When player wins a round, update displayed points and destroy all elements
                .on('win_round', (e) => {
                    points_container.innerHTML = e.detail.points;
                    Layer.MAIN_LAYER.elements.forEach(element => element.destroy());
                })
                // When character to find needs to change, update background position of top image
                .on('change_character', (e) => {
                    big_head_container.style.backgroundPosition = e.detail.backgroundPosition;
                })
                // Update displayed timer
                .on('update_timer', (e) => {
                    timer_container.innerHTML = e.detail.timer;
                })
                // When timer reaches 0, destroy all elements but the last one to find and stop the game
                .on('stop_timer', () => {
                    Layer.MAIN_LAYER.elements
                        .filter(element => !my_game.checkIsWanted(element))
                        .forEach(element => element.destroy());

                    my_game.stop();
                });

            // All event are set, we can start the game!
            my_game.goToRoom(level).start();

            // Game is ready, we can show its DOM element
            game_container.style.display = 'block';
        });
})(window);