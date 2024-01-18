from .. import db
from main.models import CarrerasModel

class CarrerasRepository:

    __modelo = CarrerasModel

    @property
    def modelo(self):
        return self.__modelo
    
    def find_one(self, nro_carrera):
        carrera = db.session.query(self.modelo).get(nro_carrera)
        return carrera
    
    def find_all(self):
        carreras = db.session.query(self.modelo).all()
        return carreras
    
    def create(self, carrera):
        db.session.add(carrera)
        db.session.commit()
        return carrera
    
    def delete(self, nro_carrera):
        carrera = self.find_one(nro_carrera)
        db.session.delete(carrera)
        db.session.commit()
        return carrera