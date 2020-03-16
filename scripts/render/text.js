MyGame.render.text = (function(graphics) {
    function getWidth(font, text) {
        graphics.ctx.save();
        graphics.ctx.font = font;
        let width = Math.round(graphics.ctx.measureText(text).width) + 1;
        graphics.ctx.restore();
        return width;
    }

    function getHeight(font) {
		let text = 'M';
		graphics.ctx.save();
		graphics.ctx.font = font;
		let width = graphics.ctx.measureText(text).width;
        graphics.ctx.restore();
        return width;
    }

    function drawScore(score) {
        let fontSize = Math.floor(graphics.height / 30);
        let font = `${fontSize}px monospace`;

        let text = `Score: ${Math.floor(score / 1000)}`;
        let width = getWidth(font, text);
        let height = getHeight(font);
        let color = "white";

        graphics.drawText({
            font,
            fillStyle: color,
            text,
            pos: {x: graphics.width / 2 - (width / 2), y: height * 2}
        })
    }

    function drawGameOver() {
        let fontSize = Math.floor(graphics.height / 10);
        let font = `${fontSize}px monospace`;

        let text = "Game Over!";
        let width = getWidth(font, text);
        let color = "white";

        graphics.drawText({
            font,
            fillStyle: color,
            text,
            pos: {x: graphics.width / 2 - (width / 2), y: graphics.height / 2}
        })
    }

    return {
        drawScore,
        drawGameOver
    }
}(MyGame.graphics));