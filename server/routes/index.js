const router = require('express').Router();

const productsRouter = require("./products.router");
const categoriesRouter = require("./categories.router");
const typesRouter = require("./types.router");
const usersRouter = require("./users.router");

router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/types', typesRouter);
router.use('/users', usersRouter)

module.exports = router;