from main.repositories import CarrerasRepository

carreras_repository = CarrerasRepository()

class CarrerasService:

    def obtener_carrera(self, nro_carrera):
        carrera = carreras_repository.find_one(nro_carrera)
        return carrera
    
    def obtener_carreras(self):
        carreras = carreras_repository.find_all()
        return carreras
    
    def obtener_nros_carreas(self):
        numeros_carreras = []
        carreras = self.obtener_carreras()
        for carrera in carreras:
            numeros_carreras.append(carrera.nro_carrera)
        return numeros_carreras
    
    def agregar_carrera(self, carrera):
        carrera = carreras_repository.create(carrera)
        return carrera
    
    def eliminar_carrera(self, nro_carrera):
        carrera = carreras_repository.delete(nro_carrera)
        return carrera