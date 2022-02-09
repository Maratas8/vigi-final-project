const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('./config');

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const user = jwt.verify(token, jwtSecretKey);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = { isLoggedIn };
