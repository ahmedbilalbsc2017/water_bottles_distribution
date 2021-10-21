const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = require('./address');
const orderSchema = require('./order');

const userSchema = new Schema({
  name: {
    type: 'string',
    required: true,
  },
  role: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  address: {
    type: addressSchema,
  },
  contact: {
    type: 'string',
    required: true,
  },
  orderDetails: {
    type: orderSchema,
  },
});

module.exports = mongoose.model('User', userSchema);
