const accountRouter = require('express').Router();

const authMiddleware = require("../middlewares/auth.middleware");
const userMiddleware = require("../middlewares/user.middleware");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/users.controller");

accountRouter.post('/registration',
    userMiddleware.isNewUserValid,
    userMiddleware.checkIsEmailUnique,
    userController.createUser);

accountRouter.post('/logIn',
    authMiddleware.checkLogInBody,
    userMiddleware.getUserByEmail,
    authController.logIn,);

accountRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);

accountRouter.post('/logOut',
    authMiddleware.checkAccessToken,
    authController.logOut);

module.exports = accountRouter;
