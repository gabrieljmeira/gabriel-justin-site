import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { whatsappUrl } from "@/lib/site";

const directContact = whatsappUrl(
  "Olá, Gabriel! Vi seu site e gostaria de conversar sobre a criação de um site para o meu negócio."
);

const quoteContact = whatsappUrl(
  "Olá, Gabriel! Gostaria de solicitar um orçamento para criação de site."
);

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <section className="hero-v3 shell" aria-labelledby="hero-title">
          <div className="hero-v3-top hero-enter">
            <span>Criação de sites</span>
            <span>Landing pages + sites institucionais</span>
          </div>

          <div className="hero-v3-grid">
            <div className="hero-v3-main">
              <h1 id="hero-title" className="hero-v3-title" aria-label="Seu site pronto em até 7 dias úteis.">
                <span className="title-line">
                  <span className="title-line-inner">Seu site pronto</span>
                </span>
                <span className="title-line title-line-accent">
                  <span className="title-line-inner title-delay">em até 7 dias úteis.</span>
                </span>
              </h1>

              <div className="hero-v3-bottom hero-enter delay-2">
                <p>
                  Sites profissionais para apresentar sua empresa, explicar seus serviços e facilitar o contato de novos clientes.
                </p>

                <div className="hero-actions">
                  <a className="button button-primary" href={directContact} target="_blank" rel="noreferrer">
                    Conversar pelo WhatsApp
                  </a>
                  <Link className="button button-secondary" href="/projeto/">
                    Contar sobre meu projeto
                  </Link>
                </div>
              </div>
            </div>

            <aside className="hero-v3-aside hero-enter delay-2" aria-label="Prazo do primeiro conceito visual">
              <span className="aside-index">01</span>
              <div className="aside-time">
                <strong>48h</strong>
                <span>primeiro conceito visual</span>
              </div>
              <p>Uma primeira direção para o seu site antes da entrega final.</p>
              <div className="aside-rule" aria-hidden="true" />
              <div className="aside-extra">
                <span>Domínio + hospedagem</span>
                <strong>1º ano incluído</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className="offer-index shell reveal-section" aria-label="Resumo de valores">
          <a className="offer-index-row" href="#valores">
            <span className="offer-index-no">01</span>
            <span className="offer-index-name">Landing page</span>
            <strong>R$ 600–900</strong>
            <span className="offer-index-arrow" aria-hidden="true">↘</span>
          </a>
          <a className="offer-index-row" href="#valores">
            <span className="offer-index-no">02</span>
            <span className="offer-index-name">Site institucional</span>
            <strong>R$ 1.000–1.600</strong>
            <span className="offer-index-arrow" aria-hidden="true">↘</span>
          </a>
        </section>

        <section className="section shell reveal-section" id="servicos" aria-labelledby="services-title">
          <div className="section-intro">
            <p className="eyebrow">01 / Serviços</p>
            <h2 id="services-title">Dois formatos, sem complicação.</h2>
          </div>

          <div className="service-editorial">
            <article className="service-editorial-row">
              <div className="service-editorial-head">
                <span>01</span>
                <h3>Landing page</h3>
              </div>
              <p>Uma página focada em apresentar um serviço, uma oferta ou um negócio e levar o visitante até o contato.</p>
              <span className="service-editorial-meta">01 página</span>
            </article>

            <article className="service-editorial-row">
              <div className="service-editorial-head">
                <span>02</span>
                <h3>Site institucional</h3>
              </div>
              <p>Até cinco páginas para organizar informações, apresentar a empresa e explicar os principais serviços.</p>
              <span className="service-editorial-meta">Até 5 páginas</span>
            </article>
          </div>
        </section>

        <section className="section pricing-v3 reveal-section" id="valores" aria-labelledby="pricing-title">
          <div className="shell">
            <div className="section-intro pricing-v3-intro">
              <p className="eyebrow">02 / Valores</p>
              <h2 id="pricing-title">Valores claros desde o início.</h2>
              <p>Domínio e hospedagem por um ano já entram no primeiro pagamento.</p>
            </div>

            <div className="pricing-table">
              <article className="pricing-row">
                <div className="pricing-row-name">
                  <span>01</span>
                  <h3>Landing page</h3>
                </div>
                <div className="pricing-row-price">
                  <span>R$</span>
                  <strong>600–900</strong>
                </div>
                <ul className="pricing-row-features">
                  <li>01 página</li>
                  <li>Design responsivo</li>
                  <li>WhatsApp integrado</li>
                  <li>Conceito visual em até 48h</li>
                </ul>
                <a className="pricing-row-cta" href={quoteContact} target="_blank" rel="noreferrer">
                  Solicitar orçamento <span aria-hidden="true">↗</span>
                </a>
              </article>

              <article className="pricing-row">
                <div className="pricing-row-name">
                  <span>02</span>
                  <h3>Site institucional</h3>
                </div>
                <div className="pricing-row-price">
                  <span>R$</span>
                  <strong>1.000–1.600</strong>
                </div>
                <ul className="pricing-row-features">
                  <li>Até 5 páginas</li>
                  <li>Design responsivo</li>
                  <li>WhatsApp integrado</li>
                  <li>Conceito visual em até 48h</li>
                </ul>
                <a className="pricing-row-cta" href={quoteContact} target="_blank" rel="noreferrer">
                  Solicitar orçamento <span aria-hidden="true">↗</span>
                </a>
              </article>
            </div>

            <div className="pricing-foot">
              <div>
                <span>A partir do 2º ano</span>
                <strong>R$ 300/ano</strong>
                <p>Domínio e hospedagem.</p>
              </div>
              <div>
                <span>Domínio</span>
                <strong>Em seu nome</strong>
                <p>O registro fica vinculado ao cliente.</p>
              </div>
              <div>
                <span>Pagamento</span>
                <strong>Pix</strong>
                <p>Forma de pagamento do projeto.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section process-v3 reveal-section" id="processo" aria-labelledby="process-title">
          <div className="shell">
            <div className="section-intro process-v3-intro">
              <p className="eyebrow">03 / Processo</p>
              <h2 id="process-title">Como o projeto avança.</h2>
            </div>

            <div className="process-list">
              <article className="process-row">
                <span className="process-no">01</span>
                <h3>Briefing</h3>
                <p>Você me conta sobre o negócio, o objetivo do site e envia referências visuais, se tiver.</p>
                <span className="process-status">Início</span>
              </article>
              <article className="process-row process-row-highlight">
                <span className="process-no">02</span>
                <h3>Conceito visual</h3>
                <p>Apresento uma primeira direção visual para o projeto.</p>
                <span className="process-status">até 48h</span>
              </article>
              <article className="process-row">
                <span className="process-no">03</span>
                <h3>Desenvolvimento</h3>
                <p>Com a direção definida, construo as páginas e faço os ajustes previstos no escopo.</p>
                <span className="process-status">Produção</span>
              </article>
              <article className="process-row">
                <span className="process-no">04</span>
                <h3>Publicação</h3>
                <p>Finalizo o projeto e coloco o site no ar.</p>
                <span className="process-status">até 7 dias úteis</span>
              </article>
            </div>

            <p className="process-note-v3">
              Os prazos começam após a confirmação do projeto e o recebimento dos materiais necessários.
            </p>
          </div>
        </section>

        <section className="section about-v3 reveal-section" id="sobre" aria-labelledby="about-title">
          <div className="shell about-v3-grid">
            <div className="about-v3-heading">
              <p className="eyebrow">04 / Sobre</p>
              <h2 id="about-title">Gabriel Justin</h2>
            </div>

            <div className="about-v3-copy">
              <p>Crio landing pages e sites institucionais, cuidando do design, do desenvolvimento e da publicação.</p>
              <p>O atendimento é direto comigo do primeiro contato até o site entrar no ar.</p>
            </div>

            <dl className="about-facts">
              <div>
                <dt>Atendimento</dt>
                <dd>Direto comigo</dd>
              </div>
              <div>
                <dt>Primeiro conceito</dt>
                <dd>Até 48 horas</dd>
              </div>
              <div>
                <dt>Entrega</dt>
                <dd>Até 7 dias úteis</dd>
              </div>
              <div>
                <dt>Prioridade</dt>
                <dd>Experiência mobile</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="final-cta shell reveal-section" id="contato" aria-labelledby="brief-title">
          <div className="final-cta-top">
            <p className="eyebrow">05 / Começar</p>
            <span>3 perguntas</span>
          </div>

          <h2 id="brief-title">Conte sobre o site que você precisa.</h2>

          <div className="final-cta-bottom">
            <p>Responda três perguntas para eu entender o negócio, o objetivo e a direção visual do projeto.</p>
            <div className="brief-actions">
              <Link className="button button-primary" href="/projeto/">Responder 3 perguntas</Link>
              <a className="button button-secondary" href={directContact} target="_blank" rel="noreferrer">
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
