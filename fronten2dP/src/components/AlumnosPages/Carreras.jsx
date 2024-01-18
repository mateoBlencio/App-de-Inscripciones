import { useState } from "react";
import Axios from "axios";
import "../css/Table.css";

export default function Carreras() {
  const [carreras, setCarreras] = useState([]);
  const [refresh, setRefresh] = useState(false);

  if (!refresh) {
    Axios.get("http://127.0.0.1:4000/carreras")
      .then((response) => {
        setCarreras(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setRefresh(true);
  }

  return (
    <>
      <body id="TablePage">
        <h1>Carreras:</h1>
        <table id="table">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {carreras &&
              carreras.map((carrera) => (
                <tr key={carrera.nro_carrera}>
                  <td>{carrera.nro_carrera}</td>
                  <td>{carrera.nombre_carrera}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </body>
    </>
  );
}
