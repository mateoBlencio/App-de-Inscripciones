from .. import db
from werkzeug.security import generate_password_hash, check_password_hash

class AlumnosModel(db.Model):
    __tablename__='alumnos'
    legajo = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    ano_ingreso = db.Column(db.Date, nullable=False)
    ano_egreso = db.Column(db.Date, nullable=True)
    role = db.Column(db.String(10), nullable=False)
    nro_carrera = db.Column(db.Integer, db.ForeignKey('carreras.nro_carrera'), nullable=False)
    inscripciones = db.relationship('InscripcionesModel', cascade='all, delete-orphan', backref='alumno', lazy=True)


    def __repr__(self):
        return f'legajo: {self.legajo}, nombre: {self.nombre}, ingreso: {self.ano_ingreso}, rol: {self.role}, egreso: {self.ano_egreso}.'
    

    def __init__(self, legajo, nombre, password, ano_ingreso, nro_carrera, role, ano_egreso=None):
        self.legajo = legajo
        self.nombre = nombre
        self.password = self.__create_password(password)
        self.ano_ingreso = ano_ingreso
        self.ano_egreso = ano_egreso
        self.nro_carrera = nro_carrera
        self.role = role
    
    def __create_password(self, password):
        return generate_password_hash(password)

    def validate_password(self, password):
        return check_password_hash(self.password, password)