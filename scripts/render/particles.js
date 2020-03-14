MyGame.render.particles = (function(graphics) {
    function rotatePointAboutPoint(center, pt, angle) {
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        let pTranslate = {
            x: pt.x - center.x,
            y: pt.y - center.y
        }

        let x = pTranslate.x * cos - pTranslate.y * sin;
        let y = pTranslate.x * sin + pTranslate.y * cos;

        return {
            x: x + center.x,
            y: y + center.y
        };
    }

    function render(spaceship) {
        for (let i = 0; i < spaceship.particleSystem.particles.length; i++) {
            let spec = spaceship.particleSystem.particles[i].spec;
            let newCenter = rotatePointAboutPoint(spec.origCenter, spec.center, spec.rotation);
            graphics.drawTexture(
                spec.image,
                newCenter,
                spec.size,
                0,
            )
        }
    }

    return {
        render
    }
}(MyGame.graphics));