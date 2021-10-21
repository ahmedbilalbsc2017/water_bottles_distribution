const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Stock',
    },
    billing: {
      type: 'string',
    },
    bottleDelivery: {
      type: 'string',
    },
    deliveryBoy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    _id: false,
  }
);

module.exports = orderSchema;
