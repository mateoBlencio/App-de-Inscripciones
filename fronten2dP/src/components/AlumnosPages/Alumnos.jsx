import { useState } from "react";
import Axios from "axios";
import "../css/Table.css";
import "../css/SearchBar.css";

export default function Alumnos() {
  const storedToken = localStorage.getItem("token");

  const [alumno, setAlumno] = useState(null);
  const [legajoBuscado, setLegajoBuscado] = useState();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!legajoBuscado) {
      alert("Todos los campos son obligatorios");
      return;
    }

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.get(`http://127.0.0.1:4000/alumnos/${legajoBuscado}`)
      .then((response) => {
        setAlumno(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setAlumno("");
    setLegajoBuscado("");
  };

  return (
    <>
      <body id="TablePage">
        <h1>Buscar alumno:</h1>
        <div id="SearchBarPage">
          <input
            class="search-input"
            type="text"
            placeholder="Ingrese el legajo del alumno"
            value={legajoBuscado}
            onChange={(e) => setLegajoBuscado(e.target.value)}
          />
          <button class="search-button" onClick={handleSearch}>
            Buscar
          </button>
          <button class="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
        {alumno && (
          <div>
            <table id="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Legajo</th>
                  <th>Rol</th>
                  <th>Año de ingreso</th>
                  <th>Año de egreso</th>
                  <th>Numero de Carrera</th>
                </tr>
              </thead>
              <tbody>
                <tr key={alumno.legajo}>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.legajo}</td>
                  <td>{alumno.role}</td>
                  <td>{alumno.ano_ingreso}</td>
                  <td>{alumno.ano_egreso}</td>
                  <td>{alumno.nro_carrera}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </body>
    </>
  );
}
