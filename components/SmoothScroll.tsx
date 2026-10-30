"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import "lenis/dist/lenis.css";
import { MOTION } from "@/lib/motion";
import { watchMotion } from "@/lib/motion-preference";

export function SmoothScroll() {
  useEffect(() => {
    const desktop = matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
    let enabled = false;
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
      if (!enabled || !desktop.matches) return;
      const { default: Lenis } = await import("lenis");
      if (current !== generation || !enabled || !desktop.matches) return;
      instance = new Lenis({
        autoRaf: true,
        lerp: MOTION.scrollLerp,
        smoothWheel: true,
        syncTouch: false,
        // The shared preference already respects the OS unless the visitor opts in.
        respectReducedMotion: false,
        stopInertiaOnNavigate: true,
        // Keep native anchor focus, URL hashes and keyboard navigation.
        anchors: false,
        prevent: (node) => node.matches(".mobile-menu, textarea, select, [data-lenis-prevent]"),
        virtualScroll: ({ event }) => !event.ctrlKey && !event.metaKey && !event.shiftKey,
      });
    }

    const unsubscribe = watchMotion((state) => { enabled = state.enabled; void setup(); });
    desktop.addEventListener("change", setup);
    addEventListener("keydown", interrupt, true);
    addEventListener("click", interrupt, true);
    return () => {
      generation++;
      desktop.removeEventListener("change", setup);
      unsubscribe();
      removeEventListener("keydown", interrupt, true);
      removeEventListener("click", interrupt, true);
      instance?.destroy();
    };
  }, []);
  return null;
}
