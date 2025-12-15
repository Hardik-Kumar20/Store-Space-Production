///// Business Logic for bookings 
////  It tells booking made by user_id on space_id is it pending or approved/canceld

import { ApiError } from "../auth/auth.service";


const bookings = new Map(); // key = bookingId, value = booking object

// Id Generator for bookings
function generateId(params) {
    return `b_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
}



// create a booking 
export async function createBooking({userId, spaceId, startDate, endDate}) {
    if(!userId || !spaceId || !startDate || !endDate){
        throw new ApiError(401, "Missing Booking Details");
    }

    const booking_id = generateId();
    const createdAt = new Date().toISOString();
    const status = "pending";

    const booking = {
        id,
        userId,
        spaceId,
        startDate,
        endDate,
        status,
        createdAt,
    };
    bookings.set(id, booking);
    return booking;
}



// Get Booking By Id
export async function getBookingById(id) {
    const booking = bookings.get(id);
    if(!booking) throw new ApiError(404, "Booking not found");
    return booking;
}


// List all bookings
export async function listBookings(page = 1, limit = 10) {
    const values = Array.from(bookings.values());
    const start = (page - 1) * limit;
    const end = start + limit;

    return{
        page,
        limit,
        total: values.length,
        data: values.slice(start,end),
    }
}



// Updating Booking
export async function updateBooking(id, data) {
    const existing = bookings.get(id);
    if(!existing) throw new ApiError(404, "Booking not Found");

    const update = {
        ...existing,
        ...data,
        updatedAt: new Date().toISOString,
    };
    bookings.set(id, update);
    return update;
}



// delete cancel booking
export async function deleteBooking(id){
    if(!bookings.has(id)) throw new ApiError(404, "Booking not Found");
    bookings.delete(id);
    return true;
}
