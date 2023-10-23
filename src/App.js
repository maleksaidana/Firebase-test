import Home from "./Home";
import { Routes, Route, Navigate } from "react-router-dom"
import Item from "./Item";
import Header from "./Header";
import Signup from "./Signup";
import Login from "./Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Game from "./Game";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <>
      {authIsReady && (
        <><Header />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/games" element={user ? <Game /> : <Navigate to="/login" replace />} />
          <Route path="/item/:id" element={user ? <Item /> : <Navigate to="/login" replace />} />
          <Route path="/about" element={user ? <h1> About </h1> : <Navigate to="/login" replace />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        </Routes></>)}
    </>

  );
}

export default App;
