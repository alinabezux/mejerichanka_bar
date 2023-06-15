const {Schema, model, Types} = require('mongoose');

const categorySchema = new Schema({
    category: {type: String, required: true, unique: true, maxlength: 32,}
})

module.exports = model('Category', categorySchema);