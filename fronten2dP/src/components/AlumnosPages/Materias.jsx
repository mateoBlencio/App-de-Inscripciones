import { useEffect, useState } from "react";
import Axios from "axios";
import "../css/Table.css";

export default function Materias() {
  const storedToken = localStorage.getItem("token");
  const storedLegajo = localStorage.getItem("legajo");

  const [refresh, setRefresh] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [inscripcionesAlumno, setInscripcionesAlumno] = useState([]);

  useEffect(() => {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.get(`http://127.0.0.1:4000/inscripciones`)
      .then((response) => {
        setInscripcionesAlumno(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  if (!refresh) {
    Axios.get("http://127.0.0.1:4000/materias")
      .then((response) => {
        setMaterias(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setRefresh(true);
  }

  const handleInscribirse = (materia) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const fecha = `${year}-${month}-${day}`;

    let inscripcionData = {
      legajo_A: storedLegajo,
      nro_materia_i: materia.nro_materia,
      fecha_inscripcion: fecha,
    };

    Axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    Axios.post("http://127.0.0.1:4000/inscripciones", inscripcionData)
      .then(() => {
        alert("Inscripción realizada con éxito");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error al realizar la inscripción", error);
        alert("No se pudo realizar inscripcion");
      });
  };

  return (
    <>
      <body id="TablePage">
        <h1>Materias:</h1>
        <table id="table">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Tipo de duracion</th>
              <th>Inscripcion</th>
            </tr>
          </thead>
          <tbody>
            {materias &&
              materias.map((materia) => (
                <tr key={materia.nro_materia}>
                  <td>{materia.nro_materia}</td>
                  <td>{materia.nombre}</td>
                  <td>{materia.nro_carrera}</td>
                  <td>{materia.tipo_duracion}</td>
                  <td>
                    <button
                      value="materia"
                      disabled={inscripcionesAlumno.find(
                        (inscripcion) =>
                          inscripcion.nro_materia_i === materia.nro_materia
                      )}
                      onClick={() => handleInscribirse(materia)}
                    >
                      Inscribirse
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
