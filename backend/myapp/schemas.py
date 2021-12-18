from typing import List
from ninja import ModelSchema

from .models import Present, Person

class PersonSchema(ModelSchema):
    class Config:
        model = Person
        model_fields = ['first_name', 'last_name', 'birthday']

class PresentSchema(ModelSchema):
    requested_by: PersonSchema
    offered_by: List[PersonSchema] = []

    class Config:
        model = Present
        model_fields = ['description']
