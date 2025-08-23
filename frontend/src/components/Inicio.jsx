import React, { useState, useEffect } from "react";
import Nav from "./Nav";

//IMG HERO
import gymBanner from "../assets/bghero.jpg";

// IMG PLANES
import planBasicoImg from "../assets/plan1.jpg";
import planPremiumImg from "../assets/plan2.jpg";
import planOnlineImg from "../assets/plan3.jpg";

//IMG EJERCICIOS
import exercise1 from "../assets/sentadilla.avif";
import exercise2 from "../assets/pressbanca.jpg";
import exercise3 from "../assets/plancha.webp";
import exercise4 from "../assets/dominadas.webp";

//IMG SOBRE NOSOTROS
import sucursales from "../assets/location.svg";
import fire from "../assets/fire.svg";
import training from "../assets/training.svg";

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

  if (!usuario) return;

  return (
    <>
      {/* Nav con usuario */}
      <Nav usuario={usuario} />

      <main className=" space-y-10">
        {/* Banner principal */}
        <section className="relative my-8">
          <img
            src={gymBanner}
            alt="Gym Banner"
            className="w-full h-150 object-cover "
          />
          <div className="absolute inset-0  flex items-center justify-center rounded-lg">
            <h1 className="text-red-600 text-6xl font-bold text-center">
              Hola{usuario ? ` ${usuario.nombre}` : ""}, <br></br> Bienvenido a
              GymMaster!
            </h1>
          </div>
        </section>

        {/* Planes */}
        <section id="planes" className="space-y-6 py-12 mx-10">
          <h2 className="text-4xl font-bold mb-6 text-center text-amber-50">
            Planes Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Plan Básico",
                desc: "Acceso al gimnasio en horarios regulares y clases grupales básicas.",
                price: "$15.000 / mes",
                img: planBasicoImg,
              },
              {
                title: "Plan Premium",
                desc: "Acceso 24/7, clases premium, entrenadores personales y seguimiento de progreso.",
                price: "$25.000 / mes",
                img: planPremiumImg,
              },
              {
                title: "Plan Online",
                desc: "Rutinas y seguimiento desde casa, con videos y asistencia virtual.",
                price: "$12.000 / mes",
                img: planOnlineImg,
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,191,0,0.7)]"
              >
                {/* Imagen */}
                <img
                  src={plan.img}
                  alt={plan.title}
                  className="w-full h-100 object-cover"
                />

                {/* Contenido */}
                <div className="p-6 text-center">
                  <h3 className="font-bold text-2xl text-blue-600 mb-2">
                    {plan.title}
                  </h3>
                  <p className="mb-4 text-white">{plan.desc}</p>
                  <p className="text-2xl font-extrabold text-gray-800 mb-4">
                    {plan.price}
                  </p>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
                    Elegir Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ejercicios destacados */}
        <section id="ejercicios" className="space-y-6 p-8 bg-gray-800 mb-20">
          <h2 className="text-4xl font-bold mb-5 pb-4 text-white text-center">
            Ejercicios Destacados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[exercise1, exercise2, exercise3, exercise4].map((img, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-3xl"
              >
                <img
                  src={img ? img : "placeholder.jpg"}
                  alt={`Ejercicio ${idx + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-500"
                />
                {/* Overlay con título */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 opacity-0 hover:opacity-50 transition-opacity duration-500">
                  <h3 className="text-xl font-bold text-amber-50 mb-1">
                    {
                      ["Sentadillas", "Press de Banca", "Plancha", "Dominadas"][
                        idx
                      ]
                    }
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {
                      [
                        "Fortalece piernas y glúteos de forma efectiva.",
                        "Trabaja pecho, hombros y tríceps.",
                        "Mejora tu core y estabilidad.",
                        "Desarrolla espalda y bíceps.",
                      ][idx]
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consejos */}
        <section id="consejos" className="bg-yellow-300 p-10 text-center mb-20">
          <h2 className="text-4xl font-bold mb-5">
            Consejos para tus entrenamientos
          </h2>
          <div className="text-center">
            <ul className="list-disc list-outside inline-block space-y-1 text-left">
              <li>Calienta siempre antes de entrenar.</li>
              <li>
                Mantén una alimentación balanceada y suficiente hidratación.
              </li>
              <li>Escucha a tu cuerpo y descansa cuando sea necesario.</li>
              <li>Combina ejercicios de fuerza, cardio y flexibilidad.</li>
            </ul>
          </div>

          <button className="text-white font-bold text-xl bg-red-500 hover:bg-red-700 cursor-pointer mt-10 rounded-2xl px-8 py-2">
            Contactanos
          </button>
        </section>

        {/* MAS SOBRE NOSOTROS */}
        <section
          id="sobre-nosotros"
          className="bg-gray-800 text-white py-16 px-6 rounded-lg space-y-8 mb-20"
        >
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-4xl font-bold">Más sobre nosotros</h2>
            <p className="text-lg text-gray-300">
              En OnFit llevamos la experiencia premium a otro nivel, conocé
              nuestras instalaciones y unite a la comunidad.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center space-y-2">
              <img src={sucursales} alt="Sucursales" className="h-10 w-10" />
              <h3 className="text-4xl font-bold text-amber-400">18</h3>
              <p className="text-gray-300 font-medium">Sucursales</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center space-y-2">
              <img
                src={fire}
                alt="Entrenamientos diarios"
                className="h-10 w-10"
              />
              <h3 className="text-4xl font-bold text-amber-400">15.323</h3>
              <p className="text-gray-300 font-medium">
                Entrenamientos diarios
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center space-y-2">
              <img src={training} alt="Entrenadores" className="h-10 w-10" />
              <h3 className="text-4xl font-bold text-amber-400">124</h3>
              <p className="text-gray-300 font-medium">Entrenadores</p>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section
          id="faq"
          className="bg-gray-100 p-6 rounded-lg shadow-lg mx-10 mb-20"
        >
          <h2 className="text-3xl font-bold mb-5">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {/* Pregunta 1 */}
            <details className="group bg-white hover:bg-amber-300 open:bg-amber-200 p-4 rounded-lg shadow cursor-pointer transition-colors duration-300">
              <summary className="font-semibold text-lg">
                ¿Cuál es el horario del gimnasio?
              </summary>
              <p className="mt-2 text-gray-600">
                Nuestro gimnasio está abierto de lunes a viernes de 7:00 a 22:00
                hs y sábados de 9:00 a 18:00 hs.
              </p>
            </details>

            {/* Pregunta 2 */}
            <details className="group bg-white  hover:bg-amber-300 open:bg-amber-200 p-4 rounded-lg shadow cursor-pointer transition-colors duration-300">
              <summary className="font-semibold text-lg">
                ¿Necesito reservar para entrenar?
              </summary>
              <p className="mt-2 text-gray-600">
                Si, es necesario reservar para el ingreso general, podes hacerlo
                desde aqui mismo haciendo click en el boton "Reservar Clase" .
              </p>
            </details>

            {/* Pregunta 3 */}
            <details className="group bg-white  hover:bg-amber-300 open:bg-amber-200 p-4 rounded-lg shadow cursor-pointer transition-colors duration-300">
              <summary className="font-semibold text-lg">
                ¿Ofrecen planes personalizados?
              </summary>
              <p className="mt-2 text-gray-600">
                Sí, contamos con entrenadores que diseñan rutinas y planes de
                alimentación personalizados.
              </p>
            </details>

            {/* Pregunta 4 */}
            <details className="group bg-white  hover:bg-amber-300 open:bg-amber-200 p-4 rounded-lg shadow cursor-pointer transition-colors duration-300">
              <summary className="font-semibold text-lg">
                ¿Aceptan distintos medios de pago?
              </summary>
              <p className="mt-2 text-gray-600">
                Aceptamos efectivo, tarjetas de débito, crédito y transferencias
                bancarias.
              </p>
            </details>

            {/* Pregunta 5 */}
            <details className="group bg-white  hover:bg-amber-300 open:bg-amber-200 p-4 rounded-lg shadow cursor-pointer transition-colors duration-300">
              <summary className="font-semibold text-lg">
                ¿Puedo probar una clase gratis?
              </summary>
              <p className="mt-2 text-gray-600">
                Sí, ofrecemos una clase gratuita de prueba en cualquiera de
                nuestras disciplinas.
              </p>
            </details>
          </div>
        </section>

        {/* UBICACION */}
        <section id="ubicacion" className="bg-gray-100 p-6 ">
          <h2 className="text-2xl font-bold mb-4">Nuestra Ubicación</h2>
          <p className="mb-4">
            Estamos en Av. Siempre Viva 123, Cordoba, Argentina. A metros de
            plaza españa, contamos con estacionamiento disponible.
          </p>

          {/* Mapa de Google Maps embebido */}
          <div className="w-full h-100 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531550444!3d-37.81627974202157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577a6f96b0b7a3!2sAv.%20Siempre%20Viva%20123!5e0!3m2!1ses!2sar!4v1697812982341!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>
    </>
  );
}
