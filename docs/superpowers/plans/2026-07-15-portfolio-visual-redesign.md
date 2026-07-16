# Redesign Visual do Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar a linguagem visual e o copy do portfolio (index.html) para o layout bento verde/branco (Manrope + Sora) do mockup, mantendo intacta a arquitetura já existente (Vite, CSS modular por seção, tokens centralizados, JS de navegação/formulário).

**Architecture:** Site estático servido pelo Vite. Um arquivo CSS por seção (`src/styles/*.css`), importados via `src/main.js`, com tokens de design em `src/styles/tokens.css`. Cada seção do `index.html` recebe novo markup mínimo (classes novas para os blocos "bento"), sem tocar nos módulos JS (`navigation.js`, `formValidator.js`, `formController.js`) nem nas pastas `projects/**`.

**Tech Stack:** HTML/CSS/JS puro, Vite ^5, Google Fonts (Manrope, Sora). Sem framework de teste automatizado — verificação manual via `npm run dev`.

## Global Constraints

- **NUNCA rode `git add` ou `git commit` durante a execução deste plano.** O usuário faz commits manualmente. Nenhum step deste plano commita — se um step parecer exigir, pule-o.
- Mobile-first: toda regra CSS nova escreve o caso mobile primeiro (sem media query); breakpoints via `@media (min-width: ...)`, nunca `max-width` decrescente.
- Breakpoints usados neste plano: `768px` (nav desktop), `1024px` (grids/bento desktop).
- Nunca hex/px "mágico" novo direto em arquivo de seção — sempre `var(--...)` de `src/styles/tokens.css`.
- **Não modificar**: `src/main.js`, `src/scripts/navigation.js`, `src/scripts/formValidator.js`, `src/scripts/formController.js`, `vite.config.js`, `package.json`, nada dentro de `projects/`.
- O formulário de contato preserva exatamente: `id="form"`, `action="https://formsubmit.co/guilherme.santos.uninter@gmail.com"`, `method="POST"`, `id="campo_nome"` (`name="name"`), `id="campo_email"` (`name="email"`), `id="campo_mensagem"` (`name="message"`), classe `.form-group`, `<a class="error">` dentro de cada `.form-group`, `input[type=hidden][name=_captcha]`. Esses seletores são consumidos por `formController.js` — qualquer renomeação quebra a validação.
- `.nav-toggle` e `header nav ul` continuam sendo os seletores usados por `navigation.js` — não renomear.

---

### Task 1: Tokens, fontes e container bento

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/base.css`
- Modify: `index.html:1-17` (head: link de fontes) e `index.html:18-21` / final do `<body>` (wrapper `.page`)

**Interfaces:**
- Produces: variáveis CSS novas em `tokens.css` — `--color-bg`, `--color-bg-card`, `--color-border`, `--color-dark`, `--color-dark-alt`, `--color-dark-border`, `--color-primary`, `--color-primary-dark`, `--color-text`, `--color-text-muted`, `--color-text-on-dark`, `--color-text-on-dark-muted`, `--font-family-base`, `--font-family-heading`, `--space-xs|sm|md|lg|xl`, `--radius-sm|lg|xl|pill`, `--transition-base`, `--container-max`. Consumidas por todas as tasks seguintes.
- Produces: classe `.page` em `base.css` (container branco `max-width: var(--container-max)` centralizado) — todas as seções do `index.html` passam a viver dentro dela.

- [ ] **Step 1: Substituir todo o conteúdo de `src/styles/tokens.css`**

```css
:root {
  --color-bg: oklch(96% 0.01 145);
  --color-bg-card: oklch(97% 0.015 145);
  --color-border: oklch(92% 0.01 145);
  --color-dark: oklch(20% 0.02 150);
  --color-dark-alt: oklch(28% 0.02 150);
  --color-dark-border: oklch(38% 0.02 150);
  --color-primary: oklch(45% 0.13 150);
  --color-primary-dark: oklch(38% 0.15 150);
  --color-text: oklch(20% 0.02 150);
  --color-text-muted: oklch(45% 0.01 150);
  --color-text-on-dark: oklch(75% 0.01 150);
  --color-text-on-dark-muted: oklch(70% 0.11 150);

  --font-family-base: 'Manrope', sans-serif;
  --font-family-heading: 'Sora', sans-serif;

  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;

  --radius-sm: 10px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 999px;

  --transition-base: all 0.3s ease-in-out;

  --container-max: 1440px;
}
```

- [ ] **Step 2: Substituir todo o conteúdo de `src/styles/base.css`**

```css
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

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.page {
  max-width: var(--container-max);
  margin: 0 auto;
  background-color: #ffffff;
  overflow: hidden;
}
```

- [ ] **Step 3: Trocar o link de fontes no `<head>` de `index.html`**

De:
```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&family=Kufam:ital,wght@0,400..900;1,400..900&family=Madimi+One&family=Quicksand:wght@300..700&display=swap"
      rel="stylesheet"
    />
```

Para:
```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap"
      rel="stylesheet"
    />
```

- [ ] **Step 4: Envolver todo o conteúdo do `<body>` numa `<div class="page">`**

Logo depois de `<body>`, adicionar a abertura da div (antes do `<div class="back-to-top">` **não** entra — ele fica fora, fixo na viewport):

De:
```html
  <body>
    <div class="back-to-top">
      <a href="#"><img src="src/assets/icons/arrow-up.svg" alt="" /></a>
    </div>

    <header>
```

Para:
```html
  <body>
    <div class="back-to-top">
      <a href="#"><img src="src/assets/icons/arrow-up.svg" alt="" /></a>
    </div>

    <div class="page">
    <header>
```

E logo antes do `</body>` final:

De:
```html
      </form>
    </section>
  </body>
</html>
```

Para:
```html
      </form>
    </section>
    </div>
  </body>
</html>
```

(A indentação interna das seções não muda nesta task — só a abertura/fechamento da `.page`. As tasks seguintes reescrevem o conteúdo de cada seção.)

- [ ] **Step 5: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:5173/`.
Expected: fundo da página passa a ser off-white esverdeado, o conteúdo (ainda com o markup/estilo antigo de cada seção, que será trocado nas próximas tasks) fica centralizado num bloco branco de até 1440px, sem erro no console, sem 404 na fonte.

---

### Task 2: Header / nav

**Files:**
- Modify: `src/styles/header.css`
- Modify: `index.html` (bloco `<header>`)

**Interfaces:**
- Consumes: tokens da Task 1.
- Consumes: `.nav-toggle` e `header nav ul` (seletores usados por `src/scripts/navigation.js`) — mantidos.

- [ ] **Step 1: Substituir todo o conteúdo de `src/styles/header.css`**

```css
header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}

header nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
}

.logo {
  font-family: var(--font-family-heading);
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--color-text);
}

.logo span {
  color: var(--color-primary);
}

.nav-toggle {
  display: block;
  background: transparent;
  border: 1px solid var(--color-border);
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
  background-color: #ffffff;
  list-style: none;
  padding: var(--space-md) 0 0;
}

header nav ul.is-open {
  display: flex;
}

header nav ul li a {
  font-weight: 600;
  color: var(--color-text-muted);
  transition: var(--transition-base);
  padding: 4px;
  border-radius: var(--radius-sm);
}

header nav ul li a:hover {
  color: var(--color-primary);
}

.hire-button {
  display: inline-block;
  padding: 11px 22px;
  background-color: var(--color-primary);
  font-weight: 700;
  color: #ffffff;
  border-radius: var(--radius-sm);
}

.hire-button:hover {
  background-color: var(--color-primary-dark);
}

@media (min-width: 768px) {
  header nav {
    padding: var(--space-sm) var(--space-lg);
  }

  .nav-toggle {
    display: none;
  }

  header nav ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    gap: var(--space-lg);
    background: transparent;
    padding: 0;
  }

  header nav ul li a {
    font-size: 0.95rem;
  }
}
```

- [ ] **Step 2: Reescrever o bloco `<header>` em `index.html`**

De:
```html
    <header>
      <nav>
        <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">☰</button>
        <ul>
          <li>&lt; Guilherme &gt;</li>
          <li><a href="#">Início</a></li>
          <li><a href="#formacao">Formação</a></li>
          <li><a href="#projetos">Portfolio</a></li>
          <li><a href="#sobre-mim">Sobre mim</a></li>
          <li><a href="#contato">Contato</a></li>
          <li>
            <a
              href="https://www.linkedin.com/in/guilherme-santos-232b59263/"
              class="hire-button"
              target="_blank"
              >Me contrate</a
            >
          </li>
        </ul>
      </nav>
    </header>
```

Para:
```html
    <header>
      <nav>
        <div class="logo">Guilherme<span>.dev</span></div>
        <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">☰</button>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#formacao">Formação</a></li>
          <li><a href="#projetos">Projetos</a></li>
          <li><a href="#sobre-mim">Sobre</a></li>
          <li><a href="#contato">Contato</a></li>
          <li>
            <a
              href="https://www.linkedin.com/in/guilherme-santos-232b59263/"
              class="hire-button"
              target="_blank"
              >Me contrate</a
            >
          </li>
        </ul>
      </nav>
    </header>
```

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`.
Expected: header com fundo branco translúcido, logo "Guilherme**.dev**" (`.dev` em verde) sempre visível. Abaixo de 768px: botão `☰` aparece, clicar abre/fecha a lista (comportamento herdado de `navigation.js`, não deve regredir). Acima de 768px: menu em linha, sem `☰`. "Me contrate" como pill verde.

---

### Task 3: Hero

**Files:**
- Modify: `src/styles/hero.css`
- Modify: `index.html` (bloco `<main>`)

**Interfaces:**
- Consumes: tokens da Task 1.

- [ ] **Step 1: Substituir todo o conteúdo de `src/styles/hero.css`**

```css
main {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-md);
}

.hero-intro {
  background-color: var(--color-dark);
  border-radius: var(--radius-xl);
  padding: var(--space-lg) var(--space-md);
  color: #ffffff;
}

.hero-intro .eyebrow {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--color-text-on-dark-muted);
  margin-bottom: var(--space-xs);
}

.hero-intro h1 {
  font-family: var(--font-family-heading);
  font-weight: 800;
  font-size: clamp(2rem, 8vw, 3.25rem);
  line-height: 1.05;
  margin-bottom: var(--space-sm);
}

.hero-intro .hero-desc {
  color: var(--color-text-on-dark);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 440px;
  margin-bottom: var(--space-md);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
}

.hero-intro .download-cv {
  background-color: var(--color-primary);
  color: #ffffff;
  font-weight: 700;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
}

.hero-intro .download-cv:hover {
  background-color: var(--color-primary-dark);
}

.social-links {
  display: flex;
  gap: var(--space-xs);
}

.social-links a {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: var(--color-dark-alt);
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-links img {
  width: 20px;
  filter: invert(1);
}

.foto-gui {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  padding-top: var(--space-md);
}

.foto-gui img {
  width: 80%;
  max-width: 320px;
}

@media (min-width: 1024px) {
  main {
    flex-direction: row;
    align-items: stretch;
    padding: var(--space-xl);
  }

  .hero-intro {
    flex: 1.3;
    padding: var(--space-xl);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .foto-gui {
    flex: 1;
  }

  .foto-gui img {
    width: 88%;
    max-width: 380px;
  }
}
```

- [ ] **Step 2: Reescrever o bloco `<main>` em `index.html`**

De:
```html
    <main>
      <section>
        <h3>Olá, eu sou</h3>
        <h2>Guilherme dos Santos</h2>
        <h1>
          DESENVOLVEDOR <br />
          FRONT-END
        </h1>
        <h3>Trabalhando atualmente com React Native</h3>

        <a href="https://www.instagram.com/guime_santz/" target="_blank"
          ><img src="src/assets/icons/instagram.svg" alt="Instagram"
        /></a>
        <a
          href="https://www.linkedin.com/in/guilherme-santos-232b59263/"
          target="_blank"
          ><img src="src/assets/icons/linkedin.svg" alt="LinkedIn"
        /></a>
        <div>
          <a
            href="curriculo.pdf"
            class="download-cv"
            download
            >Baixar currículo</a
          >
        </div>
      </section>

      <div class="foto-gui">
        <img
          src="src/assets/images/foto-hero.png"
          alt="Foto de Guilherme"
        />
      </div>
    </main>
```

Para:
```html
    <main>
      <section class="hero-intro">
        <p class="eyebrow">Olá, eu sou Guilherme dos Santos</p>
        <h1>Desenvolvedor<br />Front-End</h1>
        <p class="hero-desc">
          Construo interfaces web e mobile com React e React Native, unindo
          performance e atenção ao detalhe visual.
        </p>
        <div class="hero-actions">
          <a href="curriculo.pdf" class="download-cv" download>Baixar currículo</a>
          <div class="social-links">
            <a href="https://www.instagram.com/guime_santz/" target="_blank"
              ><img src="src/assets/icons/instagram.svg" alt="Instagram"
            /></a>
            <a
              href="https://www.linkedin.com/in/guilherme-santos-232b59263/"
              target="_blank"
              ><img src="src/assets/icons/linkedin.svg" alt="LinkedIn"
            /></a>
          </div>
        </div>
      </section>

      <div class="foto-gui">
        <img
          src="src/assets/images/foto-hero.png"
          alt="Foto de Guilherme"
        />
      </div>
    </main>
```

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`.
Expected: abaixo de 1024px, card escuro (headline + CTA + ícones) empilhado acima do card verde-claro com a foto, ambos ocupando 100% da largura, cantos arredondados. Acima de 1024px, os dois lado a lado (card escuro ~1.3fr, foto ~1fr). Ícones sociais em círculo escuro com ícone branco. Sem overflow horizontal em 375px.

---

### Task 4: Formação

**Files:**
- Modify: `src/styles/formacao.css`
- Modify: `index.html` (seção `#formacao`)

**Interfaces:**
- Consumes: tokens da Task 1.

- [ ] **Step 1: Substituir todo o conteúdo de `src/styles/formacao.css`**

```css
#formacao {
  padding: var(--space-lg) var(--space-md);
}

#formacao .eyebrow {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-xs);
}

#formacao h2 {
  font-family: var(--font-family-heading);
  font-weight: 800;
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: var(--color-text);
  margin-bottom: var(--space-md);
}

.formacao-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

.formacao-card {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
}

.formacao-card h3 {
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 6px;
}

.formacao-card p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

@media (min-width: 1024px) {
  .formacao-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
  }

  .formacao-card--wide {
    grid-column: span 3;
  }
}
```

- [ ] **Step 2: Reescrever a seção `#formacao` em `index.html`**

De:
```html
    <section id="formacao">
      <h1>FORMAÇÃO</h1>
      <h3>
        Curso Técnico em Análise e Desenvolvimento de Sistemas -
        <strong> SENAI </strong> 🤖<br />
        Bacharelado em Engenharia de Software -
        <strong>UNINTER</strong> 😶‍🌫️<br />
        Desenvolvimento Mobile com React Native - <strong>Udemy</strong> 💻
        <br />
        Desenvolvimento Web - <strong>Udemy</strong> 💻 <br />
        Gestão de Projetos - <strong>Udemy</strong> 💻 <br />
        Inglês Avançado - <strong>Wise Up</strong> 🗽<br />️
      </h3>
    </section>
```

Para:
```html
    <section id="formacao">
      <p class="eyebrow">Trajetória</p>
      <h2>Formação</h2>
      <div class="formacao-grid">
        <div class="formacao-card">
          <h3>Técnico em ADS</h3>
          <p>SENAI</p>
        </div>
        <div class="formacao-card">
          <h3>Engenharia de Software</h3>
          <p>UNINTER</p>
        </div>
        <div class="formacao-card">
          <h3>React Native, Web &amp; Gestão de Projetos</h3>
          <p>Udemy</p>
        </div>
        <div class="formacao-card formacao-card--wide">
          <h3>Inglês Avançado</h3>
          <p>Wise Up</p>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`.
Expected: mobile — 4 cards empilhados (1 coluna). Acima de 1024px — grid 3 colunas, o card "Inglês Avançado" ocupa a linha inteira (`grid-column: span 3`).

---

### Task 5: Projetos

**Files:**
- Modify: `src/styles/projetos.css`
- Modify: `index.html` (seção `#projetos` + `.container-projects`)

**Interfaces:**
- Consumes: tokens da Task 1.
- Mantém os `href` para `projects/donuts-store/index.html` e `projects/portfolio-legado/index.html` (não tocados por este plano).

- [ ] **Step 1: Substituir todo o conteúdo de `src/styles/projetos.css`**

```css
#projetos {
  padding: var(--space-lg) var(--space-md) 0;
  background-color: var(--color-bg-card);
}

#projetos .eyebrow {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-xs);
}

#projetos h2 {
  font-family: var(--font-family-heading);
  font-weight: 800;
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: var(--color-text);
  margin-bottom: var(--space-xs);
}

#projetos .section-desc {
  color: var(--color-text-muted);
  max-width: 560px;
}

.container-projects {
  background-color: var(--color-bg-card);
  padding: var(--space-md) var(--space-md) var(--space-lg);
}

.container-projects ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-md);
  max-width: var(--container-max);
  margin: 0 auto;
  list-style: none;
}

.proj-card {
  background-color: #ffffff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 12px 30px -16px rgba(0, 0, 0, 0.15);
}

.proj-thumb {
  background-color: var(--color-bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
}

.proj-thumb img {
  width: 100%;
  border-radius: 10px;
}

.proj-panel {
  padding: var(--space-md);
}

.proj-panel h3 {
  font-family: var(--font-family-heading);
  font-size: 1.05rem;
  color: var(--color-text);
  margin-bottom: 6px;
}

.proj-panel p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: var(--space-sm);
}

.proj-panel a {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--color-primary);
}

.proj-panel a:hover {
  color: var(--color-primary-dark);
}

@media (min-width: 1024px) and (hover: hover) {
  .proj-card {
    position: relative;
    height: 340px;
  }

  .proj-thumb {
    height: 100%;
  }

  .proj-panel {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    transform: translateY(52%);
    transition: transform 0.35s ease;
  }

  .proj-card:hover .proj-panel {
    transform: translateY(0);
  }
}
```

(Nota: o hover-reveal só ativa em `(min-width: 1024px) and (hover: hover)` — em telas touch/mobile o painel de descrição fica sempre visível abaixo da miniatura, sem depender de hover.)

- [ ] **Step 2: Reescrever a seção `#projetos` (heading) em `index.html`**

De:
```html
    <section id="projetos">
      <h1>PORTFOLIO</h1>
      <h3>
        Todos os projetos, até então foram especificamente para praticar minhas
        habilidades como Desenvolvedor Web.
      </h3>
    </section>
```

Para:
```html
    <section id="projetos">
      <p class="eyebrow">Trabalho</p>
      <h2>Projetos</h2>
      <p class="section-desc">
        Projetos práticos para consolidar minhas habilidades como
        desenvolvedor web.
      </p>
    </section>
```

- [ ] **Step 3: Reescrever a seção `.container-projects` (cards) em `index.html`**

De:
```html
    <section class="container-projects">
      <ul>
        <li>
          <img
            src="src/assets/images/preview-donuts-store.svg"
            alt="Tela inicial do site"
          />
          <h1>LOJA DE DONUTS</h1>
          <a href="projects/donuts-store/index.html" target="_blank"
            >Visualizar</a
          >
          <h3>
            Criei um site para uma loja de donuts, <br />na qual estava
            começando <br />
            agora no mercado!
          </h3>
        </li>
        <li>
          <img
            src="src/assets/images/preview-portfolio-legado.svg"
            alt="Logo do Portfolio antigo"
          />
          <h1>PRIMEIRO PORTFOLIO</h1>
          <a href="projects/portfolio-legado/index.html" target="_blank"
            >Visualizar</a
          >
          <h3>
            Este foi meu primeiro porfolio a ser feito, <br />o código não está
            dos melhores visto que estava <br />começando ainda na programação!
          </h3>
        </li>
        <li>
          <img
            src="src/assets/icons/logo-portfolio.svg"
            alt="Logo do novo Portfolio"
          />
          <h1>NOVO PORTFOLIO</h1>
          <a href="#" target="_blank">Visualizar</a>
          <h3>
            Este porfolio que você vê <br />foi o ultimio projeto que fiz até
            então <br />
            com código relativamente melhor <br />
            e também, organização ainda melhor
          </h3>
        </li>
      </ul>
    </section>
```

Para:
```html
    <section class="container-projects">
      <ul>
        <li class="proj-card">
          <div class="proj-thumb">
            <img
              src="src/assets/images/preview-donuts-store.svg"
              alt="Tela inicial do site"
            />
          </div>
          <div class="proj-panel">
            <h3>Loja de Donuts</h3>
            <p>Site para uma loja de donuts iniciando no mercado.</p>
            <a href="projects/donuts-store/index.html" target="_blank"
              >Visualizar →</a
            >
          </div>
        </li>
        <li class="proj-card">
          <div class="proj-thumb">
            <img
              src="src/assets/images/preview-portfolio-legado.svg"
              alt="Logo do Portfolio antigo"
            />
          </div>
          <div class="proj-panel">
            <h3>Primeiro Portfolio</h3>
            <p>Meu primeiro portfolio, início da jornada com código.</p>
            <a href="projects/portfolio-legado/index.html" target="_blank"
              >Visualizar →</a
            >
          </div>
        </li>
        <li class="proj-card">
          <div class="proj-thumb">
            <img
              src="src/assets/icons/logo-portfolio.svg"
              alt="Logo do novo Portfolio"
            />
          </div>
          <div class="proj-panel">
            <h3>Novo Portfolio</h3>
            <p>Este site — versão mais recente e organizada.</p>
            <a href="#" target="_blank">Visualizar →</a>
          </div>
        </li>
      </ul>
    </section>
```

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`.
Expected: cards em grid (1 col mobile → 3 col a partir de ~1024px via `auto-fit`). Em desktop com mouse, passar o cursor sobre um card revela o painel de descrição subindo; em mobile (ou desktop redimensionado <1024px), o painel já fica visível sem precisar de hover. Clicar "Visualizar" do card Donuts/Primeiro Portfolio abre a página correta do respectivo projeto em `projects/`.

---

### Task 6: Sobre mim

**Files:**
- Modify: `src/styles/sobre-mim.css`
- Modify: `index.html` (seção `#sobre-mim` + `.container-about-me`)

**Interfaces:**
- Consumes: tokens da Task 1.

- [ ] **Step 1: Substituir todo o conteúdo de `src/styles/sobre-mim.css`**

```css
#sobre-mim {
  padding: var(--space-lg) var(--space-md) 0;
}

#sobre-mim .eyebrow {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-xs);
}

#sobre-mim h2 {
  font-family: var(--font-family-heading);
  font-weight: 800;
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: var(--color-text);
}

.container-about-me {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-md) var(--space-lg);
}

.container-about-me img {
  width: 100%;
  max-width: 280px;
  background-color: var(--color-bg-card);
  border-radius: var(--radius-xl);
  padding: var(--space-md);
}

.about-text p {
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: var(--space-sm);
}

.about-text .download-cv {
  display: inline-block;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  font-weight: 700;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
}

.about-text .download-cv:hover {
  background-color: var(--color-primary);
  color: #ffffff;
}

@media (min-width: 1024px) {
  .container-about-me {
    flex-direction: row;
    align-items: center;
    gap: var(--space-xl);
    padding: var(--space-lg) var(--space-xl) var(--space-xl);
  }

  .container-about-me img {
    max-width: 320px;
  }
}
```

- [ ] **Step 2: Reescrever a seção `#sobre-mim` (heading) em `index.html`**

De:
```html
    <section id="sobre-mim">
      <h1>SOBRE MIM</h1>
      <h3>Experiência profissional, dons, hards e softs skills.</h3>
    </section>
```

Para:
```html
    <section id="sobre-mim">
      <p class="eyebrow">Quem sou eu</p>
      <h2>Sobre mim</h2>
    </section>
```

- [ ] **Step 3: Reescrever a seção `.container-about-me` em `index.html`**

De:
```html
    <section class="container-about-me">
      <img src="src/assets/images/foto-sobre-mim.svg" alt="Foto de Guilherme" />
      <h3>
        Aos 11 anos decidi começar a estudar o idioma inglês, e juntamente ao
        curso, dei início às aulas de música. Sou apaixonado na música, escuto
        desde um Metallica até um John Mayer, não foi atoa que cursei guitarra.
        Hoje, tocando guittarra e violão já fiz alguns shows.
        <br />
        <br />
        A partir de determinado momento me apeguei a programação web, onde
        comecei a pegar muito gosto e a estudar. Sendo um adolescente curioso em
        eletronica e em programação, me fez entrar para o mercado de T.I
        (Tecnologia da Informação) onde então me aproximei ainda mais do que
        gostava.
        <br />
        <br />
        Até que chegou um momento de minha vida que quis me aproximar do
        desenvolvimento web, comprei um curso e me aprofundei nos estudos de
        sites e para praticar, fiz alguns sites simples utilizando apenas HTML e
        CSS. E um deles é este portfolio que você vê!
        <br />
        <br />

        <a
          href="curriculo.pdf"
          class="download-cv"
          download
          >Baixar currículo</a
        >
      </h3>
    </section>
```

Para:
```html
    <section class="container-about-me">
      <img src="src/assets/images/foto-sobre-mim.svg" alt="Foto de Guilherme" />
      <div class="about-text">
        <p>
          Comecei a programar por curiosidade e hoje transformo isso em
          profissão. Toco guitarra e violão, e trago a mesma atenção a
          detalhes das músicas para o código que escrevo.
        </p>
        <p>
          Estudei HTML, CSS, React e React Native, e já apliquei esse
          conhecimento em projetos reais — inclusive neste portfolio.
        </p>
        <a href="curriculo.pdf" class="download-cv" download>Baixar currículo</a>
      </div>
    </section>
```

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`.
Expected: mobile — foto acima do texto, 1 coluna. Acima de 1024px — foto à esquerda, texto à direita, lado a lado. Botão "Baixar currículo" com borda verde, preenche de verde no hover.

---

### Task 7: Contato

**Files:**
- Modify: `src/styles/contato.css`
- Modify: `index.html` (seção `#contato`)

**Interfaces:**
- Consumes: tokens da Task 1.
- Preserva exatamente os seletores usados por `formController.js` (ver Global Constraints).

- [ ] **Step 1: Substituir todo o conteúdo de `src/styles/contato.css`**

```css
#contato {
  background-color: var(--color-dark);
  padding: var(--space-lg) var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.contato-intro .eyebrow {
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--color-text-on-dark-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-xs);
}

.contato-intro h2 {
  font-family: var(--font-family-heading);
  font-weight: 800;
  font-size: clamp(1.5rem, 5vw, 2rem);
  color: #ffffff;
  margin-bottom: var(--space-xs);
}

.contato-intro .section-desc {
  color: var(--color-text-on-dark);
  max-width: 380px;
}

#contato form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

#contato .form-group {
  width: 100%;
}

#contato .form-group input,
#contato .form-group textarea {
  width: 100%;
  background-color: var(--color-dark-alt);
  border: 1px solid var(--color-dark-border);
  border-radius: var(--radius-sm);
  padding: var(--space-sm);
  color: #ffffff;
  font-family: var(--font-family-base);
  font-size: 0.95rem;
}

#contato .form-group textarea {
  resize: vertical;
  min-height: 100px;
}

#contato .form-group input::placeholder,
#contato .form-group textarea::placeholder {
  color: var(--color-text-on-dark);
}

.form-group.error input,
.form-group.error textarea {
  border-color: #ff6b5e;
}

.form-group .error {
  color: #ff9a8f;
  font-size: 0.85rem;
  display: block;
  min-height: 1.2em;
  margin-top: 4px;
}

.form-group-send input[type='submit'] {
  width: 100%;
  background-color: var(--color-primary);
  color: #ffffff;
  font-weight: 700;
  padding: var(--space-sm);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-base);
}

.form-group-send input[type='submit']:hover {
  background-color: var(--color-primary-dark);
}

@media (min-width: 1024px) {
  #contato {
    flex-direction: row;
    gap: var(--space-xl);
    padding: var(--space-xl);
    align-items: center;
  }

  .contato-intro,
  #contato form {
    flex: 1;
  }
}
```

- [ ] **Step 2: Reescrever a seção `#contato` em `index.html`**

De:
```html
    <section id="contato">
      <h1>OPÇÕES DE CONTATO</h1>
      <h3>Preencha este formulário para que possamos entrar em contato!</h3>

      <form
        id="form"
        action="https://formsubmit.co/guilherme.santos.uninter@gmail.com"
        method="POST"
      >
        <!-- Nome -->
        <div class="form-group">
          <label for="campo_nome">Nome completo</label>
          <input type="text" name="name" id="campo_nome" placeholder="Nome" />
          <a class="error">Preencha os campos corretamente</a>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="campo_email">Seu email</label>
          <input
            type="email"
            name="email"
            id="campo_email"
            placeholder="Email"
          />
          <a class="error">Preencha os campos corretamente</a>
        </div>

        <!-- Mensagem -->
        <div class="form-group">
          <label for="campo_mensagem">Deixe sua mensagem aqui!</label>
          <textarea
            type="text"
            name="message"
            id="campo_mensagem"
            placeholder="Sua mensagem"
          ></textarea>
          <a class="error">Preencha os campos corretamente</a>
        </div>

        <!-- Enviar -->
        <div class="form-group-send">
          <input type="hidden" name="_captcha" value="false" />
          <input type="submit" value="Enviar" />
        </div>
      </form>
    </section>
```

Para:
```html
    <section id="contato">
      <div class="contato-intro">
        <p class="eyebrow">Vamos conversar</p>
        <h2>Opções de contato</h2>
        <p class="section-desc">
          Preencha o formulário e retorno o quanto antes.
        </p>
      </div>

      <form
        id="form"
        action="https://formsubmit.co/guilherme.santos.uninter@gmail.com"
        method="POST"
      >
        <!-- Nome -->
        <div class="form-group">
          <input
            type="text"
            name="name"
            id="campo_nome"
            placeholder="Nome completo"
            aria-label="Nome completo"
          />
          <a class="error">Preencha os campos corretamente</a>
        </div>

        <!-- Email -->
        <div class="form-group">
          <input
            type="email"
            name="email"
            id="campo_email"
            placeholder="Seu email"
            aria-label="Seu email"
          />
          <a class="error">Preencha os campos corretamente</a>
        </div>

        <!-- Mensagem -->
        <div class="form-group">
          <textarea
            name="message"
            id="campo_mensagem"
            placeholder="Sua mensagem"
            aria-label="Sua mensagem"
          ></textarea>
          <a class="error">Preencha os campos corretamente</a>
        </div>

        <!-- Enviar -->
        <div class="form-group-send">
          <input type="hidden" name="_captcha" value="false" />
          <input type="submit" value="Enviar mensagem" />
        </div>
      </form>
    </section>
```

- [ ] **Step 3: Verificar comportamento e visual**

Run: `npm run dev`.
1. Seção com fundo escuro cheio; mobile — texto acima do formulário; acima de 1024px — texto à esquerda, formulário à direita.
2. Clicar "Enviar mensagem" com campos vazios: `formController.js` deve mostrar as mensagens de erro (`.error`) em cada campo, sem submeter — comportamento herdado, não deve regredir.
3. Preencher nome com 2 letras: erro "pelo menos 3 caracteres" aparece.
4. **Não submeter com dados reais** (evita enviar de verdade pro `formsubmit.co`) — validar só até confirmar que os erros somem quando os campos ficam válidos.

---

### Task 8: Back-to-top + verificação final da página inteira

**Files:**
- Modify: `src/styles/back-to-top.css`

**Interfaces:**
- Consumes: tokens da Task 1.
- Nenhuma mudança de markup necessária — `index.html:19-21` (`<div class="back-to-top">`) já está correto desde a Task 1.

- [ ] **Step 1: Substituir todo o conteúdo de `src/styles/back-to-top.css`**

```css
.back-to-top {
  position: fixed;
  z-index: 20;
  right: var(--space-md);
  bottom: var(--space-md);
}

.back-to-top a {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.35);
  transition: var(--transition-base);
}

.back-to-top a:hover {
  background-color: var(--color-primary-dark);
}

.back-to-top img {
  width: 18px;
  filter: invert(1);
}
```

- [ ] **Step 2: Verificação visual do botão**

Run: `npm run dev`, rolar a página até o fim.
Expected: botão circular verde fixo no canto inferior direito, seta branca centralizada, escurece no hover, clique rola suavemente para o topo (`scroll-behavior: smooth` de `base.css`).

- [ ] **Step 3: Verificação final — página completa, todas as larguras**

Run: `npm run dev`, abrir devtools, testar 375px, 768px, 1024px, 1440px.
Expected:
- Nenhum overflow horizontal em nenhuma largura.
- Header, hero, formação, projetos, sobre mim e contato todos usando a paleta verde/branco/escuro nova, fontes Manrope/Sora, sem nenhum resquício visual da paleta laranja/vermelha ou das fontes antigas (Kanit/Kufam/Madimi/Quicksand).
- Menu hambúrguer funcional <768px; nav em linha ≥768px.
- Cards de formação: 1 col mobile, 3 col (+ card largo) ≥1024px.
- Cards de projeto: hover-reveal ≥1024px com mouse; painel sempre visível abaixo disso.
- Sobre mim e hero: empilhados mobile, lado a lado ≥1024px.
- Contato: formulário funcional (validação client-side), campos sem `<label>` visível mas com `aria-label`.
- Nenhum erro/404 no console (fontes, imagens, ícones).
- `npm run build` roda sem erro.

---

## Self-Review

**Cobertura do spec** ([[2026-07-15-portfolio-visual-redesign-design]]):
1. Tokens/fontes → Task 1. ✅
2. Estrutura bento (`.page`) → Task 1. ✅
3. Header/nav → Task 2. ✅
4. Hero → Task 3. ✅
5. Formação (4 cards agrupados) → Task 4. ✅
6. Projetos (hover-reveal, thumbnails reais mantidos) → Task 5. ✅
7. Sobre mim (copy reduzido) → Task 6. ✅
8. Contato (labels removidos + aria-label, seletores do form preservados) → Task 7. ✅
9. Assets (nenhum novo) → nenhuma task cria assets, todas reaproveitam os existentes. ✅

Nenhum placeholder/TBD. Nomes de classes (`.hero-intro`, `.hero-desc`, `.hero-actions`, `.social-links`, `.eyebrow`, `.section-desc`, `.formacao-grid`, `.formacao-card`, `.formacao-card--wide`, `.proj-card`, `.proj-thumb`, `.proj-panel`, `.contato-intro`) são consistentes entre o CSS de cada task e o HTML que a mesma task escreve — conferido task a task.
