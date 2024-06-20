from django.shortcuts import render
from django.http import HttpResponse

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os

from ultralytics import YOLO

# Create your views here.

@csrf_exempt
def detect_objects(request):

    if request.method == 'POST' and request.FILES['image']:
        image = request.FILES['image']
        image_name = image.name

        if(not os.path.isdir('./media')):
            os.mkdir('media')


        img_path = os.path.join('media', image_name)
        
        with open(img_path, 'wb+') as destination:
            for chunk in image.chunks():
                destination.write(chunk)



    model = YOLO("yolov8n.pt") #this is the stock detection model (other models are for [classification, segmentation, pose and tracking])

    # Display model information (optional)
    # model.info()


    results = model.predict(source=img_path, device='cpu', conf=0.2, iou=0.8) #inference



    # print(results[0].boxes)
    list_of_names = [ results[0].names[(results[0].boxes.cls.cpu().numpy()[i])] for i in range(len(results[0].boxes.cls)) ]


    results_Dict = dict()
    for (i, classification) in enumerate(results[0].boxes.cls.cpu().numpy()):
        results_Dict[results[0].names[classification]] = str(results[0].boxes.conf.cpu().numpy()[i]) #stringify everything lol


    results[0].save(os.path.join(os.path.dirname(img_path), 'lol.jpg'))

    return JsonResponse(results_Dict)


def index(request):
    return render(request, 'index.html')



@csrf_exempt
def upload_image(request):
    if request.method == 'POST' and request.FILES['image']:
        image = request.FILES['image']
        image_name = image.name

        if(not os.path.isdir('./media')):
            os.mkdir('media')


        image_path = os.path.join('media', image_name)
        
        with open(image_path, 'wb+') as destination:
            for chunk in image.chunks():
                destination.write(chunk)
        
        return JsonResponse({'status': 'success', 'message': 'Image uploaded successfully!'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'})

