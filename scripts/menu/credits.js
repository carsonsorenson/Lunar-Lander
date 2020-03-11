MyGame.screens['credits'] = (function(game) {
    function initialize() {
        document.getElementById("creditsBack").addEventListener(
            'click', function() {
                game.showScreen('mainMenu');
            }
        )
    }

    function run() {};

    return {
        initialize,
        run
    }
}(MyGame.game));