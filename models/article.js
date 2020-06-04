const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'введите URL в формате: http://my-site.ru/...',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'введите URL в формате: http://my-site.ru/...',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  // owner: {
  //   type: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'user',
  //   }],
  //   default: [],
  //   select: false,
  // },
});

module.exports = mongoose.model('article', articleSchema);
