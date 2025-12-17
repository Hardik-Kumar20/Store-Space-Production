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


    const space = {
        id,
        ownerId,
        title,
        description,
        location,
        pricePerDay,
        createdAt
    }
    spaces.set(id, space);
    return space;
}


// Get Space Id
export async function getSpaceById(id){
    const space = spaces.get(id);
    if(!space) throw new ApiError(401, "Space not found");
    return space;
}


// List all Spaces
export async function listSpaces(page = 1, limit = 10){
const values = Array.from(spaces.values());
const start = (page - 1) * limit;
const end = start + limit
return{
    page,
    limit,
    total: values.length,
    data: values.slice(start, end)
}
}



//update a space 
export async function updateSpace(id, data){
    const existing = spaces.get(id);
    if(!existing) throw new ApiError(404, "Space not found!");
    const updated = {
        ...existing,
        ...data,
        updatedAt: new Date().toISOString()
    }
    spaces.set(id, updated);
    return updated;
}




//Delete space
export async function deleteSpace(id){
    if(!spaces.has(id)) throw new ApiError(404, "Space not found!");
    spaces.delete(id);
    return true;
}


// List spaces by owner
export async function ListSpacesByOwner(ownerId) {
    return Array.from(spaces.values()).filter(s => s.ownerId === ownerId);
}