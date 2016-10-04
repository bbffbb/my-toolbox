var Pen = Shape.extend({
    constructor: function (startPos, endPos, size, color, lineWidth, boundaries, coords) {
        this.base("Pen", startPos, endPos, size, color, lineWidth, boundaries);
        this.coordinates = (typeof coords === 'undefined') ? [] : coords;
        this.oldCoordinates = [];
        this.firstSelectPoint = null;
    },

    draw: function (canvas) {
        canvas.lineWidth = this.lineWidth;
        canvas.strokeStyle = this.color;
        canvas.fillStyle = this.color;
        for (var i = 0; i < this.coordinates.length; i++) {
            canvas.beginPath();
            if (i > 0) {
                canvas.moveTo(this.coordinates[i - 1].x, this.coordinates[i - 1].y);
            }
            canvas.lineTo(this.coordinates[i].x, this.coordinates[i].y);
            canvas.closePath();
            canvas.stroke();
        }
        this.base(canvas);
    },

    startDrawing: function (point) {
        if (this.selected === true) {
            this.firstSelectPoint = point;
            for (var i = 0; i < this.coordinates.length; i++) {
                this.oldCoordinates[i] = new Point(this.coordinates[i].x, this.coordinates[i].y);
            }
            this.calculateBoundaries();
        } else {
            this.coordinates.push(point);
        }
    },
    drawing: function (point) {
        if (this.selected === true) {
            var offsetX = this.firstSelectPoint.x - point.x;
            var offsetY = this.firstSelectPoint.y - point.y;
            for (var i = 0; i < this.coordinates.length; i++) {
                this.coordinates[i].x = this.oldCoordinates[i].x - offsetX;
                this.coordinates[i].y = this.oldCoordinates[i].y - offsetY;
            }
            this.calculateBoundaries();
        } else {
            this.coordinates.push(point);
        }
    },
    stopDrawing: function (point) {
        if (this.selected === true) {
            this.oldCoordinates = [];
            this.firstSelectPoint = null;
        }
    },
    added: function (canvas) {
        this.calculateBoundaries();
    },

    calculateBoundaries: function(){
        var pointAX = this.coordinates[0].x,
        pointAY = this.coordinates[0].y,
        pointBX = this.coordinates[0].x,
        pointBY = this.coordinates[0].y;
        for (var i = 1; i < this.coordinates.length; i++){
            if (this.coordinates[i].x < pointAX){
                pointAX = this.coordinates[i].x;
            }
            if (this.coordinates[i].y < pointAY){
                pointAY = this.coordinates[i].y;
            }
            if (this.coordinates[i].x > pointBX){
                pointBX = this.coordinates[i].x;
            }
            if (this.coordinates[i].y > pointBY){
                pointBY = this.coordinates[i].y;
            }
        }
        this.boundaries = new Boundaries(
            new Point(pointAX, pointAY),
            new Point(pointBX, pointBY)
        );
    }
});
