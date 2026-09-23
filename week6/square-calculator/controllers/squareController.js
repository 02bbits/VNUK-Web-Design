const Square = require('../models/square');

exports.show = (req, res) => {
  res.render('index', {perimeter: null, area: null});
};

exports.calculate = (req, res) => {
  const square = new Square(Number(req.body.side));
  res.render('index', {perimeter: square.getPerimeter(), area: square.getArea()});
};
