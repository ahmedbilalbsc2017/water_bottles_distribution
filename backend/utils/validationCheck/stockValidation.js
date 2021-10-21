const validator = require('validator');

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

const validateStockInput = (data) => {
  let errors = {};
  data.productName = !isEmpty(data.productName) ? data.productName : '';
  data.capacity = !isEmpty(data.capacity) ? data.capacity : '';
  data.quantity = !isEmpty(data.quantity) ? data.quantity : '';
  data.pricePerBottle = !isEmpty(data.pricePerBottle)
    ? data.pricePerBottle
    : '';

  if (validator.isEmpty(data.productName)) {
    errors.productName = 'Product name is required';
  }
  if (validator.isEmpty(data.capacity)) {
    errors.capacity = 'Product capacity is required';
  }
  if (validator.isEmpty(data.quantity)) {
    errors.quantity = 'Quantity must be a number';
  }
  if (validator.isEmpty(data.pricePerBottle)) {
    errors.pricePerBottle = 'Price of a watter bottle must be a number';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateStockInput;
