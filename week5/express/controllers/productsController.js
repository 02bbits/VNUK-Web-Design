const products = [
  { id: 1, name: 'Laptop', price: 1500 },
  { id: 2, name: 'Điện thoại', price: 800 },
  { id: 3, name: 'Tai nghe', price: 100 },
];

exports.getProducts = (req, res) => {
  res.render('products', { products });
};

exports.getProductById = (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.send(`<h1>${product.name}</h1><p>Cost: $${product.price}</p>`);
  } else {
    res.send('<h1>No Product Found</h1>');
  }
};
