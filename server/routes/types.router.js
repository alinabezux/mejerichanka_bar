const typesRouter = require('express').Router();

const typesMiddleware = require("../middlewares/type.middleware")
const checkRoleMiddleware = require('../middlewares/checkRole.middleware');

const typesController = require("../controllers/types.controller");

typesRouter.get('/',
    typesController.getAllTypes);

typesRouter.post('/',
    checkRoleMiddleware.checkRole,
    typesMiddleware.checkIfTypeExistsForTypes,
    typesController.createType);

typesRouter.delete('/:typeId',
    checkRoleMiddleware.checkRole,
    typesController.deleteType);

module.exports = typesRouter;
