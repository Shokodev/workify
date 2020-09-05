const express = require('express');
const cors = require('cors');
const logger = require('./logger/logger');
const app = express();
const {deleteAllEntries, generateRandomEntries } = require('./routes/api/testAPI');


//Middleware

app.use(express.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle production
if(process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'))
    // Handle SPA
    app.get(/.*!/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
    logger.info('Production mode active');
} else if(process.env.NODE_ENV === 'startAndCreateRandomDbEntries') {
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

const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`Server started on port ${port}`));


