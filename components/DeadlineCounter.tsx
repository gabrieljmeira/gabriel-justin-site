"use client";

import { useEffect, useRef } from "react";
import { MOTION } from "@/lib/motion";
import { HERO_ENTER, watchMotion } from "@/lib/motion-preference";

export function DeadlineCounter({ className, numberClassName }: { className: string; numberClassName: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    let previous: number | undefined;
    let elapsed = 0;
    let enabled = false;
    let running = false;
    function tick(now: number) {
      elapsed += previous === undefined ? 0 : now - previous;
      previous = now;
      const progress = Math.min(1, Math.max(0, (elapsed - MOTION.counterDelay * 1000) / (MOTION.counter * 1000)));
      const value = Math.round(48 * (1 - Math.pow(1 - progress, 3)));
      node!.textContent = `${value}h`;
      if (progress < 1) frame = requestAnimationFrame(tick);
      else running = false;
    }
    function stop() {
      cancelAnimationFrame(frame);
      running = false;
      node!.textContent = "48h";
    }
    function start() {
      stop();
      if (!enabled) return;
      elapsed = 0;
      previous = undefined;
      running = true;
      node!.textContent = "0h";
      if (!document.hidden) frame = requestAnimationFrame(tick);
    }
    function visibility() {
      cancelAnimationFrame(frame);
      previous = undefined;
      if (running && !document.hidden) frame = requestAnimationFrame(tick);
    }
    const unsubscribe = watchMotion((state) => {
      enabled = state.enabled;
      stop();
      if (enabled && document.querySelector<HTMLElement>("[data-hero]")?.dataset.entered === "true") start();
    });
    window.addEventListener(HERO_ENTER, start);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      stop();
      unsubscribe();
      window.removeEventListener(HERO_ENTER, start);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return <strong className={className} aria-label="em até 48 horas">
    <span aria-hidden="true">em até</span>
    <span ref={ref} className={numberClassName} aria-hidden="true">48h</span>
  </strong>;
}
