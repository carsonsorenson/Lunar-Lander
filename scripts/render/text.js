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

    function drawStatus(spaceship) {
        let fixedText = `fuel   :  20.00 s`;
        let margin = graphics.height * 0.05;
        let fontSize = Math.floor(graphics.height / 40);
        let font = `${fontSize}px monospace`;

        let text1 = `fuel  : ${(Math.round(spaceship.fuel * 100) / 100).toFixed(2)} s`;
        let text2 = `speed : ${(Math.round(spaceship.speed * 100) / 100).toFixed(2)} m/s`;
        let text3 = `angle : ${(Math.round(spaceship.angleDegrees * 100) / 100).toFixed(2)} °`;

        let width = getWidth(font, fixedText);
        let color = "white";
        if (spaceship.fuel > 0) {
            color = "#66FF00";
        }

        graphics.drawText({
            font,
            fillStyle: color,
            text: text1,
            pos: {x: graphics.width - width - margin, y: fontSize + margin}
        })

        color = "white";
        if (spaceship.validSpeed()) {
            color = "#66FF00";
        }

        graphics.drawText({
            font,
            fillStyle: color,
            text: text2,
            pos: {x: graphics.width - width - margin, y: fontSize * 2 + margin}
        })

        color = "white";
        if (spaceship.validAngle()) {
            color = "#66FF00";
        }

        graphics.drawText({
            font,
            fillStyle: color,
            text: text3,
            pos : {x: graphics.width - width - margin, y: fontSize * 3 + margin}
        });
    }

    function drawCountdown(countdown, level) {
        let fontSize = Math.floor(graphics.height / 10);
        let font = `${fontSize}px Arial`;
        let number = Math.ceil(countdown / 1000);

        let color = "white";
        let word = `Level ${level}: ${number}`;
        let width = getWidth(font, word);

        graphics.drawText({
            font,
            fillStyle: color,
            text: word,
            pos: {x: graphics.width / 2 - (width / 2), y: graphics.height / 2}
        });
    }

    return {
        drawScore,
        drawGameOver,
        drawStatus,
        drawCountdown
    }
}(MyGame.graphics));