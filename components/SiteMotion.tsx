"use client";

import { useEffect } from "react";
import { MOTION } from "@/lib/motion";
import { watchMotion } from "@/lib/motion-preference";

export function SiteMotion() {
  useEffect(() => {
    const root = document.getElementById("conteudo");
    if (!root || !("IntersectionObserver" in window) || !Element.prototype.animate) return;
    const selectors = [".section-rail", ".section-heading", ".service-capabilities article", ".format-row", ".pricing-card", ".commercial-conditions article", ".about-copy-grid", ".about-facts-v3 > div", ".faq-item", ".process-mobile-step"].join(",");
    let observer: IntersectionObserver | undefined;
    const pending = new Map<HTMLElement, Animation>();
    const animations = new Set<Animation>();

    function clear() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      pending.clear();
    }
    function observe() {
      observer?.disconnect();
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          const animation = pending.get(element);
          if (animation) { pending.delete(element); animation.play(); }
          observer?.unobserve(element);
        }
      }, { rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.12)}px 0px` });
      pending.forEach((_, element) => observer?.observe(element));
    }
    function setup({ enabled }: { enabled: boolean }) {
      clear();
      if (!enabled) return;
      // A short displacement and shared easing keep section entrances calm.
      const keyframes = [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }];
      const easing = getComputedStyle(document.documentElement).getPropertyValue("--ease-editorial").trim() || "ease-out";
      root?.querySelectorAll<HTMLElement>(selectors).forEach((element) => {
        const animation = element.animate(keyframes, { duration: MOTION.reveal * 1000, easing, fill: "both" });
        animation.pause();
        animation.currentTime = 0;
        animation.onfinish = () => { animation.cancel(); animations.delete(animation); };
        animations.add(animation);
        pending.set(element, animation);
      });
      observe();
    }
    const unsubscribe = watchMotion(setup);
    window.addEventListener("resize", observe, { passive: true });
    return () => {
      clear();
      unsubscribe();
      window.removeEventListener("resize", observe);
    };
  }, []);
  return null;
}
