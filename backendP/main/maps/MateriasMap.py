from main.models import MateriasModel
from marshmallow import Schema, fields, post_dump, post_load

class MateriasSchema(Schema):
    nro_materia = fields.Integer(required=True)
    nombre = fields.String(required=True)
    tipo_duracion = fields.Integer(required=True)
    fecha_alta = fields.Date(required=True)
    fecha_baja = fields.Date(required=False)
    nro_carrera = fields.Integer(required=True)

    @post_load
    def create_materias(self, data, **kwargs):
        return MateriasModel(**data)
