import Link from "next/link";
import { ProjectBriefing } from "@/components/ProjectBriefing";

export const metadata = {
  title: "Conte sobre seu projeto | Gabriel Justin",
  description: "Responda três perguntas rápidas para iniciar seu projeto de site.",
};

export default function ProjetoPage() {
  return (
    <main id="conteudo" className="briefing-page">
      <header className="briefing-header shell-narrow">
        <Link className="brand" href="/">Gabriel Justin<span className="brand-dot">.</span></Link>
        <Link className="back-home" href="/">Voltar ao site</Link>
      </header>
      <div className="shell-narrow briefing-wrap">
        <ProjectBriefing />
        <p className="briefing-privacy">As respostas não são armazenadas neste site. Ao finalizar, você escolhe enviá-las pelo WhatsApp.</p>
      </div>
    </main>
  );
}
