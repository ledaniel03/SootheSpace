from django.urls import path
from . import views

urlpatterns = [
    path('get_entries/', views.get_entries, name='get_entries'),
    path('add_entry/', views.add_entry, name='add_entry'),
    path('delete_entry/', views.delete_entry, name='delete_entry'),

]