const ApiError = require('../errors/ApiError');

const authValidator = require('../validators/auth.validator');

const OAuthService = require('../services/OAuth.service');

const OAuth = require('../dataBase/models/OAuth');

module.exports = {
    checkLogInBody: async (req, res, next) => {
        try {
            const validate = authValidator.logInValidator.validate(req.body.user);

            if (validate.error) {
                throw new ApiError(409, 'Неправильний email або пароль.')
            }
            next();

        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const authorizationString = req.get('Authorization');
            console.log(`authorizationString:${authorizationString}`);

            if (!authorizationString) {
                throw new ApiError(401, 'Користувач не авторизований.');
            }

            const accessToken = authorizationString.split(" ")[1]

            console.log(`checkAccessToken:${accessToken}`);

            OAuthService.checkToken(accessToken);

            const tokenInfo = await OAuth.findOne({accessToken});

            console.log(`tokenInfo checkAccessToken:${tokenInfo}`);

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
            const refreshString = req.get('Authorization');

            if (!refreshString) {
                throw new ApiError(401, 'Немає токену.');
            }
            const refreshToken = refreshString.split(" ")[1]
            console.log(`----------------- refreshToken: ${refreshToken}`);

            OAuthService.checkToken(refreshToken, 'refreshToken');
            const tokenInfo = await OAuth.findOne({refreshToken});

            console.log(`tokenInfo middleware refresh: ${tokenInfo}`);

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