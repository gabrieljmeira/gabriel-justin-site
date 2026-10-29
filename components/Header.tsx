"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";

const nav = [
  ["Serviços", "#servicos"],
  ["Como funciona", "#processo"],
  ["Valores", "#valores"],
  ["Sobre", "#sobre"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    if (open) window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const contactUrl = whatsappUrl(
    "Olá, Gabriel! Vi seu site e gostaria de conversar sobre a criação de um site para o meu negócio."
  );

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Gabriel Justin, página inicial">
          Gabriel Justin<span className="brand-dot">.</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <a className="header-contact" href={contactUrl} target="_blank" rel="noreferrer">
          WhatsApp
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "Fechar" : "Menu"}</span>
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Navegação mobile">
          {nav.map(([label, href], index) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span className="menu-index">0{index + 1}</span>
              <span>{label}</span>
            </a>
          ))}
          <a className="mobile-contact" href={contactUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            Conversar pelo WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
