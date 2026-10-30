"use client";

import { useEffect, useRef } from "react";
import { MOTION } from "@/lib/motion";

export function DeadlineCounter({ className, numberClassName }: { className: string; numberClassName: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start: number | undefined;
    function tick(now: number) {
      start ??= now;
      const progress = Math.min(1, (now - start) / (MOTION.counter * 1000));
      const value = Math.round(48 * (1 - Math.pow(1 - progress, 3)));
      node!.textContent = `${value}h`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    function stop() {
      cancelAnimationFrame(frame);
      node!.textContent = "48h";
    }
    if (!reduced.matches) frame = requestAnimationFrame(tick);
    reduced.addEventListener("change", stop);
    return () => { stop(); reduced.removeEventListener("change", stop); };
  }, []);
  return <strong className={className} aria-label="em até 48 horas">
    <span aria-hidden="true">em até</span>
    <span ref={ref} className={numberClassName} aria-hidden="true">48h</span>
  </strong>;
}
