const categoriesRouter = require('express').Router();

const categoriesController = require("../controllers/categories.controller");
const categoriesMiddleware = require("../middlewares/category.middleware");
const productsMiddleware = require("../middlewares/product.middleware");
// const checkRoleMiddleware = require("../middlewares/checkRole.middleware");


categoriesRouter.get('/',
    categoriesController.getAllCategories);

categoriesRouter.get('/:categoryId',
    categoriesController.getCategoryById);

categoriesRouter.post('/',
    // checkRoleMiddleware.checkRole,
    // categoriesMiddleware.checkIfCategoryExistsForCreateCategory,
    categoriesController.createCategory);

categoriesRouter.delete('/:categoryId',
    // checkRoleMiddleware.checkRole,
    categoriesController.deleteCategory);

categoriesRouter.patch('/:categoryId',
    // checkRoleMiddleware.checkRole,
    productsMiddleware.checkImage,
    categoriesController.uploadImage
)


module.exports = categoriesRouter;