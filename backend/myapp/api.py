from typing import List
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_extra import NinjaExtraAPI
from ninja_jwt.authentication import JWTAuth

from django.shortcuts import get_object_or_404

from .models import Person, Present
from .schemas import IdSchema, PersonSchema, PresentSchema, PresentInSchema, PresentUpdateSchema, SuccessSchema, UserSchema


api = NinjaExtraAPI()
api.register_controllers(NinjaJWTDefaultController)


@api.get('/user/current', response=UserSchema, auth=JWTAuth())
def get_user(request):
    return request.user


@api.get('/presents/{present_id}', response=PresentSchema, auth=JWTAuth())
def get_present(request, present_id: int):
    present = get_object_or_404(Present, id=present_id)
    return present


@api.get('/presents', response=List[PresentSchema], auth=JWTAuth())
def get_presents(request):
    return Present.objects.all()


@api.post('/presents', response=IdSchema, auth=JWTAuth())
def create_present(request, payload: PresentInSchema):
    present = Present(
        description=payload.description,
        requested_by_id=payload.requested_by,
    )
    present.save()
    present.offered_by.set(payload.offered_by_ids)
    present.save()
    return { 'id': present.id }


@api.put('/presents/{present_id}', response=SuccessSchema, auth=JWTAuth())
def update_present(request, present_id: int, payload: PresentUpdateSchema):
    present = get_object_or_404(Present, id=present_id)
    setattr(present, 'description', payload.description)
    setattr(present, 'requested_by_id', payload.requested_by)
    present.offered_by.set(payload.offered_by_ids)
    present.save()
    return { 'success': True }


@api.delete('/presents/{present_id}', response=SuccessSchema, auth=JWTAuth())
def delete_present(request, present_id: int):
    present = get_object_or_404(Present, id=present_id)
    present.delete()
    return { 'success': True }


@api.get('/persons', response=List[PersonSchema], auth=JWTAuth())
def get_persons(request):
    return Person.objects.all()
