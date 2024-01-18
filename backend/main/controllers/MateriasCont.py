from main.services import MateriasService
from main.maps import MateriasSchema
from datetime import datetime
from flask_restful import Resource
from flask import request
from flask_jwt_extended import get_jwt_identity
from main.auth.decorators import role_required

materias_service = MateriasService()
materias_schema = MateriasSchema()

class MateriaController(Resource):

    def get(self, nro_materia):
        materia = materias_service.obtener_materia(nro_materia)
        return materias_schema.dump(materia, many=False)
    
    @role_required(roles=['admin'])
    def put(self, nro_materia):
        materia = materias_service.obtener_materia(nro_materia)
        data = request.get_json().items()
        for key, value in data:
            if key == 'fecha_alta' or key == 'fecha_baja':
                value = datetime.strptime(value, "%Y-%m-%d").date()
            setattr(materia, key, value)
        materia = materias_service.agregar_materia(materia)
        return materias_schema.dump(materia, many=False)
    
    @role_required(roles=['admin'])
    def delete(self, nro_materia):
        materia = materias_service.eliminar_materia(nro_materia)
        return materias_schema.dump(materia, many=False)


class MateriasController(Resource):

    def get(self):
        materias = materias_service.obtener_materias()
        return materias_schema.dump(materias, many=True)

    @role_required(roles=['admin'])
    def post(self):
        materia = materias_schema.load(request.get_json())
        materia = materias_service.agregar_materia(materia)
        # pensaba aca prepararlo para que devuelva un json o sino mover todo el shema a la parte de service
        return materias_schema.dump(materia, many=False)