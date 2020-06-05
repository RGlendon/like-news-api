const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validateUrl, validateDate, validateId } = require('../helpers/validations');

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required().min(2),
    text: Joi.string().required().min(2),
    date: Joi.string().custom(validateDate),
    source: Joi.string().required().min(2),
    link: Joi.string().custom(validateUrl),
    image: Joi.string().custom(validateUrl),
  }),
}), createArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().custom(validateId),
  }),
}), deleteArticle);


module.exports = router;
