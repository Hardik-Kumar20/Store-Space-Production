// Business Logic
//Get all users (admin)
//Get one user (self or admin)
//Update profile
//Delete user
//Get "my profile"
//Later you can add roles (customer/provider/admin)


import {ApiError} from "../auth/auth.service";
import {findById} from "../auth/auth.service";

// Note: users Map is inside auth.service.js, so same data source
import {users} from "../auth/auth.service";


// Get all users (admin)
export async function listUsers() {
    return Array.from(users.values()).map(u=>{
        const {password, ...safe} = u;
        return safe;
    })
}


// Get user by ID
export async function getUserById(id){
    const user = users.get(id) || [...users.values()].find(u => u.id === id);
    if(!user) throw new ApiError(404, "User not found");
    const {password, ...safe} = user;
    return safe;
}



// update user profile
export async function updateUser(id, data) {
    const user = [...users.values()].find(u=> u.id === id);
    if(!user) throw new ApiError(404, "User not found");

    const updated = {
        ...user,
        ...data,
        updatedAt: new Date().toISOString(),
    };

    users.set(updated.email, updated);
    return{...updated, password: undefined};
}


//Delete user
export async function deleteUser(id){
    const user = [...users.values()].find(u => u.id === id);
    if(!user) throw new ApiError(404, "User not found");

    users.delete(user.email);
    return true;
}

