import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import DashboardDemo from "@/components/DashboardDemo";
import { IntelligenceSection } from "@/sections/Home";
export const metadata: Metadata = {
  title: "Demonstração",
  description:
    "Experimente o dashboard interativo do A.D.A.M. com laboratórios, máquinas e comandos simulados.",
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Demonstração"
        title="Veja como a interface reúne o laboratório."
        text="Dados ilustrativos, interações reais no front-end. Nenhuma conexão com máquinas, execução remota ou acesso ao microfone."
      />
      <section className="section container pt-0">
        <DashboardDemo />
      </section>
      <IntelligenceSection />
    </>
  );
}
