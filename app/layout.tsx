import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Gabriel Justin | Criação de Sites",
  description:
    "Landing pages e sites institucionais com primeiro conceito visual em até 48 horas e entrega em até 7 dias úteis.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Gabriel Justin | Criação de Sites",
    description:
      "Landing pages e sites institucionais com primeiro conceito visual em até 48 horas e entrega em até 7 dias úteis.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Justin | Criação de Sites",
    description:
      "Landing pages e sites institucionais com primeiro conceito visual em até 48 horas e entrega em até 7 dias úteis.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  );
}
