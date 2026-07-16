# Modernização do Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar o portfolio (site principal + 2 projetos antigos linkados) responsivo de verdade, com CSS/JS organizados por responsabilidade, pastas reorganizadas, e Vite como build tool, documentado em CLAUDE.md.

**Architecture:** Site estático sem framework JS, servido/buildado via Vite (multi-page: `index.html` + `projects/donuts-store/*.html` + `projects/portfolio-legado/*.html`). CSS dividido em tokens + arquivos por seção (mobile-first, media queries `min-width`). JS dividido em módulos ES por responsabilidade única (validação, controle de form, navegação).

**Tech Stack:** HTML/CSS/JS puro, Vite ^5, Node >=18. Sem framework de teste automatizado (verificação manual via `npm run dev`/`npm run build`/`npm run preview`).

## Global Constraints

- **NUNCA rode `git add` ou `git commit` durante a execução deste plano.** O usuário fará commits manualmente. Nenhum step deste plano inclui commit — se algum step parecer exigir, pule.
- Mobile-first: toda regra CSS nova escreve o caso mobile primeiro (sem media query); breakpoints via `@media (min-width: ...)`, nunca `max-width` decrescente.
- Breakpoints fixos: `768px` (tablet), `1024px` (desktop), `1440px` (wide/container max).
- Nomenclatura de arquivo: kebab-case, sem espaço/acento/parênteses.
- Nenhum valor hex/px "mágico" novo em arquivos de seção — sempre usar variável de `src/styles/tokens.css`.
- Projetos em `projects/` (Donuts Store, Portfolio legado) recebem só correções de responsividade + renomeação de arquivo. Não reescrever HTML/JS/lógica deles.
- Node >= 18 (exigência do Vite 5).
- Deploy alvo: GitHub Pages, `base: '/New-Portfolio/'`.

---

### Task 1: Scaffold Vite (package.json, vite.config.js, public/)

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `public/favicon.svg` (copiado de `assets/new portfolio-logo.svg`)
- Create: `public/curriculo.pdf` (copiado de `assets/Currículo GUILHERME SANTOS.pdf`)
- Create: `.gitignore`

**Interfaces:**
- Produces: comandos `npm run dev`, `npm run build`, `npm run preview` disponíveis para todas as tasks seguintes.

- [ ] **Step 1: Criar `package.json`**

```json
{
  "name": "new-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Criar `vite.config.js` (single entry por enquanto — multi-page vem na Task 9)**

```js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/New-Portfolio/',
});
```

- [ ] **Step 3: Criar `.gitignore`**

```
node_modules/
dist/
.vite/
```

- [ ] **Step 4: Copiar favicon e currículo para `public/`**

```bash
mkdir -p public
cp "assets/new portfolio-logo.svg" "public/favicon.svg"
cp "assets/Currículo GUILHERME SANTOS.pdf" "public/curriculo.pdf"
```

- [ ] **Step 5: Instalar dependências**

Run: `npm install`
Expected: cria `node_modules/` e `package-lock.json`, sem erro.

- [ ] **Step 6: Verificar que o site atual (inalterado) sobe no Vite**

Run: `npm run dev`
Expected: terminal mostra `Local: http://localhost:5173/`. Abrir no navegador — site deve renderizar identico ao antes (Vite serve `index.html` + `css/style.css` + `script/script.js` como estão, sem exigir mudança ainda).

Parar o servidor (Ctrl+C) antes de seguir pra próxima task.

---

### Task 2: Tokens, base, header e hero (CSS + markup)

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/styles/header.css`
- Create: `src/styles/hero.css`
- Create: `src/main.js`
- Modify: `index.html` (head: favicon corrigido + tag `<script type="module" src="/src/main.js">`, que por ora só carrega CSS — os módulos JS de fato são importados em `main.js` na Task 5; header: botão de menu mobile)

**Interfaces:**
- Produces: variáveis CSS em `tokens.css` (`--color-bg`, `--color-primary`, `--color-primary-dark`, `--color-text`, `--color-text-muted`, `--color-text-dim`, `--color-text-faint`, `--font-family-base`, `--font-family-heading`, `--space-xs|sm|md|lg|xl`, `--radius-sm|lg`, `--transition-base`, `--container-max`) — usadas por todos os arquivos de estilo seguintes.
- Produces: classe `.nav-toggle` no header (botão hambúrguer mobile) — consumida pelo `navigation.js` da Task 5.

- [ ] **Step 1: Criar `src/styles/tokens.css`**

```css
:root {
  --color-bg: #121212;
  --color-bg-alt: #202020;
  --color-primary: #FD6F00;
  --color-primary-dark: #F13D11;
  --color-text: #ffffff;
  --color-text-muted: #707070;
  --color-text-dim: #575757;
  --color-text-faint: #959595;

  --font-family-base: "Quicksand", sans-serif;
  --font-family-heading: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;

  --radius-sm: 8px;
  --radius-lg: 30px;

  --transition-base: all 0.3s ease-in-out;

  --container-max: 1400px;
}
```

- [ ] **Step 2: Criar `src/styles/base.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=Kufam:ital,wght@0,400..900;1,400..900&family=Madimi+One&family=Quicksand:wght@300..700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: var(--font-family-base);
  font-optical-sizing: auto;
  font-style: normal;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  overflow-x: hidden;
}

strong {
  color: var(--color-text-faint);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

- [ ] **Step 3: Criar `src/styles/header.css`** (mobile-first, com menu hambúrguer)

```css
header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--color-bg);
}

header nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
}

.nav-toggle {
  display: block;
  background: transparent;
  border: 1px solid var(--color-text-dim);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-size: 1.5em;
  padding: var(--space-xs) var(--space-sm);
  cursor: pointer;
}

header nav ul {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  background-color: var(--color-bg);
  list-style: none;
  padding: var(--space-md) 0 0;
}

header nav ul.is-open {
  display: flex;
}

header nav ul li {
  font-size: 1.1em;
  color: var(--color-primary-dark);
}

header nav ul li a {
  text-decoration: none;
  color: var(--color-text-dim);
  transition: var(--transition-base);
  position: relative;
  padding: 4px;
  border-radius: var(--radius-sm);
}

header nav ul li a:hover {
  background-color: var(--color-primary);
  color: var(--color-text);
  padding: 8px;
}

.hire-button {
  padding: var(--space-xs) var(--space-md);
  background-color: var(--color-primary);
  font-weight: bold;
  color: var(--color-text);
  border-radius: var(--radius-sm);
}

.hire-button:hover {
  color: var(--color-primary-dark);
  background-color: #ffb781fb;
  text-decoration: none;
}

@media (min-width: 768px) {
  header nav {
    flex-direction: column;
    padding: var(--space-sm) 0 var(--space-md);
  }

  .nav-toggle {
    display: none;
  }

  header nav ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 5%;
    padding: 0;
  }

  header nav ul li {
    margin-top: var(--space-md);
    font-size: 1.5em;
  }
}
```

- [ ] **Step 4: Criar `src/styles/hero.css`** (mobile-first)

```css
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-md);
}

main section {
  width: 100%;
  letter-spacing: 0.03em;
}

main section h3 {
  color: var(--color-text-muted);
  font-size: clamp(1rem, 3vw, 1.5rem);
}

main section h2 {
  color: var(--color-text-faint);
  font-size: clamp(1.25rem, 4vw, 2rem);
  padding: 5px 0;
}

main section h1 {
  color: var(--color-primary);
  font-size: clamp(2rem, 8vw, 4.375rem);
  font-family: var(--font-family-heading);
  font-weight: bold;
}

main section img {
  width: 35px;
  background: var(--color-text-dim);
  border: 1px solid var(--color-text);
  border-radius: 50%;
  padding: 8px;
}

main section div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) 0;
}

main section .download-cv {
  padding: var(--space-xs) var(--space-md);
  background-color: transparent;
  border: 1px solid var(--color-text);
  font-weight: bold;
  color: var(--color-text);
  border-radius: var(--radius-sm);
  text-align: center;
  text-decoration: none;
  transition: var(--transition-base);
}

main section .download-cv:hover {
  border-color: var(--color-text-faint);
  color: var(--color-text-faint);
}

.foto-gui {
  width: 100%;
  display: flex;
  justify-content: center;
}

.foto-gui img {
  width: 100%;
  max-width: 320px;
}

@media (min-width: 1024px) {
  main {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-xl);
  }

  main section {
    width: 45%;
  }

  .foto-gui {
    width: 45%;
  }

  .foto-gui img {
    max-width: 400px;
  }
}
```

- [ ] **Step 5: Criar `src/main.js`** (por ora só CSS — JS de fato entra na Task 5)

```js
import './styles/tokens.css';
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
```

- [ ] **Step 6: Modificar `index.html`** — adiciona o novo bundle de estilos (carregado *depois* do `css/style.css` antigo, então vence na cascata pra header/hero), favicon corrigido, e botão de menu mobile

No `<head>`, depois do `<link rel="stylesheet" href="css/style.css" />` existente, adicionar:

```html
<link rel="icon" href="favicon.svg" type="image/svg+xml" />
<script type="module" src="/src/main.js"></script>
```

Remover o antigo `<link rel="shortcut icon" href="assets/new portfolio-logo.svg" type="image/png" />` (substituído pela linha acima).

No `<nav>`, adicionar o botão antes do `<ul>`:

```html
<nav>
  <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">☰</button>
  <ul>
    ...
  </ul>
</nav>
```

- [ ] **Step 7: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:5173/`.
Expected: header e hero usando as novas variáveis/proporções; redimensionar a janela pra <768px deve mostrar o botão `☰` (menu ainda não funciona — JS vem na Task 5, tudo bem, o `<ul>` sem `.is-open` fica oculto no mobile por enquanto); acima de 1024px, hero fica lado a lado com a foto. Nenhum erro no console.

---

### Task 3: Formação e Projetos (CSS)

**Files:**
- Create: `src/styles/formacao.css`
- Create: `src/styles/projetos.css`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: variáveis de `tokens.css` (Task 2).

- [ ] **Step 1: Criar `src/styles/formacao.css`**

```css
#formacao {
  margin: 0 auto;
  padding: var(--space-lg) var(--space-md);
  text-align: center;
  width: 100%;
}

#formacao h1 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: var(--color-text);
  font-weight: bold;
  padding-bottom: var(--space-md);
}

#formacao h3 {
  width: 100%;
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: var(--color-text-muted);
  font-weight: bold;
  line-height: 1.6;
}
```

- [ ] **Step 2: Criar `src/styles/projetos.css`** (cards em grid responsivo)

```css
#projetos {
  margin: 0 auto;
  padding: var(--space-lg) var(--space-md);
  text-align: center;
  width: 100%;
}

#projetos h1 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: var(--color-text);
  font-weight: bold;
  padding: var(--space-sm);
}

#projetos h3 {
  font-size: clamp(0.95rem, 2.5vw, 1.2em);
  color: var(--color-text-muted);
  font-weight: bold;
}

.container-projects ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-lg);
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--space-lg) 0;
  list-style: none;
}

.container-projects ul li {
  background-color: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  padding-bottom: var(--space-md);
}

.container-projects ul li h1 {
  margin: var(--space-sm);
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  color: var(--color-primary-dark);
}

.container-projects ul li h3 {
  padding: var(--space-sm);
  color: var(--color-text-muted);
}

.container-projects ul li img {
  width: 100%;
  padding: var(--space-md);
}

.container-projects a {
  text-decoration: none;
  color: var(--color-primary);
  font-size: 1.2em;
  border: 1px solid var(--color-primary);
  padding: 5px 10px;
  border-radius: 40px;
  transition: var(--transition-base);
}

.container-projects a:hover {
  color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  padding: 10px 15px;
}
```

- [ ] **Step 3: Importar os dois arquivos em `src/main.js`**

```js
import './styles/tokens.css';
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/formacao.css';
import './styles/projetos.css';
```

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`.
Expected: seção Formação e cards de Projetos usando grid responsivo — redimensionar de 375px até 1440px, cards devem re-fluir de 1 coluna (mobile) até 3 colunas (desktop) sem overflow horizontal.

---

### Task 4: Sobre-mim, Contato, back-to-top (CSS) + remoção do CSS antigo

**Files:**
- Create: `src/styles/sobre-mim.css`
- Create: `src/styles/contato.css`
- Create: `src/styles/back-to-top.css`
- Modify: `src/main.js`
- Modify: `index.html` (remove `<link rel="stylesheet" href="css/style.css" />` e `<script src="script/script.js"></script>`)
- Delete: `css/style.css`
- Delete: `script/script.js`

**Interfaces:**
- Consumes: variáveis de `tokens.css`.

- [ ] **Step 1: Criar `src/styles/sobre-mim.css`**

```css
#sobre-mim {
  margin: 0 auto;
  padding: var(--space-lg) var(--space-md);
  text-align: center;
  width: 100%;
}

#sobre-mim h1 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: var(--color-text);
  font-weight: bold;
  padding: var(--space-sm);
}

#sobre-mim h3 {
  font-size: clamp(0.95rem, 2.5vw, 1.2em);
  color: var(--color-text-muted);
  font-weight: bold;
}

.container-about-me {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  width: 100%;
  padding: 0 var(--space-md);
  text-align: start;
}

.container-about-me img {
  width: 100%;
  max-width: 320px;
}

.container-about-me h3 {
  color: var(--color-text-dim);
  padding: var(--space-md);
  letter-spacing: 0.05em;
  word-spacing: 0.3em;
  text-align: justify;
  font-weight: normal;
}

.container-about-me .download-cv {
  padding: var(--space-xs) var(--space-md);
  background-color: transparent;
  border: 1px solid var(--color-primary-dark);
  font-weight: bold;
  color: var(--color-primary-dark);
  border-radius: var(--radius-sm);
  display: inline-block;
  text-decoration: none;
  transition: var(--transition-base);
}

.container-about-me .download-cv:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (min-width: 1024px) {
  .container-about-me {
    flex-direction: row;
    width: 80%;
    margin: 0 auto;
  }

  .container-about-me img {
    height: 50vh;
    width: auto;
    max-width: none;
  }
}
```

- [ ] **Step 2: Criar `src/styles/contato.css`**

```css
#contato {
  margin: 0 auto;
  padding: var(--space-lg) var(--space-md);
  text-align: center;
  width: 100%;
}

#contato h1 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: var(--color-text);
  font-weight: bold;
  padding: var(--space-sm);
}

#contato h3 {
  font-size: clamp(0.95rem, 2.5vw, 1.2em);
  color: var(--color-text-muted);
  font-weight: bold;
}

form {
  border: 1px solid var(--color-text-dim);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 500px;
  margin: var(--space-md) auto 0;
  padding: var(--space-md);
  color: var(--color-primary);
}

form .form-group {
  width: 100%;
  color: var(--color-primary);
  padding: var(--space-sm) 0;
  text-align: left;
}

form .form-group input,
form .form-group textarea {
  border: 1px solid var(--color-text-dim);
  border-radius: 10px;
  background-color: transparent;
  color: var(--color-text);
  font-size: 1em;
  padding: var(--space-sm);
  width: 100%;
}

form .form-group-send {
  padding-top: var(--space-sm);
}

form .form-group-send input {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-text);
  border-radius: 20px;
  cursor: pointer;
  font-size: 1em;
  padding: var(--space-xs) var(--space-md);
  transition: var(--transition-base);
}

form .form-group-send input:hover {
  color: var(--color-text-muted);
  border-color: var(--color-text-muted);
}

.form-group.error input {
  border-color: #ff3b25;
}

.form-group .error {
  color: #db1600;
  font-size: 0.9em;
  display: block;
}

label {
  padding: 4px 0;
  text-align: start;
  display: block;
}
```

- [ ] **Step 3: Criar `src/styles/back-to-top.css`**

```css
.back-to-top {
  position: fixed;
  z-index: 20;
  right: var(--space-md);
  bottom: var(--space-md);
}

.back-to-top img {
  width: 40px;
}
```

(Nota: `.back-to-top` original usava `left: 90%; top: 85%` — trocado por `right`/`bottom` fixos porque `%` de posição fixa quebra em telas estreitas, empurrando o botão parcialmente pra fora da viewport.)

- [ ] **Step 4: Atualizar `src/main.js`**

```js
import './styles/tokens.css';
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/formacao.css';
import './styles/projetos.css';
import './styles/sobre-mim.css';
import './styles/contato.css';
import './styles/back-to-top.css';
```

- [ ] **Step 5: Remover do `index.html` o link do CSS antigo e o script antigo**

Remover:
```html
<link rel="stylesheet" href="css/style.css" />
```
Remover:
```html
<script src="script/script.js"></script>
```

- [ ] **Step 6: Apagar arquivos antigos**

```bash
rm css/style.css script/script.js
rmdir css script
```

- [ ] **Step 7: Verificar visualmente — página completa, sem CSS/JS antigo**

Run: `npm run dev`.
Expected: página inteira (header, hero, formação, projetos, sobre-mim, contato, back-to-top) estilizada só pelos arquivos novos, sem regressão visual, sem 404 de `css/style.css` ou `script/script.js` no Network tab, sem erro no console.

---

### Task 5: Módulos JS (navigation, formValidator, formController)

**Files:**
- Create: `src/scripts/navigation.js`
- Create: `src/scripts/formValidator.js`
- Create: `src/scripts/formController.js`
- Modify: `src/main.js`

**Interfaces:**
- Produces (`navigation.js`): `initNavigation(): void` — liga o botão `.nav-toggle` (Task 2) ao `<ul>` do header.
- Produces (`formValidator.js`): `validateName(value: string): string | null`, `validateEmail(value: string): string | null`, `validateMessage(value: string): string | null` — cada uma retorna `null` se válido, ou a mensagem de erro.
- Produces (`formController.js`): `initContactForm(): void` — consome as três funções de `formValidator.js` pelo nome exato acima.
- Consumes (`formController.js` de `navigation.js`): nenhuma — módulos independentes.

- [ ] **Step 1: Criar `src/scripts/navigation.js`**

```js
export function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('header nav ul');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
```

- [ ] **Step 2: Criar `src/scripts/formValidator.js`** (funções puras, sem DOM)

```js
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
```

- [ ] **Step 3: Verificar as funções puras no console do navegador**

Run: `npm run dev`, abrir devtools console, colar:
```js
import('/src/scripts/formValidator.js').then((m) => {
  console.log(m.validateName(''));      // "O nome é obrigatório"
  console.log(m.validateName('Al'));    // "O nome deve ter pelo menos 3 caracteres"
  console.log(m.validateName('Ana'));   // null
  console.log(m.validateEmail('x'));    // "Email inválido"
  console.log(m.validateEmail('a@b.com')); // null
  console.log(m.validateMessage('oi')); // "A mensagem deve ter pelo menos 10 caracteres"
});
```
Expected: saídas exatamente como comentado.

- [ ] **Step 4: Criar `src/scripts/formController.js`**

```js
import { validateName, validateEmail, validateMessage } from './formValidator.js';

export function initContactForm() {
  const form = document.getElementById('form');
  if (!form) return;

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
      clearFields(campoNome, campoEmail, campoMensagem);
      form.submit();
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
```

- [ ] **Step 5: Atualizar `src/main.js`**

```js
import './styles/tokens.css';
import './styles/base.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/formacao.css';
import './styles/projetos.css';
import './styles/sobre-mim.css';
import './styles/contato.css';
import './styles/back-to-top.css';

import { initNavigation } from './scripts/navigation.js';
import { initContactForm } from './scripts/formController.js';

initNavigation();
initContactForm();
```

- [ ] **Step 6: Verificar comportamento manualmente**

Run: `npm run dev`.
1. Redimensionar pra <768px, clicar no botão `☰` — menu deve abrir/fechar (`.is-open` alternando na classe do `<ul>` via devtools).
2. Clicar num link do menu mobile aberto — menu deve fechar.
3. Na seção Contato, clicar "Enviar" com campos vazios — deve aparecer mensagem de erro em cada campo, sem enviar.
4. Preencher nome com 2 letras — erro "pelo menos 3 caracteres".
5. **Não preencher com dados reais e clicar enviar com tudo válido** (evita submeter de verdade pro `formsubmit.co`) — validar só até o ponto de "não há mais erros exibidos" checando os campos um a um ou usando um email de teste que você não se importe de enviar.

---

### Task 6: Reorganizar assets do site principal

**Files:**
- Create: `src/assets/images/foto-hero.png` (de `assets/Captura de tela 2024-03-26 104006.png`)
- Create: `src/assets/images/foto-sobre-mim.svg` (de `assets/Foto Gui - 2.svg`)
- Create: `src/assets/images/preview-donuts-store.svg` (de `assets/Captura de tela 2024-03-26 205652 1 (1).svg`)
- Create: `src/assets/images/preview-portfolio-legado.svg` (de `assets/Captura de tela 2024-03-15 104912 1.svg`)
- Create: `src/assets/icons/logo-portfolio.svg` (de `assets/new portfolio-logo.svg`)
- Create: `src/assets/icons/arrow-up.svg` (de `assets/arrow 1 (1).svg`)
- Create: `src/assets/icons/instagram.svg` (de `assets/insta.svg`)
- Create: `src/assets/icons/linkedin.svg` (de `assets/linkedin.svg`)
- Modify: `index.html` (todos os `src=`/`href=` que apontavam pra `assets/...`)
- Delete: `assets/` (arquivos soltos na raiz — a subpasta `assets/folders/` é tratada nas Tasks 7 e 8, não apagar ainda)

**Interfaces:** nenhuma (task de asset/markup, não expõe API).

- [ ] **Step 1: Criar pastas e mover arquivos usados**

```bash
mkdir -p src/assets/images src/assets/icons
cp "assets/Captura de tela 2024-03-26 104006.png" "src/assets/images/foto-hero.png"
cp "assets/Foto Gui - 2.svg" "src/assets/images/foto-sobre-mim.svg"
cp "assets/Captura de tela 2024-03-26 205652 1 (1).svg" "src/assets/images/preview-donuts-store.svg"
cp "assets/Captura de tela 2024-03-15 104912 1.svg" "src/assets/images/preview-portfolio-legado.svg"
cp "assets/new portfolio-logo.svg" "src/assets/icons/logo-portfolio.svg"
cp "assets/arrow 1 (1).svg" "src/assets/icons/arrow-up.svg"
cp "assets/insta.svg" "src/assets/icons/instagram.svg"
cp "assets/linkedin.svg" "src/assets/icons/linkedin.svg"
```

- [ ] **Step 2: Atualizar referências em `index.html`**

| Antigo | Novo |
|---|---|
| `assets/arrow 1 (1).svg` | `src/assets/icons/arrow-up.svg` |
| `assets/insta.svg` | `src/assets/icons/instagram.svg` |
| `assets/linkedin.svg` | `src/assets/icons/linkedin.svg` |
| `assets/Captura de tela 2024-03-26 104006.png` | `src/assets/images/foto-hero.png` |
| `assets/Captura de tela 2024-03-26 205652 1 (1).svg` | `src/assets/images/preview-donuts-store.svg` |
| `assets/Captura de tela 2024-03-15 104912 1.svg` | `src/assets/images/preview-portfolio-legado.svg` |
| `assets/new portfolio-logo.svg` (card "NOVO PORTFOLIO") | `src/assets/icons/logo-portfolio.svg` |
| `assets/Foto Gui - 2.svg` | `src/assets/images/foto-sobre-mim.svg` |
| `assets/Currículo GUILHERME SANTOS.pdf` (2 ocorrências) | `curriculo.pdf` (já em `public/`, Task 1) |

- [ ] **Step 3: Apagar arquivos soltos da raiz de `assets/` (mantendo `assets/folders/`)**

```bash
find assets -maxdepth 1 -type f -delete
```

Isso remove os arquivos já migrados **e** os duplicados/não usados (`arrow 1.svg`, `Captura de tela 2024-03-26 205652 1.svg` sem o `(1)`, `Ellipse 1.svg`, `Foto minha com fundo transparente.png`, `Foto_1_1-removebg-preview 1.svg`, `GUILHERME D. SANTOS 2024.pdf (1).pdf`, `seta-para-cima 1.svg`) — nenhum deles é referenciado em `index.html` (confirmado por leitura do arquivo antes desta task).

- [ ] **Step 4: Verificar**

Run: `npm run dev`, abrir Network tab, recarregar a página.
Expected: nenhuma imagem/ícone/PDF retornando 404; todas as imagens do site principal aparecem; botão de baixar currículo funciona (baixa `curriculo.pdf`).

---

### Task 7: Migrar Donuts Store para `projects/donuts-store/`

**Files:**
- Create: `projects/donuts-store/index.html` (de `assets/folders/DONUTS STORE/index.html`)
- Create: `projects/donuts-store/contact.html` (de `assets/folders/DONUTS STORE/contact.html`)
- Create: `projects/donuts-store/style.css` (de `assets/folders/DONUTS STORE/style.css`, + media queries)
- Create: `projects/donuts-store/contact.css` (de `assets/folders/DONUTS STORE/contact.css`, + media queries)
- Create: `projects/donuts-store/assets/favicon-donuts.png`, `logo-furmans.png`, `hero-banner.svg`, `hero-donuts-illustration.svg`, `donut-morango-1.svg`, `donut-morango-2.svg`, `donut-morango-3.svg`, `favicon-contact.svg`, `icon-instagram.svg`, `icon-whatsapp.svg`
- Modify: `index.html` (link "Visualizar" da Loja de Donuts)

**Interfaces:** nenhuma.

- [ ] **Step 1: Criar pasta e copiar/renomear assets usados**

```bash
mkdir -p "projects/donuts-store/assets"
cd "assets/folders/DONUTS STORE"
cp "assets/image_13-removebg-preview.png" "../../../projects/donuts-store/assets/favicon-donuts.png"
cp "assets/image_13__1_-removebg-preview.png" "../../../projects/donuts-store/assets/logo-furmans.png"
cp "assets/image 13 (1).svg" "../../../projects/donuts-store/assets/hero-banner.svg"
cp "assets/7a8909101054535 1 (1).svg" "../../../projects/donuts-store/assets/hero-donuts-illustration.svg"
cp "assets/image 8.svg" "../../../projects/donuts-store/assets/donut-morango-1.svg"
cp "assets/image 9.svg" "../../../projects/donuts-store/assets/donut-morango-2.svg"
cp "assets/image 10.svg" "../../../projects/donuts-store/assets/donut-morango-3.svg"
cp "assets/donut with pink icing.svg" "../../../projects/donuts-store/assets/favicon-contact.svg"
cp "assets/insagram-icon 1.svg" "../../../projects/donuts-store/assets/icon-instagram.svg"
cp "assets/1384023 1.svg" "../../../projects/donuts-store/assets/icon-whatsapp.svg"
cd ../../..
```

(Arquivos não copiados — não referenciados em nenhum HTML deste projeto: `1384023.png`, três PDFs soltos, `back-bottom.svg`, `image 12.svg`, `image 13.svg`, `image 6.svg`, `image 7 (1).svg`, `image 7 (2).svg`, `insagram-icon.png`, `R 1.svg`, `R.png`.)

- [ ] **Step 2: Criar `projects/donuts-store/index.html`** (conteúdo original, paths atualizados)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="assets/favicon-donuts.png" type="image/png">
    <title>Furman's Donuts Store</title>
</head>

<header>
    <nav>
        <ul>
            <li><a href="#"> <img src="assets/logo-furmans.png" class="logo-furmans" alt="Logo Furman's" > </a></li>
            <li><a href="#donuts">DONUTS</a></li>
            <li><a href="#especial">ESPECIAIS</a></li>
            <li><a href="#local">LOCALIZAÇÃO</a></li>
            <li><a href="contact.html" target="_blank">CONTATO</a></li>
        </ul>
    </nav>
</header>

<body>
    <main>
        <section>
            <img src="assets/hero-banner.svg" alt="Furman's">
            <br>
            <img src="assets/hero-donuts-illustration.svg" alt="Donuts de ilustração">
            <p>Para realizar seu pedido, basta clicar em contatos e será encaminhado <br> para uma página de contatos 💖 </p>
        </section>

        <section id="donuts">
            <ul>
                <li>
                    <img src="assets/donut-morango-1.svg" alt="Donuts de morango">
                    <h3>Donuts de morango</h3>
                    <h2>R$1,50</h2>
                </li>
                <li>
                    <img src="assets/donut-morango-2.svg" alt="Donuts de morango">
                    <h3>Donuts de morango</h3>
                    <h2>R$1,50</h2>
                </li>
                <li>
                    <img src="assets/donut-morango-3.svg" alt="Donuts de morango">
                    <h3>Donuts de morango</h3>
                    <h2>R$1,50</h2>
                </li>
            </ul>
        </section>

        <section>
            <h1 id="especial">ESPECIAIS</h1>
            <ul>
                <li>
                    <img src="assets/donut-morango-1.svg" alt="Donuts de morango">
                    <h3>Donuts de morango</h3>
                    <h2>R$1,50</h2>
                </li>
                <li>
                    <img src="assets/donut-morango-2.svg" alt="Donuts de morango">
                    <h3>Donuts de morango</h3>
                    <h2>R$1,50</h2>
                </li>
                <li>
                    <img src="assets/donut-morango-3.svg" alt="Donuts de morango">
                    <h3>Donuts de morango</h3>
                    <h2>R$1,50</h2>
                </li>
            </ul>
        </section>

        <section id="local">
            <h1>ONDE ESTAMOS</h1>
            <h3>Estamos localizado na <br> <strong>R. Margarida Ribas de Melo, 494 - Cidade Industrial de Curitiba </strong></h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.874459031052!2d-49.34258072475321!3d-25.5425583774903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dcfd0de2148991%3A0xf0f2e2564b079cbd!2sR.%20Margarida%20Ribas%20de%20Melo%2C%20494%20-%20Cidade%20Industrial%20de%20Curitiba%2C%20Curitiba%20-%20PR%2C%2082560-415!5e0!3m2!1spt-BR!2sbr!4v1710964861049!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </section>

        <footer>
            Donuts Shop &copy; 2030 | &reg; Todos os direitos reservados
        </footer>
    </main>
</body>
</html>
```

- [ ] **Step 3: Criar `projects/donuts-store/contact.html`** (conteúdo original, paths atualizados)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="contact.css">
    <link rel="icon" href="assets/favicon-contact.svg" type="image/svg+xml">
    <title>Furman's Donuts Store</title>
</head>

<header>
    <nav>
        <ul>
            <li><a href="index.html" target="_self">MENU</a></li>
        </ul>
    </nav>
</header>

<body>
    <main>
        <section>
            <h1>OPÇÕES DE <br> CONTATO</h1>
        </section>

        <section id="donuts">
            <ul>
                <li>
                    <img src="assets/icon-instagram.svg" alt="Instagram da loja">
                    <h3>furmans_ckdn</h3>
                    <a href="https://www.instagram.com/furmans_ckdn/" class="contact-link" target="_blank">Visualizar</a>
                </li>
                <li>
                    <img src="assets/icon-whatsapp.svg" alt="Whatsapp da loja">
                    <h3>Whatsapp</h3>
                    <a href="https://api.whatsapp.com/send/?phone=554188082866&text&type=phone_number&app_absent=0" class="contact-link" target="_blank">Visualizar</a>
                </li>
            </ul>
        </section>

        <footer>
            Donuts Shop &copy; 2030 | &reg; Todos os direitos reservados
        </footer>
    </main>
</body>
</html>
```

- [ ] **Step 4: Criar `projects/donuts-store/style.css`** (original + `box-sizing` + media queries de responsividade)

```css
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=Kufam:ital,wght@0,400..900;1,400..900&family=Madimi+One&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Kufam", sans-serif;
    font-optical-sizing: auto;
    font-weight: bold;
    font-style: normal;
}

html {
    scroll-behavior: smooth;
}

body {
    background-color: #0CC0DF;
    overflow-x: hidden;
}

img {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
    padding: 20px;
}

.logo-furmans {
    max-width: 60px;
    margin: 0;
    padding: 0;
}

::-webkit-scrollbar{
    color: #0CC0DF ;
    background-color: #0CC0DF;
}

header {
    background-color: white;
    color: #0CC0DF;
    height: fit-content;
    opacity: 0.9;
    position: sticky;
    top: 0;
    z-index: 1;
    border-radius: 0px 0px 30px 30px;
}

header nav ul {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 15px;
    background-color: white;
    font-size: 1.1em;
    list-style: none;
}

a {
    text-decoration: none;
    color: #0CC0DF;
    transition: all 0.25s ease-in-out;
}

a:hover {
    color: #f8bf04;
    text-decoration: underline;
}

main section {
    color: #ffc813;
    background-color: #0CC0DF;
    text-align: center;
    padding: 0 15px;
}

main section p {
    color: #0c6777;
    margin: 10px;
    font-size: 1.1em;
}

main section h1 {
    font-size: clamp(2.5rem, 10vw, 9em);
    margin-top: 40px;
    margin-bottom: 20px;
    padding: 12px;
    overflow: hidden;
}

#especial {
    text-align: center;
    font-size: clamp(2.5rem, 10vw, 9em);
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 12px;
    overflow: hidden;
}

section ul {
    background-color: rgb(255, 254, 169);
    display: flex;
    flex-wrap: wrap;
    gap: 5%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    width: 98%;
    border-radius: 2px;
    padding: 10px 0;
}

section ul li {
    background-color: #f3b2d2;
    border-radius: 40px;
    margin: 20px 0;
    list-style: none;
    min-width: 140px;
    max-width: 220px;
}

section ul li h3 {
    color: #41a0b1;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 1.3em;
    width: 100%;
    padding: 0 10px;
}

section ul li h2 {
    color: #41a0b1;
    margin: 20px;
    padding: 20px;
    font-size: 1.5em;
}

section iframe {
    display: block;
    width: 100%;
    max-width: 600px;
    height: auto;
    aspect-ratio: 4 / 3;
    margin: auto;
    padding: 20px;
}

strong {
    color: rgb(100, 100, 100);
}

footer {
    text-align: center;
    padding: 40px 15px;
    background-color: #11a3bd;
    color: #065968;
}

@media (min-width: 768px) {
    header nav ul {
        gap: 3rem;
        font-size: 1.5em;
    }

    main section h1,
    #especial {
        font-size: 9em;
    }

    section ul li h3 {
        width: 300px;
    }
}
```

- [ ] **Step 5: Criar `projects/donuts-store/contact.css`** (mesmo tratamento)

```css
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=Kufam:ital,wght@0,400..900;1,400..900&family=Madimi+One&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Kufam", sans-serif;
    font-optical-sizing: auto;
    font-weight: bold;
    font-style: normal;
}

html {
    scroll-behavior: smooth;
}

body {
    background-color: #0CC0DF;
    overflow-x: hidden;
}

::-webkit-scrollbar{
    color: #FF7074 ;
    background-color: #FED8DF;
}

header {
    background-color: white;
    color: #FF7074;
    height: fit-content;
    opacity: 0.9;
    position: sticky;
    top: 0;
    z-index: 1;
    border-radius: 0px 0px 30px 30px;
}

header nav ul {
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 15px;
    background-color: white;
    font-size: 1.1em;
    list-style: none;
}

a {
    text-decoration: none;
    color: #0CC0DF;
    transition: all 0.25s ease-in-out;
    font-size: 1.2em;
}

section .contact-link {
    background-color: white;
    border: 1px solid black;
    padding: 10px;
    border-radius: 15px;
    text-transform: uppercase;
    display: inline-block;
}

a:hover {
    color: #f8bf04;
    text-decoration: underline;
}

main section {
    color: #f8bf04;
    background-color: #0CC0DF;
    text-align: center;
    padding: 0 15px;
}

main section h1 {
    font-size: clamp(1.75rem, 8vw, 4em);
    margin-top: 60px;
    margin-bottom: 60px;
    padding: 12px;
    overflow: hidden;
}

section ul {
    background-color: rgb(255, 254, 169);
    display: flex;
    flex-wrap: wrap;
    gap: 5%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    width: 98%;
    border-radius: 2px;
    padding: 10px 0;
}

section ul li {
    background-color: #f1f0f0e8;
    border-radius: 40px;
    margin: 20px 0;
    list-style: none;
    min-width: 140px;
    max-width: 220px;
}

section ul li h3 {
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 1.3em;
    width: 100%;
    padding: 0 10px;
}

section ul li h2 {
    margin: 20px;
    padding: 20px;
    font-size: 1.5em;
}

strong {
    color: rgb(100, 100, 100);
}

footer {
    text-align: center;
    padding: 40px 15px;
    background-color: #0CC0DF;
    color: #065968;
}

@media (min-width: 768px) {
    header nav ul {
        gap: 3rem;
        font-size: 1.5em;
    }

    section ul li h3 {
        width: 300px;
    }
}
```

- [ ] **Step 6: Atualizar link no `index.html` do site principal**

De:
```html
<a href="assets/folders/DONUTS STORE/index.html" target="_blank">Visualizar</a>
```
Para:
```html
<a href="projects/donuts-store/index.html" target="_blank">Visualizar</a>
```

- [ ] **Step 7: Verificar**

Run: `npm run dev`, clicar em "Visualizar" no card da loja de donuts.
Expected: abre `projects/donuts-store/index.html` sem 404 de imagem; testar em 375px e 1440px — sem overflow horizontal, iframe do mapa redimensiona; link "CONTATO" abre `contact.html`, "MENU" volta pro index.

---

### Task 8: Migrar Portfolio legado para `projects/portfolio-legado/`

**Files:**
- Create: `projects/portfolio-legado/index.html` (de `assets/folders/Portfolio project/index.html`)
- Create: `projects/portfolio-legado/style.css` (de `assets/folders/Portfolio project/style.css`, + media queries)
- Create: `projects/portfolio-legado/assets/logo-gui.png`, `foto-perfil.png`, `social-icons.png`
- Modify: `index.html` (link "Visualizar" do card "PRIMEIRO PORTFOLIO")

**Interfaces:** nenhuma.

- [ ] **Step 1: Criar pasta e copiar/renomear assets usados**

```bash
mkdir -p "projects/portfolio-legado/assets"
cp "assets/folders/Portfolio project/sources/logo_gui.png" "projects/portfolio-legado/assets/logo-gui.png"
cp "assets/folders/Portfolio project/sources/foto perfil v2.png" "projects/portfolio-legado/assets/foto-perfil.png"
cp "assets/folders/Portfolio project/sources/social-icons3.png" "projects/portfolio-legado/assets/social-icons.png"
```

(Não copiados — não referenciados no `index.html` deste projeto: `foto de perfil 2.png`, `foto de perfil.png`, `Foto minha com fundo transparente.png`, `icons-social.png`, `social-icons2.png`.)

- [ ] **Step 2: Criar `projects/portfolio-legado/index.html`** (conteúdo original, paths atualizados)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="assets/logo-gui.png" type="image/png">
    <title>Portfolio legado - Guilherme Santos</title>
</head>

<body>

    <nav>
        <ul>
            <li><a href="#quem-sou-eu">QUEM SOU EU</a></li>
            <li><a href="#projetos">PROJETOS</a></li>
            <li><a href="#contato">CONTATO</a></li>
        </ul>
    </nav>

    <div class="foto">
        <img src="assets/foto-perfil.png" alt="Foto do Guilherme">
    </div>

    <div class="intro">
        <h1 class="name">
            Guilherme Santos!
        </h1>

        <h3 class="courses">
            Análise e Desenvolvimento de Sistemas <br>
            Desenvolvimento Web
        </h3>
    </div>

    <h1 id="quem-sou-eu">QUEM SOU EU</h1>

    <p class="container-text"> Meu nome é <strong>Guilherme dos Santos</strong>, estou iniciando no mercado de desenvolvimento web agora mas
    assim como esse portfolio lhe mostra
    tenho grande capacidade em me desafiar à fazer sites tal como este. Portanto, ja tive experiência com programação tanto para sites quanto para outros
    tipos de sistemas. <strong>Garanto</strong> que seu site ficará o mais <strong>usual e agradável</strong> possível!</p>

    <h1 id="projetos">PROJETOS</h1>

    <div class="container-logo">
        <img src="assets/logo-gui.png" alt="Logo Gui">
        <h3 class="logo-description">portfolio</h3>

        <div class="view-class">
            <a href="index.html" class="view" target="_blank">Visualizar </a>
        </div>
    </div>

    <h1 id="contato">contato</h1>

    <img src="assets/social-icons.png" alt="Formas de contato">

    <a href="https://www.instagram.com/guieme_santz/" class="instagram" target="_blank"> guieme_santz </a>
    <a href="https://api.whatsapp.com/send/?phone=411997239849&text&type=phone_number&app_absent=0" class="whatsapp" target="_blank"> whatsapp </a>

    <div>
        <a href="#" class="end"> Voltar ao topo 👆 </a>
    </div>
</body>

</html>
```

- [ ] **Step 3: Criar `projects/portfolio-legado/style.css`** (original + `box-sizing` já presente + media queries)

```css
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=Madimi+One&display=swap');

* {
    font-family: "Madimi One", sans-serif;
    font-style: normal;
    margin: 0;
    padding: 0;
    background-color: #26281D;
    overflow-x: hidden;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #171810;
    padding: 20px;
    text-align: center;
    width: 100%;
    opacity: 0.9;
    position: sticky;
    top: 0;
}

nav ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    list-style: none;
}

nav ul li a {
    text-decoration: none;
    color: #03FA6E;
    font-size: 1.2em;
    background-color: #171810;
    text-align: center;
    transition: all 0.25s ease-in-out;
    opacity: 0.9;
}

.foto {
    display: flex;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.foto img {
    max-width: 100%;
    width: 220px;
    height: auto;
}

.intro {
    margin: 20px;
    padding: 10px;
    text-align: center;
}

.name {
    margin-bottom: 20px;
    font-size: clamp(1.75rem, 8vw, 60px);
    color: #03FA6E;
    display: flex;
    justify-content: center;
}

.courses {
    margin-top: 30px;
    font-size: clamp(1.1rem, 4vw, 2em);
    color: #00E162;
    text-align: center;
}

#quem-sou-eu {
    font-size: clamp(1.5rem, 6vw, 40px);
    display: block;
    color: #00E162;
    text-align: center;
    width: 100%;
    background-color: #171810;
    padding: 30px 15px;
}

.container-text {
    color: rgb(179, 179, 179);
    margin: 10px;
    padding: 20px;
    font-size: clamp(1rem, 3vw, 1.5em);
    text-align: center;
}

strong {
    color: #00E162;
}

#projetos {
    font-size: clamp(1.5rem, 6vw, 40px);
    color: #00E162;
    text-align: center;
    width: 100%;
    background-color: #171810;
    padding: 30px 15px;
    display: block;
}

img {
    max-width: 100%;
    height: auto;
    margin: auto;
    display: block;
    background-color: #171810;
}

.container-logo {
    background-color: #171810;
    margin: 15px auto;
    max-width: 320px;
    border: 10px solid #00E162;
}

.logo-description {
    margin: 5px;
    background-color: #171810;
    text-align: center;
    font-size: 25px;
    text-transform: uppercase;
    color: aliceblue;
}

.view {
    margin: auto;
    padding: 10px;
    width: fit-content;
    display: block;
    text-decoration: none;
    color: #00E162;
    text-align: center;
    font-size: 1.3em;
    border: 2px solid #17181080;
    background-color: #80808080;
    border-radius: 40px;
    transition: all 0.5s ease;
}

.view-class {
    margin: 15px;
    padding: 20px;
    text-align: center;
    background-color: #171810;
}

.view:hover {
    color: #ffffff;
    background: #03FA6E;
    border: 1px solid #171810;
}

#contato {
    margin-top: 20px;
    font-size: clamp(1.5rem, 6vw, 40px);
    color: #00E162;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    background-color: #171810;
    padding: 30px 15px;
    display: block;
}

.instagram,
.whatsapp {
    display: block;
    margin: auto;
    padding: 15px;
    text-align: center;
    text-decoration: none;
    font-size: clamp(1rem, 3vw, 25px);
    text-transform: uppercase;
    color: aliceblue;
    transition: all 0.5s ease-in-out;
}

.instagram:hover,
.whatsapp:hover {
    color: #00E162;
}

.end {
    text-decoration: none;
    margin-top: 20px;
    font-size: clamp(1.25rem, 5vw, 40px);
    color: #00E162;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    background-color: #171810;
    padding: 30px 15px;
    display: block;
    transition: all 0.5s ease;
}

.end:hover {
    color: aliceblue;
}

@media (min-width: 768px) {
    nav {
        padding: 35px;
    }

    nav ul li a {
        font-size: 2em;
    }

    .foto img {
        width: 320px;
    }

    .container-logo {
        max-width: 400px;
    }

    .view-class {
        padding: 60px 120px;
    }
}
```

- [ ] **Step 4: Atualizar link no `index.html` do site principal**

De:
```html
<a href="assets/folders/Portfolio project/index.html" target="_blank">Visualizar</a>
```
Para:
```html
<a href="projects/portfolio-legado/index.html" target="_blank">Visualizar</a>
```

- [ ] **Step 5: Verificar**

Run: `npm run dev`, clicar em "Visualizar" no card "PRIMEIRO PORTFOLIO".
Expected: página abre sem 404 de imagem; testar 375px/768px/1440px — nav quebra linha sem overflow, `.container-logo` não estoura a largura da tela.

---

### Task 9: Build multi-page + limpeza final de `assets/folders`

**Files:**
- Modify: `vite.config.js`
- Delete: `assets/` (pasta inteira, já vazia de arquivos soltos desde Task 6; `folders/` migrado nas Tasks 7-8)

**Interfaces:**
- Produces: `dist/` com `index.html`, `projects/donuts-store/index.html`, `projects/donuts-store/contact.html`, `projects/portfolio-legado/index.html`, cada um com CSS/JS/assets próprios com hash.

- [ ] **Step 1: Atualizar `vite.config.js` pra multi-page build**

```js
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/New-Portfolio/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        donutsStoreIndex: resolve(__dirname, 'projects/donuts-store/index.html'),
        donutsStoreContact: resolve(__dirname, 'projects/donuts-store/contact.html'),
        portfolioLegado: resolve(__dirname, 'projects/portfolio-legado/index.html'),
      },
    },
  },
});
```

- [ ] **Step 2: Confirmar que `assets/` não tem mais nada pendente e apagar**

```bash
find assets -type f
```
Expected: nenhuma saída (pasta vazia, exceto diretórios).

```bash
rm -rf assets
```

- [ ] **Step 3: Rodar build e preview**

Run: `npm run build`
Expected: build termina sem erro, gera `dist/index.html`, `dist/projects/donuts-store/index.html`, `dist/projects/donuts-store/contact.html`, `dist/projects/portfolio-legado/index.html`.

Run: `npm run preview`
Expected: terminal mostra URL local (ex: `http://localhost:4173/New-Portfolio/`). Abrir, navegar pelo site principal, clicar nos dois links "Visualizar", confirmar que cada projeto abre e todas as imagens carregam (sem 404) mesmo sob o `base` path.

---

### Task 10: Criar `CLAUDE.md`

**Files:**
- Create: `CLAUDE.md`

**Interfaces:** nenhuma (documentação).

- [ ] **Step 1: Criar `CLAUDE.md`**

```markdown
# CLAUDE.md

Guia para trabalhar neste repositório.

## Stack

- HTML/CSS/JS puro — sem framework JS (React, Vue, etc).
- Build tool: Vite (^5). Node >= 18 obrigatório.
- Sem framework de testes automatizados — validação é manual via `npm run dev` / `npm run build` / `npm run preview`, conferindo breakpoints 375px, 768px, 1024px, 1440px.

## Comandos

- `npm run dev` — servidor de desenvolvimento com hot reload.
- `npm run build` — gera `dist/` (multi-page: site principal + `projects/donuts-store/*` + `projects/portfolio-legado/*`).
- `npm run preview` — serve o conteúdo de `dist/` localmente, igual à produção.

## Estrutura de pastas

- `index.html` — entrada do site principal.
- `src/main.js` — importa todo CSS e inicializa os módulos JS. Ponto único de wiring.
- `src/styles/` — um arquivo CSS por seção (`header.css`, `hero.css`, `contato.css` etc). `tokens.css` tem as variáveis (cores, espaçamento, tipografia) — **nunca** usar hex/px direto num arquivo de seção, sempre a variável.
- `src/scripts/` — módulos JS por responsabilidade única (`formValidator.js` = regras puras de validação sem DOM; `formController.js` = liga validação ao form; `navigation.js` = menu mobile).
- `src/assets/{images,icons,docs}` — mídia do site principal.
- `public/` — arquivos servidos como estão, sem processamento Vite (favicon, currículo em PDF).
- `projects/donuts-store/` e `projects/portfolio-legado/` — projetos antigos, linkados a partir do site principal como demonstração de evolução. **Não modernizar lógica/estrutura deles** — só corrigir responsividade quando pedido. Cada um é uma entrada própria no build multi-page (ver `vite.config.js`).

## Convenções

- **Mobile-first**: toda regra CSS nova escreve o caso mobile primeiro (sem media query); breakpoints via `@media (min-width: ...)`, nunca `max-width` decrescente. Breakpoints padrão: `768px` (tablet), `1024px` (desktop), `1440px` (wide).
- **Nomenclatura de arquivo**: kebab-case, sem espaço/acento/parênteses — motivo: nomes com espaço já causaram path quebrado nos projetos antigos.
- **JS**: módulos ES por responsabilidade única. Sem lib externa de validação de formulário.
- **CSS**: um arquivo por seção. Design tokens centralizados em `tokens.css`.

## Deploy

GitHub Pages. `base: '/New-Portfolio/'` já configurado em `vite.config.js`. `npm run build` gera `dist/` pronto pra publicar.
```

- [ ] **Step 2: Verificar**

Ler o arquivo gerado e confirmar que reflete a estrutura real do repositório após as Tasks 1-9 (nomes de pasta/arquivo batem).

---

### Task 11: Verificação manual final

**Files:** nenhum (task de verificação, sem criar/modificar arquivo).

**Interfaces:** nenhuma.

- [ ] **Step 1: Build limpo**

```bash
rm -rf dist
npm run build
```
Expected: sem erros, sem warnings de asset não encontrado.

- [ ] **Step 2: Preview e checklist visual**

Run: `npm run preview`. Pra cada largura (375px, 768px, 1024px, 1440px) via devtools, em cada página (`/`, `/projects/donuts-store/index.html`, `/projects/donuts-store/contact.html`, `/projects/portfolio-legado/index.html`):

- [ ] Sem scroll horizontal.
- [ ] Nenhuma imagem estourando o container (`max-width: 100%` respeitado).
- [ ] Texto legível (sem fonte gigante estourando a tela em mobile, nem minúscula em desktop).
- [ ] Header: menu hambúrguer funcional em <768px; menu horizontal completo em >=768px.

- [ ] **Step 3: Checklist funcional**

- [ ] Link "Me contrate" abre LinkedIn em nova aba.
- [ ] Botões Instagram/LinkedIn do hero abrem os perfis corretos.
- [ ] Botão "Baixar currículo" (2 ocorrências) baixa `curriculo.pdf`.
- [ ] Cards de projeto: os 3 links "Visualizar" abrem as páginas corretas (Donuts Store, Portfolio legado, e o card "NOVO PORTFOLIO" que aponta pra `#`).
- [ ] Botão back-to-top visível e leva ao topo.
- [ ] Formulário: erro aparece pra campos inválidos; nenhum erro aparece quando os 3 campos são preenchidos corretamente (não é necessário submeter de fato).

- [ ] **Step 4: Console limpo**

Em cada página, abrir devtools console.
Expected: nenhum erro (404 de asset, erro de JS, warning do Vite).

Nenhum step deste plano commita nada — ao final, revisar `git status`/`git diff` e decidir o que commitar manualmente.
