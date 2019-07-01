/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
const { users } = require('../models');

// Current user data
exports.currentUser = (id) => {
  let userData = null;
  users.forEach((user) => {
    if (user.id === id) {
      userData = user;
    }
  });
  return userData;
};

// Restrict access to only agent/admin
exports.checkUserType = (userData, res) => {
  if (userData) {
    if (userData.is_admin === false) {
      return res.status(401).json({
        status: 401,
        error: 'Access denied!',
      });
    }
  } else {
    // User does not exist. Deleted when list was cleared
    return res.status(401).json({
      status: 401,
      error: 'Token is expired, please login again!',
    });
  }
};
