import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";

import Home from "./components/AlumnosPages/Home";
import Inscripciones from "./components/AlumnosPages/Inscripciones";
import Materias from "./components/AlumnosPages/Materias";
import Carreras from "./components/AlumnosPages/Carreras";
import Alumnos from "./components/AlumnosPages/Alumnos";
import EditarPerfil from "./components/AlumnosPages/EditarPerfil";

import PortalAdministrador from "./components/AdministracionPages/PortalAdministrador";
import InscripcionesAdmin from "./components/AdministracionPages/InscripcionesAdmin";
import MateriasAdmin from "./components/AdministracionPages/MateriasAdmin";
import CarrerasAdmin from "./components/AdministracionPages/CarrerasAdmin";
import AlumnosAdmin from "./components/AdministracionPages/AlumnosAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Inscripciones" element={<Inscripciones />} />
        <Route path="/Materias" element={<Materias />} />
        <Route path="/Carreras" element={<Carreras />} />
        <Route path="/Alumnos" element={<Alumnos />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/EditarPerfil" element={<EditarPerfil />} />

        <Route path="/PortalAdministrador" element={<PortalAdministrador />} />
        <Route path="/MateriasAdmin" element={<MateriasAdmin />} />
        <Route path="/CarrerasAdmin" element={<CarrerasAdmin />} />
        <Route path="/AlumnosAdmin" element={<AlumnosAdmin />} />
        <Route path="/InscripcionesAdmin" element={<InscripcionesAdmin />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
