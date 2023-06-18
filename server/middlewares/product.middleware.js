const ApiError = require("../errors/ApiError");
const Product = require('../dataBase/models/Product');
const productValidator = require('../validators/product.validator');

const {IMAGE_MAX_SIZE, IMAGE_MIMETYPES} = require("../configs/fileUpload.configs");

module.exports = {
    checkIfProductExists: async (req, res, next) => {
        try {
            const {productId} = req.params;

            const product = await Product.findById(productId);

            if (!product) {
                throw new ApiError(404, `Product with Id ${productId} doesn't exists.`)
            }

            req.product = product;

            next();

        } catch (e) {
            next(e);
        }
    },
    isNewProductValid: async (req, res, next) => {
        try {
            let validate = productValidator.newProductValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }

            req.body = validate.value;

            next()
        } catch (e) {
            next(e);
        }
    },
    isEditProductValid: async (req, res, next) => {
        try {
            let validate = productValidator.editProductValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }

            req.body = validate.value;

            next()
        } catch (e) {
            next(e);
        }
    },
    checkImage: async (req, res, next) => {
        try {
            if (!req.files) {
                throw new ApiError(404, 'There is no file to upload.');
            }

            const filesToUpload = Object.values(req.files);

            for (const file of filesToUpload) {
                const {name, size, mimetype} = file;

                if (size > IMAGE_MAX_SIZE) {
                    throw new ApiError(400, `File ${name} is too big.`,);
                }

                if (!IMAGE_MIMETYPES.includes(mimetype)) {
                    throw new ApiError(400, `File ${name} has invalid format.`);
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }


}