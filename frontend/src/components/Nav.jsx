import profilePic from "../assets/defaultprofile.svg";

export default function Nav({ usuario }) {
  if (!usuario) return null;

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", { credentials: "include" });
    window.location.href = "/"; // o usa navigate si usas react-router
  };

  return (
    <nav className="bg-gray-700 text-white p-4 flex justify-between items-center mb-8">
      <span>
        <img
          src={profilePic}
          alt="profile"
          className="inline-block w-8 h-8 rounded-full mr-2"
        />
        {usuario.nombre} {usuario.rol === "admin" && "(ADMIN)"}
      </span>
      <button
        onClick={handleLogout}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </nav>
  );
}
