from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Entry
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from datetime import datetime

"""
@author @ledaniel03
Django Views for CRUD operations on journal entries.

- get_entries: Retrieves all entries from the database and returns them in a formatted JSON response.
  Uses the GET method and responds with an array of entry objects, each containing details about the user, date, mood, activity, and any additional value (val).

- add_entry: Accepts JSON-formatted POST requests to create a new entry in the database.
  The request data must include 'user', 'date', 'mood', 'activity', and 'val'. Responds with success status and new entry details if the data is valid, or an error message if the JSON is invalid.

- delete_entry: Allows for the deletion of an entry based on its ID, provided via a JSON-formatted POST request.
  Responds with a success status if the entry is successfully deleted or an error message if no entry matches the given ID or the JSON data is invalid.
"""

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
        for entry in entries  # Iterate over each entry in entries | For each entry in entries, a new dict is created w the keys in received_entries & stored within received_entries as a list
    ]
    return Response({'entries': entry_list})


@require_http_methods(["POST"])
@csrf_exempt
def add_entry(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        user = data.get('user')
        date = data.get('date')
        mood = data.get('mood')
        activity = data.get('activity')
        val = data.get('val')

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)

    newEntry = Entry(user=user, date= datetime.fromtimestamp(date), mood=mood,
                     activity=activity, val=val)
    newEntry.save()

    return JsonResponse({"success": True, "entry_id": newEntry.id, "activity": activity}, status=200)


@require_http_methods(["POST"])
@csrf_exempt
def delete_entry(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        id = data.get('id')

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)

    entries = Entry.objects.filter(id=int(id))
    if len(entries)>0:
        entries.delete()
        return JsonResponse({"success": True}, status=200)
    else:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)

