import { useState } from "react";
import Axios from "axios";
import "../css/Forms.css";
import "../css/FloatStyle.css";

export default function AlumnosAgregar({ setAgregar, setRefresh }) {
  const storedToken = localStorage.getItem("token");

  const [nro_carrera, setNro_carrera] = useState();
  const [ano_ingreso, setAno_ingreso] = useState();
  const [nombre, setNombre] = useState();
  const [role, setRole] = useState();
  const [legajo, setLegajo] = useState();
  const [password, setPassword] = useState();

  const handleCancel = () => {
    setRefresh(false);
    setAgregar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const alumnoData = {
      nro_carrera: parseInt(nro_carrera),
      ano_ingreso: ano_ingreso,
      nombre: nombre,
      role: role,
      legajo: parseInt(legajo),
      password: password,
    };

    if (alumnoData.role === "alumno" || alumnoData.role === "admin") {
      Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      Axios.post(`http://127.0.0.1:4000/alumnos`, alumnoData)
        .then(() => {
          alert(`Se agrego el alumno.`);
          setRefresh(false);
        })
        .then(() => {
          setAgregar(false);
        })
        .catch((error) => {
          alert(`No se pudo Agregar el alumno`);
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="floating-modal">
        <div className="modal-content">
          <body id="Form">
            <h2>Agregar Alumno:</h2>
            <form className="formulario" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre"
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="number"
                placeholder="Legajo"
                onChange={(e) => setLegajo(e.target.value)}
              />
              <select
                value={role}  // Aquí debes establecer el valor seleccionado (puedes usar el estado 'role')
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="alumno">Alumno</option>
                <option value="admin">Administrador</option>
              </select>
              <input
                type="number"
                placeholder="Nro de Carrera"
                onChange={(e) => setNro_carrera(e.target.value)}
              />
              <input
                type="date"
                onChange={(e) => setAno_ingreso(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="buttons-container">
                <button className="buttomSubmit">Agregar Alumno</button>
                <button  className="buttomSubmit" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          </body>
        </div>
      </div>
    </>
  );
}
