const Category = require("../dataBase/models/Category");
const ApiError = require("../errors/ApiError");
const categoryValidator = require("../validators/category.validator");


module.exports = {
    checkIfCategoryExistsForCreateCategory: async (req, res, next) => {
        try {
            const categoryOfProduct = req.body.category.category;

            const category = await Category.findOne({category: `${categoryOfProduct}`});

            if (category) {
                throw new ApiError(404,`Категорія ${categoryOfProduct} вже існує в базі даних.`)
            }

            next();

        } catch (e) {
            next(e);
        }
    },
    isNewCategoryValid: async (req, res, next) => {
        try {
            let validate = categoryValidator.newCategoryValidator.validate(req.body.category);
            console.log(validate);
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

            req.body.category = validate.value;

            next()
        } catch (e) {
            next(e);
        }
    },
    isEditCategoryValid: async (req, res, next) => {
        try {
            let validate = categoryValidator.editCategoryValidator.validate(req.body.category);

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

            req.body.category = validate.value;

            next()
        } catch (e) {
            next(e);
        }
    }

}