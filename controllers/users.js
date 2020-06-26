const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const CustomError = require('../helpers/custom-error');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_DEV } = require('../helpers/dev-config');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.status(201)
      .send({ data: User.clearingInfo(user) }))
    .catch(next);
};


const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV,
        { expiresIn: '7d' },
      );

      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        // sameSite: true,
      })
        .send({ name: user.name }) // для проверки
        .end();
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'cookie has been deleted' });
};


const getUser = (req, res, next) => User
  .findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw CustomError(404, 'Пользователь не найден');
    }
    res.send({ data: User.clearingInfo(user) });
  })
  .catch(next);


module.exports = {
  createUser,
  login,
  logout,
  getUser,
};
