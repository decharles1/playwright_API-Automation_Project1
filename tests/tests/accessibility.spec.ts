import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Accessibility scan", async ({ page }) => {
  await page.goto(process.env.WEB_BASE_URL!);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
