const Joi = require('joi');

module.exports = {
    newProductValidator: Joi.object({
        title: Joi.string().pattern(new RegExp('^[\\sА-Яа-яЁёЇїІіҐґЄє]+$')).min(3).max(20).required().messages({
            'string.pattern.base': 'Назва продукту повинна бути українською мовою.',
            'string.empty': 'Назва продукту є обов\'язковим полем',
        }),
        category: Joi.string().min(5).max(20).required().messages({
            'string.empty': 'Категорія продукту є обов\'язковим полем'
        }),
        type: Joi.string().min(5).max(20).optional(),
        price: Joi.number().integer().min(10).max(5000).required().messages({
            'number.min': 'Ціна не може бути менше 10 грн.',
            'number.base': 'Ціна є обов\'язковим полем'
        })
    }),
    editProductValidator: Joi.object({
        title: Joi.string().pattern(new RegExp('^[\\sА-Яа-яЁёЇїІіҐґЄє]+$')).min(5).max(30).optional().messages({
            'string.pattern.base': 'Назва продукту повинна бути українською мовою.',
        }),
        price: Joi.number().integer().min(10).max(5000).optional().messages({
            'number.min': 'Ціна не може бути менше 10 грн.'
        })
    })
}