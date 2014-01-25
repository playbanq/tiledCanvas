var canvas = new TiledCanvas('tiledCanvas', window.innerWidth, window.innerHeight, 20);
canvas.collisionMatrix.create();
canvas.grid.draw();
canvas.grid.drawSquares();