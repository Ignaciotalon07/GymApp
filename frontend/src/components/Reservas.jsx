import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav.jsx";
import reservas from "../assets/reservas.jpg";

export default function Reservas() {
  const location = useLocation();
  const [reservas, setReservas] = useState([]);
  const [usuario, setUsuario] = useState(location.state?.usuario || null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Si no tenemos usuario por estado (ej. recarga) lo buscamos
        if (!usuario) {
          const userRes = await fetch("http://localhost:8080/api/auth/me", {
            credentials: "include",
          });
          if (!userRes.ok) throw new Error("No se pudo obtener usuario");
          const userData = await userRes.json();
          setUsuario(userData.usuario);
        }

        // Luego, fetch de reservas (ya con usuario seteado o no)
        const res = await fetch("http://localhost:8080/api/reservas/", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Error en la petición");
        const data = await res.json();
        setReservas(data.reservas);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
        setError(true);
      }
    };
    fetchData();
  }, [usuario]); // se ejecuta si cambia usuario

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 bg-red-700 text-white rounded-lg shadow-lg text-center">
        Hubo un error al cargar las reservas. Por favor, intentá nuevamente más
        tarde.
      </div>
    );
  }

  return (
    <>
      {usuario && <Nav usuario={usuario} />}

      <div
        className={`relative max-w-6xl mx-auto py-40 px-6 min-h-screen rounded-lg shadow-lg overflow-hidden ${
          usuario?.rol === "admin" ? "bg-gray-900" : "bg-gray-800"
        }`}
      >
        {/* Imagen de fondo con overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${reservas})`,
          }}
        ></div>
        <div className="relative z-10">
          {reservas.length > 0 ? (
            <>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                {usuario?.rol === "admin"
                  ? "Estas son todas las reservas de los usuarios"
                  : `${usuario?.nombre}, estas son tus reservas!`}
              </h2>

              <ul className="space-y-6">
                {reservas.map((reserva) => (
                  <li
                    key={reserva._id}
                    className="bg-gray-700 bg-opacity-90 p-6 rounded-2xl text-white shadow-lg hover:shadow-2xl transition-shadow"
                  >
                    {usuario?.rol === "admin" && (
                      <div>
                        <strong>Usuario:</strong> {reserva.usuarioId?.nombre}
                      </div>
                    )}
                    <div>
                      <strong>Fecha y hora:</strong>{" "}
                      {formatearFecha(reserva.fechaHora)}
                    </div>
                    <div>
                      <strong>Estado:</strong> {reserva.estado}
                    </div>
                    <div>
                      <strong>Para:</strong> MUSCULACIÓN
                    </div>
                    <button
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-full shadow-md transition-colors"
                      onClick={() => cancelarReserva(reserva._id)}
                    >
                      Cancelar Reserva
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h3 className="text-white text-center text-xl mt-20">
              No hay reservas por ahora.
            </h3>
          )}

          <div className="mt-10 text-center">
            <a
              href="/reservas/nuevareserva"
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-3 rounded-full shadow-md transition"
            >
              Reservar nuevo turno
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function formatearFecha(fecha) {
  const f = new Date(fecha);
  return f.toLocaleString("es-AR", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

function cancelarReserva(id) {
  fetch(`http://localhost:8080/api/reservas/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then((res) => res.json())
    .then(() => {
      window.location.reload();
    });
}
