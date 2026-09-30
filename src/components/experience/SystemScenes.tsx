"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Cpu,
  Server,
  Database,
  Monitor,
  Radio,
  HardDrive,
  MemoryStick,
  Activity,
  Network,
} from "lucide-react";
import Link from "next/link";
import { Drift, SceneLabel, useStill } from "./Experience";
const stages = [
  {
    word: "COLETA.",
    name: "Tudo começa na máquina.",
    text: "O Agent Python roda em segundo plano. Ele coleta CPU, memória, armazenamento, rede, processos e atividade.",
    stamp: "01 / AGENT PYTHON",
    code: "PC-07 → CPU 18% · RAM 47%",
  },
  {
    word: "CONEXÃO.",
    name: "Os dados ganham um caminho.",
    text: "Periodicamente, o Agent envia a telemetria ao servidor FastAPI por REST/HTTP, dentro da rede local.",
    stamp: "02 / REDE LOCAL",
    code: "Agent → HTTP → FastAPI",
  },
  {
    word: "CONTEXTO.",
    name: "O servidor reúne as partes.",
    text: "FastAPI recebe e organiza os dados. SQLAlchemy e SQLite apoiam o armazenamento e o histórico das máquinas.",
    stamp: "03 / SERVIDOR + BANCO",
    code: "FastAPI → SQLAlchemy → SQLite",
  },
  {
    word: "VISÃO.",
    name: "O laboratório cabe no navegador.",
    text: "O dashboard apresenta os computadores, os indicadores e os alertas. O responsável vê o conjunto e decide a próxima ação.",
    stamp: "04 / DASHBOARD WEB",
    code: "Servidor → Dashboard → Administrador",
  },
];
export function JourneyScene() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const still = useStill();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const wordX = useTransform(scrollYProgress, [0, 1], ["4%", "-8%"]);
  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight)),
      );
      setActive(Math.min(3, Math.floor(progress * 4)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const icons = [Cpu, Radio, Server, Monitor];
  const StageIcon = icons[active];
  return (
    <section id="caminho" className="xp-journey" ref={ref}>
      <div className="journey-pin">
        <SceneLabel number="03">SIGA O CAMINHO DOS DADOS</SceneLabel>
        <motion.div
          className="journey-giant"
          style={still ? {} : { x: wordX }}
          aria-hidden="true"
        >
          {stages[active].word}
        </motion.div>
        <div className="journey-content">
          <div className="journey-object">
            <div className="journey-rings">
              <span />
              <span />
              <span />
            </div>
            <motion.div
              className="journey-core"
              animate={{ rotate: still ? 0 : active * 8 - 12 }}
              transition={{ type: "spring", stiffness: 40, damping: 15 }}
            >
              <StageIcon size={94} strokeWidth={1} />
              <span>{stages[active].stamp}</span>
            </motion.div>
            <div className="journey-data-chip">
              <span />
              <code>{stages[active].code}</code>
            </div>
            <Drift
              className="journey-satellite satellite-one"
              distance={45}
              rotate={10}
            >
              <Database size={29} />
            </Drift>
            <Drift
              className="journey-satellite satellite-two"
              distance={-45}
              rotate={-10}
            >
              <Network size={30} />
            </Drift>
          </div>
          <div className="journey-text">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={still ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={still ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <span className="journey-count">
                  0{active + 1}
                  <small>/ 04</small>
                </span>
                <h2>{stages[active].name}</h2>
                <p>{stages[active].text}</p>
              </motion.div>
            </AnimatePresence>
            <Link href="/como-funciona" className="underlined-link">
              Entender cada etapa <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
        <div className="journey-steps">
          {["Agent", "Rede local", "Servidor", "Dashboard"].map((label, i) => (
            <button
              key={label}
              aria-label={`Ir à etapa ${i + 1}: ${label}`}
              aria-pressed={active === i}
              className={active === i ? "active" : ""}
              onClick={() => {
                if (!ref.current) return;
                window.scrollTo({
                  top:
                    window.scrollY +
                    ref.current.getBoundingClientRect().top +
                    (ref.current.offsetHeight - window.innerHeight) *
                      ((i + 0.35) / 4),
                  behavior: still ? "instant" : "smooth",
                });
              }}
            >
              <span>0{i + 1}</span>
              {label}
              <i />
            </button>
          ))}
        </div>
        <div className="journey-scroll-note">
          <ArrowDown size={15} /> A rolagem acompanha o fluxo.
        </div>
      </div>
    </section>
  );
}
const metrics = [
  {
    name: "CPU",
    value: 21,
    unit: "%",
    title: "O RITMO DA MÁQUINA.",
    text: "O uso do processador ajuda a identificar sobrecarga e investigar lentidão.",
    icon: Cpu,
  },
  {
    name: "Memória",
    value: 48,
    unit: "%",
    title: "ESPAÇO PARA TRABALHAR.",
    text: "Acompanhe o consumo de RAM e reconheça quando os recursos começam a ficar limitados.",
    icon: MemoryStick,
  },
  {
    name: "Disco",
    value: 61,
    unit: "%",
    title: "CADA ARQUIVO CONTA.",
    text: "O armazenamento disponível ajuda a antecipar necessidades de manutenção.",
    icon: HardDrive,
  },
  {
    name: "Rede",
    value: 32,
    unit: "Mb/s",
    title: "A CONEXÃO TAMBÉM FALA.",
    text: "Informações de rede complementam a visão da atividade de cada computador.",
    icon: Network,
  },
];
export function MetricsScene() {
  const [active, setActive] = useState(0);
  const [machine, setMachine] = useState(1);
  const still = useStill();
  const item = metrics[active];
  const value = item.value + (machine - 1) * 3;
  return (
    <section id="monitoramento" className="xp-scene xp-metrics">
      <div className="xp-scene-inner">
        <div className="metrics-copy">
          <SceneLabel number="04">MONITORAMENTO</SceneLabel>
          <h2>
            CADA MÁQUINA
            <br />
            TEM ALGO
            <br />
            <span>A DIZER.</span>
          </h2>
          <p>
            Explore os indicadores.
            <br />
            Troque a máquina. Mude o ponto de vista.
          </p>
          <div
            className="metric-tabs"
            role="group"
            aria-label="Indicador demonstrativo"
          >
            {metrics.map((m, i) => (
              <button
                key={m.name}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                <m.icon size={17} />
                {m.name}
              </button>
            ))}
          </div>
          <Link className="underlined-link" href="/demonstracao">
            Explorar o dashboard completo <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="metric-universe">
          <div className="metric-backword" aria-hidden="true">
            {item.name.toUpperCase()}
          </div>
          <Drift className="metric-float-tag" distance={55} rotate={8}>
            <Activity size={18} /> TELEMETRIA DA ESTAÇÃO
          </Drift>
          <div className="metric-dial">
            <svg viewBox="0 0 280 280" aria-hidden="true">
              <circle cx="140" cy="140" r="120" />
              <motion.circle
                cx="140"
                cy="140"
                r="120"
                animate={{ pathLength: value / 100 }}
                transition={{ duration: still ? 0 : 0.8 }}
              />
            </svg>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${active}-${machine}`}
                initial={still ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={still ? {} : { opacity: 0, scale: 1.08 }}
                transition={{ duration: 0.2 }}
              >
                <strong>{value}</strong>
                <span>{item.unit}</span>
                <small>{item.name}</small>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="metric-caption" aria-live="polite">
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
          <div className="machine-switch">
            <span>ESTAÇÃO</span>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                aria-pressed={machine === n}
                onClick={() => setMachine(n)}
              >
                PC-0{n}
              </button>
            ))}
          </div>
          <span className="metrics-disclaimer">
            Dados ilustrativos · nenhuma máquina conectada
          </span>
        </div>
      </div>
      <div className="scene-bottom">
        <span>CPU · RAM · DISCO · REDE · PROCESSOS · SISTEMA · ATIVIDADE</span>
        <Link href="/recursos">
          Todos os recursos <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
