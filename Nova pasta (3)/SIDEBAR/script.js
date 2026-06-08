// Chaves do localStorage — iguais em login.js, script.js e scriptMain.js
const SESSAO_KEY   = "garagem_sessao";
const USUARIOS_KEY = "garagem_usuarios";


// ─────────────────────────────────────────────────────────────
//  INICIAIS DO AVATAR
// ─────────────────────────────────────────────────────────────
function gerarIniciais(nome) {
    return nome
        .split(" ")
        .map(palavra => palavra[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}


// ─────────────────────────────────────────────────────────────
//  CARREGAR DADOS DO USUÁRIO NA SIDEBAR
// ─────────────────────────────────────────────────────────────
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


// ─────────────────────────────────────────────────────────────
//  PROTEÇÃO DE ROTA — verifica se o usuário está logado
// ─────────────────────────────────────────────────────────────
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


// ─────────────────────────────────────────────────────────────
//  INIT — tudo dentro do DOMContentLoaded
//  A sidebar é injetada via fetch/innerHTML na página pai,
//  então o .logoutarea só existe após o DOM estar completo
// ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

    // 1. Preenche nome, função e iniciais na sidebar
    carregarUsuario();

    // 2. Logout — busca o botão após o DOM estar pronto
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