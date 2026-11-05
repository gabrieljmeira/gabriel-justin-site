import Link from "next/link";
import type { Metadata } from "next";
import { pageSocial } from "@/lib/seo";

const examples = {
  "landing-page": {
    title: "Demonstração de landing page",
    headline: "Uma oferta clara, um contato fácil.",
    intro: "Estrutura sugerida para apresentar um serviço em uma única página.",
    sections: [
      ["O que é oferecido", "Descreva o serviço, quem ele atende e o que está incluído."],
      ["Como funciona", "Explique a contratação, os materiais necessários e as condições de atendimento."],
      ["Próximo passo", "Convide o visitante a entrar em contato."],
    ],
  },
  institucional: {
    title: "Demonstração de site institucional",
    headline: "Sua empresa organizada para ser encontrada.",
    intro: "O conteúdo pode ser distribuído em até cinco páginas.",
    sections: [
      ["Empresa", "Apresente quem está por trás do negócio, a área de atuação e a forma de atendimento."],
      ["Serviços", "Detalhe o escopo de cada serviço para orientar a escolha do visitante."],
      ["Contato", "Reúna os canais de atendimento e as informações comerciais."],
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
        <h1>{example.headline}</h1><p>{example.intro}</p>
        <div className="legal-summary">{example.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}</div>
        <Link className="button button-primary" href={`/projeto/?formato=${tipo}`}>Quero conversar sobre este formato</Link>
      </article>
    </main>
  );
}
