"use client";

import { useEffect, useState } from "react";
import { setMotionPreference, watchMotion } from "@/lib/motion-preference";
import hero from "@/app/Hero.module.css";

export function MotionToggle() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.dataset.motion;
    const unsubscribe = watchMotion((state) => {
      root.dataset.motion = state.enabled ? "full" : "reduced";
      setEnabled(state.enabled);
    });
    return () => {
      unsubscribe();
      if (previous === undefined) delete root.dataset.motion;
      else root.dataset.motion = previous;
    };
  }, []);
  if (enabled === null) return null;
  return <button className={hero.motionToggle} type="button" aria-label="Animações do site" aria-pressed={enabled}
    onClick={() => setMotionPreference(enabled ? "reduced" : "full")}>
    {enabled ? "Pausar animações" : "Ativar animações"}
  </button>;
}
