import { useState } from "react";
import Axios from "axios";
import "../css/Table.css";
import "../css/FloatStyle.css";

export default function InscripcionesModificar({
  inscripcion,
  setModificacion,
  setRefresh,
}) {
  const storedToken = localStorage.getItem("token");

  const [newDate, setNewDate] = useState();

  const handleConfirmar = () => {
    const inscripcionData = {
      fecha_inscripcion: newDate,
    };

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.put(
      `http://127.0.0.1:4000/inscripciones/${inscripcion.nro_materia_i}/${inscripcion.legajo_A}`,
      inscripcionData
    )
      .then(() => {
        alert(`Se modifico la inscripcion.`);
        setModificacion(false);
      })
      .catch((error) => {
        alert(`No se pudo modificar usuario`);
        console.error(error);
      });

    setRefresh(false);
  };

  return (
    <>
      <body id="TablePage">
        <div className="floating-modal">
          <div className="modal-content">
            <h4>Modificar Fecha Inscripcion:</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Numero Materia</th>
                  <th>Legajo Alumno</th>
                  <th>Fecha De Inscripcion</th>
                  <th>Confirmar Cambios</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={`${inscripcion.nro_materia_i}_${inscripcion.legajo_A}`}
                >
                  <td>{inscripcion.nro_materia_i}</td>
                  <td>{inscripcion.legajo_A}</td>
                  <td>
                    <input
                      type="date"
                      placeholder="Ingrese Fecha"
                      onChange={(e) => setNewDate(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleConfirmar}>OK</button>
                    <button onClick={() => setModificacion(false)}>
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
}
