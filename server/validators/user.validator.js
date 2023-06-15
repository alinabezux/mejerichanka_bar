const Joi = require('joi');
const regexp = require('../configs/regexp.enum');

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(100).required().default(''),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().required(),
        password: Joi.string().regex(regexp.PASSWORD).required(),
        isAdmin: Joi.boolean().optional()
    })
}