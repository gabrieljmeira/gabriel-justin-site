import type { CSSProperties } from "react";
import { MOTION } from "@/lib/motion";
import styles from "./DesktopVisuals.module.css";

// Deterministic positions keep the decorative layer identical during hydration.
const orbs = [
  { x: 4, depth: 1 }, { x: 13, depth: 2 }, { x: 23, depth: 0 },
  { x: 34, depth: 2 }, { x: 44, depth: 1 }, { x: 55, depth: 2 },
  { x: 65, depth: 0 }, { x: 76, depth: 2 }, { x: 87, depth: 1 },
  { x: 96, depth: 0 }, { x: 8, depth: 2 }, { x: 92, depth: 2 },
] as const;

export function DesktopOrbs() {
  return <div className={styles.falling} aria-hidden="true">
    {orbs.map(({ x, depth }, i) => {
      const duration = MOTION.orbFall + depth * MOTION.orbDepthStep;
      return <span key={i} className={styles.particle} style={{
        "--orb-x": `${x}%`,
        "--orb-size": `${20 - depth * 6}px`,
        "--orb-opacity": 0.34 - depth * 0.08,
        "--orb-duration": `${duration}s`,
        "--orb-delay": `${-((i * 0.137) % 1) * duration}s`,
        "--orb-drift": `${12 - depth * 3}px`,
        "--orb-sway-duration": `${MOTION.orbSway + depth * MOTION.orbDepthStep}s`,
      } as CSSProperties}><span className={styles.orb} /></span>;
    })}
  </div>;
}
