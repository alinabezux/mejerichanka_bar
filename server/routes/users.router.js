const usersRouter = require('express').Router();

const checkRoleMiddleware = require("../middlewares/checkRole.middleware");

const usersController = require('../controllers/users.controller');

usersRouter.get('/',
    checkRoleMiddleware.checkRole,
    usersController.getAllUsers);


module.exports = usersRouter;
