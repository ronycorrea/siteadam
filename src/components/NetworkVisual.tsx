"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Monitor,
  ArrowUpRight,
  Server,
  Activity,
  ArrowDown,
  Check,
} from "lucide-react";
const stations = [
  {
    name: "PC-01",
    cpu: 21,
    ram: 48,
    status: "Online",
    message: "O Agent coleta os dados desta estação e os envia ao servidor.",
  },
  {
    name: "PC-02",
    cpu: 34,
    ram: 52,
    status: "Online",
    message:
      "Cada computador tem seu próprio Agent. O servidor reúne as informações.",
  },
  {
    name: "PC-03",
    cpu: 92,
    ram: 81,
    status: "Atenção",
    message:
      "O consumo elevado aparece na visão central, ajudando a localizar o problema.",
  },
  {
    name: "PC-04",
    cpu: 18,
    ram: 37,
    status: "Online",
    message:
      "O administrador acompanha as máquinas pelo navegador, em uma única interface.",
  },
  {
    name: "PC-05",
    cpu: 0,
    ram: 0,
    status: "Offline",
    message:
      "Sem contato com o Agent, a estação aparece como indisponível. Nenhum dado atual é presumido.",
  },
];
export default function NetworkVisual() {
  const [selected, setSelected] = useState(0);
  const [flow, setFlow] = useState(false);
  const reduced = useReducedMotion();
  const station = stations[selected];
  return (
    <div className="explorer">
      <div className="explorer-header">
        <span>
          <i />O PROJETO, EM FUNCIONAMENTO
        </span>
        <span>01—05</span>
      </div>
      <div className="explorer-instruction">
        <h3>Cada máquina conta uma parte.</h3>
        <p>Selecione um computador para entender.</p>
      </div>
      <div
        className="station-selector"
        aria-label="Explorar computadores ilustrativos"
      >
        {stations.map((pc, i) => (
          <button
            key={pc.name}
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
            aria-label={`Explorar ${pc.name}`}
            className={`${selected === i ? "active " : ""}${pc.status === "Atenção" ? "attention" : pc.status === "Offline" ? "offline" : ""}`}
          >
            <Monitor size={28} />
            <span>{pc.name}</span>
            <i />
          </button>
        ))}
      </div>
      <div className="explorer-connection">
        <span>Agent Python</span>
        <div>
          <i />
          <i />
          <i />
        </div>
        <span>REST / HTTP</span>
      </div>
      <div className="explorer-data">
        <div className="explorer-data-head">
          <span>
            <Activity size={15} />
            {station.name}
          </span>
          <span
            className={
              station.status === "Atenção"
                ? "attention"
                : station.status === "Offline"
                  ? "offline"
                  : ""
            }
          >
            {station.status}
          </span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? {} : { opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="explorer-metrics"
          >
            <div>
              <span>CPU</span>
              <strong>
                {station.status === "Offline" ? "—" : station.cpu}
                <small>{station.status === "Offline" ? "" : "%"}</small>
              </strong>
              <div>
                <i style={{ width: `${station.cpu}%` }} />
              </div>
            </div>
            <div>
              <span>MEMÓRIA RAM</span>
              <strong>
                {station.status === "Offline" ? "—" : station.ram}
                <small>{station.status === "Offline" ? "" : "%"}</small>
              </strong>
              <div>
                <i style={{ width: `${station.ram}%` }} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="explorer-server">
        <Server size={19} />
        <span>
          Servidor A.D.A.M.
          <small>Recebe, organiza e disponibiliza os dados.</small>
        </span>
        <Check size={16} />
      </div>
      <div className="explorer-description" aria-live="polite">
        <p>{station.message}</p>
        <button onClick={() => setFlow(!flow)} aria-expanded={flow}>
          {flow ? "Fechar explicação" : "E depois?"}
          <ArrowUpRight size={15} />
        </button>
      </div>
      <AnimatePresence>
        {flow && (
          <motion.div
            className="explorer-next"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <div>
              <ArrowDown size={15} />
              <p>
                Os dados ficam disponíveis no dashboard. O responsável pode
                consultar o estado da máquina e solicitar uma ação ao servidor.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="explorer-footer">
        <span>FIG. 01 / TELEMETRIA</span>
        <span>Modelo interativo · dados fictícios</span>
      </div>
    </div>
  );
}
