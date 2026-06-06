
const SESSAO_KEY  = "garagem_sessao";

const ROTA_LOGIN = "../LOGIN/index.html"; 

// ─────────────────────────────────────────────────────────────
//  SESSÃO
// ─────────────────────────────────────────────────────────────
function getSessaoAtual() {
  const ls = localStorage.getItem(SESSAO_KEY);
  if (ls) return JSON.parse(ls);
  const ss = sessionStorage.getItem(SESSAO_KEY);
  if (ss) return JSON.parse(ss);
  return null;
}

function encerrarSessaoAtual() {
  localStorage.removeItem(SESSAO_KEY);
  sessionStorage.removeItem(SESSAO_KEY);
}


// ─────────────────────────────────────────────────────────────
//  INICIALIZAÇÃO DA SIDEBAR
//  Chamada APÓS o HTML da sidebar ser injetado no DOM
// ─────────────────────────────────────────────────────────────
function inicializarSidebar() {
  const sessao = getSessaoAtual();

  // ── Proteção de rota: sem sessão → login ──
  if (!sessao) {
    window.location.href = ROTA_LOGIN;
    return;
  }

  // ── Preenche os dados do usuário logado ──
  const nomeEl   = document.getElementById("usuarionome");
  const funcaoEl = document.getElementById("usuariofuncao");
  const fotoEl   = document.getElementById("fotouser");

  if (nomeEl)   nomeEl.textContent   = sessao.nome;
  if (funcaoEl) funcaoEl.textContent = sessao.funcao;
  if (fotoEl)   fotoEl.textContent   =
    sessao.iniciais || sessao.nome.slice(0, 2).toUpperCase();

  // ── Configura botão de logout ──
  const logoutBtn = document.querySelector(".logoutarea");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      encerrarSessaoAtual();
      window.location.href = ROTA_LOGIN;
    });
  }
}


// ─────────────────────────────────────────────────────────────
//  CARREGAMENTO DA SIDEBAR
// ─────────────────────────────────────────────────────────────
fetch("../SIDEBAR/sidebar.html")
  .then((res) => {
    if (!res.ok) throw new Error("Sidebar não encontrada: " + res.status);
    return res.text();
  })
  .then((html) => {
    const container = document.getElementById("sidebar-container");
    if (!container) return;

    // Remove scripts do HTML antes de injetar (scripts via innerHTML não executam)
    container.innerHTML = html.replace(/<script[\s\S]*?<\/script>/gi, "");

    // Inicializa a sidebar depois de inserida no DOM
    inicializarSidebar();
  })
  .catch((err) => {
    console.error("Erro ao carregar sidebar:", err);
  });
