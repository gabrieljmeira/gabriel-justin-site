"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";

type ProcessStep = {
  number: string;
  title: string;
  status: string;
  description: string;
  emphasis?: string;
};

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Briefing",
    status: "Início",
    description:
      "Você explica o negócio, o objetivo do site e compartilha os materiais que já possui.",
  },
  {
    number: "02",
    title: "Conceito visual",
    status: "Até 48h",
    description:
      "Apresento uma primeira direção visual para alinharmos o caminho do projeto.",
    emphasis: "48h",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    status: "Produção",
    description:
      "Com a direção definida, construo as páginas e implemento o escopo combinado.",
  },
  {
    number: "04",
    title: "Publicação",
    status: "Até 7 dias úteis",
    description:
      "Faço a finalização técnica e coloco o site no ar.",
    emphasis: "7 dias úteis",
  },
];

export function ProcessStepper() {
  const [active, setActive] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(deck.querySelectorAll<HTMLElement>(".process-deck-card"));

    cards.forEach((card, index) => {
      const delta = index - active;
      const distance = Math.abs(delta);

      gsap.to(card, {
        x: delta * 64,
        y: distance * 8,
        scale: Math.max(0.91, 1 - distance * 0.035),
        autoAlpha: Math.max(0.34, 1 - distance * 0.2),
        zIndex: 20 - distance,
        duration: 0.5,
        ease: "expo.out",
      });
    });
  }, [active]);

  const progress = ((active + 1) / steps.length) * 100;

  function selectStep(index: number) {
    setActive(index);
  }

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectStep(Math.min(steps.length - 1, index + 1));
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectStep(Math.max(0, index - 1));
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectStep(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectStep(steps.length - 1);
    }
  }

  return (
    <>
      <div className="process-mobile" aria-label="Etapas do projeto">
        <div className="process-mobile-track" aria-hidden="true" />
        {steps.map((item) => (
          <article className="process-mobile-step" key={item.number}>
            <span className="process-mobile-dot" aria-hidden="true" />
            <div className="process-mobile-meta">
              <span>{item.number}</span>
              <small className={item.emphasis ? "is-key" : ""}>{item.status}</small>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="process-deck process-desktop">
        <div className="process-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        <div
          ref={deckRef}
          className="process-deck-stage"
          aria-label="Etapas do projeto"
        >
          {steps.map((item, index) => {
            const selected = index === active;
            const completed = index < active;
            const distance = Math.abs(index - active);

            return (
              <button
                key={item.number}
                type="button"
                aria-current={selected ? "step" : undefined}
                className={`process-deck-card ${selected ? "is-active" : ""} ${completed ? "is-complete" : ""}`}
                onClick={() => selectStep(selected && index < steps.length - 1 ? index + 1 : index)}
                onKeyDown={(event) => handleKey(event, index)}
                style={{
                  zIndex: 20 - distance,
                  transform: `translateX(${(index - active) * 64}px) translateY(${distance * 8}px) scale(${Math.max(0.91, 1 - distance * 0.035)})`,
                  opacity: Math.max(0.34, 1 - distance * 0.2),
                }}
              >
                <span className="process-deck-number">{item.number}</span>

                <span className="process-deck-content">
                  <strong>{item.title}</strong>
                  <span className="process-deck-description">{item.description}</span>
                </span>

                <span className={item.emphasis ? "process-deck-status is-key" : "process-deck-status"}>
                  {item.status}
                </span>

                <span className="process-deck-edge" aria-hidden="true">
                  {item.number}
                </span>

                {selected && index < steps.length - 1 ? (
                  <span className="process-deck-next-cue" aria-hidden="true">→</span>
                ) : null}

              </button>
            );
          })}
        </div>

      </div>
    </>
  );
}
