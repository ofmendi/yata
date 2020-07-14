from apscheduler.schedulers.background import BackgroundScheduler
from django.conf import settings
from notification.models import Notification
from todo.models import Todo

scheduler = BackgroundScheduler(settings.SCHEDULER_CONFIG)


def start():
    scheduler.start()


def notify(todo_id):
    todo = Todo.objects.all().filter(id=todo_id).first()
    notification = Notification.objects.create(todo=todo, owner=todo.owner)
    notification.save()
