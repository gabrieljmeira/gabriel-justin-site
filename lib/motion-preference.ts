export const MOTION_CHANGE = "site:motion-change";
export const HERO_ENTER = "site:hero-enter";
const STORAGE_KEY = "gj-motion-v1";
type Preference = "full" | "reduced";
let selection: Preference | undefined;

export function getMotionState() {
  if (selection === undefined) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      selection = saved === "reduced" ? "reduced" : "full";
    } catch { selection = "full"; }
  }
  return { enabled: selection === "full" };
}

export function setMotionPreference(value: Preference) {
  selection = value;
  try { localStorage.setItem(STORAGE_KEY, value); } catch { /* In-memory choice still works. */ }
  window.dispatchEvent(new Event(MOTION_CHANGE));
}

export function watchMotion(callback: (state: ReturnType<typeof getMotionState>) => void) {
  const notify = () => callback(getMotionState());
  const storage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) { selection = undefined; notify(); }
  };
  window.addEventListener(MOTION_CHANGE, notify);
  window.addEventListener("storage", storage);
  notify();
  return () => {
    window.removeEventListener(MOTION_CHANGE, notify);
    window.removeEventListener("storage", storage);
  };
}
