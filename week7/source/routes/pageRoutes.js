const controller = require('../controllers/pageController');

module.exports = (app) => {
    app.get('/about', controller.about);
    app.get('/contacts', controller.contacts);
};
