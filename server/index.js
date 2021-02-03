const logger = require('./serverlog/logger');
const app = require('./app');
require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => {
    /* eslint-disable no-console */
    logger.info(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});