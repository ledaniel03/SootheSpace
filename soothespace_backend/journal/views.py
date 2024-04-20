from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Entry


# Create your views here.
@api_view(['GET'])
def get_entries(request):
        entries = Entry.objects.all()  # get all entries
        
        entry_list = [
            {
                'id': entry.id,
                'user': entry.user,
                'date': entry.date,
                'mood': entry.mood,
                'activity': entry.activity,
                'val': entry.val,
            }
            # list comprehension
            for entry in entries # Iterate over each entry in entries | For each entry in entries, a new dict is created w the keys in received_entries & stored within received_entries as a list
        ]
        return Response({'entries': entry_list}) 
    

@api_view(['POST'])
def add_entry(request):
        data = request.data
        user = data.get('user')

        if request.user and request.user.username != "": # if user is authenticated, use their username
            user = request.user.username

        # Create a new entry w request data
        new_entry = Entry(
            user = user,
            date = data.get('date'),
            mood = data.get('mood'),
            activity = data.get('activity'),
            val = data.get('val'),
        )

        # add entry to DB
        new_entry.save()
        return Response({'entry': 'Entry has been successfully added', 'data': new_entry.id})