/** Creates a tile-based grid and associates it to a canvas element
 * @param {string} id - The ID attribute of an existing canvas element
 * @param {number} width - The desired initial width of the element
 * @param {number} height - The desired initial height of the element
 */
var TiledCanvas = function (id, width, height, tileSize) {
    // Validate that the id provided refers to an existing canvas element
    var canvas = document.getElementById(id);
    if (!canvas) {
        console.log('ERROR: The element with id "' + id + '" was not found in the DOM.');
        return
    } else if (canvas.nodeName !== 'CANVAS') {
        console.log('ERROR: The element with id ' + id + ' is not a canvas element.');
        return;
    }

    // Check what parameters were specified, or used the default values
    var width = (typeof width === 'number') ? width : 300,
        height = (typeof height === 'number') ? height : 150,
        tileSize = (typeof tileSize === 'number') ? tileSize : 10,
        rows = Math.floor(height/tileSize),
        columns = Math.floor(width/tileSize),
        context = canvas.getContext('2d'),
        collisionMatrix;

    // Set the canvas width and height
    canvas.width = width;
    canvas.height = height;

    // Define the canvas object interface
    var properties = {
        'grid': {
            value: {  
                tileSize: tileSize,
                rows: rows,
                columns: columns 
            }
        },
        'collisionMatrix': {
            value: {
                'get': function () {
                    return collisionMatrix;
                },
                'create': function (collisionMap) {
                    if (collisionMap) {

                    } else {
                        // Fill the matrix with false values
                        var matrixRows = Array.apply(null, new Array(rows)).map(Boolean.prototype.valueOf, false);
                        collisionMatrix = Array.apply(null, new Array(columns)).map(Array.prototype.valueOf, matrixRows);
                        collisionMatrix;
                    }
                },
                'setValue': function (row, column, value) {
                    if (row <= rows && column <= columns) {
                        collisionMatrix[row][column] = (typeof value === 'boolean') ? value : false;
                    }
                }
            }
        },
        'drawGrid': {
            value: function () { 
                context.lineWidth = 1;
                context.strokeStyle = '#ccc';
                for (var i = 0, y = i * tileSize + 0.5; i <= rows; i++, y = i * tileSize + 0.5) {
                    // Draw horizontal lines
                    context.beginPath();
                    context.moveTo(0, y);
                    context.lineTo(width, y);
                    context.stroke();
                    for (var j = 0, x = j * tileSize + 0.5; j <= columns; j++, x = j * tileSize + 0.5) {
                        // Draw vertical lines
                        context.beginPath();
                        context.moveTo(x, 0);
                        context.lineTo(x, height);
                        context.stroke();
                    }
                }
            }
        },
        'drawSquares': {
            value: function () {

            }
        },
        'setSize': {
            value: function (newWidth, newHeight) {
                width = newWidth;
                height = newHeight;
                canvas.width = newWidth;
                canvas.height = newHeight;
            }
        }
    }

    canvas = Object.create({}, properties);

    return canvas;
}