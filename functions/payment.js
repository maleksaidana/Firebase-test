const fetch = require("node-fetch");
const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();


// eslint-disable-next-line max-len
const PAYPAL_CLIENT_ID = "AeXiCmyyn2l9kNmTtXl8qKhPiaaRCoBM4PgmROFS1rMq4FET6SgnJugobggKk-Dc-yTrahPiefc2kQ24";
// eslint-disable-next-line max-len
const PAYPAL_CLIENT_SECRET = "EGrAr1cprFl6tS63GUnE5cM0OLi7pZw8c1xW4SWL_qtHqA7ycp7EjJx0OkpLs0HxdAr7xFZOyMoY1b9g";
const base = "https://api-m.sandbox.paypal.com";


const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
        PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};


const createOrder = async (cost) => {
  console.log("shopping cart information passed from the froncallback:", cost);
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: cost,
        },
      },
    ],
  };
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};


const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });
  return handleResponse(response);
};

const handleResponse = async (response) => {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
};

exports.createOrder = functions.https.onCall(async (data, context) => {
  try {
    const {cost} = data;
    const {jsonResponse, httpStatusCode} = await createOrder(cost);
    console.log(jsonResponse, httpStatusCode);
    return {jsonResponse, httpStatusCode};
  } catch (error) {
    console.log("Failed to create order:", error);
    return "Failed to create order.";
  }
});


exports.captureOrder = functions.https.onCall(async (data, context) => {
  try {
    const {orderID} = data;
    const {jsonResponse, httpStatusCode} = await captureOrder(orderID);
    console.log(jsonResponse, httpStatusCode);

    db.collection("cities").add({
      paymentId: jsonResponse.id,
      email_address: jsonResponse.payer.email_address,
      payer_id: jsonResponse.payer.payer_id,
      status: jsonResponse.status,
      // eslint-disable-next-line max-len
      value: jsonResponse.purchase_units[0].payments.captures[0].amount.value,
      // eslint-disable-next-line max-len
      currency: jsonResponse.purchase_units[0].payments.captures[0].amount.currency_code,
    })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

    return {jsonResponse, httpStatusCode};
  } catch (error) {
    console.log("Failed to capture order:", error);
    return "Failed to capture order.";
  }
});

