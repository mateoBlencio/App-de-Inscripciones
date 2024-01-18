from main.repositories import MateriasRepository
from .CarrerasService import CarrerasService

materias_repository = MateriasRepository()
carreras_service = CarrerasService()

class MateriasService:

    def obtener_materia(self, nro_materia):
        materia = materias_repository.find_one(nro_materia)
        return materia
    
    def obtener_materias(self):
        materias = materias_repository.find_all()
        return materias
    
    def obtener_nros_materias(self):
        nros_materias = []
        for materia in self.obtener_materias():
            nros_materias.append(materia.nro_materia)
        return nros_materias
        
    
    def agregar_materia(self, materia):
        nros_de_carreras = carreras_service.obtener_nros_carreas()
        if materia.nro_carrera in nros_de_carreras:
            materia = materias_repository.create(materia)
            return materia
        else:
            return {"mensaje":"no se pudo agregar"}
    
    def eliminar_materia(self, nro_materia):
        materia = materias_repository.delete(nro_materia)
        return materia