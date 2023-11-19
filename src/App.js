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
import { useState } from "react";

function App() {
  const { authIsReady, user } = useAuthContext();
  const options = [
    { image: "/fortnite.png", text: 'Fortnite', value: "Fortnite" },
    { image: "/fortnite.png", text: 'Free Fire', value: "Free Fire" },
    { image: "/fortnite.png", text: 'League Of Legends', value: "League Of Legends" },
    { text: 'Select An Option', value: "" },
  ];

  const [value, setValue] = useState("");

  return (
    <>
      {authIsReady && (
        <><Header />
          <SelectBox
            options={options}
            onChange={(v) => {}}
          />

          <button onClick={() => { console.log("LOL", value) }}>MALEK</button>


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
