from typing import List
from ninja import NinjaAPI
from django.shortcuts import get_object_or_404

from .models import Person, Present
from .schemas import PersonSchema, PresentSchema, PresentInSchema, PresentUpdateSchema

api = NinjaAPI()


@api.get('/presents/{present_id}', response=PresentSchema)
def get_present(request, present_id: int):
    present = get_object_or_404(Present, id=present_id)
    return present


@api.get('/presents', response=List[PresentSchema])
def get_presents(request):
    return Present.objects.all()


@api.post('/presents')
def create_present(request, payload: PresentInSchema):
    present = Present(
        description=payload.description,
        requested_by_id=payload.requested_by,
    )
    present.save()
    present.offered_by.set(payload.offered_by_ids)
    present.save()
    return { 'id': present.id }


@api.put('/presents/{present_id}')
def update_present(request, present_id: int, payload: PresentUpdateSchema):
    present = get_object_or_404(Present, id=present_id)
    setattr(present, 'description', payload.description)
    setattr(present, 'requested_by_id', payload.requested_by)
    present.offered_by.set(payload.offered_by_ids)
    present.save()
    return { 'success': True }


@api.delete('/presents/{present_id}')
def delete_present(request, present_id: int):
    present = get_object_or_404(Present, id=present_id)
    present.delete()
    return { 'success': True }


@api.get('/persons', response=List[PersonSchema])
def get_persons(request):
    return Person.objects.all()
