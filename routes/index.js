const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const CustomError = require('../helpers/custom-error');
const { validatePassword } = require('../helpers/validations');
const auth = require('../middlewares/auth');


router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(validatePassword),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(validatePassword),
  }),
}), login);

router.use('/users', auth, require('./users'));
router.use('/articles', auth, require('./articles'));

router.use('/', (req, res, next) => {
  Promise.reject(CustomError(404, 'Запрашиваемый ресурс не найден'))
    .catch(next);
});

module.exports = router;
