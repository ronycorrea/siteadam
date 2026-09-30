"use client";
import { useState } from "react";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import { docs } from "@/data/project";
import Link from "next/link";
export default function Documentation() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const filtered = docs
    .map((doc, i) => ({ doc, i }))
    .filter(({ doc }) =>
      doc
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")),
    );
  return (
    <div className="container documentation">
      <aside>
        <label className="search-field">
          <Search size={17} />
          <input
            placeholder="Buscar na documentação"
            aria-label="Buscar na documentação"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <nav aria-label="Tópicos da documentação">
          {filtered.map(({ doc, i }) => (
            <button
              key={doc[0]}
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
            >
              <BookOpen size={15} />
              {doc[0]}
            </button>
          ))}
        </nav>
        {filtered.length === 0 && <p>Nenhum tópico encontrado.</p>}
      </aside>
      <article className="docs-article">
        <span className="eyebrow">
          DOCUMENTAÇÃO DO PROJETO / {String(active + 1).padStart(2, "0")}
        </span>
        <h2>{docs[active][0]}</h2>
        <p>{docs[active][1]}</p>
        <div className="docs-callout">
          <BookOpen size={20} />
          <div>
            <strong>Documentação em evolução</strong>
            <p>
              Esta é uma visão resumida do projeto. Instruções operacionais,
              configuração e referência de API serão adicionadas conforme a
              documentação técnica for disponibilizada.
            </p>
          </div>
        </div>
        <h3>Explore na prática</h3>
        <p>
          Conheça o fluxo completo ou experimente o dashboard com dados
          ilustrativos.
        </p>
        <div className="button-row">
          <Link className="button secondary" href="/como-funciona">
            Como funciona <ArrowRight size={16} />
          </Link>
          <Link className="button secondary" href="/demonstracao">
            Abrir demonstração <ArrowRight size={16} />
          </Link>
        </div>
        <div className="docs-pager">
          {active > 0 && (
            <button onClick={() => setActive(active - 1)}>
              ← {docs[active - 1][0]}
            </button>
          )}
          {active < docs.length - 1 && (
            <button onClick={() => setActive(active + 1)}>
              {docs[active + 1][0]} →
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
