const express = require('express');
const router = express.Router();
const squareController = require('../controllers/squareController');

router.get('/', squareController.show);
router.post('/calculate', squareController.calculate);

module.exports = router;
