import { useState } from "react";
import Axios from "axios";
import CarrerasAgregar from "./CarrerasAgregar";
import CarrerasModificar from "./CarrerasModificar";
import "../css/Table.css";
import "../css/SearchBar.css";

export default function CarrerasAdmin() {
  const storedToken = localStorage.getItem("token");

  const [nroCarrera, setNroCarrera] = useState(null);
  const [carreras, setCarreras] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [agregar, setAgregar] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [carrera, setCarrera] = useState();

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

  const handleSearch = (e) => {
    e.preventDefault();

    if (!nroCarrera) {
      setRefresh(false);
    } else {
      if (!nroCarrera) {
        alert("Todos los campos son obligatorios");
        return;
      }
    }

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.get(`http://127.0.0.1:4000/carreras/${nroCarrera}`)
      .then((response) => {
        setCarreras([response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setNroCarrera("");
    setRefresh(false);
  };

  const handleEliminar = (carrera) => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.delete(`http://127.0.0.1:4000/carreras/${carrera.nro_carrera}`)
      .then(() => {
        alert("Carrera eliminada");
        setRefresh(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleModificar = (carrera) => {
    setCarrera(carrera);
    setModificar(true);
  };

  return (
    <>
      <body id="TablePage">
        <h1>Carreras:</h1>
        <div>
          <h2>Buscar Carrera:</h2>
          <div id="SearchBarPage">
            <input
              class="search-input"
              placeholder="Numero de Carrera"
              type="number"
              value={nroCarrera}
              onChange={(e) => setNroCarrera(e.target.value)}
            />
            <button class="search-button" onClick={handleSearch}>
              Buscar
            </button>
            <button class="agregate-button" onClick={() => setAgregar(true)}>
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
                <th>Eliminar</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {carreras &&
                carreras.map((carrera) => (
                  <tr key={carrera.nro_carrera}>
                    <td>{carrera.nro_carrera}</td>
                    <td>{carrera.nombre_carrera}</td>
                    <td>
                      <button onClick={() => handleEliminar(carrera)}>X</button>
                    </td>
                    <td>
                      <button onClick={() => handleModificar(carrera)}>
                        O
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {agregar && (
            <CarrerasAgregar setAgregar={setAgregar} setRefresh={setRefresh} />
          )}
          {modificar && (
            <CarrerasModificar
              carrera={carrera}
              setModificar={setModificar}
              setRefresh={setRefresh}
            />
          )}
        </div>
      </body>
    </>
  );
}
