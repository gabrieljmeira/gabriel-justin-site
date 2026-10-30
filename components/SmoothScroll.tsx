"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import "lenis/dist/lenis.css";
import { MOTION } from "@/lib/motion";

export function SmoothScroll() {
  useEffect(() => {
    const allowed = matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let instance: Lenis | undefined;
    let generation = 0;

    function interrupt(event: KeyboardEvent | MouseEvent) {
      if (event instanceof KeyboardEvent) {
        if (["Home", "End", "PageUp", "PageDown", "ArrowUp", "ArrowDown", " ", "Tab"].includes(event.key)) instance?.scrollTo(window.scrollY, { immediate: true });
      } else if ((event.target as Element | null)?.closest('a[href*="#"]')) {
        instance?.scrollTo(window.scrollY, { immediate: true });
      }
    }

    async function setup() {
      const current = ++generation;
      instance?.destroy();
      instance = undefined;
      if (!allowed.matches) return;
      const { default: Lenis } = await import("lenis");
      if (current !== generation || !allowed.matches) return;
      instance = new Lenis({
        autoRaf: true,
        lerp: MOTION.scrollLerp,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
        // Keep native anchor focus, URL hashes and keyboard navigation.
        anchors: false,
        prevent: (node) => node.matches(".mobile-menu, textarea, select, [data-lenis-prevent]"),
        virtualScroll: ({ event }) => !event.ctrlKey && !event.metaKey && !event.shiftKey,
      });
    }

    void setup();
    allowed.addEventListener("change", setup);
    addEventListener("keydown", interrupt, true);
    addEventListener("click", interrupt, true);
    return () => {
      generation++;
      allowed.removeEventListener("change", setup);
      removeEventListener("keydown", interrupt, true);
      removeEventListener("click", interrupt, true);
      instance?.destroy();
    };
  }, []);
  return null;
}
