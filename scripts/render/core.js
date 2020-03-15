MyGame.graphics = (function() {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    function clear() {
        ctx.clearRect(
            0, 0, canvas.width, canvas.height
        );
    }

    function scale(pt) {
        return {
            x: Math.round(pt.x * canvas.width),
            y: Math.round(pt.y * canvas.height)
        };
    }

    function drawBorder() {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.strokeRect(
            0, 0, ctx.canvas.width, ctx.canvas.height
        );
        ctx.restore();
    }

    function drawTerrain(terrain) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.moveTo(0, canvas.height);
        for (let i = 0; i < terrain.points.length; i++) {
            let pt = scale(terrain.points[i]);
            ctx.lineTo(pt.x, pt.y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        let isFlat = false;
        ctx.strokeStyle = "#66FF00";
        ctx.lineWidth = 2;
        for (let i = 0; i < terrain.points.length; i++) {
            let pt = scale(terrain.points[i]);
            if (terrain.points[i].flat && !isFlat) {
                ctx.beginPath();
                ctx.moveTo(pt.x, pt.y);
                isFlat = true;
            }
            else if (terrain.points[i].flat && isFlat) {
                ctx.lineTo(pt.x, pt.y);
            }
            else if (!terrain.points[i].flat & isFlat) {
                ctx.stroke();
                isFlat = false;
            }
        }
        ctx.restore();
    }

    function drawTexture(image, center, size, rotation) {
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(rotation);
        ctx.translate(-center.x, -center.y);

        ctx.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width,
            size.height
        )

        ctx.restore();
    }


    function drawText(spec) {
        ctx.font = spec.font;
        ctx.fillStyle = spec.fillStyle;
        //ctx.textBaseline = 'top';
        ctx.fillText(spec.text, spec.pos.x, spec.pos.y);
    }

    function resize() {
        let width = window.innerWidth * 0.99;
        let height = window.innerHeight * 0.99;

        if (width / height < 1.69) {
            canvas.width = width;
            canvas.height = width / 1.69;
        }
        else {
            canvas.height = height;
            canvas.width = height * 1.69;
        }
    }


    let api = {
        get width() { return canvas.width },
        get height() { return canvas.height },
        get ctx() { return ctx },
        clear,
        drawTerrain,
        drawTexture,
        drawText,
        resize,
        drawBorder
    }

    return api;
}());