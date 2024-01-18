import { NavLink, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "../css/Encabezado.css"

export default function Home() {
  const storedNombre = localStorage.getItem("nombre");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("legajo");
    localStorage.removeItem("role");
    navigate('/');
  };

  return (
    <>
      <div id="PortalHeader">
        <div class="PortalTitle">
          <h1>Bienvenido, {storedNombre}</h1>
        </div>
        <button class="LogOut" onClick={() => navigate("/EditarPerfil")}>Editar perfil</button>
        <button class="LogOut" onClick={handleLogout}>Cerrar sesion</button>
      </div>
      <Nav />
    </>
  );
}
