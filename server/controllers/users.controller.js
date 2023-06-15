const User = require('../dataBase/models/User');
const Basket = require('../dataBase/models/Basket');

const OAuthService = require("../services/OAuth.service");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e)
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await OAuthService.hashPassword(req.body.password);

            const user = await User.create({...req.body, password: hashPassword});

            await Basket.create({_user: user._id});

            res.status(201).json('The user is registered.')
        } catch (e) {
            next(e);
        }
    },
}