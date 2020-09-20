const express = require('express');
const cors = require('cors');
const logger = require('./serverlog/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const api = require('./routes/api/api');
const fs = require('fs');
const path = require('path');
const middlewares = require('./middlewares');
const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*!/, (req, res) =>
        res.sendFile(__dirname + './public/index.html'));
    logger.info('Production mode active');
} else {
    app.get('/', (req, res) => {
        res.json({
            message: "Developer mode 🐱‍👤"
        });
    });
}
app.use('/api',api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
