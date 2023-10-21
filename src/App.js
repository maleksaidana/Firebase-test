import Home from "./Home";
import { Routes, Route } from "react-router-dom"
import Item from "./Item";

function App() {
  return (
    <Routes>
    <Route path="/" element={ <Home/> } />
    <Route path="/item/:id" element={ <Item/> } />
  </Routes>

  );
}

export default App;
