import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile2 from "../assets/profile2.svg";
import { HashLink } from "react-router-hash-link";

export default function Nav({ usuario }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (!usuario) return null;

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", { credentials: "include" });
    window.location.href = "/";
  };

  return (
    <nav className="px-6 py-8 flex items-center justify-between">
      <div>
        <h1 className="text-amber-300 text-3xl font-bold cursor-pointer ml-10">
          <HashLink smooth to="/inicio/#" className="hover:text-yellow-400">
            GymMaster
          </HashLink>{" "}
        </h1>
      </div>

      <div className="flex space-x-8 text-lg font-medium">
        <button className="cursor-pointer px-4 py-2 text-white hover:text-red-500 transition-colors duration-300">
          <HashLink smooth to="/inicio/#" className="hover:text-yellow-400">
            Inicio
          </HashLink>
        </button>

        <button className="cursor-pointer px-4 py-2 text-white hover:text-red-500 transition-colors duration-300">
          <HashLink
            smooth
            to="/inicio/#planes"
            className="hover:text-yellow-400"
          >
            Planes
          </HashLink>
        </button>

        <button className="cursor-pointer px-4 py-2 text-white hover:text-red-500 transition-colors duration-300">
          <HashLink
            smooth
            to="/inicio/#contacto"
            className="hover:text-yellow-400"
          >
            Contacto
          </HashLink>
        </button>
      </div>

      {/* Derecha - Botón y perfil */}
      <div className="flex items-center space-x-4">
        <button onClick={() => setMenuOpen(true)}>
          <img
            src={profile2}
            alt="Perfil"
            className="w-10 h-10 rounded-full cursor-pointer 
             hover:scale-125 hover:shadow-lg hover:shadow-yellow-400/50 
             transition-transform duration-300 ease-in-out"
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
              href="/reservas"
              className="hover:text-red-600 transition-colors duration-200"
            >
              {usuario?.rol === "admin" ? "Ver Reservas" : "Reservar Clase"}
            </a>
          </li>
          <li>
            <HashLink
              smooth
              to="/inicio#entrenadores"
              className="hover:text-yellow-400"
            >
              Entrenadores
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="/inicio#ubicacion"
              className="hover:text-yellow-400"
            >
              Ubicacion
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/inicio#faq" className="hover:text-yellow-400">
              Preguntas Frecuentes
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="/inicio#sobre-nosotros"
              className="hover:text-yellow-400"
            >
              Sobre Nosotros
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="/inicio#contacto"
              className="hover:text-yellow-400"
            >
              Contacto
            </HashLink>
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
