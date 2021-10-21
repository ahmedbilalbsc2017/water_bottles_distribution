const express = require('express');
const router = express.Router();

const stockController = require('../controllers/stock');
const isAuth = require('../middleware/isAuth');

router.get(
  '/getProduct',
  isAuth.roleAuthorization(['Admin', 'Delivery Boy', 'Customer']),
  stockController.getProduct
);
router.get(
  '/getProductById/:prodId',
  isAuth.roleAuthorization(['Admin', 'Delivery Boy', 'Customer']),
  stockController.getProduct
);

router.post(
  '/addProduct',
  isAuth.roleAuthorization(['Admin']),
  stockController.addProduct
);
router.patch(
  '/updateProduct/:prodId',
  isAuth.roleAuthorization(['Admin']),
  stockController.updateProduct
);
router.delete(
  '/deleteProduct/:prodId',
  isAuth.roleAuthorization(['Admin']),
  stockController.deleteProduct
);

module.exports = router;
