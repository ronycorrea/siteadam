// A bounded check for accidental disclosure, not a substitute for code review.
// Findings report only file/line/category; possible credential values stay private.
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, relative, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicVariables = new Set([
  "NEXT_PUBLIC_BASE_PATH",
  "NEXT_PUBLIC_SITE_URL",
]);
const textExtensions = new Set([
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".css",
  ".html",
  ".json",
  ".txt",
  ".md",
  ".yml",
  ".yaml",
  ".svg",
  ".webmanifest",
]);
const rules = [
  [
    "chave privada",
    /-----BEGIN (?:RSA |EC |OPENSSH |DSA |ENCRYPTED )?PRIVATE KEY-----/g,
  ],
  [
    "token GitHub",
    /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/g,
  ],
  ["chave de serviço", /\bsk-(?:proj-|svcacct-|ant-)?[A-Za-z0-9_-]{24,}\b/g],
  ["identificador de credencial AWS", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
  ["chave Google", /\bAIza[A-Za-z0-9_-]{35}\b/g],
  ["token Slack", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g],
  [
    "token JWT",
    /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\b/g,
  ],
  [
    "credencial literal",
    /\b(?:api[_-]?key|client[_-]?secret|access[_-]?token|auth[_-]?token|password)\b["']?\s*[=:]\s*["'][A-Za-z0-9_+\/-]{20,}["']/gi,
  ],
  [
    "credencial em URL",
    /\b(?:https?|postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^\s/:"'<>]+:[^\s/@"'<>]+@/gi,
  ],
];
const findings = [];
let inspected = 0;
function report(path, message, line) {
  findings.push(
    `${relative(root, path)}${line ? `:${line}` : ""} — ${message}`,
  );
}
async function inspect(path, published = false) {
  const name = basename(path);
  if (
    published &&
    (name.startsWith(".env") ||
      [
        "package.json",
        "package-lock.json",
        "next.config.ts",
        "AGENTS.md",
        "CLAUDE.md",
      ].includes(name) ||
      /\.(?:pem|key|p12|pfx|sqlite|db|log|map)$/i.test(name))
  ) {
    report(path, "arquivo de desenvolvimento ou sensível na exportação");
  }
  if (!textExtensions.has(extname(path)) && !name.startsWith(".env")) return;
  const text = await readFile(path, "utf8");
  inspected++;
  if (name.startsWith(".env")) {
    for (const match of text.matchAll(
      /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(\S.*)$/gm,
    )) {
      if (
        /(?:SECRET|TOKEN|PASSWORD|API_KEY|PRIVATE_KEY)/i.test(match[1]) &&
        !/^["']{2}$/.test(match[2].trim())
      ) {
        report(
          path,
          "variável de credencial preenchida no arquivo de ambiente",
          text.slice(0, match.index).split("\n").length,
        );
      }
    }
  }
  for (const [category, pattern] of rules) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      report(path, category, text.slice(0, match.index).split("\n").length);
    }
  }
  if (name.startsWith(".env") || path.startsWith(resolve(root, "src"))) {
    for (const match of text.matchAll(/\bNEXT_PUBLIC_[A-Z0-9_]+\b/g)) {
      if (!publicVariables.has(match[0]))
        report(
          path,
          "variável pública não prevista",
          text.slice(0, match.index).split("\n").length,
        );
    }
  }
  if (published && extname(path) === ".html") {
    if (/<script\b[^>]*\bsrc\s*=\s*["'](?:https?:)?\/\//i.test(text))
      report(path, "script remoto na página");
    if (/<form\b[^>]*\baction\s*=\s*["'](?:https?:)?\/\//i.test(text))
      report(path, "formulário com destino externo");
  }
}
async function walk(directory, published = false) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isSymbolicLink()) {
      report(path, "link simbólico fora da inspeção");
      continue;
    }
    if (entry.isDirectory()) await walk(path, published);
    else await inspect(path, published);
  }
}
for (const directory of ["src", "public"]) await walk(resolve(root, directory));
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (
    entry.isFile() &&
    (entry.name.startsWith(".env") ||
      /^(?:next\.config\.|package(?:-lock)?\.json)/.test(entry.name))
  )
    await inspect(resolve(root, entry.name));
}
await stat(resolve(root, "out/index.html"));
await walk(resolve(root, "out"), true);
if (findings.length) {
  console.error(
    "A publicação precisa de revisão. Nenhum valor de credencial é exibido:",
  );
  for (const finding of findings) console.error(`- ${finding}`);
  process.exitCode = 1;
} else {
  console.log(
    `${inspected} arquivos de texto verificados; nenhum padrão de credencial encontrado.`,
  );
  console.log(
    "Variáveis públicas previstas: NEXT_PUBLIC_BASE_PATH e NEXT_PUBLIC_SITE_URL.",
  );
  console.log(
    "Nenhum script remoto, formulário externo ou arquivo privado detectado no HTML/exportação.",
  );
}
