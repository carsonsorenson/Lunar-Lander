MyGame.render.countdown = (function(graphics) {
    function render(countdown, level) {
        let fontSize = Math.floor(graphics.height / 10);
        let font = `${fontSize}px Arial`;
        let number = Math.ceil(countdown / 1000);

        let color = "white";

        let word = `Level ${level}: ${number}`;
        graphics.ctx.font = font;
        let width = Math.round(graphics.ctx.measureText(word).width) + 1;

        graphics.drawText({
            font,
            fillStyle: color,
            text: word,
            pos: {x: graphics.width / 2 - (width / 2), y: graphics.height / 2}
        })
    }

    return {
        render
    }
}(MyGame.graphics));