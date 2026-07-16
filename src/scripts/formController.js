import { validateName, validateEmail, validateMessage } from './formValidator.js';

export function initContactForm() {
  const form = document.getElementById('form');
  if (!form) return;

  form.noValidate = true;

  const campoNome = document.getElementById('campo_nome');
  const campoEmail = document.getElementById('campo_email');
  const campoMensagem = document.getElementById('campo_mensagem');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const errors = {
      nome: validateName(campoNome.value),
      email: validateEmail(campoEmail.value),
      mensagem: validateMessage(campoMensagem.value),
    };

    removeAllErrors(form);

    let isValid = true;
    if (errors.nome) { showError(campoNome, errors.nome); isValid = false; }
    if (errors.email) { showError(campoEmail, errors.email); isValid = false; }
    if (errors.mensagem) { showError(campoMensagem, errors.mensagem); isValid = false; }

    if (isValid) {
      alert('Mensagem enviada com sucesso!');
      form.submit();
      clearFields(campoNome, campoEmail, campoMensagem);
    }
  });
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorLabel = formGroup.querySelector('a');
  if (errorLabel) {
    errorLabel.innerText = message;
    formGroup.classList.add('error');
  }
}

function removeAllErrors(form) {
  form.querySelectorAll('.form-group').forEach((group) => {
    group.classList.remove('error');
    const errorLabel = group.querySelector('a');
    if (errorLabel) errorLabel.innerText = '';
  });
}

function clearFields(...inputs) {
  inputs.forEach((input) => { input.value = ''; });
}
