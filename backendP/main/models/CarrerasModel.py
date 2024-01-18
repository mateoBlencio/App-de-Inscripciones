from .. import db

class CarrerasModel(db.Model):
    __tablename__='carreras'
    nro_carrera = db.Column(db.Integer, primary_key=True)
    nombre_carrera = db.Column(db.String(50), nullable=False)
    alumnos = db.relationship('AlumnosModel')
    materias = db.relationship('MateriasModel')

    def __repr__(self):
        return f'nro_carrera: {self.nro_carrera}, nombre: {self.nombre_carrera}'
    
    def __init__(self, nro_carrera, nombre_carrera):
        self.nro_carrera = nro_carrera
        self.nombre_carrera = nombre_carrera