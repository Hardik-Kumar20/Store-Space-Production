import {
    createPaymentIntent,
    confirmPayment,
    failPayment,
    getPaymentById,
    listPayments
} from "../payments/payment.service"

export const createIntent = async (req, res, next) =>{
    try {
        const payment = await createPaymentIntent(req.body);
        return res.status(201).json({message: "Payment intent created", payment});
    } catch (err) {
        next(err);
    }
}


export const confirm = async (req, res, next)=>{
    try {
        const payment = await confirmPayment(req.params.id);
        return res.json({message: "Payment confirmed", payment})
    } catch (err) {
        next(err);
    }
}


export const fail = async (req, res, next)=>{
    try {
        const payment = await failPayment(req.params.id);
        return res.json({message: "Payment failed", payment})
    } catch (err) {
        next(err);
    }
}



export const getOne = async (req, res, next)=>{
    try {
        const payment = await getPaymentById(req.params.id);
        return res.json(payment);
    } catch (err) {
        next(err);
    }
}



export const getAll = async (req, res, next)=>{
    try {
        const payments = await listPayments();
    } catch (err) {
        next(err);
    }
}