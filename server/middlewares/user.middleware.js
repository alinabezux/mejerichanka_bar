const userValidator = require('../validators/user.validator');
const ApiError = require('../errors/ApiError');
const User = require('../dataBase/models/User');


module.exports = {
    checkIfUserExists: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError(400, 'Неправильний email або пароль.')
            }

            req.user = user;

            next();

        } catch (e) {
            next(e);
        }
    },

    getUserByEmail: async (req, res, next) => {
        try {

            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ApiError(404, 'Неправильний email або пароль.')
            }

            req.user = user;

            next();
        } catch (e) {
            next(e)
        }
    },

    isNewUserValid: async (req, res, next) => {
        try {
            let validate = userValidator.newUserValidator.validate(req.body.user);

            if (validate.error) {
                const errorDetails = validate.error.details[0] || null;

                if (errorDetails) {
                    const isErrorMessage = errorDetails.message || null;
                    const isCustomErrorMessage = errorDetails.context.label || null;
                    const errorMessage = isErrorMessage || isCustomErrorMessage;

                    throw new ApiError(409, errorMessage);
                }
            }

            req.body.user = validate.value;

            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body.user;

            if (!email) {
                throw new ApiError(400, 'Email відсутній');
            }

            const user = await User.findOne({email});

            if (user) {
                throw new ApiError(409, 'Користувач з таким email вже існує.');
            }

            next();
        } catch (e) {
            next(e)
        }
    },

}