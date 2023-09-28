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
                products.push(`${product.title} - ${productInBasket.quantity} шт.`)
                total += product.price
            }

            if (req.body.order.shipping === 'Доставка кур\'єром') {
                total += 50
            }

            const order = await Order.create({
                ...req.body.order, _user: userId,
                orderItems: products, totalPrice: total
            });

            await ProductInBasket.deleteMany({_userId: userId})

            res.json(order);
        } catch (e) {
            next(e);
        }
    },

    getAllOrders: async (req, res, next) => {
        try {
            let {page} = req.query;
            page = page || 1;
            const limit = 5;
            let count;

            const orders = await Order.find({}).limit(limit).skip((page - 1) * limit);
            count = await Order.countDocuments();

            res.json({
                orders,
                count: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
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