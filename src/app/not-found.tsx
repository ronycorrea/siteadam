import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container page-intro">
      <span className="eyebrow">404 / ROTA NÃO ENCONTRADA</span>
      <h1>Esta conexão não existe.</h1>
      <p>
        O endereço pode ter sido alterado. Retorne ao projeto para continuar.
      </p>
      <Link className="button" href="/">
        Voltar ao início
      </Link>
    </section>
  );
}
