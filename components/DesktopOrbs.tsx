"use client";

import { useEffect, useRef } from "react";
import styles from "./DesktopVisuals.module.css";

export function DesktopOrbs() {
  const layerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const allowed = matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const orbs = Array.from(layer.children) as HTMLElement[];
    let frame = 0;
    function render() {
      frame = 0;
      if (!allowed.matches) return;
      const footer = document.querySelector("footer");
      const end = Math.max(1, (footer?.getBoundingClientRect().top ?? 0) + scrollY - innerHeight * .7);
      const progress = Math.min(1, Math.max(0, scrollY / end));
      orbs.forEach((orb, i) => {
        const start = -180 + (i % 4) * 105;
        const y = start + progress * (innerHeight + 260);
        const drift = Math.sin(progress * Math.PI * 2 + i) * 5;
        orb.style.transform = `translate3d(${drift}px, ${y}px, 0)`;
      });
      layer!.style.opacity = String(progress > .9 ? (1 - progress) * 10 : 1);
    }
    function schedule() {
      if (!frame && allowed.matches) frame = requestAnimationFrame(render);
    }
    function change() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (allowed.matches) render();
    }
    change();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    allowed.addEventListener("change", change);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      allowed.removeEventListener("change", change);
    };
  }, []);
  return <div ref={layerRef} className={styles.falling} aria-hidden="true">
    {Array.from({ length: 8 }, (_, i) => <span key={i} className={styles.orb} style={{
      [i < 4 ? "left" : "right"]: `${8 + (i % 3) * 6}px`,
      width: `${14 + (i % 3) * 5}px`, height: `${14 + (i % 3) * 5}px`,
    }} />)}
  </div>;
}
