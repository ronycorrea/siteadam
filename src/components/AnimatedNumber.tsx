"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!visible || reduced) return;
    const controls = animate(0, value, {
      duration: 0.65,
      onUpdate(latest) {
        if (ref.current) ref.current.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [value, visible, reduced]);
  return (
    <span ref={ref} aria-label={String(value)}>
      {value}
    </span>
  );
}
