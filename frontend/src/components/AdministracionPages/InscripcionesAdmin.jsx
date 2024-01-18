import { useState } from "react";
import Axios from "axios";
import InscripcionesModificar from "./InscripcionesModificar";
import InscripcionesAgregar from "./InscripcionesAgregar";
import "../css/Table.css";
import "../css/SearchBar.css";

export default function Inscripciones() {
  const storedToken = localStorage.getItem("token");

  const [inscripciones, setInscripciones] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [legajoBuscado, setLegajoBuscado] = useState();
  const [nroMateria, setNroMateria] = useState();
  const [modificacion, setModificacion] = useState(false);
  const [selectedInscription, setSelectedInscription] = useState();
  const [agregar, setAgregar] = useState(false);

  if (!refresh) {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.get("http://127.0.0.1:4000/inscripciones")
      .then((response) => {
        setInscripciones(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setRefresh(true);
  }

  const handleEliminarInsc = (inscripcion) => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.delete(
      `http://127.0.0.1:4000/inscripciones/${inscripcion.nro_materia_i}/${inscripcion.legajo_A}`
    )
      .then(() => {
        alert("Inscripcion eliminada con exito");
        setRefresh(false);
      })
      .catch((error) => {
        console.log("Error al eliminar la inscripción", error);
        alert("No se pudo eliminar inscripcion");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!nroMateria && !legajoBuscado) {
      setRefresh(false);
    } else {
      if (!nroMateria || !legajoBuscado) {
        alert("Todos los campos son obligatorios");
        return;
      }
    }

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.get(
      `http://127.0.0.1:4000/inscripciones/${nroMateria}/${legajoBuscado}`
    )
      .then((response) => {
        setInscripciones([response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleModificar = (inscripcion) => {
    setSelectedInscription(inscripcion);
    setModificacion(true);
  };

  const handleAgregar = () => {
    setAgregar(true);
  };

  return (
    <>
      <body>
        <h1>Administracion Inscripciones:</h1>
        <h2>Buscar Inscripcion:</h2>
        <div id="SearchBarPage">
          <input
            class="search-input"
            type="number"
            placeholder="Numero de materia"
            value={nroMateria}
            onChange={(e) => setNroMateria(e.target.value)}
          />
          <input
             class="search-input"
            type="number"
            placeholder="Legajo del alumno"
            value={legajoBuscado}
            onChange={(e) => setLegajoBuscado(e.target.value)}
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
        <div id="TablePage">
          <table id="table">
            <thead>
              <tr>
                <th className="text-center">Numero Materia</th>
                <th className="text-center">Legajo Alumno</th>
                <th className="text-center">Fecha De Inscripcion</th>
                <th className="text-center">Eliminar Insc.</th>
                <th className="text-center">Modificar Insc.</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones &&
                inscripciones.map((inscripcion) => (
                  <>
                    <tr
                      key={`${inscripcion.nro_materia_i}_${inscripcion.legajo_A}`}
                    >
                      <td>{inscripcion.nro_materia_i}</td>
                      <td>{inscripcion.legajo_A}</td>
                      <td>{inscripcion.fecha_inscripcion}</td>
                      <td>
                        <button
                          className="inputs"
                          onClick={() => handleEliminarInsc(inscripcion)}
                        >
                          X
                        </button>
                      </td>
                      <td>
                        <button
                          className="inputs"
                          onClick={() => handleModificar(inscripcion)}
                        >
                          O
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
            {modificacion && (
              <InscripcionesModificar
                inscripcion={selectedInscription}
                setModificacion={setModificacion}
                setRefresh={setRefresh}
              />
            )}
          </table>
        </div>
        {agregar && (
          <InscripcionesAgregar
            setAgregar={setAgregar}
            setRefresh={setRefresh}
          />
        )}
      </body>
    </>
  );
}
