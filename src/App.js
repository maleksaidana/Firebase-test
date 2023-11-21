import Home from "./Home";
import { Routes, Route, Navigate } from "react-router-dom"
import Item from "./Item";
import Header from "./Header";
import Signup from "./Signup";
import Login from "./Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Game from "./Game";
import People from "./People";
import SelectBox from "./SelectBox";
import { useEffect, useState } from "react";
import { httpsCallable } from 'firebase/functions';
import { functions } from "./firebase/config";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PaypalPayment from "./PaypalPayment";


function App() {
  const { authIsReady, user } = useAuthContext();

  const getHello = async () => {
    const sayHello = httpsCallable(functions, 'sayHello');
    const result = await sayHello();
    console.log("RESPONSE", result);
  }

  const adminRole = async () => {
    const email = user?.email;
    const addAdminRole = httpsCallable(functions, 'addAdminRole');
    const result = await addAdminRole({ email });
    console.log("RESPONSE", result);
  }

  const getToken = async () => {

    user.getIdTokenResult().then(idtokenResult => {
      console.log("Claims", idtokenResult.claims)
    })
  }


  const initialOptions = {
    clientId: "AeXiCmyyn2l9kNmTtXl8qKhPiaaRCoBM4PgmROFS1rMq4FET6SgnJugobggKk-Dc-yTrahPiefc2kQ24",
    currency: "USD",
    intent: "capture",
  };


  return (
    <>
      {authIsReady && (
        <><Header />
          <button onClick={adminRole}>Set Admin</button>
          <button onClick={getToken}>get Claims</button>

          <PayPalScriptProvider options={initialOptions}>
            <PaypalPayment/>
          </PayPalScriptProvider>

          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
            <Route path="/games" element={user ? <Game /> : <Navigate to="/login" replace />} />
            <Route path="/item/:id" element={user ? <Item /> : <Navigate to="/login" replace />} />
            <Route path="/about" element={user ? <h1> About </h1> : <Navigate to="/login" replace />} />
            <Route path="/people" element={user ? <People /> : <Navigate to="/login" replace />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          </Routes></>)}

    </>

  );
}

export default App;
