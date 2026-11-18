import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/en/", "/de/", "/404"];

test.describe("WCAG 2.2 AA accessibility checks", () => {
  for (const route of routes) {
    test(`should not have any automatically detectable accessibility issues on ${route}`, async ({
      page,
    }) => {
      await page.goto(route);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .exclude("astro-dev-toolbar")
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

test("the skip link moves keyboard focus to the main content", async ({
  page,
}) => {
  await page.goto("/en/");

  const skipLink = page.locator('a[href="#main-content"]');
  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();

  await page.keyboard.press("Enter");
  await expect(page.locator("main#main-content")).toBeFocused();
});
