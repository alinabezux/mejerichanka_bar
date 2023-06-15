const {Schema, model, Types} = require('mongoose');

const productSchema = new Schema({
        title: {type: String, required: true},
        category: {type: String, required: true},
        type: String,
        weight: {type: String, required: true},
        description: String,
        price: {type: Number, required: true},
        image: String
    },
    {timestamps: true}
)

module.exports = model('Product', productSchema);