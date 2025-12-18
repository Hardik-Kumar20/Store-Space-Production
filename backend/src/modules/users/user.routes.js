const express = require("express");
import {getAll, getOne, me, update, remove} from "../controllers/user.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";

const router = express.Router();


// Logged-in user profile
router.get("/me", authMiddleware, me);


// List all users (admin Later)
router.get("/", getAll);


// Get one user
router.get("/:id", authMiddleware, update);


// Update a user 
router.put("/:id", authMiddleware, update);


// Delete a user
router.delete("/:id", authMiddleware, remove);


export default router;