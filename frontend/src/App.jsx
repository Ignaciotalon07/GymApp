import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import Reservas from "./components/Reservas";
import Nav from "./components/Nav";
import NuevaReserva from "./components/NuevaReserva";
import ChatFlotante from "./components/ChatFlotante.jsx";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/reservas/nuevareserva" element={<NuevaReserva />} />
      </Routes>
      <ChatFlotante />
    </Router>
  );
}

export default App;
