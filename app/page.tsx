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
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-kicker hero-enter">Criação de sites</div>

          <div className="hero-layout">
            <div className="hero-main">
              <h1 id="hero-title" className="hero-title hero-enter delay-1">
                Seu site pronto em até <span>7 dias úteis.</span>
              </h1>

              <p className="hero-copy hero-enter delay-2">
                Landing pages e sites institucionais para empresas, com design personalizado e prioridade para uma boa experiência no celular.
              </p>

              <div className="hero-actions hero-enter delay-3">
                <a className="button button-primary" href={directContact} target="_blank" rel="noreferrer">
                  Conversar pelo WhatsApp
                </a>
                <Link className="button button-secondary" href="/projeto/">
                  Contar sobre meu projeto
                </Link>
              </div>
            </div>

            <aside className="hero-deadline hero-enter delay-2" aria-label="Prazo do primeiro conceito visual">
              <span className="deadline-label">Primeiro conceito visual</span>
              <div className="deadline-value">
                <strong>48</strong>
                <span>horas</span>
              </div>
              <p>Primeira direção visual do seu projeto em até 48 horas.</p>
            </aside>
          </div>
        </section>

        <section className="commercial-strip shell hero-enter delay-3" aria-label="Valores principais">
          <div className="commercial-item">
            <span>Landing page</span>
            <strong>R$ 600–900</strong>
          </div>
          <div className="commercial-item">
            <span>Site institucional</span>
            <strong>R$ 1.000–1.600</strong>
          </div>
          <div className="commercial-item commercial-item-note">
            <span>Domínio + hospedagem</span>
            <strong>1º ano incluído</strong>
          </div>
        </section>

        <section className="section shell reveal-section" id="servicos" aria-labelledby="services-title">
          <div className="section-head">
            <p className="eyebrow">01 / Serviços</p>
            <h2 id="services-title">O que eu desenvolvo</h2>
          </div>

          <div className="service-list">
            <article className="service-row">
              <span className="row-index">01</span>
              <div>
                <h3>Landing pages</h3>
                <p>Uma página focada em apresentar uma oferta, serviço ou negócio e facilitar o contato de novos clientes.</p>
              </div>
              <span className="service-meta">01 página</span>
            </article>

            <article className="service-row">
              <span className="row-index">02</span>
              <div>
                <h3>Sites institucionais</h3>
                <p>Até cinco páginas para organizar informações da empresa, apresentar serviços e criar uma presença profissional na internet.</p>
              </div>
              <span className="service-meta">Até 5 páginas</span>
            </article>
          </div>
        </section>

        <section className="section pricing-section reveal-section" id="valores" aria-labelledby="pricing-title">
          <div className="shell">
            <div className="section-head pricing-head">
              <p className="eyebrow">02 / Valores</p>
              <h2 id="pricing-title">Planos e valores</h2>
              <p>Domínio e hospedagem estão incluídos por um ano no primeiro pagamento.</p>
            </div>

            <div className="pricing-grid">
              <article className="price-card">
                <div className="price-card-top">
                  <span>Landing page</span>
                  <span>01 página</span>
                </div>
                <p className="price"><span>R$</span> 600–900</p>
                <ul>
                  <li>Design personalizado e responsivo</li>
                  <li>Integração com WhatsApp</li>
                  <li>Domínio e hospedagem por 1 ano</li>
                  <li>Primeiro conceito visual em até 48 horas</li>
                </ul>
                <a href={quoteContact} target="_blank" rel="noreferrer" className="text-link">Solicitar orçamento</a>
              </article>

              <article className="price-card">
                <div className="price-card-top">
                  <span>Site institucional</span>
                  <span>Até 5 páginas</span>
                </div>
                <p className="price"><span>R$</span> 1.000–1.600</p>
                <ul>
                  <li>Até cinco páginas</li>
                  <li>Design personalizado e responsivo</li>
                  <li>Domínio e hospedagem por 1 ano</li>
                  <li>Primeiro conceito visual em até 48 horas</li>
                </ul>
                <a href={quoteContact} target="_blank" rel="noreferrer" className="text-link">Solicitar orçamento</a>
              </article>
            </div>

            <div className="renewal-note">
              <p><strong>R$ 300/ano</strong> a partir do segundo ano para domínio e hospedagem.</p>
              <p>O domínio fica registrado em nome do cliente. Pagamento via Pix.</p>
            </div>
          </div>
        </section>

        <section className="section process-section reveal-section" id="processo" aria-labelledby="process-title">
          <div className="shell">
            <div className="section-head process-head">
              <p className="eyebrow">03 / Processo</p>
              <h2 id="process-title">Como funciona</h2>
            </div>

            <div className="process-grid">
              <article>
                <span>01</span>
                <h3>Primeiro contato</h3>
                <p>Você me conta sobre o negócio, o que espera do site e compartilha referências visuais, se tiver.</p>
              </article>

              <article className="process-highlight">
                <span>02</span>
                <h3>Conceito visual</h3>
                <p>Em até <strong>48 horas</strong>, apresento uma primeira direção visual para o projeto.</p>
              </article>

              <article>
                <span>03</span>
                <h3>Desenvolvimento</h3>
                <p>Com a direção definida, construo as páginas e faço os ajustes previstos para o projeto.</p>
              </article>

              <article>
                <span>04</span>
                <h3>Publicação</h3>
                <p>O site é finalizado e publicado em até 7 dias úteis, conforme o escopo contratado.</p>
              </article>
            </div>

            <p className="process-note">Os prazos começam após a confirmação do projeto e o recebimento dos materiais necessários para iniciar.</p>
          </div>
        </section>

        <section className="section about-section reveal-section" id="sobre" aria-labelledby="about-title">
          <div className="shell about-grid">
            <p className="eyebrow">04 / Sobre</p>
            <div>
              <h2 id="about-title">Gabriel Justin</h2>
              <p>Sou Gabriel Justin. Crio landing pages e sites institucionais para empresas, cuidando do design, do desenvolvimento e da publicação.</p>
              <p>Você fala direto comigo durante todo o projeto. No mobile, a prioridade é leitura fácil, navegação simples e contato rápido.</p>
            </div>
          </div>
        </section>

        <section className="section shell brief-cta reveal-section" id="contato" aria-labelledby="brief-title">
          <div className="brief-cta-top">
            <p className="eyebrow">05 / Começar</p>
            <span>3 perguntas</span>
          </div>
          <h2 id="brief-title">Já tem um projeto em mente?</h2>
          <p>Com três respostas eu já consigo entender o negócio, o objetivo do site e a direção visual que você procura.</p>
          <div className="brief-actions">
            <Link className="button button-primary" href="/projeto/">Responder 3 perguntas</Link>
            <a className="button button-secondary" href={directContact} target="_blank" rel="noreferrer">Ir direto para o WhatsApp</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
