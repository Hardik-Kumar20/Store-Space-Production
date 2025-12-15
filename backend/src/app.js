const express = require("express");
const cors = require("cors");
const routes = require('./routes');
const {errorHandler} = require('./middlewares/error.middleware');
const corsOptions = require('./config/cors');
import morganMiddleware from "./config/logger";
import bookingRoutes from "./modules/booking/booking.routes"

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);
app.use("/api/bookings", bookingRoutes);
app.use(morganMiddleware);

module.exports = app;