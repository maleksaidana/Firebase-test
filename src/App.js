import Home from "./Home";
import { Routes, Route } from "react-router-dom"
import Item from "./Item";
import Header from "./Header";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/about" element={<h1> About </h1>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>

  );
}

export default App;
