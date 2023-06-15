const categoriesRouter = require('express').Router();

const categoriesController = require("../controllers/categories.controller");

const checkRoleMiddleware = require("../middlewares/checkRole.middleware");


categoriesRouter.get('/',
    categoriesController.getAllCategories);

categoriesRouter.get('/:categoryId',
    categoriesController.getCategoryById);

categoriesRouter.post('/new',
    checkRoleMiddleware.checkRole,
    categoriesController.createCategory);

categoriesRouter.delete('/delete/:categoryId',
    checkRoleMiddleware.checkRole,
    categoriesController.deleteCategory);


module.exports = categoriesRouter;