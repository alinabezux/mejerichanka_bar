const productsRouter = require('express').Router();

const productsMiddleware = require('../middlewares/product.middleware');
const checkRoleMiddleware = require("../middlewares/checkRole.middleware");

const productsController = require("../controllers/products.controller");

productsRouter.get('/',
    productsController.getAllProducts);

productsRouter.get('/:productId',
    productsMiddleware.checkIfProductExists,
    productsController.getProductById)

productsRouter.post('/',
    checkRoleMiddleware.checkRole,
    productsMiddleware.checkIfProductExistsForCreateProduct,
    productsMiddleware.isNewProductValid,
    productsController.createProduct);

productsRouter.delete('/:productId',
    checkRoleMiddleware.checkRole,
    productsMiddleware.checkIfProductExists,
    productsController.deleteProduct);

productsRouter.put('/:productId',
    checkRoleMiddleware.checkRole,
    productsMiddleware.isEditProductValid,
    productsController.updateProduct);

productsRouter.patch('/:productId',
    checkRoleMiddleware.checkRole,
    productsMiddleware.checkImage,
    productsController.uploadImage);

module.exports = productsRouter;