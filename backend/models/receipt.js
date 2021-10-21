const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Stock',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  extraBottle: {
    type: Number,
    default: 0,
  },
  pricePerBottle: {
    type: String,
    required: true,
  },
  totalBill: {
    type: String,
    required: true,
  },
  deliveredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Receipt', receiptSchema);
