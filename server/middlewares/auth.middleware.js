const ApiError = require('../errors/ApiError');

const authValidator = require('../validators/auth.validator');

const OAuthService = require('../services/OAuth.service');

const OAuth = require('../dataBase/models/OAuth');

module.exports = {
    checkLogInBody: async (req, res, next) => {
        try {
            const validate = authValidator.logInValidator.validate(req.body.user);

            if (validate.error) {
                throw new ApiError(400,'Неправильний email або пароль.')
            }
            next();

        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');
            if (!accessToken) {
                throw new ApiError(401, 'Користувач не авторизований.');
            }

            OAuthService.checkToken(accessToken);

            const tokenInfo = await OAuth.findOne({accessToken});

            if (!tokenInfo) {
                throw new ApiError(401, 'Токен не дійсний.')
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new ApiError(401, 'Немає токену.');
            }

            OAuthService.checkToken(refreshToken, 'refreshToken');
            const tokenInfo = await OAuth.findOne({refreshToken});

            if (!tokenInfo) {
                throw new ApiError(401, 'Токен не дійсний.')
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },
}