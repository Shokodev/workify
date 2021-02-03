const { Users } = require('../mongodb');
const logger = require('../serverlog/logger');
const bcrypt = require('bcrypt');
const { roles } = require('./postmanifest');
require('dotenv').config();

const defaultAdmin = {
    nickname: "dfa",
    username: "Default Admin",
    role: roles.ADMIN,
    password: ""
}

function addDefaultAdmin() {
    Users.exists({ nickname: "dfa" }).then(exists => {
        if (exists) {
            logger.info("Default Admin already exists")
        } else {
            createDefaultAdmin();
        }
    });
}

async function createDefaultAdmin() {
    try {
        defaultAdmin.password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PW, 10);
        await Users.create(defaultAdmin);
    } catch (e) {
        logger.error(`Cant't create default Admin: ${e}`);
    }


}

module.exports = {
    addDefaultAdmin
}