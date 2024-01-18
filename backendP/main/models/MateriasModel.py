from .. import db

class MateriasModel(db.Model):
    __tablename__='materias'
    nro_materia = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(60), nullable=False)
    tipo_duracion = db.Column(db.Integer, nullable=False) # Foreign key
    fecha_alta = db.Column(db.Date, nullable=False)
    fecha_baja = db.Column(db.Date, nullable=True)
    nro_carrera = db.Column(db.Integer, db.ForeignKey('carreras.nro_carrera'), nullable=False)
    inscripciones = db.relationship('InscripcionesModel', cascade='all, delete-orphan', backref='materia', lazy=True)

    def __repr__(self):
        return f'nro_materia: {self.nro_materia}, nombre: {self.nombre}, tipo_duracion: {self.tipo_duracion}, nro_carrera: {self.nro_carrera}.'
    
    def __init__(self, nro_materia, nombre, tipo_duracion, nro_carrera, fecha_alta, fecha_baja=None):
        self.nro_materia = nro_materia
        self.nombre = nombre
        self.tipo_duracion = tipo_duracion
        self.nro_carrera = nro_carrera
        self.fecha_alta = fecha_alta
        self.fecha_baja = fecha_baja
