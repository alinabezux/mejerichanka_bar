const User = require('../dataBase/models/User');
const OAuthService = require("../services/OAuth.service");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            return res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await OAuthService.hashPassword(req.body.user.password);

            await User.create({...req.body.user, password: hashPassword});

            res.status(201).json('User is registered.')
        } catch (e) {
            next(e);
        }
    },
}