import { sitePath } from "./paths";
import { test, expect } from "@playwright/test";
test.describe("movimento habilitado", () => {
  test.use({ reducedMotion: "no-preference" });
  test("arte responde ao ponteiro e percurso acompanha a rolagem", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(sitePath("/"));
    await expect(page.locator(".adam-experience")).not.toHaveClass(
      /motion-paused/,
    );
    await page.mouse.move(1100, 350);
    const hardware = page.locator(".hero-hardware");
    await expect
      .poll(() => hardware.evaluate((el) => getComputedStyle(el).transform))
      .not.toBe("none");
    await page.getByRole("button", { name: "Ir à etapa 4: Dashboard" }).click();
    await expect(page.locator(".journey-text h2")).toHaveText(
      "O laboratório cabe no navegador.",
    );
    await page.getByRole("button", { name: "Pausar animações" }).click();
    await expect(page.locator(".adam-experience")).toHaveClass(/motion-paused/);
    expect(errors).toEqual([]);
  });
});
test("apresentação tem hotspots, máquinas e indicadores interativos", async ({
  page,
}) => {
  await page.goto(sitePath("/"));
  await expect(page.locator("body")).not.toContainText("IFAM");
  await expect(page.locator(".hero-hardware img")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".hero-hardware img")
        .evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.screenshot({ path: "test-results/experience-hero.png" });
  await page
    .getByRole("button", { name: "Entender o controle centralizado" })
    .click();
  await expect(page.locator(".hero-hotspot-note")).toContainText(
    "apenas apresenta o projeto",
  );
  await page.getByRole("button", { name: "Fechar explicação" }).click();
  await page.getByRole("button", { name: "Inspecionar PC-04" }).click();
  await expect(page.locator(".lab-report")).toContainText("offline");
  await page.getByRole("button", { name: "Juntar em uma visão" }).click();
  await expect(page.locator(".lab-playground")).toHaveClass(/centralized/);
  await expect(page.locator(".lab-report")).toContainText("VISÃO CENTRALIZADA");
  await page.screenshot({ path: "test-results/experience-lab.png" });
  await page.getByRole("button", { name: "Memória", exact: true }).click();
  await expect(page.locator(".metric-dial strong")).toHaveText("48");
  await page
    .locator(".machine-switch")
    .getByRole("button", { name: "PC-03" })
    .click();
  await expect(page.locator(".metric-dial strong")).toHaveText("54");
});
test("rolagem avança o percurso e o controle pausa movimentos", async ({
  page,
}) => {
  await page.goto(sitePath("/"));
  await page.getByRole("button", { name: "Ir à etapa 3: Servidor" }).click();
  await expect(page.locator(".journey-text h2")).toHaveText(
    "O servidor reúne as partes.",
  );
  await page.screenshot({ path: "test-results/experience-journey.png" });
  await page.getByRole("button", { name: "Ir à etapa 4: Dashboard" }).click();
  await expect(page.locator(".journey-text h2")).toHaveText(
    "O laboratório cabe no navegador.",
  );
  await page.getByRole("button", { name: "Pausar animações" }).click();
  await expect(page.locator(".adam-experience")).toHaveClass(/motion-paused/);
  await page.getByRole("button", { name: "Ativar animações" }).click();
});
test("comandos, IA e voz explicam o fluxo sem executar ações", async ({
  page,
}) => {
  await page.goto(sitePath("/"));
  await page.getByLabel("ESCOLHA UM EXEMPLO").selectOption("Reiniciar");
  await page.getByRole("button", { name: "Simular comando remoto" }).click();
  await expect(page.locator(".command-live")).toContainText(
    "Nenhuma ação real executada",
    { timeout: 9000 },
  );
  await page
    .getByLabel("Solicitação ilustrativa ao assistente")
    .selectOption("Reinicie o PC-07.");
  await page
    .getByRole("button", { name: "Enviar solicitação ilustrativa" })
    .click();
  await expect(page.locator(".adam-bubble")).toContainText("valida", {
    timeout: 8000,
  });
  await page.getByRole("button", { name: "Simular interação por voz" }).click();
  await expect(page.locator(".adam-bubble")).toContainText(
    "computador 10 está online",
    { timeout: 8000 },
  );
});
test("menu de tela inteira permite navegação e fecha com Escape", async ({
  page,
}) => {
  await page.goto(sitePath("/"));
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(
    page.getByRole("dialog", { name: "Menu de navegação" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Fechar menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation", { name: "Todas as páginas" })
    .getByRole("link", { name: /Documentação/ })
    .click();
  await expect(page).toHaveURL(/documentacao/);
});
