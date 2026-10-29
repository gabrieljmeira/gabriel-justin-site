"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/lib/site";

const nav = [
  ["Serviços", "#servicos"],
  ["Formatos", "#formatos"],
  ["Valores", "#valores"],
  ["Processo", "#processo"],
  ["Sobre", "#sobre"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const main = document.querySelector<HTMLElement>("main");
    const footer = document.querySelector<HTMLElement>("footer");
    if (main) main.inert = open;
    if (footer) footer.inert = open;

    if (open) {
      requestAnimationFrame(() => {
        mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      });
    }

    function closeMenu({ restoreFocus = false } = {}) {
      setOpen(false);
      if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu({ restoreFocus: true });
    }

    const desktop = window.matchMedia("(min-width: 900px)");
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) closeMenu();
    }

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.body.style.overflow = "";
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contactUrl = whatsappUrl(
    "Olá, Gabriel! Vi seu site e gostaria de conversar sobre a criação de um site para o meu negócio."
  );

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
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
          ref={menuButtonRef}
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

      <div ref={mobileMenuRef} id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Navegação mobile">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span>{label}</span>
            </a>
          ))}
          <a
            className="mobile-contact"
            href={contactUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Conversar pelo WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
