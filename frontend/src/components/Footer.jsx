import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Logo / Nombre */}
        <div className="text-2xl font-bold text-amber-400">OnFit</div>

        {/* Links o descripción */}
        <p className="text-gray-300 text-center md:text-left">
          Llevamos la experiencia premium a otro nivel. Conectate con nosotros
          en redes sociales.
        </p>

        {/* Redes sociales */}
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 p-3 rounded-full hover:scale-110 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm8 1a1 1 0 100 2 1 1 0 000-2zm-5 1a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
            </svg>
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 p-3 rounded-full hover:scale-110 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 17 22 12z" />
            </svg>
          </a>

          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
            className="bg-blue-400 p-3 rounded-full hover:scale-110 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.162 5.656c-.793.352-1.644.59-2.538.697a4.486 4.486 0 001.965-2.476 9.02 9.02 0 01-2.828 1.082 4.513 4.513 0 00-7.688 4.113 12.806 12.806 0 01-9.297-4.711 4.506 4.506 0 001.395 6.021 4.49 4.49 0 01-2.045-.567v.057a4.516 4.516 0 003.618 4.424 4.51 4.51 0 01-2.038.077 4.517 4.517 0 004.214 3.135 9.046 9.046 0 01-5.594 1.926c-.362 0-.72-.021-1.074-.063a12.772 12.772 0 006.918 2.03c8.303 0 12.84-6.875 12.84-12.841 0-.196-.004-.392-.013-.587a9.164 9.164 0 002.248-2.333z" />
            </svg>
          </a>
        </div>
      </div>

      {/* CopyRight */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} OnFit. Todos los derechos reservados.
      </div>
    </footer>
  );
}
