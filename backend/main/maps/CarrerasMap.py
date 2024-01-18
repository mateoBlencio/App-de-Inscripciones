from main.models import CarrerasModel
from marshmallow import Schema, fields, post_dump, post_load

class CarrerasSchema(Schema):
    nro_carrera = fields.Integer(required=True)
    nombre_carrera = fields.String(required=True)

    @post_load
    def create_carrera(self, data, **kwargs):
        return CarrerasModel(**data)