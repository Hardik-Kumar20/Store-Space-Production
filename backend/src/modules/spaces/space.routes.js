const express = require("express");
import{
    create,
    getOne,
    getAll,
    update,
    remove,
    mySpaces
} from "./space.controller"

import {
    validateCreateSchema,
    validateUpdateSchema
} from "./space.validators"

import {authMiddleware} from "../../middlewares/auth.middleware"
import {requireRole} from "../../middlewares/role.middleware";

const router = express.Router();


// Create a new space(must be logged in)
router.post("/", authMiddleware, validateCreateSchema, requireRole("OWNER", "ADMIN"), create);


// Get all spaces (public)
router.get("/", getAll);


//Get a single space
router.get("/:id", getOne);


//Get spaces owned by logged-in user
router.get("/owner/me", authMiddleware, mySpaces);


//Update space
router.put("/:id", authMiddleware, validateUpdateSchema, requireRole("OWNER", "ADMIN"), update);


//Delete space
router.delete("/:id", authMiddleware, requireRole("ADMIN"), remove);


export default router;