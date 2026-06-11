
const SESSAO_KEY   = "garagem_sessao";
const USUARIOS_KEY = "garagem_usuarios";



function gerarIniciais(nome) {
    return nome
        .split(" ")
        .map(palavra => palavra[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}



function carregarUsuario() {
    const dados =
        localStorage.getItem(SESSAO_KEY) ||
        sessionStorage.getItem(SESSAO_KEY);

    if (!dados) {
        window.location.href = "../LOGIN/index.html";
        return;
    }

    const usuario = JSON.parse(dados);

    const elNome   = document.getElementById("usuarionome");
    const elFuncao = document.getElementById("usuariofuncao");
    const elFoto   = document.getElementById("fotouser");

    if (elNome)   elNome.textContent   = usuario.nome;
    if (elFuncao) elFuncao.textContent = usuario.funcao;
    if (elFoto)   elFoto.textContent   = usuario.iniciais || gerarIniciais(usuario.nome);
}



function verificarSessao() {
    const dados =
        localStorage.getItem(SESSAO_KEY) ||
        sessionStorage.getItem(SESSAO_KEY);

    if (!dados) {
        window.location.href = "../LOGIN/index.html";
        return null;
    }

    return JSON.parse(dados);
}



document.addEventListener("DOMContentLoaded", () => {


    carregarUsuario();


    const logoutBtn = document.querySelector(".logoutarea");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem(SESSAO_KEY);
            sessionStorage.removeItem(SESSAO_KEY);

            Swal.fire({
                icon:              "success",
                title:             "Você saiu do sistema",
                timer:             1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "../LOGIN/index.html";
            });
        });
    }
});