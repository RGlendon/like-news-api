const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
require('dotenv').config();

const { createUser, login } = require('./controllers/users');
const CustomError = require('./helpers/custom-error');
const CelebrateErrHandler = require('./middlewares/celebrate-err-handler');
const CentralErrHandler = require('./middlewares/central-err-handler');
const { validatePassword } = require('./helpers/validations');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');


const { PORT = 3000, NODE_ENV, DB_ADDRESS } = process.env;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://localhost:27017/like-news-dev', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then((status) => console.log(`Сервер успешно подключен к "${status.connections[0].name}" MongoDB. Ресурсы: ${Object.keys(status.models)}`))
  .catch((err) => console.log(`Не удается подключиться к MongoDB. Запустите базу данных. ${err}`));


app.use(requestLogger);


app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(validatePassword),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(validatePassword),
  }),
}), login);

app.use('/users', auth, require('./routes/users'));
app.use('/articles', auth, require('./routes/articles'));

app.use('/', (req, res, next) => {
  Promise.reject(CustomError(404, 'Запрашиваемый ресурс не найден'))
    .catch(next);
});


app.use(errorLogger);

app.use(CelebrateErrHandler);
app.use(CentralErrHandler);


app.listen(PORT, () => {
  console.log(`приложение запущено на порту ${PORT}`);
});
