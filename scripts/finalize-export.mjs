// Next 16.3.7 uses path.relative() (backslashes on Windows) before a helper
// that replaces only forward slashes. Flatten only the affected RSC files.
// On Linux, and on versions that already export flat names, this is a no-op.
import { readdir, rename, rmdir, access } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../out/", import.meta.url)));
function inExport(path) {
  const absolute = resolve(path);
  if (!absolute.startsWith(root + sep))
    throw new Error("Caminho fora de out/.");
  return absolute;
}
const files = [];
const directories = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = inExport(join(directory, entry.name));
    if (entry.isSymbolicLink())
      throw new Error("A exportação não deve conter links simbólicos.");
    if (entry.isDirectory()) {
      directories.push(path);
      await walk(path);
    } else files.push(path);
  }
}
await walk(root);
let normalized = 0;
for (const source of files) {
  const parts = relative(root, source).split(sep);
  const start = parts.findIndex((part) => part.startsWith("__next."));
  if (start < 0 || start === parts.length - 1 || !source.endsWith(".txt"))
    continue;
  const target = inExport(
    join(root, ...parts.slice(0, start), parts.slice(start).join(".")),
  );
  try {
    await access(target);
    throw new Error(`Arquivo de destino já existe: ${relative(root, target)}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await rename(inExport(source), target);
  normalized++;
}
for (const directory of directories.reverse()) {
  if (
    !relative(root, directory)
      .split(sep)
      .some((part) => part.startsWith("__next."))
  )
    continue;
  try {
    await rmdir(inExport(directory));
  } catch (error) {
    if (error.code !== "ENOTEMPTY") throw error;
  }
}
await access(join(root, ".nojekyll"));
console.log(
  `Exportação finalizada. ${normalized} caminhos de navegação normalizados.`,
);
