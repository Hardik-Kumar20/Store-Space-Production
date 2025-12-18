import{
    listUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../users/user.service";

export const getAll = async (req, res, next)=>{
    try {
        const users = await listUsers();
        return res.json({count: users.length, users});
    } catch (err) {
        next(err);
    }
}


export const getOne = async (req, res, next)=>{
    try{
        const user = await getUserById(req.params.id);
        return res.json(user);
    }catch(err){
        next(err);
    }
}


// Logged-in user profile
export const me = async (req, res, next)=>{
    try{
        return res.json(req.user);
    }catch(err){
        next(err);
    }
}


export const update = async (req, res, next)=>{
    try{
        const updated = await updateUser(req.params.id, req.body);
        return res.json({message: "User updated", user: updated});
    }
    catch(err){
        next(err);
    }
}


export const remove = async (req, res, next)=>{
    try {
        await deleteUser(req.params.id);
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}