import type { Metadata } from "next";
import { PageIntro, FeatureCards } from "@/components/ui";
import { features } from "@/data/project";
import {
  MonitoringSection,
  CommandsSection,
  IntelligenceSection,
  ReportsSection,
  SecuritySection,
} from "@/sections/Home";
export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Monitoramento, gerenciamento, automação, IA, voz, relatórios e organização de laboratórios no A.D.A.M.",
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Recursos"
        title="Visibilidade para entender. Ferramentas para agir."
        text="Recursos conectados ao cotidiano de quem cuida dos computadores de um laboratório."
      />
      <section className="container section pt-0">
        <FeatureCards items={features} />
      </section>
      <MonitoringSection />
      <CommandsSection />
      <IntelligenceSection />
      <ReportsSection />
      <SecuritySection />
    </>
  );
}
