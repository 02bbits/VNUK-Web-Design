const Product = require('../model/productModel');

const productFields = (body) => ({
  name: body.name.trim(),
  price: Number(body.price),
  discount: Number(body.discount || 0) / 100,
  category: body.category,
});

exports.create = async (req, res, next) => {
  try {
    await Product.create({
      ...productFields(req.body),
      image: `/images/products/${req.file.filename}`,
    });
    res.redirect('/#product-management');
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const changes = productFields(req.body);
    if (req.file) {
      changes.image = `/images/products/${req.file.filename}`;
    }
    await Product.findByIdAndUpdate(req.params.id, changes, {
      runValidators: true,
    });
    res.redirect('/#product-management');
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/#product-management');
  } catch (error) {
    next(error);
  }
};
