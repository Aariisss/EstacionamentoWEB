from django.urls import path
from . import views

urlpatterns = [
    path('',                     views.login_view,        name='login'),
    path('login/',               views.login_view,        name='login_alt'),
    path('cadastro/',            views.cadastro,          name='cadastro'),
    path('dashboard/',           views.dashboard,         name='dashboard'),
    path('veiculos/',            views.veiculos,          name='veiculos'),
    path('entrada/',             views.entrada,           name='entrada'),
    path('relatorio/',           views.relatorio,         name='relatorio'),
    path('usuarios/',            views.usuarios,          name='usuarios'),
    path('email/',               views.email,             name='email'),
    path('confirmacao-email/',   views.confirmacao_email, name='confirmacao_email'),
    path('senha-recuperacao/',   views.senha_recuperacao, name='senha_recuperacao'),
    path('redefinir-senha/',     views.redefinir_senha,   name='redefinir_senha'),
]
