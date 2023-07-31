const categoriesRouter = require('express').Router();

const categoriesController = require("../controllers/categories.controller");
const categoriesMiddleware = require("../middlewares/category.middleware");
// const checkRoleMiddleware = require("../middlewares/checkRole.middleware");


categoriesRouter.get('/',
    categoriesController.getAllCategories);

categoriesRouter.get('/:categoryId',
    categoriesController.getCategoryById);

categoriesRouter.post('/',
    // checkRoleMiddleware.checkRole,
    categoriesMiddleware.checkIfCategoryExistsForCategories,
    categoriesController.createCategory);

categoriesRouter.delete('/:categoryId',
    // checkRoleMiddleware.checkRole,
    categoriesController.deleteCategory);


module.exports = categoriesRouter;