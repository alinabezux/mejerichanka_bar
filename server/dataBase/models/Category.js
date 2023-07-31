const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    category: {type: String, required: true, unique: true, maxlength: 32},
    image: String
})

module.exports = model('Category', categorySchema);