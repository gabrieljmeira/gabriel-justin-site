import Link from "next/link";
import { pageSocial } from "@/lib/seo";
import { SITE, whatsappUrl } from "@/lib/site";

const title = "Privacidade | Gabriel Justin";
const description = "Como funcionam o briefing, o rascunho opcional e o contato pelo WhatsApp.";
export const metadata = {
  alternates: { canonical: "/privacidade/" }, title, description,
  robots: { index: false, follow: true },
  ...pageSocial(title, description, "/privacidade/"),
};
export default function PrivacidadePage() {
  return (
    <main id="conteudo" className="legal-page shell-narrow">
      <header className="legal-header">
        <Link className="brand" href="/">Gabriel Justin<span className="brand-dot">.</span></Link>
        <Link className="back-home" href="/">Voltar ao site</Link>
      </header>
      <article className="legal-content legal-content-compact">
        <p className="eyebrow">Privacidade</p><h1>Como este site trata seus dados.</h1>
        <div className="legal-summary">
          <section><h2>Respostas do briefing</h2><p>As respostas ficam temporariamente na página para preparar sua mensagem. O formulário não envia respostas para um banco de dados do site. Sem rascunho, recarregar ou sair da página pode apagar o preenchimento. Evite incluir senhas, documentos ou outros dados sensíveis.</p></section>
          <section><h2>Rascunho opcional</h2><p>Se você escolher guardar um rascunho, as respostas e a etapa são salvas no armazenamento de sessão do seu navegador. Elas podem ser recuperadas ao recarregar nesta aba por até 2 horas sem alterações. O site deixa de usar o rascunho após esse prazo e o remove quando a página estiver aberta ou for acessada novamente. O botão “Apagar respostas e rascunho” remove a cópia salva e limpa o formulário.</p><p>Desmarcar a opção de rascunho remove apenas a cópia salva. As respostas abertas na página continuam disponíveis. As regras de restauração de abas do próprio navegador também podem afetar seu armazenamento de sessão.</p></section>
          <section><h2>WhatsApp e cópia da mensagem</h2><p>Ao clicar para abrir o WhatsApp, suas respostas são incluídas no endereço acessado por esse serviço. Isso acontece antes de confirmar o envio da mensagem na conversa. O conteúdo do link pode ficar no histórico ou nos registros do serviço acessado. A conversa segue as regras do WhatsApp. Ao usar “Copiar mensagem”, o texto é colocado na área de transferência do seu dispositivo.</p><p><a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noreferrer">Política de privacidade do WhatsApp</a>.</p></section>
          <section><h2>Hospedagem</h2><p>Este site é hospedado na Vercel. O código do site não inclui ferramentas de publicidade ou analytics. A infraestrutura de hospedagem pode tratar dados técnicos de acesso conforme suas políticas; não prometemos ausência de registros do provedor.</p><p><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Política de privacidade da Vercel</a>.</p></section>
          <section><h2>Contato</h2><p>Para tirar dúvidas sobre o uso das informações que você compartilhou com Gabriel, <a href={whatsappUrl("Olá, Gabriel! Tenho uma dúvida sobre a privacidade das minhas informações.")} target="_blank" rel="noreferrer">fale pelo WhatsApp {SITE.whatsappDisplay}</a>. Se o site passar a coletar informações de outra forma, esta página será atualizada.</p></section>
        </div>
        <p className="legal-updated">Última atualização: 30 de outubro de 2026.</p>
      </article>
    </main>
  );
}
