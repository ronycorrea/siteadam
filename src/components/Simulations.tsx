"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Mic,
  Play,
  Send,
  Sparkles,
  Terminal,
  Cpu,
  MemoryStick,
  HardDrive,
} from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";
export function CommandDemo() {
  const sim = useSimulation(4);
  const [command, setCommand] = useState("Abrir programa");
  return (
    <div className="simulation-panel">
      <div className="panel-top">
        <span>
          <Terminal size={16} /> CICLO DE UM COMANDO
        </span>
        <span className="demo-label">Simulação</span>
      </div>
      <div className="command-input">
        <select
          aria-label="Comando demonstrativo"
          value={command}
          disabled={sim.running}
          onChange={(e) => setCommand(e.target.value)}
        >
          {[
            "Abrir programa",
            "Fechar programa",
            "Reiniciar",
            "Desligar",
            "Executar ação",
            "Instalar programa",
          ].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <span>PC-07</span>
        <button
          className="button small"
          disabled={sim.running}
          onClick={sim.start}
        >
          <Play size={14} />
          {sim.running ? "Simulando…" : "Simular envio"}
        </button>
      </div>
      <div className="command-stages">
        {["Enviado", "Pendente", "Recebido", "Executando", "Concluído"].map(
          (label, i) => (
            <div key={label} className={sim.step >= i ? "complete" : ""}>
              <span>
                {sim.step >= i ? (
                  <Check size={14} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              <small>{label}</small>
            </div>
          ),
        )}
      </div>
      <div className="terminal-output" role="status">
        <span>$ adam command --target PC-07</span>
        <p>
          {sim.step === -1
            ? "Aguardando uma solicitação demonstrativa."
            : sim.step < 4
              ? `[simulação] ${command} → ${["enviado ao servidor", "aguardando o Agent", "recebido pelo Agent", "execução local em Python"][sim.step]}`
              : `[simulação] ${command}: resultado recebido. Nenhuma ação real executada.`}
        </p>
      </div>
    </div>
  );
}
export function AIDemo() {
  const [prompt, setPrompt] = useState("Como está o PC-07?");
  const [sent, setSent] = useState("");
  const sim = useSimulation(2, 950);
  function submit() {
    setSent(prompt);
    sim.start();
  }
  const restart = sent.toLowerCase().includes("reinic");
  return (
    <div className="simulation-panel ai-panel">
      <div className="panel-top">
        <span>
          <Sparkles size={16} /> ASSISTENTE A.D.A.M.
        </span>
        <span className="demo-label">Conversa simulada</span>
      </div>
      <div className="chat">
        <div className="chat-message assistant">
          <span className="avatar">A</span>
          <p>
            Uma visão do laboratório, em linguagem natural.
            <small>Escolha um exemplo para explorar.</small>
          </p>
        </div>
        {sent && (
          <>
            <div className="chat-message user">
              <p>{sent}</p>
            </div>
            <div className="chat-message assistant" role="status">
              <span className="avatar">A</span>
              <p>
                {sim.running
                  ? "Interpretando solicitação…"
                  : restart
                    ? "Intenção identificada: reiniciar o PC-07. O sistema valida a solicitação, cria o comando e o Agent executa em Python. Nenhum comando foi executado nesta demonstração."
                    : "O PC-07 está online. CPU em 18%, memória em 47% e armazenamento em 62%. Dados ilustrativos de uma consulta independente."}
              </p>
            </div>
          </>
        )}
      </div>
      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <select
          aria-label="Exemplo de solicitação à IA"
          value={prompt}
          disabled={sim.running}
          onChange={(e) => setPrompt(e.target.value)}
        >
          <option>Como está o PC-07?</option>
          <option>Reinicie o PC-07.</option>
        </select>
        <button
          aria-label="Enviar exemplo ao assistente"
          disabled={sim.running}
        >
          <Send size={18} />
        </button>
      </form>
      <div className="ai-rule">
        <span>IA interpreta</span>
        <ArrowRight size={14} />
        <span>Sistema valida</span>
        <ArrowRight size={14} />
        <span>Python executa</span>
      </div>
    </div>
  );
}
export function VoiceDemo() {
  const sim = useSimulation(3, 1300);
  return (
    <div className={`voice-panel ${sim.running ? "listening" : ""}`}>
      <div className="voice-icon">
        <Mic size={25} />
      </div>
      <div className="sound-wave" aria-hidden="true">
        {Array.from({ length: 29 }, (_, i) => (
          <i
            key={i}
            style={{
              height: `${8 + Math.abs(Math.sin(i * 2.3)) * 32}px`,
              animationDelay: `${i * 0.04}s`,
            }}
          />
        ))}
      </div>
      <span className="demo-label">Demonstração · sem acesso ao microfone</span>
      <div className="voice-text" aria-live="polite">
        <strong>
          {sim.step < 0
            ? "Interaja usando linguagem natural."
            : sim.step === 0
              ? "Ouvindo…"
              : sim.step === 1
                ? "“A.D.A.M., como está o computador 10?”"
                : sim.step === 2
                  ? "Consultando o estado da máquina…"
                  : "O computador 10 está online e funcionando normalmente."}
        </strong>
        <p>
          {sim.step === 3
            ? "Resposta simulada com dados ilustrativos."
            : "Uma nova forma de consultar seu laboratório."}
        </p>
      </div>
      <button
        className="button secondary"
        onClick={sim.start}
        disabled={sim.running}
      >
        <Mic size={16} />
        {sim.running ? "Simulando…" : "Simular comando de voz"}
      </button>
    </div>
  );
}
export function MonitoringCharts({ compact = false }: { compact?: boolean }) {
  const [tick, setTick] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setTick((t) => t + 1), 4000);
    return () => clearInterval(timer);
  }, [reduced]);
  return (
    <div className={`monitoring-grid ${compact ? "compact" : ""}`}>
      {[
        ["CPU", 21, Cpu, "blue"],
        ["Memória RAM", 48, MemoryStick, "cyan"],
        ["Armazenamento", 61, HardDrive, "purple"],
      ].map(([label, base, Icon, color], i) => {
        const Component = Icon as typeof Cpu;
        const value =
          Number(base) + (tick === 0 ? 0 : Math.round(Math.sin(tick + i) * 4));
        return (
          <div className={`monitoring-card ${color}`} key={String(label)}>
            <div>
              <span>
                <Component size={16} />
                {String(label)}
              </span>
              <small>Dados ilustrativos</small>
            </div>
            <strong>
              {value}
              <span>%</span>
            </strong>
            <svg
              viewBox="0 0 300 70"
              aria-label={`Gráfico ilustrativo de ${label}: ${value}%`}
              role="img"
            >
              <defs>
                <linearGradient
                  id={`chart-${i}-${compact}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop stopColor="currentColor" stopOpacity=".2" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M0 55 ${Array.from({ length: 21 }, (_, j) => `L${j * 15} ${35 + Math.sin(j * 1.6 + i + tick * 0.4) * 14 + Math.cos(j * 0.5) * 9}`).join(" ")} L300 70 L0 70Z`}
                fill={`url(#chart-${i}-${compact})`}
              />
              <path
                d={`M0 55 ${Array.from({ length: 21 }, (_, j) => `L${j * 15} ${35 + Math.sin(j * 1.6 + i + tick * 0.4) * 14 + Math.cos(j * 0.5) * 9}`).join(" ")}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <small>
              Últimos 60 segundos <span>PC-01</span>
            </small>
          </div>
        );
      })}
    </div>
  );
}
export function Reports() {
  const [period, setPeriod] = useState("7 dias");
  const values =
    period === "7 dias"
      ? [32, 48, 37, 65, 44, 56, 41]
      : [40, 62, 51, 72, 48, 66, 58];
  return (
    <div className="report-panel">
      <div className="panel-top">
        <span>VISÃO DO PERÍODO</span>
        <select
          aria-label="Período do relatório"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option>7 dias</option>
          <option>30 dias</option>
        </select>
      </div>
      <div className="report-content">
        <div>
          <div className="report-legend">
            <span className="blue">■ CPU média</span>
            <span className="cyan">■ RAM média</span>
          </div>
          <div
            className="bar-chart"
            role="img"
            aria-label={`Comparação ilustrativa de CPU e RAM em ${period}`}
          >
            {values.map((v, i) => (
              <div key={i}>
                <div>
                  <i style={{ height: `${v}%` }} />
                  <i style={{ height: `${Math.min(v + 17, 95)}%` }} />
                </div>
                <small>
                  {period === "7 dias"
                    ? ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i]
                    : ["01", "05", "10", "15", "20", "25", "30"][i]}
                </small>
              </div>
            ))}
          </div>
        </div>
        <div className="report-summary">
          {[
            ["CPU média", period === "7 dias" ? "46%" : "57%"],
            ["RAM média", period === "7 dias" ? "63%" : "74%"],
            ["Online / offline", "23 / 1"],
            ["Comandos executados", period === "7 dias" ? "128" : "486"],
            ["Eventos", period === "7 dias" ? "12" : "39"],
          ].map(([label, val]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{val}</strong>
            </div>
          ))}
        </div>
      </div>
      <p className="diagram-note">
        Dados ilustrativos · uma máquina adicional está em alerta.
      </p>
    </div>
  );
}
