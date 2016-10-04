var Line = Shape.extend({

    constructor: function (startPos, endPos, size, color, lineWidth, boundaries) {
        this.base("Line", startPos, endPos, size, color, lineWidth, boundaries);
    },

    draw: function (canvas) {

        canvas.lineWidth = this.lineWidth;
        canvas.strokeStyle = this.color;
        canvas.fillStyle = this.color;
        canvas.beginPath();
        canvas.moveTo(this.startPos.x, this.startPos.y);
        canvas.lineTo(this.endPos.x, this.endPos.y);
        canvas.stroke();
        this.base(canvas);
    },

    startDrawing: function (point) {
        if (this.selected === true){
            this.endPos.x = point.x + this.size.x;
            this.endPos.y = point.y + this.size.y;
            this.calculateBoundaries();
        }
        this.base(point);
    },

    drawing: function (point) {
        if (this.selected === true){
            this.startPos.x = point.x;
            this.startPos.y = point.y;
            this.endPos.x = point.x + this.size.x;
            this.endPos.y = point.y + this.size.y;
            this.calculateBoundaries();
        } else {
            this.endPos.x = point.x;
            this.endPos.y = point.y;
        }
        this.base(point);
    },

    stopDrawing: function (point) {
        if (this.selected === true){
        } else {
            this.endPos.x = point.x;
            this.endPos.y = point.y;
        }
        this.base(point);
    },

    added: function (canvas) {
        this.calculateBoundaries();
    },

    calculateBoundaries: function(){
        this.size.x = this.endPos.x - this.startPos.x;
        this.size.y = this.endPos.y - this.startPos.y;
        if (this.startPos.x < this.endPos.x && this.startPos.y === this.endPos.y) {
            this.boundaries = new Boundaries(
                new Point(this.startPos.x - this.margin, this.startPos.y - this.margin),
                new Point(this.endPos.x + this.margin, this.endPos.y + this.margin)
            );
        } else if (this.startPos.x > this.endPos.x && this.startPos.y === this.endPos.y) {
            this.boundaries = new Boundaries(
                new Point(this.endPos.x - this.margin, this.endPos.y - this.margin),
                new Point(this.startPos.x + this.margin, this.startPos.y + this.margin)
            );
        } else if (this.startPos.y < this.endPos.y &&  this.startPos.x === this.endPos.x ) {
            this.boundaries = new Boundaries(
                new Point(this.startPos.x - this.margin, this.startPos.y - this.margin),
                new Point(this.endPos.x + this.margin, this.endPos.y + this.margin)
            );
        } else if (this.startPos.y > this.endPos.y &&  this.startPos.x === this.endPos.x ) {
            this.boundaries = new Boundaries(
                new Point(this.endPos.x - this.margin, this.endPos.y - this.margin),
                new Point(this.startPos.x + this.margin, this.startPos.y + this.margin)
            );
        } else if (this.startPos.x < this.endPos.x && this.startPos.y < this.endPos.y ) {
            this.boundaries = new Boundaries(
                new Point(this.startPos.x - this.margin, this.startPos.y - this.margin),
                new Point(this.endPos.x + this.margin, this.endPos.y + this.margin)
            );
        } else if (this.startPos.x > this.endPos.x && this.startPos.y > this.endPos.y ) {
            this.boundaries = new Boundaries(
                new Point(this.endPos.x - this.margin, this.endPos.y - this.margin),
                new Point(this.startPos.x + this.margin, this.startPos.y + this.margin)
            );
        } else if (this.startPos.x < this.endPos.x && this.startPos.y > this.endPos.y ) {
            this.boundaries = new Boundaries(
                new Point(this.startPos.x - this.margin, this.endPos.y - this.margin),
                new Point(this.endPos.x + this.margin, this.startPos.y + this.margin)
            );
        } else {
            this.boundaries = new Boundaries(
                new Point(this.endPos.x - this.margin, this.startPos.y - this.margin),
                new Point(this.startPos.x + this.margin, this.endPos.y + this.margin)
            );
        }
    }
});
