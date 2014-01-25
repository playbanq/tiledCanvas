var canvas = document.getElementById('tiledCanvas'),
    context = canvas.getContext('2d');

TiledCanvas.extend(canvas, 20);
canvas.setSize();
canvas.grid.setSize();
canvas.grid.draw();

var tileSize = canvas.grid.tileSize;
context.fillStyle = '#ccc';

for (var row = 0, rows = canvas.grid.rows; row <= rows; row++) {
    for (var col = 0, columns = canvas.grid.columns; col <= columns; col++) {
        if (Math.random() < 0.3) {
            canvas.grid.drawTile(row, col);
        }
    }
}


