"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import {
  Monitor,
  Cpu,
  Server,
  PanelsTopLeft,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
const chapters = [
  {
    title: "O computador informa.",
    label: "COLETA",
    text: "Em cada estação, um Agent Python coleta CPU, memória, armazenamento e informações do sistema. A telemetria parte da própria máquina.",
    detail: "PC-03 → Agent Python",
    value: "cpu: 92% · ram: 81%",
  },
  {
    title: "O Agent envia.",
    label: "COMUNICAÇÃO",
    text: "Periodicamente, o Agent transmite os dados por REST/HTTP ao servidor na rede local. Também consulta se há comandos destinados à sua estação.",
    detail: "Agent → Servidor FastAPI",
    value: "telemetria enviada pela rede local",
  },
  {
    title: "O servidor organiza.",
    label: "PROCESSAMENTO",
    text: "FastAPI recebe as informações. SQLAlchemy e SQLite apoiam o armazenamento, enquanto o servidor gerencia o estado das máquinas e os comandos.",
    detail: "FastAPI → SQLite",
    value: "PC-03 · registro atualizado",
  },
  {
    title: "Você vê o conjunto.",
    label: "VISUALIZAÇÃO",
    text: "No navegador, o responsável acompanha o laboratório. O consumo elevado do PC-03 fica visível sem precisar verificar cada computador pessoalmente.",
    detail: "Servidor → Dashboard Web",
    value: "PC-03 · atenção: CPU elevada",
  },
];
export default function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const articles = ref.current?.querySelectorAll<HTMLElement>(
          ".story-chapters article",
        );
        if (!articles) return;
        const readingLine =
          window.innerHeight * (window.innerWidth <= 640 ? 0.65 : 0.5);
        let nearest = 0;
        let distance = Infinity;
        articles.forEach((article, index) => {
          const rect = article.getBoundingClientRect();
          const delta = Math.abs(rect.top + rect.height / 2 - readingLine);
          if (delta < distance) {
            distance = delta;
            nearest = index;
          }
        });
        setActive(nearest);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const icons = [Monitor, Cpu, Server, PanelsTopLeft];
  return (
    <section
      className="scroll-story container"
      ref={ref}
      aria-label="Explicação do fluxo acompanhando a rolagem"
    >
      <div className="story-visual">
        <div className="story-kicker">
          SIGA UM DADO <ArrowDown size={14} />
        </div>
        <h2>
          Da máquina
          <br />à sua <em>visão.</em>
        </h2>
        <p className="story-intro">
          Role para acompanhar o caminho
          <br />
          de uma informação no A.D.A.M.
        </p>
        <div className="story-map">
          {chapters.map((chapter, i) => {
            const Icon = icons[i];
            return (
              <div
                className={`story-map-step ${active === i ? "active" : ""} ${active > i ? "passed" : ""}`}
                key={chapter.label}
              >
                <button
                  aria-label={`Etapa ${i + 1}: ${chapter.label}`}
                  aria-pressed={active === i}
                  onClick={() =>
                    document.getElementById(`story-${i}`)?.scrollIntoView({
                      behavior: reduced ? "instant" : "smooth",
                      block: "center",
                    })
                  }
                >
                  <span>
                    <Icon size={23} />
                  </span>
                  <strong>
                    {["Computador", "Agent Python", "Servidor", "Dashboard"][i]}
                  </strong>
                  <small>0{i + 1}</small>
                </button>
                {i < 3 && (
                  <div className="story-wire">
                    <motion.i
                      animate={{
                        top: active === i ? ["0%", "85%"] : "85%",
                        opacity: active === i ? 1 : 0.3,
                      }}
                      transition={{
                        duration: reduced ? 0 : 1.6,
                        repeat: reduced ? 0 : Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="story-caption">
          <span>MODELO CONCEITUAL</span>
          <div>
            <motion.i style={{ scaleX: scrollYProgress }} />
          </div>
          <span>0{active + 1}/04</span>
        </div>
      </div>
      <div className="story-chapters">
        {chapters.map((chapter, i) => (
          <article
            id={`story-${i}`}
            key={chapter.label}
            className={active === i ? "active" : ""}
          >
            <span className="eyebrow">
              0{i + 1} / {chapter.label}
            </span>
            <h3>{chapter.title}</h3>
            <p>{chapter.text}</p>
            <div className="story-data">
              <span>
                <ArrowRight size={14} />
                {chapter.detail}
              </span>
              <code>{chapter.value}</code>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
