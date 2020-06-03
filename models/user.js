const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Unauthorized = require('../helpers/errors/unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'введите email в формате: hello.everybody@yandex.ru',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});


userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильная почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильная почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
