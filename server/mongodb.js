const mongoose = require("mongoose");
const logger = require('./serverlog/logger');
const postTypes = require("./utils/postmanifest");

const connectDb = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: postTypes.roles,
        required: true,
    },
}, { timestamps: true });
const settings = new mongoose.Schema({
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
}, { timestamps: true });

const posts = new mongoose.Schema({
    item: {
        graphic: {
            type: String,
            required: true,
        },
        selectType: {
            type: postTypes.selectType,
            required: true,
        },
        selectState: {
            type: postTypes.state,
            required: true,
        },
        regulations: {
            type: Number,
            required: true,
        },
        iterations: {
            type: Number,
            required: true,
        },
        creator: {
            type: String,
            required: true,
        },
        comments: {
            type: String,
        },
        selectSiemensTested: {
            type: postTypes.tested,
        },
        siemensAuditor: {
            type: String,
        },
        siemensComments: {
            type: String,
        },
        selectPlanerTested: {
            type: postTypes.tested,
        },
        planer: {
            type: String,
        },
        planerComments: {
            type: String,
        },
    },
    meta: {
        testCreationDate: {
            type: Date,
        },
        finished_at: {
            type: Date,
        },
        okBySiemens_at: {
            type: Date,
        },
        okByPlaner: {
            type: Date,
        },
        closed_at: {
            type: Date,
        },
    },
}, { timestamps: true });

const Users = mongoose.model("User", userSchema);
const Settings = mongoose.model("Settings", settings);
const Posts = mongoose.model("Posts", posts);

module.exports = {
    connectDb,
    Users,
    Settings,
    Posts,
};