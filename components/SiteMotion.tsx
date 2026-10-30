"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MOTION } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function SiteMotion() {
  useEffect(() => {
    const root = document.getElementById("conteudo");
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const selectors = [".section-rail", ".section-heading", ".service-capabilities article", ".format-row", ".pricing-card", ".commercial-conditions article", ".about-copy-grid", ".about-facts-v3 > div", ".faq-item"];
      selectors.forEach((selector) => {
        root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 24 }, {
            autoAlpha: 1, y: 0, duration: MOTION.reveal, ease: MOTION.ease,
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });
      });
    }, root);
    return () => media.revert();
  }, []);
  return null;
}
