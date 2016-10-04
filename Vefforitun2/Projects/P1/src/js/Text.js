var Text = Shape.extend({

    constructor: function (startPos, endPos, size, color, lineWidth, boundaries, input, font) {
        this.base("Text", startPos, endPos, size, color, lineWidth, boundaries);
        this.input = (typeof input === 'undefined') ? document.getElementById('textareabutton').value : input;
        this.font = (typeof font === 'undefined') ? 'Arial' : font;
        this.textWidth = 200;
        this.textHeight = 20;
    },

    draw: function (canvas) {
        canvas.lineWidth = this.lineWidth;
        canvas.strokeStyle = this.color;
        canvas.fillStyle = this.color;
        canvas.font = "30px " + this.font;

        canvas.fillText(this.input, this.startPos.x, this.startPos.y);
        this.textWidth = JSON.parse(JSON.stringify(canvas.measureText(this.input).width));
        this.textHeight = parseInt(canvas.font);
        this.base(canvas);
    },

    startDrawing: function (point) {
        if (this.selected === true) {
            this.calculateBoundaries();
        }
    },

    drawing: function (point) {
        if (this.selected === true){
            this.startPos = point;
            this.calculateBoundaries();
        }
    },

    added: function (canvas) {
        this.calculateBoundaries();
    },

    calculateBoundaries: function(){
        this.boundaries = new Boundaries(
            new Point(this.startPos.x, this.startPos.y - this.textHeight),
            new Point(this.startPos.x + this.textWidth, this.startPos.y)
        );
    }

});
