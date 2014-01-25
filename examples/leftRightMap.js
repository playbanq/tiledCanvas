var canvas = document.getElementById('tiledCanvas');
TiledCanvas.extend(canvas, 20);
canvas.setSize();
canvas.collisionMatrix.create(0.2);
canvas.grid.draw();
canvas.grid.drawSquares();