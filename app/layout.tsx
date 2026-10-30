import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { indexable, pageSocial } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" });
const title = "Criação de sites | Gabriel Justin";
const description = "Landing pages e sites institucionais com atendimento online. Primeiro conceito em até 48h e entrega em até 7 dias úteis. Fale com Gabriel.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url), title, description,
  icons: { icon: "/favicon.svg" },
  robots: { index: indexable, follow: true },
  ...pageSocial(title, description, "/"),
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${newsreader.variable}`}>
      <body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a>{children}</body>
    </html>
  );
}
