const basketRouter = require('express').Router();

const authMiddleware = require("../middlewares/auth.middleware");
const usersMiddleware = require("../middlewares/user.middleware");
const basketController = require("../controllers/basket.controller");

//корзина певного юзера
basketRouter.get('/:userId',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkIfUserExists,
    basketController.getUsersBasket);

basketRouter.post('/:userId/:productId',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkIfUserExists,
    basketController.addToBasket
);

basketRouter.delete('/:userId/:productId',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkIfUserExists,
    basketController.deleteFromBasket
);


module.exports = basketRouter;
