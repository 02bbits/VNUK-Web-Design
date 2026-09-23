const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/rectangleRoutes');
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server run at: http://localhost:${port}`);
});
