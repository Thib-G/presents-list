from django.db import models

# Create your models here.

class Person(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birthday = models.DateField('birthday')

    class Meta:
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Present(models.Model):
    description = models.TextField()
    requested_by = models.ForeignKey(Person, on_delete=models.DO_NOTHING, related_name='requested_by_person')
    offered_by = models.ManyToManyField(Person, blank=True, related_name='offered_by_person')

    def __str__(self):
        offered_by_str = ', '.join(self.offered_by.all().values_list('first_name', flat=True))
        return f'{self.requested_by.first_name}: {self.description} ({offered_by_str})'
