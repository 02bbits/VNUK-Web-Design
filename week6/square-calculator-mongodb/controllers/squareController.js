const Square = require('../models/square');

// Controller để hiển thị form
exports.showForm = (req, res) => {
    res.render('index', { perimeter: null, area: null });
};

// Controller để tính chu vi và diện tích và lưu vào MongoDB
exports.calculateSquare = async (req, res) => {
    const { sideLength } = req.body;

    const perimeter = 4 * sideLength;
    const area = sideLength * sideLength;

    // Tạo mới hình vuông và lưu vào MongoDB
    const square = new Square({ sideLength, perimeter, area });
    await square.save();

    res.render('index', { perimeter, area });
};
