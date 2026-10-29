import Link from "next/link";
import { whatsappUrl } from "@/lib/site";

export function Footer() {
  const contactUrl = whatsappUrl("Olá, Gabriel! Gostaria de conversar sobre um novo site.");

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">Gabriel Justin<span>.</span></p>
          <p className="footer-copy">Criação de landing pages e sites institucionais.</p>
        </div>
        <a
          className="footer-whatsapp"
          href={contactUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Conversar pelo WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3.5a8.3 8.3 0 0 0-7.1 12.6L4 20l4-1a8.3 8.3 0 1 0 4-15.5Z" />
            <path d="M9 8.5c.3 2.9 2.2 4.8 5 5.2" />
            <path d="m9.2 8.2-.8 1.2c.7 2.4 2.2 4 4.6 4.7l1.2-.8" />
          </svg>
        </a>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Gabriel Justin</span>
        <div className="footer-legal">
          <Link href="/privacidade/">Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
