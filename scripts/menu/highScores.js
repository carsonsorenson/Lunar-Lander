MyGame.screens['highScores'] = (function(game) {
    function initialize() {
        document.getElementById("highScoresBack").addEventListener(
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