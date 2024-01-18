from main.models import InscripcionesModel
from marshmallow import Schema, fields, post_dump, post_load

class InscripcionesSchema(Schema):
    legajo_A = fields.Integer(required=True)
    nro_materia_i = fields.Integer(required=True)
    fecha_inscripcion = fields.Date(required=True)

    @post_load
    def create_inscripciones(self, data, **kwargs):
        return InscripcionesModel(**data)