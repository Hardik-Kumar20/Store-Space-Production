import{
    createSpace,
    getSpaceById,
    listSpaces,
    updateSpace,
    deleteSpace,
    listSpacesByOnwer
} from "./space.service"


export const create = async (req, res, next) =>{
    try {
        const ownerId = req.user.id;
        const space = await createSpace({ ownerId, ...req.body});
        return res.status(201).json({message: "Space created", space});
    } catch (err) {
        next(err);
    }
}

export const getOne = async (req, res, next) =>{
    try {
        const space = await getSpaceById(req.params.id);
        return res.status(201).json(space);
    } catch (err) {
        next(err);
    }
}



export const getAll = async (req, res, next) =>{
try {
    const spaces = await listSpaces();
    return res.status(201).json({count : spaces.length, spaces})
} catch (err) {
    next(err);
}
}



export const update = async (req, res, next) =>{
    try {
        await updateSpace(req.params.id);
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}



export const remove = async (req, res, next)=>{
    try {
        await deleteSpace(req.params.id);
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
}


export const mySpaces = async (req, res, status)=>{
    try {
        const spaces = await listSpacesByOnwer(req.user.id);
        return res.json({ count: spaces.length, spaces});
    } catch (err) {
        next(err);
    }
}