import {test, expect} from '@playwright/test';

test('likes counter', async ({ page }) => {
  await page.goto('https://conduit.bondaracademy.com/');
    await page.getByText('Global Feed').click();
    const likeButton = page.locator('app-article-preview').first().locator('button');
    await expect(likeButton).toHaveText('0');
    await likeButton.click();
    await expect(likeButton).toHaveText('1');
    await likeButton.click();
    await expect(likeButton).toHaveText('0');
});
