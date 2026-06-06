function gerarIniciais(nome) {
    return nome
        .split(" ")
        .map(palavra => palavra[0])
        .join("")
        .toUpperCase();
}
const userMock = {
    nome: "Administrador",
    funcao: "Admin",
    iniciais: gerarIniciais("Administrador")
}


localStorage.setItem("usuario", JSON.stringify(userMock));

function carregarUsuario() {
    const dados = localStorage.getItem("usuario");
    if (!dados) return;
    const usuario = JSON.parse(dados);

    document.getElementById("usuarionome").textContent = usuario.nome;
    document.getElementById("usuariofuncao").textContent = usuario.funcao;
    document.getElementById("fotouser").textContent = usuario.iniciais;
}

carregarUsuario();

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector(".logoutarea");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        Swal.fire("Você saiu do sistema").then(() => {
            window.location.href = "login.html";
        });
    });
});