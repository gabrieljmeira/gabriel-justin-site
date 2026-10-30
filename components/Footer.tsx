import Link from "next/link";
import { whatsappUrl } from "@/lib/site";
import visuals from "./DesktopVisuals.module.css";

export function Footer({ decorativeOrbs = false }: { decorativeOrbs?: boolean }) {
  const contactUrl = whatsappUrl("Olá, Gabriel! Gostaria de conversar sobre um novo site.");

  return (
    <footer className={`site-footer ${decorativeOrbs ? visuals.snowFooter : ""}`}>
      {decorativeOrbs && <div className={visuals.pile} data-orb-pile aria-hidden="true">
        {Array.from({ length: 36 }, (_, i) => <span key={i} className={visuals.orb} style={{
          left: `${(i % 18) * (94 / 17) + Math.floor(i / 18) * 2}%`, bottom: `${Math.floor(i / 18) * 16 - 8 + (i % 3) * 2}px`,
          width: `${28 + (i * 7) % 15}px`, height: `${28 + (i * 7) % 15}px`,
        }} />)}
      </div>}
      <div className="shell footer-compact">
        <div className="footer-signature">
          <p className="footer-brand">Gabriel Justin<span>.</span></p>
          <p className="footer-copy">Landing pages e sites institucionais.</p>
        </div>

        <div className="footer-actions">
          <a
            className="footer-whatsapp"
            href={contactUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Conversar pelo WhatsApp"
            title="Conversar pelo WhatsApp"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.3 11.7a8.3 8.3 0 0 1-12.2 7.4L4 20l1-4.1a8.3 8.3 0 1 1 15.3-4.2Z" />
              <path d="M8.6 8.2c.3-.6.6-.6 1-.6h.5c.2 0 .4.1.5.4l.9 2c.1.3.1.5-.1.7l-.7.9c-.2.2-.2.4 0 .7.6 1 1.6 2 2.7 2.5.3.2.5.1.7-.1l.9-1c.2-.2.4-.3.7-.1l1.9.9c.3.1.4.3.4.6 0 .3-.1 1.2-.7 1.8-.5.6-1.4 1-2.4.9-1.3-.1-3.3-.7-5.2-2.4-1.6-1.4-2.7-3.3-3-4.6-.2-1 .1-1.9.5-2.6Z" />
            </svg>
          </a>
          <Link className="footer-privacy" href="/privacidade/">Privacidade</Link>
          <span className="footer-copyright">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
