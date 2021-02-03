const Service = require('node-windows').Service;
require('dotenv').config();
const port = process.env.PORT;
const wincmd = require('node-windows');
// Create a new service
const svc = new Service({
    name: 'workify',
    description: 'Desigo CC graphics tool',
    script: require('path').join(__dirname, '../index.js')
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
    console.log(`Service successfull installed`);
    console.log(`Start...`);
    svc.start();
    console.log(`App is listening on: http://localhost:${port}`);
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function() {
    console.log('Uninstall complete.');
    console.log('The service exists: ', svc.exists);
});

wincmd.isAdminUser((isAdmin) => {
    if (isAdmin) {
        if (process.env.WINDOWS === "install") {
            console.log(`Install Service... `);
            svc.install();
        } else if (process.env.WINDOWS === "uninstall") {
            console.log(`Unistall Service... `);
            svc.uninstall();
        } else {
            console.warn('Use "install" or "deinstall" as start variable')
        }
    } else {
        console.error(`Can't ${process.env.WINDOWS} Service, User has no Administartor privileges`)
    }
});