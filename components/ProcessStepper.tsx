"use client";

import { type KeyboardEvent, useRef, useState } from "react";

const steps = [
  { number: "01", title: "Briefing", status: "Início", description: "Você explica o negócio, o objetivo do site e compartilha os materiais que já possui." },
  { number: "02", title: "Conceito visual", status: "Até 48h", description: "Apresento uma primeira direção visual para alinharmos o caminho do projeto." },
  { number: "03", title: "Desenvolvimento", status: "Produção", description: "Com a direção definida, construo as páginas e implemento o escopo combinado." },
  { number: "04", title: "Publicação", status: "Até 7 dias úteis", description: "Faço a finalização técnica e coloco o site no ar." },
] as const;

export function ProcessStepper() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  function focusStep(index: number) {
    setActive(index);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role='tab']")[index]?.focus({ preventScroll: true });
  }
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % steps.length;
    else if (event.key === "ArrowLeft") next = (index + steps.length - 1) % steps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else return;
    event.preventDefault();
    focusStep(next);
  }

  return (
    <>
      <ol className="process-mobile" aria-label="Etapas do projeto">
        {steps.map((item) => (
          <li className="process-mobile-step" key={item.number}>
            <div className="process-mobile-meta"><span>{item.number}</span><small>{item.status}</small></div>
            <h3>{item.title}</h3><p>{item.description}</p>
          </li>
        ))}
      </ol>
      <div className="process-desktop">
        <div ref={tabsRef} className="process-tabs" role="tablist" aria-label="Etapas do projeto">
          {steps.map((item, index) => (
            <button key={item.number} id={"process-tab-" + index} type="button" role="tab"
              aria-selected={active === index} aria-controls={"process-panel-" + index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => focusStep(index)} onKeyDown={(event) => handleKey(event, index)}>
              <span className="process-tab-number">{item.number}</span>
              <strong>{item.title}</strong><span className="process-tab-status">{item.status}</span>
            </button>
          ))}
        </div>
        {steps.map((item, index) => (
          <div key={item.number} id={"process-panel-" + index} className="process-panel"
            role="tabpanel" aria-labelledby={"process-tab-" + index} tabIndex={0} hidden={active !== index}>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
