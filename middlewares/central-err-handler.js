const CentralErrHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.name === 'MongoError') {
    return res.status(409)
      .send({ message: `пользователь с ${Object.keys(err.keyValue)}: ${Object.values(err.keyValue)} уже существует` });
  }

  if (err.message.includes('validation failed')) {
    const errorBody = err.errors[Object.keys(err.errors)[0]].properties;
    const errorType = errorBody.type;
    const errorField = errorBody.path;
    const errorLimit = errorBody.minlength || errorBody.maxlength || null;

    let strErr = '';

    switch (errorType) {
      case 'minlength':
        strErr = `длина должна быть не менее ${errorLimit} символов`;
        break;
      case 'maxlength':
        strErr = `длина должна быть не более ${errorLimit} символов`;
        break;
      case 'required':
        strErr = 'обязательно для заполнения';
        break;
      case 'user defined':
        strErr = errorBody.message;
        break;
      default:
        strErr = 'ошибка не учтена';
    }

    return res.status(400)
      .send({ message: `Некорректные данные в поле ${errorField}: ${strErr}` });
  }

  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  return next();
};

module.exports = CentralErrHandler;
