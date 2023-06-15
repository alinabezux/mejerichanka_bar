const accountRouter = require('express').Router();

const authMiddleware = require("../middlewares/auth.middleware");
const userMiddleware = require("../middlewares/user.middleware");
const usersMiddleware = require("../middlewares/user.middleware");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/users.controller");
const basketController = require('../controllers/basket.controller');

accountRouter.post('/signIn',
    userMiddleware.isNewUserValid,
    userMiddleware.checkIsEmailUnique,
    userController.createUser);

accountRouter.post('/auth/logIn',
    authMiddleware.checkLogInBody,
    userMiddleware.getUserByEmail,
    authController.logIn,
);

accountRouter.post('/auth/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh)

// accountRouter.post('/auth/logOut',
//     authController.logOut);

accountRouter.get('/basket/:userId',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkIfUserExists,
    basketController.getUsersBasket);


module.exports = accountRouter;
