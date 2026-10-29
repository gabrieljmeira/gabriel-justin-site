import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteMotion } from "@/components/SiteMotion";
import { ProcessStepper } from "@/components/ProcessStepper";
import { whatsappUrl } from "@/lib/site";

const directContact = whatsappUrl(
  "Olá, Gabriel! Vi seu site e gostaria de conversar sobre a criação de um site para o meu negócio."
);

const landingContact = whatsappUrl(
  "Olá, Gabriel! Vi a opção de Landing Page no seu site e gostaria de conversar sobre o meu projeto."
);

const institutionalContact = whatsappUrl(
  "Olá, Gabriel! Vi a opção de Site Institucional no seu site e gostaria de conversar sobre o meu projeto."
);

const questionsContact = whatsappUrl(
  "Olá, Gabriel! Vi seu site e tenho algumas dúvidas antes de iniciar um projeto."
);

const faq = [
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
      "Sim. O domínio é registrado em nome do cliente. A ideia é que o endereço da empresa permaneça vinculado ao próprio negócio.",
  },
  {
    question: "O que acontece depois do primeiro ano?",
    answer:
      "Domínio e hospedagem estão incluídos no primeiro pagamento por um ano. A partir do segundo ano, a renovação desses dois itens custa R$ 300 por ano.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <SiteMotion />
      <main id="conteudo">
        <section className="hero-v3 shell" aria-labelledby="hero-title">
          <div className="hero-topline hero-enter">
            <span>Criação de sites para empresas</span>
            <span>Conceito em até 48h · site em até 7 dias úteis</span>
          </div>

          <div className="hero-grid">
            <div className="hero-primary">
              <h1 id="hero-title" className="hero-title-v3" aria-label="Seu site pronto em até 7 dias úteis.">
                <span className="hero-line"><span>Seu site pronto</span></span>
                <span className="hero-line"><span>em até</span></span>
                <span className="hero-line hero-line-accent"><span>7 dias úteis</span></span>
              </h1>

              <div className="hero-copy-grid hero-enter delay-2">
                <p>
                  Sites profissionais para apresentar melhor sua empresa, explicar seus serviços e facilitar o contato de novos clientes.
                </p>

                <div className="hero-actions">
                  <a className="button button-primary" href={directContact} target="_blank" rel="noreferrer">
                    Conversar pelo WhatsApp
                  </a>
                  <Link className="button button-secondary button-arrow" href="/projeto/">
                    Contar sobre meu projeto
                  </Link>
                </div>
              </div>
            </div>

            <aside className="hero-proof-editorial hero-enter delay-2" aria-label="Prazo do primeiro conceito visual">
              <p className="hero-proof-kicker">Primeiro conceito visual em até</p>
              <div className="hero-proof-main">
                <strong className="hero-proof-value"><span data-count="48">48</span>h</strong>
                <span className="hero-proof-divider" aria-hidden="true" />
                <p className="hero-proof-side">
                  Domínio + hospedagem
                  <br />
                  incluídos no 1º ano
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="commercial-strip shell reveal-section" aria-label="Informações principais">
          <a href="#valores" className="commercial-strip-item">
            <span>Landing page</span>
            <strong>A partir de R$ 600</strong>
          </a>
          <a href="#valores" className="commercial-strip-item">
            <span>Site institucional</span>
            <strong>A partir de R$ 1.000</strong>
          </a>
          <div className="commercial-strip-item">
            <span>Domínio + hospedagem</span>
            <strong>1º ano incluído</strong>
          </div>
        </section>

        <section className="section-base section-services reveal-section" id="servicos" aria-labelledby="services-title">
          <div className="shell editorial-grid">
            <div className="section-rail">
              <p className="eyebrow">Serviços</p>
            </div>

            <div className="section-content">
              <header className="section-heading">
                <h2 id="services-title">Dois formatos para necessidades diferentes.</h2>
              </header>

              <div className="service-list-v3" data-line-draw>
                <article className="service-item-v3">
                  <div className="service-title-line">
                    <h3>Landing page</h3>
                  </div>
                  <p>Para divulgar um serviço, campanha ou oferta específica e conduzir o visitante até o contato sem distrações.</p>
                </article>

                <article className="service-item-v3">
                  <div className="service-title-line">
                    <h3>Site institucional</h3>
                  </div>
                  <p>Para empresas que precisam apresentar melhor seus serviços, transmitir mais confiança e organizar as informações em um endereço próprio.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-elevated portfolio-section reveal-section" id="projetos" aria-labelledby="projects-title">
          <div className="shell editorial-grid">
            <div className="section-rail">
              <p className="eyebrow">Projetos</p>
            </div>

            <div className="section-content">
              <header className="section-heading projects-heading">
                <h2 id="projects-title">Como diferentes negócios podem ganhar forma.</h2>
              </header>

              <div className="concept-list">
                <article className="concept-project">
                  <div className="concept-meta">
                      <h3>Estética automotiva</h3>
                    <p>Serviços, galeria visual e orçamento rápido.</p>
                  </div>
                  <div className="concept-frame concept-auto" aria-label="Mockup conceitual de site para estética automotiva">
                    <div className="mock-browser">
                      <div className="mock-nav"><i /><i /><i /><span /></div>
                      <div className="mock-hero">
                        <div className="mock-copy"><b /><b /><em /><em /></div>
                        <div className="mock-media" />
                      </div>
                      <div className="mock-cards"><span /><span /><span /></div>
                    </div>
                  </div>
                </article>

                <article className="concept-project">
                  <div className="concept-meta">
                      <h3>Espaço de eventos</h3>
                    <p>Ambientes, ocasiões atendidas e pedido de orçamento.</p>
                  </div>
                  <div className="concept-frame concept-events" aria-label="Mockup conceitual de site para espaço de eventos">
                    <div className="mock-browser">
                      <div className="mock-nav"><i /><i /><i /><span /></div>
                      <div className="mock-hero">
                        <div className="mock-copy"><b /><b /><em /><em /></div>
                        <div className="mock-media" />
                      </div>
                      <div className="mock-cards"><span /><span /><span /></div>
                    </div>
                  </div>
                </article>

                <article className="concept-project">
                  <div className="concept-meta">
                      <h3>Clínica de estética</h3>
                    <p>Apresentação profissional, serviços e agendamento.</p>
                  </div>
                  <div className="concept-frame concept-clinic" aria-label="Mockup conceitual de site para clínica de estética">
                    <div className="mock-browser">
                      <div className="mock-nav"><i /><i /><i /><span /></div>
                      <div className="mock-hero">
                        <div className="mock-copy"><b /><b /><em /><em /></div>
                        <div className="mock-media" />
                      </div>
                      <div className="mock-cards"><span /><span /><span /></div>
                    </div>
                  </div>
                </article>
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
                    Para quem precisa divulgar um serviço, campanha ou oferta específica e conduzir o visitante direto até o contato.
                  </p>

                  <div className="pricing-card-price">
                    <span>A partir de</span>
                    <div><small>R$</small><strong>600</strong></div>
                  </div>

                  <div className="pricing-card-section">
                    <ul>
                      <li>Design personalizado e responsivo</li>
                      <li>Integração com WhatsApp</li>
                      <li>Domínio e hospedagem por 1 ano</li>
                      <li>Primeiro conceito visual em até 48 horas</li>
                    </ul>
                  </div>

                  <a className="pricing-card-cta" href={landingContact} target="_blank" rel="noreferrer">
                    Solicitar orçamento <span aria-hidden="true">↗</span>
                  </a>
                </article>

                <article className="pricing-card pricing-card-institutional">
                  <div className="pricing-card-top">
                    <div>
                      <h3>Site institucional</h3>
                    </div>
                  </div>

                  <p className="pricing-card-summary">
                    Para empresas que precisam apresentar melhor seus serviços, transmitir mais confiança e organizar o negócio em páginas próprias.
                  </p>

                  <div className="pricing-card-price">
                    <span>A partir de</span>
                    <div><small>R$</small><strong>1.000</strong></div>
                  </div>

                  <div className="pricing-card-section">
                    <span>Inclui</span>
                    <ul>
                      <li>Até cinco páginas organizadas</li>
                      <li>Navegação completa entre páginas</li>
                      <li>Design personalizado e responsivo</li>
                      <li>Domínio e hospedagem por 1 ano</li>
                    </ul>
                  </div>

                  <a className="pricing-card-cta" href={institutionalContact} target="_blank" rel="noreferrer">
                    Solicitar orçamento <span aria-hidden="true">↗</span>
                  </a>
                </article>
              </div>

              <div className="commercial-conditions" data-line-draw>
                <article>
                  <span>Depois do primeiro ano</span>
                  <strong>R$ 300/ano</strong>
                  <p>Renovação do domínio e da hospedagem a partir do segundo ano.</p>
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
                <h2 id="process-title">Um processo curto e visível do início ao site no ar.</h2>
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
                <h2 id="about-title">Especializado em sites objetivos para empresas.</h2>
              </header>

              <div className="about-copy-grid">
                <div className="about-lead">
                  <p>Desenvolvo landing pages e sites institucionais com foco em apresentação clara, navegação mobile e contato fácil.</p>
                  <p>Cuido da direção visual, desenvolvimento, domínio, hospedagem e publicação para que o projeto não dependa de vários fornecedores.</p>
                </div>

                <div className="about-method">
                  <p>O atendimento é direto comigo do primeiro contato até o site entrar no ar. Cada decisão visual parte do negócio, do conteúdo e do objetivo do projeto.</p>
                </div>
              </div>

              <dl className="about-facts-v3" data-line-draw>
                <div><dt>Atendimento</dt><dd>Direto comigo</dd></div>
                <div><dt>Conceito visual</dt><dd>Até 48 horas</dd></div>
                <div><dt>Entrega</dt><dd>Até 7 dias úteis</dd></div>
                <div><dt>Prioridade</dt><dd>Mobile-first</dd></div>
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
                <p>Respostas rápidas para as dúvidas mais comuns antes de iniciar um projeto.</p>
              </header>

              <div className="faq-list" data-line-draw>
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

        <section className="final-cta shell reveal-section" id="contato" aria-labelledby="start-title">
          <div className="final-cta-index">
            <span>Começar</span>
            <span>3 perguntas</span>
          </div>

          <h2 id="start-title">Conte sobre o site que sua empresa precisa.</h2>

          <div className="final-cta-grid">
            <p>Responda três perguntas para eu entender o negócio, o objetivo e a direção visual antes da conversa.</p>
            <div className="brief-actions">
              <Link className="button button-primary" href="/projeto/">Responder 3 perguntas</Link>
              <a className="button button-secondary button-arrow" href={directContact} target="_blank" rel="noreferrer">
                Ir direto para o WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
