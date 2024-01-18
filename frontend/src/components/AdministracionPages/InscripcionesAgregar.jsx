import { useState } from "react";
import Axios from "axios";
import "../css/Forms.css";
import "../css/FloatStyle.css";

export default function InscripcionesAgregar({ setAgregar, setRefresh }) {
  const storedToken = localStorage.getItem("token");

  const [nro_materia, setNro_materia] = useState();
  const [fecha_inscripcion, setFecha_inscripcion] = useState();
  const [legajo_A, seLegajo_A] = useState();

  const handleCancel = () => {
    setRefresh(false);
    setAgregar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const inscripcionData = {
      nro_materia_i: parseInt(nro_materia),
      legajo_A: parseInt(legajo_A),
      fecha_inscripcion: fecha_inscripcion,
    };

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.post(`http://127.0.0.1:4000/inscripciones`, inscripcionData)
      .then(() => {
        alert(`Se agrego la Inscripcion.`);
        setRefresh(false);
      })
      .then(() => {
        setAgregar(false);
      })
      .catch((error) => {
        alert(`No se pudo Agregar la Inscripcion`);
        console.error(error);
      });
  };

  return (
    <>
      <div className="floating-modal">
        <div className="modal-content">
          <body id="Form">
            <h4>Agregar Inscripciones</h4>
            <form className="formulario" onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="Nro materia"
                onChange={(e) => setNro_materia(e.target.value)}
              />
              <input
                type="date"
                onChange={(e) => setFecha_inscripcion(e.target.value)}
              />
              <input
                type="number"
                placeholder="Legajo de Alumno"
                onChange={(e) => seLegajo_A(e.target.value)}
              />
              <div className="buttons-container">
                <button>Agregar Inscripcion</button>
                <button onClick={handleCancel}>Cancelar</button>
              </div>
            </form>
          </body>
        </div>
      </div>
    </>
  );
}
