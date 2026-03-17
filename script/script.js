const form = document.getElementById("form");
const campoNome = document.getElementById("campo_nome");
const campoEmail = document.getElementById("campo_email");
const campoMensagem = document.getElementById("campo_mensagem");

form.addEventListener("submit", (event) => {
  
  event.preventDefault();
  if (validarFormulario()) {
    alert("Mensagem enviada com sucesso!");
    limparDados();
    form.submit();
  }
});

// Função de validação completa
function validarFormulario() {
  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim();
  const mensagem = campoMensagem.value.trim();

  // Resetar erros anteriores
  removerTodosErros();

  let formularioValido = true;

  // Validar nome
  if (!nome) {
    exibirErro(campoNome, "O nome é obrigatório");
    formularioValido = false;
  } else if (nome.length < 3) {
    exibirErro(campoNome, "O nome deve ter pelo menos 3 caracteres");
    formularioValido = false;
  }

  // Validar email
  if (!email) {
    exibirErro(campoEmail, "O email é obrigatório");
    formularioValido = false;
  } else if (!validarEmail(email)) {
    exibirErro(campoEmail, "Email inválido");
    formularioValido = false;
  }

  // Validar mensagem
  if (!mensagem) {
    exibirErro(campoMensagem, "A mensagem é obrigatória");
    formularioValido = false;
  } else if (mensagem.length < 10) {
    exibirErro(campoMensagem, "A mensagem deve ter pelo menos 10 caracteres");
    formularioValido = false;
  }

  return formularioValido;
}

// Função para validar formato de email
function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

// Função para exibir erro
function exibirErro(input, mensagem) {
  const formItem = input.parentElement;
  const textMessage = formItem.querySelector("a");

  if (textMessage) {
    textMessage.innerText = mensagem;
    formItem.classList.add("error");
  }
}

// Função para remover todos os erros
function removerTodosErros() {
  const formGroups = form.querySelectorAll(".form-group");
  formGroups.forEach((group) => {
    group.classList.remove("error");
    const mensagemErro = group.querySelector("a");
    if (mensagemErro) {
      mensagemErro.innerText = "";
    }
  });
}

function limparDados() {
  campoNome.value = "";
  campoEmail.value = "";
  campoMensagem.value = "";
  form.reset();
}
