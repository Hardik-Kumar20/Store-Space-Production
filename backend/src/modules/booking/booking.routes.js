// Connects Routes To Controller

const express = require("express");
import{
    create,
    getOne,
    getAll,
    update,
    remove
} from "./booking.controller";

import {authMiddleware} from "../../middlewares/auth.middleware"
// What does authMiddleware do written above --->
// i.   Checks if the user is logged in
// ii.  Validates the JWT token
// iii. Identifies who the user is
// iv.  Allows or blocks access to the route

const router = express.Router();




router.post("/", authMiddleware, create);


router.get("/", getAll);


router.get("/:id", getOne);


router.put("/:id", authMiddleware, update);


router.delete("/:id", authMiddleware, remove);

export default router;