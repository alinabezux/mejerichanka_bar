const Product = require('../dataBase/models/Product');
const S3Service = require('../services/s3.service')
const Category = require("../dataBase/models/Category");

module.exports = {

    getAllProducts: async (req, res, next) => {
        try {
            let {category, type, page = 1, isGettingAll} = req.query;
            const limit = 10;
            let products;
            let count;

            if (JSON.parse(isGettingAll)) {
                products = await Product.find({})

                return res.json({products});
            }

            if (!category && !type) {
                products = await Product.find({}).limit(limit).skip((page - 1) * limit);
                count = await Product.countDocuments();
            }
            if (category && !type) {
                products = await Product.find({category}).limit(limit).skip((page - 1) * limit);
                count = await Product.countDocuments({category});
            }
            if (category && type) {
                products = await Product.find({category, type}).limit(limit).skip((page - 1) * limit);
                count = await Product.countDocuments({category, type});
            }

            return res.json({
                products,
                count: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
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

            const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, newInfo, {new: true});
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

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },

}
