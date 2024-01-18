import { useState } from "react";
import Axios from "axios";
import MateriasModificar from "./MateriasModificar";
import MateriasAgregar from "./MateriasAgregar";
import "../css/Table.css";
import "../css/SearchBar.css";

export default function MateriasAdmin() {
  const storedToken = localStorage.getItem("token");

  const [refresh, setRefresh] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [modificacion, setModificacion] = useState(false);
  const [materiaModificar, setMateriaModificar] = useState(false);
  const [nroMateria, setNroMateria] = useState();
  const [agregar, setAgregar] = useState(false);

  if (!refresh) {
    Axios.get("http://127.0.0.1:4000/materias")
      .then((response) => {
        setMaterias(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setRefresh(true);
  }

  const handleEliminar = (materia) => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.delete(`http://127.0.0.1:4000/materias/${materia.nro_materia}`)
      .then(() => {
        alert("Materia eliminada");
        setRefresh(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleModificar = (materia) => {
    setMateriaModificar(materia);
    setModificacion(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!nroMateria) {
      setRefresh(false);
    } else {
      if (!nroMateria) {
        alert("Todos los campos son obligatorios");
        return;
      }
    }

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.get(`http://127.0.0.1:4000/materias/${nroMateria}`)
      .then((response) => {
        setMaterias([response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setNroMateria("");
    setRefresh(false);
  };

  const handleAgregar = () => {
    setAgregar(true);
  };

  return (
    <>
      <body id="TablePage">
        <h2>Materias:</h2>
        <div>
          <h4>Buscar Inscripcion:</h4>
          <div id="SearchBarPage">
            <input
              class="search-input"
              type="number"
              placeholder="Numero de materia"
              value={nroMateria}
              onChange={(e) => setNroMateria(e.target.value)}
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
                <th>Numero</th>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Tipo de duracion</th>
                <th>Eliminar</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {materias &&
                materias.map((materia) => (
                  <tr key={materia.nro_materia}>
                    <td>{materia.nro_materia}</td>
                    <td>{materia.nombre}</td>
                    <td>{materia.nro_carrera}</td>
                    <td>{materia.tipo_duracion}</td>
                    <td>
                      <button onClick={() => handleEliminar(materia)}>X</button>
                    </td>
                    <td>
                      <button onClick={() => handleModificar(materia)}>
                        O
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {modificacion && (
            <MateriasModificar
              materia={materiaModificar}
              setModificacion={setModificacion}
              setRefresh={setRefresh}
            />
          )}
          {agregar && (
            <MateriasAgregar setAgregar={setAgregar} setRefresh={setRefresh} />
          )}
        </div>
      </body>
    </>
  );
}
