import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import gymBanner from "../assets/profile2.svg";
import exercise1 from "../assets/profile2.svg";
import exercise2 from "../assets/profile2.svg";
import exercise3 from "../assets/profile2.svg";

export default function Inicio() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/auth/me", {
          credentials: "include",
        });
        if (!res.ok) {
          setUsuario(null);
          return;
        }
        const data = await res.json();
        setUsuario(data.usuario);
      } catch (err) {
        console.error("Error al traer usuario:", err);
        setUsuario(null);
      }
    };

    fetchUsuario();
  }, []);

  if (!usuario) return <p>Cargando...</p>; // opcional, evita que Nav se rompa

  return (
    <>
      {/* Nav con usuario */}
      <Nav usuario={usuario} />

      <main className="px-6 py-8 space-y-16">
        {/* Banner principal */}
        <section className="relative">
          <img
            src={gymBanner}
            alt="Gym Banner"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
            <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
              Hola{usuario ? ` ${usuario.nombre}` : ""}, <br></br> Bienvenido a
              GymMaster!
            </h1>
          </div>
        </section>

        {/* Ubicación */}
        <section
          id="ubicacion"
          className="bg-gray-100 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Nuestra Ubicación</h2>
          <p>
            Estamos en Av. Siempre Viva 123, Ciudad, País. Cerca de transporte
            público y estacionamiento disponible.
          </p>
        </section>

        {/* Ejercicios destacados */}
        <section id="ejercicios" className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Ejercicios Destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[exercise1, exercise2, exercise3].map((img, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={img}
                  alt={`Ejercicio ${idx + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    {["Sentadillas", "Press de Banca", "Plancha"][idx]}
                  </h3>
                  <p>
                    {
                      [
                        "Fortalece piernas y glúteos de forma efectiva.",
                        "Trabaja pecho, hombros y tríceps.",
                        "Mejora tu core y estabilidad.",
                      ][idx]
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Planes */}
        <section id="planes" className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Planes Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Plan Básico",
                desc: "Acceso al gimnasio en horarios regulares y clases grupales básicas.",
              },
              {
                title: "Plan Premium",
                desc: "Acceso 24/7, clases premium, entrenadores personales y seguimiento de progreso.",
              },
              {
                title: "Plan Online",
                desc: "Rutinas y seguimiento desde casa, con videos y asistencia virtual.",
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="font-bold text-xl mb-2">{plan.title}</h3>
                <p>{plan.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Consejos */}
        <section
          id="consejos"
          className="bg-gray-100 p-6 rounded-lg shadow-lg space-y-2"
        >
          <h2 className="text-2xl font-bold mb-2">
            Consejos para tus entrenamientos
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Calienta siempre antes de entrenar.</li>
            <li>
              Mantén una alimentación balanceada y suficiente hidratación.
            </li>
            <li>Escucha a tu cuerpo y descansa cuando sea necesario.</li>
            <li>Combina ejercicios de fuerza, cardio y flexibilidad.</li>
          </ul>
        </section>
      </main>
    </>
  );
}
