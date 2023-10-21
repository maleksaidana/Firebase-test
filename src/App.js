import Home from "./Home";
import { Routes, Route } from "react-router-dom"
import Item from "./Item";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/about" element={<h1> About </h1>} />
      </Routes>
    </>

  );
}

export default App;
