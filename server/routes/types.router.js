const typesRouter = require('express').Router();

const typesMiddleware = require("../middlewares/type.middleware")
const checkRoleMiddleware = require('../middlewares/checkRole.middleware');

const typesController = require("../controllers/types.controller");
const categoriesController = require("../controllers/categories.controller");

typesRouter.get('/',
    typesController.getAllTypes);

typesRouter.post('/',
    checkRoleMiddleware.checkRole,
    typesMiddleware.isNewTypeValid,
    typesMiddleware.checkIfTypeExistsForTypes,
    typesController.createType);

typesRouter.put('/:typeId',
    checkRoleMiddleware.checkRole,
    typesMiddleware.isEditTypeValid,
    typesController.updateType);

typesRouter.delete('/:typeId',
    checkRoleMiddleware.checkRole,
    typesController.deleteType);

module.exports = typesRouter;
