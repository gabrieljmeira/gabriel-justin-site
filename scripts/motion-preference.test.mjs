import test from "node:test";
import assert from "node:assert/strict";
import { getMotionState, setMotionPreference, watchMotion, MOTION_CHANGE } from "../lib/motion-preference.ts";

test("a escolha de movimento respeita o sistema, permite ativação explícita e reage a mudanças", () => {
  const events = new EventTarget();
  const media = new EventTarget();
  media.matches = true;
  const saved = new Map();
  globalThis.window = events;
  globalThis.matchMedia = () => media;
  globalThis.localStorage = { getItem: (key) => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value) };
  const states = [];
  const unsubscribe = watchMotion(({ enabled }) => states.push(enabled));

  assert.deepEqual(states, [false], "movimento reduzido deve ser o padrão quando solicitado pelo sistema");
  setMotionPreference("full");
  assert.equal(states.at(-1), true, "o visitante pode ativar efeitos sem mudar o sistema");
  assert.equal(saved.get("gj-motion-v1"), "full", "a escolha deve sobreviver à reabertura");

  setMotionPreference("reduced");
  media.matches = false;
  media.dispatchEvent(new Event("change"));
  assert.equal(states.at(-1), false, "pausa explícita deve continuar respeitada");

  setMotionPreference("system");
  assert.equal(states.at(-1), true);
  media.matches = true;
  media.dispatchEvent(new Event("change"));
  assert.equal(states.at(-1), false);
  media.matches = false;
  media.dispatchEvent(new Event("change"));
  assert.equal(states.at(-1), true, "habilitar movimento posteriormente deve notificar os componentes");

  const count = states.length;
  unsubscribe();
  events.dispatchEvent(new Event(MOTION_CHANGE));
  media.dispatchEvent(new Event("change"));
  assert.equal(states.length, count, "componentes desmontados não devem continuar recebendo eventos");

  globalThis.localStorage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  setMotionPreference("full");
  assert.equal(getMotionState().enabled, true, "controle deve funcionar mesmo sem armazenamento disponível");
  delete globalThis.window;
  delete globalThis.matchMedia;
  delete globalThis.localStorage;
});
