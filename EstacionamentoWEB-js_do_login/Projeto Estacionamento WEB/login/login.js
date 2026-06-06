
const ROTA_APP = "../veiculos/veiculos.html"; 
const ROTA_LOGIN = "../LOGIN/index.html";  

// Chaves do localStorage (devem ser iguais em login.js, sidebar.js e script.js)
const SESSAO_KEY  = "garagem_sessao";
const USUARIOS_KEY = "garagem_usuarios";


// ─────────────────────────────────────────────────────────────
//  HELPERS DE UI
// ─────────────────────────────────────────────────────────────
function mostrarErro(inputEl, mensagem) {
  inputEl.style.borderBottom = "2px solid #e53e3e";
  let erro = inputEl.parentElement.querySelector(".msg-erro");
  if (!erro) {
    erro = document.createElement("span");
    erro.className = "msg-erro";
    erro.style.cssText =
      "color:#e53e3e;font-size:13px;font-family:Arial,sans-serif;margin-top:4px;display:block;";
    inputEl.parentElement.appendChild(erro);
  }
  erro.textContent = mensagem;
}

function limparErro(inputEl) {
  inputEl.style.borderBottom = "1px solid #969696";
  const erro = inputEl.parentElement.querySelector(".msg-erro");
  if (erro) erro.remove();
}

function navegarPara(pagina) {
  window.location.href = pagina;
}


// ─────────────────────────────────────────────────────────────
//  GERENCIAMENTO DE USUÁRIOS — localStorage
// ─────────────────────────────────────────────────────────────
function getUsuarios() {
  return JSON.parse(localStorage.getItem(USUARIOS_KEY) || "[]");
}

function salvarUsuarios(lista) {
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(lista));
}

function buscarUsuarioPorEmail(email) {
  return (
    getUsuarios().find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    ) || null
  );
}

function emailJaCadastrado(email) {
  return !!buscarUsuarioPorEmail(email);
}

function cadastrarNovoUsuario(email, nomeUsuario, senha) {
  const usuarios = getUsuarios();
  usuarios.push({ email, nomeUsuario, senha });
  salvarUsuarios(usuarios);
}

function atualizarSenha(email, novaSenha) {
  const usuarios = getUsuarios();
  const idx = usuarios.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (idx !== -1) {
    usuarios[idx].senha = novaSenha;
    salvarUsuarios(usuarios);
    return true;
  }
  return false;
}

function gerarIniciais(nome) {
  return nome
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}


// ─────────────────────────────────────────────────────────────
//  GERENCIAMENTO DE SESSÃO
// ─────────────────────────────────────────────────────────────
function getSessao() {
  const ls = localStorage.getItem(SESSAO_KEY);
  if (ls) return JSON.parse(ls);
  const ss = sessionStorage.getItem(SESSAO_KEY);
  if (ss) return JSON.parse(ss);
  return null;
}

function iniciarSessao(usuario, manterLogado) {
  const dados = {
    email:    usuario.email,
    nome:     usuario.nomeUsuario,
    funcao:   "Usuário",
    iniciais: gerarIniciais(usuario.nomeUsuario),
  };
  if (manterLogado) {
    localStorage.setItem(SESSAO_KEY, JSON.stringify(dados));
  } else {
    sessionStorage.setItem(SESSAO_KEY, JSON.stringify(dados));
  }
}

function encerrarSessao() {
  localStorage.removeItem(SESSAO_KEY);
  sessionStorage.removeItem(SESSAO_KEY);
}


// ─────────────────────────────────────────────────────────────
//  PROTEÇÃO DE ROTA
// ─────────────────────────────────────────────────────────────
/** Se já estiver logado, redireciona para o app */
function redirecionarSeLogado() {
  if (getSessao()) navegarPara(ROTA_APP);
}


// ─────────────────────────────────────────────────────────────
//  PÁGINA: index.html — Login
// ─────────────────────────────────────────────────────────────
function iniciarLogin() {
  redirecionarSeLogado();

  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const manterInput = document.getElementById("manter");
  const btnEntrar  = document.querySelector(".btn-login");
  const links      = document.querySelectorAll(".rodape a");

  if (!btnEntrar) return;

  if (links[0]) links[0].href = "senha-recuperacao.html";
  if (links[1]) links[1].href = "email.html";

  btnEntrar.addEventListener("click", function () {
    let valido = true;

    // Validação de email
    if (!emailInput.value.trim()) {
      mostrarErro(emailInput, "Informe seu email.");
      valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      mostrarErro(emailInput, "Email inválido.");
      valido = false;
    } else {
      limparErro(emailInput);
    }

    // Validação de senha
    if (!senhaInput.value.trim()) {
      mostrarErro(senhaInput, "Informe sua senha.");
      valido = false;
    } else {
      limparErro(senhaInput);
    }

    if (!valido) return;

    // ── Verifica credenciais no localStorage ──
    const usuario = buscarUsuarioPorEmail(emailInput.value.trim());

    if (!usuario) {
      mostrarErro(emailInput, "Email não cadastrado. Clique em Cadastre-se.");
      return;
    }

    if (usuario.senha !== senhaInput.value) {
      mostrarErro(senhaInput, "Senha incorreta.");
      return;
    }

    // ── Login bem-sucedido ──
    const manterLogado = manterInput ? manterInput.checked : false;
    iniciarSessao(usuario, manterLogado);
    navegarPara(ROTA_APP);
  });

  emailInput.addEventListener("input", () => limparErro(emailInput));
  senhaInput.addEventListener("input", () => limparErro(senhaInput));
}


// ─────────────────────────────────────────────────────────────
//  PÁGINA: email.html — 1ª etapa do cadastro (e-mail)
// ─────────────────────────────────────────────────────────────
function iniciarEmail() {
  const emailInput = document.getElementById("email");
  const btnNext    = document.querySelector(".btn-next");
  const link       = document.querySelector(".rodape a");

  if (!btnNext || !emailInput) return;
  if (link) link.href = "index.html";

  btnNext.addEventListener("click", function () {
    const email = emailInput.value.trim();

    if (!email) {
      mostrarErro(emailInput, "Informe seu email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarErro(emailInput, "Email inválido.");
      return;
    }
    // ── Impede e-mail duplicado ──
    if (emailJaCadastrado(email)) {
      mostrarErro(emailInput, "Este email já está cadastrado. Faça login.");
      return;
    }

    limparErro(emailInput);
    sessionStorage.setItem("emailCadastro", email);
    navegarPara("confirmacao-email.html");
  });

  emailInput.addEventListener("input", () => limparErro(emailInput));
}


// ─────────────────────────────────────────────────────────────
//  PÁGINA: confirmacao-email.html — Código de 6 dígitos
// ─────────────────────────────────────────────────────────────
function iniciarConfirmacaoEmail() {
  const inputs = document.querySelectorAll(".codigo-input");
  const btnNext = document.querySelector(".btn-next");
  const link    = document.querySelector(".rodape a");

  if (!btnNext || inputs.length === 0) return;

  if (link) {
    link.href = "#";
    link.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Um novo código foi enviado para o seu email.");
    });
  }

  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
      if (this.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !this.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  btnNext.addEventListener("click", function () {
    const codigo = Array.from(inputs).map((i) => i.value).join("");
    if (codigo.length < 6) {
      alert("Digite o código completo de 6 dígitos.");
      return;
    }
    navegarPara("cadastro.html");
  });
}


// ─────────────────────────────────────────────────────────────
//  PÁGINA: cadastro.html — Dados do novo usuário
// ─────────────────────────────────────────────────────────────
function iniciarCadastro() {
  const usuarioInput       = document.getElementById("usuario");
  const senhaInput         = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmar-senha");
  const btnConfirmar        = document.querySelector(".btn-confirmar");
  const link                = document.querySelector(".rodape a");

  if (!btnConfirmar) return;
  if (link) link.href = "index.html";

  btnConfirmar.addEventListener("click", function () {
    let valido = true;

    if (!usuarioInput.value.trim()) {
      mostrarErro(usuarioInput, "Informe um nome de usuário.");
      valido = false;
    } else {
      limparErro(usuarioInput);
    }

    if (!senhaInput.value.trim()) {
      mostrarErro(senhaInput, "Informe uma senha.");
      valido = false;
    } else if (senhaInput.value.length < 6) {
      mostrarErro(senhaInput, "A senha deve ter pelo menos 6 caracteres.");
      valido = false;
    } else {
      limparErro(senhaInput);
    }

    if (!confirmarSenhaInput.value.trim()) {
      mostrarErro(confirmarSenhaInput, "Confirme sua senha.");
      valido = false;
    } else if (confirmarSenhaInput.value !== senhaInput.value) {
      mostrarErro(confirmarSenhaInput, "As senhas não coincidem.");
      valido = false;
    } else {
      limparErro(confirmarSenhaInput);
    }

    if (!valido) return;

    // ── Recupera o e-mail salvo na etapa anterior ──
    const email = sessionStorage.getItem("emailCadastro");
    if (!email) {
      alert("Sessão expirada. Inicie o cadastro novamente.");
      navegarPara("email.html");
      return;
    }

    // Checagem extra: evita corrida caso outro cadastro tenha ocorrido
    if (emailJaCadastrado(email)) {
      alert("Este email já está cadastrado. Faça login.");
      navegarPara("index.html");
      return;
    }

    // ── Salva o novo usuário no localStorage ──
    cadastrarNovoUsuario(email, usuarioInput.value.trim(), senhaInput.value.trim());
    sessionStorage.removeItem("emailCadastro");

    alert("Cadastro realizado com sucesso! Faça login para continuar.");
    navegarPara("index.html");
  });

  usuarioInput.addEventListener("input", () => limparErro(usuarioInput));
  senhaInput.addEventListener("input", () => limparErro(senhaInput));
  confirmarSenhaInput.addEventListener("input", () => limparErro(confirmarSenhaInput));
}


// ─────────────────────────────────────────────────────────────
//  PÁGINA: senha-recuperacao.html — Informe o e-mail
// ─────────────────────────────────────────────────────────────
function iniciarSenhaRecuperacao() {
  const emailInput = document.getElementById("email");
  const btnNext    = document.querySelector(".btn-next");

  if (!btnNext || !emailInput) return;

  btnNext.addEventListener("click", function () {
    const email = emailInput.value.trim();

    if (!email) {
      mostrarErro(emailInput, "Informe seu email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarErro(emailInput, "Email inválido.");
      return;
    }
    // ── Verifica se o e-mail existe ──
    if (!emailJaCadastrado(email)) {
      mostrarErro(emailInput, "Email não encontrado.");
      return;
    }

    limparErro(emailInput);
    sessionStorage.setItem("emailRecuperacao", email);
    sessionStorage.setItem("fluxoRecuperacao", "true");
    navegarPara("confirmacao-email.html");
  });

  emailInput.addEventListener("input", () => limparErro(emailInput));
}


// ─────────────────────────────────────────────────────────────
//  PÁGINA: redefinir-senha.html — Nova senha
// ─────────────────────────────────────────────────────────────
function iniciarRedefinirSenha() {
  const senhaInput         = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmar-senha");
  const btnNext             = document.querySelector(".btn-next");

  if (!btnNext) return;

  btnNext.addEventListener("click", function () {
    let valido = true;

    if (!senhaInput.value.trim()) {
      mostrarErro(senhaInput, "Informe a nova senha.");
      valido = false;
    } else if (senhaInput.value.length < 6) {
      mostrarErro(senhaInput, "A senha deve ter pelo menos 6 caracteres.");
      valido = false;
    } else {
      limparErro(senhaInput);
    }

    if (!confirmarSenhaInput.value.trim()) {
      mostrarErro(confirmarSenhaInput, "Confirme a nova senha.");
      valido = false;
    } else if (confirmarSenhaInput.value !== senhaInput.value) {
      mostrarErro(confirmarSenhaInput, "As senhas não coincidem.");
      valido = false;
    } else {
      limparErro(confirmarSenhaInput);
    }

    if (!valido) return;

    // ── Atualiza a senha no localStorage ──
    const email = sessionStorage.getItem("emailRecuperacao");
    if (email) atualizarSenha(email, senhaInput.value.trim());

    sessionStorage.removeItem("emailRecuperacao");
    sessionStorage.removeItem("fluxoRecuperacao");

    alert("Senha redefinida com sucesso!");
    navegarPara("index.html");
  });

  senhaInput.addEventListener("input", () => limparErro(senhaInput));
  confirmarSenhaInput.addEventListener("input", () => limparErro(confirmarSenhaInput));
}


// ─────────────────────────────────────────────────────────────
//  DISPATCHER — detecta a página atual e chama a função certa
// ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  const pagina =
    window.location.pathname.split("/").pop() || "index.html";

  switch (pagina) {
    case "index.html":
    case "":
      iniciarLogin();
      break;

    case "email.html":
      iniciarEmail();
      break;

    case "confirmacao-email.html":
      iniciarConfirmacaoEmail();

      // Sobrescreve o botão se vier do fluxo de recuperação
      if (sessionStorage.getItem("fluxoRecuperacao") === "true") {
        const btnNext    = document.querySelector(".btn-next");
        const novoBtnNext = btnNext.cloneNode(true);
        btnNext.parentNode.replaceChild(novoBtnNext, btnNext);

        const inputs = document.querySelectorAll(".codigo-input");
        inputs.forEach((input, index) => {
          input.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "");
            if (this.value.length === 1 && index < inputs.length - 1) {
              inputs[index + 1].focus();
            }
          });
          input.addEventListener("keydown", function (e) {
            if (e.key === "Backspace" && !this.value && index > 0) {
              inputs[index - 1].focus();
            }
          });
        });

        novoBtnNext.addEventListener("click", function () {
          const codigo = Array.from(inputs).map((i) => i.value).join("");
          if (codigo.length < 6) {
            alert("Digite o código completo de 6 dígitos.");
            return;
          }
          navegarPara("redefinir-senha.html");
        });
      }
      break;

    case "cadastro.html":
      iniciarCadastro();
      break;

    case "senha-recuperacao.html":
      iniciarSenhaRecuperacao();
      break;

    case "redefinir-senha.html":
      iniciarRedefinirSenha();
      break;
  }
});
