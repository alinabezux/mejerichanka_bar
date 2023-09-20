import Joi from 'joi'

const productValidator = {
    newProductValidator: Joi.object({
        title: Joi.string().pattern(new RegExp('^[\\sА-Яа-яЁёЇїІіҐґЄє]+$')).min(3).max(20).required().messages({
            'string.pattern.base': 'Назва продукту повинна бути українською мовою.',
            'string.min': 'Назва продукту повинна складатися з 3 і більше символів.',
            'string.max': 'Назва продукту повинна містити не більше 20 символів.',
            'string.empty': 'Назва продукту є обов\'язковим полем!',
        }),
        category: Joi.string().min(5).max(20).messages({
            'string.empty': 'Категорія продукту є обов\'язковим полем!'
        }),
        type: Joi.string().min(5).max(20).optional(),
        price: Joi.number().integer().min(10).max(5000).required().messages({
            'number.min': 'Ціна не може бути менше 10 грн.',
            'number.max': 'Ціна не може бути більше 5000 грн.',
            'number.base': 'Ціна  є обов\'язковим полем!'
        })
    }),
    editProductValidator: Joi.object({
        title: Joi.string().pattern(new RegExp('^[\\sА-Яа-яЁёЇїІіҐґЄє]+$')).min(5).max(30).optional().messages({
            'string.pattern.base': 'Назва продукту повинна бути українською мовою.',
            'string.min': 'Назва продукту повинна складатися з 3 і більше символів.',
            'string.max': 'Назва продукту повинна містити не більше 20 символів.',
            'string.empty': 'Назва продукту не може бути порожнім полем!'
        }),
        price: Joi.number().integer().min(10).max(5000).optional().messages({
            'number.min': 'Ціна не може бути менше 10 грн.',
            'number.max': 'Ціна не може бути більше 5000 грн.',
            'number.base': 'Ціна не може бути порожнім полем!'
        })
    })
}

export {productValidator}