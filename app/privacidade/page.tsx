import Link from "next/link";

export const metadata = {
  title: "Privacidade | Gabriel Justin",
  description: "Informações sobre privacidade e o uso de dados no site Gabriel Justin.",
};

export default function PrivacidadePage() {
  return (
    <main id="conteudo" className="legal-page shell-narrow">
      <header className="legal-header">
        <Link className="brand" href="/">Gabriel Justin<span className="brand-dot">.</span></Link>
        <Link className="back-home" href="/">Voltar ao site</Link>
      </header>
      <article className="legal-content">
        <p className="eyebrow">Privacidade</p>
        <h1>Como os dados são usados</h1>
        <p>Esta versão do site não cria contas e não armazena as respostas do formulário de projeto em um banco de dados.</p>
        <h2>Contato pelo WhatsApp</h2>
        <p>Ao concluir as três perguntas, o site prepara uma mensagem com as respostas. O envio só acontece quando você escolhe abrir e enviar a mensagem pelo WhatsApp.</p>
        <h2>Dados técnicos</h2>
        <p>Nesta primeira versão, não há ferramentas próprias de rastreamento, publicidade ou cookies de análise configurados.</p>
        <h2>Alterações futuras</h2>
        <p>Se novas ferramentas de análise, formulários com armazenamento ou outros serviços forem adicionados, esta página deverá ser atualizada para explicar os dados coletados e a finalidade de uso.</p>
        <p className="legal-updated">Última atualização: outubro de 2026.</p>
      </article>
    </main>
  );
}
