import Joi from 'joi'

const createAddressValidation = Joi.object({
    street : Joi.string().max(100).required(),
    city : Joi.string().max(100).required(),
    province : Joi.string().max(100).required(),
    country : Joi.string().max(100).required(),
    postal_code : Joi.string().max(100).required()
})

const getAddressValidation = Joi.number().min(1).positive().required()

export{
    createAddressValidation,
    getAddressValidation
}