<div align="center">

# 🌐 Portfolio — Dario Ramos

**Meu portfolio pessoal de desenvolvedor web, construído com Vue 3, Vuetify 3 e Vite.**

[![Deploy](https://github.com/afsdari0/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/afsdari0/Portfolio/actions/workflows/deploy.yml)
![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-3.9-1867C0?logo=vuetify&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3-ffd859?logo=pinia&logoColor=black)

<br/>

### 🔗 [darioramos.dev](https://darioramos.dev)

</div>

---

## ✨ Features

| Feature | Descrição |
|---------|-----------|
| 🌙 **Dark / Light Mode** | Tema claro e escuro com persistência em localStorage |
| 🌎 **Bilíngue (pt-BR / en)** | Internacionalização completa com vue-i18n, troca em tempo real |
| 🃏 **Sistema de Rank** | Classificação estilo game (S / A / B / C) com badges e bordas animadas |
| 🎴 **3D Tilt Cards** | Efeito de perspectiva 3D no hover dos cards de projeto |
| 🌀 **Parallax & Partículas** | Orbs flutuantes com parallax no scroll + partículas CSS em camadas |
| 📱 **Responsivo** | Layout adaptável com bento grid, scroll-snap mobile e breakpoints otimizados |
| ⚡ **Code Splitting** | Chunks separados para Vuetify, Vue vendor e i18n — carregamento otimizado |
| 📬 **Formulário de Contato** | Envio direto via EmailJS, sem necessidade de backend |
| 🚀 **CI/CD Automático** | Deploy via GitHub Actions para GitHub Pages a cada push na `main` |

---

## 🛠️ Tech Stack

| Camada | Tecnologia |
|--------|-----------|
| **Framework** | Vue 3 (Composition API + `<script setup>`) |
| **UI** | Vuetify 3 (Material Design) |
| **Build** | Vite 6 |
| **State** | Pinia 3 |
| **Routing** | Vue Router 4 (file-based via unplugin-vue-router) |
| **i18n** | vue-i18n 9 |
| **Estilos** | SCSS (sass-embedded) + CSS custom properties |
| **Ícones** | MDI + Phosphor Icons |
| **Tipografia** | Sora · DM Sans · JetBrains Mono (Google Fonts) |
| **Email** | EmailJS |
| **Hosting** | GitHub Pages + domínio customizado |

---

## 📁 Estrutura do Projeto

```
src/
├── assets/            # SVGs, imagens de projetos
├── components/        # Componentes reutilizáveis (cards, nav, toast, logo...)
│   └── allProjects/   # Componentes específicos da página de projetos
├── composables/       # useScrollAnimation, useCardTilt
├── data/              # projects.js, rankMeta.js
├── locales/           # pt-BR.json, en.json
├── pages/             # Rotas (index.vue, allProjects.vue)
├── plugins/           # Vuetify, i18n, router
├── sass/              # Temas, variáveis, utilitários globais
└── stores/            # Pinia (theme, locale, dialogProjects)
```

---

## 🚀 Getting Started

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/afsdari0/Portfolio.git
cd Portfolio

# Instale as dependências
npm install
```

### Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento em `localhost:3000` |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build local |
| `npm run lint` | ESLint com auto-fix |

---

## 🌐 Deploy

O deploy é automático via **GitHub Actions**. A cada push na branch `main`:

1. Instala dependências (`npm ci`)
2. Executa o build (`npm run build`)
3. Publica o diretório `dist/` no GitHub Pages

O site fica disponível em [darioramos.dev](https://darioramos.dev) através de domínio customizado configurado via Cloudflare DNS.

---

## 📄 Licença

MIT © [Dario Ramos](https://github.com/afsdari0)
