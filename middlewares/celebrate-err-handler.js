const { isCelebrate } = require('celebrate');

const CustomError = require('../helpers/custom-error');


const celebrateError = (err, req, res, next) => {
  let strErr = '';

  if (isCelebrate(err)) {
    const errorField = err.joi.details[0].context.key;
    const errorType = err.joi.details[0].type;
    const errorLimit = err.joi.details[0].context.limit || null;

    switch (errorType) {
      case 'string.min':
        strErr = `длина должна быть не менее ${errorLimit} символов`;
        break;
      case 'string.max':
        strErr = `длина должна быть не более ${errorLimit} символов`;
        break;
      case 'any.required':
        strErr = 'обязательно для заполнения';
        break;
      case 'string.empty':
        strErr = 'поле не может быть пустым';
        break;
      case 'string.email':
        strErr = 'введите email в формате: hello.everybody@yandex.ru';
        break;
      case 'any.custom':
        strErr = err.joi.details[0].message.replace(/.*failed custom validation because /, '');
        break;
      default:
        strErr = 'ошибка не учтена';
    }

    throw CustomError(400, `Некорректные данные в поле ${errorField}: ${strErr}`);
  }

  return next(err);
};

module.exports = celebrateError;
