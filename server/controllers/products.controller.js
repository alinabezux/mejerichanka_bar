const uuid = require('uuid');
const path = require('path');

const Product = require('../dataBase/models/Product');

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
            const product = await Product.create(req.body);

            return res.status(201).json(product);

        } catch (e) {
            next(e)
        }
    },

    uploadImage: async (req, res, next) => {
        try {
            const {image} = req.files;
            const fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, '..', 'static', fileName));

            const uploadedImage = await Product.findByIdAndUpdate(req.product._id, {image: fileName}, {new: true});

            res.status(201).json(uploadedImage);
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

    updateProduct: async (req, res, next) => {
        try {
            const newInfo = req.body;
            const productId = req.params.productId;

            const updatedProduct = await Product.findByIdAndUpdate(productId, newInfo, {new: true});
            res.status(201).json(updatedProduct);

        } catch (e) {
            next(e)
        }
    }
}
