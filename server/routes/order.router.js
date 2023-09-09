const orderRouter = require('express').Router();

const authMiddleware = require("../middlewares/auth.middleware");
const usersMiddleware = require("../middlewares/user.middleware");
const orderController = require("../controllers/order.controller");
const checkRoleMiddleware = require("../middlewares/checkRole.middleware");

//створити замовлення
orderRouter.post('/:userId',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkIfUserExists,
    orderController.createOrder);

//переглядати всі замовлення для адміна
orderRouter.get('/',
    checkRoleMiddleware.checkRole,
    orderController.getAllOrders);

//редагувати статуси для адміна
orderRouter.patch('/:orderId',
    checkRoleMiddleware.checkRole,
    orderController.updateOrderStatus);

module.exports = orderRouter;