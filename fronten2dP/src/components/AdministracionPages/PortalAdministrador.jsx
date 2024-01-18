import { useNavigate } from "react-router-dom";
import NavAdministrador from "./NavAdministrador";
import "../css/Encabezado.css";

export default function PortalAdministrador() {
  const storedNombre = localStorage.getItem("nombre");
  const storedLegajo = localStorage.getItem("legajo");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("legajo");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <body>
        <div id="PortalHeader">
          <div class="PortalTitle">
            <h1>Portal de administración</h1>
            <h5>
              Usuario {storedNombre} - Legajo: {storedLegajo}
            </h5>
          </div>
          <button class="LogOut" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
        <NavAdministrador />
      </body>
    </>
  );
}
