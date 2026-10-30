"use client";

import { useEffect } from "react";
import { MOTION } from "@/lib/motion";

export function SiteMotion() {
  useEffect(() => {
    const root = document.getElementById("conteudo");
    if (!root || !("IntersectionObserver" in window) || !Element.prototype.animate) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const selectors = [".section-rail", ".section-heading", ".service-capabilities article", ".format-row", ".pricing-card", ".commercial-conditions article", ".about-copy-grid", ".about-facts-v3 > div", ".faq-item"].join(",");
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
    function setup() {
      clear();
      if (preference.matches) return;
      // Sample the original expo.out curve; native animations keep headings in
      // the accessibility tree and avoid a scroll/animation JavaScript runtime.
      const keyframes = Array.from({ length: 21 }, (_, i) => {
        const progress = i / 20;
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        return { offset: progress, opacity: eased, transform: `translateY(${10 * (1 - eased)}px)` };
      });
      root?.querySelectorAll<HTMLElement>(selectors).forEach((element) => {
        const animation = element.animate(keyframes, { duration: MOTION.reveal * 1000, fill: "both" });
        animation.pause();
        animation.currentTime = 0;
        animation.onfinish = () => { animation.cancel(); animations.delete(animation); };
        animations.add(animation);
        pending.set(element, animation);
      });
      observe();
    }
    setup();
    preference.addEventListener("change", setup);
    window.addEventListener("resize", observe, { passive: true });
    return () => {
      clear();
      preference.removeEventListener("change", setup);
      window.removeEventListener("resize", observe);
    };
  }, []);
  return null;
}
