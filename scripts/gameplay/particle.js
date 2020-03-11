class Particle {
    constructor(spec) {
        this.spec = spec;
        this.spec.alive = 0;
    }

    update(elapsedTime) {
        this.spec.center.x += (Math.abs(this.spec.speed) * this.spec.direction.x * elapsedTime);
        this.spec.center.y += (Math.abs(this.spec.speed) * this.spec.direction.y * elapsedTime);
        this.spec.alive += elapsedTime;
    }

    isAlive() {
        return this.spec.alive < this.spec.lifetime;
    }
}