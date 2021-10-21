require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Stock = require('../models/stock');
const Receipt = require('../models/receipt');

const validateRegisterInput = require('../utils/validationCheck/userValidation');

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const role = req.body.role;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const contact = req.body.contact;
  const orderDetails = req.body.orderDetails;

  //check validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json({
      message: 'Validation Failed.',
      errors: errors,
    });
  }

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      name: name,
      role: role,
      email: email,
      password: hashedPw,
      address: address,
      contact: contact,
      orderDetails: orderDetails,
    });
    const result = await user.save();
    // console.log('user created', user);
    res.status(201).json({ message: 'User created!', userId: result._id });
  } catch (err) {
    res.status(500).json({ message: err.message, error: err });
    next(err);
  }
}; //signup

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        message: 'A user with this email could not be found.',
        errors: errors,
      });
    } //user check
    loadedUser = user;
    //password decrypting for comparison
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json({
        message: 'Incorrect password.',
        errors: errors,
      });
    } //password check
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
        role: loadedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
    });
  } catch (err) {
    next(err);
  }
}; //login

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 401;
      throw error;
    }
    return res.status(200).json({
      message: 'Fetch all users route',
      Users: user,
    });
  } catch (err) {
    next(err);
  }
}; //all user

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    const error = new Error('Need valid User ID');
    error.statusCode = 404;
    throw error;
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      message: 'user route',
      Users: user,
    });
  } catch (err) {
    next(err);
  }
}; //get user by id

exports.updateUser = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const userId = req.params.userId;

  if (!userId) {
    const error = new Error('Need valid User ID');
    error.statusCode = 404;
    throw error;
  }

  await User.findByIdAndUpdate(userId, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot update data',
        });
      } else {
        res.status(200).send({
          message: 'Data updated successfully',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error in updating',
        error: err,
      });
    });
}; //updateUser

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    const error = new Error('Need valid User ID');
    error.status = 404;
    throw error;
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    await User.findByIdAndRemove(userId);
    res.status(200).json({ message: 'Product Deleted!' });
  } catch (err) {
    next(err);
  }
}; //updateUser

exports.assignDeliveryBoy = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'User to assign delivery boy must be available',
    });
  }

  const userId = req.params.userId;
  await User.findByIdAndUpdate(userId, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot update customer',
        });
      } else {
        res.status(200).send({
          message: 'Customer assigned delivery boy.',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error in assigning delivery boy',
        error: err,
      });
    });
}; //delivery boy assigning

exports.getUserToDeliveryBoy = async (req, res, next) => {
  try {
    deliveryBoy = req.userId;
    console.log('User ID ', req.userId);
    console.log('Delivery Boy ', deliveryBoy);
    const users = await User.find({
      role: 'Customer',
      ['orderDetails.deliveryBoy']: req.userId,
    }).select('name contact address orderDetails');
    if (!users) {
      const error = new Error('User not found.');
      error.statusCode = 401;
      throw error;
    }

    return res.status(200).json({
      message: 'Fetch all customer route',
      Users: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserByIdToDeliveryBoy = async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    const error = new Error('Need valid User ID');
    error.statusCode = 404;
    throw error;
  }
  try {
    const user = await User.findById(userId).select(
      'name bottleDelivery contact address '
    );
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      message: 'Find customer by id route',
      Users: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.deliveryReport = async (req, res, next) => {
  const customerId = req.query.customerId;
  const prodId = req.query.prodId;
  const regularDeliveredBottle = req.query.regularDeliveredBottle;
  const extraBottleDelivered = req.query.extraBottleDelivered;

  try {
    const Product = await Stock.findById(prodId).select(
      ' productName quantity pricePerBottle'
    );
    const Customer = await User.findById(customerId).select(
      'name contact address orderDetails.deliveryBoy'
    );

    let receipt = await Receipt.findOne({ customer: customerId });

    let totalBill =
      Number(extraBottleDelivered) + Number(regularDeliveredBottle);
    totalBill = totalBill * Product.pricePerBottle;

    if (!receipt) {
      receipt = new Receipt({
        customer: customerId,
        product: prodId,
        quantity: regularDeliveredBottle,
        extraBottle: extraBottleDelivered,
        pricePerBottle: Product.pricePerBottle,
        totalBill: totalBill,
        deliveredBy: Customer.orderDetails.deliveryBoy,
      });

      const result = await receipt.save();
      return res.send({
        message: 'Delivery report.',
        result: result,
      });
    }

    if (receipt) {
      let updatedQty =
        Number(receipt.quantity) + Number(regularDeliveredBottle);
      let updatedExtraBottles =
        Number(receipt.extraBottle) + Number(extraBottleDelivered);
      let updatedBill = Number(receipt.totalBill) + Number(totalBill);

      const data = {
        quantity: updatedQty,
        extraBottle: updatedExtraBottles,
        totalBill: updatedBill,
      };

      // console.log(data);

      const result = await Receipt.findOneAndUpdate(
        { customer: customerId },
        data,
        {
          new: true,
        }
      );

      res.send({
        message: 'Delivery report.',
        result: result,
      });
    }
  } catch (err) {
    next(err);
  }
};
