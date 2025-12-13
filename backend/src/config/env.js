require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 4000,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
    JWT_EXPIRING_TIME: process.env.JWT_EXPIRING_TIME
};