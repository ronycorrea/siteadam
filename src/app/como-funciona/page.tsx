import type { Metadata } from "next";
import { PageIntro, Reveal } from "@/components/ui";
import { steps } from "@/data/project";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { CommandDemo } from "@/components/Simulations";
export const metadata: Metadata = {
  title: "Como funciona",
  description:
    "Da inicialização do Agent ao retorno de um comando: entenda o funcionamento do A.D.A.M.",
};
const descriptions = [
  "Em cada estação Windows, o Agent Python é executado em segundo plano para acompanhar a máquina.",
  "O registro permite identificar o computador e associá-lo ao ambiente gerenciado.",
  "CPU, memória, armazenamento, rede, processos e atividade seguem para o servidor por REST/HTTP.",
  "FastAPI recebe as informações; SQLAlchemy e SQLite dão suporte à persistência dos registros.",
  "Pelo navegador, o responsável acompanha status, métricas e eventos dos computadores cadastrados.",
  "A organização por laboratório e posição ajuda a encontrar uma estação ou selecionar um grupo.",
  "A ação parte do dashboard e passa pela validação do sistema antes de entrar na fila.",
  "O Agent consulta o servidor periodicamente e recebe os comandos destinados à sua máquina.",
  "A execução acontece no computador, pelo Agent Python, e não diretamente pela IA.",
  "O servidor recebe o resultado e o dashboard permite acompanhar a conclusão e o histórico.",
];
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Como funciona"
        title="Da primeira telemetria ao resultado de uma ação."
        text="Um ciclo contínuo de coleta, visibilidade e gerenciamento. Explore cada etapa da comunicação entre as máquinas e o A.D.A.M."
      />
      <section className="section container pt-0">
        <ArchitectureDiagram />
        <div className="steps-list">
          {steps.map((step, i) => (
            <Reveal className="step" key={step}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <small>{i < 5 ? "MONITORAMENTO" : "GERENCIAMENTO"}</small>
                <h2>{step}</h2>
                <p>{descriptions[i]}</p>
              </div>
              <div className="step-signal" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </Reveal>
          ))}
        </div>
        <CommandDemo />
      </section>
    </>
  );
}
