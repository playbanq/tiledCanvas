var canvas = document.getElementById('tiledCanvas');

TiledCanvas.extend(canvas, 20);
canvas.setSize();
canvas.grid.draw();