const {Schema, model, Types} = require('mongoose');

const categorySchema = new Schema({
    category: {type: String, required: true, unique: true, maxlength: 32},
    // types: [
    //     {
    //         type: Schema.Types.ObjectId, ref: 'Type',
    //     }
    // ]
})

module.exports = model('Category', categorySchema);