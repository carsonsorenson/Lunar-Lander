MyGame.render.background = (function(graphics) {
    function render(spec) {
        if (spec.imageReady) {
            let size = {
                width: graphics.width,
                height: graphics.height
            };
            let center = {
                x: graphics.width / 2,
                y: graphics.height / 2
            }

            graphics.drawTexture(
                spec.image,
                center,
                size,
                0
            )
        }
    }

    return {
        render
    }
}(MyGame.graphics));