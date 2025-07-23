from django.urls import path
from .views import login_cliente, actividades_view

urlpatterns = [
    path('login/', login_cliente, name='login_cliente'),
    path('actividades/', actividades_view, name='actividades'),
]
