const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();

const celebrateErrHandler = require('./middlewares/celebrate-err-handler');
const centralErrHandler = require('./middlewares/central-err-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_ADDRESS_DEV } = require('./helpers/dev-config');
const allowCors = require('./middlewares/allowCors');


const { PORT = 4000, NODE_ENV, DB_ADDRESS } = process.env;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : DB_ADDRESS_DEV, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then((status) => console.log(`Сервер успешно подключен к "${status.connections[0].name}" MongoDB. Ресурсы: ${Object.keys(status.models)}`))
  .catch((err) => console.log(`Не удается подключиться к MongoDB. Запустите базу данных. ${err}`));


app.use(requestLogger);
// app.use(allowCors);
app.use('/v1/', require('./routes'));

app.use(errorLogger);
app.use(celebrateErrHandler);
app.use(centralErrHandler);


app.listen(PORT, () => {
  console.log(`приложение запущено на порту ${PORT}`);
});
