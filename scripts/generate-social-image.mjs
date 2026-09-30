import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { createElement as h } from "react";

const require = createRequire(import.meta.url);
const { ImageResponse } = require("next/og");
const text = (content, style) =>
  h("div", { style: { display: "flex", ...style } }, content);
const response = new ImageResponse(
  h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        background: "#f6f5f1",
        color: "#202c30",
        width: "100%",
        height: "100%",
        padding: "90px",
        fontFamily: "sans-serif",
        borderBottom: "4px solid #2759d7",
      },
    },
    text("A.D.A.M. / UM PROJETO DE RONALD ARAÚJO CORRÊA", {
      fontSize: 20,
      color: "#526c84",
      letterSpacing: 1,
    }),
    text("A.D.A.M.", { fontSize: 114, fontWeight: 800, marginTop: 55 }),
    text("Assistente de Diagnóstico Automatizado de Máquinas", {
      fontSize: 35,
      marginTop: 12,
    }),
    text("Uma visão centralizada do laboratório.", {
      fontSize: 24,
      color: "#606b70",
      marginTop: 40,
    }),
  ),
  { width: 1200, height: 630 },
);
const destination = new URL(
  "../public/images/social-preview.png",
  import.meta.url,
);
await mkdir(new URL(".", destination), { recursive: true });
await writeFile(destination, Buffer.from(await response.arrayBuffer()));
console.log("Imagem de compartilhamento gerada como PNG estático.");
