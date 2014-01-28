/** Creates a tile-based grid and extends a canvas element with the related methods
 * @param {object} canvas - The canvas element object obtained from document.getElementById
 * @param {number} tileSize - The size of the tiles of the grid
 * @returns {object} - An object containing the methods used to extend the initial canvas object
 */
var TiledCanvas = Object.create({}, {
    'extend': {
        value: tiledCanvas
    }
});

function tiledCanvas(canvas, tileSize) {
    // Validate that the canvas parameter is indeed an existing canvas element
    if (canvas.nodeName !== 'CANVAS') {
        console.log('ERROR: The element provided is not a canvas element.');
        return;
    }

    // Check what parameters were specified, or used the default values
    tileSize = tileSize || canvas.tileSize;
    var tileSize = (typeof tileSize === 'number') ? tileSize : 10,
        context = canvas.getContext('2d');

    // Define the canvas object interface 
    var properties = {
        grid: {
            value: {  
                tileSize: tileSize,
                rows: Math.floor(canvas.height/tileSize),
                columns: Math.floor(canvas.width/tileSize),
                draw: function () { 
                    context.lineWidth = 1;
                    context.strokeStyle = '#ccc';
                    for (var i = 0, y = i * tileSize + 0.5, rows = canvas.grid.rows; 
                        i <= rows; i++, y = i * tileSize + 0.5) {
                        // Draw horizontal lines
                        context.beginPath();
                        context.moveTo(0, y);
                        context.lineTo(canvas.width, y);
                        context.stroke();
                        for (var j = 0, x = j * tileSize + 0.5, columns = canvas.grid.columns; 
                            j <= columns; j++, x = j * tileSize + 0.5) {
                            // Draw vertical lines
                            context.beginPath();
                            context.moveTo(x, 0);
                            context.lineTo(x, canvas.height);
                            context.stroke();
                        }
                    }
                },
                drawTile: function (row, column, color) {
                    if (row <= canvas.grid.rows && column <= canvas.grid.columns) {
                        var tileSize = canvas.grid.tileSize;
                        context.fillStyle = color || '#ccc';
                        context.beginPath();
                        context.fillRect(column * tileSize + 1, row * tileSize + 1, tileSize - 1, tileSize - 1);
                        context.stroke();
                    }
                },
                getTile: function (x, y, offset) {
                    return {
                        row: Math.floor(y/canvas.grid.tileSize),
                        column: Math.floor(x/canvas.grid.tileSize)
                    };
                },
                setSize: function (newWidth, newHeight) {
                    canvas.grid.rows = Math.floor((newHeight || window.innerWidth)/canvas.grid.tileSize);
                    canvas.grid.columns = Math.floor((newWidth || window.innerWidth)/canvas.grid.tileSize);
                }
            }
        },
        setSize: {
            writable: true,
            value: function (newWidth, newHeight) {
                canvas.width = newWidth || window.innerWidth;
                canvas.height = newHeight || window.innerHeight;
            }
        }
    }
    
    Object.defineProperties(canvas, properties);
    
    return Object.create({}, properties);
}