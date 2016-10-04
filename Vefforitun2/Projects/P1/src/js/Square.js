var Square = Shape.extend({

    constructor: function (startPos, endPos, size, color, lineWidth, boundaries) {
        this.base("Square", startPos, endPos, size, color, lineWidth, boundaries);
    },

    draw: function (canvas) {
        canvas.lineWidth = this.lineWidth;
        canvas.strokeStyle = this.color;
        canvas.fillStyle = this.color;
        canvas.strokeRect(this.startPos.x, this.startPos.y, this.size.x, this.size.y);
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
            this.size.x = point.x - this.startPos.x;
            this.size.y = point.y - this.startPos.y;
        }
    },

    added: function (canvas) {
        if (this.size.x < 0) {
            this.startPos.x += this.size.x;
            this.size.x = Math.abs(this.size.x);
        }

        if (this.size.y < 0) {
            this.startPos.y += this.size.y;
            this.size.y = Math.abs(this.size.y);
        }
        this.calculateBoundaries();

    },

    calculateBoundaries: function(){
        this.endPos.x = this.startPos.x + this.size.x;
        this.endPos.y = this.startPos.y + this.size.y;

        this.boundaries = new Boundaries(
            new Point(this.startPos.x - this.margin, this.startPos.y - this.margin),
            new Point(this.endPos.x + this.margin, this.endPos.y + this.margin)
        );
    }

});
