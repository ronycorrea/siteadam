# Revisão para publicação — 30/09/2026

Escopo: código atual, configurações, arquivos de ambiente presentes e exportação estática em `out/`. O site ainda não foi publicado; DNS, conta do GitHub, HTTPS e respostas da hospedagem não puderam ser verificados em um domínio público. Esta revisão não é uma garantia de ausência de vulnerabilidades.

## Credenciais e variáveis públicas

- O único arquivo de ambiente presente na revisão foi `.env.example`, com valores de demonstração.
- `NEXT_PUBLIC_BASE_PATH` contém a subpasta de publicação. `NEXT_PUBLIC_SITE_URL` informa o endereço público usado nos metadados. Nenhuma das duas é uma credencial.
- A inspeção do código não encontrou integração operacional com OpenAI, banco de dados, servidor Python, autenticação ou API externa.
- A busca por padrões de chaves privadas, tokens e credenciais no código/configuração e nos textos exportados não encontrou correspondências. Nenhum valor potencialmente secreto é exibido pelo verificador.
- `.gitignore` exclui os arquivos `.env*`, exceto o exemplo. Somente `out/` é enviado pelo workflow ao Pages.

`NEXT_PUBLIC_` permite que uma referência à variável seja substituída pelo seu valor na compilação. Remover esse prefixo não é suficiente se o próprio código copiar um segredo para HTML, propriedades de componentes ou arquivos públicos. Neste projeto não há necessidade de credenciais de serviços. Segredos usados exclusivamente por ferramentas de build/CI podem permanecer no ambiente da automação, mas não devem aparecer na exportação ou no repositório.

O scanner usa padrões conhecidos e uma lista de variáveis públicas permitidas; ele pode não reconhecer credenciais arbitrárias ou ofuscadas. Não foi feita auditoria de histórico Git ou de serviços externos.

## Bibliotecas e dependências

Framer Motion e os demais componentes são instalados pelo npm e empacotados localmente. O HTML exportado não referencia scripts remotos de CDN. As fontes também são locais. O workflow usa `npm ci` e o lockfile.

Na consulta desta revisão, `npm audit --json` retornou **zero vulnerabilidades conhecidas** em todas as severidades. O registro npm informou Next.js e eslint-config-next 16.3.7 e React 19.3.0 como versões atuais. Não houve motivo para executar `npm audit fix`; correções de dependências devem ser avaliadas e testadas.

**Pendência temporal:** o mantenedor anunciou nove correções para 30/09/2026, previstas para Next.js 16.3.8. A consulta explícita a `next@16.3.8` retornou 404 no npm durante esta revisão. É necessário rever esse aviso e aplicar a versão corrigida quando publicada, com novo build e testes. O anúncio ainda não detalhava as versões afetadas e o impacto de cada falha; não foi presumido que todas afetem, ou que nenhuma afete, esta exportação.

O Next.js só participa da geração dos arquivos deste site; não há servidor Next ou otimizador de imagens em execução no GitHub Pages. Isso reduz a superfície de ataque de execução no servidor, mas não elimina a necessidade de manter as ferramentas atualizadas.

## Formulários e tráfego

Os dois formulários são as demonstrações de conversa com IA, na abertura e na página de demonstração. Seus handlers chamam `preventDefault()` e alteram estado local por timers. Não há formulário de contato nem endpoint de envio configurado.

O teste `tests/privacy.spec.ts` exercita os formulários e a voz, verifica as respostas locais e falha se houver requisição fora da origem, método diferente de GET/HEAD ou chamada ao microfone. Durante o teste, tráfego externo e envios são bloqueados antes de sair do navegador. As requisições GET do Next para arquivos de navegação continuam permitidas.

## Verificações automáticas adicionadas

```bash
npm run audit:dependencies
npm run check:publication
npm test
```

- `audit:dependencies`: bloqueia o workflow se o npm informar vulnerabilidade alta ou crítica, incluindo dependências de desenvolvimento. Uma indisponibilidade da consulta também impede avançar silenciosamente.
- `check:publication`: exige uma exportação existente e verifica padrões de credenciais, variáveis públicas inesperadas, scripts remotos, formulários externos e arquivos privados/de desenvolvimento em `out/`.
- O teste de privacidade integra a suíte de navegador executada antes da publicação.

## HTTPS na hospedagem

O GitHub Pages fornece suporte a HTTPS, mas a configuração final precisa ser conferida. Em **Settings → Pages**, habilite **Enforce HTTPS** quando disponível. Em domínio próprio, a configuração DNS e a emissão do certificado precisam estar concluídas. Verifique o endereço HTTPS público e o redirecionamento de HTTP depois de publicar.

As simulações desta revisão ocorreram em localhost; não validam um certificado de produção. O teste de scripts e fontes locais ajuda a evitar conteúdo misto, mas a validação no domínio final continua necessária.

## Fontes oficiais

- [Next.js: variáveis de ambiente e inclusão no navegador](https://nextjs.org/docs/app/guides/environment-variables)
- [Next.js: anúncio das correções de setembro de 2026](https://nextjs.org/blog/upcoming-nextjs-security-release-september-2026)
- [GitHub Pages: HTTPS e Enforce HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
