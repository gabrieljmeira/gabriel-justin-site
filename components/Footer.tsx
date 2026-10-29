import Link from "next/link";
import { SITE, whatsappUrl } from "@/lib/site";

export function Footer() {
  const contactUrl = whatsappUrl("Olá, Gabriel! Gostaria de conversar sobre um novo site.");

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">Gabriel Justin<span>.</span></p>
          <p className="footer-copy">Criação de landing pages e sites institucionais.</p>
        </div>
        <div className="footer-links">
          <a href={contactUrl} target="_blank" rel="noreferrer">{SITE.whatsappDisplay}</a>
          <Link href="/privacidade/">Privacidade</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Gabriel Justin</span>
        <span>Brasil</span>
      </div>
    </footer>
  );
}
