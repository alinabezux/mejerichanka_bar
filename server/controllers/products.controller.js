const Product = require('../dataBase/models/Product');
const S3Service = require('../services/s3.service')

module.exports = {

    getAllProducts: async (req, res, next) => {
        try {
            let {category, type} = req.query;
            let products;

            if (!category && !type) {
                products = await Product.find({});
            }
            if (category && !type) {
                products = await Product.find({category});
            }
            if (category && type) {
                products = await Product.find({category, type});

            }
            return res.json(products);
        } catch (e) {
            next(e);
        }
    },

    getProductById: async (req, res, next) => {
        try {
            return res.json(req.product);
        } catch (e) {
            next(e);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const product = await Product.create(req.body.product);

            return res.json(product);

        } catch (e) {
            return next(e)
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const newInfo = req.body.product;
            const productId = req.params.productId;

            const updatedProduct = await Product.findByIdAndUpdate(productId, newInfo, {new: true});
            res.status(201).json(updatedProduct);

        } catch (e) {
            next(e)
        }
    },
    uploadImage: async (req, res, next) => {
        try {
            const sendData = await S3Service.uploadPublicFile(req.files.image, 'products', req.params.productId);
            const newProduct = await Product.findByIdAndUpdate(req.params.productId, {image: sendData.Location}, {new: true});

            res.json(newProduct);
        } catch (e) {
            next(e);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            await Product.deleteOne({_id: req.params.productId})
            res.status(204).json('Deleted.');
        } catch (e) {
            next(e)
        }
    },

}
