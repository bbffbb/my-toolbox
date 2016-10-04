var Shape = Base.extend({

    constructor: function (name, startPos, endPos, size, clr, lineWidth, boundaries) {
        this.name = name;
        this.startPos = (typeof startPos === 'undefined') ? null : startPos;
        this.endPos = (typeof endPos === 'undefined') ? new Point(0, 0) : endPos;
        this.size = (typeof size === 'undefined') ? new Point(0, 0) : size;
        this.color = (typeof clr === 'undefined') ? color : clr;
        this.lineWidth = (typeof lineWidth === 'undefined') ? 1 : lineWidth;

        this.selected = false;
        this.selectedRectSize = 8;
        this.margin = 5;
        this.boundaries = (typeof boundaries === 'undefined') ? null : new Boundaries(
            boundaries.topleft, boundaries.bottomright);
        },

        draw: function (canvas) {
            if (this.selected === true){
                canvas.setLineDash([5, 15]);
                canvas.strokeStyle = '#000';
                canvas.lineWidth = 1;
                var width = Math.abs(this.boundaries.bottomright.x - this.boundaries.topleft.x) + 2*this.margin;
                var height = Math.abs(this.boundaries.bottomright.y - this.boundaries.topleft.y) + 2*this.margin;
                canvas.strokeRect(this.boundaries.topleft.x - this.margin, this.boundaries.topleft.y - this.margin, width, height);
                canvas.setLineDash([0,0]);
                this.drawSelectionRect(canvas, this.boundaries.topleft.x - this.margin, this.boundaries.topleft.y - this.margin);
                this.drawSelectionRect(canvas, this.boundaries.topleft.x - this.margin, this.boundaries.bottomright.y + this.margin);
                this.drawSelectionRect(canvas, this.boundaries.bottomright.x + this.margin, this.boundaries.topleft.y - this.margin);
                this.drawSelectionRect(canvas, this.boundaries.bottomright.x + this.margin, this.boundaries.bottomright.y + this.margin);
            }
        },

        startDrawing: function (point) {
            if (this.selected !== true) {
                this.startPos = point;
            }
        },

        drawing: function (point) {

        },

        stopDrawing: function (point) {
            if (this.selected !== true) {
                this.endPos = point;
            }
        },

        added: function (canvas) {

        },

        drawSelectionRect: function(canvas, cx, cy){
            canvas.lineWidth = 1;
            canvas.strokeStyle = '#000';
            canvas.fillStyle = '#fff';
            var a = this.selectedRectSize;
            canvas.strokeRect(cx-a/2, cy-a/2, a, a);
            canvas.fillRect(cx-a/2, cy-a/2, a, a);
            canvas.lineWidth = this.lineWidth;
            canvas.strokeStyle = this.color;
            canvas.fillStyle = this.color;
        },
    });
