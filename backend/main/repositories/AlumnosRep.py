from .. import db
from main.models import AlumnosModel

class AlumnosRepository:

    __modelo = AlumnosModel

    @property
    def modelo(self):
        return self.__modelo
    
    def find_one(self, legajo):
        alumno = db.session.query(self.modelo).get(legajo)
        return alumno
    
    def find_all(self):
        alumnos = db.session.query(self.modelo).all()
        return alumnos
    
    def create(self, alumno):
        db.session.add(alumno)
        db.session.commit()
        return alumno
    
    def delete(self, legajo):
        alumno = self.find_one(legajo)
        db.session.delete(alumno)
        db.session.commit()
        return alumno