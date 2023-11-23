import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { httpsCallable } from 'firebase/functions';
import { functions } from "./firebase/config";

const PaypalPayment = () => {

    const initialOptions = {
        clientId: "AeXiCmyyn2l9kNmTtXl8qKhPiaaRCoBM4PgmROFS1rMq4FET6SgnJugobggKk-Dc-yTrahPiefc2kQ24",
        currency: "USD",
        intent: "capture",
    };

    const createOrder = async (data) => {

        const createOrder = httpsCallable(functions, 'createOrder');
        return createOrder({ description: "Wood candy bar", cost: "5.00" })
            .then((response) => { return response.data.jsonResponse.id })

    };
    const onApprove = async (data) => {
        // Order is captured on the server and the response is returned to the browser
        const captureOrder = httpsCallable(functions, 'captureOrder');

        const response = await captureOrder({ orderID: data.orderID });
        console.log("CAPTURE ORDER RESPONSE", response)

    }


    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </PayPalScriptProvider>

    );

};

export default PaypalPayment;