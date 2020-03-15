MyGame.screens['gameplay'] = (function(game, objects, renderer, graphics, input, keyBindings) {
    let terrain = null;
    let spaceship = null;
    let lastTime = null;
    let cancelNextRequest;
    let myInput = null;
    let countdown = 3000;

    let level;

    let myBackground;
    let mySpaceship;
    let particleImage;

    function intersection(pt1, pt2, circleCenter, circleRadius) {
        let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
        let v2 = { x: pt1.x - circleCenter.x, y: pt1.y - circleCenter.y };
        let b = -2 * (v1.x * v2.x + v1.y * v2.y);
        let c =  2 * (v1.x * v1.x + v1.y * v1.y);
        let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circleRadius * circleRadius));
        if (isNaN(d)) {
            return false;
        }
        let u1 = (b - d) / c;  
        let u2 = (b + d) / c;
        if (u1 <= 1 && u1 >= 0) {
            return true;
        }
        if (u2 <= 1 && u2 >= 0) {
            return true;
        }
        return false;
    }

    function getIntersectingPoints() {
        let intersectingPoints = [];
        for (let i = 0; i < terrain.points.length -1; i++) {
            let pt1 = {
                x: Math.round(terrain.points[i].x * graphics.width),
                y: Math.round(terrain.points[i].y * graphics.height)
            };
            let pt2 = {
                x: Math.round(terrain.points[i+1].x * graphics.width),
                y: Math.round(terrain.points[i+1].y * graphics.height)
            }
            if (intersection(pt1, pt2, spaceship.center, spaceship.size.height / 2)) {
                intersectingPoints.push(terrain.points[i]);
                intersectingPoints.push(terrain.points[i+1]);
            }
        }
        return intersectingPoints;
    }

    function resize() {
        graphics.resize();
        spaceship.resize(graphics.width, mySpaceship.image);
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
            if (spaceship.alive) {
                spaceship.processInput(myInput.keys, elapsedTime);
            }
        }
    }

    function update(elapsedTime) {
        let intersectingPoints = getIntersectingPoints();
        if (intersectingPoints.length > 0 && spaceship.alive) {
            let flat = true;
            for (let i = 0; i < intersectingPoints.length; i++) {
                if (!intersectingPoints[i].flat) {
                    flat = false;
                    break;
                }
            }
            if (spaceship.validAngle() && spaceship.validSpeed() && flat) {
                landingSound.play();
                spaceship.alive = false;
                spaceship.won = true;
                level++;
            }
            else {
                spaceship.explode();
            }
        }

        if (spaceship.alive) {
            spaceship.update(elapsedTime);
        }
        else if (countdown > 0 && spaceship.won) {
            countdown -= elapsedTime;
        }
        else if (countdown <= 0 && spaceship.won) {
            terrain = new Terrain(level);
            spaceship.init();
            countdown = 3000;
        }
        spaceship.particleSystem.update(elapsedTime);
    }

    function render() {
        graphics.clear();
        renderer.background.render(myBackground);
        graphics.drawTerrain(terrain);
        graphics.drawBorder();
        if (spaceship.alive || spaceship.won) {
            renderer.spaceship.render(mySpaceship, spaceship);
        }
        if (spaceship.won)  {
            renderer.countdown.render(countdown, level);
        }
        renderer.status.render(spaceship);
        renderer.particles.render(spaceship);
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

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input, MyGame.keyBindings));