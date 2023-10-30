const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    title: {type: String, required: true, unique: true, maxlength: 32},
    category: {type: String, required: true},
    type: String,
    info: String,
    price: {type: Number, required: true},
    image: String
})

module.exports = model('Product', productSchema);