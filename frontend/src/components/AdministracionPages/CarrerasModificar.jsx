import { useState } from "react";
import Axios from "axios";
import "../css/Table.css";
import "../css/FloatStyle.css";

export default function CarrerasModificar({
  carrera,
  setModificar,
  setRefresh,
}) {
  const storedToken = localStorage.getItem("token");

  const [nombreCarrera, setNombreCarrera] = useState(carrera.nombre_carrera);

  const handleModificar = () => {
    const carreraData = {
      nombre_carrera: nombreCarrera,
    };

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.put(
      `http://127.0.0.1:4000/carreras/${carrera.nro_carrera}`,
      carreraData
    )
      .then(() => {
        alert(`Se modifico la carrera.`);
        setModificar(false);
        setRefresh(false);
      })
      .catch((error) => {
        alert(`No se pudo modificar la carrera`);
        console.error(error);
      });
  };

  return (
    <>
      <body id="TablePage">
        <div className="floating-modal">
          <div className="modal-content">
            <h2>Modificar Carrera:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Nombre</th>
                  <th>Cambios</th>
                </tr>
              </thead>
              <tbody>
                <tr key={`${carrera.nro_carrera}`}>
                  <td>{carrera.nro_carrera}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Nombre de Carrera"
                      onChange={(e) => setNombreCarrera(e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="inputs" onClick={handleModificar}>
                      Guardar
                    </button>
                    <button
                      className="inputs"
                      onClick={() => setModificar(false)}
                    >
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
