import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteMotion } from "@/components/SiteMotion";
import { ProcessStepper } from "@/components/ProcessStepper";
import { SITE, whatsappUrl } from "@/lib/site";

const directContact = whatsappUrl(
  "Olá, Gabriel! Vi seu site e gostaria de conversar sobre a criação de um site para o meu negócio."
);

const questionsContact = whatsappUrl(
  "Olá, Gabriel! Vi seu site e tenho algumas dúvidas antes de iniciar um projeto."
);

const faq = [
  { question: "Como é feito o pagamento?", answer: "O projeto inicial é pago por Pix, com valor e escopo combinados antes do início. A renovação anual de domínio e hospedagem, a partir do segundo ano, pode ser paga por Pix ou cartão." },
  { question: "Quanto custa cada formato?", answer: "A landing page profissional custa de R$ 600 a R$ 900. O site institucional, com até cinco páginas, custa de R$ 1.000 a R$ 1.600. O valor final depende do escopo combinado." },
  { question: "E se eu ainda não tiver logo ou materiais?", answer: "Conte o que você já possui. Os materiais necessários são alinhados antes do início; criação de logo e serviços adicionais não estão incluídos automaticamente." },
  {
    question: "Qual é a diferença entre uma landing page e um site institucional?",
    answer:
      "A landing page concentra a comunicação em uma única página e funciona bem para um serviço, campanha ou oferta específica. O site institucional organiza a empresa em até cinco páginas, com espaço para apresentar serviços, informações e contato de forma mais completa.",
  },
  {
    question: "Quando começa a contar o prazo de entrega?",
    answer:
      "O prazo começa após a confirmação do projeto e o recebimento dos materiais necessários para iniciar, como informações da empresa, textos disponíveis, logo e imagens que já existirem.",
  },
  {
    question: "O domínio fica no meu nome?",
    answer:
      "Sim. O domínio é registrado em seu nome e fica vinculado ao seu negócio.",
  },
  {
    question: "O que acontece depois do primeiro ano?",
    answer:
      "O primeiro ano de domínio e hospedagem está incluído no valor do projeto. A partir do segundo ano, a renovação desses dois itens custa R$ 300 por ano, com pagamento por Pix ou cartão.",
  },
];

export const metadata = { alternates: { canonical: "/" } };

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": `${SITE.url}/#gabriel`, name: SITE.name, url: SITE.url, telephone: "+5551984402298" },
    { "@type": "WebSite", "@id": `${SITE.url}/#website`, url: SITE.url, name: SITE.name, inLanguage: "pt-BR", publisher: { "@id": `${SITE.url}/#gabriel` } },
    ...[
      { name: "Landing page profissional", id: "landing-page", minPrice: 600, maxPrice: 900 },
      { name: "Site institucional de até cinco páginas", id: "institucional", minPrice: 1000, maxPrice: 1600 },
    ].map((service) => ({
      "@type": "Service", "@id": `${SITE.url}/#${service.id}`,
      name: service.name, provider: { "@id": `${SITE.url}/#gabriel` },
      offers: { "@type": "Offer", url: `${SITE.url}/#valores`, priceSpecification: { "@type": "PriceSpecification", priceCurrency: "BRL", minPrice: service.minPrice, maxPrice: service.maxPrice } },
    })),
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <SiteMotion />
      <main id="conteudo">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <section className="hero-v3" aria-labelledby="hero-title">
          <div className="shell">
          <div className="hero-topline hero-enter">
            <span>Criação de sites com atendimento online</span>
          </div>

          <div className="hero-grid">
            <div className="hero-primary">
              <h1 id="hero-title" className="hero-title-v3" aria-label="Seu site pronto em até 7 dias úteis.">
                <span className="hero-line"><span>Seu site pronto</span></span>
                <span className="hero-line"><span>em até</span></span>
                <span className="hero-line hero-line-accent"><span>7 dias úteis</span></span>
              </h1>

              <p className="hero-deadline-note">Prazo contado após a confirmação do projeto e o recebimento dos materiais necessários.</p>
              <div className="hero-copy-grid hero-enter delay-2">
                <p>
                  Landing pages e sites institucionais para apresentar sua empresa e facilitar pedidos de orçamento.
                </p>

                <div className="hero-actions">
                  <a className="button button-primary button-action" href={directContact} target="_blank" rel="noreferrer">
                    Conversar pelo WhatsApp
                  </a>
                  <Link className="button button-secondary button-arrow" href="/projeto/">
                    Contar meu projeto em 3 etapas
                  </Link>
                </div>
              </div>
            </div>

            <aside className="hero-proof-editorial hero-enter delay-2" aria-label="Prazo do primeiro conceito visual">
              <p className="hero-proof-kicker">Primeiro conceito visual em até</p>
              <div className="hero-proof-main">
                <strong className="hero-proof-value">48h</strong>
                <span className="hero-proof-divider" aria-hidden="true" />
                <p className="hero-proof-side">
                  Domínio + hospedagem
                  <br />
                  incluídos no 1º ano
                </p>
              </div>
            </aside>
          </div>
          </div>
        </section>

        <div className="commercial-band">
        <section className="commercial-strip shell reveal-section" aria-label="Informações principais">
          <div className="commercial-strip-item">
            <span>Primeiro conceito visual</span>
            <strong>Em até 48h</strong>
          </div>
          <div className="commercial-strip-item">
            <span>Prazo de entrega</span>
            <strong>Até 7 dias úteis</strong>
          </div>
          <div className="commercial-strip-item">
            <span>Domínio + hospedagem</span>
            <strong>1º ano incluído</strong>
          </div>
        </section>

        </div>
        <section className="section-base section-services reveal-section" id="servicos" aria-labelledby="services-title">
          <div className="shell editorial-grid">
            <div className="section-rail">
              <p className="eyebrow">Serviços</p>
            </div>

            <div className="section-content">
              <header className="section-heading services-heading">
                <h2 id="services-title">Do planejamento à publicação.</h2>
              </header>

              <div className="service-capabilities">
                <article>
                  <h3>Direção visual</h3>
                  <p>Organizo o conteúdo e a apresentação do site de acordo com o seu negócio.</p>
                </article>
                <article>
                  <h3>Desenvolvimento responsivo</h3>
                  <p>Seu site adaptado para celular e computador, com leitura e navegação simples.</p>
                </article>
                <article>
                  <h3>Contato e conversão</h3>
                  <p>Botões de contato para facilitar pedidos de orçamento pelo WhatsApp.</p>
                </article>
                <article>
                  <h3>Publicação</h3>
                  <p>Configuro o domínio e a hospedagem e publico o site conforme o escopo combinado.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-formats reveal-section" id="formatos" aria-labelledby="formats-title">
          <div className="shell editorial-grid">
            <div className="section-rail">
              <p className="eyebrow">Formatos de site</p>
            </div>

            <div className="section-content">
              <header className="section-heading formats-heading">
                <h2 id="formats-title">Uma página ou até cinco, conforme o seu objetivo.</h2>
              </header>

              <div className="format-list">
                <article className="format-row">
                  <div>
                    <h3>Landing page</h3>
                    <p>Uma página focada em apresentar uma oferta, serviço ou campanha e levar o visitante ao contato.</p>
                  </div>
                  <span>1 página</span>
                  <a href="#valores" className="format-link">Ver valores <span aria-hidden="true">↘</span></a>
                </article>

                <article className="format-row">
                  <div>
                    <h3>Site institucional</h3>
                    <p>Até cinco páginas para apresentar sua empresa, seus serviços e as formas de contato.</p>
                  </div>
                  <span>Até 5 páginas</span>
                  <a href="#valores" className="format-link">Ver valores <span aria-hidden="true">↘</span></a>
                </article>
              </div>
            </div>
          </div>
        </section>


        <section className="section-base reveal-section" id="demonstracoes" aria-labelledby="examples-title">
          <div className="shell editorial-grid">
            <div className="section-rail"><p className="eyebrow">Demonstrações</p></div>
            <div className="section-content">
              <header className="section-heading"><h2 id="examples-title">Veja como o conteúdo pode ser organizado.</h2></header>
              <p className="form-note">Exemplos autorais de estrutura e conteúdo. Não representam clientes reais, projetos entregues ou resultados de vendas.</p>
              <div className="format-list">
                <article className="format-row"><div><h3>Landing page</h3><p>Uma oferta apresentada em uma página, com caminho direto para o contato.</p></div><span>Demonstrativo</span><Link className="format-link" href="/demonstracoes/landing-page/">Ver exemplo <span aria-hidden="true">↗</span></Link></article>
                <article className="format-row"><div><h3>Site institucional</h3><p>Uma prévia de como organizar empresa, serviços e contato.</p></div><span>Demonstrativo</span><Link className="format-link" href="/demonstracoes/institucional/">Ver exemplo <span aria-hidden="true">↗</span></Link></article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pricing reveal-section" id="valores" aria-labelledby="pricing-title">
          <div className="shell editorial-grid">
            <div className="section-rail">
              <p className="eyebrow">Valores</p>
            </div>

            <div className="section-content">
              <header className="section-heading pricing-heading">
                <h2 id="pricing-title">Investimento claro antes de começar.</h2>
              </header>

              <div className="pricing-cards">
                <article className="pricing-card">
                  <div className="pricing-card-top">
                    <div>
                      <h3>Landing page</h3>
                    </div>
                  </div>

                  <p className="pricing-card-summary">
                    Uma página para apresentar uma oferta e receber contatos.
                  </p>

                  <div className="pricing-card-price">
                    <span>A partir de</span>
                    <div><small>R$</small><strong>600</strong></div>
                    <p className="pricing-range">Investimento de R$ 600 a R$ 900, conforme o escopo.</p>
                  </div>

                  <div className="pricing-card-section">
                    <ul>
                      <li>Design personalizado e responsivo</li>
                      <li>Integração com WhatsApp</li>
                      <li>Domínio e hospedagem por 1 ano</li>
                      <li>Primeiro conceito visual em até 48h</li>
                    </ul>
                  </div>

                  <Link className="pricing-card-cta" href="/projeto/?formato=landing-page">
                    Solicitar orçamento <span aria-hidden="true">↗</span>
                  </Link>
                </article>

                <article className="pricing-card pricing-card-institutional">
                  <div className="pricing-card-top">
                    <div>
                      <h3>Site institucional</h3>
                    </div>
                  </div>

                  <p className="pricing-card-summary">
                    Até cinco páginas para apresentar sua empresa e organizar seus serviços.
                  </p>

                  <div className="pricing-card-price">
                    <span>A partir de</span>
                    <div><small>R$</small><strong>1.000</strong></div>
                    <p className="pricing-range">Investimento de R$ 1.000 a R$ 1.600 para até cinco páginas, conforme o escopo.</p>
                  </div>

                  <div className="pricing-card-section">
                    <ul>
                      <li>Até cinco páginas organizadas</li>
                      <li>Navegação completa entre páginas</li>
                      <li>Design personalizado e responsivo</li>
                      <li>Domínio e hospedagem por 1 ano</li>
                    </ul>
                  </div>

                  <Link className="pricing-card-cta" href="/projeto/?formato=institucional">
                    Solicitar orçamento <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              </div>

              <p className="form-note pricing-payment">Investimento inicial: pagamento por Pix. O valor final é combinado antes do início, conforme o escopo. Domínio e hospedagem estão incluídos no primeiro ano.</p>
              <div className="commercial-conditions">
                <article>
                  <span>Renovação a partir do 2º ano</span>
                  <strong>R$ 300/ano</strong>
                  <p>Valor anual para renovar domínio e hospedagem. Pagamento por Pix ou cartão.</p>
                </article>
                <article>
                  <span>Titularidade do domínio</span>
                  <strong>Registrado em seu nome</strong>
                  <p>O domínio fica vinculado ao cliente, não ao prestador do serviço.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-process reveal-section" id="processo" aria-labelledby="process-title">
          <div className="shell editorial-grid">
            <div className="section-rail">
              <p className="eyebrow">Processo</p>
            </div>

            <div className="section-content">
              <header className="section-heading process-heading-v3">
                <h2 id="process-title">Como o projeto acontece.</h2>
              </header>

              <ProcessStepper />

              <p className="timeline-note">Os prazos começam após a confirmação do projeto e o recebimento dos materiais necessários.</p>
            </div>
          </div>
        </section>

        <section className="section-about reveal-section" id="sobre" aria-labelledby="about-title">
          <div className="shell editorial-grid">
            <div className="section-rail">
              <p className="eyebrow">Sobre</p>
            </div>

            <div className="section-content about-content">
              <header className="section-heading about-heading">
                <h2 id="about-title">Seu projeto, direto comigo.</h2>
              </header>

              <div className="about-copy-grid">
                <div className="about-lead">
                  <p>Sou Gabriel Justin. Desenvolvo landing pages e sites institucionais e cuido do projeto até a publicação.</p>
                  <p>Organizo o conteúdo, desenvolvo as páginas e cuido do domínio e da hospedagem dentro do escopo combinado.</p>
                </div>

                <div className="about-method">
                  <p>Você fala diretamente comigo durante o projeto. A apresentação do site parte do seu negócio, do conteúdo e do objetivo definido.</p>
                </div>
              </div>

              <dl className="about-facts-v3">
                <div><dt>Atendimento</dt><dd>Direto comigo</dd></div>
                <div><dt>Formato</dt><dd>Online</dd></div>
                <div><dt>Projeto</dt><dd>Até a publicação</dd></div>
                <div><dt>Prioridade</dt><dd>Fácil de usar no celular</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section-faq reveal-section" id="faq" aria-labelledby="faq-title">
          <div className="shell editorial-grid">
            <div className="section-rail">
              <p className="eyebrow">Dúvidas</p>
            </div>

            <div className="section-content">
              <header className="section-heading faq-heading">
                <h2 id="faq-title">Antes de começar.</h2>
              </header>

              <div className="faq-list">
                {faq.map((item) => (
                  <details className="faq-item" key={item.question}>
                    <summary>
                      <strong>{item.question}</strong>
                      <i aria-hidden="true">+</i>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>

              <a className="editorial-link faq-contact" href={questionsContact} target="_blank" rel="noreferrer">
                Tenho outra dúvida <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="final-cta reveal-section" id="contato" aria-labelledby="start-title">
          <div className="shell">
          <div className="final-cta-index">
            <span>Começar</span>
          </div>

          <h2 id="start-title">Conte sobre o site que sua empresa precisa.</h2>

          <div className="final-cta-grid">
            <p>Conte sobre o negócio, o objetivo do site e suas referências em três etapas.</p>
            <div className="brief-actions">
              <Link className="button button-primary button-action" href="/projeto/">Contar meu projeto em 3 etapas</Link>
              <a className="button button-secondary button-arrow" href={directContact} target="_blank" rel="noreferrer">
                Ir direto para o WhatsApp
              </a>
            </div>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
