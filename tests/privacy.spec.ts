import { test, expect } from "@playwright/test";
import { sitePath } from "./paths";

declare global {
  interface Window {
    __adamMicrophoneCalls: number;
  }
}

test("simulações não enviam dados, carregam serviços externos ou acessam o microfone", async ({
  page,
}) => {
  const unexpected: string[] = [];
  const origin = new URL(sitePath("/")).origin;
  await page.route("**/*", (route) => {
    const request = route.request();
    return new URL(request.url()).origin !== origin ||
      !["GET", "HEAD"].includes(request.method())
      ? route.abort("blockedbyclient")
      : route.continue();
  });
  page.on("request", (request) => {
    if (
      new URL(request.url()).origin !== origin ||
      !["GET", "HEAD"].includes(request.method())
    ) {
      unexpected.push(`${request.method()} ${new URL(request.url()).origin}`);
    }
  });
  await page.addInitScript(() => {
    Object.defineProperty(window, "__adamMicrophoneCalls", {
      value: 0,
      writable: true,
    });
    if (navigator.mediaDevices)
      Object.defineProperty(navigator.mediaDevices, "getUserMedia", {
        value: () => {
          window.__adamMicrophoneCalls++;
          return Promise.reject(
            new Error("Microfone não deve ser usado nesta apresentação."),
          );
        },
      });
  });
  await page.goto(sitePath("/"));
  await page
    .getByRole("button", { name: "Enviar solicitação ilustrativa" })
    .click();
  await expect(page.locator(".adam-bubble")).toContainText("PC-07", {
    timeout: 8000,
  });
  await page.getByRole("button", { name: "Simular interação por voz" }).click();
  await expect(page.locator(".adam-bubble")).toContainText(
    "computador 10 está online",
    { timeout: 8000 },
  );
  expect(await page.evaluate(() => window.__adamMicrophoneCalls)).toBe(0);

  await page.goto(sitePath("/demonstracao/"));
  await page
    .getByRole("button", { name: "Enviar exemplo ao assistente" })
    .click();
  await expect(page.locator(".chat")).toContainText("CPU em 18%", {
    timeout: 8000,
  });
  await page.getByRole("button", { name: "Simular comando de voz" }).click();
  await expect(page.locator(".voice-text")).toContainText(
    "funcionando normalmente",
    { timeout: 10000 },
  );
  expect(await page.evaluate(() => window.__adamMicrophoneCalls)).toBe(0);
  expect(unexpected).toEqual([]);
});
