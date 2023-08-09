import Joi from 'joi'

const productValidator = {
    newProductValidator: Joi.object({
        title: Joi.string().pattern(new RegExp('^[\u0410-\u042F][\u0430-\u044F\u0410-\u042F]*$')).min(3).max(20).required(),
        category: Joi.string().min(5).max(20).required(),
        type: Joi.string().min(5).max(20),
        price: Joi.number().min(10).max(5000).required()
    }),
    editProductValidator: Joi.object({
        title: Joi.string().pattern(new RegExp('^[\u0410-\u042F][\u0430-\u044F\u0410-\u042F]*$')).min(5).max(20).required(),
        price: Joi.number().min(10).max(5000).required()
    })
}


export {productValidator}