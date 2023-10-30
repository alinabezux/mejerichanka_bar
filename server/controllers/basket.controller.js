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
                productsData.push({
                    ...product._doc,
                    quantity: productInBasket.quantity,
                })
            }
            res.json(productsData);
        } catch (e) {
            next(e);
        }
    },

    addToBasket: async (req, res, next) => {
        try {
            let addedProductInBasket ;

            const product = await Product.findById(req.params.productId);

            const productInBasket = await ProductInBasket.findOne({_product: product._id})

            if (productInBasket) {
                addedProductInBasket = await ProductInBasket.findOneAndUpdate(
                    {_product: product},
                    {quantity: productInBasket.quantity + 1},
                    {new: true});
            } else
                addedProductInBasket = await ProductInBasket.create({
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
    },

    changeProductQuantity: async (req, res, next) => {
        try {
            const updatedProductInBasket = await ProductInBasket.findOneAndUpdate({_product: req.params.productId}, {quantity: req.body.quantity}, {new: true});

            res.json(updatedProductInBasket)
        } catch (e) {
            next(e)
        }
    }
}