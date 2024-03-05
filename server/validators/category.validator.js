const Joi = require('joi');

module.exports = {
    newCategoryValidator: Joi.object({
        category: Joi.string().pattern(new RegExp('^[\\sа-щА-ЩЬьЮюЯяЇїІіЄєҐґ\'-]+$')).min(3).max(20).required().messages({
            'string.pattern.base': 'Назва категорії повинна бути українською мовою.',
            'string.min': 'Назва категорії повинна складатися з 3 і більше символів.',
            'string.max': 'Назва категорії повинна містити не більше 20 символів.',
            'string.empty': 'Назва категорії є обов\'язковим полем'
        }),
    }),
    editCategoryValidator: Joi.object({
        category: Joi.string().pattern(new RegExp('^[\\sа-щА-ЩЬьЮюЯяЇїІіЄєҐґ\'-]+$')).min(3).max(20).optional().messages({
            'string.pattern.base': 'Назва категорії повинна бути українською мовою.',
            'string.min': 'Назва категорії повинна складатися з 3 і більше символів.',
            'string.max': 'Назва категорії повинна містити не більше 20 символів.'
        }),
    })
};
