const { getFirestore} = require('firebase-admin/firestore');
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://premiumshopwot-default-rtdb.europe-west1.firebasedatabase.app"
});
 module.exports = db = getFirestore();
