import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteMotion } from "@/components/SiteMotion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { HeroEntrance } from "@/components/HeroEntrance";
import { MotionToggle } from "@/components/MotionToggle";
import { ProcessStepper } from "@/components/ProcessStepper";
import { SITE, whatsappUrl } from "@/lib/site";
import hero from "./Hero.module.css";
import { DesktopOrbs } from "@/components/DesktopOrbs";
import { DeadlineCounter } from "@/components/DeadlineCounter";
import desktop from "@/components/DesktopVisuals.module.css";

const directContact = whatsappUrl(
  "Olá, Gabriel! Vi seu site e gostaria de conversar sobre a criação de um site para o meu negócio."
);

const questionsContact = whatsappUrl(
  "Olá, Gabriel! Vi seu site e tenho algumas dúvidas antes de iniciar um projeto."
);

const faq = [
  { question: "E se eu ainda não tiver logo ou materiais?", answer: "Alinhamos os materiais necessários antes do início. Criação de logo e serviços adicionais não estão incluídos automaticamente." },
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
      <HeroEntrance />
      <SmoothScroll />
      <main id="conteudo" className={desktop.page}>
        <DesktopOrbs />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <section className={`hero-v3 ${hero.hero}`} aria-labelledby="hero-title" data-hero>
          <div className={hero.shell}>
          <div className={hero.topline} data-hero-part="0">
            <span>Criação de sites com atendimento online</span>
            <MotionToggle />
          </div>

          <div className={hero.grid}>
            <div className={hero.primary}>
              <h1 id="hero-title" className={hero.title} aria-label="Seu site pronto em até 7 dias úteis.">
                <span className={hero.line} data-hero-part="0">Seu site pronto</span>{" "}
                <span className={hero.line} data-hero-part="1">em até <span className={hero.delivery}>7 dias úteis</span></span>
              </h1>

              <div className={hero.copy} data-hero-part="2">
                <p>
                  Landing pages e sites institucionais para apresentar sua empresa e facilitar pedidos de orçamento.
                </p>

                <div className={hero.actions}>
                  <a className="button button-primary button-action" href={directContact} target="_blank" rel="noreferrer">
                    Conversar pelo WhatsApp
                  </a>
                  <Link className="button button-secondary button-arrow" href="/projeto/">
                    Contar meu projeto em 3 etapas
                  </Link>
                </div>
              </div>
            </div>

            <aside className={hero.proof} aria-label="Prazo do primeiro conceito visual" data-hero-part="2">
              <p className={hero.kicker}>Primeiro conceito visual</p>
              <div className={hero.proofMain}>
                <DeadlineCounter className={hero.value} numberClassName={hero.counter} />
                <p className={hero.side}>
                  Domínio + hospedagem
                  <br />
                  incluídos no 1º ano
                </p>
              </div>
            </aside>
          </div>
          </div>
        </section>

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
                  <p>Organizo o conteúdo e a apresentação do site.</p>
                </article>
                <article>
                  <h3>Desenvolvimento responsivo</h3>
                  <p>Adapto as páginas para celular e computador.</p>
                </article>
                <article>
                  <h3>Contato e conversão</h3>
                  <p>Integro os botões de contato ao WhatsApp.</p>
                </article>
                <article>
                  <h3>Publicação</h3>
                  <p>Configuro domínio e hospedagem e publico o site.</p>
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
              <div className="format-list">
                <article className="format-row"><div><h3>Landing page</h3><p>Oferta, funcionamento e contato.</p></div><span>Demonstrativo</span><Link className="format-link" href="/demonstracoes/landing-page/">Ver estrutura <span aria-hidden="true">↗</span></Link></article>
                <article className="format-row"><div><h3>Site institucional</h3><p>Empresa, serviços e contato.</p></div><span>Demonstrativo</span><Link className="format-link" href="/demonstracoes/institucional/">Ver estrutura <span aria-hidden="true">↗</span></Link></article>
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
                  </div>

                  <div className="pricing-card-section">
                    <ul>
                      <li>Apresentação da oferta e do que está incluído</li>
                      <li>Etapas e condições para contratar</li>
                      <li>Botões de contato pelo WhatsApp</li>
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
                  </div>

                  <div className="pricing-card-section">
                    <ul>
                      <li>Páginas para empresa, serviços e contato</li>
                      <li>Menu de navegação entre as páginas</li>
                      <li>Botões de contato pelo WhatsApp</li>
                    </ul>
                  </div>

                  <Link className="pricing-card-cta" href="/projeto/?formato=institucional">
                    Solicitar orçamento <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              </div>

              <div className="pricing-included">
                <p>Nos dois formatos: design personalizado e responsivo, domínio e hospedagem por 1 ano.</p>
              </div>
              <div className="commercial-conditions">
                <article><span>Pagamento inicial</span><strong>Pix</strong><p>Valor final e escopo combinados antes do início.</p></article>
                <article>
                  <span>Renovação a partir do 2º ano</span>
                  <strong>R$ 300/ano</strong>
                  <p>Domínio e hospedagem. Pagamento por Pix ou cartão.</p>
                </article>
                <article>
                  <span>Titularidade do domínio</span>
                  <strong>Registrado em seu nome</strong>
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
                  <p>Sou Gabriel Justin e cuido do seu projeto até a publicação.</p>
                </div>

                <div className="about-method">
                  <p>A apresentação do site parte do seu conteúdo e do objetivo definido.</p>
                </div>
              </div>


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
            <p>Prepare seu pedido de orçamento.</p>
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
