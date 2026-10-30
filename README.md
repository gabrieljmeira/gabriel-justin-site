# Gabriel Justin

Site comercial estático em Next.js. Contato aprovado: **+55 51 98440-2298**.

## Desenvolvimento e verificação

Use Node.js 24 e npm.

- npm ci
- npm test
- npm run typecheck
- npm run build
- npm run verify
- npm run preview (http://127.0.0.1:4173)
- npm audit --audit-level=high
- npm run check:headers -- https://gabriel-justin-site.vercel.app

O servidor de preview serve a exportação e replica os cabeçalhos de vercel.json; não representa a CDN ou o desempenho de produção.

## Domínio e indexação

Enquanto o endereço canônico terminar em .vercel.app, as páginas usam noindex e o sitemap fica sem URLs. Previews da Vercel também permanecem noindex, inclusive se houver domínio personalizado. O formulário, a privacidade e as demonstrações permanecem noindex em todos os ambientes.

Quando o domínio definitivo for comprado:

1. Conectar e verificar o domínio no projeto correto da Vercel, com HTTPS válido.
2. Definir NEXT_PUBLIC_SITE_URL como a origem HTTPS definitiva, sem caminho ou parâmetros, e fazer novo build de produção. Essa variável é pública, não é uma credencial.
3. Verificar canonical, og:url, imagem social, robots, sitemap e meta robots. A home só será indexável no domínio definitivo fora do ambiente preview.
4. Configurar os redirecionamentos dos aliases de produção de forma a não afetar previews.
5. Validar a URL definitiva e o sitemap no Search Console. Não submeter URLs imutáveis de deployments.

A configuração vive em lib/site.ts e lib/seo.ts. Não adicionar Disallow geral: os robôs precisam acessar as páginas para ler noindex.

## Condições comerciais

Landing page: R$ 600–900. Institucional: até cinco páginas, R$ 1.000–1.600. Domínio/hospedagem no primeiro ano; renovação R$ 300/ano. Domínio no nome do cliente, projeto inicial pago por Pix e renovação anual por Pix ou cartão, conceito em até 48h e entrega em até sete dias úteis após confirmação e materiais. Não adicionar garantias ou serviços sem aprovação.

## Briefing e privacidade

Sem opção de rascunho, respostas ficam apenas em memória. O visitante pode optar por sessionStorage nesta aba, com expiração em duas horas sem alterações e remoção acessível. Rascunhos são validados por versão, formato, tamanho, etapa e prazo; o navegador pode bloquear ou restaurar sessões segundo suas próprias regras.

As respostas são incluídas na URL do WhatsApp quando o visitante abre o link, antes da confirmação do envio. O usuário pode revisar/copiar o texto e utilizar o número visível caso o aplicativo não abra. Nunca registrar respostas, parâmetros de mensagem ou conteúdo do clipboard em analytics. O código atual não inclui analytics.

## Demonstrações

As duas páginas /demonstracoes/ são exemplos autorais de organização de conteúdo, claramente identificados. Não são clientes, projetos entregues ou resultados comerciais. Não substituir essa identificação por depoimentos fictícios.

## Segurança e manutenção

CI valida o lockfile, dependências, testes, tipos, exportação, termos comerciais e links. Cabeçalhos são configurados em vercel.json. A CSP limita objetos, base, enquadramento e envio de formulários; não é uma política estrita de scripts. HTTPS/HSTS e o cache efetivo devem ser verificados no host real.

Design: direção A — Editorial direto, com Newsreader, Inter e a paleta existente. O primeiro conceito visual em até 48h mantém o destaque verde da hero; entrega em até sete dias úteis e condições de início continuam explícitas. A faixa repetida foi consolidada, as condições de pagamento ficam junto da comparação de preços e a privacidade tem fluxo de leitura próprio. As demonstrações continuam sendo exemplos textuais de estrutura; novas demonstrações visuais ficam para outra etapa.

CSS: regras por componente e breakpoints foram consolidados em app/globals.css. O menu móvel usa uma camada fixa com rolagem própria, sem herdar o bloco de referência do blur do header. Preserva Escape, restauração de foco, conteúdo de fundo inerte e limpeza na mudança para desktop. O processo mantém seleção de etapas e navegação por setas/Home/End, exibindo todos os nomes.

As animações usam IntersectionObserver e Web Animations, com reveal de 240ms e deslocamento de 10px. Os títulos permanecem na árvore de acessibilidade; há limpeza ao navegar ou mudar a preferência de movimento. A hero é legível imediatamente. Não foram adicionadas dependências de animação.

A imagem de compartilhamento é gerada em public/social.png antes do build, com extensão PNG para que o host entregue o tipo de conteúdo correto. A fonte visual está em scripts/generate-social-image.mjs.
