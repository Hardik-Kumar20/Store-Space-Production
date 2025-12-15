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