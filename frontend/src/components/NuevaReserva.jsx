import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

export default function NuevaReserva() {
  const [usuario, setUsuario] = useState(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Obtener info usuario logueado para mostrar en Nav
  useEffect(() => {
    fetch("http://localhost:8080/api/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autenticado");
        return res.json();
      })
      .then((data) => setUsuario(data.usuario))
      .catch(() => setUsuario(null));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!fecha || !hora) {
      setError("Por favor completá todos los campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/reservas", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha, hora }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar reserva");
      }

      navigate("/reservas");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  }

  return (
    <>
      {usuario && <Nav usuario={usuario} />}

      <div className="container-formNuevaReserva max-w-md mx-auto p-6 m-4 bg-gray-800 rounded-md">
        <h1 className="text-2xl font-bold text-white mb-6">Nueva Reserva</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-700 text-white rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="form-nuevaReserva space-y-4">
          <div className="form-groupNueva">
            <label htmlFor="fecha" className="block mb-1 text-gray-300">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              required
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="form-control w-full px-3 py-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div className="form-groupNueva">
            <label htmlFor="hora" className="block mb-1 text-gray-300">
              Hora
            </label>
            <input
              type="time"
              id="hora"
              name="hora"
              required
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="form-control w-full px-3 py-2 rounded bg-gray-700 text-white"
            />
          </div>

          <button
            type="submit"
            className="btn-guardar w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Guardar reserva
          </button>
        </form>

        <button
          onClick={() => navigate("/reservas")}
          className="btn-volver mt-4 text-blue-400 hover:underline"
        >
          Volver al listado
        </button>
      </div>
    </>
  );
}
