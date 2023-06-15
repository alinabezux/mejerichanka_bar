const OAuthService = require('../services/OAuth.service');
const OAuth = require("../dataBase/models/OAuth");

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const {user, body} = req;

            await OAuthService.comparePasswords(user.password, body.password);

            const tokenPair = OAuthService.generateTokenPair({id: user._id});

            await OAuth.create({_user: user._id, ...tokenPair})

            res.json({user, ...tokenPair});
        } catch (e) {
            next(e);
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user} = req.tokenInfo;

            await OAuth.deleteOne({refreshToken});

            const tokenPair = OAuthService.generateTokenPair({id: _user});

            await OAuth.create({_user, ...tokenPair})

            res.status(201).json({_user, ...tokenPair});
        } catch (e) {
            next(e);
        }
    },

    // logOut: async (req, res, next) => {
    //     try {
    //         const {accessToken} = req.tokenInfo;
    //
    //         await OAuth.deleteOne({accessToken});
    //
    //         res.sendStatus(204);
    //     } catch (e) {
    //         next(e);
    //     }
    // },
}


