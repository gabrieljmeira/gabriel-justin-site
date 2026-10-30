"use client";

import { useEffect, useRef } from "react";
import { MOTION } from "@/lib/motion";
import { watchMotion } from "@/lib/motion-preference";
import styles from "./DesktopVisuals.module.css";

export function DesktopOrbs() {
  const layerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const desktop = matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
    let enabled = false;
    const orbs = Array.from(layer.children) as HTMLElement[];
    const footer = document.querySelector("footer");
    const pile = Array.from(footer?.querySelectorAll<HTMLElement>("[data-orb-pile] > span") ?? []);
    let frame = 0;
    let elapsed = 0;
    let previous: number | undefined;
    let end = 1;
    let height = 0;
    let lastProgress = -1;
    function measure() {
      height = layer!.clientHeight;
      end = Math.max(1, (footer?.getBoundingClientRect().bottom ?? innerHeight) + scrollY - innerHeight);
    }
    function render(now: number) {
      frame = 0;
      if (!enabled || !desktop.matches || document.hidden) return;
      elapsed += previous === undefined ? 0 : Math.min(now - previous, 64);
      previous = now;
      const progress = Math.min(1, Math.max(0, scrollY / end));
      orbs.forEach((orb, i) => {
        // Every orb starts above the viewport; time drives the fall even at rest.
        const travel = elapsed / (MOTION.orbFall * 1000) + progress * .6 - i * .105;
        const phase = Math.max(0, travel) % 1;
        const y = -48 + phase * (height + 96);
        const drift = Math.sin(phase * Math.PI * 2 + i) * 5;
        orb.style.transform = `translate3d(${drift}px, ${y}px, 0)`;
        orb.style.opacity = String(Math.min(1, phase * 12, (1 - phase) * 8) * .5);
      });
      layer!.style.opacity = String(progress > .9 ? (1 - progress) * 10 : 1);
      if (progress !== lastProgress) {
        pile.forEach((orb, i) => {
          const settled = Math.min(1, Math.max(0, progress * pile.length - i));
          orb.style.opacity = String(settled * .7);
          orb.style.transform = `translateY(${(1 - settled) * 32}px)`;
        });
        lastProgress = progress;
      }
      frame = requestAnimationFrame(render);
    }
    function change() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = undefined;
      lastProgress = -1;
      measure();
      if (enabled && desktop.matches && !document.hidden) frame = requestAnimationFrame(render);
    }
    const unsubscribe = watchMotion((state) => { enabled = state.enabled; change(); });
    const sizeObserver = new ResizeObserver(measure);
    sizeObserver.observe(document.body);
    addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", change);
    desktop.addEventListener("change", change);
    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", change);
      desktop.removeEventListener("change", change);
      unsubscribe();
    };
  }, []);
  return <div ref={layerRef} className={styles.falling} aria-hidden="true">
    {Array.from({ length: 8 }, (_, i) => <span key={i} className={styles.orb} style={{
      [i < 4 ? "left" : "right"]: `${8 + (i % 3) * 6}px`,
      width: `${14 + (i % 3) * 5}px`, height: `${14 + (i % 3) * 5}px`,
    }} />)}
  </div>;
}
