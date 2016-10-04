var Circle = Shape.extend({

    constructor: function (startPos, endPos, size, color, lineWidth, boundaries) {
        this.base("Circle", startPos, endPos, size, color, lineWidth, boundaries);
    },

    draw: function (canvas) {
        canvas.lineWidth = this.lineWidth;
        canvas.strokeStyle = this.color;
        canvas.fillStyle = this.color;
        canvas.beginPath();
        canvas.ellipse(this.startPos.x, this.startPos.y, this.size.x, this.size.y, 0, 0, 2 * Math.PI, false);
        canvas.stroke();
        this.base(canvas);
    },

    startDrawing: function (point) {
        if (this.selected === true) {
            this.calculateBoundaries();
        }
    },

    drawing: function (point) {
        if (this.selected === true){
            this.startPos.x = point.x;
            this.startPos.y = point.y;
            this.calculateBoundaries();
        } else {
            this.size.x = Math.abs(point.x - this.startPos.x);
            this.size.y = Math.abs(point.y - this.startPos.y);
        }
    },

    added: function (canvas) {
        this.calculateBoundaries();
    },

    calculateBoundaries: function(){
        this.boundaries = new Boundaries(
            new Point(this.startPos.x - this.size.x, this.startPos.y - this.size.y),
            new Point(this.startPos.x + this.size.x, this.startPos.y + this.size.y)
        );
    }

});
