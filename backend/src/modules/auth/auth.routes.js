//Define Express routes and attach validator middleware and controllers. Very thin file.
const express = require("express");
const controller = require("./auth.controller");
const validation = require("./auth.validators");


const router = express.Router();


router.post("/register", validation.validateRegister , controller.register());
router.post("/login", validation.ValidateLogin, controller.login());



// create middleware for this one 
// router.get("/me", authMiddleware, me);


export default router;