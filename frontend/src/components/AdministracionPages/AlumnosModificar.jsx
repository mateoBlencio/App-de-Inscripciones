import { useState } from "react";
import Axios from "axios";
import "../css/Table.css";
import "../css/FloatStyle.css";

export default function AlumnosModificar({ alumno, setModificar, setRefresh }) {
  const storedToken = localStorage.getItem("token");

  const [nro_carrera, setNro_carrera] = useState(alumno.nro_carrera);
  const [ano_ingreso, setAno_ingreso] = useState(alumno.ano_ingreso);
  const [nombre, setNombre] = useState(alumno.nombre);
  const [role, setRole] = useState(alumno.role);
  const [password, setPassword] = useState(alumno.password);

  const handleModificar = () => {
    const alumnoData = {
      nro_carrera: parseInt(nro_carrera),
      ano_ingreso: ano_ingreso,
      nombre: nombre,
      role: role,
      password: password,
    };

    if (alumnoData.role === "alumno" || alumnoData.role === "admin") {
      Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      Axios.put(`http://127.0.0.1:4000/alumnos/${alumno.legajo}`, alumnoData)
        .then(() => {
          alert(`Se modifico el alumno.`);
          setModificar(false);
          setRefresh(false);
        })
        .catch((error) => {
          alert(`No se pudo modificar el alumno`);
          console.error(error);
        });
    } else {
      alert("Error");
      return;
    }
  };

  return (
    <>
    <body id="TablePage">
      <div className="floating-modal">
      <div className="modal-content">
          <h2>Modificar Alumno:</h2>
        <table id="table">
          <thead>
            <tr>
              <th>Legajo</th>
              <th>Nombre</th>
              <th>Contraseña</th>
              <th>Nro de Carrera</th>
              <th>Fecha de Ingreso</th>
              <th>Rol</th>
              <th>Cambios</th>
            </tr>
          </thead>
          <tbody>
            <tr key={`${alumno.legajo}`}>
              <td>{alumno.legajo}</td>
              <td>
                <input
                  type="text"
                  placeholder="Nombre"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="password"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Nro de Carrera"
                  onChange={(e) => setNro_carrera(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  placeholder="Fecha de Ingreso"
                  onChange={(e) => setAno_ingreso(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Rol"
                  onChange={(e) => setRole(e.target.value)}
                />
              </td>
              <td>
                <button className="inputs" onClick={handleModificar}>
                  Guardar
                </button>
                <button className="inputs" onClick={() => setModificar(false)}>
                  Cancelar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
  </>
  );
};
