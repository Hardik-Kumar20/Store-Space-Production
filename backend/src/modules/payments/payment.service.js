// Handles business Logic and oaayment storing 
import { ApiError } from "../auth/auth.service";
import {updateBooking} from "../booking/booking.service";
import {prisma} from "../../db/prisma"


function generateId(){
    return `pay_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
}

//Create payment intent (like Razorpay order or Stripe paymentIntent)
export async function createPaymentIntent({bookingId, amount, currency}){
    if(!bookingId || !amount || !currency){
        throw new ApiError(400, "Missing payment details");
    }
    return prisma.payment.create({
        data:{
            bookingId,
            userId,
            amount,
            provider: "RAZORPAY"
        }
    })
}



// Fail Payment 
export async function failPayment(paymentId){
    return prisma.payment.update({
        where: {id: paymentId},
        data: {status: "FAILED"},
    });
}


// Get one payment
export async function getPaymentById(id){
    const payment = await prisma.payment.findUnique(id);
    if(!payment) throw new ApiError(404, "Payment not found");
    return payment;
}


//List all payments
export async function listPayments(){
    return prisma.payment.findMany();
}