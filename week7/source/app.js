const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const pageRoutes = require('./routes/pageRoutes');
const indexRoute = require('./routes/index');

const app = express();
const PORT = 3000;

// Kích hoạt public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images/products', express.static(path.join(__dirname, 'image/product')));
app.use(express.urlencoded({ extended: true }));

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sử dụng routes
pageRoutes(app);
indexRoute(app);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server chạy tại http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to MongoDB:', error.message);
        process.exitCode = 1;
    });
