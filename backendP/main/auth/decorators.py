from .. import jwt
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def role_required(roles):
    def decorator(function):
        def wrapper(*args, **kwargs):
            # Verificar si el jwt es correcto
            verify_jwt_in_request()

            claims = get_jwt()

            if claims['sub']['role'] in roles:
                return function(*args, **kwargs)
            else:
                return 'Rol not allowed', 403
                
        return wrapper
    return decorator

@jwt.user_identity_loader
def user_identity_lookup(alumno):
    return {
        'nombre': alumno.nombre,
        'legajo': alumno.legajo,
        'role': alumno.role
    }

@jwt.additional_claims_loader
def add_claims_to_acces_token(alumno):
    claims = {
        'legajo': alumno.legajo,
        'role': alumno.role
    }