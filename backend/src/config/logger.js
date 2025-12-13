const morgan = require("morgan");

// deciding whether we wants to start logging in production or in development 
const format = process.env.NODE_ENV === "production" ? "combined" : "dev";


// Morgan code 
const morganMiddleware = morgan(format);

export default morganMiddleware;