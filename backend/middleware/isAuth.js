require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.roleAuthorization = (roles) => async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  const decodedToken = jwt.decode(token);
  try {
    const data = {
      userId: decodedToken.userId,
      roles,
    };
    const foundUser = await User.findById(data.userId);
    if (!foundUser) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }
    if (data.roles.indexOf(decodedToken.role) > -1) {
      req.userId = data.userId;
      return next();
    }
  } catch (error) {
    res.status(400).send('Not authenticated properly');
    return next(error);
  }
};
