import Joi from 'joi'

export const schema = Joi.object({

    Username: Joi.string().min(5).max(15).alphanum().required(),
    Password: Joi.string().alphanum().min(7).max(20).required(),
    Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})