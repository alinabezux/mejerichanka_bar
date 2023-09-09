const ApiError = require("../errors/ApiError");
const OAuthService = require("../services/OAuth.service");
const User = require('../dataBase/models/User');

module.exports = {
    checkRole: async (req, res, next) => {
        try {
            const authorizationString = req.get('Authorization');

            if (!authorizationString) {
                throw new ApiError(401, 'Користувач не авторизований.')
            }
            const accessToken = authorizationString.split(" ")[1]
            const decoded = OAuthService.checkToken(accessToken);
            const user = await User.findById(decoded.id);

            if (user.isAdmin !== true) {
                throw new ApiError(403, 'Немає доступу.')
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}