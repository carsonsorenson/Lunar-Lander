let Intersection = (function() {
    let landed = false;
    let crashed = false;
    let initialLanding = false;
    
    function intersection(pt1, pt2, circleCenter, circleRadius) {
        let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
        let v2 = { x: pt1.x - circleCenter.x, y: pt1.y - circleCenter.y };
        let b = -2 * (v1.x * v2.x + v1.y * v2.y);
        let c =  2 * (v1.x * v1.x + v1.y * v1.y);
        let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circleRadius * circleRadius));
        if (isNaN(d)) {
            return false;
        }
        let u1 = (b - d) / c;  
        let u2 = (b + d) / c;
        if (u1 <= 1 && u1 >= 0) {
            return true;
        }
        if (u2 <= 1 && u2 >= 0) {
            return true;
        }
        return false;
    }

    function getPoints(terrain, spaceship, graphics) {
        let intersectingPoints = [];
        for (let i = 0; i < terrain.points.length - 1; i++) {
            let pt1 = {
                x: Math.round(terrain.points[i].x * graphics.width),
                y: Math.round(terrain.points[i].y * graphics.height)
            };
            let pt2 = {
                x: Math.round(terrain.points[i+1].x * graphics.width),
                y: Math.round(terrain.points[i+1].y * graphics.height)
            }
            if (intersection(pt1, pt2, spaceship.center, spaceship.size.height / 2)) {
                intersectingPoints.push(terrain.points[i]);
                intersectingPoints.push(terrain.points[i+1]);
            }
        }
        return intersectingPoints;
    }

    function calculate(terrain, spaceship, graphics) {
        let intersectingPoints = getPoints(terrain, spaceship, graphics);

        if (intersectingPoints.length > 0) {
            landed = true;
            for (let i = 0; i < intersectingPoints.length; i++) {
                if (!intersectingPoints[i].flat) {
                    alive = false;
                    crashed = true;
                    break;
                }
            }

            if (spaceship.validAngle() && spaceship.validSpeed()) {
                crashed = false;
            }
            else {
                crashed = true;
            }
        }
        else {
            landed = false;
            crashed = false;
        }
    }

    function justLanded() {
        if (landed == true && initialLanding == false) {
            initialLanding = true;
            return true;
        }
        else if (landed == false) {
            initialLanding = false;
        }
        return false;
    }

    return {
        get landed() { return landed },
        get crashed() { return crashed },
        calculate,
        justLanded
    };
}());