import {test, expect} from '@playwright/test';


const targetUrl = process.env.URL;
//const targetUrl ='http://uitestingplayground.com/ajax/'

test.beforeEach(async ({ page}) => {
    if (!targetUrl) {
        throw new Error('Environment variable URL is not set. Add URL to pw-test/.env');
    }
    await page.goto(targetUrl);
    await page.getByText('Button Triggering Ajax Request').click();
   
});

test('autowaiting', async ({ page }) => {
    const successButton=page.locator('.bg-success');
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000});
});

test('alternative way to wait for the text to appear', async ({ page }) => {
    const successButton=page.locator('.bg-success');

    await expect.poll(async () => await successButton.textContent(), {
        timeout: 20000,
    }).toContain('Data loaded with AJAX get request.');
});
