from typing import List
from ninja import ModelSchema

from .models import Present, Person

class PersonSchema(ModelSchema):
    class Config:
        model = Person
        model_fields = ['id', 'first_name', 'last_name', 'birthday']


class PresentSchema(ModelSchema):
    class Config:
        model = Present
        model_fields = ['id', 'description', 'requested_by', 'offered_by']


class PresentInSchema(ModelSchema):
    offered_by_ids: List[int] = []
    class Config:
        model = Present
        model_fields = ['description', 'requested_by']


class PresentUpdateSchema(ModelSchema):
    offered_by_ids: List[int] = []
    class Config:
        model = Present
        model_fields = ['id', 'description', 'requested_by']
