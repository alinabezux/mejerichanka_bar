const newsRouter = require('express').Router();
const newsController = require('../controllers/news.controller');
const checkRoleMiddleware = require("../middlewares/checkRole.middleware");
const productsMiddleware = require("../middlewares/product.middleware");

newsRouter.get('/',
    newsController.getAllNews);

newsRouter.post('/',
    checkRoleMiddleware.checkRole,
    productsMiddleware.checkImage,
    newsController.createNew);

newsRouter.delete('/:newId',
    checkRoleMiddleware.checkRole,
    newsController.deleteNew);


module.exports = newsRouter;