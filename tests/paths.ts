import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/siteadam").replace(
  /\/+$/,
  "",
);
export const testBaseUrl =
  process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:4173${basePath}/`;
export function sitePath(path: string) {
  const root = `${testBaseUrl.replace(/\/+$/, "")}/`;
  return new URL(path.replace(/^\/+/, ""), root).href;
}
