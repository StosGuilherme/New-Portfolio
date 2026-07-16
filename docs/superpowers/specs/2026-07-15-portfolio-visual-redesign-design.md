# Redesign Visual do Portfolio (baseado no mockup Claude) — Design

Data: 2026-07-15

## Contexto

O portfolio já passou por uma modernização estrutural anterior ([[2026-07-12-portfolio-modernization-design]]): Vite, CSS modular por seção (`src/styles/*.css` importados via `main.js`), tokens centralizados em `tokens.css`, JS dividido por responsabilidade (`navigation.js`, `formValidator.js`, `formController.js`), projetos antigos migrados para `projects/<nome>/`. Essa base está pronta e funcionando (paleta laranja/vermelho, fontes Kanit/Kufam/Madimi/Quicksand).

O usuário gerou, via Claude, um mockup visual novo do mesmo portfolio (`Portfolio Guilherme - Standalone.html`, formato bundle de artifact — HTML/CSS embutido em `<script type="__bundler/template">`, extraído e analisado para este spec). O mockup propõe um visual completamente diferente: layout bento grid, paleta verde/branco, fontes Manrope + Sora, copy revisado.

## Objetivo

Substituir a linguagem visual e o copy do site atual pelo visual do mockup, **mantendo a arquitetura de código já estabelecida** (Vite, CSS por seção, tokens centralizados, módulos JS por responsabilidade, validação de formulário real). Não é uma reescrita estrutural — é uma troca de tema + conteúdo sobre a base existente.

## Decisões

### 1. Design tokens (`src/styles/tokens.css`)

Substituir paleta e fontes atuais pelas do mockup:

- `--color-bg`: `oklch(96% 0.01 145)` (fundo geral, off-white esverdeado)
- `--color-bg-card`: `oklch(97% 0.015 145)` (cards claros — formação)
- `--color-border`: `oklch(92% 0.01 145)`
- `--color-dark`: `oklch(20% 0.02 150)` (hero card, seção contato, texto de heading)
- `--color-dark-alt`: `oklch(28% 0.02 150)` (inputs do form, fundo escuro secundário)
- `--color-primary`: `oklch(45% 0.13 150)` (verde — links, botões, destaque)
- `--color-primary-dark`: `oklch(38% 0.15 150)` (hover do verde)
- `--color-text-muted`: `oklch(45% 0.01 150)`
- `--color-text-on-dark`: `oklch(75% 0.01 150)`
- `--font-family-base`: `'Manrope', sans-serif`
- `--font-family-heading`: `'Sora', sans-serif` (peso 800 nos títulos)
- Mantém `--space-*`, `--radius-*` (ajustar `--radius-lg` para `24px`/`28px`, mais próximo do bento do mockup), `--transition-base`, `--container-max` (passa a `1440px`).

`index.html`: trocar o `<link>` do Google Fonts atual (Kanit/Kufam/Madimi/Quicksand) pelo de Manrope (300–800) + Sora (400/600/700/800).

### 2. Estrutura visual (bento)

Envolver o conteúdo num container `max-width: 1440px` com fundo branco (`.page` ou similar em `base.css`), como no mockup. Cada seção interna vira um "bloco" com padding generoso (64px desktop) e cantos arredondados nos cards internos (hero, contato).

### 3. Header/nav

- Logo textual "Guilherme.dev" (span `.dev` em verde), substituindo "< Guilherme >".
- Mantém `.nav-toggle` (hambúrguer) e comportamento JS de `navigation.js` sem alteração — só re-skin.
- Botão "Me contrate" vira pill verde sólido.

### 4. Hero

Bento 2 colunas desktop (`grid-template-columns: 1.3fr 1fr`): card escuro à esquerda (saudação, nome, título, descrição, CTA "Baixar currículo" + ícones sociais), card claro à direita com a foto (`foto-hero.png`). Empilha em 1 coluna abaixo de 1024px (mobile-first: base = 1 coluna, `min-width:1024px` aplica grid).

### 5. Formação

Reagrupar o conteúdo em 4 cards (grid 3 colunas desktop → 1 coluna mobile), replicando o agrupamento do mockup:
1. Técnico em ADS — SENAI
2. Engenharia de Software — UNINTER
3. React Native, Web & Gestão de Projetos — Udemy
4. Inglês Avançado — Wise Up (`grid-column: span 3` desktop)

### 6. Projetos

Cards com hover-reveal (painel de título/descrição/link sobe de baixo, `transform: translateY(52%)` → `translateY(0)` no hover). **Mantém os thumbnails reais já existentes** (`preview-donuts-store.svg`, `preview-portfolio-legado.svg`, `logo-portfolio.svg`) e os links (`projects/donuts-store/index.html`, `projects/portfolio-legado/index.html`, `#` para o próprio site). Copy das descrições segue o mockup (mais curto). Em telas sem hover (`@media (hover: none)` ou abaixo do breakpoint mobile), o painel fica sempre em `translateY(0)` — sem interação de hover em touch.

### 7. Sobre mim

2 colunas (foto + texto) desktop, empilha mobile. Copy reduzido ao do mockup (2 parágrafos: trajetória música→programação, estudos HTML/CSS/React/React Native). CTA "Baixar currículo" mantido.

### 8. Contato

Card escuro (`--color-dark`) full-bleed, 2 colunas desktop (texto à esquerda, formulário à direita) → 1 coluna mobile. Formulário:
- Remove `<label>` visível (mockup usa só placeholder); adiciona `aria-label` em cada input/textarea para não perder acessibilidade (labels visíveis eram a única affordance de a11y do form atual).
- **Mantém intactos**: `id="form"`, `action="https://formsubmit.co/..."`, `method="POST"`, ids `campo_nome`/`campo_email`/`campo_mensagem`, `name="name|email|message"`, estrutura `.form-group` + `<a class="error">`, `input[type=hidden][name=_captcha]`. Isso preserva `formValidator.js`/`formController.js` sem qualquer mudança de JS.
- Reskin: inputs com fundo escuro translúcido (`--color-dark-alt`), bordas sutis, botão de envio verde sólido.

### 9. Assets

Nenhum asset novo — reaproveita tudo que já está em `src/assets/`. Os SVGs/fontes embutidos no bundle do mockup (extraídos para análise) não são usados; as fontes vêm do Google Fonts CDN (como já é o padrão do projeto) e as imagens de projeto já existentes têm prioridade sobre os placeholders genéricos do mockup.

## Arquivos afetados

- `index.html` — reescrita de markup (nav, hero, formação, projetos, sobre mim, contato) e link de fontes.
- `src/styles/tokens.css` — nova paleta/fontes/radius.
- `src/styles/base.css` — container bento (`max-width`, fundo branco).
- `src/styles/header.css`, `hero.css`, `formacao.css`, `projetos.css`, `sobre-mim.css`, `contato.css`, `back-to-top.css` — reescrita visual mobile-first (base = mobile, `min-width: 1024px` para o grid desktop, seguindo o padrão de breakpoints já usado: 768/1024/1440).
- **Não afetados**: `src/main.js`, `src/scripts/*.js`, `vite.config.js`, `package.json`, `projects/**`.

## Testes / validação

Sem framework automatizado (mesmo critério do spec anterior). Validação manual:
- `npm run dev` — conferir visualmente em 375px, 768px, 1024px, 1440px.
- Hero, formação, projetos, sobre mim, contato sem overflow horizontal em nenhuma largura.
- Cards de projeto: hover revela painel no desktop; painel sempre visível em touch/mobile.
- Formulário: submissão vazia mostra erros (`formValidator.js`/`formController.js` inalterados); links "Visualizar" abrem os projetos corretos.
- Menu hambúrguer abre/fecha abaixo de 768px (comportamento herdado, não deve regredir).

## Fora de escopo

- Qualquer mudança em `projects/donuts-store` e `projects/portfolio-legado`.
- Mudança de lógica JS (`navigation.js`, `formValidator.js`, `formController.js`) — só CSS/HTML.
- Novos assets/imagens além dos já existentes no repo.
- Testes automatizados.
- Commits git durante a execução do plano — usuário faz manualmente (mesma regra do spec anterior), a menos que instrução explícita mude isso na fase de plano.
