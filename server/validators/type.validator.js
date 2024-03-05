const Joi = require('joi');

module.exports = {
    newTypeValidator: Joi.object({
        type: Joi.string().pattern(new RegExp('^[\\sа-щА-ЩЬьЮюЯяЇїІіЄєҐґ\'-]+$')).min(3).max(20).required().messages({
            'string.pattern.base': 'Назва типу повинна бути українською мовою.',
            'string.min': 'Назва типу повинна складатися з 3 і більше символів.',
            'string.max': 'Назва типу повинна містити не більше 20 символів.',
            'string.empty': 'Назва типу є обов\'язковим полем',
        }),
        _category: Joi.string().optional().messages({
            'string.empty': 'Категорія типу є обов\'язковим полем'
        })
    }),

    editTypeValidator: Joi.object({
        type: Joi.string().pattern(new RegExp('^[\\sа-щА-ЩЬьЮюЯяЇїІіЄєҐґ\'-]+$')).min(3).max(20).optional().messages({
            'string.pattern.base': 'Назва типу повинна бути українською мовою.',
            'string.min': 'Назва типу повинна складатися з 3 і більше символів.',
            'string.max': 'Назва типу повинна містити не більше 20 символів.'
        }),
        _category: Joi.string().optional().messages({
            'string.empty': 'Категорія типу не може бути пустим полем!'
        })
    })
}