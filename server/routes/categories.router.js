const categoriesRouter = require('express').Router();

const categoriesMiddleware = require("../middlewares/category.middleware");
const productsMiddleware = require("../middlewares/product.middleware");
const checkRoleMiddleware = require("../middlewares/checkRole.middleware");

const categoriesController = require("../controllers/categories.controller");

categoriesRouter.get('/',
    categoriesController.getAllCategories);

categoriesRouter.get('/:categoryId',
    categoriesController.getCategoryById);

categoriesRouter.post('/',
    checkRoleMiddleware.checkRole,
    categoriesMiddleware.isNewCategoryValid,
    categoriesMiddleware.checkIfCategoryExistsForCreateCategory,
    categoriesController.createCategory);

categoriesRouter.delete('/:categoryId',
    checkRoleMiddleware.checkRole,
    categoriesController.deleteCategory);

categoriesRouter.put('/:categoryId',
    checkRoleMiddleware.checkRole,
    categoriesMiddleware.isEditCategoryValid,
    categoriesController.updateCategory);

categoriesRouter.patch('/:categoryId',
    checkRoleMiddleware.checkRole,
    categoriesController.uploadImage);

module.exports = categoriesRouter;