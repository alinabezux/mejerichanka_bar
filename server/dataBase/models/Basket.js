const {Schema, model} = require('mongoose');

const productInBasketSchema = new Schema({
    _product: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number, default: 1},
    price: {type: Number, required: true},

})

module.exports = model('ProductInBasket', productInBasketSchema)

const basketSchema = new Schema({
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    products: [productInBasketSchema]
})

module.exports = model('Basket', basketSchema)