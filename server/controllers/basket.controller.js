const Product = require('../dataBase/models/Product')
const ProductInBasket = require('../dataBase/models/ProductInBasket');

module.exports = {
    getUsersBasket: async (req, res, next) => {
        try {
            const productsData = [];
            const {userId} = req.params;

            const productsInBasket = await ProductInBasket.find({_userId: userId})

            for (const productInBasket of productsInBasket) {
                const product = await Product.findById(productInBasket._product)
                productsData.push(product)
            }
            res.json(productsData);
        } catch (e) {
            next(e);
        }
    },

    addToBasket: async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.productId);
            const addedProductInBasket = await ProductInBasket.create({
                _product: product,
                _userId: req.params.userId,
            });

            res.json(addedProductInBasket)

        } catch (e) {
            next(e)
        }
    },

    deleteFromBasket: async (req, res, next) => {
        try {
            await ProductInBasket.deleteOne({_product: req.params.productId});

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    }
}