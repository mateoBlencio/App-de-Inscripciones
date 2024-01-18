from main.repositories import AlumnosRepository
from .CarrerasService import CarrerasService

alumnos_repository = AlumnosRepository()
carreras_service = CarrerasService()

class AlumnosService:

    def obtener_alumno(self, legajo):
        alumno = alumnos_repository.find_one(legajo)
        return alumno

    def obtener_alumnos(self):
        alumnos = alumnos_repository.find_all()
        return alumnos
    
    def obtener_nros_legajos(self):
        nros_legajos = []
        alumnos = self.obtener_alumnos()
        for alumno in alumnos:
            nros_legajos.append(alumno.legajo)
        return nros_legajos

    def agregar_alumno(self, alumno):
        nro_carreras = carreras_service.obtener_nros_carreas()
        if alumno.nro_carrera in nro_carreras:
            alumno = alumnos_repository.create(alumno)
            return alumno
        else:
            return {"mensaje":"no se pudo agregar"}

    def eliminar_alumno(self, legajo):
        alumno = alumnos_repository.delete(legajo)
        return alumno