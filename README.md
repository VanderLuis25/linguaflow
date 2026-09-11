# LinguaFlow

Aplicação de estudo de idiomas 100% frontend, construída com React, Vite, Tailwind CSS e IndexedDB. O perfil e as preferências ficam no navegador; nenhuma conta ou backend é necessário.

## Rodando localmente

```bash
npm install
npm run dev
```

Para gerar o site estático:

```bash
npm run build
npm run preview
```

## APIs de IA

Copie `.env.example` para `.env` e informe `VITE_OPENAI_KEY` para habilitar tradução via GPT-4o-mini. Sem chave, o aplicativo usa um fallback local demonstrativo. O áudio utiliza a Web Speech API do navegador; `VITE_ELEVENLABS_KEY` pode ser conectado ao serviço premium em uma evolução futura.

> Chaves em um app sem backend ficam expostas no bundle. Use chaves com escopo, limites de uso e restrição por domínio. Nunca versione `.env`.

## Persistência

- `localStorage`: perfis (`lls_profiles`), perfil ativo, tema e preferências.
- IndexedDB (`linguaflow-db`): histórico de traduções, progresso de exercícios/gramática, cache de áudio e traduções.
- O alfabeto, números, gramática essencial e exercícios iniciais funcionam offline.

## Deploy

O diretório `dist/` gerado por `npm run build` pode ser publicado em Vercel, Netlify, Cloudflare Pages ou GitHub Pages. Use `npm run build` como comando de build e `dist` como diretório de saída.

## Adicionando idiomas

Adicione um item em `src/data/languages.js`, incluindo seu código de fala, e crie uma entrada correspondente em `languageContent` e `starterExercises`. O restante da interface usa esses dados automaticamente.
