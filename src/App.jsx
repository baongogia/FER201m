import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Content/Home";
import Dashboard from "./Components/Content/Dashboard";
import Contact from "./Components/Content/Contact";
import Detail from "./Components/Content/Detail";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/Detail/:id" element={<Detail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
