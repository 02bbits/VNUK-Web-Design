const Product = require('../models/Product');
const Category = require('../models/Category');
exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const { category, sort, maxPrice, q } = req.query;

    const filter = {};

    if (category) filter.categoryId = category;
    if (maxPrice) filter.price = { $lte: parseInt(maxPrice) };
    if (q) filter.name = { $regex: q, $options: 'i' };
    const sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;

    const [products, categories, total] = await Promise.all([
      Product.find(filter).populate('categoryId').sort(sortOption).skip(skip).limit(limit),
      Category.find(),
      Product.countDocuments(filter)
    ]);
    const totalPages = Math.ceil(total / limit) || 1;

    res.render('products/index', { title: 'Sản phẩm', products, categories, currentPage: page, totalPages, query: req.query, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.newForm = async (req, res) => {
  const categories = await Category.find();
  res.render('products/new', { title: 'Thêm sản phẩm', categories });
};
exports.create = async (req, res) => {
  await Product.create(req.body);
  res.redirect('/products');
};

exports.detail = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('categoryId');
  res.render('products/detail', { title: 'Chi tiết', product });
};
exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const categories = await Category.find();
  res.render('products/edit', { title: 'Sửa', product, categories });
};
exports.update = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/products');
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
