const functions = require("firebase-functions");
const admin = require("firebase-admin");

// test
exports.randomNumber = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100);
  response.send(number.toString());
});


exports.sayHello = functions.https.onCall((data, context) => {
  return `ASBA LIKOM MN FIREBASE`;
});

admin.initializeApp();
exports.addAdminRole = functions.https.onCall((data, context) => {
// get user and add custom claim
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: {expiryDayte: new Date(), value: true},
    });
  }).then(() => {
    return {
      message: `Success ! ${data.email} has been an admin`,
    };
  }).catch((err) => {
    return err;
  });
});
