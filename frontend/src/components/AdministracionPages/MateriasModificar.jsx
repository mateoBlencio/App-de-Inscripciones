import { useState } from "react";
import Axios from "axios";
import "../css/Table.css";
import "../css/FloatStyle.css";

export default function ModificarMateria({
  materia,
  setModificacion,
  setRefresh,
}) {
  const storedToken = localStorage.getItem("token");

  const [nombreMateria, setNombreMateria] = useState(materia.nombre);
  const [nroCarrera, setNroCarrera] = useState(materia.nro_carrera);
  const [tipoDuracion, setTipoDuracion] = useState(materia.tipo_duracion);

  const handleConfirmar = () => {
    const materiaData = {
      nombre: nombreMateria,
      nro_carrera: parseInt(nroCarrera),
      tipo_duracion: parseInt(tipoDuracion),
    };

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.put(
      `http://127.0.0.1:4000/materias/${materia.nro_materia}`,
      materiaData
    )
      .then(() => {
        alert(`Se modifico la materia.`);
        setModificacion(false);
        setRefresh(false);
      })
      .catch((error) => {
        alert(`No se pudo modificar la materia`);
        console.error(error);
      });
  };

  return (
    <>
      <body id="TablePage">
        <div className="floating-modal">
          <div className="modal-content">
            <h2>Modificar Materia:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Nombre</th>
                  <th>Carrera</th>
                  <th>Tipo de duracion</th>
                  <th>Modificar</th>
                </tr>
              </thead>
              <tbody>
                <tr key={`${materia.nro_materia}`}>
                  <td>{materia.nro_materia}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Nombre de Materia"
                      onChange={(e) => setNombreMateria(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Nro de Carrera"
                      onChange={(e) => setNroCarrera(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Tipo Duracion"
                      onChange={(e) => setTipoDuracion(e.target.value)}
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
