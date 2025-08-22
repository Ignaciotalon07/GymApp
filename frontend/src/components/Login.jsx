import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgLogin from "../assets/fondogym1.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.error || "Error al iniciar sesión");
        return;
      }

      // Traemos la info del usuario
      const userRes = await fetch("http://localhost:8080/api/auth/me", {
        credentials: "include",
      });

      if (!userRes.ok) {
        setError("No se pudo obtener la información del usuario");
        return;
      }

      const userData = await userRes.json();

      // Redirigimos a /inicio y pasamos el usuario como state
      navigate("/inicio", { state: { usuario: userData.usuario } });
    } catch (err) {
      console.error("Error en login:", err);
      setError("Error al conectar con el servidor");
    }
  }

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LADO IZQUIERDO */}
      <div className="w-1/2 flex items-center justify-center bg-black/60">
        <div className="max-w-md px-10 text-left">
          <h2 className="text-5xl text-white font-extrabold mb-4 leading-tight drop-shadow-lg">
            Entrená con disciplina.
            <br />
            Reservá. Cumplí. Repetí.
          </h2>
          <p className="text-gray-300 text-lg">
            Gestioná tus turnos de musculación de forma rápida y segura.
          </p>
        </div>
      </div>

      {/* LADO DERECHO - FORMULARIO */}
      <div className="w-1/2 flex items-center justify-center ">
        <div className="flex flex-col items-center justify-center w-full min-h-screen max-w-md bg-[#1f2937]/97 backdrop-blur-md gap-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white">
            Iniciar sesión
          </h1>

          {error && (
            <div className="mb-4 text-red-400 bg-red-900 bg-opacity-30 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 w-2/3">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-lg font-semibold text-white shadow-md"
            >
              Ingresar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            ¿No tenés cuenta?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Registrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
