const Order = require('../dataBase/models/Order')
const ProductInBasket = require("../dataBase/models/ProductInBasket");
const Product = require("../dataBase/models/Product");


module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const products = [];
            const {userId} = req.params;
            let total = 0;

            const productsInBasket = await ProductInBasket.find({_userId: userId})

            for (const productInBasket of productsInBasket) {
                const product = await Product.findById(productInBasket._product)
                products.push(`${product.title} `)
                total += product.price
            }

            const order = await Order.create({
                ...req.body.order, _user: userId,
                orderItems: products, totalPrice: total + 50
            });

            await ProductInBasket.deleteMany({_userId: userId})

            res.json(order);
        } catch (e) {
            next(e);
        }
    },

    getAllOrders: async (req, res, next) => {
        try {
            const orders = await Order.find({});

            res.json(orders);
        } catch (e) {
            next(e);
        }
    },

    updateOrderStatus: async (req, res, next) => {
        try {
            const newStatus = req.body.status;
            console.log(newStatus);

            const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, {status: newStatus}, {new: true});

            res.json(updatedOrder);
        } catch (e) {
            next(e);
        }
    }


}