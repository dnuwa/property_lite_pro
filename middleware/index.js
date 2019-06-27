const jwt = require('jsonwebtoken');
const config = require('../config');

// eslint-disable-next-line consistent-return
exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
  if (!token) {
    return res.status(401).json({ status: 401, message: 'No token provided.' });
  }
  // eslint-disable-next-line consistent-return
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: 401, message: 'Failed to authenticate token.' });
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};

// Generate auth token
// eslint-disable-next-line arrow-parens
exports.token = id => {
  const token = jwt.sign({ id }, config.secret, { expiresIn: '24h' });

  return token;
};
