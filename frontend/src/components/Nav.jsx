import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile2 from "../assets/profile2.svg";

export default function Nav({ usuario }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (!usuario) return null;

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", { credentials: "include" });
    window.location.href = "/";
  };

  // Función para manejar scroll a secciones
  const scrollToSection = (id) => {
    navigate("/inicio"); // aseguramos estar en /inicio
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // pequeño delay para que la página cargue
  };

  return (
    <nav className="px-6 py-6 flex items-center justify-between">
      <div>
        <h1
          className="text-blue-400 text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/inicio")}
        >
          GymMaster
        </h1>
      </div>

      <div className="flex space-x-8 text-lg font-medium">
        <button
          onClick={() => navigate("/inicio")}
          className="px-4 py-2 text-white hover:text-red-500 transition-colors duration-300"
        >
          Inicio
        </button>

        <button
          onClick={() => scrollToSection("planes")}
          className="px-4 py-2 text-white hover:text-red-500 transition-colors duration-300"
        >
          Planes
        </button>

        <button
          onClick={() => scrollToSection("contacto")}
          className="px-4 py-2 text-white hover:text-red-500 transition-colors duration-300"
        >
          Contacto
        </button>
      </div>

      {/* Derecha - Botón y perfil */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/reservas")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900 transition-colors cursor-pointer"
        >
          Reservar Clase
        </button>
        <button onClick={() => setMenuOpen(true)}>
          <img
            src={profile2}
            alt="Perfil"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </button>
      </div>

      {/* Menú desplegable lateral */}
      <div
        className={`fixed right-0 top-0 w-64 h-full bg-gray-200 text-gray-800 shadow-xl z-50 transform transition-transform duration-600 p-6
         ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-red-500 hover:text-black font-bold"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-6">Mi Perfil</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="hover:text-red-600 transition-colors duration-200"
            >
              Ver Perfil
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-red-600 transition-colors duration-200"
            >
              Mis Reservas
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-red-600 transition-colors duration-200"
            >
              Configuración
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
