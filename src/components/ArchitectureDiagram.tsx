"use client";
import { useState } from "react";
import {
  Monitor,
  Cpu,
  Server,
  Database,
  PanelsTopLeft,
  UserRound,
  ArrowRight,
  ArrowDown,
  Info,
} from "lucide-react";
import { architecture } from "@/data/project";
const icons = [Monitor, Cpu, Server, Database, PanelsTopLeft, UserRound];
export default function ArchitectureDiagram() {
  const [selected, setSelected] = useState(1);
  return (
    <div className="architecture">
      <div className="diagram" aria-label="Etapas da arquitetura">
        {architecture.map((node, i) => {
          const Icon = icons[i];
          return (
            <div className="diagram-item" key={node.name}>
              <button
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                className={
                  selected === i ? "diagram-node selected" : "diagram-node"
                }
              >
                <Icon size={25} />
                <strong>{node.name}</strong>
                <small>{node.sub}</small>
                <span>0{i + 1}</span>
              </button>
              {i < 5 && <ArrowRight className="diagram-arrow" size={18} />}
            </div>
          );
        })}
      </div>
      <div className="architecture-detail" aria-live="polite">
        <Info size={21} />
        <div>
          <strong>{architecture[selected].name}</strong>
          <p>{architecture[selected].text}</p>
        </div>
        <span className="mono">0{selected + 1} / 06</span>
      </div>
      <p className="diagram-note">
        <ArrowDown size={14} /> Fluxo conceitual dos dados. Agents e dashboard
        se comunicam com o servidor; não acessam o banco diretamente.
      </p>
    </div>
  );
}
