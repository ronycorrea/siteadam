"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, ArrowRight, X } from "lucide-react";
import { navigation } from "@/data/project";
function watchScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const scrollSnapshot = () => window.scrollY > 60;
const serverScrollSnapshot = () => false;
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="A.D.A.M. — Início">
      <span className="logo-symbol">A</span>
      <span>
        A.D.A.M.<small>O PROJETO</small>
      </span>
    </Link>
  );
}
export default function Navigation() {
  const pathname = usePathname().replace(/\/+$/, "") || "/";
  const scrolled = useSyncExternalStore(
    watchScroll,
    scrollSnapshot,
    serverScrollSnapshot,
  );
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const prior = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const items = dialog.current?.querySelectorAll<HTMLElement>("a,button");
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handle);
      prior?.focus();
    };
  }, [open]);
  return (
    <>
      <header
        className={`new-header ${pathname === "/" ? "home-header" : ""} ${scrolled ? "scrolled" : ""}`}
      >
        <div className="new-nav-inner">
          <Logo />
          <nav className="new-desktop-nav" aria-label="Navegação principal">
            <Link href="/como-funciona">Como funciona</Link>
            <Link href="/recursos">Recursos</Link>
            <Link href="/arquitetura">Arquitetura</Link>
          </nav>
          <div className="new-nav-actions">
            <Link className="nav-explore" href="/demonstracao">
              EXPLORAR <ArrowUpRight size={18} />
            </Link>
            <button
              className="menu-toggle"
              aria-label="Abrir menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span>MENU</span>
              <i>
                <b />
                <b />
              </i>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div
          ref={dialog}
          className="full-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="full-menu-top">
            <Logo />
            <button
              ref={close}
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
            >
              <span>FECHAR</span>
              <X size={25} />
            </button>
          </div>
          <nav aria-label="Todas as páginas">
            {navigation.map(([label, href], i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? "page" : undefined}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{label}</strong>
                <ArrowUpRight />
              </Link>
            ))}
          </nav>
          <div className="full-menu-bottom">
            <p>
              Uma máquina. Um laboratório.
              <br />
              Uma visão completa.
            </p>
            <Link href="/sobre" onClick={() => setOpen(false)}>
              Conheça o autor <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
