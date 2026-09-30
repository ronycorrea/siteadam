import type { Metadata, Viewport } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { assetPath } from "@/lib/site";
import "./globals.css";
import "./editorial.css";
import "./experience.css";
const title = "A.D.A.M. | Assistente de Diagnóstico Automatizado de Máquinas";
const description =
  "Plataforma para monitoramento, diagnóstico e gerenciamento centralizado de computadores em laboratórios de informática.";
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
);
const socialImage = {
  url: assetPath("/images/social-preview.png"),
  width: 1200,
  height: 630,
  alt: "A.D.A.M. — Monitoramento, diagnóstico e gerenciamento de laboratórios",
};
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.origin),
  title: { default: title, template: "%s | A.D.A.M." },
  description,
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    type: "website",
    siteName: "A.D.A.M.",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
  applicationName: "A.D.A.M.",
  manifest: assetPath("/manifest.webmanifest"),
  icons: { icon: assetPath("/icon.svg") },
};
export const viewport: Viewport = { themeColor: "#e5eee8" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Navigation />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
