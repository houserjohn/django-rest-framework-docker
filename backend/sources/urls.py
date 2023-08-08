from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('list/', views.sourceList, name='list'),
    path('view/<str:pk>/', views.sourceView, name='view'),
    path('create/', views.sourceCreate, name='create'),
    path('update/<str:pk>', views.sourceUpdate, name='update'),
    path('delete/<str:pk>', views.sourceDelete, name='delete'),
    path('page/<str:page>', views.sourcePage, name='page'),
]