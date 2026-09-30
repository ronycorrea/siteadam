import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  ArrowUpRight,
  CodeXml,
  Mail,
  BookOpen,
} from "lucide-react";
import { PageIntro } from "@/components/ui";
import { TimelineSection } from "@/sections/Home";
export const metadata: Metadata = {
  title: "Sobre o projeto",
  description:
    "Conheça o A.D.A.M., projeto de Ronald Araújo Corrêa para gerenciamento centralizado de computadores.",
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="Sobre o projeto"
        title="Tecnologia que nasce de uma necessidade real."
        text="A.D.A.M. — Assistente de Diagnóstico Automatizado de Máquinas."
      />
      <section className="section container pt-0 about-grid">
        <article>
          <span className="eyebrow">O CONTEXTO</span>
          <h2>
            Mais tempo para o ensino.
            <br />
            Mais visibilidade sobre a infraestrutura.
          </h2>
          <p>
            Verificar computadores individualmente torna o acompanhamento de um
            laboratório trabalhoso. O A.D.A.M. propõe centralizar informações e
            ações para apoiar quem cuida desse ambiente.
          </p>
          <p>
            O projeto reúne monitoramento, diagnóstico e gerenciamento remoto em
            uma arquitetura com Agents, servidor e dashboard. A inteligência
            artificial e a voz complementam a interação com o sistema.
          </p>
          <div className="about-links">
            <span>
              <CodeXml size={18} />
              GitHub <small>Link a ser informado</small>
            </span>
            <Link href="/documentacao">
              <BookOpen size={18} />
              Documentação
              <ArrowUpRight size={15} />
            </Link>
            <span>
              <Mail size={18} />
              Contato <small>A ser informado</small>
            </span>
          </div>
        </article>
        <aside className="academic-card">
          <GraduationCap size={30} />
          <span className="eyebrow">SOBRE O AUTOR</span>
          <dl>
            <dt>Autor</dt>
            <dd>Ronald Araújo Corrêa</dd>
            <dt>Curso</dt>
            <dd>Técnico em Manutenção e Suporte em Informática</dd>
          </dl>
          <span className="academic-year">
            A.D.A.M. <span>2026</span>
          </span>
        </aside>
      </section>
      <TimelineSection />
    </>
  );
}
