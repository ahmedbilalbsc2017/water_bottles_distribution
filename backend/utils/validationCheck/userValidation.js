const validator = require('validator');

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

const validateRegisterInput = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.role = !isEmpty(data.role) ? data.role : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.address.houseNumber = !isEmpty(data.address.houseNumber)
    ? data.address.houseNumber
    : '';
  data.address.street = !isEmpty(data.address.street)
    ? data.address.street
    : '';
  data.address.city = !isEmpty(data.address.city) ? data.address.city : '';
  data.contact = !isEmpty(data.contact) ? data.contact : '';
  //   data.billing = !isEmpty(data.billing) ? data.billing : '';
  //   data.bottleDelivery = !isEmpty(data.bottleDelivery) ? data.bottleDelivery : '';

  if (
    !validator.isLength(data.name, {
      min: 3,
      max: 20,
    })
  ) {
    errors.name = 'Name should be between 3 and 20 characters';
  }
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }
  if (validator.isEmpty(data.role)) {
    errors.role = 'Role is required';
  }
  if (validator.isEmpty(data.email) && !validator.isEmail(data.email)) {
    errors.email = 'Proper email is required';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (
    !validator.isLength(data.password, {
      min: 5,
      max: 20,
    })
  ) {
    errors.password = 'Password should be at least 5 characters';
  }
  if (validator.isEmpty(data.address.houseNumber)) {
    errors.address.houseNumber = 'House number in address is required';
  }
  if (validator.isEmpty(data.address.street)) {
    errors.address.street = 'street in address is required';
  }
  if (validator.isEmpty(data.address.city)) {
    errors.address.city = 'City in address is required';
  }
  if (validator.isEmpty(data.contact)) {
    errors.contact = 'Contact is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
