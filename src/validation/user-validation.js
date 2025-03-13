import Joi from "joi";

const registerUserValidation = Joi.object({
    username : Joi.string().max(100).min(4).required(),
    password : Joi.string().max(100).min(8).required()
})

const loginUserValidation = Joi.object({
    username : Joi.string().max(100).min(4).required(),
    password : Joi.string().max(100).min(8).required()
})


export {
    registerUserValidation,
    loginUserValidation
}