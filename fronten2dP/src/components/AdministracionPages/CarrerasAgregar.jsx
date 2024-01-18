import { useState } from "react";
import Axios from "axios";
import "../css/Forms.css";
import "../css/FloatStyle.css";

export default function CarrerasAgregar({ setAgregar, setRefresh }) {
  const storedToken = localStorage.getItem("token");

  const [nombre_carrera, setNombre_carrera] = useState();
  const [nro_carrera, setNro_carrera] = useState();

  const handleCancel = () => {
    setRefresh(false);
    setAgregar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const carreraData = {
      nro_carrera: parseInt(nro_carrera),
      nombre_carrera: nombre_carrera,
    };

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.post(`http://127.0.0.1:4000/carreras`, carreraData)
      .then(() => {
        alert(`Se agrego la carrera.`);
        setRefresh(false);
      })
      .then(() => {
        setAgregar(false);
      })
      .catch((error) => {
        alert(`No se pudo Agregar la carrera`);
        console.error(error);
      });
  };

  return (
    <>
      <div className="floating-modal">
        <div className="modal-content">
          <body id="Form">
            <h2>Agregar Carrera:</h2>
            <form className="formulario" onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="Nro Carrera"
                onChange={(e) => setNro_carrera(e.target.value)}
              />
              <input
                type="text"
                placeholder="Nombre de Carrera"
                onChange={(e) => setNombre_carrera(e.target.value)}
              />
              <div className="buttons-container">
                <button>Agregar Carrera</button>
                <button onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          </body>
        </div>
      </div>
    </>
  );
}
