import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgLogin from "../assets/fondogym2.jpg";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (!res.ok) throw new Error("Error al registrarse");

      // Redirigir al login o directo a /reservas si querés
      navigate("/"); // o navigate("/reservas");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="flex w-full">
        {/* Formulario de registro */}
        <div className="w-1/2 flex items-center justify-center text-white ">
          <div className="flex flex-col items-center justify-center w-full min-h-screen max-w-md bg-[#1f2937]/97 gap-8">
            <h1 className="text-4xl font-bold text-center">Registrate</h1>

            <form onSubmit={handleSubmit} className="space-y-5 w-2/3">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md font-semibold text-white"
              >
                Registrarme
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-400">
              ¿Ya tenés cuenta?{" "}
              <a href="/" className="text-blue-400 hover:underline">
                Iniciá sesión
              </a>
            </p>
          </div>
        </div>

        {/* Frase motivadora */}
        <div className="w-1/2 bg-black/40 text-white p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-5xl font-extrabold mb-4">
            Tu progreso empieza ahora
          </h2>
          <p className="text-lg text-gray-200 max-w-md">
            Registrate, reserva tu lugar, entrena enfocado y convertite en tu
            mejor versión. ¡Bienvenido!
          </p>
        </div>
      </div>
    </div>
  );
}
