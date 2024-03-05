const {Schema, model} = require('mongoose');

const newSchema = new Schema({
    image: {type: String, required: true}
});

module.exports = model('New', newSchema)