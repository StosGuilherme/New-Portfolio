const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(value) {
  const name = value.trim();
  if (!name) return 'O nome é obrigatório';
  if (name.length < 3) return 'O nome deve ter pelo menos 3 caracteres';
  return null;
}

export function validateEmail(value) {
  const email = value.trim();
  if (!email) return 'O email é obrigatório';
  if (!EMAIL_REGEX.test(email)) return 'Email inválido';
  return null;
}

export function validateMessage(value) {
  const message = value.trim();
  if (!message) return 'A mensagem é obrigatória';
  if (message.length < 10) return 'A mensagem deve ter pelo menos 10 caracteres';
  return null;
}
