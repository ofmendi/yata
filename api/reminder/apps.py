from django.apps import AppConfig
from django.conf import settings


class ReminderConfig(AppConfig):
    name = 'reminder'

    def ready(self):
        from . import scheduler
        if settings.SCHEDULER_AUTOSTART:
        	scheduler.start()