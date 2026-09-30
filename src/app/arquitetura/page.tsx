import type { Metadata } from "next";
import {
  Cloud,
  Server,
  ArrowDown,
  Database,
  Monitor,
  UserRound,
  Cpu,
} from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/ui";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
export const metadata: Metadata = {
  title: "Arquitetura",
  description:
    "Explore os Agents Python, o servidor FastAPI, a persistência e o dashboard do A.D.A.M.",
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Arquitetura"
        title="Cada componente tem um papel. O servidor conecta todos eles."
        text="Conheça os caminhos da telemetria, dos comandos e da integração com inteligência artificial."
      />
      <section className="container section pt-0">
        <ArchitectureDiagram />
        <div className="detailed-architecture">
          <div className="lan-zone">
            <span className="eyebrow">REDE LOCAL INSTITUCIONAL / LAN</span>
            <div className="architecture-stack">
              <div>
                <UserRound />
                Professor / Administrador
              </div>
              <ArrowDown />
              <div>
                <Monitor />
                Dashboard Web
              </div>
              <span className="connection-label">REST / HTTP ↕</span>
              <div className="central-server">
                <Server />
                Servidor A.D.A.M. · FastAPI
              </div>
              <div className="server-branches">
                <div>
                  <ArrowDown />
                  <div>
                    <Database />
                    SQLite<small>Persistência via SQLAlchemy</small>
                  </div>
                </div>
                <div>
                  <span>↕ HTTP</span>
                  <div>
                    <Cpu />
                    Agents Python<small>Telemetria ↑ · comandos ↓</small>
                  </div>
                  <ArrowDown />
                  <div>
                    <Monitor />
                    Computadores Windows
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="external-zone">
            <Cloud size={32} />
            <span className="eyebrow">INTEGRAÇÃO EXTERNA</span>
            <h3>OpenAI API</h3>
            <p>
              O servidor consulta a IA para interpretar solicitações. Essa
              integração requer acesso externo.
            </p>
            <div className="external-link">↔ Servidor A.D.A.M.</div>
            <p>
              As funções locais de monitoramento e gerenciamento podem continuar
              na LAN, independentemente da integração externa de IA.
            </p>
          </div>
        </div>
        <SectionHeading
          eyebrow="RESPONSABILIDADES"
          title="Telemetria sobe. Comandos retornam."
        />
        <div className="three-columns">
          <article className="info-card">
            <h3>01 · Coleta</h3>
            <p>
              O Agent observa o sistema e envia periodicamente as métricas ao
              servidor. O banco recebe os dados por meio do servidor, sem acesso
              direto dos Agents.
            </p>
          </article>
          <article className="info-card">
            <h3>02 · Decisão</h3>
            <p>
              O dashboard consulta os dados. O administrador seleciona as
              estações e solicita ações; o servidor valida a solicitação e
              registra os comandos.
            </p>
          </article>
          <article className="info-card">
            <h3>03 · Execução</h3>
            <p>
              O Agent consulta os comandos pendentes, executa a ação localmente
              em Python e envia o resultado ao servidor para acompanhamento no
              dashboard.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
