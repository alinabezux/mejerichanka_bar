const Joi = require('joi');

const regexp = require('../configs/regexp.enum');

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(100).required(),
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().required().messages({
            'string.pattern.base': 'Email повинен складатися з англійських літер та містити "@" і "."',
            'any.required': 'Email є обов\'язковим полем',
        }),
        password: Joi.string().regex(regexp.PASSWORD).required().messages({
            'string.pattern.base': 'Ваш пароль повинен містити не менше 8-ми символів,літери великого та малого регістру та цифри.',
            'any.required': 'Пароль є обов\'язковим полем',
        }),
        isAdmin: Joi.boolean().optional()
    })
}