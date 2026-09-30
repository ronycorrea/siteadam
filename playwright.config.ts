import { defineConfig } from "@playwright/test";
import { testBaseUrl } from "./tests/paths";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 60000,
  use: {
    baseURL: testBaseUrl,
    headless: true,
    channel:
      process.env.PLAYWRIGHT_BROWSER_CHANNEL ||
      (process.platform === "win32" ? "msedge" : undefined),
    reducedMotion: "reduce",
  },
  reporter: "list",
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "node scripts/preview.mjs --port 4173",
        url: testBaseUrl,
        reuseExistingServer: !process.env.CI,
      },
});
