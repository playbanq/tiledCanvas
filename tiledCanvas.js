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
    var tileSize = (typeof tileSize === 'number') ? tileSize : 1,
        context = canvas.getContext('2d');

    // Define the canvas object interface 
    var properties = {
        grid: {
            value: {  
                tileSize: tileSize,
                rows: Math.floor(canvas.height/tileSize),
                columns: Math.floor(canvas.width/tileSize),
                top: 0,
                left: 0,
                right: canvas.width,
                bottom: canvas.height,
                offset: {
                    top: 0,
                    left: 0,
                },
                draw: function () {
                    var tileSize = canvas.grid.tileSize,
                        top = canvas.grid.offset.top,
                        left = canvas.grid.offset.left;
                    context.lineWidth = 1;
                    context.strokeStyle = '#ccc';
                    for (var i = 0, y = i * tileSize + 0.5, rows = canvas.grid.rows; 
                        i <= rows; i++, y = i * tileSize + 0.5) {
                        // Draw horizontal lines
                        context.beginPath();
                        context.moveTo(0, y - top);
                        context.lineTo(canvas.width, y - top);
                        context.stroke();
                        for (var j = 0, x = j * tileSize + 0.5, columns = canvas.grid.columns; 
                            j <= columns; j++, x = j * tileSize + 0.5) {
                            // Draw vertical lines
                            context.beginPath();
                            context.moveTo(x - left, 0);
                            context.lineTo(x - left, canvas.height);
                            context.stroke();
                        }
                    }
                },
                drawTile: function (row, column, color) {
                    var tileSize = canvas.grid.tileSize,
                        offsetTop = canvas.grid.offset.top,
                        offsetLeft = canvas.grid.offset.left,
                        x = column * tileSize - offsetLeft + 1,
                        y = row * tileSize - offsetTop + 1;
                        
                    if (x + tileSize >= 0 && x <= canvas.width &&
                        y + tileSize >=0 && y <= canvas.height) {
                        context.fillStyle = color || '#ccc';
                        context.beginPath();
                        context.fillRect(x, y, tileSize - 1, tileSize - 1);
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
                    var width = newWidth || window.innerWidth,
                        height = newHeight || window.innerHeight;
                    canvas.grid.right = canvas.grid.left + width;
                    canvas.grid.bottom = canvas.grid.top + height;
                    canvas.grid.rows = Math.floor(height/canvas.grid.tileSize);
                    canvas.grid.columns = Math.floor(width/canvas.grid.tileSize);
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