const Article = require('../models/article');
const CustomError = require('../helpers/custom-error');


const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const { _id: owner } = req.user;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ data: Article.clearingInfo(article) }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw CustomError(404, 'Статья не найдена');
      }
      if (article.owner.toString() !== req.user._id) {
        throw CustomError(403, 'Вы можете удалять только свои статьи');
      }
      res.send({ data: Article.clearingInfo(article) });
      article.remove();
    })
    .catch(next);
};


module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
