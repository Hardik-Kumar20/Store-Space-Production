const Joi = require("joi");


//Helper middleware factory 
const validate = (schema) => (req, res, next) => {
    const {error, value} = schema.validate(req.body, {stripUnknown: true, abortEarly: false});
    if(error){
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map(d => ({message: d.message, path: d.path}))
        });
    }
    req.body = value;
    next();
};


const createSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    decription:Joi.string().max(500).optional(),
    location: Joi.string().required(),
    location: Joi.string().required(),
    pricePerDay: Joi.number().positive().required()
})

const updateSchema = Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
    location: Joi.string().optional(),
    pricePerDay: Joi.number().positive().optional()
})


export const validateCreateSchema = validate(createSchema);
export const validateUpdateSchema = validate(updateSchema);