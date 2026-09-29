from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
from fish.models import FishBase
from lib.yolov8 import FishDetector


#查询
def fish_base(request):
    last=FishBase.objects.all().order_by('id').last()
    return JsonResponse({'code':100,'msg':'成功','result':[str(last.img),last.number]})

#上传
@csrf_exempt
def upload(request):
    img=request.FILES.get('avatar')

    os.makedirs('media/images', exist_ok=True)

    with open('media/images/avatar.jpg','wb') as f:
        for chunk in img.chunks():
            f.write(chunk)
    detector = FishDetector()
    count = detector.predict('media/images/avatar.jpg')
    FishBase.objects.create(number=count, img='predict/avatar.jpg')

    return JsonResponse({'status': 'success'})