const mongoose = require('mongoose');
const logger = require('./serverlog/logger')
require('dotenv').config();

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

};

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password:{
            type: String,
            required: true,
        }
    },
    { timestamps: true },
);
const settings = new mongoose.Schema(
    {
    settings: {
            calculatedGraphics: {
                type: Number,
                required: true,
            },
            plantGraphics: {
                type: Number,
                required: true,
            },
            floorPlan: {
                type: Number,
                required: true,
            },
            navigationGraphic: {
                type: Number,
                required: true,
            },
            regulationsGraphic: {
                type: Number,
                required: true,
            },
            requiredGraphicsAtWeek: {
                type: Number,
                required: true,
            },
            totalDataPoints: {
                type: Number,
                required: true,
            },
        },
    name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);
const User = mongoose.model('User', userSchema);
const Settings = mongoose.model('Settings', settings);


module.exports = {
    connectDb, User, Settings
}
