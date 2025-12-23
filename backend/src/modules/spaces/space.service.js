import { ApiError } from "../auth/auth.service";

// In memory store (replacable with DB) : key = spaceId, value = space object
const spaces = new Map();

function generateId(){
    return `sp_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
}

// create a new space
export async function createSpace({ownerId, title, description, location, pricePerDay}) {
    if(!ownerId) throw new ApiError(400, "ownerId is required");

    const id = generateId();
    const createdAt = new Date().toISOString();


    return await prisma.space.create({
        data:{
            ownerId,
            title,
            description,
            location,
            pricePerDay,
            createdAt
        }
    })
}


// Get Space Id
export async function getSpaceById(id){
    const space = await prisma.space.findUnique({where:{id}});
    if(!space) throw new ApiError(401, "Space not found");
    return space;
}


// List all Spaces
export async function listSpaces(page = 1, limit = 10){
const [data, total] = await Promise.all([
    prisma.space.findMany({
        skip: (page - 1) * limit,
        take: limit
    }),
    prisma.space.count(),
]);
return { page, limit, total, data};
}



//update a space 
export async function updateSpace(id, data){
    const existing = spaces.get(id);
    if(!existing) throw new ApiError(404, "Space not found!");
    return await prisma.space.update({
        where: {id},
        data,
    });
}




//Delete space
export async function deleteSpace(id){
    if(!spaces.has(id)) throw new ApiError(404, "Space not found!");
    return await prisma.space.delete({where:{id}});
}


// List spaces by owner
export async function ListSpacesByOwner(ownerId) {
    return Array.from(spaces.values()).filter(s => s.ownerId === ownerId);
}