const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const productRouter = require('./routes/products');
app.use('/products', productRouter);

app.listen(port, () => {
    console.log(`Server run at: http://localhost:${port}`);
});
