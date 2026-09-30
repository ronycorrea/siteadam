# Publicar o A.D.A.M. no GitHub Pages

O site usa `output: "export"`, `trailingSlash: true` e imagens sem otimização em tempo de requisição. Depois do build, `out/` contém o site completo: HTML, CSS, JavaScript, fontes, imagens e arquivos de navegação. O visitante não precisa de Node.js ou Python; as animações e simulações continuam no navegador.

## Conferir localmente

Com Node.js 24 instalado, execute na pasta do projeto:

```bash
npm ci
npm run lint
npm run build
npm run audit:dependencies
npm run check:publication
npm test
npm start
```

Abra **http://localhost:3001/siteadam/**. A prévia serve somente `out/`, monta a subpasta encontrada na compilação e retorna 404 para caminhos inexistentes. Não há renderização Next em tempo de execução nem fallback que devolve a página inicial para qualquer endereço. Os testes iniciam essa mesma prévia na porta 4173 e a encerram ao terminar.

`npx serve out` sozinho monta os arquivos na raiz; não reproduz a montagem em `/siteadam/`. Por isso este projeto fornece `npm start` para o teste com o endereço correto. Não abra o HTML com duplo clique: a navegação precisa de um servidor HTTP de arquivos.

Para conferir num celular na mesma rede Wi-Fi:

```bash
npm run preview -- --host 0.0.0.0 --port 3001
```

Encerre antes outra prévia que esteja usando a porta 3001. No celular, use `http://IP-DO-COMPUTADOR:3001/siteadam/`. O firewall do Windows precisa permitir essa conexão na rede privada. Esse comando é para teste local, não para expor o computador à internet.

## Publicação manual usada neste repositório

Endereço: **https://ronycorrea.github.io/siteadam/**.

Em **Settings → Pages**, mantenha **Deploy from a branch → gh-pages → / (root)**. Na pasta do projeto, execute:

```bash
npm run deploy
```

O `predeploy` gera novamente `out/` e executa a verificação de publicação. Só depois o `gh-pages` envia essa pasta, com a opção `--nojekyll`. Esse comando publica de verdade; para apenas gerar e conferir os arquivos, execute `npm run build` e `npm run check:publication`.

O `.nojekyll` precisa estar na raiz da branch publicada. Ter apenas `public/.nojekyll` no código ou `out/.nojekyll` no computador não basta: o `gh-pages` ignora arquivos iniciados por ponto por padrão. Sem esse marcador, o processamento Jekyll ignora `_next/`, causando 404 nos arquivos de CSS e JavaScript e deixando o site sem layout e interações.

A URL pública já é o padrão dos metadados. Se usar `.env.local` ou `.env.production`, não sobrescreva `NEXT_PUBLIC_SITE_URL` com localhost na compilação que será publicada.

## Alternativa: publicação por GitHub Actions

1. Crie ou use o repositório no GitHub. Coloque `package.json`, `src/` e `.github/` na raiz dele.
2. Envie os arquivos do projeto, incluindo `package-lock.json`. Mantenha `.gitignore`; `node_modules/`, `.next/`, `out/`, resultados dos testes e variáveis locais não entram no repositório.
3. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
4. Abra **Actions → Validar e publicar no GitHub Pages → Run workflow**. Novos pushes em `main` também acionam esse workflow. Se sua branch principal tiver outro nome, ajuste `branches` em `.github/workflows/pages.yml`.
5. Aguarde os jobs `build` e `deploy`. A URL pública aparece no ambiente `github-pages` e em Settings → Pages.

O workflow instala as versões do lockfile, consulta vulnerabilidades, verifica o código, gera o site, examina a exportação, instala Chromium, executa os testes sobre `out/` e envia somente essa pasta ao Pages. Vulnerabilidades altas/críticas, suspeitas de credenciais na exportação e falhas no build ou nos testes impedem o job de publicação. As permissões de publicação ficam limitadas ao job `deploy`; não é necessário adicionar uma chave da OpenAI ou um token pessoal.

Consulte a [revisão de segurança](SECURITY-REVIEW.md), incluindo a pendência de atualização anunciada pelo Next.js. A consulta de vulnerabilidades deve ser repetida no momento da publicação.

## Repositório, subpasta e domínio próprio

O padrão local é `/siteadam`. No GitHub, `actions/configure-pages` informa os valores reais ao build:

| Variável                | Repositório de projeto                    | Domínio próprio ou repositório `usuario.github.io` |
| ----------------------- | ----------------------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_BASE_PATH` | `/siteadam` ou o nome real do repositório | vazio                                              |
| `NEXT_PUBLIC_SITE_URL`  | `https://usuario.github.io/siteadam`      | URL pública, como `https://exemplo.com`            |

Não é preciso editar o código para outro nome de repositório. Para simular um endereço manualmente, copie `.env.example` para `.env.local`, ajuste os dois valores e execute um novo build. O caminho base é fixado na compilação. Os testes usam o mesmo `NEXT_PUBLIC_BASE_PATH`; o Playwright carrega `.env.local` assim como o Next.

O `basePath` é aplicado automaticamente aos componentes `Link`. Os arquivos públicos usam `assetPath()`. As fontes são referências relativas no CSS e são empacotadas com o prefixo correto. O manifesto define `start_url`, `scope` e ícone dentro da subpasta.

O `postbuild` executa `scripts/finalize-export.mjs`. Na versão 16.3.7, o exportador do Next usa separadores do Windows em alguns nomes de arquivos de navegação, enquanto o navegador solicita nomes com pontos. O script normaliza somente esses arquivos dentro de `out/`. Em uma exportação já correta, incluindo o build Linux do GitHub Actions, não há renomeações. Nenhuma regra especial de servidor é necessária para compensar o problema.

`scripts/generate-social-image.mjs` produz um PNG de 1200 × 630 antes do build. As tags Open Graph e Twitter usam uma URL absoluta, com domínio e subpasta corretos. O padrão é `https://ronycorrea.github.io/siteadam`; o workflow pode fornecer outro domínio. Não publique uma compilação que tenha localhost nas tags de compartilhamento.

## O que conferir depois da publicação

- Abra a página inicial e as seis páginas internas; atualize uma página interna e abra seu endereço numa nova aba.
- Confira fontes, imagem da abertura, ícone, menu, capítulos de rolagem e simulações.
- Confira `images/social-preview.png` e `manifest.webmanifest` sob a subpasta pública.
- Ative **Enforce HTTPS** em Settings → Pages quando disponível. Confirme a navegação pelo endereço HTTPS final.
- A prévia local verifica o PNG e as tags. A miniatura efetiva no WhatsApp ou LinkedIn só pode ser conferida depois de haver uma URL pública; esses serviços também podem manter imagens em cache.

A geração local não publica arquivos. O envio acontece apenas ao executar `npm run deploy` ou ao acionar o workflow configurado no GitHub.

## Referências oficiais

- [Exportação estática do Next.js](https://nextjs.org/docs/app/guides/static-exports)
- [Comportamento de basePath para links e imagens](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)
- [Workflows personalizados do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
