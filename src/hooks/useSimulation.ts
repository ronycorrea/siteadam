"use client";
import { useEffect, useRef, useState } from "react";
export function useSimulation(last: number, delay = 850) {
  const [step, setStep] = useState(-1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const running = step >= 0 && step < last;
  function start() {
    if (timer.current) clearInterval(timer.current);
    setStep(0);
    let current = 0;
    timer.current = setInterval(() => {
      current++;
      setStep(current);
      if (current >= last && timer.current) clearInterval(timer.current);
    }, delay);
  }
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  return { step, running, start };
}
