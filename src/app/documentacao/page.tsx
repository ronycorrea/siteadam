import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import Documentation from "@/components/Documentation";
export const metadata: Metadata = {
  title: "Documentação",
  description:
    "Visão técnica do projeto A.D.A.M.: servidor, Agent, monitoramento, comandos, IA e segurança.",
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Documentação"
        title="Entenda o sistema, componente por componente."
        text="Uma referência inicial para explorar os conceitos e as responsabilidades de cada parte do A.D.A.M."
      />
      <Documentation />
    </>
  );
}
