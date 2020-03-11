MyGame.screens['mainMenu'] = (function(game) {
    function initialize() {
        document.getElementById("mainNewGame").addEventListener(
            'click', function() {
                game.showScreen('gameplay');
            }
        )
        
        document.getElementById("mainHighScores").addEventListener(
            'click', function() {
                game.showScreen('highScores')
            }
        )

        document.getElementById("mainControls").addEventListener(
            'click', function() {
                game.showScreen('controls')
            }
        )

        document.getElementById("mainCredits").addEventListener(
            'click', function() {
                game.showScreen('credits')
            }
        )
    }

    function run() {}

    return {
        initialize,
        run
    }
}(MyGame.game));