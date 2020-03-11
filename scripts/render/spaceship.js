MyGame.render.spaceship = (function(graphics) {
    function render(spec, spaceship) {
        if (spec.imageReady) {
            graphics.drawTexture(
                spec.image,
                spaceship.center,
                spaceship.size,
                spaceship.rotation
            )
        }
    }

    return {
        render
    }
}(MyGame.graphics));