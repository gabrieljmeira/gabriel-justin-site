"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/lib/site";

type FormData = {
  businessName: string;
  businessDescription: string;
  goal: string;
  hasLogo: "sim" | "nao" | "";
  references: string;
};

const initialData: FormData = {
  businessName: "",
  businessDescription: "",
  goal: "",
  hasLogo: "",
  references: "",
};

export function ProjectBriefing() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [referencesOpen, setReferencesOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const showReferences = referencesOpen;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  function validate() {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};
    if (step === 1) {
      if (data.businessName.trim().length < 2) nextErrors.businessName = "Informe o nome do negócio com pelo menos 2 caracteres.";
      if (data.businessDescription.trim().length < 10) nextErrors.businessDescription = "Descreva o que a empresa faz com pelo menos 10 caracteres.";
    }
    if (step === 2 && data.goal.trim().length < 10) nextErrors.goal = "Descreva o objetivo do site com pelo menos 10 caracteres.";
    if (step === 3 && !data.hasLogo) nextErrors.hasLogo = "Escolha se você já possui uma logo para continuar.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => containerRef.current?.querySelector<HTMLElement>('input[aria-invalid="true"], textarea[aria-invalid="true"]')?.focus());
      return false;
    }
    return true;
  }

  function moveTo(nextStep: number) {
    setErrors({});
    setStep(nextStep);
    if (nextStep === 3 && data.references.length > 0) setReferencesOpen(true);
    // Explicit JS scrolling must honor the same preference as the CSS guard.
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function next(event: FormEvent) {
    event.preventDefault();
    if (validate()) moveTo(Math.min(3, step + 1));
  }

  function back() { moveTo(Math.max(1, step - 1)); }

  const message = [
    "Olá, Gabriel! Preenchi o briefing do seu site e gostaria de conversar sobre meu projeto.",
    "",
    `1. Negócio: ${data.businessName}`,
    data.businessDescription,
    "",
    `2. O que quero com o site: ${data.goal}`,
    "",
    `3. Já tenho logo: ${data.hasLogo === "sim" ? "Sim" : "Não"}`,
    data.references.trim() ? `Referências: ${data.references}` : "Referências: ainda não separei referências.",
  ].join("\n");

  return (
    <div ref={containerRef} className="briefing-card">
      <div className="briefing-progress" aria-label={`Etapa ${step} de 3`}>
        <div className="briefing-progress-meta">
          <span>Seu projeto</span>
          <span>0{step} / 03</span>
        </div>
        <div className="progress-track" aria-hidden="true"><span style={{ transform: `scaleX(${step / 3})` }} /></div>
      </div>

      {step === 1 && (
        <form className="briefing-form" onSubmit={next}>
          <div className="question-heading">
            <span>01</span>
            <div>
              <h1 ref={headingRef} tabIndex={-1}>Qual é o seu negócio?</h1>
              <p>Me diga o nome e, em poucas palavras, o que a empresa faz.</p>
            </div>
          </div>
          <label>
            Nome do negócio
            <input
              type="text"
              autoComplete="organization"
              placeholder="Ex.: Bella Eventos"
              value={data.businessName}
              id="businessName" aria-invalid={Boolean(errors.businessName)} aria-describedby={errors.businessName ? "businessName-error" : undefined}
              onChange={(e) => { setData({ ...data, businessName: e.target.value }); setErrors((current) => ({ ...current, businessName: undefined })); }}
            />
          </label>
          {errors.businessName && <span id="businessName-error" className="form-error" role="alert">{errors.businessName}</span>}
          <label>
            O que vocês fazem?
            <textarea
              rows={5}
              placeholder="Ex.: Alugamos um espaço para aniversários, casamentos e eventos corporativos."
              value={data.businessDescription}
              id="businessDescription" aria-invalid={Boolean(errors.businessDescription)} aria-describedby={errors.businessDescription ? "businessDescription-error" : undefined}
              onChange={(e) => { setData({ ...data, businessDescription: e.target.value }); setErrors((current) => ({ ...current, businessDescription: undefined })); }}
            />
          </label>
          {errors.businessDescription && <span id="businessDescription-error" className="form-error" role="alert">{errors.businessDescription}</span>}
          <div className="form-actions single">
            <button className="button button-primary" type="submit">Continuar</button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form className="briefing-form" onSubmit={next}>
          <div className="question-heading">
            <span>02</span>
            <div>
              <h1 ref={headingRef} tabIndex={-1}>O que você quer com o site?</h1>
              <p>Pense no principal resultado que o site precisa ajudar a alcançar.</p>
            </div>
          </div>
          <label>
            Objetivo principal
            <textarea
              rows={7}
              placeholder="Ex.: Quero receber mais pedidos de orçamento pelo WhatsApp e apresentar melhor os serviços da empresa."
              value={data.goal}
              id="goal" aria-invalid={Boolean(errors.goal)} aria-describedby={errors.goal ? "goal-error" : undefined}
              onChange={(e) => { setData({ ...data, goal: e.target.value }); setErrors((current) => ({ ...current, goal: undefined })); }}
            />
          </label>
          {errors.goal && <span id="goal-error" className="form-error" role="alert">{errors.goal}</span>}
          <div className="form-actions">
            <button className="button button-secondary" type="button" onClick={back}>Voltar</button>
            <button className="button button-primary" type="submit">Continuar</button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="briefing-form">
          <div className="question-heading">
            <span>03</span>
            <div>
              <h1 ref={headingRef} tabIndex={-1}>Qual direção visual você gosta?</h1>
              <p>Informe se já possui logo e, se puder, envie dois ou três sites que considera bonitos.</p>
            </div>
          </div>

          <fieldset>
            <legend>Você já possui uma logo?</legend>
            <div className="radio-grid">
              <label className={data.hasLogo === "sim" ? "radio-option selected" : "radio-option"}>
                <input type="radio" name="logo" value="sim" aria-invalid={Boolean(errors.hasLogo)} aria-describedby={errors.hasLogo ? "hasLogo-error" : undefined} checked={data.hasLogo === "sim"} onChange={() => { setData({ ...data, hasLogo: "sim" }); setErrors({}); }} />
                <span>Sim, já tenho</span>
              </label>
              <label className={data.hasLogo === "nao" ? "radio-option selected" : "radio-option"}>
                <input type="radio" name="logo" value="nao" aria-invalid={Boolean(errors.hasLogo)} aria-describedby={errors.hasLogo ? "hasLogo-error" : undefined} checked={data.hasLogo === "nao"} onChange={() => { setData({ ...data, hasLogo: "nao" }); setErrors({}); }} />
                <span>Ainda não</span>
              </label>
            </div>
            {errors.hasLogo && <p id="hasLogo-error" className="form-error" role="alert">{errors.hasLogo}</p>}
          </fieldset>

          <div className="briefing-references">
          <button className="references-toggle" type="button" aria-label="Sites de referência (opcional)" aria-expanded={showReferences} aria-controls="reference-fields" onClick={() => setReferencesOpen((open) => !open)}>
            Sites de referência <span className="optional">opcional</span>
          </button>
          <div id="reference-fields" hidden={!showReferences}>
          <label>
            Links de referência
            <textarea
              rows={5}
              inputMode="url"
              placeholder={"Cole os links aqui, um por linha.\nVocê também pode enviar depois pelo WhatsApp."}
              value={data.references}
              onChange={(e) => setData({ ...data, references: e.target.value })}
            />
          </label>

          </div>
          </div>
          <p className="form-note">Se você já tiver uma logo, poderá anexar o arquivo diretamente na conversa do WhatsApp.</p>
          <div className="form-actions">
            <button className="button button-secondary" type="button" onClick={back}>Voltar</button>
            {data.hasLogo ? (
              <a className="button button-primary" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
                Enviar pelo WhatsApp
              </a>
            ) : (
              <button className="button button-primary" type="button" onClick={validate}>
                Enviar pelo WhatsApp
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
