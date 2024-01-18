from .. import db
from main.models import MateriasModel

class MateriasRepository:

    __modelo = MateriasModel

    @property
    def modelo(self):
        return self.__modelo
    
    def find_one(self, nro_materia):
        materia = db.session.query(self.modelo).get(nro_materia)
        return materia
    
    def find_all(self):
        materias = db.session.query(self.modelo).all()
        return materias
    
    def create(self, materia):
        db.session.add(materia)
        db.session.commit()
        return materia
    
    def delete(self, nro_materia):
        materia = self.find_one(nro_materia)
        db.session.delete(materia)
        db.session.commit()
        return materia