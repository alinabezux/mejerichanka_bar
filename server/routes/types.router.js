const typesRouter = require('express').Router();

const typesController = require("../controllers/types.controller");
const checkRoleMiddleware = require('../middlewares/checkRole.middleware');

typesRouter.get('/',
    checkRoleMiddleware.checkRole,
    typesController.getAllTypes);

typesRouter.post('/new',
    checkRoleMiddleware.checkRole,
    typesController.createType);

typesRouter.delete('/delete/:typeId',
    checkRoleMiddleware.checkRole,
    typesController.deleteType);

module.exports = typesRouter;
