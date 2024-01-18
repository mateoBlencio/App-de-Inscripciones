from main.services import CarrerasService
from main.maps import CarrerasSchema
from flask_restful import Resource
from flask import request
from flask_jwt_extended import get_jwt_identity
from main.auth.decorators import role_required

carreras_service = CarrerasService()
carreras_schema = CarrerasSchema()

class CarreraController(Resource):

    def get(self, nro_carrera):
        carrera = carreras_service.obtener_carrera(nro_carrera)
        return carreras_schema.dump(carrera, many=False)
    
    @role_required(roles=['admin'])
    def put(self, nro_carrera):
        carrera = carreras_service.obtener_carrera(nro_carrera)
        data = request.get_json().items()
        for key, value in data:
            setattr(carrera, key, value)
        carrera = carreras_service.agregar_carrera(carrera)
        return carreras_schema.dump(carrera, many=False)
    
    @role_required(roles=['admin'])
    def delete(self, nro_carrera):
        carrera = carreras_service.eliminar_carrera(nro_carrera)
        return carreras_schema.dump(carrera, many=False)


class CarrerasController(Resource):

    def get(self):
        carreras = carreras_service.obtener_carreras()
        return carreras_schema.dump(carreras, many=True)
    
    @role_required(roles=['admin'])
    def post(self):
        carrera = carreras_schema.load(request.get_json())
        carrera = carreras_service.agregar_carrera(carrera)
        return carreras_schema.dump(carrera, many=False)