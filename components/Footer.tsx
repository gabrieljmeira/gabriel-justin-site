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
            <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4a8.2 8.2 0 1 1 15.1-4.2Z" />
            <path d="M8.5 8.1c.3-.6.6-.6 1-.6h.5c.2 0 .4.1.5.4l.9 2c.1.3.1.5-.1.7l-.7.9c-.2.2-.2.4 0 .7.6 1 1.6 2 2.7 2.5.3.2.5.1.7-.1l.9-1c.2-.2.4-.3.7-.1l1.9.9c.3.1.4.3.4.6 0 .3-.1 1.2-.7 1.8-.5.6-1.4 1-2.4.9-1.3-.1-3.3-.7-5.2-2.4-1.6-1.4-2.7-3.3-3-4.6-.2-1 .1-1.9.5-2.6Z" />
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
