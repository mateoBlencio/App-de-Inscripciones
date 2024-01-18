import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./css/Login.css";

export default function Register() {
  const [legajo, setLegajo] = useState();
  const [password, setPassword] = useState("");
  const [nro_carrera, setNroCarrera] = useState();
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!legajo || !password || !nro_carrera || !nombre) {
      setError(true);
      return;
    }
    setError(false);

    const role = "alumno";

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const fecha = `${year}-${month}-${day}`;

    Axios.post("http://127.0.0.1:4000/auth/register", {
      legajo,
      password,
      nro_carrera,
      nombre,
      role,
      ano_ingreso: fecha,
    })
      .then(() => {
        alert("Se a registrado con exito!!");
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <head>
        <title>Register</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,600,0,0"
        />
      </head>
      <body id="Login">
        <div class="login">
          <h2>Register</h2>
          <h3> </h3>
          <form class="login-form" onSubmit={handleSubmit}>
            <div class="textbox">
              <input
                className="inputs"
                type="text"
                placeholder="Nombre de Alumno"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div class="textbox">
              <input
                type="text"
                value={legajo}
                onChange={(e) => setLegajo(e.target.value)}
                placeholder="Legajo"
              />
            </div>
            <div class="textbox">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contrasena"
              />
            </div>
            <div class="textbox">
              <input
                className="inputs"
                type="number"
                placeholder="Numero de Carrera"
                value={nro_carrera}
                onChange={(e) => setNroCarrera(e.target.value)}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              Registrarse
            </button>
            <button onClick={()=>navigate("/")}>
              Cancelar
            </button>
            {error && <p>Todos los campos son obligatorios</p>}
          </form>
        </div>
      </body>
    </>
  );
}
