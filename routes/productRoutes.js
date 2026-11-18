const express = require('express');
const ctrl = require('../controllers/productController');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

// NOTE: static routes must come BEFORE '/:id', otherwise "low-stock" is treated as an id
router.get('/low-stock', ctrl.getLowStock);
router.get('/summary', ctrl.getCategorySummary);

router.route('/').get(ctrl.getProducts).post(ctrl.createProduct);

router
  .route('/:id')
  .get(validateObjectId, ctrl.getProductById)
  .put(validateObjectId, ctrl.updateProduct)
  .delete(validateObjectId, ctrl.deleteProduct);

router.patch('/:id/stock', validateObjectId, ctrl.adjustStock);

module.exports = router;
