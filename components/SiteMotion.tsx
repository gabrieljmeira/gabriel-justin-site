"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MOTION } from "@/lib/motion";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SiteMotion() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const revealGroups = [
        ".section-rail",
        ".section-heading",
        ".service-capabilities article",
        ".format-row",
        ".pricing-card",
        ".commercial-conditions article",
        ".about-copy-grid",
        ".about-facts-v3 > div",
        ".faq-item",
      ];

      revealGroups.forEach((selector) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: MOTION.reveal,
              ease: MOTION.ease,
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      });


    });

    return () => mm.revert();
  }, { scope });

  return <div ref={scope} className="motion-scope" aria-hidden="true" />;
}
