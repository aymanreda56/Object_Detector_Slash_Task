from django.urls import path, include
from . import views

from django.contrib import admin

urlpatterns = [
    path('', views.index, name='index'),
    path(route= 'uploadimg/', view= views.detect_objects, name='detect_image_objects'),


    path('upload/', views.detect_objects, name='upload_image'),

]