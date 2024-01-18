import { useState } from "react";
import Axios from "axios";
import "../css/Forms.css";
import "../css/FloatStyle.css";

export default function MateriasAgregar({ setAgregar, setRefresh }) {
  const storedToken = localStorage.getItem("token");

  const [nro_materia, setNro_materia] = useState();
  const [nombre, setNombre] = useState();
  const [tipo_duracion, setTipo_duracion] = useState();
  const [fecha_alta, setFecha_alta] = useState();
  const [nro_carrera, setNro_carrera] = useState();

  const handleCancel = () => {
    setRefresh(false);
    setAgregar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const materiaData = {
      nro_materia: parseInt(nro_materia),
      nombre: nombre,
      tipo_duracion: parseInt(tipo_duracion),
      fecha_alta: fecha_alta,
      nro_carrera: parseInt(nro_carrera),
    };

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.post(`http://127.0.0.1:4000/materias`, materiaData)
      .then(() => {
        alert(`Se agrego la materia.`);
        setRefresh(false);
      })
      .then(() => {
        setAgregar(false);
      })
      .catch((error) => {
        alert(`No se pudo Agregar la materia`);
        console.error(error);
      });
  };

  return (
    <>
      <div className="floating-modal">
        <div className="modal-content">
          <body id="Form">
            <h2>Agregar Materias</h2>
            <form className="formulario" onSubmit={handleSubmit}>
              <input
                className="inputs"
                type="number"
                placeholder="Nro materia"
                onChange={(e) => setNro_materia(e.target.value)}
              />
              <input
                className="inputs"
                type="text"
                placeholder="Nombre Materia"
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                className="inputs"
                type="number"
                placeholder="Tipo de Duracion"
                onChange={(e) => setTipo_duracion(e.target.value)}
              />
              <input
                className="inputs"
                type="date"
                onChange={(e) => setFecha_alta(e.target.value)}
              />
              <input
                className="inputs"
                type="number"
                placeholder="Nro de Carrera"
                onChange={(e) => setNro_carrera(e.target.value)}
              />
              <div className="buttons-container">
                <button className="inputs">Agregar Materia</button>
                <button className="inputs" onClick={handleCancel}>
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
