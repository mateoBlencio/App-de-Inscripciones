from main.services import InscripcionesService
from main.maps import InscripcionesSchema
from datetime import datetime
from flask_restful import Resource
from flask import request
from flask_jwt_extended import get_jwt_identity
from main.auth.decorators import role_required

inscripciones_service = InscripcionesService()
inscripciones_schema = InscripcionesSchema()

# /inscripciones/<nro_materia>/<legajo>

class InscripcionController(Resource):
    
    @role_required(roles=['admin', 'alumno'])
    def get(self, nro_materia, legajo):
        try:
            current_user = get_jwt_identity()
            inscripcion = inscripciones_service.obtener_inscripcion(nro_materia, legajo)
            if current_user['legajo'] == inscripcion.legajo_A or current_user['role'] == 'admin':
                return inscripciones_schema.dump(inscripcion, many=False)
            else:
                return 'No autorizado', 401
        except:
            return [], 404
    
    @role_required(roles=['admin'])
    def put(self, nro_materia, legajo):
        inscripcion = inscripciones_service.obtener_inscripcion(nro_materia, legajo)
        data = request.get_json().items()
        for key, value in data:
            if key == 'fecha_inscripcion':
                value = datetime.strptime(value, "%Y-%m-%d").date()
            setattr(inscripcion, key, value)
        inscripcion = inscripciones_service.agregar_inscripcion(inscripcion)
        return inscripciones_schema.dump(inscripcion, many=False)
    
    @role_required(roles=['admin', 'alumno'])
    def delete(self, nro_materia, legajo):
        current_user = get_jwt_identity()
        inscripcion = inscripciones_service.obtener_inscripcion(nro_materia, legajo)
        if current_user['legajo'] == inscripcion.legajo_A or current_user['role'] == 'admin':
            inscripcion = inscripciones_service.eliminar_inscripcion(nro_materia, legajo)
            return inscripciones_schema.dump(inscripcion, many=False)
        else:
            return 'No autorizado', 401


class InscripcionesController(Resource):

    @role_required(roles=['admin', 'alumno'])
    def get(self):
        inscripciones_new = []
        current_user = get_jwt_identity()
        inscripciones = inscripciones_service.obtener_inscripciones()
        for inscripcion in inscripciones:
            if current_user['legajo'] == inscripcion.legajo_A or current_user['role'] == 'admin':
                inscripciones_new.append(inscripcion)
        return inscripciones_schema.dump(inscripciones_new, many=True), 200
    
    @role_required(roles=['admin', 'alumno'])
    def post(self):
        current_user = get_jwt_identity()
        inscripcion = inscripciones_schema.load(request.get_json())
        if current_user['legajo'] == inscripcion.legajo_A or current_user['role'] == 'admin':
            inscripcion = inscripciones_service.agregar_inscripcion(inscripcion)
            return inscripciones_schema.dump(inscripcion, many=False)
        else:
            return 'No autorizado', 401