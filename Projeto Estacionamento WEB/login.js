function mostrarErro(inputEl, mensagem) {
  inputEl.style.borderBottom = "2px solid #e53e3e";
  let erro = inputEl.parentElement.querySelector(".msg-erro");
  if (!erro) {
    erro = document.createElement("span");
    erro.className = "msg-erro";
    erro.style.cssText = "color:#e53e3e;font-size:13px;font-family:Arial,sans-serif;margin-top:4px;display:block;";
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

function iniciarLogin() {
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const btnEntrar = document.querySelector(".btn-login");
  const links = document.querySelectorAll(".rodape a");

  if (!btnEntrar) return;

  if (links[0]) {
    links[0].href = "senha-recuperacao.html";
  }

  if (links[1]) {
    links[1].href = "email.html";
  }

  btnEntrar.addEventListener("click", function () {
    let valido = true;

    if (!emailInput.value.trim()) {
      mostrarErro(emailInput, "Informe seu email.");
      valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      mostrarErro(emailInput, "Email inválido.");
      valido = false;
    } else {
      limparErro(emailInput);
    }

    if (!senhaInput.value.trim()) {
      mostrarErro(senhaInput, "Informe sua senha.");
      valido = false;
    } else {
      limparErro(senhaInput);
    }

    if (valido) {
      alert("Login realizado com sucesso!");
    }
  });

  emailInput.addEventListener("input", () => limparErro(emailInput));
  senhaInput.addEventListener("input", () => limparErro(senhaInput));
}

function iniciarEmail() {
  const emailInput = document.getElementById("email");
  const btnNext = document.querySelector(".btn-next");
  const link = document.querySelector(".rodape a");

  if (!btnNext || !emailInput) return;

  if (link) link.href = "index.html";

  btnNext.addEventListener("click", function () {
    if (!emailInput.value.trim()) {
      mostrarErro(emailInput, "Informe seu email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      mostrarErro(emailInput, "Email inválido.");
      return;
    }
    limparErro(emailInput);

    sessionStorage.setItem("emailCadastro", emailInput.value.trim());
    navegarPara("confirmacao-email.html");
  });

  emailInput.addEventListener("input", () => limparErro(emailInput));
}

function iniciarConfirmacaoEmail() {
  const inputs = document.querySelectorAll(".codigo-input");
  const btnNext = document.querySelector(".btn-next");
  const link = document.querySelector(".rodape a");

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

function iniciarCadastro() {
  const usuarioInput = document.getElementById("usuario");
  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmar-senha");
  const btnConfirmar = document.querySelector(".btn-confirmar");
  const link = document.querySelector(".rodape a");

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

    if (valido) {
      alert("Cadastro realizado com sucesso!");
      navegarPara("index.html");
    }
  });

  usuarioInput.addEventListener("input", () => limparErro(usuarioInput));
  senhaInput.addEventListener("input", () => limparErro(senhaInput));
  confirmarSenhaInput.addEventListener("input", () => limparErro(confirmarSenhaInput));
}

function iniciarSenhaRecuperacao() {
  const emailInput = document.getElementById("email");
  const btnNext = document.querySelector(".btn-next");

  if (!btnNext || !emailInput) return;

  btnNext.addEventListener("click", function () {
    if (!emailInput.value.trim()) {
      mostrarErro(emailInput, "Informe seu email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      mostrarErro(emailInput, "Email inválido.");
      return;
    }
    limparErro(emailInput);

    sessionStorage.setItem("emailRecuperacao", emailInput.value.trim());

    sessionStorage.setItem("fluxoRecuperacao", "true");
    navegarPara("confirmacao-email.html");
  });

  emailInput.addEventListener("input", () => limparErro(emailInput));
}

function iniciarRedefinirSenha() {
  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmar-senha");
  const btnNext = document.querySelector(".btn-next");

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

    if (valido) {
      alert("Senha redefinida com sucesso!");
      sessionStorage.removeItem("emailRecuperacao");
      sessionStorage.removeItem("fluxoRecuperacao");
      navegarPara("index.html");
    }
  });

  senhaInput.addEventListener("input", () => limparErro(senhaInput));
  confirmarSenhaInput.addEventListener("input", () => limparErro(confirmarSenhaInput));
}

function ajustarConfirmacaoParaFluxo() {
  const btnNext = document.querySelector(".btn-next");
  if (!btnNext) return;

  const fluxoRecuperacao = sessionStorage.getItem("fluxoRecuperacao");

  if (fluxoRecuperacao === "true") {
    btnNext.addEventListener("click", function () {
      const inputs = document.querySelectorAll(".codigo-input");
      const codigo = Array.from(inputs).map((i) => i.value).join("");
      if (codigo.length < 6) return;
    }, { once: true });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const pagina = window.location.pathname.split("/").pop() || "index.html";

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
      const fluxo = sessionStorage.getItem("fluxoRecuperacao");
      if (fluxo === "true") {
        const btnNext = document.querySelector(".btn-next");
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
