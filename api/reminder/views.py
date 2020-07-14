from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .scheduler import scheduler, notify
from todo.models import Todo
from datetime import datetime


class ReminderView(APIView):

    def post(self, request):
        data = request.data
        todo = Todo.objects.all().filter(owner=self.request.user)
        if todo:
            scheduler.add_job(func=data.get("func", notify), id=data.get('todo_id'),
                              run_date=data.get('time'), args=(data.get('todo_id'),))
            return Response({
                "message": f'A reminder has been created.',
            }, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        return Response([job.id for job in scheduler.get_jobs()])
