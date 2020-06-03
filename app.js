const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./helpers/errors/not-found-err');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


mongoose.connect('mongodb://localhost:27017/like-news', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then((status) => console.log(`MongoDB успешно подключен. Ресурсы: ${Object.keys(status.models)}`))
  .catch((err) => console.log(`Не удается подключиться к MongoDB. Запустите базу данных. ${err}`));


app.post('/signup', createUser);
app.post('/signin', login);

app.use('/', (req, res, next) => {
  Promise.reject(new NotFoundError('Запрашиваемый ресурс не найден'))
    .catch(next);
});


app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'MongoError') {
    return res.status(409)
      .send({ message: `пользователь с ${Object.keys(err.keyValue)}: ${Object.values(err.keyValue)} уже существует` });
  }
  if (err.message.startsWith('user validation failed')) {
    return res.status(400)
      .send({ message: `${err.message.replace('user validation failed: ', '')}` });
  }
  // res.send(err);
  return res.status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});


app.listen(PORT, () => {
  console.log(`приложение запущено на порту ${PORT}`);
});
