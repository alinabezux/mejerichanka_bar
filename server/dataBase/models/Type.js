const {Schema, model} = require('mongoose');

const typeSchema = new Schema({
    type: {type: String, required: true, unique: true},
})

module.exports = model('Type', typeSchema);