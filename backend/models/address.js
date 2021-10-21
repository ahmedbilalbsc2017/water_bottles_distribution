const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adressSchema = new Schema(
  {
    houseNumber: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

module.exports = adressSchema;
