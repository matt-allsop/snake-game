let snake;
const scl = 20; 
let food; 
let score = 0;
let gameOver = false;

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent('sketch-holder');
  canvas.addClass('border');
  canvas.addClass('border-4');
  canvas.addClass('border-secondary');
  canvas.addClass('shadow');
  frameRate(10);
  snake = new Snake();
  pickLocation();
}

function draw() {
  background(16);
  drawGrid();

  if (!gameOver) {
    snake.update();
    if (snake.checkCollision()) {
      gameOver = true;
    }
    if (snake.eat(food)) {
      score++;
      pickLocation();
    }
  }

  snake.show();
  drawFood();
  drawScore();

  if (gameOver) {
    drawGameOver();
  }
}

function drawGrid() {
  stroke(48); 
  strokeWeight(1);
  for (let x = 0; x <= width; x += scl) {
    line(x, 0, x, height);
  }
  for (let y = 0; y <= height; y += scl) {
    line(0, y, width, y);
  }
}

function drawFood() {
  noStroke();
  fill(255, 80, 90);
  rect(food.x, food.y, scl, scl, 4);
}

function drawScore() {
  noStroke();
  fill(255);
  textSize(18);
  textAlign(LEFT, TOP);
  text(`Score: ${score}`, 10, 10);
}

function drawGameOver() {
  fill(255, 120, 120);
  textSize(36);
  textAlign(CENTER, CENTER);
  text('Game Over', width / 2, height / 2 - 20);
  textSize(16);
  text('Press any arrow key to restart', width / 2, height / 2 + 20);
}

function pickLocation() {
  const cols = floor(width / scl);
  const rows = floor(height / scl);

  do {
    const x = floor(random(cols)) * scl;
    const y = floor(random(rows)) * scl;
    food = createVector(x, y);
  } while (snake.onSnake(food));
}

function resetGame() {
  snake = new Snake();
  score = 0;
  gameOver = false;
  pickLocation();
}

function keyPressed() {
  if (keyCode !== UP_ARROW && keyCode !== DOWN_ARROW && keyCode !== LEFT_ARROW && keyCode !== RIGHT_ARROW) {
    return;
  }

  if (gameOver) {
    resetGame();
  }

  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake .dir(1, 0);
  }
}
