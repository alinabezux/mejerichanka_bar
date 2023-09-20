const {Schema, model} = require("mongoose");

const productInBasketSchema = new Schema({
    _userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    _product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, required: true, default: 1}
})
module.exports = model('ProductInBasket', productInBasketSchema)