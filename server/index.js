const logger = require('./serverlog/logger');
const app = require('./app');
const { connectDb } = require("./mongodb");
const { addDefaultAdmin } = require("./utils/defaultAdmin");
const dotenv = require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

if(dotenv.error)
{
   logger.error(`ENV File Error: ${dotenv.error}`);
}

(async () => {
    try {
      await connectDb(process.env.DATABASE_URL);
      addDefaultAdmin();
      logger.info("DB connection successful!");
    } catch (err) {
      logger.error(`DB connection failed: ${err}`);
    }
})();

app.listen(process.env.PORT, () => {
    /* eslint-disable no-console */
    logger.info(`Listening: http://localhost:${process.env.PORT}`);
    /* eslint-enable no-console */
});