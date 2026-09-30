import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Network,
  ShieldCheck,
  Cpu,
  Monitor,
  AlertTriangle,
  Clock3,
  WifiOff,
  Gauge,
  Check,
  Radio,
} from "lucide-react";
import NetworkVisual from "@/components/NetworkVisual";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import DashboardDemo from "@/components/DashboardDemo";
import {
  AIDemo,
  VoiceDemo,
  CommandDemo,
  MonitoringCharts,
  Reports,
} from "@/components/Simulations";
import Timeline from "@/components/Timeline";
import ResourceExplorer from "@/components/ResourceExplorer";
import { SectionHeading, Reveal, TextLink } from "@/components/ui";
import { technologies } from "@/data/project";
export function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <div className="hero-eyebrow">A.D.A.M. / APRESENTAÇÃO DO PROJETO</div>
        <h1>
          Um laboratório.
          <br />
          Uma visão <em>completa.</em>
        </h1>
        <h2>
          Assistente de Diagnóstico
          <br />
          Automatizado de Máquinas
        </h2>
        <p>
          Entenda como o A.D.A.M. reúne informações de vários computadores para
          ajudar a acompanhar, diagnosticar e gerenciar um laboratório.
        </p>
        <div className="button-row">
          <Link className="button" href="/como-funciona">
            Como o projeto funciona <ArrowRight size={17} />
          </Link>
          <Link className="button secondary" href="/demonstracao">
            Explorar a demonstração <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="author-line">
          <span className="author-monogram">RA</span>
          <span>
            Um projeto de <strong>Ronald Araújo Corrêa</strong>
            <small>Monitoramento · diagnóstico · gerenciamento</small>
          </span>
        </div>
      </div>
      <Reveal className="hero-graphic">
        <NetworkVisual />
      </Reveal>
      <div className="hero-bottom">
        <span>UM GUIA INTERATIVO DO PROJETO</span>
        <span>
          Explore. Clique. Acompanhe o caminho dos dados.{" "}
          <ArrowRight size={13} />
        </span>
      </div>
    </section>
  );
}
export function Problem() {
  return (
    <section className="section container problem-section">
      <Reveal>
        <SectionHeading
          eyebrow="01 / O DESAFIO"
          title="Gerenciar vários computadores não deveria significar verificar máquina por máquina."
          text="Quando a informação está espalhada, até um problema simples exige tempo. E o laboratório não pode esperar."
        />
        <div className="problem-tags">
          {[
            [Gauge, "Lentidão"],
            [AlertTriangle, "Falhas de sistema"],
            [WifiOff, "Máquinas offline"],
            [Cpu, "Alto consumo de recursos"],
            [Clock3, "Atendimento demorado"],
          ].map(([Icon, label]) => {
            const Component = Icon as typeof Cpu;
            return (
              <span key={String(label)}>
                <Component size={14} />
                {String(label)}
              </span>
            );
          })}
        </div>
      </Reveal>
      <Reveal className="comparison">
        <div>
          <span className="comparison-label">SEM A.D.A.M.</span>
          <p>Uma máquina de cada vez.</p>
          <div className="manual-path">
            <span>Responsável</span>
            <ArrowRight size={16} />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={i === 3 ? "warning" : ""}>
                <Monitor size={24} />
                <small>PC-0{i}</small>
                {i === 3 && <span className="status-dot" />}
              </div>
            ))}
          </div>
        </div>
        <div className="with-adam">
          <span className="comparison-label">
            <span className="status-dot" /> COM A.D.A.M.
          </span>
          <p>O laboratório inteiro em uma visão.</p>
          <div className="central-path">
            <span>Responsável</span>
            <ArrowRight size={16} />
            <strong>
              <Network size={18} /> Dashboard
            </strong>
            <ArrowRight size={16} />
            <span className="pc-cluster">
              <Monitor />
              <Monitor />
              <Monitor />
              <Monitor />
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
export function Solution() {
  return (
    <section className="section surface-section">
      <div className="container">
        <div className="section-header-row">
          <SectionHeading
            eyebrow="02 / A SOLUÇÃO"
            title="Três formas de entender o A.D.A.M."
            text="Abra os exemplos e veja como os recursos se conectam à rotina de um laboratório."
          />
          <TextLink href="/recursos">Explorar todos os recursos</TextLink>
        </div>
        <ResourceExplorer />
      </div>
    </section>
  );
}
export function ArchitectureSection() {
  return (
    <section className="section container" id="arquitetura">
      <div className="section-header-row">
        <SectionHeading
          eyebrow="03 / COMO FUNCIONA"
          title="Conectado em cada ponta. Centralizado no A.D.A.M."
          text="Uma arquitetura simples de entender. Clique nos componentes para explorar o caminho da informação."
        />
        <TextLink href="/arquitetura">Arquitetura detalhada</TextLink>
      </div>
      <Reveal>
        <ArchitectureDiagram />
      </Reveal>
    </section>
  );
}
export function DashboardSection() {
  return (
    <section className="section demo-section" id="demonstracao">
      <div className="container">
        <div className="section-header-row">
          <SectionHeading
            eyebrow="04 / ENTENDA A INTERFACE"
            title="Um laboratório inteiro em uma tela."
            text="Esta representação interativa mostra como o A.D.A.M. funciona. Explore máquinas e fluxos com dados fictícios: este é o site de apresentação, não o sistema operacional."
          />
          <Link href="/demonstracao" className="button secondary small">
            Explorar demonstração <ArrowUpRight size={16} />
          </Link>
        </div>
        <Reveal>
          <DashboardDemo />
        </Reveal>
      </div>
    </section>
  );
}
export function MonitoringSection() {
  return (
    <section className="section container">
      <div className="section-header-row">
        <SectionHeading
          eyebrow="05 / MONITORAMENTO"
          title="O que acontece nas máquinas, à vista."
          text="Telemetria para entender o estado do ambiente e reconhecer quando algo precisa de atenção."
        />
        <span className="demo-label">
          <span className="status-dot" /> Dados ilustrativos
        </span>
      </div>
      <MonitoringCharts />
      <div className="metric-strip">
        {[
          "Rede",
          "Processos",
          "Sistema operacional",
          "Tempo ligado",
          "Atividade da máquina",
        ].map((item) => (
          <span key={item}>
            <Check size={14} />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
export function CommandsSection() {
  return (
    <section className="section surface-section">
      <div className="container split-section">
        <div>
          <SectionHeading
            eyebrow="06 / GERENCIAMENTO REMOTO"
            title="Da sua solicitação à execução local."
            text="O servidor organiza os comandos. Cada Agent consulta a fila, executa a ação na máquina e devolve o resultado."
          />
          <div className="flow-inline">
            {[
              "Administrador",
              "Dashboard",
              "Servidor",
              "Fila de comandos",
              "Agent",
              "Execução local",
              "Resultado",
            ].map((item, i) => (
              <span key={item}>
                {item}
                {i < 6 && <ArrowRight size={12} />}
              </span>
            ))}
          </div>
          <p className="muted small-text">
            Abra ou feche programas, solicite reinicializações, desligamentos,
            instalações e outras ações a partir da interface.
          </p>
        </div>
        <CommandDemo />
      </div>
    </section>
  );
}
export function IntelligenceSection() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="07 / LINGUAGEM NATURAL"
        title="Inteligência artificial como apoio ao gerenciamento."
        text="Um recurso para facilitar a interação. A interpretação da IA passa pela validação do sistema antes de se tornar uma ação."
      />
      <div className="intelligence-grid">
        <AIDemo />
        <VoiceDemo />
      </div>
      <div className="ai-explanation">
        <ShieldCheck size={24} />
        <p>
          <strong>A IA interpreta. O Python executa.</strong> A solicitação é
          validada pelo A.D.A.M.; o servidor cria o comando e o Agent executa
          localmente. A integração externa com a OpenAI não substitui o controle
          do sistema.
        </p>
      </div>
    </section>
  );
}
export function ReportsSection() {
  return (
    <section className="section surface-section">
      <div className="container split-section">
        <SectionHeading
          eyebrow="08 / RELATÓRIOS"
          title="Informação que ajuda a planejar a próxima ação."
          text="Acompanhe o uso de recursos, a disponibilidade das estações, os comandos executados e os eventos do laboratório ao longo do tempo."
        />
        <Reports />
      </div>
    </section>
  );
}
export function SecuritySection() {
  return (
    <section className="section container security-section">
      <div>
        <span className="security-icon">
          <ShieldCheck size={35} />
        </span>
        <SectionHeading
          eyebrow="09 / SEGURANÇA E CONTROLE"
          title="Operação local. Responsabilidade em cada ação."
          text="Pensado para a rede institucional, com mecanismos de controle que precisam ser configurados conforme o ambiente e as permissões de cada usuário."
        />
      </div>
      <div className="security-list">
        {[
          "Operação em rede local",
          "Autenticação e controle de acesso",
          "Separação por laboratório",
          "Histórico de comandos",
          "Validação antes da execução",
          "Gerenciamento de usuários",
        ].map((item, i) => (
          <div key={item}>
            <span>0{i + 1}</span>
            {item}
            <Check size={16} />
          </div>
        ))}
      </div>
    </section>
  );
}
export function TechnologiesSection() {
  return (
    <section className="section surface-section" id="tecnologias">
      <div className="container">
        <SectionHeading
          eyebrow="10 / TECNOLOGIAS DO SISTEMA"
          title="Uma base técnica clara e conectada."
          text="Python no Agent e no servidor. APIs para comunicação. Uma interface acessível pelo navegador."
        />
        <div className="tech-grid">
          {technologies.map((tech, i) => (
            <div key={tech}>
              <span className="tech-symbol">
                {
                  [
                    "Py",
                    "F",
                    "SA",
                    "DB",
                    "H5",
                    "C3",
                    "JS",
                    "AI",
                    "{}",
                    "↔",
                    "⊞",
                    "Lx",
                  ][i]
                }
              </span>
              <strong>{tech}</strong>
              <small>
                {i < 4
                  ? "BACKEND"
                  : i < 7
                    ? "INTERFACE"
                    : i < 10
                      ? "INTEGRAÇÃO"
                      : "PLATAFORMA"}
              </small>
            </div>
          ))}
        </div>
        <p className="diagram-note">
          Agent descrito para Windows. Linux integra o panorama tecnológico do
          projeto; compatibilidade e implantação devem ser documentadas conforme
          o sistema evolui.
        </p>
      </div>
    </section>
  );
}
export function TimelineSection() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="11 / EVOLUÇÃO DO PROJETO"
        title="De uma máquina a um laboratório inteiro."
        text="A evolução do A.D.A.M. acompanha a necessidade de enxergar e gerenciar um ambiente maior."
      />
      <Timeline />
    </section>
  );
}
export function Closing() {
  return (
    <section className="closing container">
      <div>
        <span className="eyebrow">
          <Radio size={14} /> CONHEÇA O PROJETO
        </span>
        <h2>
          Infraestrutura visível.
          <br />
          Gerenciamento mais simples.
        </h2>
        <p>Conheça as decisões técnicas e a história do projeto.</p>
      </div>
      <div className="button-row">
        <Link className="button" href="/documentacao">
          Explorar documentação <ArrowRight size={17} />
        </Link>
        <Link className="button secondary" href="/sobre">
          Sobre o A.D.A.M. <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
