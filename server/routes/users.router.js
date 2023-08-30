const usersRouter = require('express').Router();

const usersMiddleware = require('../middlewares/user.middleware');
const checkRoleMiddleware = require("../middlewares/checkRole.middleware");

const usersController = require('../controllers/users.controller');

usersRouter.get('/',
    checkRoleMiddleware.checkRole,
    usersController.getAllUsers);

usersRouter.get('/:userId',
    checkRoleMiddleware.checkRole,
    usersMiddleware.checkIfUserExists,
    usersController.getUserById);

module.exports = usersRouter;
