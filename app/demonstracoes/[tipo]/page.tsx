import Link from "next/link";
import type { Metadata } from "next";
import { pageSocial } from "@/lib/seo";

const examples = {
  "landing-page": {
    title: "Demonstração de landing page",
    headline: "Uma oferta clara, um contato fácil.",
    intro: "Este exemplo mostra como uma única página pode apresentar um serviço e conduzir o visitante ao contato.",
    sections: [
      ["O que é oferecido", "Uma descrição direta do serviço, de quem ele atende e do que está incluído."],
      ["Como funciona", "Explique as etapas para contratar, os materiais necessários e as condições do atendimento."],
      ["Próximo passo", "Um convite para conversar com a empresa, sem prometer resultados que não podem ser garantidos."],
    ],
  },
  institucional: {
    title: "Demonstração de site institucional",
    headline: "Sua empresa organizada para ser encontrada.",
    intro: "Esta prévia apresenta a organização do conteúdo de um site institucional. Em um projeto contratado, as informações podem ser distribuídas em até cinco páginas.",
    sections: [
      ["Empresa", "Uma apresentação de quem está por trás do negócio, sua área de atuação e a forma de atendimento."],
      ["Serviços", "Uma visão dos serviços oferecidos, com escopo e informações para o visitante escolher o que procura."],
      ["Contato", "Canais de atendimento fáceis de localizar e informações comerciais claras antes de iniciar a conversa."],
    ],
  },
} as const;
type ExampleType = keyof typeof examples;
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(examples).map((tipo) => ({ tipo }));
}
export async function generateMetadata({ params }: { params: Promise<{ tipo: ExampleType }> }): Promise<Metadata> {
  const { tipo } = await params;
  const example = examples[tipo];
  if (!example) return { robots: { index: false } };
  const title = `${example.title} | Gabriel Justin`;
  const description = "Exemplo autoral de organização de conteúdo. Demonstração fictícia, sem cliente ou resultado comercial associado.";
  return { title, description, alternates: { canonical: `/demonstracoes/${tipo}/` }, robots: { index: false, follow: true }, ...pageSocial(title, description, `/demonstracoes/${tipo}/`) };
}
export default async function ExamplePage({ params }: { params: Promise<{ tipo: ExampleType }> }) {
  const { tipo } = await params;
  const example = examples[tipo];
  return (
    <main id="conteudo" className="legal-page shell-narrow">
      <header className="legal-header"><Link className="brand" href="/">Gabriel Justin<span className="brand-dot">.</span></Link><Link className="back-home" href="/#demonstracoes">Voltar às demonstrações</Link></header>
      <article className="legal-content">
        <p className="eyebrow">{example.title}</p>
        <p className="form-note">Projeto demonstrativo autoral. Não representa cliente, empresa real ou resultado de vendas. Os textos abaixo ilustram uma estrutura e serão personalizados em cada projeto.</p>
        <h1>{example.headline}</h1><p>{example.intro}</p>
        <div className="legal-summary">{example.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}</div>
        <Link className="button button-primary" href={`/projeto/?formato=${tipo}`}>Quero conversar sobre este formato</Link>
        <p className="form-note">Você será levado ao briefing de Gabriel Justin. Nenhum contato é enviado automaticamente.</p>
      </article>
    </main>
  );
}
