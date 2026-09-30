# A.D.A.M. — site de apresentação

Site de apresentação do projeto de **Ronald Araújo Corrêa**, com identidade visual própria.

**Este projeto não é o sistema A.D.A.M.** É um site para explicar o seu funcionamento. O dashboard é uma representação didática: métricas, computadores, relatórios, IA, voz e comandos são simulados no navegador. Não existem Agents, banco operacional, autenticação real, conexão com computadores, gravação de áudio ou chamadas à OpenAI neste repositório.

## Executar

Node.js 24 e npm são usados para desenvolver, gerar e testar o site. A publicação no GitHub Pages serve somente arquivos estáticos; não executa Node.js, Python ou o A.D.A.M.

```bash
npm ci
npm run dev
```

Abra http://localhost:3000/siteadam/. As dependências estão fixadas pelo `package-lock.json`.

Para conferir exatamente os arquivos que serão publicados:

```bash
npm run build
npm start
```

Abra http://localhost:3001/siteadam/. A prévia monta a pasta `out/` no caminho usado na compilação, inclusive quando ele muda. Leia [o guia do GitHub Pages](docs/GITHUB-PAGES.md) para publicar.

## Tecnologias e dependências

- **Next.js 16 / App Router:** rotas, renderização inicial, metadata e compilação de produção.
- **React 19 e TypeScript:** componentes tipados e estado local das demonstrações.
- **Tailwind CSS 4 / PostCSS:** base de estilos, tokens e utilitários. A identidade visual é própria, sem template.
- **Framer Motion:** objetos em camadas, parallax, reação ao ponteiro, reorganização de máquinas, indicadores animados e sequência fixada durante a rolagem. Respeita movimento reduzido e oferece botão de pausa.
- **Lucide React:** ícones SVG leves. As fontes Barlow Condensed e Manrope são locais, com licenças OFL incluídas.
- **ESLint / eslint-config-next:** análise estática e regras de React/Next.js.
- **Playwright:** testes de navegação, interações e responsividade. Apenas desenvolvimento.
- **Prettier:** formatação do código. Apenas desenvolvimento.

Os gráficos utilizam SVG e CSS, sem biblioteca adicional de visualização. Os diagramas são componentes nativos do site, não imagens geradas.

A abertura usa uma imagem original de hardware gerada com a ferramenta integrada `image_gen`, servida como arquivo estático. Arquivo, prompt e origem estão documentados em [public/images/ASSET-NOTES.md](public/images/ASSET-NOTES.md). A referência de experiência indicada pelo autor foi [Duckbill Cookies](https://www.duckbillcookies.com.br/): telas amplas, tipografia expressiva e objetos que acompanham a rolagem, adaptados ao tema A.D.A.M.

## Experiência da página inicial

1. **O projeto:** hardware em camadas, resposta ao ponteiro e três pontos clicáveis de explicação.
2. **O problema:** seis estações ilustrativas, inspeção de problemas e reorganização em uma visão central.
3. **O caminho:** sequência fixada durante a rolagem, com quatro estados e navegação direta pelas etapas.
4. **Monitoramento:** CPU, memória, disco e rede selecionáveis; troca de estação e indicadores animados.
5. **Comandos:** uma solicitação demonstrativa percorre validação, fila, execução e resultado.
6. **IA e voz:** conversa e voz simuladas, explicitando que a IA interpreta e Python executa.
7. **Exploração:** painéis com acesso às páginas detalhadas, tecnologias e autoria.

O menu ocupa a tela inteira e pode ser usado por teclado, com foco contido e fechamento por Escape. A rolagem permanece nativa; não há bloqueio de roda do mouse ou dependência de GSAP/Lenis.

## Páginas

| Rota             | Conteúdo                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `/`              | Sete cenas interativas: projeto, problema, percurso dos dados, monitoramento, comandos, IA e exploração |
| `/como-funciona` | Dez etapas do ciclo de telemetria e comandos                                                            |
| `/recursos`      | Monitoramento, gerenciamento, automação, IA, voz, relatórios, usuários e programas                      |
| `/arquitetura`   | Componentes interativos, rede local e integração externa com OpenAI                                     |
| `/demonstracao`  | Dashboard ilustrativo e experiências de IA e voz                                                        |
| `/documentacao`  | Tópicos técnicos resumidos com busca funcional                                                          |
| `/sobre`         | Contexto acadêmico, autor e espaços para links                                                          |

## Estrutura

```text
src/
  app/                    Rotas, layout, CSS, metadata, favicon e manifest
  components/
    Navigation.tsx        Header fixo e navegação mobile
    Footer.tsx            Autoria e links
    experience/
      Experience.tsx     Composição, capítulos e controle de movimento
      IntroScenes.tsx    Abertura e laboratório interativo
      SystemScenes.tsx   Percurso dos dados e monitoramento
      ExploreScenes.tsx  Comandos, IA, voz e navegação visual
    ArchitectureDiagram.tsx  Blocos clicáveis e explicações
    DashboardDemo.tsx     Dashboard, MachineCard, LabCard e inspeção
    Simulations.tsx       CommandDemo, AIDemo, VoiceDemo, gráficos e relatórios
    Documentation.tsx    Busca e navegação pelos tópicos
    Timeline.tsx          Evolução interativa
    ui.tsx                Elementos visuais e animação de entrada
  data/project.ts         Conteúdo editorial reutilizável
  hooks/useSimulation.ts  Ciclo das simulações, com limpeza de timers
  lib/site.ts              Caminho base e URLs dos arquivos públicos
  assets/fonts/            Fontes locais empacotadas pelo Next.js
tests/site.spec.ts        Verificações no navegador
tests/experience.spec.ts  Interações da experiência em tela inteira
tests/static-export.spec.ts  Rotas, refresh, links, fontes e compartilhamento
public/images/            Imagem original e registro do prompt
public/fonts/             Licenças das fontes
scripts/preview.mjs       Servidor de arquivos para teste local
scripts/generate-social-image.mjs  Gera o PNG de compartilhamento no build
.github/workflows/pages.yml  Testes e publicação no GitHub Pages
playwright.config.ts     Configuração dos testes
```

## Como editar

- Textos de recursos, tecnologias, arquitetura, etapas, documentação e timeline: `src/data/project.ts`.
- Página inicial: `src/components/experience/`. Seções reutilizadas nas páginas detalhadas: `src/sections/Home.tsx`.
- Conteúdo específico: `src/app/<rota>/page.tsx`.
- Identidade, fontes, cenas e comportamento responsivo da apresentação: `src/app/experience.css`. Base dos componentes detalhados: `globals.css` e `editorial.css`.
- Dados fictícios de computadores: função `machines` em `DashboardDemo.tsx`.
- Frases e etapas de simulação: `Simulations.tsx` e `useSimulation.ts`.
- Títulos e descrições: exportação `metadata` de cada página e `src/app/layout.tsx`.
- Imagem social: `scripts/generate-social-image.mjs`, gerada em `public/images/social-preview.png`; ícone: `src/app/icon.svg`.
- Endereço de publicação: `NEXT_PUBLIC_BASE_PATH` e `NEXT_PUBLIC_SITE_URL`. O workflow detecta os valores reais do GitHub Pages.

O exemplo de consulta de IA é independente das métricas do dashboard, para reproduzir os exemplos de apresentação. A visão geral mostra 25 máquinas; os laboratórios demonstrativos possuem 24 e 20 estações e não representam a soma da visão geral.

## Links e dados pendentes do autor

- URL do repositório GitHub.
- E-mail ou endereço público de contato.
- Domínio final do site.
- Documentação operacional completa, endpoints e parâmetros de instalação do sistema real.

GitHub e contato aparecem como texto indicando que ainda serão informados, sem links `#` falsos. Para ativá-los, substitua os placeholders em `src/app/sobre/page.tsx` e `src/components/Footer.tsx` por links reais. Não inclua informações acadêmicas adicionais sem confirmação do autor.

## Comandos npm

```bash
npm run dev        # Servidor local de desenvolvimento
npm run build      # Exportar o site estático para out/
npm start          # Prévia local de out/ na porta 3001
npm run preview    # Mesmo comando da prévia
npm run lint       # Verificar regras de código
npm run typecheck  # Verificar TypeScript
npm run audit:dependencies  # Consultar vulnerabilidades conhecidas
npm run check:publication   # Inspecionar código e exportação antes de publicar
npm run format     # Formatar arquivos do projeto
npm test           # Inicia a prévia na porta 4173 e testa a exportação
```

Execute `npm run build` antes de `npm test`. No Windows, os testes usam Microsoft Edge; no Linux do GitHub Actions, Chromium. Em outro ambiente, instale Chromium com `npx playwright install chromium` e use `PLAYWRIGHT_BROWSER_CHANNEL=chromium`. A prévia de teste abre em `http://127.0.0.1:4173/siteadam/`. `PLAYWRIGHT_BASE_URL` permite apontar para outra prévia já iniciada, sempre incluindo a subpasta do site.

Os testes verificam as sete rotas, metadata, erros JavaScript, pontos clicáveis da abertura, reorganização das máquinas, etapas de rolagem, pausa, indicadores, comandos, IA e voz. Também cobrem seleção e busca de computadores, filtros, laboratórios, seleção múltipla, arquitetura, documentação pesquisável, menu mobile e ausência de overflow horizontal em 1920, 1440, 1366, 1024, 768, 390 e 320 pixels. Para testar outra porta, defina `PLAYWRIGHT_BASE_URL`.

## Publicar

Leia também a [revisão de segurança e pendências de atualização](docs/SECURITY-REVIEW.md).

O endereço deste projeto é **https://ronycorrea.github.io/siteadam/**. Para a publicação manual pela branch `gh-pages`:

1. Em **Settings → Pages**, selecione **Deploy from a branch → gh-pages → / (root)**.
2. Execute `npm run deploy`. O comando gera `out/`, verifica a exportação e publica com `.nojekyll`, necessário para o GitHub servir os estilos e scripts em `_next/`.
3. Aguarde a conclusão da publicação no GitHub e confira o site.

Para somente gerar os arquivos, execute `npm run build`; isso não publica nada. O fluxo alternativo por GitHub Actions continua disponível e está explicado em [docs/GITHUB-PAGES.md](docs/GITHUB-PAGES.md).

O site publicado não requer processo Node ou Python, banco de dados ou backend do A.D.A.M. `npm start` é apenas uma prévia local de arquivos; `npm run deploy` envia a exportação ao GitHub.

## Acessibilidade e escopo

HTML semântico, idioma `pt-BR`, navegação por teclado, foco visível, link para pular ao conteúdo, rótulos para controles e estados com texto além da cor. Movimento reduzido desativa animações decorativas e variação periódica dos gráficos. As etapas de simulação continuam indicando progresso textual.

A busca e as seleções não são persistidas ao recarregar. Nenhum comando real, microfone ou serviço de IA é acessado. Afirmações de segurança descrevem o projeto apresentado, sem promessas absolutas.
