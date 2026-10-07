const Product = require('../model/productModel');
const mongoose = require('mongoose');

exports.home = async (req, res, next) => {
    try {
        const [newProducts, topProducts, products] = await Promise.all([
            Product.find({ category: 'New product' }),
            Product.find({ category: 'Top product' }),
            Product.find().sort({ _id: -1 }),
        ]);
        res.render('index', { newProducts, topProducts, products });
    } catch (error) {
        next(error);
    }
};

exports.search = async (req, res, next) => {
    const searchQuery = String(req.query.q || '').trim();
    const requestedPage = Number.parseInt(req.query.page, 10) || 1;
    const pageSize = 8;

    try {
        const searchFilter = searchQuery
            ? { name: { $regex: searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } }
            : { _id: null };
        const totalResults = await Product.countDocuments(searchFilter);
        const totalPages = Math.ceil(totalResults / pageSize);
        const currentPage = totalPages ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;
        const results = await Product.find(searchFilter)
            .sort({ _id: -1 })
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize);

        res.render('search', {
            results,
            searchQuery,
            currentPage,
            totalPages,
            totalResults,
        });
    } catch (error) {
        next(error);
    }
};

exports.productDetail = async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).send('Product not found');
    }

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id },
        }).limit(3);

        res.render('product', { product, relatedProducts });
    } catch (error) {
        next(error);
    }
};

exports.about = (req, res) => {
    res.render('about'); // render views/about.ejs
};
exports.contacts = (req, res) => {
    res.render('contacts'); // render views/contacts.ejs
};
