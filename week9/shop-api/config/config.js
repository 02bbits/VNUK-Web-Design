require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'mysql',
    password: process.env.DB_PASS || 'mysql123',
    database: process.env.DB_NAME || 'shop_db2',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false
  }
};
