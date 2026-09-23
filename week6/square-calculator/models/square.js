class Square {
  constructor(side) {
    this.side = side;
  }

  getArea() {
    return this.side * this.side;
  }

  getPerimeter() {
    return this.side * 4;
  }
}

module.exports = Square;
