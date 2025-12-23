//Accept req/res, call service functions, handle success/error responses and HTTP status codes. Keep business logic out of controllers.


const serviceLogic = require("./auth.service");

export const register = async (req, res, next)=>{
    try {
        const user = await serviceLogic.register(req.body);
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next)=>{
    try {
        const result = await serviceLogic.login(req.body);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};                              

export const me = async (req, res, next)=>{
    try{
        if(!req.user){
            return res.status(401).json({message: "Not authenticated"});
        }
        return res.json({user: req.user});
    }catch(error){
        next(error);
    }
}