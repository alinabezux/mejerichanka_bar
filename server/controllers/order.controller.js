const Product = require("../dataBase/models/Product");
module.exports = {
    createOrder: async (req, res, next) => {
        try {



            res.json('ok');
        } catch (e) {
            next(e);
        }
    }
}