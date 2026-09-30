"use client";
import { useEffect, useRef, useState } from "react";
import {
  Monitor,
  LayoutDashboard,
  Network,
  Terminal,
  Sparkles,
  Package,
  ChartNoAxesCombined,
  Bell,
  Settings,
  Search,
  X,
  ArrowUpRight,
  Check,
  ChevronRight,
} from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";
import { CommandDemo, AIDemo, MonitoringCharts, Reports } from "./Simulations";
import AnimatedNumber from "./AnimatedNumber";
const tabs = [
  ["Painel principal", LayoutDashboard],
  ["Laboratórios", Network],
  ["Máquinas", Monitor],
  ["Comandos", Terminal],
  ["Assistente", Sparkles],
  ["Programas", Package],
  ["Relatórios", ChartNoAxesCombined],
  ["Eventos", Bell],
  ["Configurações", Settings],
] as const;
export type Machine = {
  id: number;
  name: string;
  status: "Online" | "Alerta" | "Offline";
  cpu: number;
  ram: number;
  disk: number;
};
function machines(count: number, healthy = false): Machine[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `PC-${String(i + 1).padStart(2, "0")}`,
    status:
      !healthy && i === 6
        ? "Alerta"
        : !healthy && i === 18
          ? "Offline"
          : "Online",
    cpu: !healthy && i === 6 ? 92 : 18 + ((i * 7) % 29),
    ram: 35 + ((i * 11) % 39),
    disk: 42 + ((i * 3) % 37),
  }));
}
export function MachineCard({
  machine,
  selected,
  onClick,
}: {
  machine: Machine;
  selected: boolean;
  onClick: () => void;
}) {
  const cls =
    machine.status === "Alerta"
      ? "warning"
      : machine.status === "Offline"
        ? "danger"
        : "";
  return (
    <button
      className={`machine-card ${cls} ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-label={`${machine.name}, ${machine.status}, ver detalhes`}
    >
      <div>
        <Monitor size={21} />
        <span className="status-dot" />
      </div>
      <strong>{machine.name}</strong>
      <small>{machine.status}</small>
      <div className="mini-meter">
        <span
          style={{
            width: machine.status === "Offline" ? "0%" : `${machine.cpu}%`,
          }}
        />
      </div>
      <span className="machine-cpu">
        CPU {machine.status === "Offline" ? "—" : `${machine.cpu}%`}
      </span>
    </button>
  );
}
export function LabCard({
  active,
  onClick,
  second = false,
}: {
  active: boolean;
  onClick: () => void;
  second?: boolean;
}) {
  return (
    <button
      className={`lab-card ${active ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <Network size={23} />
      <span>
        <strong>Laboratório 0{second ? 2 : 1}</strong>
        <small>
          {second
            ? "20 máquinas · 20 online"
            : "24 máquinas · 22 online · 1 alerta · 1 offline"}
        </small>
      </span>
      <ChevronRight size={18} />
    </button>
  );
}
export default function DashboardDemo() {
  const [tab, setTab] = useState("Painel principal");
  const [lab, setLab] = useState(0);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Todos");
  const [selected, setSelected] = useState<Machine | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!selected) return;
    const previous = document.activeElement as HTMLElement | null;
    closeButton.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus({ preventScroll: true });
    };
  }, [selected]);
  const [selection, setSelection] = useState<number[]>([]);
  const [multi, setMulti] = useState(false);
  const [action, setAction] = useState("");
  const simulation = useSimulation(4);
  const source = machines(lab === 2 ? 20 : lab === 1 ? 24 : 25, lab === 2);
  const visible = source.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) &&
      (status === "Todos" || m.status === status),
  );
  const selectLab = (id: number) => {
    setLab(id);
    setSelected(null);
    setSelection([]);
  };
  const execute = (value: string) => {
    setAction(value);
    simulation.start();
  };
  return (
    <div className="dashboard-shell">
      <div className="dashboard-titlebar">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>ADAM / CONSOLE DE GERENCIAMENTO</span>
        <span className="demo-label">Demonstração interativa</span>
      </div>
      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <div className="console-logo">
            <span className="logo-symbol">A</span>A.D.A.M.
            <span className="version">CONSOLE</span>
          </div>
          <span className="sidebar-caption">WORKSPACE</span>
          <nav aria-label="Áreas do dashboard demonstrativo">
            {tabs.map(([label, Icon]) => (
              <button
                key={label}
                aria-label={label}
                title={label}
                className={tab === label ? "active" : ""}
                onClick={() => {
                  setTab(label);
                  setSelected(null);
                }}
              >
                <Icon size={16} />
                <span>{label}</span>
                {label === "Eventos" && <b>2</b>}
              </button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <span className="status-dot" /> Servidor conectado
            <small>Ambiente simulado · LAN</small>
          </div>
        </aside>
        <div className="dashboard-content">
          <div className="dashboard-heading">
            <div>
              <div className="console-breadcrumb">
                Workspace <ChevronRight size={11} /> Visão geral
              </div>
              <h3>{tab}</h3>
              <p>Seu laboratório, sob uma nova perspectiva.</p>
            </div>
            <span className="live-tag">
              <span className="status-dot" /> Dados ilustrativos
            </span>
          </div>
          {["Painel principal", "Máquinas", "Laboratórios"].includes(tab) ? (
            <>
              {tab === "Laboratórios" && (
                <div className="lab-options">
                  {[1, 2].map((id) => (
                    <LabCard
                      key={id}
                      second={id === 2}
                      active={lab === id}
                      onClick={() => selectLab(id)}
                    />
                  ))}
                </div>
              )}
              <div className="dashboard-stats">
                {[
                  ["Total de máquinas", source.length, "neutral"],
                  [
                    "Online",
                    source.filter((m) => m.status === "Online").length,
                    "green",
                  ],
                  [
                    "Em alerta",
                    source.filter((m) => m.status === "Alerta").length,
                    "yellow",
                  ],
                  [
                    "Offline",
                    source.filter((m) => m.status === "Offline").length,
                    "red",
                  ],
                ].map(([label, value, color]) => (
                  <div key={label} className={`${color}`}>
                    <span>{label}</span>
                    <strong>
                      <AnimatedNumber value={Number(value)} />
                      <Monitor size={20} />
                    </strong>
                    <small>
                      {label === "Total de máquinas"
                        ? "Estações cadastradas"
                        : label === "Online"
                          ? "Operação normal"
                          : label === "Em alerta"
                            ? "Precisam de atenção"
                            : "Sem comunicação"}
                    </small>
                  </div>
                ))}
              </div>
              <div className="machines-toolbar">
                <div>
                  <h4>
                    Computadores <span>{source.length}</span>
                  </h4>
                  <select
                    aria-label="Selecionar laboratório"
                    value={lab}
                    onChange={(e) => selectLab(Number(e.target.value))}
                  >
                    <option value={0}>Visão geral · 25 máquinas</option>
                    <option value={1}>Laboratório 01</option>
                    <option value={2}>Laboratório 02</option>
                  </select>
                </div>
                <label className="search-field">
                  <Search size={15} />
                  <input
                    aria-label="Buscar computador"
                    placeholder="Buscar máquina..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
              </div>
              <div className="machine-filters">
                {["Todos", "Online", "Alerta", "Offline"].map((s) => (
                  <button
                    key={s}
                    className={status === s ? "active" : ""}
                    onClick={() => setStatus(s)}
                  >
                    {s}
                  </button>
                ))}
                <button
                  className={multi ? "active multi" : "multi"}
                  aria-pressed={multi}
                  onClick={() => {
                    setMulti(!multi);
                    setSelection([]);
                  }}
                >
                  Selecionar várias{multi ? ` (${selection.length})` : ""}
                </button>
              </div>
              <div className="machine-grid">
                {visible.map((machine) => (
                  <MachineCard
                    key={machine.id}
                    machine={machine}
                    selected={
                      selected?.id === machine.id ||
                      selection.includes(machine.id)
                    }
                    onClick={() =>
                      multi
                        ? setSelection(
                            selection.includes(machine.id)
                              ? selection.filter((id) => id !== machine.id)
                              : [...selection, machine.id],
                          )
                        : setSelected(machine)
                    }
                  />
                ))}
              </div>
              {visible.length === 0 && (
                <div className="empty-state">
                  Nenhuma máquina encontrada. Tente outro nome ou filtro.
                </div>
              )}
              {multi && selection.length > 0 && (
                <button
                  className="button small"
                  disabled={simulation.running}
                  onClick={() =>
                    execute(
                      `Consulta de status de ${selection.length} máquinas`,
                    )
                  }
                >
                  Simular consulta das selecionadas
                </button>
              )}
              <div className="dashboard-foot">
                <span>
                  <span className="status-dot" /> Telemetria ilustrativa
                </span>
                <span>
                  Clique em uma máquina para inspecionar{" "}
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </>
          ) : tab === "Comandos" ? (
            <CommandDemo />
          ) : tab === "Assistente" ? (
            <AIDemo />
          ) : tab === "Relatórios" ? (
            <Reports />
          ) : tab === "Programas" ? (
            <div className="inner-panel">
              <Package />
              <h4>Distribuição de programas</h4>
              <p>
                Solicite uma instalação e acompanhe o retorno do Agent. Esta
                simulação usa um pacote fictício.
              </p>
              <button
                className="button"
                disabled={simulation.running}
                onClick={() =>
                  execute("Instalação do pacote demonstrativo no PC-01")
                }
              >
                Simular distribuição
              </button>
            </div>
          ) : tab === "Eventos" ? (
            <div className="event-list">
              <div>
                <Bell className="yellow" />
                <span>
                  <strong>PC-07 · CPU elevada</strong>
                  <small>
                    Laboratório 01 · Uso de CPU em 92% · Dados ilustrativos
                  </small>
                </span>
              </div>
              <div>
                <Monitor className="red" />
                <span>
                  <strong>PC-19 · Sem comunicação</strong>
                  <small>
                    Laboratório 01 · Último contato há 12 minutos · Dados
                    ilustrativos
                  </small>
                </span>
              </div>
            </div>
          ) : (
            <div className="inner-panel">
              <Settings />
              <h4>Configurações do ambiente demonstrativo</h4>
              <p>
                Rede local · Usuário: administrador demonstrativo · Permissões:
                visualização e simulação.
              </p>
              <p>
                As configurações de autenticação e usuários pertencem ao sistema
                A.D.A.M. real.
              </p>
              <MonitoringCharts compact />
            </div>
          )}
          {action && (
            <div className="command-feedback" role="status">
              <Check size={16} />
              <span>
                {action}:{" "}
                {[
                  "Pendente",
                  "Recebido",
                  "Executando",
                  "Retornando resultado",
                  "Concluído — simulação, nenhuma ação real",
                ][simulation.step] || "Pendente"}
              </span>
            </div>
          )}
        </div>
      </div>
      {selected && (
        <div
          className="machine-detail"
          role="region"
          aria-label={`Detalhes de ${selected.name}`}
        >
          <div className="detail-heading">
            <div>
              <span className="eyebrow">INSPEÇÃO DA ESTAÇÃO</span>
              <h3>{selected.name}</h3>
            </div>
            <button
              ref={closeButton}
              aria-label="Fechar detalhes da máquina"
              onClick={() => setSelected(null)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="detail-columns">
            <dl>
              <div>
                <dt>Endereço IP</dt>
                <dd>
                  192.168.{lab === 2 ? 2 : 1}.{selected.id + 100}
                </dd>
              </div>
              <div>
                <dt>Sistema operacional</dt>
                <dd>Windows 11</dd>
              </div>
              <div>
                <dt>Último contato</dt>
                <dd>
                  {selected.status === "Offline"
                    ? "Há 12 minutos"
                    : "Há 5 segundos"}
                </dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{selected.status}</dd>
              </div>
            </dl>
            <div>
              {[
                ["CPU", selected.cpu],
                ["RAM", selected.ram],
                ["Disco", selected.disk],
              ].map(([label, val]) => (
                <div className="detail-meter" key={label}>
                  <span>
                    {label}
                    <b>
                      {selected.status === "Offline"
                        ? "Indisponível"
                        : `${val}%`}
                    </b>
                  </span>
                  <div>
                    <i
                      style={{
                        width: selected.status === "Offline" ? "0%" : `${val}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="detail-actions">
              {[
                "Abrir programa",
                "Executar comando",
                "Reiniciar",
                "Desligar",
              ].map((label) => (
                <button
                  key={label}
                  disabled={simulation.running || selected.status === "Offline"}
                  onClick={() => execute(`${label} · ${selected.name}`)}
                >
                  <Terminal size={14} />
                  {label}
                </button>
              ))}
              <small>Somente simulação. Nenhum comando real é executado.</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
