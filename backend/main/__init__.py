import os
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

api = Api()
db = SQLAlchemy()
jwt = JWTManager()

def create_app():

    app = Flask(__name__)
    CORS(app)

    load_dotenv()

    PATH = os.getenv('DATABASE_PATH')
    DB_NAME = os.getenv('DATABASE_NAME')

    if not os.path.exists(f'{PATH}{DB_NAME}'):
        os.chdir(f'{PATH}')
        file = os.open(f'{DB_NAME}', os.O_CREAT)
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{PATH}{DB_NAME}'
    db.init_app(app)

    import main.controllers as controllers

    api.add_resource(controllers.AlumnoController, '/alumnos/<legajo>')
    api.add_resource(controllers.AlumnosController, '/alumnos')

    api.add_resource(controllers.CarreraController, '/carreras/<nro_carrera>')
    api.add_resource(controllers.CarrerasController, '/carreras')

    api.add_resource(controllers.MateriaController, '/materias/<nro_materia>')
    api.add_resource(controllers.MateriasController, '/materias')

    api.add_resource(controllers.InscripcionController, '/inscripciones/<nro_materia>/<legajo>')
    api.add_resource(controllers.InscripcionesController, '/inscripciones')

    api.init_app(app)

    # Configuracion de JWT
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    jwt.init_app(app)

    from main.auth import routes
    app.register_blueprint(auth.routes.auth)

    return app
