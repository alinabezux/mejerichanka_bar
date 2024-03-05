const router = require('express').Router();

const productsRouter = require("./products.router");
const categoriesRouter = require("./categories.router");
const typesRouter = require("./types.router");
const usersRouter = require("./users.router");
const accountRouter = require("./account.router");
const basketRouter = require("./basket.router");
const orderRouter = require("./order.router");
const newsRouter = require('./news.router');

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/types', typesRouter);
router.use('/users', usersRouter)
router.use('/account', accountRouter);
router.use('/basket', basketRouter);
router.use('/order', orderRouter);
router.use('/news', newsRouter);

module.exports = router;