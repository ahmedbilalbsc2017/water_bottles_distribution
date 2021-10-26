const express = require('express');

const authController = require('../controllers/user');
const isAuth = require('../middleware/isAuth');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

//Admin Routes
router.get(
  '/getUser',
  isAuth.roleAuthorization(['Admin']),
  authController.getUser
);

//isAuth.roleAuthorization['Admin', 'Delivery Boy', 'Customer']

router.get(
  '/getUser/:userId',
  isAuth.roleAuthorization(['Admin']),
  authController.getUserById
);
router.patch(
  '/updateUser/:userId',
  isAuth.roleAuthorization(['Admin']),
  authController.updateUser
);
router.delete(
  '/deleteUser/:userId',
  isAuth.roleAuthorization(['Admin']),
  authController.deleteUser
);

router.patch(
  '/assigningDeliveryBoy/:userId',
  isAuth.roleAuthorization(['Admin']),
  authController.assignDeliveryBoy
);

//Delivery Boy Routes
router.get(
  '/getCustomer',
  isAuth.roleAuthorization(['Delivery Boy']),
  authController.getUserToDeliveryBoy
);

router.get(
  '/deliveryReport',
  isAuth.roleAuthorization(['Admin', 'Delivery Boy']),
  authController.deliveryReport
);

router.get(
  '/billing',
  isAuth.roleAuthorization(['Admin', 'Delivery Boy', 'Customer']),
  authController.getReceipt
);
router.get(
  '/getCustomer/:userId',
  isAuth.roleAuthorization(['Delivery Boy']),
  authController.getUserByIdToDeliveryBoy
);

//Customer routes

module.exports = router;
