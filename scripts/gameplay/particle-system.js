class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    shipThrust(spec) {
        for (let i = 0; i < 20; i++) {
            let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
            this.particles.push(new Particle({
                image: spec.image,
                origCenter: {x: spec.origCenter.x, y: spec.origCenter.y },
                center: {x: spec.center.x, y: spec.center.y },
                size: {width: size, height: size},
                rotation: spec.rotation,
                speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
                direction: Random.nextThrustVector(),
                lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
            }));
        }
    }

    shipCrash(spec) {
        this.particles.length = 0;
        for (let i = 0; i < 200; i++) {
            let size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev));
            this.particles.push(new Particle({
                image: spec.image,
                origCenter: {x: spec.origCenter.x, y: spec.origCenter.y },
                center: {x: spec.center.x, y: spec.center.y },
                size: {width: size, height: size},
                rotation: 0,
                speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
                direction: Random.nextCircleVector(),
                lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
            }));
        }
    }

    update(elapsedTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update(elapsedTime);
            if (!this.particles[i].isAlive()) {
                this.particles.splice(i, 1);
            }
        }
    }
}