const ApiError = require("../errors/ApiError");
const Product = require('../dataBase/models/Product');
const productValidator = require('../validators/product.validator');

const {IMAGE_MAX_SIZE, IMAGE_MIMETYPES} = require("../configs/fileUpload.configs");
const Category = require("../dataBase/models/Category");

module.exports = {
    checkIfProductExists: async (req, res, next) => {
        try {
            const {productId} = req.params;

            const product = await Product.findById(productId);

            if (!product) {
                throw new ApiError(404, `Продукт з Id ${productId} не існує.`)
            }

            req.product = product;

            next();

        } catch (e) {
            next(e);
        }
    },
    isNewProductValid: async (req, res, next) => {
        try {
            let validate = productValidator.newProductValidator.validate(req.body.product);
            if (validate.error) {
                const errorDetails = validate.error.details[0] || null;
                console.log(errorDetails);

                if (errorDetails) {
                    const isErrorMessage = errorDetails.message || null;
                    const isCustomErrorMessage = errorDetails.context.label || null;
                    const errorMessage = isErrorMessage || isCustomErrorMessage;

                    throw new ApiError(409, errorMessage);
                }
            }

            req.body.product = validate.value;

            next()
        } catch (e) {
            next(e);
        }
    },
    checkIfProductExistsForCreateProduct: async (req, res, next) => {
        try {
            const product = req.body.product.title;

            const find = await Product.findOne({title: `${product}`});

            if (find) {
                throw new ApiError(404, `Продукт ${product} вже існує в базі даних.`)
            }

            next();

        } catch (e) {
            next(e);
        }
    },
    isEditProductValid: async (req, res, next) => {
        try {
            let validate = productValidator.editProductValidator.validate(req.body.product);

            if (validate.error) {
                const errorDetails = validate.error.details[0] || null;
                console.log(errorDetails);

                if (errorDetails) {
                    const isErrorMessage = errorDetails.message || null;
                    const isCustomErrorMessage = errorDetails.context.label || null;
                    const errorMessage = isErrorMessage || isCustomErrorMessage;

                    throw new ApiError(409, errorMessage);
                }
            }


            req.body.product = validate.value;

            next()
        } catch (e) {
            next(e);
        }
    },
    checkImage:
        async (req, res, next) => {
            try {
                if (!req.files) {
                    throw new ApiError(403, 'There file to upload.');
                }

                const {name, size, mimetype} = req.files.image;

                if (size > IMAGE_MAX_SIZE) {
                    throw new ApiError(400, `File ${name} is too big.`,);
                }

                if (!IMAGE_MIMETYPES.includes(mimetype)) {
                    throw new ApiError(400, `File ${name} has invalid format.`);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
}