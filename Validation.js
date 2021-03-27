import Joi from 'joi'

export const userCreation = Joi.object({

    Username: Joi.string().min(5).max(15).alphanum().required(),
    Password: Joi.string().alphanum().min(6).max(20).required(),
    Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'gov'] } }).required(),
    isEmployer : Joi.boolean().truthy("0","1").required()
})

export const userLogin = Joi.object({
    Username: Joi.string().min(5).max(15).alphanum().required(),
    Password: Joi.string().alphanum().min(6).max(20).required()
})