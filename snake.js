function Snake() {
  this.head = createVector(0, 0);
  this.velocity = createVector(1, 0);
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    if (this.head.x === pos.x && this.head.y === pos.y) {
      this.total++;
      return true;
    }
    return false;
  }

  this.dir = function(x, y) {
    if (x === -this.velocity.x && y === -this.velocity.y) {
      return;
    }
    this.velocity.set(x, y);
  }

  this.update = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    if (this.total > 0) {
      this.tail[this.total - 1] = this.head.copy();
    }

    this.head.add(p5.Vector.mult(this.velocity, scl));
    this.wrap();
  }

  this.checkCollision = function() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.head.x === this.tail[i].x && this.head.y === this.tail[i].y) {
        return true;
      }
    }
    return false;
  }

  this.onSnake = function(pos) {
    if (this.head.x === pos.x && this.head.y === pos.y) {
      return true;
    }
    for (let i = 0; i < this.tail.length; i++) {
      if (this.tail[i].x === pos.x && this.tail[i].y === pos.y) {
        return true;
      }
    }
    return false;
  }

  this.wrap = function() {
    if (this.head.x >= width) {
      this.head.x = 0;
    } else if (this.head.x < 0) {
      this.head.x = width - scl;
    }

    if (this.head.y >= height) {
      this.head.y = 0;
    } else if (this.head.y < 0) {
      this.head.y = height - scl;
    }
  }

  this.show = function() {
    noStroke();
    fill(0, 200, 0);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl, 4);
    }

    fill(180, 255, 180);
    rect(this.head.x, this.head.y, scl, scl, 4);
  }
}