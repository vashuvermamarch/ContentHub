import { test, expect } from '@playwright/test';

test.describe('Search Feature', () => {
  test('should search and display results after debounce', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Find the search input
    const searchInput = page.getByTestId('search-input').first();
    await expect(searchInput).toBeVisible();
    
    // Type a search query
    await searchInput.fill('OpenAI');

    // Wait for debounce (500ms + buffer)
    await page.waitForTimeout(800);

    // The page header should reflect the search
    await expect(page.getByText('Results for')).toBeVisible();
    await expect(page.getByText('OpenAI').first()).toBeVisible();
  });

  test('should clear search and return to dashboard', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByTestId('search-input').first();
    await searchInput.fill('Tesla');
    await page.waitForTimeout(800);

    // Clear the search
    await searchInput.fill('');
    await page.waitForTimeout(800);

    // Should show dashboard again
    await expect(page.getByRole('heading', { name: 'Your Dashboard' })).toBeVisible();
  });
});
