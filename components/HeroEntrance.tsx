"use client";

import { useEffect } from "react";
import { MOTION } from "@/lib/motion";
import { HERO_ENTER, watchMotion } from "@/lib/motion-preference";

export function HeroEntrance() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero || !Element.prototype.animate) return;
    const animations = new Set<Animation>();
    let entered = false;
    let ready = false;
    let enabled = false;
    let generation = 0;
    let frame = 0;
    let fontTimeout: ReturnType<typeof setTimeout>;

    function start() {
      if (!ready || entered || document.hidden) return;
      const rect = hero!.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= innerHeight) return;
      entered = true;
      hero!.dataset.entered = "true";
      const easing = getComputedStyle(document.documentElement).getPropertyValue("--ease-editorial").trim() || "ease-out";
      hero!.querySelectorAll<HTMLElement>("[data-hero-part]").forEach((element) => {
        const animation = element.animate([
          { opacity: 0, transform: enabled ? "translateY(8px)" : "none" },
          { opacity: 1, transform: "none" },
        ], {
          duration: (enabled ? MOTION.hero : MOTION.heroReduced) * 1000,
          delay: enabled ? Number(element.dataset.heroPart) * MOTION.heroStagger * 1000 : 0,
          easing,
          fill: "backwards",
        });
        animations.add(animation);
        animation.onfinish = () => { animation.cancel(); animations.delete(animation); };
      });
      window.dispatchEvent(new Event(HERO_ENTER));
    }
    function visibility() {
      animations.forEach((animation) => document.hidden ? animation.pause() : animation.play());
      if (!document.hidden) start();
    }
    const observer = new IntersectionObserver(start);
    observer.observe(hero);
    const unsubscribe = watchMotion((state) => {
      const current = ++generation;
      enabled = state.enabled;
      ready = false;
      entered = false;
      delete hero.dataset.entered;
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      clearTimeout(fontTimeout);
      cancelAnimationFrame(frame);
      // Do not spend the one-shot entrance while fonts or a background tab hide it.
      void Promise.race([
        document.fonts.ready.catch(() => undefined),
        new Promise<void>((resolve) => { fontTimeout = setTimeout(resolve, MOTION.fontWait * 1000); }),
      ]).then(() => {
        if (current !== generation) return;
        clearTimeout(fontTimeout);
        frame = requestAnimationFrame(() => { ready = true; start(); });
      });
    });
    document.addEventListener("visibilitychange", visibility);
    return () => {
      generation++;
      unsubscribe();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      clearTimeout(fontTimeout);
      cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
      delete hero.dataset.entered;
    };
  }, []);
  return null;
}
