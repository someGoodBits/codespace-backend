const admin = require("firebase-admin");

const serviceAccount = require("../../firebase-creds.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const storage = admin.storage();
const auth = admin.auth();

module.exports = {
    admin,
    auth,
    storage,
    firestore
}