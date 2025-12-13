const app = require('./app');
const {PORT} = require('./config/env');
const logger = require('./config/logger');

app.listen(PORT, ()=>{
    logger.info(`Servers are running on port ${PORT}`);
})