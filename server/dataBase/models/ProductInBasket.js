const {Schema, model} = require("mongoose");

const productInBasketSchema = new Schema({
    _userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    _product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},

})
module.exports = model('ProductInBasket', productInBasketSchema)