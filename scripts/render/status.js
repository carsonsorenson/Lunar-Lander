MyGame.render.status = (function(graphics) {
    let fixedText = `fuel   :  20.00 s`;

    function render(spaceship) {
        let margin = graphics.height * 0.05;
        let fontSize = Math.floor(graphics.height / 40);
        let font = `${fontSize}px monospace`;

        let text1 = `fuel  : ${(Math.round(spaceship.fuel * 100) / 100).toFixed(2)} s`;
        let text2 = `speed : ${(Math.round(spaceship.speed * 100) / 100).toFixed(2)} m/s`;
        let text3 = `angle : ${(Math.round(spaceship.angleDegrees * 100) / 100).toFixed(2)} °`;

        graphics.ctx.font = font;
        let width = Math.round(graphics.ctx.measureText(fixedText).width) + 1;

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

    return {
        render
    }
}(MyGame.graphics));