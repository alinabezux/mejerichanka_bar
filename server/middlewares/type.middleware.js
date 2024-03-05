const Type = require("../dataBase/models/Type");
const ApiError = require("../errors/ApiError");
const typeValidator = require("../validators/type.validator");

module.exports = {
    checkIfTypeExistsForTypes: async (req, res, next) => {
        try {
            if (req.body.type) {
                const typeOfProduct = req.body.type.type;
                const type = await Type.findOne({type: `${typeOfProduct}`});

                if (type) {
                    throw new ApiError(404, `Тип ${typeOfProduct} вже існує в базі даних.`)
                }
            }

            next();

        } catch (e) {
            next(e)
        }
    },
    isNewTypeValid: async (req, res, next) => {
        try {
            let validate = typeValidator.newTypeValidator.validate(req.body.type);
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

            req.body.type = validate.value;

            next()
        } catch (e) {
            next(e);
        }
    },
    isEditTypeValid: async (req, res, next) => {
        try {
            let validate = typeValidator.editTypeValidator.validate(req.body.type);

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

            req.body.type = validate.value;

            next()
        } catch (e) {
            next(e);
        }
    }
}