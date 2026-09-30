const mongoose = require('mongoose');

const squareSchema = new mongoose.Schema({
    sideLength: { type: Number, required: true },
    perimeter: { type: Number, required: true },
    area: { type: Number, required: true },
});

// Tạo model từ schema
const Square = mongoose.model('Square', squareSchema);

module.exports = Square;
