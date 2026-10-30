export const MOTION_CHANGE = "site:motion-change";
export const HERO_ENTER = "site:hero-enter";
const STORAGE_KEY = "gj-motion-v1";
type Preference = "system" | "full" | "reduced";
let selection: Preference | undefined;

export function getMotionState() {
  if (selection === undefined) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      selection = saved === "full" || saved === "reduced" ? saved : "system";
    } catch { selection = "system"; }
  }
  const systemReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  return { enabled: selection === "full" || (selection === "system" && !systemReduced) };
}

export function setMotionPreference(value: Preference) {
  selection = value;
  try { localStorage.setItem(STORAGE_KEY, value); } catch { /* In-memory choice still works. */ }
  window.dispatchEvent(new Event(MOTION_CHANGE));
}

export function watchMotion(callback: (state: ReturnType<typeof getMotionState>) => void) {
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const notify = () => callback(getMotionState());
  const storage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) { selection = undefined; notify(); }
  };
  media.addEventListener("change", notify);
  window.addEventListener(MOTION_CHANGE, notify);
  window.addEventListener("storage", storage);
  notify();
  return () => {
    media.removeEventListener("change", notify);
    window.removeEventListener(MOTION_CHANGE, notify);
    window.removeEventListener("storage", storage);
  };
}
