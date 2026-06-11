from django.shortcuts import render


def login_view(request):
    return render(request, 'core/login.html')


def cadastro(request):
    return render(request, 'core/cadastro.html')


def dashboard(request):
    return render(request, 'core/dashboard.html')


def veiculos(request):
    return render(request, 'core/veiculos.html')


def entrada(request):
    return render(request, 'core/entrada.html')


def relatorio(request):
    return render(request, 'core/relatorio.html')


def usuarios(request):
    return render(request, 'core/usuarios.html')


def email(request):
    return render(request, 'core/email.html')


def confirmacao_email(request):
    return render(request, 'core/confirmacao-email.html')


def senha_recuperacao(request):
    return render(request, 'core/senha-recuperacao.html')


def redefinir_senha(request):
    return render(request, 'core/redefinir-senha.html')
