import Link from "next/link";

export const metadata = {
  title: "Privacidade | Gabriel Justin",
  description: "Como este site lida com respostas do briefing e contato pelo WhatsApp.",
};

export default function PrivacidadePage() {
  return (
    <main id="conteudo" className="legal-page shell-narrow">
      <header className="legal-header">
        <Link className="brand" href="/">Gabriel Justin<span className="brand-dot">.</span></Link>
        <Link className="back-home" href="/">Voltar ao site</Link>
      </header>

      <article className="legal-content legal-content-compact">
        <p className="eyebrow">Privacidade</p>
        <h1>Uma nota simples sobre seus dados.</h1>

        <div className="legal-summary">
          <section>
            <h2>Briefing</h2>
            <p>As respostas das três perguntas não são armazenadas neste site. Elas só são usadas para preparar a mensagem que você pode enviar pelo WhatsApp.</p>
          </section>

          <section>
            <h2>WhatsApp</h2>
            <p>O envio acontece apenas quando você escolhe abrir o WhatsApp e confirmar a mensagem. A conversa passa a seguir as regras e a privacidade do próprio WhatsApp.</p>
          </section>

          <section>
            <h2>Ferramentas futuras</h2>
            <p>Se o site passar a usar analytics, cookies ou formulários com armazenamento, esta página será atualizada para explicar o que é coletado e por quê.</p>
          </section>
        </div>

        <p className="legal-updated">Última atualização: outubro de 2026.</p>
      </article>
    </main>
  );
}
