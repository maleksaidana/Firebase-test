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
    { image: "/fortnite.png", text: 'League Of Legends', value: "League Of Legends" }];
  const [selectedOption, setSelectedOption] = useState({ text: "", value: "", image: "" });
  const [selectedOption2, setSelectedOption2] = useState({ text: "", value: "", image: "" });


  return (
    <>
      {authIsReady && (
        <><Header />
          <SelectBox
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          <button onClick={() => { console.log("LOL", selectedOption) }}>MALEK</button>


          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
            <Route path="/games" element={user ? <Game /> : <Navigate to="/login" replace />} />
            <Route path="/item/:id" element={user ? <Item /> : <Navigate to="/login" replace />} />
            <Route path="/about" element={user ? <h1> About </h1> : <Navigate to="/login" replace />} />
            <Route path="/people" element={user ? <People /> : <Navigate to="/login" replace />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          </Routes></>)}

          <SelectBox
            options={options}
            selectedOption={selectedOption2}
            setSelectedOption={setSelectedOption2}
          />
    </>

  );
}

export default App;
