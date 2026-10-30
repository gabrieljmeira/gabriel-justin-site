"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/lib/site";

const nav = [
  ["Serviços", "#servicos"],
  ["Formatos", "#formatos"],
  ["Demonstrações", "#demonstracoes"],
  ["Valores", "#valores"],
  ["Processo", "#processo"],
  ["Sobre", "#sobre"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const main = document.querySelector<HTMLElement>("main");
    const footer = document.querySelector<HTMLElement>("footer");
    const mainWasInert = main?.inert ?? false;
    const footerWasInert = footer?.inert ?? false;
    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    if (footer) footer.inert = true;

    let focusFrame = 0;
    const initialFocus = requestAnimationFrame(() => {
      focusFrame = requestAnimationFrame(() => {
        mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });
      });
    });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const targets = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [])
        .filter((element) => element.getClientRects().length > 0);
      const first = targets[0];
      const last = targets[targets.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    }

    const desktop = window.matchMedia("(min-width: 900px)");
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) {
        setOpen(false);
        headerRef.current?.querySelector<HTMLAnchorElement>(".desktop-nav a")?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      cancelAnimationFrame(initialFocus);
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = mainWasInert;
      if (footer) footer.inert = footerWasInert;
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
    <header ref={headerRef} className={"site-header" + (scrolled ? " is-scrolled" : "")}>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Gabriel Justin, página inicial" onClick={() => setOpen(false)}>
          Gabriel Justin<span className="brand-dot">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="header-contact" href={contactUrl} target="_blank" rel="noreferrer">WhatsApp</a>
        <button
          ref={menuButtonRef} className="menu-toggle" type="button"
          aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >{open ? "Fechar" : "Menu"}</button>
      </div>
      <div ref={mobileMenuRef} id="mobile-menu" className={"mobile-menu" + (open ? " is-open" : "")} aria-hidden={!open} inert={!open}>
        <nav aria-label="Navegação mobile">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="mobile-contact button button-primary" href={contactUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Conversar pelo WhatsApp</a>
        </nav>
      </div>
    </header>
  );
}
