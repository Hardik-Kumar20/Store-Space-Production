//Validate incoming request bodies/params/queries before they hit controllers. Fail fast with 400 and helpful messages.
const Joi = require("joi");
// I am using joi for the validation it works just like the pydantic 



const validate = (schema) => (req, res, next) =>{
    const{error, value} = schema.validate(req.body, {abortEarly: false, stripUnknown: true});
    if(error){
        const details = error.details.map((d)=>({ message: d.message, path: d.path}));
        return res.status(400).json({message: "validation failed", details});
    }
    req.body = value;
    next();
};


const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),
    name: Joi.string().max(100).optional(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });


export const validateRegister = validate(registerSchema);
export const ValidateLogin = validate(loginSchema);
