import Joi from "joi";

const registerUserValidation = Joi.object({
    username : Joi.string().max(100).min(4).required(),
    password : Joi.string().max(100).min(8).required()
})

const loginUserValidation = Joi.object({
    username : Joi.string().max(100).required(),
    password : Joi.string().max(100).required()
})

const getUserValidation = Joi.string().max(100).required()

const updateUserValidation = Joi.object({
    username : Joi.string().max(100).required(),
    password : Joi.string().max(100).required()
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}