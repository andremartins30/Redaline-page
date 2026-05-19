# Redaline-page

Landing page e política de privacidade do RedaLine construída com Vite + React.

## Tech Stack

- **Framework**: Vite (build tool) + React 19
- **Linguagem**: JavaScript (JSX), sem TypeScript
- **Estilização**: Tailwind CSS
- **Animações**: GSAP (GreenSock)
- **Ícones**: lucide-react

## Project Structure

```
Redaline-page/
├── src/
│   ├── App.jsx              # Componente raiz (landing page)
│   ├── main.jsx             # Entry point do React
│   ├── index.css            # Estilos globais
│   ├── App.css              # Estilos do App
│   ├── privacy-policy.jsx   # Componente de política de privacidade
│   ├── PrivacyPolicyPage.jsx # Página de política (render completo)
│   └── assets/              # Imagens e recursos estáticos
├── public/
│   ├── images/              # Imagens da landing page
│   └── new/                 # Assets adicionais
├── index.html               # Entry HTML (landing page)
├── politica-de-privacidade.html # HTML para página de política
├── vite.config.js           # Config Vite (multi-entry build)
└── package.json
```

## Development Commands

- **Dev**: `npm run dev` (hot reload em http://localhost:5173)
- **Build**: `npm run build` (gera dist com múltiplos entry points)
- **Preview**: `npm run preview` (testa build localmente)
- **Lint**: `npm run lint` (verifica código com ESLint)

## Critical Conventions

- **Multi-entry build**: O `vite.config.js` configura dois HTML como entry points (`index.html` e `politica-de-privacidade.html`). Cada um renderiza um componente diferente.
- **Sem TypeScript**: Projeto usa JSX puro. Type safety é responsabilidade do desenvolvedor.
- **GSAP para animações**: Todas as animações complexas usam GSAP, não CSS puro. Verifique exemplos em `App.jsx`.

## Known Issues / Gotchas

- O build gera dois arquivos HTML separados (landing + política). Certifique-se de que os links navegam corretamente entre eles.
- Tailwind precisa ser compilado durante build. Se o CSS não aparecer, limpe o cache com `rm -rf node_modules/.vite`.
- GSAP pode ter conflitos com hot reload em desenvolvimento. Se animações quebram, recarregue a página manualmente.
