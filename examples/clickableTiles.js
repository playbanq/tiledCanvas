var canvas = document.getElementById('tiledCanvas'),
    context = canvas.getContext('2d'),
    previous = { row: 0, column: 0 };

ClickableCanvas.extend(canvas);
TiledCanvas.extend(canvas, 20);
canvas.setSize();
canvas.collisionMatrix.create(0.1);

canvas.grid.draw();
canvas.grid.drawSquares();

canvas.onClick(function (x, y) {
    var tile = canvas.collisionMatrix.check(x, y);
    context.beginPath();
    context.fillStyle = (tile.collision) ? '#fff' : '#ccc';
    context.fillRect(tile.left + 1, tile.top + 1, tile.size - 1, tile.size - 1);
    context.stroke();
    canvas.collisionMatrix.toggle(tile.row, tile.column);
});

// OnMouseMove validation
// if (tile.row === previous.row && tile.column == previous.column) { return }
// else { previous.row = tile.row; previous.column = tile.column; }