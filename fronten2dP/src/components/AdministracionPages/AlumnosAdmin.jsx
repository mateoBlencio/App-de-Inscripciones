import { useState } from "react";
import Axios from "axios";
import AlumnosModificar from "./AlumnosModificar";
import AlumnosAgregar from "./AlumnosAgregar";
import "../css/Table.css";
import "../css/SearchBar.css";

export default function AlumnosAdmin() {
  const storedToken = localStorage.getItem("token");

  const [refresh, setRefresh] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [agregar, setAgregar] = useState(false);

  const [alumnoModificar, setAlumnoModificar] = useState();
  const [alumnos, setAlumnos] = useState([]);
  const [legajo, setLegajo] = useState();

  if (!refresh) {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.get("http://127.0.0.1:4000/alumnos")
      .then((response) => {
        setAlumnos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setRefresh(true);
  }

  const handleEliminar = (alumno) => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.delete(`http://127.0.0.1:4000/alumnos/${alumno.legajo}`)
      .then(() => {
        alert("Alumno eliminado");
        setRefresh(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleModificar = (alumno) => {
    setAlumnoModificar(alumno);
    setModificar(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!legajo) {
      setRefresh(false);
    } else {
      if (!legajo) {
        alert("Todos los campos son obligatorios");
        return;
      }
    }

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.get(`http://127.0.0.1:4000/alumnos/${legajo}`)
      .then((response) => {
        setAlumnos([response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setLegajo("");
    setRefresh(false);
  };

  const handleAgregar = () => {
    setAgregar(true);
  };

  return (
    <>
      <body id="TablePage">
        <h1>Alumnos:</h1>
        <div>
          <h2>Buscar Alumno:</h2>
          <div id="SearchBarPage">
            <input
              class="search-input"
              type="number"
              placeholder="Legajo"
              value={legajo}
              onChange={(e) => setLegajo(e.target.value)}
            />
            <button class="search-button" onClick={handleSearch}>
              Buscar
            </button>
            <button class="agregate-button" onClick={handleAgregar}>
              Agregar
            </button>
            <button class="cancel-button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table id="table">
            <thead>
              <tr>
                <th>Legajo</th>
                <th>Nombre</th>
                <th>Nro Carrera</th>
                <th>Fecha de Ingreso</th>
                <th>Rol</th>
                <th>Eliminar</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {alumnos &&
                alumnos.map((alumno) => (
                  <tr key={alumno.legajo}>
                    <td>{alumno.legajo}</td>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.nro_carrera}</td>
                    <td>{alumno.ano_ingreso}</td>
                    <td>{alumno.role}</td>
                    <td>
                      <button onClick={() => handleEliminar(alumno)}>X</button>
                    </td>
                    <td>
                      <button onClick={() => handleModificar(alumno)}>O</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </body>
      {modificar && (
        <AlumnosModificar
          alumno={alumnoModificar}
          setModificar={setModificar}
          setRefresh={setRefresh}
        />
      )}
      {agregar && (
        <AlumnosAgregar setAgregar={setAgregar} setRefresh={setRefresh} />
      )}
    </>
  );
}
