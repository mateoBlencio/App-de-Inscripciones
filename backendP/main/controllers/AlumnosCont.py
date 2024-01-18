from main.services import AlumnosService
from main.maps import AlumnosSchema
from datetime import datetime
from flask_restful import Resource
from flask import request
from flask_jwt_extended import get_jwt_identity
from main.auth.decorators import role_required
from werkzeug.security import generate_password_hash, check_password_hash

alumnos_service = AlumnosService()
alumnos_schema = AlumnosSchema()

class AlumnoController(Resource):

    @role_required(roles=['admin', 'alumno'])
    def get(self, legajo):
        try:
            alumno = alumnos_service.obtener_alumno(legajo)
            return alumnos_schema.dump(alumno, many=False)
        except:
            return 'No autorizado', 401
    
    @role_required(roles=['admin', 'alumno'])
    def put(self, legajo):
        current_user = get_jwt_identity()
        alumno = alumnos_service.obtener_alumno(legajo)
        if current_user['legajo'] == alumno.legajo or current_user['role'] == 'admin':
            data = request.get_json().items()
            for key, value in data:
                if key == 'role' and not current_user['role'] == 'admin':
                    return 'No autorizado', 401
                if key == 'ano_ingreso' or key == 'ano_egreso':
                    value = datetime.strptime(value, "%Y-%m-%d").date()
                if key == 'password':
                    value = generate_password_hash(value)
                setattr(alumno, key, value)
            alumno = alumnos_service.agregar_alumno(alumno)
            return alumnos_schema.dump(alumno, many=False)
        else:
            return 'No autorizado', 401
    
    @role_required(roles=['admin', 'alumno'])
    def delete(self, legajo):
        current_user = get_jwt_identity()
        alumno = alumnos_service.eliminar_alumno(legajo)
        if current_user['legajo'] == alumno.legajo or current_user['role'] == 'admin':
            return alumnos_schema.dump(alumno, many=False)
        else:
            return 'No autorizado', 401


class AlumnosController(Resource):

    @role_required(roles=['admin'])
    def get(self):
        alumnos = alumnos_service.obtener_alumnos()
        return alumnos_schema.dump(alumnos, many=True)
    
    @role_required(roles=['admin'])
    def post(self):
        alumno = alumnos_schema.load(request.get_json())
        alumno = alumnos_service.agregar_alumno(alumno)
        return alumnos_schema.dump(alumno, many=False)