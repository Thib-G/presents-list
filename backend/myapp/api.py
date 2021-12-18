from typing import List
from ninja import NinjaAPI

from .models import Present
from .schemas import PresentSchema

api = NinjaAPI()

@api.get('/presents', response=List[PresentSchema])
def presents(request):
    queryset = Present.objects.all()
    return list(queryset)
