MyGame.screens['gameplay'] = (function(game, objects, renderer, graphics, input, keyBindings) {
    let terrain = null;
    let spaceship = null;
    let lastTime = null;
    let cancelNextRequest;
    let myInput = null;
    let countdown = 3000;
    let level;
    let score;

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

    function processInput(elapsedTime) {
        if ('Escape' in myInput.keys) {
            if (!explosionSound.paused) {
                explosionSound.pause();
                explosionSound.currentTime = 0;
            }
            cancelNextRequest = true;
            game.showScreen('mainMenu');
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
                console.log('here')
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
        renderer.background.render(myBackground);
        graphics.drawTerrain(terrain);
        graphics.drawBorder();
        renderer.text.drawScore(score);
        if (Intersection.crashed) {
            renderer.text.drawGameOver();
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
    }

    function run() {
        level = 1;
        score = 0;
        terrain = new Terrain(level);
        spaceship = new Spaceship(keyBindings, particleImage, explosionSound, thrustSound, graphics);
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

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.persistence.keyBindings));