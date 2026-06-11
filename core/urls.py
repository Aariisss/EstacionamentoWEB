from django.urls import path
from . import views

urlpatterns = [
    path('',             views.login_view,   name='login'),
    path('login/',       views.login_view,   name='login'),
    path('dashboard/',   views.dashboard,    name='dashboard'),
    path('veiculos/',    views.veiculos,     name='veiculos'),
    path('entrada/',     views.entrada,      name='entrada'),
    path('relatorio/',   views.relatorio,    name='relatorio'),
    path('usuarios/',    views.usuarios,     name='usuarios'),
    path('cadastro/',    views.cadastro,     name='cadastro'),
]
