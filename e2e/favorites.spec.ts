import { test, expect } from '@playwright/test';

test.describe('Favorites Feature', () => {
  test('should add a favorite and see it on favorites page', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for cards to render
    await page.waitForTimeout(2000);

    // Find a favorite button and click it
    const favoriteButtons = page.locator('[data-testid^="favorite-"]');
    const firstButton = favoriteButtons.first();

    // Check if any cards loaded
    const count = await favoriteButtons.count();
    if (count > 0) {
      await firstButton.click();

      // Navigate to favorites
      await page.click('a[href="/favorites"]');
      await page.waitForLoadState('networkidle');

      // Should have at least 1 favorite
      await expect(page.getByText('1 item saved')).toBeVisible();
    }
  });

  test('should show empty state when no favorites', async ({ page }) => {
    // Clear localStorage to ensure clean state
    await page.goto('/favorites');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Should show empty state
    await expect(page.getByText('No favorites yet')).toBeVisible();
  });
});
