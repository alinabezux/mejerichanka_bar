const orderRouter = require('express').Router();

const authMiddleware = require("../middlewares/auth.middleware");
const usersMiddleware = require("../middlewares/user.middleware");
const basketController = require("../controllers/basket.controller");

//створити замовлення
orderRouter.post('/:userId',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkIfUserExists,
    basketController.addToBasket
);

//переглядати всі замовлення для адміна

//редагувати статуси для адміна

module.exports = orderRouter;