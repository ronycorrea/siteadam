import type { MetadataRoute } from "next";
import { assetPath } from "@/lib/site";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "A.D.A.M. — Assistente de Diagnóstico Automatizado de Máquinas",
    short_name: "A.D.A.M.",
    description: "Apresentação do projeto A.D.A.M.",
    start_url: assetPath("/"),
    scope: assetPath("/"),
    display: "standalone",
    background_color: "#e5eee8",
    theme_color: "#e5eee8",
    lang: "pt-BR",
    icons: [
      {
        src: assetPath("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
