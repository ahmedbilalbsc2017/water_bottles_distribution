const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    productName: {
      type: 'string',
      required: true,
    },
    capacity: {
      type: String,
      default: '5 Ltr',
    },
    quantity: {
      type: String,
      required: true,
    },
    pricePerBottle: {
      type: String,
      required: true,
    },
    // creator: {
    //   type: Object,
    //   required: true,
    // },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Stock', stockSchema);
