const express = require('express');
const logger = require('./serverlog/logger');
const app = require('./app');
require('dotenv').config();
const {deleteAllEntries, generateRandomEntries} = require('./routes/api/testAPI');
const port = process.env.PORT;


// Handle dummy db
if(process.env.NODE_ENV === 'startAndCreateRandomDbEntries') {
    logger.info('Create random db entries');
    generateRandomEntries(500).then(res=>{
        logger.info("Db entries successful generated: " + res);
        process.exit(0);
    }).catch(reason => {
        logger.error("Failed to create db entries: " + reason);
        process.exit(0);
    });
} else if(process.env.NODE_ENV === 'startAndDeleteRandomDbEntries') {
    logger.info('Delete all db entries');
    deleteAllEntries().then(res =>{
            logger.info("Db entries successful deleted: " + res);
            process.exit(0);
        }
    ).catch(reason => {
        logger.error("Failed to delete db entries: " + reason);
        process.exit(0);
    });
}

app.listen(port, () => {
    /* eslint-disable no-console */
    logger.info(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});

