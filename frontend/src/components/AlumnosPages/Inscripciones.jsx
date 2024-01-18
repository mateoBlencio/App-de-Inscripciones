import { useState } from "react";
import Axios from "axios";
import "../css/Table.css";

export default function Inscripciones() {
  const storedToken = localStorage.getItem("token");

  const [inscripciones, setInscripciones] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  return (
    <>
      <body id="TablePage">
        <h1>Inscripciones:</h1>
          <table id="table">
            <thead>
              <tr>
                <th>Numero Materia</th>
                <th>Legajo Alumno</th>
                <th>Fecha De Inscripcion</th>
                <th>Eliminar Insc.</th>
              </tr>
            </thead>
            <tbody>
              {inscripciones &&
                inscripciones.map((inscripcion) => (
                  <tr
                    key={`${inscripcion.nro_materia_i}_${inscripcion.legajo_A}`}
                  >
                    <td>{inscripcion.nro_materia_i}</td>
                    <td>{inscripcion.legajo_A}</td>
                    <td>{inscripcion.fecha_inscripcion}</td>
                    <td>
                      <button onClick={() => handleEliminarInsc(inscripcion)}>
                        X
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
      </body>
    </>
  );
}
