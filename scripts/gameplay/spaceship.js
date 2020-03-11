class Spaceship {
    constructor(keyBindings, particleImage, graphics) {
        this.gravity = -0.000025;
        this.thrustRate = 0.0001
        this.alive = true;
        this.won = false;

        this.lastPos = {x: 0, y: 0};
        this.size = {width: 0, height: 0};
        this.position = {x: 0, y: 0};
        this.center = {x: 0, y: 0};
        this.momentum = {x: 0, y:0};
        this.thrust = {x: 0, y: 0};
        this.rotation = 0;
        this.rotationRate = 2 * Math.PI / 5000;

        this.angleDegrees;
        this.fuel = 20;
        this.speed;

        this.particleSystem = new ParticleSystem();
        this.particleImage = particleImage;
        this.graphics = graphics;

        this.bindings = {
            [keyBindings.left]: (elapsedTime) => this.left(elapsedTime),
            [keyBindings.right]: (elapsedTime) => this.right(elapsedTime),
            [keyBindings.thrust]: (elapsedTime) => this.thrustUp(elapsedTime),
        }
    }

    init() {
        this.position.x = 0;
        this.position.y = 0;
        this.center.x = this.position.x + (this.size.width / 2);
        this.center.y = this.position.y + (this.size.height / 2);
        this.alive = true;
        this.won = false;
    }

    processInput(keys, elapsedTime) {
        for (let key in keys) {
            if (key in this.bindings) {
                this.bindings[key](elapsedTime);
            }
        }
    }

    updateRotation(angle) {
        this.rotation += angle;
    }

    validAngle() {
        return (this.angleDegrees >= 355 || this.angleDegrees <= 5);
    }

    validSpeed() {
        return (this.speed < 2);
    }

    update(elapsedTime) {
        this.momentum.y -= this.gravity * elapsedTime;

        this.center.x += this.momentum.x * elapsedTime;
        this.center.y += this.momentum.y * elapsedTime;

        this.position.x = this.center.x - (this.size.width / 2);
        this.position.y = this.center.y - (this.size.height / 2);


        this.angleDegrees = (this.rotation * 180 / Math.PI) % 360;
        while (this.angleDegrees < 0) {
            this.angleDegrees += 360;
        }

        this.speed = Math.sqrt(this.momentum.x * this.momentum.x + this.momentum.y * this.momentum.y) * 100;
    }

    explode() {
        this.alive = false;
        this.particleSystem.explosion({
            image: this.particleImage.image,
            origCenter: {x: this.center.x, y: this.center.y},
            center: {x: this.center.x, y: this.center.y + (this.size.height / 2)},
            size: {mean: 8, stdev: 1},
            speed: {mean: 0, stdev: 0.1},
            lifetime: {mean: 1500, stdev: 300}
        })
        this.won = false;
    }

    right(elapsedTime) {
        this.updateRotation(elapsedTime * this.rotationRate);
    }

    left(elapsedTime) {
        this.updateRotation(elapsedTime * -this.rotationRate);
    }

    thrustUp(elapsedTime) {
        if (this.fuel > 0) {
            this.thrust.x = Math.sin(this.rotation);
            this.thrust.y = Math.cos(this.rotation);

            this.momentum.x += this.thrust.x * this.thrustRate * elapsedTime;
            this.momentum.y -= this.thrust.y * this.thrustRate * elapsedTime;

            this.particleSystem.thrust({
                image: this.particleImage.image,
                origCenter: {x: this.center.x, y: this.center.y},
                center: {x: this.center.x, y: this.center.y + (this.size.height / 2)},
                size: {mean: 4, stdev: 1},
                speed: {mean: 0, stdev: 0.1},
                lifetime: {mean: 200, stdev: 30}
            });
            this.fuel -= (elapsedTime / 1000);
            if (this.fuel < 0) {
                this.fuel = 0;
            }
        }
    }

    resize(w, image) {
        let s = w * 0.075;
        let ratio = image.width / image.height;
        let height = s;
        let width = s * ratio;

        this.size = {
            width, height
        };

        this.center.x = this.position.x + (this.size.width / 2);
        this.center.y = this.position.y + (this.size.height / 2);
    }
}