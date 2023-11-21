import { PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';

const PaypalPayment = () => {

    const createOrder = (data) => {
        console.log("HAW ZENI")
        // Order is created on the server and the order id is returned
        return fetch("/my-server/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
                product: {
                    description: "Wood candy bar",
                    cost: "5.00"
                }
            }),
        })
            .then((response) => { return response.json()})
            .then((order) => order.id);
    };
    const onApprove = (data) => {
        // Order is captured on the server and the response is returned to the browser
        return fetch("/my-server/capture-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
            .then((response) => response.json());
    };


    return (
        <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
        />
    );

};

export default PaypalPayment;