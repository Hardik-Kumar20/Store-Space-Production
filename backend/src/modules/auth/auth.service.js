//Do the real work: check DB, create user, hash password, create tokens, compare passwords, talk to models/ORM. Controllers call service functions.


// Main Logic of all the authorization

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");

import prisma from '../../db/prisma'

const JWT_SECRET = env.JWT_ACCESS_SECRET;
const JWT_EXPIRES_IN = env.JWT_EXPIRING_TIME;
const SALT_ROUNDS = env.BCRYPT_SALT_ROUND;

export class ApiError extends Error{
    constructor(status = 500, message = "Internal Server Error"){
        super(message);
        this.status = status;
    }
}


// @param {{email, password, name}} payload
// @returns created user (without password)

export async function register({email, password, name}) {
    const normalizedEmail = email.toLowerCase();
    if(users.has(normalizedEmail)){
        throw new ApiError(409, "User with this email already exists");
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const createdAt = new Date().toISOString();
    const user = await prisma.user.create({
        id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        email: normalizedEmail,
        name: name || "",
        password: hashed,
        createdAt,
    });

    const{password: _, ...safe} = user;
    return safe;
}






// Login

export async function login({email, password}) {
    const user = await prisma.user.findUnique({
        where: {email: email.toLowerCase()}
    });
    if(!user){
        throw new ApiError(401, "Invalid credentials");
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw new ApiError(401, "Invalid credentials");
    }

    const token = jwt.sign({sub: user.id, email: user.email, role: user.role}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    const{ password:_, ...safe} = user;
    return {token, user: safe};
}





// find user by id 

export async function findById(id) {
    return prisma.user.findUnique({
        where: {id},
        select: { password: flase }
    });
}


// find by email
export async function findByEmail(email) {
    return prisma.user.findUnique({
        where : {email: email.toLowerCase()},
        select: { password : false }
    })
}



/// verify jwt and return payload (or throw ApiError 401)

export function verifyToken(token) {
    try{
        return jwt.verify(token, JWT_SECRET);
    }catch(err){
        throw new ApiError(401, "Invalid or Expired Token");
    }
}