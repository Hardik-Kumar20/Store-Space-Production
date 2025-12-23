///// Business Logic for bookings 
////  It tells booking made by user_id on space_id is it pending or approved/canceld

import { ApiError } from "../auth/auth.service";

import { prisma } from "../../db/prisma";

// Id Generator for bookings
function generateId(params) {
    return `b_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
}



// create a booking 
export async function createBooking({userId, spaceId, startDate, endDate}) {
    if(!userId || !spaceId || !startDate || !endDate){
        throw new ApiError(401, "Missing Booking Details");
    }

    return prisma.booking.create({
        data: {
          userId,
          spaceId,
          fromDate: new Date(startDate),
          toDate: new Date(endDate),
        },
      });
}



// Get Booking By Id
export async function getBookingById(id) {
    const booking = await prisma.booking.findUnique({
        where: {id},
        include: {space:true, user:true}
    });
    if(!booking) throw new ApiError(404, "Booking not found");
    return booking;
}


// List all bookings
export async function listBookings(page = 1, limit = 10) {
    const [data, total] = await Promise.all([
        prisma.booking.findMany({
            skip: (page - 1) * limit,
            take: limit,
}),
prisma.booking.count()
    ])
    return {page, limit, total, date};
}



// Updating Booking
export async function updateBooking(id, data) {
    return prisma.booking.update({
        where: {id},
        data
    })
}



// delete cancel booking
export async function deleteBooking(id){
   await prisma.booking.delete({where: {id}});
    return true;
}
