/** Creates a tile-based grid and associates it to a canvas element
 * @param {string} id - The ID attribute of an existing canvas element
 * @param {number} width - The desired initial width of the element
 * @param {number} height - The desired initial height of the element
 */
var TiledCanvas = Object.create({}, {
    'extend': {
        value: tiledCanvas
    }
});

function tiledCanvas(canvas, tileSize) {
    // Validate that the canvas parameter is indeed an existing canvas element
    if (canvas.nodeName !== 'CANVAS') {
        console.log('ERROR: The element with id ' + id + ' is not a canvas element.');
        return;
    }

    // Check what parameters were specified, or used the default values
    var tileSize = (typeof tileSize === 'number') ? tileSize : 10,
        context = canvas.getContext('2d'),
        collisionMatrix = [];

    // // Set the canvas width and height
    // canvas.width = width;
    // canvas.height = height;

    // Define the canvas object interface
    var properties = {
        'grid': {
            value: {  
                tileSize: tileSize,
                draw: function () { 
                    context.lineWidth = 1;
                    context.strokeStyle = '#ccc';
                    for (var i = 0, y = i * tileSize + 0.5, rows = Math.floor(canvas.height/tileSize); 
                        i <= rows; i++, y = i * tileSize + 0.5) {
                        // Draw horizontal lines
                        context.beginPath();
                        context.moveTo(0, y);
                        context.lineTo(canvas.width, y);
                        context.stroke();
                        for (var j = 0, x = j * tileSize + 0.5, columns = Math.floor(canvas.width/tileSize); 
                            j <= columns; j++, x = j * tileSize + 0.5) {
                            // Draw vertical lines
                            context.beginPath();
                            context.moveTo(x, 0);
                            context.lineTo(x, canvas.height);
                            context.stroke();
                        }
                    }
                },
                drawSquares: function (color) {
                    context.fillStyle = color || '#ccc';
                    for (var row = 0, rows = Math.floor(canvas.height/tileSize); 
                        row <= rows; row++) {
                        for (var col = 0, columns = Math.floor(canvas.width/tileSize); 
                            col <= columns; col++) {
                            if (collisionMatrix[row][col]) {
                                // Draw square
                                context.beginPath();
                                context.fillRect(col * tileSize + 0.5, row * tileSize + 0.5, tileSize, tileSize);
                                context.stroke();
                            }
                        }
                    }
                }
            }
        },
        'collisionMatrix': {
            value: {
                'get': function () {
                    return collisionMatrix;
                },
                'create': function (collisionMap) {
                    if (typeof collisionMap === 'object') {

                    } else {
                        // Fill the matrix with false values
                        for (var row = 0, rows = Math.floor(canvas.height/tileSize); row <= rows; row++) {
                            collisionMatrix[row] = new Array(columns);
                            for (var col = 0, columns = Math.floor(canvas.width/tileSize); col <= columns; col++) {
                                collisionMatrix[row][col] = Math.random() < 
                                (typeof collisionMap === 'undefined' ? 0 : collisionMap || 0.3);
                            }
                        }
                        return collisionMatrix;
                    }
                },
                'setValue': function (row, column) {
                    if (row <= rows && column <= columns) {
                        collisionMatrix[row][column] = true;
                    }
                },
                'getValue': function (row, column) {
                    if (row <= rows && column <= columns) {
                        return collisionMatrix[row][column];
                    }
                }
            }
        },
        'setSize': {
            value: function (newWidth, newHeight) {
                canvas.width = newWidth || window.innerWidth;
                canvas.height = newHeight || window.innerHeight;
            }
        }
    }

    if (!canvas.extensions) {
        Object.defineProperties(canvas, properties);
    }

    return Object.create({}, properties);
}