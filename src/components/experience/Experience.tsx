"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Pause, Play } from "lucide-react";
import { IntroScene, LabScene } from "./IntroScenes";
import { JourneyScene, MetricsScene } from "./SystemScenes";
import { RemoteScene, IntelligenceScene, ExploreScene } from "./ExploreScenes";

const Movement = createContext(false);
function subscribeMotion(listener: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
function getMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getServerMotionSnapshot() {
  return true;
}
export function useStill() {
  return useContext(Movement);
}
export function Drift({
  children,
  className = "",
  distance = 60,
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useStill();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const angle = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={still ? {} : { y, rotate: angle }}
    >
      {children}
    </motion.div>
  );
}
export function SceneLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="scene-label">
      <span>{number} /</span>
      {children}
    </div>
  );
}
export function RoundLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="round-link" href={href}>
      <span>{children}</span>
      <ArrowDown size={20} />
    </a>
  );
}
const scenes = [
  ["abertura", "O projeto"],
  ["laboratorio", "O problema"],
  ["caminho", "Como funciona"],
  ["monitoramento", "Monitoramento"],
  ["comandos", "Comandos"],
  ["inteligencia", "IA e voz"],
  ["explorar", "Explore"],
];
export default function Experience() {
  const reduced = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getServerMotionSnapshot,
  );
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState("abertura");
  const still = Boolean(reduced) || paused;
  useEffect(() => {
    const elements = scenes
      .map(([id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const handle = () => {
      let current = elements[0]?.id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5)
          current = el.id;
      }
      if (current) setActive(current);
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return (
    <Movement.Provider value={still}>
      <MotionConfig reducedMotion={still ? "always" : "user"}>
        <div className={`adam-experience ${still ? "motion-paused" : ""}`}>
          <nav className="scene-index" aria-label="Capítulos da apresentação">
            {scenes.map(([id, label], i) => (
              <a
                href={`#${id}`}
                aria-current={active === id ? "step" : undefined}
                aria-label={`${i + 1}. ${label}`}
                key={id}
              >
                <span>{label}</span>
                <i />
              </a>
            ))}
          </nav>
          <button
            className="movement-control"
            aria-label={paused ? "Ativar animações" : "Pausar animações"}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
            <span>{paused ? "Movimento pausado" : "Pausar movimento"}</span>
          </button>
          <IntroScene />
          <LabScene />
          <JourneyScene />
          <MetricsScene />
          <RemoteScene />
          <IntelligenceScene />
          <ExploreScene />
        </div>
      </MotionConfig>
    </Movement.Provider>
  );
}
