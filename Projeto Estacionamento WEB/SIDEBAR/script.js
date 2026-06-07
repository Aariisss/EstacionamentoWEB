// ============================================================
// ⚠️  CONFIGURAÇÃO — ajuste conforme sua estrutura de pastas
// ============================================================
// Chave da sessão (deve ser IGUAL à definida em login.js)
const SESSAO_KEY  = "garagem_sessao";
// Caminho do sidebar standalone → tela de login
const ROTA_LOGIN = "../LOGIN/index.html"; // ex: "../login/index.html"
// ============================================================


// ─────────────────────────────────────────────────────────────
//  UTILITÁRIOS
// ─────────────────────────────────────────────────────────────
function gerarIniciais(nome) {
  return nome
    .split(" ")
    .map((palavra) => palavra[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getSessao() {
  const ls = localStorage.getItem(SESSAO_KEY);
  if (ls) return JSON.parse(ls);
  const ss = sessionStorage.getItem(SESSAO_KEY);
  if (ss) return JSON.parse(ss);
  return null;
}


// ─────────────────────────────────────────────────────────────
//  CARREGA OS DADOS DO USUÁRIO LOGADO NA SIDEBAR
// ─────────────────────────────────────────────────────────────
function carregarUsuario() {
  const sessao = getSessao();

  if (!sessao) {
    // Standalone sidebar sem sessão → redireciona para o login
    window.location.href = ROTA_LOGIN;
    return;
  }

  const nomeEl   = document.getElementById("usuarionome");
  const funcaoEl = document.getElementById("usuariofuncao");
  const fotoEl   = document.getElementById("fotouser");

  if (nomeEl)   nomeEl.textContent   = sessao.nome;
  if (funcaoEl) funcaoEl.textContent = sessao.funcao;
  if (fotoEl)   fotoEl.textContent   =
    sessao.iniciais || gerarIniciais(sessao.nome);
}

carregarUsuario();


// ─────────────────────────────────────────────────────────────
//  LOGOUT
// ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector(".logoutarea");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(SESSAO_KEY);
    sessionStorage.removeItem(SESSAO_KEY);

    // Usa SweetAlert2 se disponível, senão redireciona direto
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "Você saiu do sistema",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = ROTA_LOGIN;
      });
    } else {
      window.location.href = ROTA_LOGIN;
    }
  });
});
