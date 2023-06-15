const ApiError = require("../errors/ApiError");
const OAuthService = require("../services/OAuth.service");
const User = require('../dataBase/models/User');
const OAuth = require('../dataBase/models/OAuth');

module.exports = {
    checkRole: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new ApiError(401, 'Немає токену.')
            }
            const decoded = OAuthService.checkToken(accessToken, 'accessToken');
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