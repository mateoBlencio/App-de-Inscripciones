from flask import request, Blueprint
from .. import db
from main.models import AlumnosModel
from flask_jwt_extended import create_access_token
from main.maps import AlumnosSchema
from main.auth.decorators import user_identity_lookup

alumno_schema = AlumnosSchema()

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/login', methods=["POST"])
def login():
    alumno = db.session.query(AlumnosModel).filter(AlumnosModel.legajo == request.get_json().get('legajo')).first_or_404()

    if alumno.validate_password(request.get_json().get('password')):
        access_token = create_access_token(identity=alumno)

        data = {
            'legajo': str(alumno.legajo),
            'nombre': str(alumno.nombre),
            'role': str(alumno.role),
            'token': access_token
        }
        return data, 200
    else: 
        return 'incorrect password', 401


@auth.route('/register', methods=['POST'])
def register():
    alumno = alumno_schema.load(request.get_json())
    exits = db.session.query(AlumnosModel).filter(AlumnosModel.legajo == alumno.legajo).scalar() is not None
    if exits:
        return 'Duplicate legajo', 409
    else:
        try:
            db.session.add(alumno)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            return str(error), 409
        return alumno_schema.dump(alumno, many=False), 201