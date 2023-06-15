const Basket = require('../dataBase/models/Basket');

module.exports = {
    getUsersBasket: async (req, res, next) => {
        try {
            const {userId} = req.params;
            // console.log(userId);
            const basket = await Basket.findOne({_user: userId});
            console.log(basket);
            res.json(basket.products);
        } catch (e) {
            next(e);
        }
    }
}