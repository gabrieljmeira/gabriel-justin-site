import Link from "next/link";
import { ProjectBriefing } from "@/components/ProjectBriefing";
import { pageSocial } from "@/lib/seo";
import { SITE, whatsappUrl } from "@/lib/site";

const title = "Conte sobre seu projeto | Gabriel Justin";
const description = "Prepare sua mensagem em três etapas e converse com Gabriel pelo WhatsApp.";
export const metadata = {
  alternates: { canonical: "/projeto/" }, title, description,
  robots: { index: false, follow: true },
  ...pageSocial(title, description, "/projeto/"),
};
export default function ProjetoPage() {
  return (
    <main id="conteudo" className="briefing-page">
      <header className="briefing-header shell-narrow">
        <Link className="brand" href="/">Gabriel Justin<span className="brand-dot">.</span></Link>
        <Link className="back-home" href="/">Voltar ao site</Link>
      </header>
      <div className="shell-narrow briefing-wrap">
        <noscript><p className="form-note">Ative o JavaScript para responder ao briefing ou <a href={whatsappUrl("Olá, Gabriel! Gostaria de conversar sobre meu projeto.")}>converse pelo WhatsApp: {SITE.whatsappDisplay}</a>.</p></noscript>
        <ProjectBriefing />
        <p className="briefing-privacy">Ao abrir o WhatsApp, suas respostas são incluídas no link. Você confirma o envio na conversa. <Link href="/privacidade/">Como seus dados são tratados</Link>.</p>
      </div>
    </main>
  );
}
