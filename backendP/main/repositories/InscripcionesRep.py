from .. import db
from main.models import InscripcionesModel

class InscripcionesRepository:

    __modelo = InscripcionesModel

    @property
    def modelo(self):
        return self.__modelo
    
    def find_one(self, nro_materia, legajo):
        inscripcion = db.session.query(self.modelo).filter_by(nro_materia_i=nro_materia, legajo_A=legajo).first()
        return inscripcion
    
    def find_all(self):
        inscripciones = db.session.query(self.modelo).all()
        return inscripciones
    
    def create(self, inscripcion):
        db.session.add(inscripcion)
        db.session.commit()
        return inscripcion
    
    def delete(self, nro_materia, legajo):
        inscripcion = self.find_one(nro_materia, legajo)
        db.session.delete(inscripcion)
        db.session.commit()
        return inscripcion