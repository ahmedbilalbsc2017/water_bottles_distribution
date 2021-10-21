require('dotenv').config();

const Stock = require('../models/stock');
const validateStockInput = require('../utils/validationCheck/stockValidation');

exports.addProduct = async (req, res, next) => {
  const { errors, isValid } = validateStockInput(req.body);
  if (!isValid) {
    return res.status(400).json({
      message: 'Validation Failed.',
      errors: errors,
    });
  }

  try {
    const stock = new Stock({
      productName: req.body.productName,
      capacity: req.body.capacity,
      quantity: req.body.quantity,
      pricePerBottle: req.body.pricePerBottle,
      creator: req.userId,
    });
    const result = await stock.save();
    // console.log(result);
    res.status(200).json({
      message: 'Product added successfully',
      productId: result._id,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.prodId;
  if (!prodId) {
    const error = new Error('Need valid products ID');
    error.statusCode = 404;
    throw error;
  }
  const stock = await Stock.find();

  try {
    if (!stock) {
      const error = new Error('Could not find stock.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Stock fetched.', stock: stock });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.prodId;
  let stock;

  if (prodId) {
    if (!prodId) {
      const error = new Error('Need valid products ID');
      error.statusCode = 404;
      throw error;
    }
    stock = await Stock.findById(prodId);
  } else {
    stock = await Stock.find();
  }

  try {
    if (!stock) {
      const error = new Error('Could not find stock.');
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ message: 'Stock fetched.', stock: stock });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const prodId = req.params.prodId;
  if (!prodId) {
    const error = new Error('Need valid products ID');
    error.statusCode = 404;
    throw error;
  }
  const stock = await Stock.findById(prodId);
  try {
    if (!stock) {
      const error = new Error('Could not find stock.');
      error.statusCode = 404;
      throw error;
    }

    stock.productName = req.body.productName;
    stock.capacity = req.body.capacity;
    stock.quantity = req.body.quantity;
    stock.pricePerBottle = req.body.pricePerBottle;
    // stock.creator = req.userId;
    stock.creator = {
      userName: 'Ahmed Bilal',
    };

    const updatedResult = await stock.save();
    res.status(200).json({
      message: 'Update product in stock route',
      updatedProduct: updatedResult._id,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const prodId = req.params.prodId;
  if (!prodId) {
    const error = new Error('Need valid products ID');
    error.statusCode = 404;
    throw error;
  }
  try {
    const prod = await Stock.findById(prodId);
    if (!prod) {
      const error = new Error('Product not found.');
      error.statusCode = 404;
      throw error;
    }
    await Stock.findByIdAndRemove(prodId);
    res.status(200).json({ message: 'Product Deleted!' });
  } catch (err) {
    next(err);
  }
};
