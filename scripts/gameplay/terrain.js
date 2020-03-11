class Terrain {
    constructor(level) {
        this.max = 0.99;
        this.min = 0.3;
        this.level = level;
        this.points = [];
        this.addPoint(0, this.randRange(this.min, this.max));
        this.addPoint(1, this.randRange(this.min, this.max));
        this.generate();
    }

    addPoint(x, y, flat=false) {
        this.points.push(
            {x, y, flat}
        )
    }

    randRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    addFlatSpot(min, max, flatSize) {
        let size = this.points.length;
        let left = size * min;
        let right = size * max;
        let index = Math.round(this.randRange(left, right));
        let point = this.points[index];
        point.flat = true;
        for (let i = 1; i < flatSize; i++) {
            this.points[index+i].flat = true;
            this.points[index+i].y = point.y;
        }
    }

    generate() {
        let iterations = 7;
        let s = 0.8;
        let flatSize = 8;

        for (let i = 0; i < iterations; i++) {
            let cpy = [...this.points];
            this.points.length = 0;
            for (let j = 0; j < cpy.length - 1; j++) {
                let a = cpy[j];
                let b = cpy[j+1];
                let r_g = Random.nextGaussian(0, 1);

                let r = s * r_g * Math.abs(b.x - a.x);
                let y = 1/2 * (a.y + b.y) + r;

                if (y < this.min) {
                    y = this.min;
                }
                if (y > this.max) {
                    y = this.max;
                }
                s += 0.005;

                let x = 1/2 * (a.x + b.x);
                this.addPoint(cpy[j].x, cpy[j].y);
                this.addPoint(x, y);
            }
            this.addPoint(cpy[cpy.length-1].x, cpy[cpy.length-1].y);
        }

        if (this.level == 1) {
            this.addFlatSpot(0.15, 0.4, flatSize);
            this.addFlatSpot(0.6, 0.85, flatSize);
        }
        else {
            this.addFlatSpot(0.15, 0.85, flatSize);
        }
    }
}