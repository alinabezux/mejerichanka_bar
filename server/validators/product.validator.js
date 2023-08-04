const Joi = require('joi');

module.exports = {
    newProductValidator: Joi.object({
        title: Joi.string().pattern(new RegExp('^[\u0410-\u042F][\u0430-\u044F\u0410-\u042F]*$')).min(3).max(20).required(),
        category: Joi.string().min(5).max(20).required(),
        type: Joi.string().min(5).max(20),
        price: Joi.number().integer().min(10).max(5000).required()
    }),
    editProductValidator: Joi.object({
        title: Joi.string().min(5).max(20).required(),
        category: Joi.string().min(5).max(20).optional(),
        type: Joi.string().min(5).max(20),
        price: Joi.number().integer().min(10).max(5000).required()
    })
}