"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Check,
  Terminal,
  Play,
  Mic,
  Send,
  Network,
  BookOpen,
  Layers,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Cpu,
} from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";
import { Drift, SceneLabel, useStill } from "./Experience";

export function RemoteScene() {
  const [command, setCommand] = useState("Abrir programa");
  const sim = useSimulation(4, 1000);
  const still = useStill();
  const labels = [
    "Solicitação",
    "Validação",
    "Na fila",
    "Agent executa",
    "Resultado",
  ];
  return (
    <section id="comandos" className="xp-scene xp-commands">
      <div className="xp-scene-inner">
        <div className="commands-copy">
          <SceneLabel number="05">GERENCIAMENTO REMOTO</SceneLabel>
          <h2>
            VOCÊ PEDE.
            <br />O SISTEMA VALIDA.
            <br />
            <span>O AGENT EXECUTA.</span>
          </h2>
          <p>
            O comando percorre um caminho.
            <br />
            Do navegador à execução local em Python,
            <br />
            cada etapa tem uma responsabilidade.
          </p>
          <div className="command-picker">
            <label htmlFor="scene-command">ESCOLHA UM EXEMPLO</label>
            <select
              id="scene-command"
              value={command}
              disabled={sim.running}
              onChange={(e) => setCommand(e.target.value)}
            >
              {[
                "Abrir programa",
                "Reiniciar",
                "Desligar",
                "Instalar programa",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="command-stage">
          <Drift className="command-paper" distance={40} rotate={6}>
            <div>
              <Terminal size={22} />
              <span>SOLICITAÇÃO #0007</span>
            </div>
            <strong>{command}</strong>
            <span>DESTINO: PC-07</span>
            <div className="command-paper-rule" />
            <p>
              {sim.step === -1
                ? "Pronto para iniciar a simulação."
                : sim.step < 4
                  ? labels[sim.step] + "…"
                  : "Resultado recebido pelo servidor."}
            </p>
            <div className="paper-stamp">DEMONSTRAÇÃO</div>
          </Drift>
          <div className="command-loop">
            <svg viewBox="0 0 360 360" aria-hidden="true">
              <circle cx="180" cy="180" r="150" />
              <motion.circle
                cx="180"
                cy="180"
                r="150"
                animate={{ pathLength: Math.max(0, sim.step) / 4 }}
                transition={{ duration: still ? 0 : 0.7 }}
              />
            </svg>
            <button
              className="command-play"
              disabled={sim.running}
              onClick={sim.start}
              aria-label="Simular comando remoto"
            >
              {sim.step === 4 ? <Check size={29} /> : <Play size={27} />}
              <span>
                {sim.running
                  ? "EM ANDAMENTO"
                  : sim.step === 4
                    ? "SIMULAR DE NOVO"
                    : "SIMULAR"}
              </span>
            </button>
          </div>
          <div className="command-live" role="status">
            <span />
            {sim.step === -1
              ? "Clique para acompanhar o comando"
              : sim.step === 4
                ? "Concluído. Nenhuma ação real executada."
                : `${String(sim.step + 1).padStart(2, "0")} / ${labels[sim.step]}`}
          </div>
        </div>
      </div>
      <div className="command-route">
        {labels.map((label, i) => (
          <div key={label} className={sim.step >= i ? "passed" : ""}>
            <span>
              {sim.step >= i ? (
                <Check size={16} />
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </span>
            <strong>{label}</strong>
            {i < 4 && <ArrowRight size={17} />}
          </div>
        ))}
      </div>
      <span className="command-disclaimer">
        Simulação local. Nenhum computador recebe comandos deste site.
      </span>
    </section>
  );
}

export function IntelligenceScene() {
  const [voice, setVoice] = useState(false);
  const [question, setQuestion] = useState("Como está o PC-07?");
  const [sent, setSent] = useState("");
  const sim = useSimulation(3, 1100);
  function send(v = false) {
    setVoice(v);
    setSent(v ? "A.D.A.M., como está o computador 10?" : question);
    sim.start();
  }
  const answer = voice
    ? "O computador 10 está online e funcionando normalmente."
    : sent.startsWith("Reinicie")
      ? "Intenção identificada: reiniciar o PC-07. O A.D.A.M. valida, o servidor cria o comando e o Agent executa. Aqui, é só uma simulação."
      : "O PC-07 está online. CPU em 18%, memória em 47% e armazenamento em 62%.";
  return (
    <section id="inteligencia" className="xp-scene xp-intelligence">
      <div className="xp-scene-inner">
        <div className="intelligence-objects">
          <Drift className="speech-sticker" distance={-35} rotate={7}>
            <span>IA INTERPRETA.</span>
            <span>PYTHON EXECUTA.</span>
          </Drift>
          <div className="assistant-canvas">
            <div className="assistant-avatar">
              <span />
              <span />
              <i />
            </div>
            <span className="assistant-name">
              A.D.A.M. / CONVERSA DEMONSTRATIVA
            </span>
            <div className="assistant-conversation" aria-live="polite">
              {!sent ? (
                <p className="assistant-greeting">
                  O laboratório também pode
                  <br />
                  ser uma conversa.
                </p>
              ) : (
                <>
                  <div className="visitor-bubble">
                    {voice && sim.step === 0 ? "Ouvindo…" : sent}
                  </div>
                  <div className="adam-bubble">
                    {sim.running
                      ? voice && sim.step === 0
                        ? "O microfone não está sendo acessado."
                        : sim.step < 2
                          ? "Interpretando a solicitação…"
                          : "Consultando dados ilustrativos…"
                      : answer}
                  </div>
                </>
              )}
            </div>
            <div
              className={`assistant-wave ${sim.running ? "playing" : ""}`}
              aria-hidden="true"
            >
              {Array.from({ length: 31 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    height: 8 + Math.abs(Math.sin(i * 0.85)) * 28,
                    animationDelay: `${i * 0.045}s`,
                  }}
                />
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <select
                aria-label="Solicitação ilustrativa ao assistente"
                value={question}
                disabled={sim.running}
                onChange={(e) => setQuestion(e.target.value)}
              >
                <option>Como está o PC-07?</option>
                <option>Reinicie o PC-07.</option>
              </select>
              <button
                disabled={sim.running}
                aria-label="Enviar solicitação ilustrativa"
              >
                <Send size={19} />
              </button>
            </form>
          </div>
          <Drift className="voice-disc" distance={40} rotate={-8}>
            <button
              disabled={sim.running}
              onClick={() => send(true)}
              aria-label="Simular interação por voz"
            >
              <Mic size={29} />
              <span>
                EXPERIMENTE
                <br />A VOZ
              </span>
            </button>
          </Drift>
        </div>
        <div className="intelligence-copy">
          <SceneLabel number="06">IA + VOZ</SceneLabel>
          <h2>
            VOCÊ FALA.
            <br />O A.D.A.M.
            <br />
            <span>ENTENDE.</span>
          </h2>
          <p>
            A linguagem natural facilita a interação.
            <br />A inteligência artificial interpreta a intenção.
            <br />A decisão de executar passa pelo sistema.
          </p>
          <div className="intelligence-boundary">
            <ShieldCheck size={24} />
            <p>
              A IA não executa ações diretamente.
              <br />A validação vem antes do comando.
            </p>
          </div>
          <Link href="/recursos" className="underlined-link">
            Veja como os recursos se conectam <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
      <div className="scene-bottom">
        <span>
          SEM MICROFONE REAL. SEM CHAMADA À IA. UMA DEMONSTRAÇÃO DO FLUXO.
        </span>
        <a href="#explorar">
          Continue explorando <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}

const explore = [
  {
    title: "POR DENTRO",
    sub: "A arquitetura",
    text: "Agent, servidor, banco de dados e dashboard. Entenda o papel de cada parte.",
    href: "/arquitetura",
    icon: Network,
    color: "blue",
  },
  {
    title: "NA PRÁTICA",
    sub: "A demonstração",
    text: "Escolha um laboratório, selecione uma máquina e explore a interface ilustrativa.",
    href: "/demonstracao",
    icon: Layers,
    color: "mint",
  },
  {
    title: "CADA DETALHE",
    sub: "A documentação",
    text: "Uma referência para consultar os conceitos e os fluxos do projeto.",
    href: "/documentacao",
    icon: BookOpen,
    color: "pink",
  },
  {
    title: "A HISTÓRIA",
    sub: "Sobre o A.D.A.M.",
    text: "De um assistente individual à ideia de acompanhar laboratórios inteiros.",
    href: "/sobre",
    icon: Cpu,
    color: "yellow",
  },
];
export function ExploreScene() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section id="explorar" className="xp-explore">
      <div className="explore-head">
        <SceneLabel number="07">O PROJETO CONTINUA AQUI</SceneLabel>
        <h2>
          ESCOLHA SEU
          <br />
          <span>PRÓXIMO PASSO.</span>
        </h2>
        <div className="explore-controls">
          <button
            aria-label="Ver páginas anteriores"
            onClick={() =>
              ref.current?.scrollBy({ left: -390, behavior: "smooth" })
            }
          >
            <ChevronLeft size={22} />
          </button>
          <button
            aria-label="Ver próximas páginas"
            onClick={() =>
              ref.current?.scrollBy({ left: 390, behavior: "smooth" })
            }
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
      <div className="explore-track" ref={ref}>
        {explore.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`explore-poster poster-${item.color}`}
          >
            <div className="poster-top">
              <span>0{i + 1}</span>
              <ArrowUpRight size={27} />
            </div>
            <h3>{item.title}</h3>
            <item.icon size={90} strokeWidth={1} />
            <div className="poster-bottom">
              <strong>{item.sub}</strong>
              <p>{item.text}</p>
            </div>
          </Link>
        ))}
      </div>
      <div id="tecnologias" className="tech-ribbon">
        <div>
          {[
            "PYTHON",
            "FASTAPI",
            "SQLALCHEMY",
            "SQLITE",
            "REST / HTTP",
            "OPENAI API",
            "WINDOWS",
            "LINUX",
            "HTML / CSS",
            "JAVASCRIPT",
            "PYTHON",
            "FASTAPI",
            "SQLALCHEMY",
            "SQLITE",
            "REST / HTTP",
            "OPENAI API",
            "WINDOWS",
            "LINUX",
            "HTML / CSS",
            "JAVASCRIPT",
          ].map((tech, i) => (
            <span key={i}>
              {tech}
              <i>✳</i>
            </span>
          ))}
        </div>
      </div>
      <div className="experience-end">
        <div className="end-brand">A.D.A.M.</div>
        <div>
          <p>
            Assistente de Diagnóstico
            <br />
            Automatizado de Máquinas
          </p>
          <Link href="/sobre">
            Um projeto de Ronald Araújo Corrêa <ArrowUpRight size={17} />
          </Link>
        </div>
        <a
          className="back-to-top"
          href="#abertura"
          aria-label="Voltar ao início"
        >
          <ArrowUpRight size={29} />
        </a>
      </div>
      <div className="experience-credits">
        <span>© 2026 · A.D.A.M.</span>
        <span>Site de apresentação. Dados e ações demonstrativos.</span>
        <Link href="/documentacao">Documentação</Link>
      </div>
    </section>
  );
}
