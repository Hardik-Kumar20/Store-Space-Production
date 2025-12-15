// Handles HTTP requests + responses Calls booking,service for logic
import {
    createBooking,
    getBookingById,
    listBookings,
    updateBooking,
    deleteBooking
} from "./booking.service";


export const create = async(req, res, next)=>{
    try{
        const booking = await createBooking(req.body);
        return res.status(201).json({message: "Booking created", booking});
    }catch(err){
        next(err);
    }
}


export const getOne = async(req, res, next)=>{
    try {
        const booking = await getBookingById(req.params.id);
        return res.json(booking);
    } catch (err) {
        next(err)
    }
}


export const getAll = async(req, res, next)=>{
    try{
        const data = await listBookings();
        return res.json({count:data.length, bookings: data})
    }catch(err){
        next(err);
    }
}


export const update = async(req, res, next)=>{
    try {
        const booking = await updateBooking(req.params.id, req.body);
        return res.json({message: "Booking updated", booking});
    } catch (err) {
        next(err);
    }
}



export const remove = async(req, res, next)=>{
    try {
        await deleteBooking(req.params.id);
        return res.status(204).send()
    } catch (err) {
        next(err);
    }
}