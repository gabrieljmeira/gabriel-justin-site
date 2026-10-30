export const LIMITS = { businessName: 80, businessDescription: 400, goal: 400, references: 300 } as const;
export const MAX_WHATSAPP_URL = 8000;
export const DRAFT_KEY = "gabriel-justin:briefing:v1";
export const DRAFT_TTL = 2 * 60 * 60 * 1000;
export type SiteFormat = "" | "landing-page" | "institucional";
export type BriefingData = {
  businessName: string; businessDescription: string; goal: string;
  hasLogo: "" | "sim" | "nao"; references: string; format: SiteFormat;
};
export type BriefingErrors = Partial<Record<keyof BriefingData, string>>;
export const initialData: BriefingData = { businessName: "", businessDescription: "", goal: "", hasLogo: "", references: "", format: "" };
export const formatLabels = { "landing-page": "Landing page", institucional: "Site institucional" } as const;
export function parseFormat(value: unknown): SiteFormat {
  return value === "landing-page" || value === "institucional" ? value : "";
}
export function normalize(value: string) {
  return value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}
export function validateStep(data: BriefingData, step: number): BriefingErrors {
  const errors: BriefingErrors = {};
  const check = (key: keyof typeof LIMITS, min: number, label: string) => {
    const length = normalize(data[key]).length;
    if (length < min) errors[key] = `${label} com pelo menos ${min} caracteres.`;
    else if (length > LIMITS[key]) errors[key] = `Use até ${LIMITS[key]} caracteres neste campo.`;
  };
  if (step === 1) { check("businessName", 2, "Informe o nome do negócio"); check("businessDescription", 10, "Descreva o que a empresa faz"); }
  if (step === 2) check("goal", 10, "Descreva o objetivo do site");
  if (step === 3) {
    if (data.hasLogo !== "sim" && data.hasLogo !== "nao") errors.hasLogo = "Escolha se você já possui uma logo para continuar.";
    check("references", 0, "");
  }
  return errors;
}
export function validateAll(data: BriefingData): BriefingErrors {
  return { ...validateStep(data, 1), ...validateStep(data, 2), ...validateStep(data, 3) };
}
export function buildMessage(data: BriefingData) {
  return [
    "Olá, Gabriel! Preenchi o briefing do seu site e gostaria de conversar sobre meu projeto.",
    data.format ? `Formato: ${formatLabels[data.format]}` : "",
    "",
    `1. Negócio: ${normalize(data.businessName)}`,
    normalize(data.businessDescription),
    "",
    `2. O que quero com o site: ${normalize(data.goal)}`,
    "",
    `3. Já tenho logo: ${data.hasLogo === "sim" ? "Sim" : data.hasLogo === "nao" ? "Não" : "Ainda não informado"}`,
    normalize(data.references) ? `Referências: ${normalize(data.references)}` : "Referências: ainda não separei referências.",
  ].filter((line, index) => index !== 1 || Boolean(line)).join("\n");
}
export function parseDraft(raw: string | null, now = Date.now()): { data: BriefingData; step: number; expiresAt: number } | null {
  if (!raw || raw.length > 12000) return null;
  try {
    const value = JSON.parse(raw);
    if (!value || value.version !== 1 || !Number.isFinite(value.expiresAt) || value.expiresAt <= now || value.expiresAt > now + DRAFT_TTL || !value.data || !Number.isInteger(value.step) || value.step < 1 || value.step > 3) return null;
    const data = value.data;
    for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
      if (typeof data[key] !== "string" || data[key].length > LIMITS[key]) return null;
    }
    if (!["", "sim", "nao"].includes(data.hasLogo) || parseFormat(data.format) !== data.format) return null;
    const safeData: BriefingData = { businessName: data.businessName, businessDescription: data.businessDescription, goal: data.goal, hasLogo: data.hasLogo, references: data.references, format: data.format };
    let step = value.step;
    if (Object.keys(validateStep(safeData, 1)).length) step = 1;
    else if (step === 3 && Object.keys(validateStep(safeData, 2)).length) step = 2;
    return { data: safeData, step, expiresAt: value.expiresAt };
  } catch { return null; }
}
