const express = require('express');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

require('dotenv').config();
require('./config/db');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const sessionSecret = process.env.SESSION_SECRET || 'keyboard cat';
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/products');
  res.redirect('/users/login');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
