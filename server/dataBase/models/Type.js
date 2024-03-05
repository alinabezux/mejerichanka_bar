const {Schema, model} = require('mongoose');

const typeSchema = new Schema({
    type: {type: String, required: true, unique: true},
    _category: {type: Schema.Types.ObjectId, ref: 'Category', required: true}
})

module.exports = model('Type', typeSchema);