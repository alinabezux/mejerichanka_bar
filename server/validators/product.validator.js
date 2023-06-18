const Joi = require('joi');

module.exports = {
    newProductValidator: Joi.object({
        title: Joi.string().min(5).max(20).required(),
        category: Joi.string().min(5).max(20).required(),
        type: Joi.string().min(5).max(20),
        weight: Joi.string().min(2).max(7).required(),
        description: Joi.string().min(15).max(100),
        price: Joi.number().integer().min(20).max(5000).required()
    }),
    editProductValidator: Joi.object({
        title: Joi.string().min(5).max(20).optional(),
        category: Joi.string().min(5).max(20).optional(),
        type: Joi.string().min(5).max(20),
        weight: Joi.string().min(2).max(7).optional(),
        description: Joi.string().min(15).max(100).optional(),
        price: Joi.number().integer().min(20).max(5000).optional()
    })
}