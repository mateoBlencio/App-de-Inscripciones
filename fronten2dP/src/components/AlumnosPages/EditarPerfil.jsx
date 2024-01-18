import { useState } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import "../css/Forms.css";

export default function EditarPerfil() {
  const storedToken = localStorage.getItem("token");
  const storedLegajo = localStorage.getItem("legajo");

  const [nro_carrera, setNroCarrera] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [ano_ingreso, setAno_ingreso] = useState("");
  const [refresh, setRefresh] = useState(false);

  if (!refresh) {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.get(`http://127.0.0.1:4000/alumnos/${storedLegajo}`)
      .then((response) => {
        setNroCarrera(response.data.nro_carrera);
        setNombre(response.data.nombre);
        setAno_ingreso(response.data.ano_ingreso);
      })
      .catch((error) => {
        console.error(error);
      });
    setRefresh(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const alumnoData = {};

    if (nro_carrera) alumnoData.nro_carrera = parseInt(nro_carrera);
    if (nombre) alumnoData.nombre = nombre;
    if (password) alumnoData.password = password;
    if (ano_ingreso) alumnoData.ano_ingreso = ano_ingreso;

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.put(`http://127.0.0.1:4000/alumnos/${storedLegajo}`, alumnoData)
      .then(() => {
        alert(`Se modifico el usuario. Legajo: ${storedLegajo}`);
        if (nombre) {
          localStorage.setItem("nombre", nombre);
        }
        setRefresh(false);
      })
      .catch((error) => {
        alert(`No se pudo modificar usuario`);
        console.error(error);
      });

    setNroCarrera();
    setNombre("");
    setPassword("");
    setAno_ingreso("");
  };

  return (
    <>
      <body id="Form">
        <h1 className="letters">Editar Perfil</h1>
        <div className="description-container">
          <p className="letters">
            Ingrese solo los registros que desee modificar:
          </p>
          <p className="letters">Legajo: {storedLegajo}</p>
        </div>
        <div>
          <form className="formulario">
            <input
              type="text"
              value={nombre}
              placeholder="Nombre"
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="number"
              placeholder="Numero de Carrera"
              value={nro_carrera}
              onChange={(e) => setNroCarrera(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="date"
              placeholder="Fecha de ingreso"
              value={ano_ingreso}
              onChange={(e) => setAno_ingreso(e.target.value)}
            />
            <div className="buttons-container">
              <buttom className="buttomSubmit" onClick={handleSubmit}>
                Editar
              </buttom>
              <NavLink className="buttomSubmit" to="/Home">
                <buttom id="cancel">Cancelar</buttom>
              </NavLink>
            </div>
          </form>
        </div>
      </body>
    </>
  );
}
