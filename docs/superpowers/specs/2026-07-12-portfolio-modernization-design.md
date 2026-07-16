# Modernização do Portfolio — Design

Data: 2026-07-12

## Contexto

Portfolio pessoal estático (HTML/CSS/JS puro, sem build tool). CSS não tem
media queries — o layout quebra em telas menores. Assets do site atual estão
misturados dentro de `assets/` com dois projetos antigos completos (Donuts
Store, Portfolio antigo), que servem como demonstração de evolução e são
abertos via link "Visualizar" a partir da página principal.

## Objetivo

- Tornar o site (principal + projetos antigos linkados) responsivo de verdade,
  com tamanhos/proporções corretos em mobile, tablet e desktop.
- Reorganizar as pastas do projeto de forma clara.
- Aplicar boas práticas de organização de código (separação de
  responsabilidade em CSS/JS, sem duplicação de valores).
- Introduzir Vite como build tool.
- Documentar convenções em `CLAUDE.md`.

## Decisões

1. **Build tool**: introduzir Vite. Site deixa de ser "abrir index.html
   direto" e passa a ter `npm run dev` / `npm run build` / `npm run preview`.
2. **Projetos antigos**: viram páginas próprias do Vite (multi-page build),
   movidos para `projects/<nome>/`. Só recebem correções de responsividade e
   renomeação de arquivos/pastas para kebab-case sem espaço/acento — lógica e
   estrutura original não são reescritas (são demos históricas de evolução).
3. **Deploy**: GitHub Pages, `base: '/New-Portfolio/'` no `vite.config.js`.
4. **CSS**: um arquivo por seção/componente, importados via `main.js`, com
   design tokens centralizados em `styles/tokens.css` (cores, espaçamento,
   tipografia, transições). Nenhum valor hex/px mágico direto nos arquivos de
   seção.
5. **JS**: dividido por responsabilidade única —
   - `scripts/formValidator.js`: regras puras de validação (sem DOM).
   - `scripts/formController.js`: liga validação ao DOM/eventos do form.
   - `scripts/navigation.js`: scroll suave, back-to-top, menu.
   - `main.js`: só importa CSS e inicializa os módulos.
6. **Responsividade**: mobile-first. Regra base = mobile, media queries com
   `min-width` adicionam/alteram layout para telas maiores. Breakpoints:
   - até 767px: mobile (base, sem media query)
   - `min-width: 768px`: tablet
   - `min-width: 1024px`: desktop
   - `min-width: 1440px`: wide (limita `max-width` do container geral)

## Estrutura de pastas alvo

```
New-Portfolio/
├── index.html
├── vite.config.js
├── package.json
├── CLAUDE.md
├── public/
├── src/
│   ├── main.js
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── formacao.css
│   │   ├── projetos.css
│   │   ├── sobre-mim.css
│   │   ├── contato.css
│   │   └── back-to-top.css
│   ├── scripts/
│   │   ├── navigation.js
│   │   ├── formValidator.js
│   │   └── formController.js
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── docs/
└── projects/
    ├── donuts-store/
    └── portfolio-legado/
```

## Problemas específicos a corrigir (responsividade)

- `main { display: flex }` sem wrap → coluna em mobile, linha a partir de
  1024px.
- `main section { width: 45% }` fixo → 100% mobile, `clamp()`/`max-width` em
  desktop.
- Hack `.foto-gui img { margin-top: 40% }` → substituído por
  `align-items: center` no flex pai.
- Fontes em `px` fixo (`h1 { font-size: 70px }`) → `clamp()` fluido.
- Cards de projeto (`.container-projects ul li`) → grid
  `repeat(auto-fit, minmax(280px, 1fr))`.
- Formulário (`form { width: 40% }`) → 100% mobile, `max-width` no desktop.
- Todas as imagens: `max-width: 100%; height: auto`.
- Mesmo tratamento (media query + imagens fluidas) aplicado dentro de
  `projects/donuts-store` e `projects/portfolio-legado`, sem alterar
  HTML/JS deles.

## CLAUDE.md — conteúdo

- Stack: HTML/CSS/JS puro + Vite, sem framework JS.
- Comandos: `npm run dev`, `npm run build`, `npm run preview`.
- Convenção CSS: um arquivo por seção, tokens em `tokens.css`, nunca hex/px
  mágico direto em componente.
- Convenção JS: módulos por responsabilidade única, sem lib externa de
  validação.
- Mobile-first: regra base sempre mobile; media query usa `min-width`, nunca
  `max-width` decrescente.
- Nomenclatura de arquivo: kebab-case, sem espaço/acento (motivo: já causou
  path quebrado nos projetos antigos).
- Deploy: GitHub Pages, base path `/New-Portfolio/`, build gera `dist/`.
- `projects/` contém demos históricas — não modernizar lógica, só
  responsividade quando pedido.

## Testes / validação

Sem framework de testes automatizados (site estático de conteúdo, sem lógica
de negócio complexa). Validação manual:
- `npm run build` sem erros.
- `npm run preview` — checar visualmente em mobile (375px), tablet (768px),
  desktop (1440px) via devtools.
- Cada link "Visualizar" abre a página correta do projeto antigo.
- Formulário de contato: submissão com sucesso/erro continua funcionando
  (mesmo endpoint `formsubmit.co`).

## Fora de escopo

- Reescrever HTML/JS/lógica dos projetos antigos (Donuts Store, Portfolio
  legado) — só responsividade e renomeação de arquivo.
- Testes automatizados (unit/e2e).
- CMS ou conteúdo dinâmico.
- Nenhum commit git deve ser feito durante a execução deste plano — usuário
  fará isso manualmente.
