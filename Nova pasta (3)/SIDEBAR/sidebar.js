const SESSAO_KEY = "garagem_sessao";

function gerarIniciais(nome) {
    return nome
        .split(" ")
        .map(p => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function obterSessao() {

    const local =
        localStorage.getItem(SESSAO_KEY);

    const session =
        sessionStorage.getItem(SESSAO_KEY);

    const dados = local || session;

    if (!dados) {
        return null;
    }

    try {
        return JSON.parse(dados);
    }
    catch {

        localStorage.removeItem(SESSAO_KEY);
        sessionStorage.removeItem(SESSAO_KEY);

        return null;
    }
}

function protegerPagina() {

    const usuario = obterSessao();

    if (!usuario) {

        window.location.href =
            "LOGIN/index.html";

        return false;
    }

    return usuario;
}

function preencherSidebar(usuario) {

    const nome =
        document.getElementById("usuarionome");

    const funcao =
        document.getElementById("usuariofuncao");

    const foto =
        document.getElementById("fotouser");

    if (nome) {
        nome.textContent = usuario.nome;
    }

    if (funcao) {
        funcao.textContent = usuario.funcao;
    }

    if (foto) {
        foto.textContent =
            usuario.iniciais ||
            gerarIniciais(usuario.nome);
    }
}

function configurarLogout() {

    const botao =
        document.querySelector(".logoutarea");

    if (!botao) return;

    botao.addEventListener("click", () => {

        localStorage.removeItem(SESSAO_KEY);
        sessionStorage.removeItem(SESSAO_KEY);

        Swal.fire({
            icon: "success",
            title: "Logout realizado",
            timer: 1500,
            showConfirmButton: false
        }).then(() => {

            window.location.href =
                "LOGIN/index.html";

        });

    });

}

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const usuario =
            protegerPagina();

        if (!usuario) return;

        const resposta =
            await fetch("SIDEBAR/sidebar.html");

        const html =
            await resposta.text();

        document.getElementById(
            "sidebar-container"
        ).innerHTML = html;

        preencherSidebar(usuario);

        configurarLogout();

    }
);