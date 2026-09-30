"use client";
import Image from "next/image";
import { assetPath } from "@/lib/site";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Plus,
  Cpu,
  Activity,
  Network,
  X,
} from "lucide-react";
import { Drift, SceneLabel, useStill } from "./Experience";

export function IntroScene() {
  const ref = useRef<HTMLElement>(null);
  const still = useStill();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 55, damping: 18 });
  const sy = useSpring(y, { stiffness: 55, damping: 18 });
  const rotate = useTransform(sx, [-1, 1], [-4, 4]);
  const offsetX = useTransform(sx, [-1, 1], [-18, 18]);
  const offsetY = useTransform(sy, [-1, 1], [-12, 12]);
  const [hotspot, setHotspot] = useState<string | null>(null);
  const notes: { [key: string]: string } = {
    agent:
      "Um Agent Python em cada computador coleta as informações e recebe solicitações do servidor.",
    dados:
      "CPU, RAM, disco e atividade são enviados periodicamente para uma visão central.",
    controle:
      "O responsável consulta os dados e solicita ações pelo navegador. Este site apenas apresenta o projeto.",
  };
  return (
    <section
      id="abertura"
      className="xp-hero xp-scene"
      ref={ref}
      onPointerMove={(e) => {
        if (still || e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
        y.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="hero-topline">
        <span>UM PROJETO DE RONALD ARAÚJO CORRÊA</span>
        <span>COMPUTADORES CONECTADOS. INFORMAÇÃO CENTRALIZADA.</span>
      </div>
      <div className="hero-word">
        <h1>A.D.A.M.</h1>
      </div>
      <div className="hero-intro">
        <span className="tiny-cross">+</span>
        <p>
          Assistente de Diagnóstico
          <br />
          Automatizado de Máquinas
        </p>
      </div>
      <motion.div
        className="hero-hardware"
        style={still ? {} : { rotate, x: offsetX, y: offsetY }}
      >
        <Image
          src={assetPath("/images/adam-workstation.png")}
          alt="Representação tridimensional de um computador, teclado e gabinete com indicadores de monitoramento"
          width={1024}
          height={1024}
          priority
          sizes="(max-width: 640px) 95vw, 57vw"
        />
        <div className="hardware-shadow" />
      </motion.div>
      <Drift className="hero-floating floating-cpu" distance={65} rotate={9}>
        <button
          className="object-chip"
          onClick={() => setHotspot(hotspot === "agent" ? null : "agent")}
          aria-expanded={hotspot === "agent"}
        >
          <Cpu size={26} />
          <span>
            AGENT
            <br />
            <strong>PYTHON</strong>
          </span>
          <Plus size={16} />
        </button>
      </Drift>
      <Drift className="hero-floating floating-wave" distance={-55} rotate={-7}>
        <button
          className="object-wave"
          onClick={() => setHotspot(hotspot === "dados" ? null : "dados")}
          aria-expanded={hotspot === "dados"}
        >
          <span>
            TELEMETRIA <Plus size={14} />
          </span>
          <svg viewBox="0 0 155 45" aria-hidden="true">
            <path d="M0 28H16L25 15L32 37L41 6L52 28H66L75 19L82 33L91 12L102 27H116L126 18L132 28H155" />
          </svg>
          <small>Uma máquina. Muitas informações.</small>
        </button>
      </Drift>
      <button
        className="hero-orbit"
        aria-label="Entender o controle centralizado"
        onClick={() => setHotspot(hotspot === "controle" ? null : "controle")}
        aria-expanded={hotspot === "controle"}
      >
        <svg viewBox="0 0 150 150" aria-hidden="true">
          <defs>
            <path
              id="hero-circle"
              d="M75,75 m-55,0 a55,55 0 1,1 110,0 a55,55 0 1,1 -110,0"
            />
          </defs>
          <text>
            <textPath href="#hero-circle">
              MONITORAR · ENTENDER · GERENCIAR ·{" "}
            </textPath>
          </text>
        </svg>
        <Network size={31} />
      </button>
      <AnimatePresence>
        {hotspot && (
          <motion.div
            className="hero-hotspot-note"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <p>{notes[hotspot]}</p>
            <button
              aria-label="Fechar explicação"
              onClick={() => setHotspot(null)}
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hero-side-copy">
        <span>
          SEU LABORATÓRIO.
          <br />
          UM NOVO PONTO DE VISTA.
        </span>
        <p>
          Conheça o caminho entre
          <br />
          uma máquina e o todo.
        </p>
      </div>
      <div className="hero-lower">
        <a className="hero-discover" href="#laboratorio">
          ROLE PARA DESCOBRIR{" "}
          <span>
            <ArrowDown size={21} />
          </span>
        </a>
        <span className="hero-small-note">
          Uma experiência para conhecer o projeto.
          <br />
          Todas as interações são demonstrativas.
        </span>
        <span className="hero-page-number">01 — 07</span>
      </div>
    </section>
  );
}

const pcIssues = [
  "Tudo certo por aqui.",
  "A memória começa a encher.",
  "A CPU está em 92%.",
  "O computador ficou offline.",
  "Pouco espaço em disco.",
  "Uma atualização precisa de atenção.",
];
export function LabScene() {
  const [central, setCentral] = useState(false);
  const [selected, setSelected] = useState(2);
  const still = useStill();
  return (
    <section id="laboratorio" className="xp-scene xp-lab">
      <div className="xp-scene-inner">
        <div className="lab-copy">
          <SceneLabel number="02">O PONTO DE PARTIDA</SceneLabel>
          <h2>
            UMA MÁQUINA
            <br />É FÁCIL.
            <br />
            <span>E UM LABORATÓRIO?</span>
          </h2>
          <p>
            Lentidão. Falhas. Computadores offline.
            <br />
            Verificar um por um custa tempo.
            <br />O A.D.A.M. propõe olhar para o conjunto.
          </p>
          <button
            className="pill-button ink"
            onClick={() => setCentral(!central)}
            aria-pressed={central}
          >
            {central ? "Espalhar novamente" : "Juntar em uma visão"}
            <ArrowUpRight size={19} />
          </button>
        </div>
        <div className={`lab-playground ${central ? "centralized" : ""}`}>
          <div className="lab-orbit-lines" aria-hidden="true" />
          <span className="playground-instruction">
            CLIQUE NAS MÁQUINAS. EXPLORE O PROBLEMA.
          </span>
          {pcIssues.map((message, i) => {
            const scattered = [
              [-32, -12, -12],
              [39, -25, 10],
              [-4, 23, -5],
              [53, 42, 14],
              [-36, 66, -8],
              [12, 83, 7],
            ][i];
            return (
              <motion.button
                key={message}
                className={`scene-computer pc-${i} ${selected === i ? "chosen" : ""} ${i === 3 ? "offline" : i === 2 ? "alert" : ""}`}
                aria-label={`Inspecionar PC-0${i + 1}`}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                animate={{
                  x: central ? `${((i % 3) - 1) * 104}%` : `${scattered[0]}%`,
                  y: central
                    ? `${Math.floor(i / 3) * 122 - 20}%`
                    : `${scattered[1]}%`,
                  rotate: central ? 0 : scattered[2],
                }}
                transition={
                  still
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 70, damping: 15 }
                }
              >
                <div className="scene-monitor">
                  <div className="scene-screen">
                    <span>0{i + 1}</span>
                    <i />
                    <div className="screen-bars">
                      <b />
                      <b />
                      <b />
                    </div>
                  </div>
                  <span className="monitor-chin">A.D.A.M.</span>
                </div>
                <div className="scene-stand" />
                <span className="pc-label">PC-0{i + 1}</span>
              </motion.button>
            );
          })}
          <div className="lab-report" aria-live="polite">
            <Activity size={19} />
            <span>
              <strong>
                {central ? "VISÃO CENTRALIZADA" : `PC-0${selected + 1}`}
              </strong>
              <p>
                {central
                  ? "Os dados de todas as estações chegam ao mesmo lugar."
                  : pcIssues[selected]}
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="scene-bottom">
        <span>DA VERIFICAÇÃO INDIVIDUAL À VISÃO CENTRAL</span>
        <a href="#caminho">
          Como isso acontece <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}
