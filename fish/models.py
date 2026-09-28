from django.db import models

class FishBase(models.Model):
    img=models.ImageField(upload_to="images/")
    number=models.IntegerField(default=0)
    create_time=models.DateTimeField(auto_now_add=True)
    is_delete=models.BooleanField(default=False)
