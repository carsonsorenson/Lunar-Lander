MyGame.screens['gameplay'] = (function(game, objects, renderer, graphics, input, persistence) {
    let terrain = null;
    let spaceship = null;
    let lastTime = null;
    let cancelNextRequest;
    let myInput = null;
    let countdown = 3000;
    let level;
    let score;
    let pausedGameScreen;
    let paused;
    let gameOverScreen;
    let showGameOverScreen;
    let scoreName;

    let myBackground;
    let mySpaceship;
    let particleImage;

    function resize() {
        graphics.resize();
        spaceship.resize(graphics.width, mySpaceship.image);
    }

    function restart() {
        countdown = 3000;
        terrain = new Terrain(level);
        spaceship.init();
        Intersection.calculate(terrain, spaceship, graphics);
    }

    function gameOver() {
        if (!showGameOverScreen) {
            scoreName.value = "";
            gameOverScreen.style.display = "block";
            let added = persistence.canAddScore(Math.floor(score / 1000));
            if (added) {
                document.getElementById("leaderboard").style.display = "block";
                document.getElementById("noLeaderboard").style.display = "none";
            }
            else {
                document.getElementById("leaderboard").style.display = "none";
                document.getElementById("noLeaderboard").style.display = "block";
            }
        }
        showGameOverScreen = true;
    }

    function processInput(elapsedTime) {
        if ('Escape' in myInput.keys && !Intersection.crashed) {
            if (!explosionSound.paused) {
                explosionSound.pause();
                explosionSound.currentTime = 0;
            }
            if (!thrustSound.paused) {
                thrustSound.pause();
            }
            pausedGameScreen.style.display = "block";
            paused = true;
            cancelNextRequest = true;
        }
        else {
            if (!Intersection.landed) {
                spaceship.processInput(myInput.keys, elapsedTime);
            }
        }
    }

    function updateShip(elapsedTime) {
        Intersection.calculate(terrain, spaceship, graphics);
        if (Intersection.justLanded() && !Intersection.crashed) {
            level++;
            score += 20000;
            landingSound.play();
        }

        let landed = Intersection.landed;
        let crashed = Intersection.crashed;

        if (landed && crashed) {
            if (!spaceship.crashed) {
                spaceship.explode();
            }
        }
        else if (landed && !crashed) {
            if (countdown > 0) {
                countdown -= elapsedTime;
            }
            else {
                restart();
            }
        }
        else {
            score += elapsedTime;
            spaceship.update(elapsedTime);
        }
        spaceship.particleSystem.update(elapsedTime);
    }

    function renderShip() {
        let landed = Intersection.landed;
        let crashed = Intersection.crashed;

        if (landed && !crashed) {
            renderer.text.drawCountdown(countdown, level);
            renderer.spaceship.render(mySpaceship, spaceship);
        }
        else if (!landed) {
            renderer.spaceship.render(mySpaceship, spaceship);
        }
        renderer.text.drawStatus(spaceship);
        renderer.particles.render(spaceship);

    }

    function update(elapsedTime) {
        updateShip(elapsedTime);
    }

    function render() {
        graphics.clear();
        graphics.renderPauseScreen(paused);
        renderer.background.render(myBackground);
        graphics.drawTerrain(terrain);
        graphics.drawBorder();
        renderer.text.drawScore(score);
        if (Intersection.crashed) {
            gameOver();
        }
        renderShip();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTime;
        lastTime = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }
    
    function initialize() {
        scoreName = document.getElementById("scoreName");
        pausedGameScreen = document.getElementById("pauseGame");
        gameOverScreen = document.getElementById("gameOver")

        myBackground = objects.image({
            imageSrc: 'assets/bg.jpg',
        });
    
        mySpaceship = objects.image({
            imageSrc: 'assets/spaceship.png'
        });
    
        particleImage = objects.image({
            imageSrc: 'assets/fire.png'
        });

        explosionSound = objects.sound({
            audioSrc: 'assets/explosion.mp3'
        });

        thrustSound = objects.sound({
            audioSrc: 'assets/thrust.flac'
        });

        landingSound = objects.sound({
            audioSrc: 'assets/landing.wav'
        });

        document.getElementById("pauseMainMenu").addEventListener(
            'click', function() {
                game.showScreen("mainMenu");
            }
        )

        document.getElementById("pauseReturn").addEventListener(
            'click', function() {
                cancelNextRequest = false;
                paused = false;
                pausedGameScreen.style.display = "none";
                lastTime = performance.now();
                requestAnimationFrame(gameLoop);
            }
        )

        document.getElementById("submitScore").addEventListener(
            'click', function() {
                let formattedScore = Math.floor(score / 1000);
                persistence.addScore(scoreName.value, formattedScore);
                if (!explosionSound.paused) {
                    explosionSound.pause();
                    explosionSound.currentTime = 0;
                }
                game.showScreen("highScores");
            }
        )

        document.getElementById("noLeaderboardButton").addEventListener(
            'click', function() {
                game.showScreen("mainMenu");
            }
        )
    }

    function run() {
        level = 1;
        score = 0;
        paused = false;
        showGameOverScreen = false;
        pausedGameScreen.style.display = "none";
        gameOverScreen.style.display = "none";
        terrain = new Terrain(level);
        spaceship = new Spaceship(persistence.keyBindings, particleImage, explosionSound, thrustSound, graphics);
        myInput = input.Keyboard();
        cancelNextRequest = false;

        lastTime = performance.now();
        window.addEventListener('resize', resize);
        resize();
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize,
        run
    }

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.persistence));