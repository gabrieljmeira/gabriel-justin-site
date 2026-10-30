import test from "node:test";
import assert from "node:assert/strict";
import { initialData, LIMITS, DRAFT_TTL, MAX_WHATSAPP_URL, buildMessage, normalize, parseDraft, parseFormat, validateAll, validateStep } from "../lib/briefing.ts";
import { SITE, whatsappUrl } from "../lib/site.ts";

const valid = { ...initialData, businessName: "Negócio fictício", businessDescription: "Serviços de teste para auditoria.", goal: "Receber pedidos de orçamento.", hasLogo: "nao", references: "https://example.com/?a=1&b=2#teste", format: "landing-page" };
const now = 1_800_000_000_000;
const draft = (data = valid, step = 3, expiresAt = now + DRAFT_TTL) => JSON.stringify({ version: 1, data, step, expiresAt });

test("contato comercial aprovado usa DDD 51 e uma origem fixa", () => {
  assert.equal(SITE.whatsapp, "5551984402298");
  assert.equal(SITE.whatsappDisplay, "+55 51 98440-2298");
  for (const text of ["Olá Ç & + ? # = %", "linha 1\nlinha 2", "🙂", "<script>alert(1)</script>", ""]) {
    const url = new URL(whatsappUrl(text));
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/5551984402298");
    assert.equal(url.searchParams.get("text"), text);
    assert.deepEqual([...url.searchParams.keys()], ["text"]);
  }
});
test("as três etapas rejeitam respostas ausentes ou só espaços", () => {
  assert.deepEqual(Object.keys(validateStep(initialData, 1)), ["businessName", "businessDescription"]);
  assert.ok(validateStep({ ...valid, goal: "          " }, 2).goal);
  assert.ok(validateStep({ ...valid, hasLogo: "" }, 3).hasLogo);
  assert.deepEqual(validateAll(valid), {});
  assert.deepEqual(validateAll({ ...valid, hasLogo: "sim", references: "" }), {});
});
test("limites incluem o último caractere válido e rejeitam excesso", () => {
  for (const key of Object.keys(LIMITS)) {
    const value = { ...valid, [key]: "a".repeat(LIMITS[key]) };
    assert.equal(validateAll(value)[key], undefined);
    assert.ok(validateAll({ ...value, [key]: "a".repeat(LIMITS[key] + 1) })[key]);
  }
});
test("normalização e mensagem preservam conteúdo sem controles invisíveis", () => {
  assert.equal(normalize("  A\r\nB\u0000  "), "A\nB");
  const message = buildMessage({ ...valid, businessName: "  Teste Ç & +  " });
  assert.ok(message.includes("Negócio: Teste Ç & +\n"));
  assert.ok(message.includes("Formato: Landing page"));
  assert.ok(message.includes("Já tenho logo: Não"));
  assert.ok(message.includes(valid.references));
  assert.ok(buildMessage({ ...valid, format: "", references: "" }).includes("ainda não separei referências"));
});
test("somente formatos conhecidos entram na mensagem", () => {
  for (const input of [null, undefined, "outro", "<script>", {}, []]) assert.equal(parseFormat(input), "");
  assert.equal(parseFormat("institucional"), "institucional");
});
test("rascunho válido preserva valores e etapa", () => {
  const parsed = parseDraft(draft(), now);
  assert.deepEqual(parsed.data, valid);
  assert.equal(parsed.step, 3);
  assert.equal(parsed.expiresAt, now + DRAFT_TTL);
});
test("rascunhos vencidos, adulterados ou grandes não são restaurados", () => {
  for (const raw of [null, "", "x", "[]", "null", draft(valid, 4), draft(valid, 0), draft(valid, 3, now), draft(valid, 3, now + DRAFT_TTL + 1), draft({ ...valid, hasLogo: "talvez" }), draft({ ...valid, format: "outro" }), draft({ ...valid, goal: 4 }), draft({ ...valid, goal: "a".repeat(LIMITS.goal + 1) }), "a".repeat(12001)]) {
    assert.equal(parseDraft(raw, now), null);
  }
  assert.equal(parseDraft(JSON.stringify({ version: 2, data: valid, step: 1, expiresAt: now + DRAFT_TTL }), now), null);
});
test("rascunhos parciais voltam à primeira etapa que precisa de resposta", () => {
  assert.equal(parseDraft(draft({ ...valid, businessName: "" }), now).step, 1);
  assert.equal(parseDraft(draft({ ...valid, goal: "" }), now).step, 2);
  assert.equal(parseDraft(draft({ ...valid, extra: "não restaurar" }), now).data.extra, undefined);
});
test("mensagem Unicode extensa pode exceder teto e precisa da alternativa de cópia", () => {
  const data = { ...valid, businessName: "ࠀ".repeat(80), businessDescription: "ࠀ".repeat(400), goal: "ࠀ".repeat(400), references: "ࠀ".repeat(300) };
  assert.deepEqual(validateAll(data), {});
  assert.ok(whatsappUrl(buildMessage(data)).length > MAX_WHATSAPP_URL);
});
