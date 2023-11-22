import { PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from "./firebase/config";

const PaypalPayment = () => {

    const createOrder = async (data) => {

        const createOrder = httpsCallable(functions, 'createOrder');
        return createOrder({description: "Wood candy bar", cost: "5.00" })
        .then((response) => { return response.data.jsonResponse.id})

    }; 
    const onApprove = async(data) => {
        // Order is captured on the server and the response is returned to the browser
        const captureOrder = httpsCallable(functions, 'captureOrder');

        const response = await captureOrder({orderID: data.orderID});
        console.log("CAPTURE ORDER RESPONSE", response)

    }


    return (
        <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
        />
    );

};

export default PaypalPayment;