from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Entry
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from datetime import datetime

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

