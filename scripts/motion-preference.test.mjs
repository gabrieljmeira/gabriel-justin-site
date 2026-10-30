import test from "node:test";
import assert from "node:assert/strict";
import { getMotionState, setMotionPreference, watchMotion, MOTION_CHANGE } from "../lib/motion-preference.ts";

test("animações começam ativas e somente a pausa escolhida pelo visitante as desativa", () => {
  const events = new EventTarget();
  const media = new EventTarget();
  media.matches = true;
  const saved = new Map();
  globalThis.window = events;
  globalThis.matchMedia = () => media;
  globalThis.localStorage = { getItem: (key) => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) };
  const states = [];
  const unsubscribe = watchMotion(({ enabled }) => states.push(enabled));

  assert.deepEqual(states, [true], "animações devem começar ativas mesmo com movimento reduzido no sistema");

  setMotionPreference("reduced");
  assert.equal(states.at(-1), false);
  assert.equal(saved.get("gj-motion-v1"), "reduced", "a pausa explícita deve ficar salva");
  media.matches = false;
  media.dispatchEvent(new Event("change"));
  assert.equal(states.at(-1), false, "pausa explícita deve continuar respeitada");

  const reloadPreference = () => {
    const event = new Event("storage");
    Object.defineProperty(event, "key", { value: "gj-motion-v1" });
    events.dispatchEvent(event);
  };
  reloadPreference();
  assert.equal(states.at(-1), false, "recarregar a preferência não deve perder a pausa salva");
  setMotionPreference("full");
  assert.equal(states.at(-1), true, "reativar deve notificar os componentes");
  reloadPreference();
  assert.equal(states.at(-1), true, "reativação deve continuar salva");
  saved.set("gj-motion-v1", "system");
  reloadPreference();
  assert.equal(states.at(-1), true, "a preferência antiga do sistema deve adotar o novo padrão ativo");
  saved.clear();
  reloadPreference();
  assert.equal(states.at(-1), true, "sem escolha salva, o padrão deve continuar ativo");

  const count = states.length;
  unsubscribe();
  events.dispatchEvent(new Event(MOTION_CHANGE));
  media.dispatchEvent(new Event("change"));
  assert.equal(states.length, count, "componentes desmontados não devem continuar recebendo eventos");

  globalThis.localStorage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  setMotionPreference("reduced");
  assert.equal(getMotionState().enabled, false, "a pausa deve funcionar mesmo sem armazenamento");
  setMotionPreference("full");
  assert.equal(getMotionState().enabled, true, "controle deve funcionar mesmo sem armazenamento disponível");
  reloadPreference();
  assert.equal(getMotionState().enabled, true, "falha no armazenamento deve manter o padrão ativo");
  delete globalThis.window;
  delete globalThis.matchMedia;
  delete globalThis.localStorage;
});
