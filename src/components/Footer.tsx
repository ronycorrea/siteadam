"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Navigation";
export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <footer>
      <div className="container footer-top">
        <div>
          <Logo />
          <p>
            Assistente de Diagnóstico
            <br />
            Automatizado de Máquinas
          </p>
        </div>
        <div className="footer-links">
          <Link href="/sobre">Projeto</Link>
          <Link href="/arquitetura">Arquitetura</Link>
          <Link href="/recursos">Recursos</Link>
          <Link href="/documentacao">Documentação</Link>
          <span title="O link será adicionado pelo autor">
            GitHub · em breve
          </span>
        </div>
        <div className="footer-note">
          Projeto de Ronald Araújo Corrêa
          <p>Apresentação do projeto A.D.A.M.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 A.D.A.M. · Ronald Araújo Corrêa</span>
        <span>Site de apresentação · demonstrações com dados fictícios</span>
      </div>
    </footer>
  );
}
