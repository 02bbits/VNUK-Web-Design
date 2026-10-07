const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true, min: 0, max: 1, default: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true, enum: ['New product', 'Top product'] },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
