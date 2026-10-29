"use client";

import { useEffect, useRef, useState } from "react";
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
] as const;

export function ProcessStepper() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      panel,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.42, ease: "expo.out" }
    );
  }, [active]);

  const step = steps[active];
  const progress = ((active + 1) / steps.length) * 100;

  function selectStep(index: number) {
    setActive(index);
  }

  function previous() {
    setActive((current) => Math.max(0, current - 1));
  }

  function next() {
    setActive((current) => Math.min(steps.length - 1, current + 1));
  }

  return (
    <div className="process-stepper">
      <div className="process-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="process-tabs" role="tablist" aria-label="Etapas do projeto">
        {steps.map((item, index) => {
          const selected = index === active;
          const completed = index < active;

          return (
            <button
              key={item.number}
              type="button"
              role="tab"
              id={`process-tab-${index}`}
              aria-selected={selected}
              aria-controls="process-panel"
              tabIndex={selected ? 0 : -1}
              className={`process-tab ${selected ? "is-active" : ""} ${completed ? "is-complete" : ""}`}
              onClick={() => selectStep(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  selectStep(Math.min(steps.length - 1, index + 1));
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  selectStep(Math.max(0, index - 1));
                }
              }}
            >
              <span className="process-tab-number">{item.number}</span>
              <span className="process-tab-title">{item.title}</span>
              <small>{item.status}</small>
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        id="process-panel"
        className="process-card"
        role="tabpanel"
        aria-labelledby={`process-tab-${active}`}
      >
        <div className="process-card-index">
          <span>Etapa {step.number}</span>
          <span>{active + 1} / {steps.length}</span>
        </div>

        <div className="process-card-body">
          <div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>

          <strong className={step.emphasis ? "process-card-status is-key" : "process-card-status"}>
            {step.status}
          </strong>
        </div>
      </div>

      <div className="process-controls">
        <button type="button" onClick={previous} disabled={active === 0}>
          <span aria-hidden="true">←</span> Anterior
        </button>
        <button type="button" onClick={next} disabled={active === steps.length - 1}>
          Próxima <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
