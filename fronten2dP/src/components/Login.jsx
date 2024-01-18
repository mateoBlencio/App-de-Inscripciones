import { useState } from "react";
import Axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "./css/Login.css";
import "./css/General.css"

export default function Login() {
  const [legajo, setLegajo] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!legajo || !password) {
      setError(true);
      return;
    }

    setError(false);

    Axios.post("http://127.0.0.1:4000/auth/login", { legajo, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("nombre", response.data.nombre);
        localStorage.setItem("legajo", response.data.legajo);
        localStorage.setItem("role", response.data.role);

        if (response.data.role === "alumno") {
          navigate("/Home");
        } else {
          if (response.data.role === "admin") {
            navigate("/PortalAdministrador");
          }
        }
      })
      .catch((error) => {
        setPassword("");
        alert("Usuario o contraseña incorrecta");
        console.error(error);
      });
  };

  return (
    <>
      <head>
        <title>Login</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,600,0,0"
        />
      </head>
      <body id="Login">
        <div class="login">
          <h2>Login</h2>
          <h3>Welcome back</h3>

          <form class="login-form" onSubmit={handleSubmit}>
            <div class="textbox">
              <input
                type="text"
                value={legajo}
                onChange={(e) => setLegajo(e.target.value)}
                placeholder="Legajo"
              />
              <span class="material-symbols-outlined"> account_circle </span>
            </div>
            <div class="textbox">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contrasena"
              />
              <span class="material-symbols-outlined"> lock </span>
            </div>
            <button type="submit">Ingresar</button>
            <p>
              No tiene cuenta? <NavLink to="/Register">Registrarse</NavLink>
            </p>
            {error && <p>Todos los campos son obligatorios</p>}
          </form>
        </div>
      </body>
    </>
  );
}
