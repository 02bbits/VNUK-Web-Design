const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const pageController = require('../controllers/pageController');
const productController = require('../controllers/productController');

const uploadDirectory = path.join(__dirname, '..', 'image', 'product');
fs.mkdirSync(uploadDirectory, { recursive: true });

const upload = multer({
    storage: multer.diskStorage({
        destination: uploadDirectory,
        filename: (req, file, callback) => {
            callback(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`);
        },
    }),
    fileFilter: (req, file, callback) => {
        callback(null, file.mimetype.startsWith('image/'));
    },
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = (app) => {
    app.get('/', pageController.home);
    app.get('/search', pageController.search);
    app.get('/products/:id', pageController.productDetail);
    app.post('/products', upload.single('image'), productController.create);
    app.post('/products/:id', upload.single('image'), productController.update);
    app.post('/products/:id/delete', productController.remove);
};
