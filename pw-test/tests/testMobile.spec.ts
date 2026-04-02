import {test, expect} from '@playwright/test';

test('input fields', async ({ page }) => {
    await page.goto('/');
    if(test.info().project.name == 'mobile'){
    await page.locator('.sidebar-toggle').click();
}
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    if(test.info().project.name == 'mobile'){
    await page.locator('.sidebar-toggle').click();
}
    await page.locator('.sidebar-toggle').click();
    const usingTheGridEmailInput = page.locator('nb-card',{hasText:'Using the Grid'}).getByRole('textbox', { name: 'Email' });
    await usingTheGridEmailInput.fill('test@example.com');
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.fill('test2@example.com');
});