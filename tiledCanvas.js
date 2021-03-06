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
                    var zoom = 1;
                    if (canvas.zoom) {
                        zoom = canvas.zoom.scale;
                        if (typeof zoom !== 'number' || isNaN(zoom)) {
                            zoom = 1;
                        }
                    };

                    var tileSize = canvas.grid.tileSize,
                        offsetTop = canvas.grid.offset.top,
                        offsetLeft = canvas.grid.offset.left,
                        top = Math.floor(offsetTop/tileSize),
                        left = Math.floor(offsetLeft/tileSize),
                        bottom = Math.floor((offsetTop + canvas.height)/tileSize),
                        right = Math.floor((offsetLeft + canvas.width)/tileSize);

                    context.lineWidth = 1;
                    context.strokeStyle = '#ccc';
                    for (var i = top, y = Math.ceil((i * tileSize - offsetTop) * zoom) + 0.5; 
                        i <= bottom; i++, y = Math.ceil((i * tileSize - offsetTop) * zoom) + 0.5) {
                        // Draw horizontal lines
                        context.beginPath();
                        context.moveTo(0, y);
                        context.lineTo(canvas.width, y);
                        context.stroke();
                        for (var j = left, x = Math.ceil((j * tileSize - offsetLeft) * zoom) + 0.5; 
                             j <= right; j++, x = Math.ceil((j * tileSize - offsetLeft) * zoom) + 0.5) {
                            // Draw vertical lines
                            context.beginPath();
                            context.moveTo(x, 0);
                            context.lineTo(x, canvas.height);
                            context.stroke();
                        }
                    }
                },
                drawTile: function (row, column, color) {
                    var zoom = 1;
                    if (canvas.zoom) {
                        zoom = canvas.zoom.scale;
                        if (typeof zoom !== 'number' || isNaN(zoom)) {
                            zoom = 1;
                        }
                    };

                    var tileSize = canvas.grid.tileSize,
                        offsetTop = canvas.grid.offset.top,
                        offsetLeft = canvas.grid.offset.left,
                        x = Math.ceil((column * tileSize - offsetLeft) * zoom) + 1,
                        y = Math.ceil((row * tileSize - offsetTop) * zoom) + 1;

                    if (x + tileSize >= 0 && x <= canvas.width &&
                        y + tileSize >= 0 && y <= canvas.height) {
                        context.fillStyle = color || '#ccc';
                        context.beginPath();
                        context.fillRect(x, y, Math.ceil(tileSize * zoom) - 1, Math.ceil(tileSize * zoom) - 1);
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