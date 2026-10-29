"use client";

import { useRef } from "react";
import gsap from "gsap";
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
        ".section-heading",
        ".service-item-v3",
        ".concept-project",
        ".investment-plan",
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
              duration: 0.55,
              ease: "expo.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-line-draw]").forEach((element) => {
        gsap.fromTo(
          element,
          { "--line-scale": 0 },
          {
            "--line-scale": 1,
            duration: 0.75,
            ease: "expo.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      const timeline = document.querySelector<HTMLElement>(".timeline");
      const timelineProgress = document.querySelector<HTMLElement>(".timeline-track span");

      if (timeline && timelineProgress) {
        const wide = window.matchMedia("(min-width: 1180px)").matches;
        gsap.fromTo(
          timelineProgress,
          wide ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(wide ? { scaleX: 1 } : { scaleY: 1 }),
            ease: "none",
            scrollTrigger: {
              trigger: timeline,
              start: "top 72%",
              end: "bottom 58%",
              scrub: 0.45,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((step) => {
        gsap.fromTo(
          step,
          { autoAlpha: 0.38, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: step,
              start: "top 84%",
              once: true,
              onEnter: () => step.classList.add("is-active"),
            },
          }
        );
      });

      const count = document.querySelector<HTMLElement>("[data-count='48']");
      if (count) {
        const value = { n: 0 };
        gsap.to(value, {
          n: 48,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          onUpdate: () => {
            count.textContent = String(Math.round(value.n));
          },
        });
      }
    });

    return () => mm.revert();
  }, { scope });

  return <div ref={scope} className="motion-scope" aria-hidden="true" />;
}
