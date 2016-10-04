function App(canvasSelector) {
    var self = this;
    self.getEventPoint = function (e) {
        return new Point(e.pageX - self.canvasOffset.x, e.pageY - self.canvasOffset.y);
    };

    self.resetSelectedShape = function () {
        if (self.selectedShape !== null) {
            self.selectedShape.selected = false;
            self.selectedShape = null;
            self.redraw();
        }
    };

    self.loadDrawing = function(id){
        self.shapes = self.loadObjects(JSON.parse(self.drawingsArray[id].WhiteboardContents));
        self.redraw();
    };

    self.addDrawingsToPage = function() {
        $('#drawings').empty();
        for (var i = 0; i < self.drawingsArray.length; i++){
            $('#drawings').append('<tr onclick="app.loadDrawing('+ i +')">' +
            '<th scope="row">' +
            self.drawingsArray[i].ID +
            '</th>' +
            '<td>'+
            self.drawingsArray[i].WhiteboardTitle +
            '</td>'+
            '</tr>');
        }
    };

    self.loadObjects = function (array) {
        var results = [];
        for (var i = 0; i < array.length; i++){
            if (array[i].name === "Square"){ //startPos, endPos, size, color, lineWidth
                results.push(new Square(
                    array[i].startPos,
                    array[i].endPos,
                    array[i].size,
                    array[i].color,
                    array[i].lineWidth,
                    array[i].boundaries
                ));
            } else if (array[i].name === "Pen"){ //startPos, endPos, size, color, lineWidth, coords
                results.push(new Pen(
                    array[i].startPos,
                    array[i].endPos,
                    array[i].size,
                    array[i].color,
                    array[i].lineWidth,
                    array[i].boundaries,
                    array[i].coordinates
                ));
            } else if (array[i].name === "Circle"){ //startPos, endPos, size, color, lineWidth
                results.push(new Circle(
                    array[i].startPos,
                    array[i].endPos,
                    array[i].size,
                    array[i].color,
                    array[i].lineWidth,
                    array[i].boundaries
                ));
            } else if (array[i].name === "Line") { //startPos, endPos, size, color, lineWidth
                results.push(new Line(
                    array[i].startPos,
                    array[i].endPos,
                    array[i].size,
                    array[i].color,
                    array[i].lineWidth,
                    array[i].boundaries
                ));
            } else if (array[i].name === "Text") { //startPos, endPos, size, color, lineWidth, input, font
                results.push(new Text(
                    array[i].startPos,
                    array[i].endPos,
                    array[i].size,
                    array[i].color,
                    array[i].lineWidth,
                    array[i].boundaries,
                    array[i].input,
                    array[i].font
                ));
            }
        }
        return results;
    };

    self.drawingStart = function (e) {
        var startPos = self.getEventPoint(e);
        var shape;
        if (self.selectedShape !== null) {
            shape = self.selectedShape;
        }
        else {
            shape = self.shapeFactory();
        }

        shape.startPos = startPos;
        shape.color = self.color;
        shape.lineWidth = self.lineWidth;
        shape.font = self.font;

        shape.startDrawing(startPos, self.canvasContext);
        startPos.log('drawing start');

        var drawing = function (e) {
            var pos = self.getEventPoint(e);

            shape.drawing(pos, self.canvasContext);

            self.redraw();
            shape.draw(self.canvasContext);
        };

        var drawingStop = function (e) {
            var pos = self.getEventPoint(e);

            shape.stopDrawing(pos, self.canvasContext);

            pos.log('drawing stop');
            if (self.selectedShape === null) {
                self.shapes.push(shape);
            }
            shape.added(self.canvasContext);
            // Remove drawing and drawingStop functions from the mouse events
            self.canvas.off({
                mousemove: drawing,
                mouseup: drawingStop
            });

            self.redraw();
        };

        // Add drawing and drawingStop functions to the mousemove and mouseup events
        self.canvas.on({
            mousemove: drawing,
            mouseup: drawingStop
        });
    };

    self.mousedown = function (e) {
        if (self.shapeFactory !== null) {
            self.drawingStart(e);
        } else {
            self.resetSelectedShape();
            var selectPoint = self.getEventPoint(e);
            for (var i = self.shapes.length - 1; i >= 0 ; i--) {
                if (self.shapes[i].boundaries.insideBoundaries(selectPoint)) {
                    self.shapes[i].selected = true;
                    self.selectedShape = self.shapes[i];
                    self.drawingStart(e);
                    break;
                }
            }
        }

        self.redraw();
    };

    self.redraw = function () {
        self.canvasContext.clearRect(0, 0, self.canvasContext.canvas.width, self.canvasContext.canvas.height);
        for (var i = 0; i < self.shapes.length; i++) {
            self.shapes[i].draw(self.canvasContext);
        }
    };

    self.clear = function () {
        self.shapes = [];
        self.redoShapes = [];
        self.redraw();
    };

    self.undo = function () {
        if (self.shapes === undefined) return;
        if (self.shapes === null) return;
        if (self.shapes.length === 0) return;
        self.redoShapes.push(self.shapes.pop());
        self.redraw();
    };

    self.redo = function () {
        if (self.redoShapes === undefined) return;
        if (self.redoShapes === null) return;
        if (self.redoShapes.length === 0) return;
        self.shapes.push(self.redoShapes.pop());
        self.redraw();
    };

    self.save = function () {
        var stringifiedArray = JSON.stringify(self.shapes);
        var param = {
            "user": $('#username').val(), // You should use your own username!
            "name": "drawing",
            "content": stringifiedArray,
            "template": true
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://whiteboard.apphb.com/Home/Save",
            data: param,
            dataType: "jsonp",
            crossDomain: true,
            success: function (data) {
                toastr.clear();
                toastr.success('Drawing saved with the id: ' + data.ID, 'Saved!');
            },
            error: function (xhr, err) {
                toastr.clear();
                toastr.error('An error occurred when saving the drawing.', 'Error!');
            }
        });
    };

    self.loadOne = function () {
        var param = {
            "id": $('#drawingID').val(), // You should use your own username!
            "template": true
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://whiteboard.apphb.com/Home/GetWhiteboard",
            data: param,
            dataType: "jsonp",
            crossDomain: true,
            success: function (data) {
                console.log(data);
                if (data === false){
                    toastr.clear();
                    toastr.error('ID not valid.', 'Error!');
                } else {
                    self.shapes = self.loadObjects(JSON.parse(data.WhiteboardContents));
                    self.redraw();
                    toastr.clear();
                    toastr.success('Drawing ' + data.ID + ' loaded', 'Loaded!');
                }
            },
            error: function (xhr, err) {
                toastr.clear();
                toastr.error('An error occurred when loading your drawing.', 'Error!');
            }
        });
    };

    self.loadAll = function () {
        var param = {
            "user": $('#username').val(), // You should use your own username!
            "template": true
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://whiteboard.apphb.com/Home/GetList",
            data: param,
            dataType: "jsonp",
            async: false,
            crossDomain: true,
            success: function (data) {
                self.drawingsArray = data;
                self.addDrawingsToPage();
                toastr.clear();
                toastr.success('Drawings fetched from server', 'Done!');
            },
            error: function (xhr, err) {
                toastr.clear();
                toastr.error('An error occurred when loading your drawings.', 'Error!');
            }
        });
    };

    self.setColor = function (color) {
        self.color = color;
    };

    self.setLineWidth = function (lineWidth) {
        self.lineWidth = lineWidth;
    };

    self.setFont = function (font) {
        self.font = font;
    };

    self.resetLayout = function (name){
        $('#textareabutton').removeClass('visible');
        $('#textareabutton').addClass('hidden');
        $('#toolselected').empty();
        $('#toolselected').append(name);
    };

    self.init = function () {
        // Initialize App
        self.selectedShape = null;
        self.canvas = $(canvasSelector);
        self.canvasOffset = new Point(self.canvas.offset().left, self.canvas.offset().top);
        self.canvas.on({
            mousedown: self.mousedown
        });
        self.shapeFactory = null;
        self.canvasContext = canvas.getContext("2d");
        self.shapes = [];
        self.redoShapes = [];

        // Set defaults
        self.color = '#ff0000';
        self.font = 'Arial';
        self.lineWidth = 1;
        self.drawingsArray = [];
        self.shapeFactory = function () {
            return new Pen();
        };
    };

    self.init();
}

var app = null;
$(function () {
    // Wire up events
    app = new App('#canvas');

    $('#squarebutton').click(function () {
        app.resetLayout('Square');
        self.redoShapes = [];
        app.resetSelectedShape();
        app.shapeFactory = function () {
            return new Square();
        };
    });
    $('#circlebutton').click(function () {
        app.resetLayout('Circle');
        self.redoShapes = [];
        app.resetSelectedShape();
        app.shapeFactory = function () {
            return new Circle();
        };
    });
    $('#penbutton').click(function () {
        app.resetLayout('Pen');
        self.redoShapes = [];
        app.resetSelectedShape();
        app.shapeFactory = function () {
            return new Pen();
        };
    });
    $('#linebutton').click(function () {
        app.resetLayout('Line');
        self.redoShapes = [];
        app.resetSelectedShape();
        app.shapeFactory = function () {
            return new Line();
        };
    });
    $('#textbutton').click(function () {
        $('#textareabutton').removeClass('hidden');
        $('#textareabutton').addClass('visible');
        $('#toolselected').empty();
        $('#toolselected').append("Text");
        self.redoShapes = [];
        app.resetSelectedShape();
        app.shapeFactory = function () {
            return new Text();
        };
    });
    $('#selectbutton').click(function () {
        app.resetLayout('Select');
        app.shapeFactory = null;
    });

    $('#clearbutton').click(function () {
        self.redoShapes = [];
        app.resetSelectedShape();
        app.clear();
    });
    $('#redobutton').click(function () {
        app.resetSelectedShape();
        app.redo();
    });
    $('#undobutton').click(function () {
        app.resetSelectedShape();
        app.undo();
    });
    $('#loadbutton').click(function () {
        $('#loadOnebutton').removeClass('hidden');
        $('#loadOnebutton').addClass('visible');
        $('#drawingID').removeClass('hidden');
        $('#drawingID').addClass('visible');
        app.shapeFactory = null;

    });
    $('#savebutton').click(function () {
        app.resetSelectedShape();
        app.save();
    });
    $('#loadOnebutton').click(function () {
        app.resetSelectedShape();
        app.loadOne();
    });
    $('#loadAllbutton').click(function () {
        $('#drawingtable').removeClass('hidden');
        $('#drawingtable').addClass('visible');
        app.resetSelectedShape();
        app.loadAll();
    });
    $('#color').change(function () {
        app.resetSelectedShape();
        app.setColor($(this).val());
    });
    $('#lineWidth').change(function () {
        app.resetSelectedShape();
        app.setLineWidth($(this).val());
    });
    $("#font-menu li a").click(function(){
        var selText = $(this).text();
        $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
        app.resetSelectedShape();
        app.setFont(selText);
    });
});
