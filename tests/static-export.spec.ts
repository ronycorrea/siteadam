import { test, expect } from "@playwright/test";
import { sitePath, testBaseUrl } from "./paths";

test("exportação: abrir e atualizar todas as páginas e conferir seus links", async ({
  page,
  request,
}) => {
  const broken: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400)
      broken.push(`${response.status()} ${response.url()}`);
  });
  const prefix = new URL(sitePath("/")).pathname;
  const links = new Set<string>();
  for (const route of [
    "/",
    "/como-funciona/",
    "/recursos/",
    "/arquitetura/",
    "/demonstracao/",
    "/documentacao/",
    "/sobre/",
  ]) {
    expect((await page.goto(sitePath(route)))?.status()).toBe(200);
    expect((await page.reload())?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((elements) =>
        elements.map((el) => (el as HTMLAnchorElement).href),
      );
    for (const href of hrefs) {
      const url = new URL(href);
      if (url.origin === new URL(testBaseUrl).origin) {
        expect(url.pathname, `link fora da subpasta: ${href}`).toMatch(
          new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
        );
        links.add(url.origin + url.pathname);
      }
    }
  }
  for (const href of links)
    expect((await request.get(href)).status(), href).toBe(200);
  expect(broken).toEqual([]);
});

test("exportação: fontes, imagem, favicon, manifesto e compartilhamento", async ({
  page,
  request,
}) => {
  await page.goto(sitePath("/"));
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return Promise.all([
      document.fonts.load("800 32px Barlow"),
      document.fonts.load("400 16px Manrope"),
      document.fonts.load("700 16px Manrope"),
    ]).then((groups) =>
      groups.map(
        (group) =>
          group.length > 0 && group.every((font) => font.status === "loaded"),
      ),
    );
  });
  expect(fonts).toEqual([true, true, true]);
  const hero = page.locator(".hero-hardware img");
  expect(
    await hero.evaluate((image: HTMLImageElement) => image.currentSrc),
  ).not.toContain("/_next/image");
  expect(
    await hero.evaluate((image: HTMLImageElement) => image.naturalWidth),
  ).toBeGreaterThan(0);

  const prefix = new URL(sitePath("/")).pathname;
  for (const href of await page
    .locator('link[rel="icon"]')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLLinkElement).href),
    )) {
    expect(new URL(href).pathname.startsWith(prefix)).toBeTruthy();
    expect((await request.get(href)).status()).toBe(200);
  }
  const manifestHref = await page
    .locator('link[rel="manifest"]')
    .getAttribute("href");
  const manifestResponse = await request.get(
    new URL(manifestHref!, testBaseUrl).href,
  );
  expect(manifestResponse.status()).toBe(200);
  const manifest = await manifestResponse.json();
  expect(manifest.start_url).toBe(prefix);
  expect(manifest.scope).toBe(prefix);
  expect(manifest.icons[0].src).toBe(`${prefix}icon.svg`);

  const ogUrl = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");
  expect(ogUrl).toMatch(/^https?:\/\//);
  const parsed = new URL(ogUrl!);
  expect(parsed.pathname).toBe(`${prefix}images/social-preview.png`);
  if (process.env.NEXT_PUBLIC_SITE_URL)
    expect(parsed.origin).toBe(
      new URL(process.env.NEXT_PUBLIC_SITE_URL).origin,
    );
  const imageResponse = await request.get(
    new URL(parsed.pathname, testBaseUrl).href,
  );
  expect(imageResponse.status()).toBe(200);
  expect(imageResponse.headers()["content-type"]).toContain("image/png");
  const png = await imageResponse.body();
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  expect(
    await page.locator('meta[name="twitter:image"]').getAttribute("content"),
  ).toBe(ogUrl);
});

test("exportação: 404 real e interação após navegação entre páginas", async ({
  page,
  request,
}) => {
  expect((await request.get(sitePath("/pagina-inexistente/"))).status()).toBe(
    404,
  );
  expect((await request.get(sitePath("/package.json"))).status()).toBe(404);
  await page.goto(sitePath("/"));
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("navigation", { name: "Todas as páginas" })
    .getByRole("link", { name: /Arquitetura/ })
    .click();
  await expect(page).toHaveURL(/\/arquitetura\/$/);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Todas as páginas" })
      .getByRole("link", { name: /Arquitetura/ }),
  ).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await page.getByRole("link", { name: "A.D.A.M. — Início" }).first().click();
  await expect(page.locator(".new-header")).toHaveClass(/home-header/);
  await page
    .getByRole("button", { name: "Entender o controle centralizado" })
    .click();
  await expect(page.locator(".hero-hotspot-note")).toContainText(
    "apenas apresenta o projeto",
  );
});
