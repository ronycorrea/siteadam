import { sitePath } from "./paths";
import { test, expect } from "@playwright/test";
test("rotas, metadados e console sem erros", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const route of [
    "/",
    "/como-funciona",
    "/recursos",
    "/arquitetura",
    "/demonstracao",
    "/documentacao",
    "/sobre",
  ]) {
    const response = await page.goto(sitePath(route));
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveTitle(/A.D.A.M./);
    expect(await page.locator("html").getAttribute("lang")).toBe("pt-BR");
  }
  expect(errors).toEqual([]);
});
test("dashboard: inspeção, filtros, laboratórios, seleção e comandos", async ({
  page,
}) => {
  await page.goto(sitePath("/demonstracao"));
  await page
    .getByRole("button", { name: "PC-01, Online, ver detalhes", exact: true })
    .click();
  await expect(page.getByText("192.168.1.101")).toBeVisible();
  await page.getByRole("button", { name: "Reiniciar", exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Concluído — simulação" }),
  ).toBeVisible({ timeout: 10000 });
  await page
    .getByRole("button", { name: "Fechar detalhes da máquina" })
    .click();
  await page.getByRole("button", { name: "Offline", exact: true }).click();
  await expect(page.locator(".machine-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await page.getByLabel("Buscar computador").fill("PC-07");
  await expect(page.locator(".machine-card")).toHaveCount(1);
  await page.getByLabel("Buscar computador").fill("");
  await page.getByLabel("Selecionar laboratório").selectOption("2");
  await expect(page.locator(".machine-card")).toHaveCount(20);
  await page
    .getByRole("button", { name: "Selecionar várias", exact: true })
    .click();
  await page
    .getByRole("button", { name: "PC-01, Online, ver detalhes", exact: true })
    .click();
  await page
    .getByRole("button", { name: "PC-02, Online, ver detalhes", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Simular consulta das selecionadas" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Laboratórios", exact: true }).click();
  await page
    .getByRole("button", { name: /Laboratório 01.*24 máquinas/ })
    .click();
  await expect(page.locator(".machine-card")).toHaveCount(24);
});
test("diagrama, documentação, IA e voz", async ({ page }) => {
  await page.goto(sitePath("/arquitetura"));
  await page
    .getByRole("button", { name: /Servidor FastAPI Orquestração/ })
    .click();
  await expect(page.locator(".architecture-detail")).toContainText("Uvicorn");
  await page.goto(sitePath("/documentacao"));
  await page
    .getByRole("textbox", { name: "Buscar na documentação" })
    .fill("microfone");
  await expect(
    page
      .getByRole("navigation", { name: "Tópicos da documentação" })
      .getByRole("button"),
  ).toHaveCount(1);
  await page
    .getByRole("navigation", { name: "Tópicos da documentação" })
    .getByRole("button", { name: "Voz", exact: true })
    .click();
  await expect(page.locator(".docs-article")).toContainText(
    "não acessa o microfone",
  );
  await page.goto(sitePath("/demonstracao"));
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
});
test("responsividade, menu mobile e capturas", async ({ page }) => {
  for (const width of [1920, 1440, 1366, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(sitePath("/"));
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `overflow em ${width}px`,
    ).toBeTruthy();
    if (width === 1440 || width === 390)
      await page.screenshot({
        path: `test-results/home-${width}.png`,
        fullPage: true,
      });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation", { name: "Todas as páginas" })
    .getByRole("link", { name: /Arquitetura/ })
    .click();
  await expect(page).toHaveURL(/arquitetura/);
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeVisible();
  for (const route of [
    "/arquitetura",
    "/demonstracao",
    "/documentacao",
    "/sobre",
    "/como-funciona",
    "/recursos",
  ]) {
    await page.goto(sitePath(route));
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `overflow mobile ${route}`,
    ).toBeTruthy();
  }
});
