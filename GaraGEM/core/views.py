from django.shortcuts import render, redirect

def login_view(request):

    if request.method == "POST":
        return redirect("dashboard")

    return render(request, "core/login.html")


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
