from .. import db

class InscripcionesModel(db.Model):
        __tablename__='inscripciones'
        legajo_A = db.Column(db.Integer, db.ForeignKey('alumnos.legajo', ondelete='CASCADE'), primary_key=True)
        nro_materia_i = db.Column(db.Integer, db.ForeignKey('materias.nro_materia'), primary_key=True)
        fecha_inscripcion = db.Column(db.Date, nullable=False)

        def __repr__(self):
                return f'legajo alumno: {self.legajo_A}, materia: {self.nro_materia_i}, fecha: {self.fecha_inscripcion}.'
        
        def __init__(self, legajo_A, nro_materia_i, fecha_inscripcion):
                self.legajo_A = legajo_A
                self.nro_materia_i = nro_materia_i
                self.fecha_inscripcion = fecha_inscripcion