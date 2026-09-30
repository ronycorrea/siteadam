"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Activity,
  Terminal,
  Network,
} from "lucide-react";
const items = [
  {
    title: "Observe.",
    sub: "Monitoramento e diagnóstico",
    icon: Activity,
    text: "CPU, memória, disco e disponibilidade ajudam a identificar as máquinas que precisam de atenção.",
    detail:
      "Exemplo: o PC-03 apresenta uso elevado de CPU. A visão central permite localizar a estação e consultar seus indicadores.",
    labels: ["CPU", "Memória", "Armazenamento", "Rede", "Processos"],
  },
  {
    title: "Organize.",
    sub: "Laboratórios e computadores",
    icon: Network,
    text: "Localize os computadores por laboratório e posição. Uma estrutura que acompanha o espaço físico.",
    detail:
      "Exemplo: Laboratório 01 / PC-03. Selecione uma estação ou um grupo para acompanhar o estado das máquinas.",
    labels: ["Laboratórios", "Posições", "Status", "Seleção múltipla"],
  },
  {
    title: "Solicite.",
    sub: "Gerenciamento remoto",
    icon: Terminal,
    text: "A solicitação passa pelo servidor. O Agent recebe o comando e executa a ação localmente em Python.",
    detail:
      "Exemplo: abrir um programa. O servidor valida e registra; o Agent consulta a fila, executa e devolve o resultado.",
    labels: ["Validação", "Fila de comandos", "Execução local", "Histórico"],
  },
];
export default function ResourceExplorer() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();
  return (
    <div className="resource-explorer">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.article
            key={item.title}
            className={active === i ? "open" : ""}
            whileHover={reduced ? {} : { y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="resource-top">
              <Icon size={24} />
              <span>0{i + 1}</span>
            </div>
            <h3>{item.title}</h3>
            <h4>{item.sub}</h4>
            <p>{item.text}</p>
            <div className="resource-labels">
              {item.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <button
              aria-expanded={active === i}
              onClick={() => setActive(active === i ? null : i)}
            >
              {active === i ? "Fechar exemplo" : "Ver um exemplo"}
              {active === i ? <Minus size={17} /> : <Plus size={17} />}
            </button>
            <AnimatePresence>
              {active === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                  className="resource-expanded"
                >
                  <p>
                    <ArrowUpRight size={16} />
                    {item.detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
