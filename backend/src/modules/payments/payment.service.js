// Handles business Logic and oaayment storing 
import { ApiError } from "../auth/auth.service";
import {updateBooking} from "../booking/booking.service";

const payments = new Map();

function generateId(){
    return `pay_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
}

//Create payment intent (like Razorpay order or Stripe paymentIntent)
export async function createPaymentIntent({bookingId, amount, currency}){
    if(!bookingId || !amount || !currency){
        throw new ApiError(400, "Missing payment details");
    }
    const id = generateId();
    const createdAt = new Date().toISOString();

    const payment = {
        id,
        bookingId,
        amount,
        currency,
        status: "pending", // pending -> success -> failed
        createdAt,
    }
    payments.set(id, payment);
    return payment;
}



// Fail Payment 
export async function failPayment(paymentId){
    const payment = payments.get(paymentId);
    if(!payment) throw new ApiError(404, "Payment not found");

    payment.status = "failed";
    payment.failedAt = new Date().toISOString();
    payments.set(paymentId, payment);
    return payment;
}


// Get one payment
export async function getPaymentById(id){
    const payment = payments.get(id);
    if(!payment) throw new ApiError(404, "Payment not found");
    return payment;
}


//List all payments
export async function listPayments(){
    return Array.from(payments.values());
}