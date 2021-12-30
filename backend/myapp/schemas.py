from django.contrib.auth.models import User

from typing import List
from ninja import Schema, ModelSchema

from .models import Present, Person


class UserSchema(ModelSchema):
    class Config:
        model = User
        model_fields = ['id', 'username', 'first_name', 'last_name']


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


class IdSchema(Schema):
    id: int


class SuccessSchema(Schema):
    success: bool = False
