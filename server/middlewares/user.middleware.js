const userValidator = require('../validators/user.validator');
const ApiError = require('../errors/ApiError');
const User = require('../dataBase/models/User');


module.exports = {

    checkIfUserExists: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError(404, `User with Id ${userId} doesn't exists.`)
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
                throw new ApiError(404, `User with email ${email} doesn't exists.`)
            }

            req.user = user;

            next();
        } catch (e) {
            next(e)
        }
    },

    isNewUserValid: async (req, res, next) => {
        try {
            let validate = userValidator.newUserValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message);
            }

            req.body = validate.value;

            next()
        } catch (e) {
            next(e)
        }
    },
    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                throw new ApiError(400, 'Email not present');
            }

            const user = await User.findOne({email});

            if (user) {
                throw new ApiError(409, 'User with this email already exists');
            }

            next();
        } catch (e) {
            next(e)
        }
    },

}