from main.models import AlumnosModel
from marshmallow import Schema, fields, post_dump, post_load

class AlumnosSchema(Schema):
    legajo = fields.Integer(required=True)
    nombre = fields.String(required=True)
    password = fields.String(required=True)
    role = fields.String(required=True)
    nro_carrera =fields.Integer(require=True)
    ano_ingreso = fields.Date(require=True)
    ano_egreso = fields.Date(require=False)
    

    @post_load
    def create_alumno(self, data, **kwargs):
        return AlumnosModel(**data)
    
    
    SKIP_VALUES = ['password']
    @post_dump
    def remove_skip_values(self, data, **kwargs):
        return{
            key: value for key, value in data.items() if key not in self.SKIP_VALUES
        }

    

