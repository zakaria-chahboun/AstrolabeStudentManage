/* ******** Firebase Admin Config ******** */

var admin = require('firebase-admin');

var serviceAccount = require("../public/firebase/astrolabestudentmanage-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://astrolabestudentmanage.firebaseio.com"
});



module.exports = admin;