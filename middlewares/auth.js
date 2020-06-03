const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { Unauthorized } = require('../helpers/errors/unauthorized');


const auth = (req, res, next) => {
  const { jwt: token } = req.cookies;
  let payload;

  if (!token) {
    throw new Unauthorized('Необходима авторизация');
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    throw new Unauthorized('Необходима авторизация');
  }

  req.user = payload;

  return next();
};

module.exports = auth;
