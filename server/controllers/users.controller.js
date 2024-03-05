const User = require('../dataBase/models/User');
const OAuthService = require("../services/OAuth.service");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            let {page} = req.query;
            page = page || 1;
            const limit = 10;
            let count;

            const users = await User.find({}).limit(limit).skip((page - 1) * limit);
            count = await User.countDocuments();

            return res.json({
                users,
                count: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await OAuthService.hashPassword(req.body.user.password);

            await User.create({...req.body.user, password: hashPassword});

            res.status(201).json('Користувач зареєстрований.')
        } catch (e) {
            next(e);
        }
    },
}