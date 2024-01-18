from main.repositories import InscripcionesRepository
from .AlumnosService import AlumnosService
from .MateriasService import MateriasService

inscripciones_repository = InscripcionesRepository()

alumnos_service = AlumnosService()
materias_services = MateriasService()

class InscripcionesService:

    def obtener_inscripcion(self, nro_materia, legajo):
        inscripcion = inscripciones_repository.find_one(nro_materia, legajo)
        return inscripcion
    
    def obtener_inscripciones(self):
        inscripciones = inscripciones_repository.find_all()
        return inscripciones
    
    def agregar_inscripcion(self, inscripcion):
        if inscripcion.legajo_A in alumnos_service.obtener_nros_legajos() and inscripcion.nro_materia_i in materias_services.obtener_nros_materias():
            inscripcion = inscripciones_repository.create(inscripcion)
            return inscripcion
        else:
            return {'menaje':'error'}
    
    def eliminar_inscripcion(self, nro_materia, legajo):
        inscripcion = inscripciones_repository.delete(nro_materia, legajo)
        return inscripcion