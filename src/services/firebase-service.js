const admin = require("firebase-admin");

const serviceAccount = require("../../firebase-creds.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket : "gs://assignable-backend.appspot.com"
});

const firestore = admin.firestore();
const storage = admin.storage().bucket();
const auth = admin.auth();

module.exports = {
    admin,
    auth,
    storage,
    firestore
}