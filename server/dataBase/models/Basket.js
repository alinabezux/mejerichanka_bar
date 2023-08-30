const {Schema, model} = require('mongoose');

const basketSchema = new Schema({
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    products: [{type: Schema.Types.ObjectId, ref: 'ProductInBasket'}],
})

module.exports = model('Basket', basketSchema)

