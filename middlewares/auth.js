const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const CustomError = require('../helpers/errors/custom-error');


const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;
  let payload;

  if (!token) {
    throw CustomError(401, 'Необходима авторизация');
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    throw CustomError(401, 'Необходима авторизация');
  }

  req.user = payload;

  return next();
};

module.exports = auth;
