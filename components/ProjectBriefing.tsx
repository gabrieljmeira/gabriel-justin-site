"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
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
  const [error, setError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const progress = `${step * 33.333}%`;

  const canContinue = useMemo(() => {
    if (step === 1) return data.businessName.trim().length >= 2 && data.businessDescription.trim().length >= 10;
    if (step === 2) return data.goal.trim().length >= 10;
    return data.hasLogo !== "";
  }, [data, step]);

  function next(event: FormEvent) {
    event.preventDefault();
    if (!canContinue) {
      setError("Preencha as informações desta etapa para continuar.");
      return;
    }
    setError("");
    setStep((current) => Math.min(3, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  }

  const message = [
    "Olá, Gabriel! Respondi as 3 perguntas do seu site e gostaria de conversar sobre meu projeto.",
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
    <div className="briefing-card">
      <div className="briefing-progress" aria-label={`Etapa ${step} de 3`}>
        <div className="briefing-progress-meta">
          <span>Seu projeto</span>
          <span>0{step} / 03</span>
        </div>
        <div className="progress-track" aria-hidden="true"><span style={{ width: progress }} /></div>
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
              onChange={(e) => setData({ ...data, businessName: e.target.value })}
            />
          </label>
          <label>
            O que vocês fazem?
            <textarea
              rows={5}
              placeholder="Ex.: Alugamos um espaço para aniversários, casamentos e eventos corporativos."
              value={data.businessDescription}
              onChange={(e) => setData({ ...data, businessDescription: e.target.value })}
            />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
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
              onChange={(e) => setData({ ...data, goal: e.target.value })}
            />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
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
                <input type="radio" name="logo" value="sim" checked={data.hasLogo === "sim"} onChange={() => setData({ ...data, hasLogo: "sim" })} />
                <span>Sim, já tenho</span>
              </label>
              <label className={data.hasLogo === "nao" ? "radio-option selected" : "radio-option"}>
                <input type="radio" name="logo" value="nao" checked={data.hasLogo === "nao"} onChange={() => setData({ ...data, hasLogo: "nao" })} />
                <span>Ainda não</span>
              </label>
            </div>
          </fieldset>

          <label>
            Sites de referência <span className="optional">opcional</span>
            <textarea
              rows={5}
              inputMode="url"
              placeholder={"Cole os links aqui, um por linha.\nVocê também pode enviar depois pelo WhatsApp."}
              value={data.references}
              onChange={(e) => setData({ ...data, references: e.target.value })}
            />
          </label>

          <p className="form-note">Se você já tiver uma logo, poderá anexar o arquivo diretamente na conversa do WhatsApp.</p>
          {!canContinue && error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="button button-secondary" type="button" onClick={back}>Voltar</button>
            <a
              className={`button button-primary ${!canContinue ? "is-disabled" : ""}`}
              href={canContinue ? whatsappUrl(message) : undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!canContinue}
              onClick={(event) => {
                if (!canContinue) {
                  event.preventDefault();
                  setError("Escolha se você já possui uma logo para continuar.");
                }
              }}
            >
              Enviar pelo WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
