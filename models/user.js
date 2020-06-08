const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const CustomError = require('../helpers/custom-error');

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


function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw CustomError(401, 'Неправильная почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw CustomError(401, 'Неправильная почта или пароль');
          }
          return user;
        });
    });
}

function clearingInfo(user) {
  user = user.toObject();
  delete user._id;
  return user;
}

userSchema.statics.findUserByCredentials = findUserByCredentials;
userSchema.statics.clearingInfo = clearingInfo;

module.exports = mongoose.model('user', userSchema);
