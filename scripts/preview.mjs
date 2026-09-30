// Local preview of the exported files. No Next runtime and no SPA fallback.
import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    port: { type: "string", default: "3001" },
    host: { type: "string", default: "127.0.0.1" },
  },
});
const root = fileURLToPath(new URL("../out/", import.meta.url));
let html;
try {
  html = await readFile(resolve(root, "index.html"), "utf8");
} catch {
  throw new Error("A exportação não existe. Execute npm run build primeiro.");
}
const basePath = html.match(/<script[^>]+src="([^"]*?)\/_next\//)?.[1];
if (basePath === undefined)
  throw new Error("Não foi possível identificar o basePath da exportação.");
const realRoot = await realpath(root);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};
const server = createServer(async (request, response) => {
  const send = (status, body, type = "text/plain; charset=utf-8") => {
    response.writeHead(status, {
      "Content-Type": type,
      "Cache-Control": "no-store",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  };
  const notFound = async () =>
    send(404, await readFile(resolve(root, "404.html")), mime[".html"]);
  try {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.setHeader("Allow", "GET, HEAD");
      return send(405, "Método não permitido.");
    }
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (pathname === basePath && basePath) {
      response.writeHead(301, { Location: `${basePath}/${url.search}` });
      return response.end();
    }
    if (!pathname.startsWith(`${basePath}/`)) return await notFound();
    const relative = pathname.slice(basePath.length + 1);
    if (
      relative.includes("\\") ||
      relative.includes("\0") ||
      relative.split("/").some((p) => p === ".." || p.startsWith("."))
    ) {
      return send(404, "Arquivo não encontrado.");
    }
    let target = resolve(root, relative);
    if ((await stat(target)).isDirectory()) {
      if (!pathname.endsWith("/")) {
        response.writeHead(301, { Location: `${url.pathname}/${url.search}` });
        return response.end();
      }
      target = resolve(target, "index.html");
    }
    const actual = await realpath(target);
    if (!actual.startsWith(`${realRoot}${sep}`))
      return send(404, "Arquivo não encontrado.");
    send(
      200,
      await readFile(actual),
      mime[extname(actual)] || "application/octet-stream",
    );
  } catch (error) {
    if (error instanceof URIError) return send(400, "Endereço inválido.");
    if (error.code === "ENOENT" || error.code === "ENOTDIR")
      return await notFound();
    console.error("Falha na prévia:", error.message);
    send(500, "Falha ao servir o arquivo.");
  }
});
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(Number(values.port), values.host, () => {
  console.log(
    `Prévia estática: http://${values.host}:${values.port}${basePath}/`,
  );
  console.log("Servindo somente out/. Rotas inexistentes retornam 404.");
});
