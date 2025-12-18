const express = require("express");
import {
    createIntent,
    confirm,
    fail,
    getOne,
    getAll
}  from "../payments/payment.controller";


import {authMiddleware} from "../../middlewares/auth.middleware";

const router = express.Router();


// Create payment intent(customer)
router.post("/", authMiddleware, createIntent);


// confirm payment (gateway callback simulation)
router.post("/:id/fail", authMiddleware, confirm);


// fail payment
router.post("/:id/fail", authMiddleware, fail);


// Get one payment
router.get("/:id", authMiddleware, getOne);


//Admin list all payments
router.get("/", getAll);


export default router;


