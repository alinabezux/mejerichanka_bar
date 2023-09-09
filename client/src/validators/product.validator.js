import Joi from 'joi'

const productValidator = {
    newProductValidator: Joi.object({
        title: Joi.string().pattern(new RegExp('^[\\sА-Яа-яЁёЇїІіҐґЄє]+$')).min(3).max(20).required(),
        category: Joi.string().min(5).max(20),
        type: Joi.string().min(5).max(20).optional(),
        price: Joi.number().integer().min(10).max(5000).required()
    }),
    editProductValidator: Joi.object({
        title: Joi.string().pattern(new RegExp('^[\\sА-Яа-яЁёЇїІіҐґЄє]+$')).min(5).max(30).optional(),
        price: Joi.number().integer().min(10).max(5000).optional()
    })
}

export {productValidator}