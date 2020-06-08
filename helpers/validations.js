const { isURL } = require('validator');
const mongoose = require('mongoose');


const validatePassword = (value) => {
  const regExp = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*/;
  if (!regExp.test(value)) {
    throw new Error('Пароль должен содержать как минимун одну прописную и заглавную буквы, цифру. Минимальная длина 8 символов');
  }
  return value;
};

const validateUrl = (value) => {
  if (!isURL(value)) {
    throw new Error('введите URL в формате: http://my-site.ru/...');
  }
  return value;
};

const validateDate = (value) => {
  const regExp = /\d{4}/;
  if (!regExp.test(value)) {
    throw new Error('некорректная дата');
  }
  return value;
};

const validateId = (value) => {
  // console.log(mongoose.Types.ObjectId.isValid(value))
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error('некорректный id статьи');
  }
  return value;
};


module.exports = {
  validatePassword,
  validateUrl,
  validateDate,
  validateId,
};
