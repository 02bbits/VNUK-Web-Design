require('dotenv').config();

const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const categories = ['Electronics', 'Accessories', 'Stationery'];

const products = [
  { name: 'Wireless Mouse', price: 24.99, stock: 35, description: 'Compact wireless mouse with adjustable DPI.', category: 'Electronics' },
  { name: 'Mechanical Keyboard', price: 79.99, stock: 18, description: 'Tenkeyless mechanical keyboard with tactile switches.', category: 'Electronics' },
  { name: 'USB-C Hub', price: 39.5, stock: 22, description: 'Seven-port hub for USB-C laptops.', category: 'Accessories' },
  { name: 'Laptop Stand', price: 32, stock: 14, description: 'Adjustable aluminum stand for desk setups.', category: 'Accessories' },
  { name: 'Notebook Set', price: 12.75, stock: 50, description: 'Set of three ruled notebooks.', category: 'Stationery' },
  { name: 'Desk Planner', price: 16, stock: 27, description: 'Undated weekly planner for your desk.', category: 'Stationery' }
];

const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'demo', password: 'demo123' }
];

async function seedDatabase() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shop_auth');

  try {
    const categoryIds = new Map();

    for (const name of categories) {
      const category = await Category.findOneAndUpdate(
        { name },
        { $setOnInsert: { name } },
        { upsert: true, returnDocument: 'after' }
      );
      categoryIds.set(name, category._id);
    }

    for (const { category, ...product } of products) {
      await Product.findOneAndUpdate(
        { name: product.name },
        { $set: { ...product, categoryId: categoryIds.get(category) } },
        { upsert: true, returnDocument: 'after' }
      );
    }

    for (const user of users) {
      if (!(await User.exists({ username: user.username }))) {
        await User.create(user);
      }
    }

    console.log(`Seeded ${categories.length} categories, ${products.length} products, and checked ${users.length} users.`);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error('Database seeding failed:', error);
  process.exitCode = 1;
});