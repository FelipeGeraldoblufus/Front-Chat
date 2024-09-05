import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; 

export default function SesionScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("profile");
  const [darkMode, setDarkMode] = useState(() => {
    // Obtener la preferencia de modo oscuro del localStorage, o usar modo oscuro por defecto
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" || savedMode === null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo recuperar la información del usuario");
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  if (!userInfo) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen p-4 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-800 text-black"
        }`}
      >
        <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <p>Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <aside className={`w-64 shadow-md flex flex-col justify-between p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        {/* Título */}
        <div>
          <h1 className="text-xl font-bold mb-6 text-center">Chat-Proyect</h1>
          <ul>
            <li
              onClick={() => setActiveSection("profile")}
              className={`p-2 cursor-pointer ${
                activeSection === "profile" ? (darkMode ? "bg-gray-700" : "bg-gray-200") : ""
              }`}
            >
              Perfil
            </li>
            <li
              onClick={() => setActiveSection("projects")}
              className={`p-2 cursor-pointer ${
                activeSection === "projects" ? (darkMode ? "bg-gray-700" : "bg-gray-200") : ""
              }`}
            >
              Proyectos
            </li>
            {/* Puedes agregar más secciones aquí */}
          </ul>
        </div>

        {/* Botón de cerrar sesión */}
        <div className="mt-4">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="w-full px-4 py-2 bg-red-600 text-white font-bold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex-1 p-6">
        {/* Botón de modo oscuro en la esquina superior derecha */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {darkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <MoonIcon className="h-6 w-6 text-blue-500" />
          )}
        </button>

        {activeSection === "profile" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
            <div className="mb-4">
              <p>
                <strong>Nombre:</strong> {userInfo.name}
              </p>
            </div>
            <div className="mb-4">
              <p>
                <strong>Correo electrónico:</strong> {userInfo.email}
              </p>
            </div>
            <div className="mb-4">
              <p>
                <strong>Teléfono:</strong> {userInfo.number}
              </p>
            </div>
          </div>
        )}

        {activeSection === "projects" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
            <p>Aquí puedes listar o administrar los proyectos.</p>
          </div>
        )}

        {!activeSection && (
          <div>
            <p>Selecciona una opción del menú a la izquierda.</p>
          </div>
        )}
      </main>
    </div>
  );
}

