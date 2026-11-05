"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SITE, whatsappUrl } from "@/lib/site";
import {
  LIMITS, MAX_WHATSAPP_URL, DRAFT_KEY, DRAFT_TTL, initialData,
  buildMessage, parseDraft, parseFormat, validateAll, validateStep, formatLabels,
  type BriefingData, type BriefingErrors,
} from "@/lib/briefing";

type FieldProps = {
  name: keyof typeof LIMITS; label: string; value: string; placeholder: string;
  rows?: number; error?: string; onChange: (value: string) => void;
};
function Field({ name, label, value, placeholder, rows, error, onChange }: FieldProps) {
  const common = {
    id: name, value, placeholder, maxLength: LIMITS[name],
    "aria-invalid": Boolean(error),
    "aria-describedby": `${name}-hint${error ? ` ${name}-error` : ""}`,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
  };
  return (
    <div className="briefing-field">
      <label htmlFor={name}>{label}</label>
      {rows ? <textarea {...common} rows={rows} /> : <input {...common} type="text" autoComplete="organization" />}
      <p id={`${name}-hint`} className="form-note field-hint">Até {LIMITS[name]} caracteres.</p>
      {error && <p id={`${name}-error`} className="form-error" role="alert">{error}</p>}
    </div>
  );
}

export function ProjectBriefing() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BriefingData>(initialData);
  const [errors, setErrors] = useState<BriefingErrors>({});
  const [referencesOpen, setReferencesOpen] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);
  const [ready, setReady] = useState(false);
  const [draftStatus, setDraftStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [expiresAt, setExpiresAt] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const restoredDraftRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const requestedFormat = parseFormat(new URLSearchParams(window.location.search).get("formato"));
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      const draft = parseDraft(raw);
      if (draft) {
        restoredDraftRef.current = true;
        const restored = { ...draft.data, format: requestedFormat || draft.data.format };
        setData(restored); setStep(draft.step); setSaveDraft(true);
        setExpiresAt(draft.expiresAt); setReferencesOpen(Boolean(restored.references));
        setDraftStatus("Rascunho recuperado nesta aba.");
      } else {
        if (raw) { sessionStorage.removeItem(DRAFT_KEY); setDraftStatus("O rascunho anterior expirou ou não pôde ser recuperado."); }
        setData({ ...initialData, format: requestedFormat });
      }
    } catch {
      setData({ ...initialData, format: requestedFormat });
      setDraftStatus("O navegador não permite guardar rascunhos. Você pode continuar sem salvar.");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !saveDraft) return;
    if (restoredDraftRef.current) { restoredDraftRef.current = false; return; }
    try {
      const expiry = Date.now() + DRAFT_TTL;
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ version: 1, expiresAt: expiry, step, data }));
      setExpiresAt(expiry);
      setDraftStatus("Rascunho salvo nesta aba.");
    } catch {
      setSaveDraft(false);
      setDraftStatus("Não foi possível guardar o rascunho. As respostas continuam nesta página.");
    }
  }, [data, step, saveDraft, ready]);

  useEffect(() => {
    if (!saveDraft || !expiresAt) return;
    const timer = window.setTimeout(() => {
      try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* Storage may be blocked after opt-in. */ }
      setSaveDraft(false);
      setDraftStatus("O rascunho salvo expirou. As respostas abertas nesta página continuam disponíveis.");
    }, Math.max(0, expiresAt - Date.now()));
    return () => window.clearTimeout(timer);
  }, [saveDraft, expiresAt]);

  useEffect(() => { if (ready) headingRef.current?.focus({ preventScroll: true }); }, [step, ready]);

  function update<K extends keyof BriefingData>(key: K, value: BriefingData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setCopyStatus("");
  }
  function focusInvalid() {
    requestAnimationFrame(() => containerRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  }
  function validate(all = false) {
    const found = all ? validateAll(data) : validateStep(data, step);
    setErrors(found);
    if (!Object.keys(found).length) return true;
    if (found.businessName || found.businessDescription) setStep(1);
    else if (found.goal) setStep(2);
    focusInvalid();
    return false;
  }
  function moveTo(nextStep: number) {
    setErrors({}); setStep(nextStep); setCopyStatus("");
    if (nextStep === 3 && data.references) setReferencesOpen(true);
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  function next(event: FormEvent) {
    event.preventDefault();
    if (validate()) moveTo(Math.min(3, step + 1));
  }
  function toggleDraft(enabled: boolean) {
    setSaveDraft(enabled);
    if (!enabled) {
      try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* In-memory answers remain usable. */ }
      setDraftStatus("Rascunho salvo removido. As respostas permanecem apenas nesta página.");
    }
  }
  function clearDraft() {
    try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* No persistence is required for the form. */ }
    setSaveDraft(false); setData(initialData); setStep(1); setErrors({});
    setReferencesOpen(false); setSummaryOpen(false); setCopyStatus("");
    setDraftStatus("Respostas e rascunho apagados.");
  }

  const message = buildMessage(data);
  const contact = whatsappUrl(message);
  const complete = !Object.keys(validateAll(data)).length;
  const tooLong = contact.length > MAX_WHATSAPP_URL;
  async function copyMessage() {
    if (!validate(true)) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Mensagem copiada. Cole na conversa com Gabriel.");
    } catch {
      setSummaryOpen(true);
      setCopyStatus("A cópia automática não está disponível. Selecione o texto no resumo e copie manualmente.");
      requestAnimationFrame(() => { messageRef.current?.focus(); messageRef.current?.select(); });
    }
  }

  return (
    <div ref={containerRef} className="briefing-card">
      <div className="briefing-progress" aria-label={`Etapa ${step} de 3`}>
        <div className="briefing-progress-meta"><span>Seu projeto</span><span>0{step} / 03</span></div>
        <div className="progress-track" aria-hidden="true"><span style={{ transform: `scaleX(${step / 3})` }} /></div>
      </div>
      {data.format && <p className="form-note">Formato de interesse: {formatLabels[data.format]}.</p>}
      <form className="briefing-form" onSubmit={next} noValidate>
        {step === 1 && <>
          <div key={step} className="question-heading step-enter"><span>01</span><div>
            <h1 ref={headingRef} tabIndex={-1}>Qual é o seu negócio?</h1>
          </div></div>
          <Field name="businessName" label="Nome do negócio" value={data.businessName} placeholder="Ex.: Bella Eventos" error={errors.businessName} onChange={(v) => update("businessName", v)} />
          <Field name="businessDescription" label="O que vocês fazem?" value={data.businessDescription} placeholder="Ex.: Alugamos um espaço para aniversários, casamentos e eventos corporativos." rows={5} error={errors.businessDescription} onChange={(v) => update("businessDescription", v)} />
          <div className="form-actions single"><button className="button button-primary" type="submit">Continuar</button></div>
        </>}
        {step === 2 && <>
          <div key={step} className="question-heading step-enter"><span>02</span><div>
            <h1 ref={headingRef} tabIndex={-1}>O que você quer com o site?</h1>
          </div></div>
          <Field name="goal" label="Objetivo principal" value={data.goal} placeholder="Ex.: Quero receber pedidos de orçamento pelo WhatsApp e apresentar os serviços da empresa." rows={7} error={errors.goal} onChange={(v) => update("goal", v)} />
          <div className="form-actions">
            <button className="button button-secondary" type="button" onClick={() => moveTo(1)}>Voltar</button>
            <button className="button button-primary" type="submit">Continuar</button>
          </div>
        </>}
        {step === 3 && <>
          <div key={step} className="question-heading step-enter"><span>03</span><div>
            <h1 ref={headingRef} tabIndex={-1}>Logo e referências.</h1>
            <p>Compartilhe sites com o estilo que você procura.</p>
          </div></div>
          <fieldset><legend>Você já possui uma logo?</legend>
            <div className="radio-grid">
              <label className={`radio-option${data.hasLogo === "sim" ? " selected" : ""}`}>
                <input type="radio" name="logo" value="sim" checked={data.hasLogo === "sim"} aria-invalid={Boolean(errors.hasLogo)} aria-describedby={errors.hasLogo ? "hasLogo-error" : undefined} onChange={() => update("hasLogo", "sim")} /><span>Sim, já tenho</span>
              </label>
              <label className={`radio-option${data.hasLogo === "nao" ? " selected" : ""}`}>
                <input type="radio" name="logo" value="nao" checked={data.hasLogo === "nao"} aria-invalid={Boolean(errors.hasLogo)} aria-describedby={errors.hasLogo ? "hasLogo-error" : undefined} onChange={() => update("hasLogo", "nao")} /><span>Ainda não</span>
              </label>
            </div>
            {errors.hasLogo && <p id="hasLogo-error" className="form-error" role="alert">{errors.hasLogo}</p>}
          </fieldset>
          <div className="briefing-references">
            <button className="references-toggle" type="button" aria-label="Sites de referência (opcional)" aria-expanded={referencesOpen} aria-controls="reference-fields" onClick={() => setReferencesOpen((open) => !open)}>Sites de referência <span className="optional">opcional</span></button>
            <div id="reference-fields" hidden={!referencesOpen}>
              <Field name="references" label="Links de referência" value={data.references} placeholder="Cole os links aqui, um por linha." rows={5} error={errors.references} onChange={(v) => update("references", v)} />
            </div>
          </div>
          <p className="form-note">Se tiver logo, envie na conversa do WhatsApp.</p>
          <details className="briefing-summary" open={summaryOpen} onToggle={(event) => setSummaryOpen(event.currentTarget.open)}>
            <summary>Revisar mensagem</summary>
            <label htmlFor="briefing-message">Mensagem</label>
            <textarea id="briefing-message" ref={messageRef} rows={10} readOnly value={message} />
          </details>
          {tooLong && <p className="form-error" role="alert">O texto ficou longo para o link do WhatsApp. Reduza as respostas ou copie a mensagem e cole na conversa.</p>}
          <div className="form-actions">
            <button className="button button-secondary" type="button" onClick={() => moveTo(2)}>Voltar</button>
            {complete && !tooLong ? <a className="button button-primary" href={contact} target="_blank" rel="noreferrer" onClick={(event) => { if (!validate(true)) event.preventDefault(); }}>Abrir mensagem no WhatsApp</a>
              : <button className="button button-primary" type="button" disabled={complete && tooLong} onClick={() => validate(true)}>Abrir mensagem no WhatsApp</button>}
          </div>
          <button className="button button-secondary briefing-copy" type="button" onClick={copyMessage}>Copiar mensagem</button>
          <p className="form-note" role="status">{copyStatus}</p>
          <p className="form-note">O WhatsApp não abriu? Copie a mensagem e procure Gabriel pelo número <a href={whatsappUrl("Olá, Gabriel! Gostaria de conversar sobre meu projeto.")} target="_blank" rel="noreferrer">{SITE.whatsappDisplay}</a>.</p>
        </>}
      </form>
      <div className="briefing-draft">
        <label className="draft-choice"><input type="checkbox" checked={saveDraft} disabled={!ready} onChange={(event) => toggleDraft(event.target.checked)} /> Guardar rascunho nesta aba</label>
        <p className="form-note">Válido por até 2 horas sem alterações. Sem rascunho, recarregar apaga as respostas.</p>
        <p className="form-note" role="status">{draftStatus}</p>
        <button className="editorial-link" type="button" onClick={clearDraft}>Apagar respostas e rascunho</button>
      </div>
    </div>
  );
}
