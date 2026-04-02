import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
  const pm= new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
});

test('radio buttons', async ({ page }
) =>{
const usingTheGridForm=page.locator('nb-card', {hasText:'Using the Grid'});
await usingTheGridForm.getByRole('radio', {name:'Option 2'}).check({force:true});
//const radioStatus=await usingTheGridForm.getByRole('radio', {name:'Option 1'}).isChecked();
await expect(usingTheGridForm).toHaveScreenshot();

});