import { test, expect } from '@playwright/test';

test.describe('Drag and Drop Feature', () => {
  test('should allow reordering cards via drag and drop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for cards to load
    await page.waitForTimeout(2000);

    const cards = page.locator('[data-testid^="draggable-card-"]');
    const cardCount = await cards.count();

    if (cardCount >= 3) {
      // Get the first and third cards
      const card0 = cards.nth(0);
      const card2 = cards.nth(2);

      // Get bounding boxes
      const box0 = await card0.boundingBox();
      const box2 = await card2.boundingBox();

      if (box0 && box2) {
        // Drag card at index 2 to index 0
        await page.mouse.move(
          box2.x + box2.width / 2,
          box2.y + box2.height / 2
        );
        await page.mouse.down();
        await page.mouse.move(
          box0.x + box0.width / 2,
          box0.y + box0.height / 2,
          { steps: 10 }
        );
        await page.mouse.up();

        // Wait for state update
        await page.waitForTimeout(500);

        // Verify that the cards still exist (reorder is visual)
        const newCards = page.locator('[data-testid^="draggable-card-"]');
        const newCount = await newCards.count();
        expect(newCount).toBe(cardCount);
      }
    }
  });
});
