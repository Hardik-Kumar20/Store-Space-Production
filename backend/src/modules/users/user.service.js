// Business Logic
//Get all users (admin)
//Get one user (self or admin)
//Update profile
//Delete user
//Get "my profile"
//Later you can add roles (customer/provider/admin)


import {ApiError} from "../auth/auth.service";
import {findById} from "../auth/auth.service";
import{prisma} from "../../db/prisma"



// Get all users (admin)
export async function listUsers() {
   return prisma.user.findMany({
    select: {password: false},
   });
}


// Get user by ID
export async function getUserById(id){
    return prisma.user.findUnique({where:{id}});
}



// update user profile
export async function updateUser(id, data) {
   return prisma.user.update({
    where: {id},
    data,
    select: {password: false},
   })
}


//Delete user
export async function deleteUser(id){
   await prisma.user.delete({where: {id}});
   return true;
}

