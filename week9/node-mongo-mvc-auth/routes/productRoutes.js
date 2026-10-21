const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

const { requireLogin } = require('../middleware/auth');
router.use(requireLogin);

router.get('/', productCtrl.index);
router.post('/new', productCtrl.newForm);
router.get('/new', productCtrl.create);
router.get('/:id', productCtrl.detail);
router.get('/edit/:id', productCtrl.editForm);
router.post('/edit/:id', productCtrl.update);
router.get('/delete/:id', productCtrl.delete);
module.exports = router;
