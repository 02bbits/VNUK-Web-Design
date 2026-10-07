require('dotenv').config();

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('../model/productModel');

const imageDirectory = path.join(__dirname, '..', 'image', 'product');
const makeProduct = (name, price, discount, category, imageFile) => ({
    name,
    price,
    discount,
    category,
    image: `/images/products/${encodeURIComponent(imageFile)}`,
    imageFile,
});

const seedProducts = [
    makeProduct('Raspberry Mousse', 220000, 0.1, 'New product', 'raspberry.jpg'),
    makeProduct('Matcha Mousse Cake', 280000, 0.08, 'New product', 'MATCHA-MOUSSE.jpg'),
    makeProduct('Mango Mousse Cake', 260000, 0, 'New product', 'mango-mousse-cake.jpg'),
    makeProduct('Strawberry Delight', 295000, 0.12, 'New product', 'strawberry-delight636102445035635173.jpg'),
    makeProduct('Chocolate Fruit Cake', 320000, 0.1, 'New product', 'chocolate-fruit636098975917921990.jpg'),
    makeProduct('Fruit Cake', 310000, 0, 'New product', 'Fruit-Cake.jpg'),
    makeProduct('Caramel Pudding', 55000, 0, 'New product', 'Caramen-pudding636099031482099583.jpg'),
    makeProduct('Peach Cake', 280000, 0.05, 'New product', 'Peach-Cake_3300.jpg'),
    makeProduct('Birthday Cream Cake', 450000, 0, 'Top product', 'banh kem sinh nhat.jpg'),
    makeProduct('Durian Pancake', 180000, 0.05, 'Top product', '1430967449-pancake-sau-rieng-6.jpg'),
    makeProduct('Macaron Selection', 190000, 0.1, 'Top product', 'Macaron9.jpg'),
    makeProduct('Chewy Cream Puffs', 150000, 0, 'Top product', 'He-Thong-Banh-Su-Singapore-Chewy-Junior.jpg'),
    makeProduct('Fresh Fruit Cake', 340000, 0.05, 'Top product', 'banhtraicay.jpg'),
    makeProduct('Chocolate Crepe', 240000, 0, 'Top product', 'crepe-chocolate.jpg'),
    makeProduct('Strawberry Cake', 300000, 0.05, 'Top product', 'banhkem-dau.jpg'),
    makeProduct('Durian Cream Puffs', 180000, 0.12, 'Top product', '50020041-combo-20-banh-su-que-pho-mai-9.jpg'),
];

async function seed() {
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not configured.');
    }

    const missingImages = seedProducts
        .filter(({ imageFile }) => !fs.existsSync(path.join(imageDirectory, imageFile)))
        .map(({ imageFile }) => imageFile);

    if (missingImages.length > 0) {
        throw new Error(`Missing product images: ${missingImages.join(', ')}`);
    }

    await mongoose.connect(process.env.MONGO_URI);
    const operations = seedProducts.map(({ imageFile, ...product }) => ({
        updateOne: {
            filter: { name: product.name },
            update: { $setOnInsert: product },
            upsert: true,
        },
    }));

    const result = await Product.bulkWrite(operations);
    const [newProductCount, topProductCount] = await Promise.all([
        Product.countDocuments({ category: 'New product' }),
        Product.countDocuments({ category: 'Top product' }),
    ]);

    console.log(`Added ${result.upsertedCount} products.`);
    console.log(`New Products: ${newProductCount}; Top Products: ${topProductCount}`);
}

seed()
    .catch((error) => {
        console.error('Unable to seed products:', error.message);
        process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());