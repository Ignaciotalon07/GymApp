import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reservas from "./components/Reservas";
import Nav from "./components/Nav";
import NuevaReserva from "./components/NuevaReserva";
import ChatFlotante from "./components/ChatFlotante.jsx";
import Inicio from "./components/Inicio.jsx";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/inicio"
          element={
            <>
              <Nav />
              <Inicio />{" "}
              {/* Aquí tu sección con ejercicios, planes, consejos */}
            </>
          }
        />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/reservas/nuevareserva" element={<NuevaReserva />} />
      </Routes>
      <ChatFlotante />
    </Router>
  );
}

export default App;
